import { useState } from "react";
import styles from "./styles.module.css";
import { 
    Modal, ModalBody, ModalContent,
    ModalHeader, ModalOverlay, ModalCloseButton,
    FormControl, FormLabel, FormErrorMessage, Input,
    Textarea, ButtonGroup, Button, useToast
} from "@chakra-ui/react";
import api from "services/api";


interface IsValid {
    hasError: boolean, 
    errorMessage?: string 
}

const AddAndamentoModal = (props: {
    onOpen: () => void,
    onClose: () => void,
    isOpen: boolean,
    denunciaId: number
}) => {
    const { onOpen, onClose, isOpen, denunciaId } = props; 
    const [acao, setAcao] = useState<string>("");
    const [tipo_acao, setTipoAcao] = useState<string>("");
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [hasTriedToSubmit, setHasTriedToSubmit] = useState<boolean>(false);
    const toast = useToast();
    // const [files, setFiles] = useState<FileList>();

    const [acaoError, setAcaoError] = useState<IsValid>({hasError: false, errorMessage: ""});
    const [tipo_acaoError, setTipoAcaoError] = useState<IsValid>({hasError: false, errorMessage: ""});
    // const [filesError, setFilesError] = useState<IsValid>({hasError: false, errorMessage: ""});

    const hasErrorAcao = () => {
        const requiredError = "Por favor, insira uma descrição.";
        
        if (acao !== "") {
            setAcaoError({
                hasError: false
            });
        } else {
            setAcaoError({
                hasError: true,
                errorMessage: requiredError
            });
        }
    }

    const hasErrorTipoAcao = () => {
        const requiredError = "Por favor, insira um título.";
        
        if (tipo_acao !== "") {
            setTipoAcaoError({
                hasError: false
            });
        } else {
            setTipoAcaoError({
                hasError: true,
                errorMessage: requiredError
            });
        }

    }

    // const hasErrorFiles = () => {

    // }


    const onSubmit = async () => {

        setHasTriedToSubmit(true);

        hasErrorTipoAcao();
        hasErrorAcao(); 

        const post = {
            acao,
            tipo_acao,
            denuncia_id: denunciaId
        }

        setIsLoading(true);
        try {
            const response = await api.post("/medida", post, {
                headers: {
                    "Authorization": "Bearer " + localStorage.getItem("token")
                }
            });
            setIsLoading(false);
            onClose(); 
            toast({
                position: "top",
                title: "Medida registrada",
                description: "Obrigado por utilizar nossos serviços.",
                status: "success",
                duration: 4000,
                isClosable: true,
                containerStyle: {
                    color: "white"
                },
                onCloseComplete: () => {
                    window.location.reload();
                }
            })

        } catch (error) {
            setIsLoading(false);
            toast({
                position: "top",
                title: "Algo deu errado!",
                description: "Não foi possível registrar a medida. Por favor, tente novamente.",
                status: "error",
                duration: 4000,
                isClosable: true,
                containerStyle: {
                    color: "white"
                },
            })
        }


    }


    return (
        <form>
            <Modal onClose={onClose} isOpen={isOpen} size="2xl">
                <ModalOverlay />
                <ModalContent bg="white">
                    <ModalHeader>
                        Adicionar andamento
                    </ModalHeader>
                    <ModalCloseButton />
                    <ModalBody className={styles.body}>
                        <FormControl isInvalid={tipo_acaoError.hasError}>
                            <FormLabel>Qual é o título do andamento?</FormLabel>
                            <Input onBlur={() => hasErrorTipoAcao()} onChange={(e) => {
                                setTipoAcao(e.target.value)
                                if (hasTriedToSubmit) {
                                    hasErrorTipoAcao()
                                }
                            }}  type="text" placeholder="Ex: Foi feito contato com os responsáveis..." />
                            <FormErrorMessage>{tipo_acaoError.errorMessage}</FormErrorMessage>
                        </FormControl>
                        {/* <FormControl>
                            <FormLabel>Upload de documento:</FormLabel>
                            <Input type="file" />
                        </FormControl> */}
                        <FormControl isInvalid={acaoError.hasError}>
                            <FormLabel>Descreva o que foi feito nesse andamento:</FormLabel>
                            <Textarea onBlur={() => hasErrorAcao()} onChange={(e) => {
                                setAcao(e.target.value);
                                if (hasTriedToSubmit) {
                                    hasErrorAcao()
                                }
                            }}  className={styles.description} resize="none" placeholder="Escreva aqui uma descrição do que foi feito no andamento."/>
                            <FormErrorMessage>{acaoError.errorMessage}</FormErrorMessage>
                        </FormControl>
                        <ButtonGroup className={styles.action_buttons}>
                            <Button>
                                Cancelar
                            </Button>
                            <Button variant="pink" onClick={onSubmit} isLoading={isLoading}>
                                Enviar
                            </Button>
                        </ButtonGroup>
                    </ModalBody>
                </ModalContent>
            </Modal>
        </form>
    )
}

export default AddAndamentoModal;