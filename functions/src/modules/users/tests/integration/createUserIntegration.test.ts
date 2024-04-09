import * as admin from "firebase-admin";
import {registerUser} from "@userFunctions/registerUser.function";

const express = require("express");
const supertest = require("supertest");

// const serviceAccount = require("../../../../../../../teste-superfrete/service-account-file.json");

// const serviceAccountBase64 = process.env.FIREBASE_SERVICE_ACCOUNT_BASE64;

// if (!serviceAccountBase64) {
//     throw new Error("The environment variable FIREBASE_SERVICE_ACCOUNT_BASE64 is not set.");
// }

// const serviceAccount = JSON.parse(Buffer.from(serviceAccountBase64, "base64").toString("ascii"));

let serviceAccount;

if (process.env.NODE_ENV === "production") {
    const serviceAccountBase64 = process.env.FIREBASE_SERVICE_ACCOUNT_BASE64;
    if (!serviceAccountBase64) {
        throw new Error("The environment variable FIREBASE_SERVICE_ACCOUNT_BASE64 is not set.");
    }
    serviceAccount = JSON.parse(Buffer.from(serviceAccountBase64, "base64").toString("ascii"));
} else {
    // Em desenvolvimento local, importe diretamente o arquivo JSON da conta de serviço
    serviceAccount = require("../../../../../../../teste-superfrete/service-account-file.json");
}

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
});

const testApp = express();
testApp.use(express.json());
testApp.post("/registerUser", registerUser);

const request = supertest(testApp);

describe("registerUser Firebase Function", () => {
    // async function clearTestData() {
    //     const users = await admin.firestore().collection("users").get();
    //     users.forEach(async (user) => {
    //         await admin.firestore().collection("users").doc(user.id).delete();
    //     });
    // }

    // beforeEach(async () => {
    //     await clearTestData();
    // });

    // afterAll(async () => {
    //     await clearTestData();
    //     await admin.app().delete();
    // });

    it("should register a user successfully and assign an incrementId", async () => {
        const mockUserData = {name: "John Doe"};
        const response = await request.post("/registerUser").send(mockUserData).expect(200);

        expect(response.body).toHaveProperty("id");
    }, 10000);
});
