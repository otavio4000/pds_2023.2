import api from "services/api";

export const twoFactorVerification = async (telefone: string) => {
    try {
        const post = {
            telefone: telefone
        }

        const validNumber = await api.post("/verification/", post);
        return validNumber; 
    } catch (error) {
        throw new Error("Número não verificado pelo Twillio (DEVELOPMENT).");
    }
}