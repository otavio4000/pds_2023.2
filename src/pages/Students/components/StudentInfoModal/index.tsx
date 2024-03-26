import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalCloseButton,
    ModalBody,
    ModalFooter,
    Avatar,
    Button,
    ButtonGroup,
    Input,
    FormControl,
    FormErrorMessage
} from "@chakra-ui/react"
import { getBrazilianDate } from "utils/convertTimestampToBRDate";
import styles from "./styles.module.css";
import { useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";



interface student_info {
    id: number,
    matricula: string,
    nome: string,
    cpf: string,
    data_nascimento: string,
    turma_ano: string,
    historico_academico: string | null,
    historico_faltas: number,
    observacoes: string,
    contato_substancias_ilicitas: string,
    situacao_familiar: string,
    engajamento_familia: string
}

const sampleStudentYears = [
    "1", "2", "3"
]

const sampleStudentClasses = [
    "A", "B", "C", "D"
]

const schema = yup.object().shape({
    data_nascimento: yup.string(),
    turma: yup.string().oneOf(sampleStudentClasses),
    ano: yup.string().oneOf(sampleStudentYears),
    historico_faltas: yup.number().positive("O número de faltas deve ser positivo."),
    historico_academico: yup.mixed()
    .test(
        "formato-arquivos",
        "O formato do arquivo é inválido. Tente enviar um arquivo no formato PDF.",
        ((files: any) => {

            if (files instanceof FileList) {
                let isFileValid: boolean = true; 
                const file = files.item(0);
                const extension = file?.name.split(".")[1];

                

                if (!extension) {
                    isFileValid = true; 
                } else {


                    if (extension !== "pdf") {
                        isFileValid = false; 
                    }

                }


                return isFileValid;
            
            } 

            return false;

        }
        )
    )
})



const StudentInfoModal = (props: {
    student: student_info,
    isOpen: boolean,
    onClose: () => void
}) => {

    const { student, isOpen, onClose } = props;
    const [cardState, setCardState] = useState<"visualizing" | "editing">("visualizing");

    return (
        <Modal isOpen={isOpen} onClose={onClose} size="md">
            <ModalOverlay />
            <ModalContent bg="white" className={styles.container}>
                <Avatar size="xl" name={student.nome} color="white" />
                {student.nome}
                <ModalCloseButton />
                <ModalBody className={styles.modal_body}>
                    <div className={styles.aluno_info}>
                        <div style={{
                            display: "flex",
                            justifyContent: "space-between"
                        }}>
                            <span>
                                
                                <b>Nascimento:</b> {getBrazilianDate(student.data_nascimento)}
                            </span>
                            <span>
                                <b>Turma:</b> {student.turma_ano}
                            </span>
                        </div>
                        <span>
                            <b>Matrícula</b>: {student.matricula}
                        </span>
                        <div>
                            <b>Histórico de faltas</b>: {student.historico_faltas}
                        </div>
                        <div>
                            <b>Histórico acadêmico:</b> {student.historico_academico !== null ? <a style={{textDecoration: "underline"}} target="_blank" href={student.historico_academico}>clique aqui</a> : "Histórico acadêmico não registrado."}
                        </div>
                    </div>

                    {
                        cardState == "visualizing" ?
                            <Button
                                variant="outline"
                                color="pink.50"
                                borderColor="pink.50"
                                className={styles.button}
                                onClick={() => { setCardState("editing") }}
                            >
                                EDITAR
                            </Button> :

                            <ButtonGroup>
                                <Button
                                    variant="outline"
                                    color="pink.50"
                                    borderColor="pink.50"
                                    className={styles.button}
                                    onClick={() => { setCardState("visualizing") }}
                                >
                                    CANCELAR
                                </Button>
                                <Button
                                    bg="pink.50"
                                    _hover={{ bgColor: "pink.100" }}
                                    _active={{ bgColor: "pink.200" }}
                                    color="white"
                                    className={styles.button}
                                    onClick={() => { }}
                                >
                                    SALVAR ALTERAÇÕES
                                </Button>
                            </ButtonGroup>

                    }


                </ModalBody>
            </ModalContent>
        </Modal>
    )
}

export default StudentInfoModal;