import {createUserAccount} from "@users/services/createUserAccount.service";
import {User} from "@users/models/user.model";

jest.mock("firebase-admin", () => ({
    firestore: jest.fn(),
    initializeApp: jest.fn(),
}));

describe("createUserAccount function", () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    describe("failed interaction with firestore", () => {
        beforeEach(() => {
            require("firebase-admin").firestore.mockImplementation(() => {
                throw new Error("Firestore not working");
            });
        });

        it("should not interact with Firestore correctly", async () => {
            const userData = {name: "teste 123"};

            await expect(createUserAccount(userData)).rejects.toThrow("Firestore not working");
        });
    });

    describe("success scenario", () => {
        beforeEach(() => {
            require("firebase-admin").firestore.mockImplementation(() => ({
                collection: jest.fn(() => ({
                    add: jest.fn(() => Promise.resolve({id: "asjdakdasdjsad"})),
                })),
            }));
        });

        it("should add a user and return user data with id for valid user data", async () => {
            const userData: Omit<User, "id" | "createdAt"> = {
                name: "teste 123",
            };
            const result = await createUserAccount(userData);

            expect(result).toHaveProperty("id", "asjdakdasdjsad");
            expect(result).toHaveProperty("name", "teste 123");
            expect(result).toHaveProperty("createdAt");
        });
    });
});
