import styles from "./styles.module.css";
import {
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalOverlay,
    ModalHeader,
    Button,
    FormControl, FormErrorMessage,
    Input,
    useToast,
    Table,
    Thead,
    Tbody,
    Tfoot,
    Tr,
    Th,
    Td,
    TableContainer,
    Heading,
} from "@chakra-ui/react";
import IconButton from "components/IconButton";
import { useEffect, useState } from "react";
import { ReactComponent as CancelSign } from "assets/icons/cancel-svgrepo-com.svg";
import { ReactComponent as PlusSign } from "assets/icons/add-plus-svgrepo-com-pink.svg";
import api from "services/api";
import LoadingSkeleton from "components/LoadingSkeleton";

interface Student {
    contato_substancias_ilicitas: "yes" | "no",
    cpf: string,
    data_nascimento: string
    engajamento_familia: string,
    historico_academico: string,
    historico_faltas: number
    id: number,
    matricula: number,
    nome: string
    observacoes: string,
    situacao_familiar: string,
    turma_ano: string
}


const AddVitimasModal = (props: {
    isOpen: boolean,
    onOpen: () => void,
    onClose: () => void,
    denunciaId: number, 
    currentVitimas: Array<Student> | undefined
}) => {
    
    const [isLoaded, setIsLoaded] = useState<boolean>();
    const [isLoadingRequest, setIsLoadingRequest] = useState<boolean>(false);
    const [students, setStudents] = useState<Array<Student>>();
    const { isOpen, onClose, currentVitimas, denunciaId } = props;
    const [vitimas, setVitimas] = useState<Array<Student>>((currentVitimas || []));
    const toast = useToast();


    useEffect(() => {

        const fetchStudents = async () => {
            console.log("fetchStudents está rodando")
            try {
                const response = await api.get("/alunos/", {
                    headers: {
                        'Authorization': 'Bearer ' + localStorage.getItem("token"),
                    }
                });

                setStudents(response.data);
                setIsLoaded(true);

            } catch (error) {
                console.log("Não foi possível carregar os estudantes. ")
            }
        }

        if (isOpen) {
            
            fetchStudents();
            setIsLoaded(false);

        }



    }, [isOpen])

    const removeFromPraticantes = (indexToRemove: number) => {
        console.log("removeFromPraticantes");
        const updatedPraticantes = vitimas?.filter((item, index) => index !== indexToRemove);
        setVitimas(updatedPraticantes);
    }

    const addToPraticantes = (studentToAdd: Student) => {
        console.log("estou sendo chamado");
        const updatesPraticantes = [...(vitimas || [])];
        updatesPraticantes.push(studentToAdd)
        setVitimas(updatesPraticantes);
    }

    const alterPraticantes = async () => {

        console.log(vitimas);

        const vitimasId = vitimas.map(vitima => vitima.id);
        
        setIsLoadingRequest(true);
        try {
            const response = await api.patch(`/denuncia/edit/${denunciaId}/`, {
                praticantes: vitimasId
            }, {
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem("token"),
                }
            })

            setIsLoadingRequest(false);
            toast({
                position: "top",
                title: "Praticantes registrados",
                description: "Obrigado por utilizar nossos serviços.",
                status: "success",
                duration: 4000,
                isClosable: true,
                containerStyle: {
                    color: "white"
                },
                onCloseComplete: () => {
                    onClose();
                    window.location.reload();
                }
            })

            console.log(response);
        } catch (error) {
            toast({
                position: "top",
                title: "Algo deu errado!",
                description: "Por favor, tente novamente.",
                status: "error",
                duration: 4000,
                isClosable: true,
                containerStyle: {
                    color: "white"
                },
                onCloseComplete: () => {
                    setIsLoadingRequest(false);
                }
            })
        }

    }


    return (
        <Modal isOpen={isOpen} onClose={onClose} size="2xl">
            <ModalOverlay />
            <ModalContent bg="white">
                <ModalHeader paddingBottom="0px">
                    Adicionar Vítimas
                </ModalHeader>
                <ModalBody className={styles.body}>
                    {
                        vitimas && vitimas?.length > 0 ?
                            <TableContainer className={styles.students}>
                                <Table>
                                    <Thead>
                                        <Tr>
                                            <Th>Aluno</Th>
                                            <Th>Número de Matrícula</Th>
                                            <Th>Remover?</Th>
                                        </Tr>
                                    </Thead>
                                    <Tbody>
                                        {
                                            vitimas.map((vitima, index) => {
                                                return (
                                                    <Tr key={index}>
                                                        <Td> {vitima.nome} </Td>
                                                        <Td> {vitima.matricula} </Td>
                                                        <Td> <IconButton icon={CancelSign} handleClick={() => {removeFromPraticantes(index)}} style={{ height: "30px" }} /> </Td>
                                                    </Tr>
                                                )
                                            })
                                        }
                                    </Tbody>

                                </Table>
                            </TableContainer> :
                            <div className={styles.students}>
                                Não existem praticantes registrados ainda.
                            </div>
                    }

                    <Heading size="sm">
                        Adicionar
                    </Heading>
                    {
                        isLoaded ?
                        <TableContainer className={styles.students}>
                                <Table>
                                    <Thead>
                                        <Tr>
                                            <Th>Aluno</Th>
                                            <Th>Número de Matrícula</Th>
                                            <Th>Adicionar?</Th>
                                        </Tr>
                                    </Thead>
                                    <Tbody>
                                        {
                                            students?.filter((student) => {
                                                return !vitimas.includes(student);
                                            }).map((student, index) => {
                                                return (
                                                    <Tr key={index}>
                                                        <Td> {student.nome} </Td>
                                                        <Td> {student.matricula} </Td>
                                                        <Td> <IconButton icon={PlusSign} handleClick={() => {addToPraticantes(student)}} style={{ height: "30px" }} /> </Td>
                                                    </Tr>
                                                )
                                            })
                                        }
                                    </Tbody>

                                </Table>
                            </TableContainer>
                            :
                            <LoadingSkeleton justifyContent="center" />
                    }

                    <Button onClick={alterPraticantes} variant="pink" isLoading={isLoadingRequest}>
                        Adicionar Vítimas
                    </Button>


                </ModalBody>
            </ModalContent>
        </Modal>
    )
}

export default AddVitimasModal;