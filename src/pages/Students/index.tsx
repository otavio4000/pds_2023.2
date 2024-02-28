import {
    Heading,
    Box,
    Accordion,
    AccordionItem,
    AccordionButton,
    AccordionIcon,
    AccordionPanel,
    Button,
    useDisclosure
} from "@chakra-ui/react";
import styles from "./styles.module.css";
import StudentInfoModal from "./components/StudentInfoModal";
import { useState } from "react";

const Students = () => {

    const { isOpen, onOpen, onClose } = useDisclosure();

    interface tutor_info {
        name: string,
        tel: string
    }

    interface student_info {
        name: string,
        matricula: string,
        nascimento: string,
        tutor1: tutor_info,
        tutor2: tutor_info,
        turma: string,
    }

    const students: Array<student_info> = [
            {
                name: "Taylor Swift",
                matricula: "12312321",
                nascimento: "13/12/1989",
                turma: "9 B",
                tutor1: {
                    name: "Lana Del Rey",
                    tel: "82 9823748343"
                },
                tutor2: {
                    name: "Lana Del Rey",
                    tel: "82 9823748343"
                }
            },
            {
                name: "Kurt Hummel",
                matricula: "12312344",
                nascimento: "15/02/2001",
                turma: "5 A",
                tutor1: {
                    name: "Lana Del Rey",
                    tel: "82 9823748343"
                },
                tutor2: {
                    name: "Lana Del Rey",
                    tel: "82 9823748343"
                }
            },
            {
                name: "Sabrina Carpenter",
                matricula: "213124231",
                nascimento: "15/10/2000",
                turma: "7 C",
                tutor1: {
                    name: "Lana Del Rey",
                    tel: "82 9823748343"
                },
                tutor2: {
                    name: "Lana Del Rey",
                    tel: "82 9823748343"
                }
            }
        ]

    const [selectedStudent, setSelectedStudent] = useState<student_info>();

    const handleDetailShow = (index: number) => {
        setSelectedStudent(students[index]);

        onOpen();
    }

    return (
        <>
            <div className={styles.main}>
                <div className={styles.container}>
                    <Heading>
                        Alunos
                    </Heading>
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
                                                        {value.name}
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
                                        </AccordionPanel>
                                    </AccordionItem>
                                )
                            })
                        }
                    </Accordion>
                </div>
            </div>
            {selectedStudent && <StudentInfoModal student={selectedStudent} isOpen={isOpen} onClose={onClose} />}
        </>
    )

}

export default Students; 