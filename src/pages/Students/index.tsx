import {
    Heading,
    Box,
    Accordion,
    AccordionItem,
    AccordionButton,
    AccordionIcon,
    AccordionPanel,
    Button,
    useDisclosure,
    Skeleton,
    Stack,
} from "@chakra-ui/react";
import styles from "./styles.module.css";
import StudentInfoModal from "./components/StudentInfoModal";
import AssociateStudentDialogModal from "./components/AssociateStudentDialogModal";
import { useEffect, useState } from "react";
import api from "services/api";
import { checkIfUserHasAuthorization } from "utils/checkIfUserHasAuthorization";
import { AuthorizationType } from "enums/authorizationType";


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

const Students = () => {

    const { isOpen: isOpenModal, onOpen: onOpenModal, onClose: onCloseModal } = useDisclosure();
    const { isOpen: isOpenAssociateConfirmation, onOpen: onOpenAssociateConfirmation, onClose: onCloseAssociateConfirmation } = useDisclosure();
    const [isLoaded, setIsLoaded] = useState<boolean>();
    const [isLoading, setIsLoading] = useState<boolean>();
    const [students, setStudents] = useState<Array<student_info>>([]);


    // Renderiza os estudantes 
    useEffect(() => {
        setIsLoaded(false);
        const fetchStudents = async () => {
            try {
                const response = await api.get("/alunos/", {
                    headers: {
                        'Authorization': 'Bearer ' + localStorage.getItem("token"),
                    }
                });

                setIsLoaded(true);
                setStudents(response.data);

            } catch (error) {
                console.log("Não foi possível carregar os estudantes. ")
            }
        }

        fetchStudents();



    }, [])


    const [selectedStudent, setSelectedStudent] = useState<student_info>();

    const handleDetailShow = (index: number) => {
        if (students.length > 0) {
            setSelectedStudent(students[index]);
        }

        onOpenModal();
    }

    const handleAssociate = async (index: number) => {

        if (students.length > 0) {
            setSelectedStudent(students[index]);
        }

        onOpenAssociateConfirmation();

    }

    return (
        <>
            <div className={styles.main}>
                <div className={styles.container}>
                    <Heading>
                        Alunos
                    </Heading>


                    {
                        !isLoaded ?
                            <div className={styles.skeletons}>
                                <Stack w="800px">
                                    <Skeleton height='50px' />
                                    <Skeleton height='300px' />
                                </Stack>

                            </div>
                            :
                            <Accordion allowToggle className={styles.students}>
                                {
                                    students.map((value, index) => {
                                        return (
                                            <AccordionItem key={index}>
                                                <AccordionButton>
                                                    <Box className={styles.student}>
                                                        <Box className={styles.details}>
                                                            <div className={styles.name}>
                                                                <b>Nome: </b>
                                                                {value.nome}
                                                            </div>
                                                            <div className={styles.matricula}>
                                                                <b>Matrícula: </b>
                                                                {value.matricula}
                                                            </div>
                                                        </Box>
                                                        <AccordionIcon />
                                                    </Box>
                                                </AccordionButton>
                                                <AccordionPanel className={styles.content}
                                                    style={{
                                                        padding: "16px 17px"
                                                    }}>

                                                    {
                                                        checkIfUserHasAuthorization(AuthorizationType.Coordenation) &&
                                                        <>
                                                            <Button
                                                                variant="outline"
                                                                color="pink.50"
                                                                borderColor="pink.50"
                                                                onClick={() => handleDetailShow(index)}
                                                            >
                                                                DETALHES
                                                            </Button>
                                                            <Button
                                                                color="white.50"
                                                                bg="pink.50"
                                                                _hover={{ bgColor: "pink.100" }}
                                                                _active={{ bgColor: "pink.200" }}
                                                            >
                                                                EXCLUIR
                                                            </Button>
                                                        </>
                                                    }

                                                    {
                                                        checkIfUserHasAuthorization(AuthorizationType.Parent) &&
                                                        <Button
                                                            color="white.50"
                                                            bg="pink.50"
                                                            _hover={{ bgColor: "pink.100" }}
                                                            _active={{ bgColor: "pink.200" }}
                                                            isLoading={isLoading}
                                                            onClick={() => handleAssociate(index)}
                                                        >
                                                            ASSOCIAR A MIM
                                                        </Button>
                                                    }
                                                </AccordionPanel>
                                            </AccordionItem>
                                        )
                                    })
                                }
                            </Accordion>
                    }


                </div>
            </div>
            {selectedStudent && <StudentInfoModal student={selectedStudent} isOpen={isOpenModal} onClose={onCloseModal} />}
            {selectedStudent && <AssociateStudentDialogModal student={selectedStudent} isOpen={isOpenAssociateConfirmation} onClose={onCloseAssociateConfirmation} />}
        </>
    )

}

export default Students; 