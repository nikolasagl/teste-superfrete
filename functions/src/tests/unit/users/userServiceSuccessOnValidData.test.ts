import {createUserAccount} from "@users/createUserAccount.service";
import {User} from "@users/user.model";

jest.mock("firebase-admin", () => {
    const firestore = jest.fn(() => ({
        collection: jest.fn(() => ({
            add: jest.fn(() => Promise.resolve({id: "asjdakdasdjsad"})),
        })),
    }));

    return {firestore, initializeApp: jest.fn()};
});

describe("createUserAccount function", () => {
    describe("success scenarios", () => {
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
