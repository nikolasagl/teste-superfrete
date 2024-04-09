import {registerUser} from "../../functions/registerUser.function";
import * as validateUserModule from "../../../../shared/middleware/validateUser";
import * as createUserAccountService from "../../services/createUserAccount.service";
import * as yup from "yup";

jest.mock("../../../shared/middleware/validateUser");
jest.mock("../../../users/createUserAccount.service");

const createMockResponse = () => {
    const res: any = {};
    res.status = jest.fn().mockReturnValue(res);
    res.send = jest.fn().mockReturnValue(res);
    res.json = jest.fn().mockReturnValue(res);
    return res;
};

describe("registerUser", () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it("return status 405 for method not allowed", async () => {
        const req: any = {method: "GET"};
        const res = createMockResponse();
        await registerUser(req, res);

        expect(res.status).toHaveBeenCalledWith(405);
        expect(res.send).toHaveBeenCalledWith("Method not allowed.");
    });

    it("success scenario", async () => {
        const mockUserData = {name: "Nikolas"};
        const mockUserResponse = {id: "1", email: "teste@teste.com"};
        const req: any = {method: "POST", body: mockUserData};
        const res = createMockResponse();

        (validateUserModule.userValidationSchema.validate as jest.Mock).mockResolvedValueOnce(mockUserData);
        (createUserAccountService.createUserAccount as jest.Mock).mockResolvedValue(mockUserResponse);
        await registerUser(req, res);

        expect(createUserAccountService.createUserAccount).toHaveBeenCalledWith(mockUserData);
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith(mockUserResponse);
    });

    it("return invalid name (< 2)", async () => {
        const mockUserData = {name: "a"};
        const req: any = {method: "POST", body: mockUserData};
        const res = createMockResponse();

        const validationError = new yup.ValidationError("Name must be at least 2 characters", mockUserData, "name");
        (validateUserModule.userValidationSchema.validate as jest.Mock).mockRejectedValue(validationError);
        await registerUser(req, res);

        expect(createUserAccountService.createUserAccount).not.toHaveBeenCalled();
        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.send).toHaveBeenCalledWith("Name must be at least 2 characters");
    });

    it("return invalid name (> 50)", async () => {
        const mockUserData = {name: "a".repeat(51)};
        const req: any = {method: "POST", body: mockUserData};
        const res = createMockResponse();

        const validationError = new yup.ValidationError("Name must be less than 50 characters", mockUserData, "name");
        (validateUserModule.userValidationSchema.validate as jest.Mock).mockRejectedValue(validationError);
        await registerUser(req, res);

        expect(createUserAccountService.createUserAccount).not.toHaveBeenCalled();
        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.send).toHaveBeenCalledWith("Name must be less than 50 characters");
    });

    it("return status 500 for unexpected error during validation", async () => {
        const mockUserData = {name: "Unexpected Error Test"};
        const req: any = {method: "POST", body: mockUserData};
        const res = createMockResponse();
        const unexpectedError = new Error("Unexpected Error");
        (validateUserModule.userValidationSchema.validate as jest.Mock).mockRejectedValue(unexpectedError);
        await registerUser(req, res);
        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.send).toHaveBeenCalledWith("Erro ao receber request: Unexpected Error");
    });
});
