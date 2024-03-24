import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalCloseButton,
    ModalBody,
    Input,
    Button,
    FormControl,
    FormErrorMessage,
    useToast
} from "@chakra-ui/react"
import styles from "./styles.module.css";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { VerificationCodeContext } from "context/VerificationCodeContext";
import { useState, useContext } from "react";
import { DenunciaRequest } from "pages/FazerDenuncia/fazerdenuncia.types";
import api from "services/api";

const schema = yup.object().shape({
    codigo: yup.string().required("Por favor, insira o código.").matches(/^[0-9]+$/, "O código deve conter apenas dígitos.").test('len', 'O código deve possuir 15 caracteres', val => val.length === 15)
})

const TwoFactorVerifyModal = (props: {
    isOpen: boolean,
    onClose: () => void,
    report: DenunciaRequest | undefined
}) => {

    const { isOpen, onClose, report } = props;
    const toast = useToast();
    const [isLoading, setIsLoading] = useState(false);
    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema),
    });

    const onSubmit = async (data: any) => {

        setIsLoading(true);
        try {
            // Testa se o código corresponde ao enviado ao celular
            const response = await api.post("/verification/check", data);

            if (report) {
                // Tenta enviar a denúncia
                try {
                    const responseReport = await api.postForm("/denuncia/add", report);
                    setIsLoading(false);
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

                    onClose();
                } catch (error) {
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
                }
            }

        } catch (error) {
            setIsLoading(false);
            toast({
                position: 'top',
                title: 'Código inválido!',
                description: "O código não corresponde ao enviado ao seu celular.",
                status: 'error',
                duration: 4000,
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
            <ModalContent bg="white" className={styles.container}>
                <ModalHeader>
                    Verificação de Dois Fatores
                </ModalHeader>
                <ModalCloseButton />
                <ModalBody className={styles.modal_body}>
                    Digite o código de 15 dígitos enviado para o seu telefone para poder enviar a denúncia.

                    <form onSubmit={handleSubmit(onSubmit)} className={styles.modal_form}>
                        <FormControl isInvalid={!!errors?.codigo} className={styles.modal_form_body}>
                            <Input {...register("codigo")} type="text" placeholder="Digite o código aqui." />

                            <FormErrorMessage className={styles.form_error_message}> {errors.codigo?.message} </FormErrorMessage>
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

export default TwoFactorVerifyModal;