import styles from "./styles.module.css";
import wave from "assets/images/wave-1.svg";
import { 
    Card,
    CardBody,
    Heading,
    Divider,
    Button,
    useToast,
} from "@chakra-ui/react";
import { useState } from "react";
import api from "services/api";

const GenerateToken = () => {

    const [isLoading, setIsLoading] = useState<boolean>(false); 
    const [token, setToken] = useState<string>("");
    const toast = useToast(); 

    const askForToken = async () => {

        setIsLoading(true);
        try {
            const token = await api.post("/responsavel/token");
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


    return (
        <div className={styles.container}>
                <Card variant="filled" className={styles.main}>
                    <CardBody>
                        <Heading size="md">
                            Bem-vindo à nossa página de geração de tokens!
                        </Heading>
                        <Divider className={styles.divider}/>
                        <div className={styles.main_body}>
                            Aqui, você pode gerar tokens exclusivos para os pais, simplificando o processo de registro em nossa plataforma.
                                <div className={styles.token_group}>
                                    <Button
                                        color="white.50"
                                        bg="pink.50"
                                        _hover={{ bgColor: "pink.100" }}
                                        _active={{ bgColor: "pink.200" }}
                                        isLoading={isLoading}
                                        onClick={() => {

                                        }}
                                    >
                                        Gerar token
                                    </Button>
                                    <Card variant="filled" bg="white" className={styles.token_container}>
                                        12312312
                                    </Card>
                                </div>
                        </div>
                    </CardBody>
                </Card>
        </div>
    )
}

export default GenerateToken;