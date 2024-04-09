import {onRequest} from "firebase-functions/v2/https";
import {userValidationSchema} from "../../../shared/middleware/validateUser";
import {createUserAccount} from "../services/createUserAccount.service";
import * as yup from "yup";

export const registerUser = onRequest(async (request, response) => {
    if (request.method !== "POST") response.status(405).send("Method not allowed.");

    try {
        const validatedUserData = await userValidationSchema.validate(request.body, {abortEarly: false});
        const userResult = await createUserAccount(validatedUserData);
        response.status(200).json(userResult);
    } catch (error) {
        if (error instanceof yup.ValidationError) {
            response.status(400).send(error.message);
            return;
        } else if (error instanceof Error) {
            response.status(500).send(`Erro ao receber request: ${error.message}`);
            return;
        }
        response.status(500).send("Erro desconhecido ao receber request.");
        return;
    }
});
