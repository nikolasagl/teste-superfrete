import * as admin from "firebase-admin";
import {User} from "./user.model";

export const createUserAccount = async (userData: Omit<User, "id" | "createdAt">) => {
    try {
        const db = admin.firestore();

        const data = {
            ...userData,
            createdAt: new Date(),
        };

        const userRef = await db.collection("users").add(data);

        return {
            id: userRef.id,
            ...data,
        };
    } catch (error) {
        throw new Error("Firestore not working");
    }
};
