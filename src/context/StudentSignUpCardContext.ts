import { createContext } from "react";

type CardState = "basicInformation" | "comprehensiveProfile";

interface StudentSignUpData {
    matricula?: number, 
    nome?: string, 
    cpf?: string, 
    data_nascimento?: string, 
    turma_ano?: string, 
    historico_academico?: File,
    historico_faltas?: number,
    observacoes?: string, 
    contato_substancias_ilicitas?: "yes" | "no",
    situacao_familiar?: string,
    engajamento_familia?: string
}

interface StudentSignUpCardContextData {
    currentCardState: CardState,
    setCurrentCardState: (currentCardState: CardState) => void
    currentSignUpData: StudentSignUpData,
    setCurrentSignUpData: (currentSignUpData: StudentSignUpData) => void
}


export const StudentSignUpCardContext = createContext<StudentSignUpCardContextData>({
    currentCardState: "basicInformation",
    setCurrentCardState: () => {},
    currentSignUpData: {},
    setCurrentSignUpData: () => {}
});