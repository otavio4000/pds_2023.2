import styles from "../styles.module.css";
import { Link } from "react-router-dom";
import { ReactComponent as HandIcon } from "assets/icons/closed-fist-icon.svg";
import {
    ButtonGroup,
    Button,
    Stack,
    FormControl,
    FormLabel,
    Textarea,
    CheckboxGroup,
    Checkbox,
    Select,
    Input,
    Box,
    FormErrorMessage,
    useToast,
} from "@chakra-ui/react";
import api from "services/api";
import { useForm } from "react-hook-form";
import { ViolenceType } from "enums/violencetype";
import { DenunciaContext } from "context/DenunciaContext";
import { useContext, useState } from "react";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

interface DenunciaRequest {
    numero_matricula: number;
    relato: string;
    lugar: string;
    v_fisica: string;
    v_verbal: string;
    bullying: string;
    assedio: string;
    recorrencia: string;
    data_ocorrido: string;
}

const schema = yup.object().shape({
    numero_matricula: yup.number().typeError("Por favor, insira um número de matrícula.").required("Por favor, insira um número de matrícula."),
    relato: yup.string().required('Por favor, preencha o relato.'),
    lugar: yup.string().required('Por favor, preencha o local.'),
    recorrencia: yup.string().oneOf(["primeira", "recorrente"], "Por favor, selecione um recorrência válida.").required('Por favor, selecione uma recorrência.'),
    data_ocorrido: yup.string().required('Por favor, insira a data da ocorrência.'),
    violenceTypes: yup.array().of(yup.string().oneOf(["v_fisica", "v_verbal", "assedio", "bullying"])).min(1, "Por favor, selecione ao menos uma opção.")
})


