import { createContext } from "react";

interface VerificationCodeContextData {
    setCodeValidity: (validity: boolean) => void,
    isCodeValid: boolean
}

export const VerificationCodeContext = createContext<VerificationCodeContextData>({
    setCodeValidity: () => {},
    isCodeValid: false
});