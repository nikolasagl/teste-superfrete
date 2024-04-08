import {addUser} from "../../../src/users/user.service";
import {User} from "../../../src/users/user.model";

jest.mock("firebase-admin", () => {
    const firestore = jest.fn(() => ({
        collection: jest.fn(() => ({
            add: jest.fn(() => Promise.resolve({id: "asjdakdasdjsad"})),
        })),
    }));

    return {firestore, initializeApp: jest.fn()};
});

describe("addUser function", () => {
    describe("Success scenarios", () => {
        it("should add a user and return user data with id for valid user data", async () => {
            const userData: Omit<User, "id" | "createdAt"> = {
                name: "teste 123",
            };
            const result = await addUser(userData);

            expect(result).toHaveProperty("id", "asjdakdasdjsad");
            expect(result).toHaveProperty("name", "teste 123");
            expect(result).toHaveProperty("createdAt");
        });
    });
});
