import styles from "./styles.module.css";
import wave from "assets/images/wave-1.svg";
import {
    Card,
    CardBody,
    CardHeader,
    Heading,
    Input,
    Select,
    FormControl,
    FormLabel,
    Textarea,
    Button,
    ButtonGroup,
    FormHelperText,
    FormErrorMessage
} from "@chakra-ui/react";
import { useState, useContext } from "react";
import { StudentSignUpCardContext } from "context/StudentSignUpCardContext";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

const ComprehensiveProfile = () => {

    const { setCurrentCardState } = useContext(StudentSignUpCardContext);

    return (
        <form>
            <Card w="lg" className={styles.form_card}>
                <CardHeader className={styles.header}>
                    <Heading size="lg">
                        Cadastro de Aluno
                    </Heading>
                </CardHeader>
                <CardBody className={styles.body}>
                    <Heading size="md" textAlign="start">
                        Detalhes Adicionais
                    </Heading>
                    <div className={styles.section_header_helper_text}>
                        Aqui devem ser fornecidos detalhes mais abrangentes e específicos sobre o aluno. Aqui, é possível incluir observações relevantes, informações sobre comportamento, histórico acadêmico e quaisquer outros aspectos que possam oferecer uma compreensão mais completa do aluno
                    </div>
                    <FormControl>
                        <FormLabel>Observações</FormLabel>
                        <Textarea />
                    </FormControl>
                    <FormControl>
                        <FormLabel>Contato com substâncias ilícitas</FormLabel>
                        <Select placeholder="---">
                            <option value="yes">Sim</option>
                            <option value="no">Não</option>
                        </Select>
                    </FormControl>
                    <FormControl>
                        <FormLabel>Situação Familiar</FormLabel>
                        <Textarea />
                    </FormControl>
                    <FormControl>
                        <FormLabel>Engajamento familiar</FormLabel>
                        <Textarea />
                    </FormControl>
                    <ButtonGroup className={styles.buttons}>
                        <Button
                            color="pink.50"
                            variant="outline"
                            colorScheme="pink"
                            _hover={{ bgColor: "#d8d8d8" }}
                            _active={{ bgColor: "#b1b1b1" }}
                            className={styles.back_button}
                            onClick={() => setCurrentCardState("basicInformation")}>
                            VOLTAR
                        </Button>
                        <Button
                            className={styles.advance_button}
                            color="white.50"
                            bg="pink.50"
                            _hover={{ bgColor: "pink.100" }}
                            _active={{ bgColor: "pink.200" }}
                            onClick={() => setCurrentCardState("comprehensiveProfile")}
                        >
                            AVANÇAR
                        </Button>
                    </ButtonGroup>
                </CardBody>
            </Card>
        </form>
    )
}


const BasicInformation = () => {
    // Assumindo que a escola que tem apenas ensino médio
    const sampleStudentYears = [
        "1", "2", "3"
    ]

    const sampleStudentClasses = [
        "A", "B", "C", "D"
    ]

    const { setCurrentCardState } = useContext(StudentSignUpCardContext);

    return (
        <form >
            <Card w="lg" className={styles.form_card}>
                <CardHeader className={styles.header}>
                    <Heading size="lg">
                        Cadastro de Aluno
                    </Heading>
                </CardHeader>
                <CardBody className={styles.body}>
                    <Heading size="md" textAlign="start">
                        Informações Básicas
                    </Heading>
                    <div className={styles.section_header_helper_text}>
                        Aqui ficam informações báscas sobre o aluno, como nome completo, data de nascimento, turma e quaisquer outros dados essenciais para a identificação e organização do aluno dentro do sistema.
                    </div>
                    <FormControl>
                        <FormLabel>Número de matrícula</FormLabel>
                        <Input type="number" placeholder="Ex: 23387263" />
                    </FormControl>
                    <FormControl>
                        <FormLabel>Nome do Aluno</FormLabel>
                        <Input type="text" placeholder="Ex: João da Silva" />
                    </FormControl>
                    <FormControl>
                        <FormLabel>CPF</FormLabel>
                        <Input type="cpf" placeholder="Ex: 388.484.010-07" />
                    </FormControl>
                    <FormControl>
                        <FormLabel>Data de Nascimento</FormLabel>
                        <Input type="date" />
                    </FormControl>
                    <FormControl>
                        <FormLabel>Ano</FormLabel>
                        <Select placeholder='---'>
                            {
                                sampleStudentYears.map(year => {
                                    return (
                                        <option value="year">{year}</option>
                                    )
                                })
                            }
                        </Select>
                    </FormControl>
                    <FormControl>
                        <FormLabel>Turma</FormLabel>
                        <Select placeholder='---'>
                            {
                                sampleStudentClasses.map(turma => {
                                    return (
                                        <option value="turma">{turma}</option>
                                    )
                                })
                            }
                        </Select>
                    </FormControl>
                    <FormControl>
                        <FormLabel>Histórico Acadêmico</FormLabel>
                        <Input type="file" />
                    </FormControl>
                    <FormControl>
                        <FormLabel>Histórico de faltas</FormLabel>
                        <Input type="number" />
                    </FormControl>
                    <ButtonGroup className={styles.buttons}>
                        <Button
                            className={styles.advance_button}
                            color="white.50"
                            bg="pink.50"
                            _hover={{ bgColor: "pink.100" }}
                            _active={{ bgColor: "pink.200" }}
                            onClick={() => setCurrentCardState("comprehensiveProfile")}
                        >
                            AVANÇAR
                        </Button>
                    </ButtonGroup>
                </CardBody>
            </Card>
        </form>
    )
}

const AddStudent = () => {

    const [currentCardState, setCurrentCardState] = useState<"basicInformation" | "comprehensiveProfile">("basicInformation")
    const [currentSignUpData, setCurrentSignUpData] = useState({});
    // {
    // 	"id": 1,
    // 	"matricula": 1111,
    // 	"nome": "Alan Jesus dos Santos",
    // 	"cpf": "30425771555",
    // 	"data_nascimento": "2009-01-01T00:00:00-02:00",
    // 	"turma_ano": "1 Ano Turma A",
    // 	"historico_academico": null,
    // 	"historico_faltas": 0,
    // 	"observacoes": "O aluno se mostra introvertido, não possui muitos amigos e raramente entra em conflito com os colegas",
    // 	"contato_substancias_ilicitas": "yes",
    // 	"situacao_familiar": "Pais divorciados, guarda compartilhada",
    // 	"engajamento_familia": "Pais participativos e prestativos, interessados na educação do filho"
    // },


    return (
        <StudentSignUpCardContext.Provider value={{ currentCardState, setCurrentCardState, currentSignUpData, setCurrentSignUpData }}>

                <div className={styles.container}
                    style={{
                        backgroundImage: `url(${wave})`
                    }}>

                    {
                        currentCardState == "basicInformation" ?
                            <BasicInformation /> : <ComprehensiveProfile />
                    }

                </div>
        </StudentSignUpCardContext.Provider>
    )
}

export default AddStudent;