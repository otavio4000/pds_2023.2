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
    useDisclosure
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { ViolenceType } from "enums/violencetype";
import { DenunciaContext } from "context/DenunciaContext";
import { useContext, useState } from "react";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { DenunciaRequest } from "../fazerdenuncia.types";
import TwoFactorVerifyModal from "../components/TwoFactorVerifyModal";
import { twoFactorVerification } from "../utils/twoFactorVerification";

// Objeto de validação de arquivo 
const validFileExtensions = ["png", "jpg", "jpeg", "webp", "mp4", "avi", "mkv", "mov", "wmv", "webm", "mpg", "mpeg", "3gp"];

// Campos do Form
const schema = yup.object().shape({
    matricula: yup.number().typeError("Por favor, insira um número de matrícula.").required("Por favor, insira um número de matrícula."),
    relato: yup.string().required('Por favor, preencha o relato.'),
    lugar: yup.string().required('Por favor, preencha o local.'),
    recorrencia: yup.string().oneOf(["primeira", "recorrente"], "Por favor, selecione um recorrência válida.").required('Por favor, selecione uma recorrência.'),
    data_ocorrido: yup.string().required('Por favor, insira a data da ocorrência.'),
    violenceTypes: yup.array().of(yup.string().oneOf(["v_fisica", "v_verbal", "assedio", "bullying"])).min(1, "Por favor, selecione ao menos uma opção."),
    telefone_1: yup.string().required('Por favor, preencha o seu telefone.'),
    arquivo: yup.mixed().test(
        "required",
        "Por favor, selecione ao menos um arquivo.",
        ((files: any) => {
            if (files instanceof FileList) {
                return files.length > 0  
            }
            return false;
        })
    )
    .test(
        "formato-arquivos",
        "Algum dos arquivos está com formato inválido. Tente enviar vídeos ou fotos.",
        ((files: any) => {
            if (files instanceof FileList) {

                let areAllFilesValid: boolean = true; 

                let fileKeys = Object.keys(files);

                fileKeys.forEach((key) => {
                    console.log("Estou passando pelos arquivos")
                    const file = files.item(parseInt(key));
                    const extension = file?.name.split(".")[1];

                    if (!extension) {
                        areAllFilesValid = false; 
                    } else {
                        if (!validFileExtensions.includes(extension)) {
                            areAllFilesValid = false; 
                        }
                    }


                })

                return areAllFilesValid;
            }

            return false; 

        }

        )
    )
})


const SchoolViolenceCard = () => {

    const { setViolenceType } = useContext(DenunciaContext);
    const toast = useToast();
    const { isOpen, onClose, onOpen } = useDisclosure();
    const [isLoading, setIsLoading] = useState(false);
    const [postObject, setPostObject] = useState<DenunciaRequest>();

    const { register, handleSubmit, setValue, formState: { errors }, reset } = useForm({
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
        const v_domestica = "no";

        setIsLoading(true);
        try {


            const responseTelefone = await twoFactorVerification(data.telefone_1);
            setPostObject({
                ...rest,
                v_domestica,
                v_fisica,
                v_verbal,
                bullying,
                assedio

            })

            onOpen();

        } catch (error) {

            console.log(error, "Primeira linha")
            setIsLoading(false);

            if (error instanceof Error) {

                toast({
                    position: "top",
                    title: error.message,
                    description: "O número inserido não está cadastrado na conta do Twillio. Este é um erro que deve acontecer somente em desenvolvimento.",
                    status: "warning",
                    duration: 9000,
                    isClosable: true,
                    containerStyle: {
                        color: "white"
                    }
                })
            }
        } finally {
            setIsLoading(false);
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
                    <FormControl className={styles.student_registration} isInvalid={!!errors.matricula}>
                        <Input type="number" placeholder="Número de matrícula" {...register("matricula")} />
                        <FormErrorMessage className={styles.input_error_message}> {errors.matricula?.message} </FormErrorMessage>
                    </FormControl>
                    <FormControl isInvalid={!!errors.relato}>
                        <Textarea className={styles.report_description} resize="none" {...register("relato")} placeholder="Digite o seu relato..." />
                        <FormErrorMessage className={styles.input_error_message}> {errors.relato?.message} </FormErrorMessage>
                    </FormControl>
                    <FormControl className={styles.report_place} isInvalid={!!errors.lugar}>
                        <Input type="text" placeholder="Digite onde ocorreu..." {...register("lugar")} />
                        <FormErrorMessage className={styles.input_error_message}> {errors.lugar?.message} </FormErrorMessage>
                    </FormControl>
                    <FormControl className={styles.report_place} isInvalid={!!errors.lugar}>
                        <Input type="number" placeholder="Digite seu telefone..." {...register("telefone_1")} />
                        <FormErrorMessage className={styles.input_error_message}> {errors.telefone_1?.message} </FormErrorMessage>
                    </FormControl>
                    <FormControl className={styles.media_files} isInvalid={!!errors?.arquivo}>
                        <FormLabel fontSize="lg">
                            Insira aqui um vídeo ou foto do ocorrido
                        </FormLabel>
                        <Input type="file" 
                        {...register("arquivo")}
                        accept=".png,.jpg,.jpeg,.webp,.mp4,.avi,.mkv,.mov,.wmv,.webm,.mpg,.mpeg,.3gp" multiple />
                        <FormErrorMessage className={styles.input_error_message}> {errors.arquivo?.message} </FormErrorMessage>
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
                                console.log("Fui clicado")
                                setViolenceType(ViolenceType.Domestic)
                            }
                            }>
                            SOFREU VIOLÊNCIA DOMÉSTICA?
                        </Button>
                    </ButtonGroup>
                </ButtonGroup>
            </form>
            <TwoFactorVerifyModal isOpen={isOpen} onClose={onClose} report={postObject} />
        </>
    )
}


export default SchoolViolenceCard;