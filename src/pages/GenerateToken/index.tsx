import styles from "./styles.module.css";
import IconButton from "components/IconButton";
import { ReactComponent as CopyButton } from "assets/icons/copy-svgrepo-com.svg";
import { ReactComponent as WhatsAppIcon } from "assets/icons/whatsapp-svgrepo-com.svg";
import {
    Card,
    CardBody,
    Heading,
    Divider,
    Button,
    useToast,
    Tooltip,
    Input,
    FormControl, 
    FormErrorMessage
} from "@chakra-ui/react";
import { useState } from "react";
import api from "services/api";




const GenerateToken = () => {

    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [token, setToken] = useState<string>("");
    const [phoneNumber, setPhoneNumber] = useState<string>("");
    const [validPhoneNumber, isPhoneNumberValid] = useState<boolean>(true);
    const toast = useToast();
    

    const askForToken = async () => {

        setIsLoading(true);
        try {
            const response = await api.post("/responsavel/token");
            setToken(response.data.token);
            setIsLoading(false);

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

    const copyToken = () => {
        if (token.length > 0) {
            navigator.clipboard.writeText(token);
        }

        toast({
            position: "top",
            title: "Token copiado com sucesso.",
            status: "success",
            duration: 4000,
            isClosable: true,
            containerStyle: {
                color: "white"
            }
        })
    }



    const sendTokenThroughWhatsapp = () => {

        if (phoneNumber != "" && phoneNumber.length > 0) {
            isPhoneNumberValid(true);

            const msg = `Aqui está seu token para cadastro no VigiAluno: ${token}.\nPara fazer seu cadastro, visite esse link: https://pds-2023-2-two.vercel.app/responsaveis/add`
            const sendURL = `https://api.whatsapp.com/send?phone=${encodeURIComponent(phoneNumber)}&text=${encodeURIComponent(msg)}`
            window.open(sendURL, "_blank");
        } else {
            isPhoneNumberValid(false);
        }

    }


    return (
        <div className={styles.container}>
            <Card variant="filled" className={styles.main}>
                <CardBody>
                    <Heading size="md">
                        Bem-vindo à nossa página de geração de tokens!
                    </Heading>
                    <Divider className={styles.divider} />
                    <div className={styles.main_body}>
                        Aqui, você pode gerar tokens exclusivos para os pais, simplificando o processo de registro em nossa plataforma.
                        <div className={styles.token_group}>
                            <Button
                                color="white.50"
                                bg="pink.50"
                                _hover={{ bgColor: "pink.100" }}
                                _active={{ bgColor: "pink.200" }}
                                isLoading={isLoading}
                                onClick={askForToken}
                                className={styles.token_button}
                            >
                                {
                                    token.length > 0 ? "Gerar outro token" : "Gerar token"
                                }
                            </Button>
                            {
                                token &&
                                <Card variant="filled" bg="white" className={styles.token_container} style={{
                                    borderTopLeftRadius: "0",
                                    borderBottomLeftRadius: "0",
                                }}>
                                    <CardBody className={styles.token_container} style={{ padding: "0", paddingLeft: "17px" }}>
                                        <span>
                                            {token}
                                        </span>
                                        <Tooltip hasArrow label="Clique aqui para copiar o token" bg="black">
                                            <span>
                                                <IconButton icon={CopyButton} handleClick={copyToken} style={{ height: "25px" }} />
                                            </span>
                                        </Tooltip>

                                    </CardBody>
                                </Card>
                            }
                        </div>
                            
                            { token && 
                            <FormControl isInvalid={!validPhoneNumber} className={styles.send_to_whatsapp}>
                                <Input bg="white" width="306px" type="text" placeholder="Insira o número de telefone" onChange={(e) => {setPhoneNumber(e.target.value)}} />
                                <FormErrorMessage>
                                    Por favor, insira um número.
                                </FormErrorMessage>
                                <Button leftIcon={<WhatsAppIcon />} colorScheme="whatsapp" onClick={sendTokenThroughWhatsapp}>
                                    Enviar para o WhatsApp
                                </Button>
                            </FormControl>
                            }

                    </div>
                </CardBody>
            </Card>
        </div>
    )
}

export default GenerateToken;