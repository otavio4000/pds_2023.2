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
    FormErrorMessage,
    Divider
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import api from "services/api";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

const sampleStudentYears = [
    "1", "2", "3"
]

const sampleStudentClasses = [
    "A", "B", "C", "D"
]

const schema = yup.object().shape({
    matricula: yup.number().typeError("Por favor, insira um número de matrícula.").required("Por favor, insira um número de matrícula."),
    nome: yup.string().required('Por favor, preencha o campo.'),
    cpf: yup.number().typeError("Por favor, insira o CPF.").required("Por favor, insira o CPF."),
    data_nascimento: yup.string().required('Por favor, insira a data de nascimento.'),
    ano: yup.string().oneOf(sampleStudentYears, "Por favor, selecione um ano válido.").required('Por favor, selecione uma opção.'),
    turma: yup.string().oneOf(sampleStudentClasses, "Por favor, selecione uma turma válido.").required('Por favor, selecione uma opção.'),
    historico_faltas: yup.number().positive("O número de faltas não pode ser negativo.").typeError("Por favor, insira um número.").required("Por favor, insira o histórico de faltas."),
    observacoes: yup.string(),
    situacao_familiar: yup.string().required("Por favor, preencha esse campo."), 
    engajamento_familia: yup.string().required("Por favor, preencha esse campo."), 
    contato_substancias_ilicitas: yup.string().oneOf(["yes", "no"], "Por favor, selecione uma opção válida"),
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


const AddStudent = () => {

    const { register, handleSubmit, getValues, formState: { errors }, reset } = useForm({
        resolver: yupResolver(schema),
    });

    const onSubmit = async (data: any) => {

        const { turma, ano, historico_academico, ...rest } = data; 

        const fileList = historico_academico as FileList; 
        const arquivo_historico_academico = fileList.item(0);


        const post = {
            ...rest, 
            turma_ano: `${ano} Ano Turma ${turma}`,
            historico_academico: arquivo_historico_academico
        }

        console.log(post.historico_academico);

        try {
            const response = await api.postForm(
                "/alunos/add", 
                post,
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}` 
                    }
                });
            console.log(response) 
        } catch (error) {
            console.log(error)
        }

    }

    return (
        <div className={styles.container}
            style={{
                backgroundImage: `url(${wave})`
            }}>
            <form onSubmit={handleSubmit(onSubmit)}>
                <Card w="lg" className={styles.form_card}>
                    <CardHeader className={styles.header}>
                        <Heading size="lg">
                            Cadastro de Aluno
                        </Heading>
                    </CardHeader>
                    <CardBody className={styles.body}>
                        <Heading size="md" textAlign="start" className={styles.section_header}>
                            Informações Básicas
                        </Heading>
                        <div className={styles.section_header_helper_text}>
                            Aqui ficam informações báscas sobre o aluno, como nome completo, data de nascimento, turma e quaisquer outros dados essenciais para a identificação e organização do aluno dentro do sistema.
                        </div>
                        <FormControl isInvalid={!!errors.matricula}>
                            <FormLabel>Número de matrícula</FormLabel>
                            <Input {...register("matricula")} type="number" placeholder="Ex: 23387263" />
                            <FormErrorMessage className={styles.input_error_message}> {errors.matricula?.message} </FormErrorMessage>
                        </FormControl>
                        <FormControl isInvalid={!!errors.nome}>
                            <FormLabel>Nome do Aluno</FormLabel>
                            <Input {...register("nome")} type="text" placeholder="Ex: João da Silva" />
                            <FormErrorMessage className={styles.input_error_message}> {errors.nome?.message} </FormErrorMessage>
                        </FormControl>
                        <FormControl isInvalid={!!errors.cpf}>
                            <FormLabel>CPF</FormLabel>
                            <Input {...register("cpf")} type="cpf" placeholder="Ex: 388.484.010-07" />
                            <FormErrorMessage className={styles.input_error_message}> {errors.cpf?.message} </FormErrorMessage>
                        </FormControl>
                        <FormControl isInvalid={!!errors.data_nascimento}>
                            <FormLabel>Data de Nascimento</FormLabel>
                            <Input {...register("data_nascimento")} type="date" />
                            <FormErrorMessage className={styles.input_error_message}> {errors.data_nascimento?.message} </FormErrorMessage>
                        </FormControl>
                        <FormControl isInvalid={!!errors.ano}>
                            <FormLabel>Ano</FormLabel>
                            <Select {...register("ano")} placeholder='---'>
                                {
                                    sampleStudentYears.map(year => {
                                        return (
                                            <option key={year} value={year}>{year}</option>
                                        )
                                    })
                                }
                            </Select>
                            <FormErrorMessage className={styles.input_error_message}> {errors.ano?.message} </FormErrorMessage>
                        </FormControl>
                        <FormControl isInvalid={!!errors.turma}>
                            <FormLabel>Turma</FormLabel>
                            <Select {...register("turma")} placeholder='---'>
                                {
                                    sampleStudentClasses.map(turma => {
                                        return (
                                            <option key={turma} value={turma}>{turma}</option>
                                        )
                                    })
                                }
                            </Select>
                            <FormErrorMessage className={styles.input_error_message}> {errors.turma?.message} </FormErrorMessage>
                        </FormControl>
                        <FormControl isInvalid={!!errors.historico_academico}>
                            <FormLabel>Histórico Acadêmico</FormLabel>
                            <Input {...register("historico_academico")} type="file" />
                            <FormErrorMessage className={styles.input_error_message}> {errors.historico_academico?.message} </FormErrorMessage>
                        </FormControl>
                        <FormControl isInvalid={!!errors.historico_faltas}>
                            <FormLabel>Histórico de faltas</FormLabel>
                            <Input {...register('historico_faltas')} type="number" />
                            <FormErrorMessage className={styles.input_error_message}> {errors.historico_faltas?.message} </FormErrorMessage>
                        </FormControl>
                        <Divider />
                        <Heading size="md" textAlign="start" className={styles.section_header}>
                            Detalhes Adicionais
                        </Heading>
                        <div className={styles.section_header_helper_text}>
                            Aqui devem ser fornecidos detalhes mais abrangentes e específicos sobre o aluno. Aqui, é possível incluir observações relevantes, informações sobre comportamento, histórico acadêmico e quaisquer outros aspectos que possam oferecer uma compreensão mais completa do aluno
                        </div>
                        <FormControl isInvalid={!!errors.observacoes}>
                            <FormLabel>Observações</FormLabel>
                            <Textarea {...register("observacoes")} />
                            <FormErrorMessage className={styles.input_error_message}> {errors.observacoes?.message} </FormErrorMessage>
                        </FormControl>
                        <FormControl isInvalid={!!errors.contato_substancias_ilicitas}>
                            <FormLabel>Contato com substâncias ilícitas</FormLabel>
                            <Select placeholder="---" {...register("contato_substancias_ilicitas")}>
                                <option value="yes">Sim</option>
                                <option value="no">Não</option>
                            </Select>
                            <FormErrorMessage className={styles.input_error_message}> {errors.contato_substancias_ilicitas?.message} </FormErrorMessage>
                        </FormControl>
                        <FormControl isInvalid={!!errors.situacao_familiar}>
                            <FormLabel>Situação Familiar</FormLabel>
                            <Textarea {...register("situacao_familiar")} />
                            <FormErrorMessage className={styles.input_error_message}> {errors.situacao_familiar?.message} </FormErrorMessage>
                        </FormControl>
                        <FormControl isInvalid={!!errors.engajamento_familia}>
                            <FormLabel>Engajamento familiar</FormLabel>
                            <Textarea {...register("engajamento_familia")} />
                            <FormErrorMessage className={styles.input_error_message}> {errors.engajamento_familia?.message} </FormErrorMessage>
                        </FormControl>
                        <ButtonGroup className={styles.buttons}>
                            <Button
                                type="submit"
                                color="white.50"
                                bg="pink.50"
                                _hover={{ bgColor: "pink.100" }}
                                _active={{ bgColor: "pink.200" }}
                            >
                                AVANÇAR
                            </Button>
                        </ButtonGroup>
                    </CardBody>
                </Card>
            </form>
        </div>
    )
}

export default AddStudent;