const SchoolViolenceCard = () => {

    const { setViolenceType } = useContext(DenunciaContext);
    const toast = useToast();
    const [isLoading, setIsLoading] = useState(false);

    const { register, handleSubmit, formState: { errors }, reset } = useForm({
        resolver: yupResolver(schema),
        defaultValues: {
            violenceTypes: [],
        },
    });

    const onSubmit = async (data: any) => {

        // Aqui precisamos converter o objeto de form para o objeto que o backend espera: para isso, removemos o campo "violenceTypes" e adicionar os campos "v_fisica", "v_verbal", "bullying" e "assedio"
        const { violenceTypes, ...rest } = data;
        const v_fisica = violenceTypes.includes("v_fisica") ? "yes" : "no";
        const v_verbal = violenceTypes.includes("v_verbal") ? "yes" : "no";
        const bullying = violenceTypes.includes("bullying") ? "yes" : "no";
        const assedio = violenceTypes.includes("assedio") ? "yes" : "no";

        const post: DenunciaRequest = {
            ...rest,
            v_fisica,
            v_verbal,
            bullying,
            assedio
        }

        setIsLoading(true); 
        try {
            const response = await api.post("/denuncia/add", post);
            
            toast({
                position: 'top',
                title: 'Denúncia enviada.',
                description: "Obrigada por usar nossos serviços.",
                status: 'success',
                duration: 9000,
                isClosable: true,
                containerStyle: {
                    color: "white"
                }
            })

            console.log(response);
        } catch (error) {

            /*
            * @TODO:
            * - Tratar erro de forma mais adequada:
            *   - Mostrar mensagem de erro baseada no erro retornado pelo backend
            */

            setIsLoading(false);
            toast({
                position: "top",
                title: "Algo deu errado!",
                description: "Por favor, tente novamente.",
                status: "error",
                duration: 9000,
                isClosable: true, 
                containerStyle: {
                    color: "white"
                }
            })

            console.log(error);
        } finally {
            setIsLoading(false);
            reset(); 
        }   

    }


    return (
        <>
            <form onSubmit={handleSubmit(onSubmit)} className={styles.container_main}>
                <Stack className={styles.complaint_report}>
                    <FormControl className={styles.violence_type} isInvalid={!!errors?.violenceTypes}>
                        <FormLabel fontSize="lg">
                            Caracterize o seu relato
                        </FormLabel>
                        <Box className={styles.radio_group}>
                            <Stack spacing={4}>
                                <CheckboxGroup colorScheme="pink">
                                    <Checkbox {...register("violenceTypes")} value={"v_fisica"}>Violência Física</Checkbox>
                                    <Checkbox {...register("violenceTypes")} value={"v_verbal"}>Violência Verbal</Checkbox>
                                    <Checkbox {...register("violenceTypes")} value={"bullying"}>Bullying</Checkbox>
                                    <Checkbox {...register("violenceTypes")} value={"assedio"}>Assédio</Checkbox>
                                </CheckboxGroup>
                            </Stack>
                        </Box>
                        <FormErrorMessage className={styles.input_error_message}> {errors.violenceTypes?.message} </FormErrorMessage>
                    </FormControl>
                    <Stack spacing={4}>
                        <FormControl isInvalid={!!errors.recorrencia} className={styles.violence_reccurence} >
                            <FormLabel fontSize="lg">
                                Qual a recorrência da violência?
                            </FormLabel>
                            <Select {...register("recorrencia")}>
                                <option value=''>---</option>
                                <option value='primeira'>Primeira vez</option>
                                <option value='recorrente'>Recorrente</option>
                            </Select>
                            <FormErrorMessage className={styles.input_error_message}> {errors.recorrencia?.message} </FormErrorMessage>
                        </FormControl>
                        <FormControl className={styles.violence_date} isInvalid={!!errors.data_ocorrido}>
                            <FormLabel fontSize="lg">
                                Quando ocorreu?
                            </FormLabel>
                            <Input type="date" {...register("data_ocorrido")} />
                            <FormErrorMessage className={styles.input_error_message}> {errors.data_ocorrido?.message} </FormErrorMessage>
                        </FormControl>
                    </Stack>
                </Stack>
                <Stack spacing={3} className={styles.complaint_registration}>
                    <FormControl className={styles.student_registration} isInvalid={!!errors.numero_matricula}>
                        <Input type="number" placeholder="Número de matrícula" {...register("numero_matricula")} />
                        <FormErrorMessage className={styles.input_error_message}> {errors.numero_matricula?.message} </FormErrorMessage>
                    </FormControl>
                    <FormControl isInvalid={!!errors.relato}>
                        <Textarea className={styles.report_description} resize="none" {...register("relato")} placeholder="Digite o seu relato..." />
                        <FormErrorMessage className={styles.input_error_message}> {errors.relato?.message} </FormErrorMessage>
                    </FormControl>
                    <FormControl className={styles.report_place} isInvalid={!!errors.lugar}>
                        <Input type="text" placeholder="Digite onde ocorreu..." {...register("lugar")} />
                        <FormErrorMessage className={styles.input_error_message}> {errors.lugar?.message} </FormErrorMessage>
                    </FormControl>
                </Stack>
                <ButtonGroup className={styles.form_buttons}>
                    <Link to="/">
                        <Button
                            color="white.50"
                            bg="pink.50"
                            _hover={{ bgColor: "pink.100" }}
                            _active={{ bgColor: "pink.200" }}>
                            VOLTAR
                        </Button>
                    </Link>
                    <ButtonGroup>
                        <Button
                            type="submit"
                            bg="green.50"
                            colorScheme="green"
                            isLoading={isLoading}
                        >
                            ENVIAR
                        </Button>
                        <Button
                            leftIcon={<HandIcon width="20" />}
                            bg="orange"
                            colorScheme="orange"
                            onClick={() => {
                                setViolenceType(ViolenceType.Domestic)
                            }
                            }>
                            SOFREU VIOLÊNCIA DOMÉSTICA?
                        </Button>
                    </ButtonGroup>
                </ButtonGroup>
            </form>
        </>
    )
}

export default SchoolViolenceCard;