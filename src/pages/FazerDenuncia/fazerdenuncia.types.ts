export interface DenunciaRequest {
    matricula: number;
    relato: string;
    lugar: string;
    v_domestica: "yes" | "no"; 
    v_fisica: "yes" | "no";
    v_verbal: "yes" | "no";
    bullying: "yes" | "no";
    assedio: "yes" | "no";
    recorrencia: string;
    data_ocorrido: string;
    telefone: string;
    codigo: string;
}