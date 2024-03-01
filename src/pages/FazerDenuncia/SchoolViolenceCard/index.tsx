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
import { DenunciaRequest } from "../fazerdenuncia.types";

import Modal from 'react-modal';

const schema = yup.object().shape({
    matricula: yup.number().typeError("Por favor, insira um número de matrícula.").required("Por favor, insira um número de matrícula."),
    relato: yup.string().required('Por favor, preencha o relato.'),
    lugar: yup.string().required('Por favor, preencha o local.'),
    recorrencia: yup.string().oneOf(["primeira", "recorrente"], "Por favor, selecione um recorrência válida.").required('Por favor, selecione uma recorrência.'),
    data_ocorrido: yup.string().required('Por favor, insira a data da ocorrência.'),
    violenceTypes: yup.array().of(yup.string().oneOf(["v_fisica", "v_verbal", "assedio", "bullying"])).min(1, "Por favor, selecione ao menos uma opção."),
    telefone_1: yup.string().required('Por favor, preencha o seu telefone.'),
    
    
})


const SchoolViolenceCard = () => {

    const { setViolenceType } = useContext(DenunciaContext);
    const toast = useToast();
    const [isLoading, setIsLoading] = useState(false);
    

    const { register, handleSubmit, getValues, formState: { errors }, reset } = useForm({
        resolver: yupResolver(schema),
        defaultValues: {
            violenceTypes: [],
        },
    });
    const [isCodeModalOpen, setIsCodeModalOpen] = useState(false);
    const [code, setCode] = useState<string>("");

    const handleCodeSubmit = async (code: string) => {
        try {
            const formData = {
             
              codigo: code
              
            };
            

            const formPost ={
                matricula: getValues("matricula"),
                relato: getValues("relato"),
                data_ocorrido: getValues("data_ocorrido"),
                lugar: getValues("lugar"),
                recorrencia: getValues("relato"),
                v_fisica: getValues("violenceTypes")?.includes("v_fisica")? "yes" : "no",
                v_domestica: getValues("violenceTypes")?.includes("v_domestica")? "yes" : "no",
                v_verbal: getValues("violenceTypes")?.includes("v_verbal")? "yes" : "no",
                bullying: getValues("violenceTypes")?.includes("bullying")? "yes" : "no",
                assedio: getValues("violenceTypes")?.includes("assedio")? "yes" : "no",
                telefone_1: getValues("telefone_1")
                
            }
            
            
            const responseForm = await api.post("/verification/check", formData);
            const responseForm1 = await api.post("/denuncia/add", formPost);
            
      
            console.log("Formulário enviado com sucesso!");
            toast({
              // ... código existente
            });
      
            setIsCodeModalOpen(false); // Fecha o modal após o envio do formulário
          } catch (error) {
            // ... código existente
            console.error(error);
          }
          reset()
        }

    const onSubmit = async (data: any) => {
        
        
        // Aqui precisamos converter o objeto de form para o objeto que o backend espera: para isso, removemos o campo "violenceTypes" e adicionar os campos "v_fisica", "v_verbal", "bullying" e "assedio"
        const { violenceTypes, ...rest } = data;
        const v_fisica = violenceTypes.includes("v_fisica") ? "yes" : "no";
        const v_verbal = violenceTypes.includes("v_verbal") ? "yes" : "no";
        const bullying = violenceTypes.includes("bullying") ? "yes" : "no";
        const assedio = violenceTypes.includes("assedio") ? "yes" : "no";
        const v_domestica = "no";

        const post: DenunciaRequest = {
            ...rest,
            v_domestica,
            v_fisica,
            v_verbal,
            bullying,
            assedio
        }

        setIsLoading(true); 
        try {
            
            const responseTelefone = await api.post("/verification/", { telefone: data.telefone_1 });
            console.log("Código enviado com sucesso para o telefone:", data.telefone_1);

            setCode(""); // Reset code state
            setIsCodeModalOpen(true); // Open the modal for code verification
            
                        
            toast({
                position: 'top',
                title: 'Código de verificação.',
                description: "Um código de verificação será enviado para o seu celular.",
                status: 'info',
                duration: 9000,
                isClosable: true,
                containerStyle: {
                    color: "white"
                }
            })

            
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
            console.log("Finalizei")
            
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
            <Modal
                isOpen={isCodeModalOpen}
                onRequestClose={() => setIsCodeModalOpen(false)}
            >
                <form
                    onSubmit={(e) => {
                        e.preventDefault();
                        handleCodeSubmit(code);
                    }}
                >
                    <label>
                        Código:
                        <input
                            type="text"
                            value={code}
                            onChange={(e) => setCode(e.target.value)}
                        />
                    </label>
                    <button type="submit">Verificar Código</button>
                </form>
            </Modal>
        </>
    )
}


export default SchoolViolenceCard;