import {onRequest} from "firebase-functions/v2/https";
import {userValidationSchema} from "../shared/middleware/validateUser";
import {addUser} from "./user.service";

export const createUser = onRequest(async (request, response) => {
    if (request.method !== "POST") response.status(405).send("Method not allowed.");

    try {
        const validatedUserData = await userValidationSchema.validate(request.body, {abortEarly: false});
        const userResult = await addUser(validatedUserData);
        response.status(200).json(userResult);
    } catch (error) {
        if (error instanceof Error) {
            response.status(500).send(`Erro ao receber request: ${error.message}`);
        }
        response.status(500).send("Erro desconhecido ao receber request");
    }
});
