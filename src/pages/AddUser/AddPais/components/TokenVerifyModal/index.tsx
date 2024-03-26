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
    useToast
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";
import api from "services/api";

const schema = yup.object().shape({
    token: yup.string().required("Por favor, insira o token.")
})

interface Responsavel {
    username: string,
    first_name: string,
    last_name: string,
    email: string,
    profissao: string,
    password: string,
    telefone: string,
    endereco: string,
}

const TokenVerifyModal = (props: {
    isOpen: boolean,
    onOpen: () => void,
    onClose: () => void,
    setIsLoading: React.Dispatch<React.SetStateAction<boolean>>,
    responsavel: Responsavel | undefined
}) => {

    const [isLoading, setIsLoading] = useState<boolean>(false);
    const { isOpen, onOpen, onClose, responsavel, setIsLoading: setIsLoadingForm } = props;
    const toast = useToast(); 
    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema),
    });

    const onSubmit = async (data: any) => {

        const { token } = data; 

        
        // Verifica o token 
        // token válido = 200 / token já foi usado ou não existe: 404
        setIsLoading(true);
        try {

            const response = await api.post("/responsavel/token/validate", {
                token
            })

            // Se o token é valido, tenta enviar o formulário

            try {
                // Token válido e formulário OK
                // Deve fechar o modal
                // Deve encaminhar para a tela de login 
                const response = await api.post("/responsavel/create", responsavel)
                setIsLoading(false);
                toast({
                    position: "top",
                    status: "success",
                    title: "Registrado com sucesso!",
                    description: "Você conseguiu se registrar com sucesso.",
                    duration: 3000,
                    isClosable: true,
                    containerStyle: {
                        color: "white"
                    },
                    onCloseComplete: () => {
                        setIsLoadingForm(false);
                        onClose();

                        window.location.href = '/login';
                    }
                })

                


            } catch (error) {
                // Token válido e formulário não OK. 
                // Deve fechar o modal 
                // Usuário deve solicitar outro token à coordenação 
                // Fechar o modal 
                setIsLoading(false);
                toast({
                    position: "top",
                    title: "Algo deu errado ao tentar registrar!",
                    description: "Por favor, solicite outro token à coordenação.",
                    status: "error",
                    duration: 9000,
                    isClosable: true,
                    containerStyle: {
                        color: "white"
                    },
                    onCloseComplete: () => {
                        setIsLoadingForm(false);
                        onClose();
                    }
                })

            }
        } catch (error) {
            // Token não válido 
            // Não deve fechar o modal

            setIsLoading(false);
            toast({
                position: "top",
                title: "Token inválido!",
                description: "Certifique-se que o seu token está correto ou solicite outro à coordenação.",
                status: "error",
                duration: 9000,
                isClosable: true,
                containerStyle: {
                    color: "white"
                }
            })

        }

    }


    return (
        <Modal isOpen={isOpen} onClose={onClose} size="md">
            <ModalOverlay />
            <ModalContent bg="white">

                <ModalHeader className={styles.header}>
                    Insira seu token aqui
                </ModalHeader>
                <ModalCloseButton />
                <ModalBody className={styles.body}>
                    Digite o token que foi passado para você para poder fazer seu registro na plataforma.

                    <form onSubmit={handleSubmit(onSubmit)} className={styles.modal_form}>
                        <FormControl isInvalid={!!errors?.token}>
                            <Input {...register("token")} type="text" placeholder="Digite o token aqui." />
                            <FormErrorMessage className={styles.form_error_message}> {errors.token?.message} </FormErrorMessage>
                        </FormControl>
                        <Button
                            type="submit"
                            variant="solid"
                            color="white.50"
                            bg="pink.50"
                            isLoading={isLoading}
                            _hover={{ bgColor: "pink.100" }}
                            _active={{ bgColor: "pink.200" }}>
                            Enviar o código
                        </Button>
                    </form>
                </ModalBody>
            </ModalContent>
        </Modal>
    )
}

export default TokenVerifyModal;