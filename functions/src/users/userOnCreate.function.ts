import * as admin from "firebase-admin";
import {onDocumentCreated} from "firebase-functions/v2/firestore";

export const userOnCreate = onDocumentCreated("users/{itemId}", async (event) => {
    const newItemRef = event.data?.ref;

    if (!newItemRef) throw new Error("Referência do documento não encontrada.");

    try {
        await admin.firestore().runTransaction(async (transaction) => {
            const itemsCollectionRef = admin.firestore().collection("users");

            // Busca o último item adicionado baseado no incrementId
            const lastItemQuery = itemsCollectionRef.orderBy("incrementId", "desc").limit(1);
            const lastItemQuerySnapshot = await transaction.get(lastItemQuery);


            let lastIncrementId = 0; // Assume 0 se nenhum registro for encontrado
            if (!lastItemQuerySnapshot.empty) {
                const lastItem = lastItemQuerySnapshot.docs[0];
                lastIncrementId = lastItem.data().incrementId;
            }

            const newIncrementId = lastIncrementId + 1;

            // Atualiza o novo item com o incrementId calculado
            transaction.update(newItemRef, {
                incrementId: newIncrementId,
            });
        });
    } catch (error) {
        if (error instanceof Error) {
            console.error("Erro ao adicionar incrementId:", error.message);
        }
        console.error("Erro ao adicionar incrementId: Erro desconhecido");
    }
});
