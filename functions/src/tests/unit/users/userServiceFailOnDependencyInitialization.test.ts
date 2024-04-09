import {createUserAccount} from "@users/createUserAccount.service";

jest.mock("firebase-admin", () => {
    const firestore = jest.fn(() => {
        throw new Error("Firestore not working");
    });
    return {firestore, initializeApp: jest.fn()};
});

describe("createUserAccount function", () => {
    describe("failed interaction with firestore", () => {
        it("should not interact with Firestore correctly", async () => {
            const userData = {name: "teste 123"};

            await expect(createUserAccount(userData)).rejects.toThrow("Firestore not working");
        });
    });
});
