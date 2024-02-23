import { createContext } from "react";
import { ViolenceType } from "enums/violencetype";


interface DenunciaContextData {
    violenceType: ViolenceType;
    setViolenceType: (type: ViolenceType) => void;
    formSent: boolean;
    wasFormSent: (value: boolean) => void
}


export const DenunciaContext = createContext<DenunciaContextData>({
        violenceType: ViolenceType.School,
        setViolenceType: () => {},
        formSent: false,
        wasFormSent: () => {}
});