import wave from "assets/images/wave-1.svg";
import styles from "./styles.module.css";
import { Link } from "react-router-dom";
import { Card, VStack, Input, CardBody, Avatar, Button, ButtonGroup } from "@chakra-ui/react";


function Login() {
    return (
        <div className={styles.container} 
        style={{
            backgroundImage: `url(${wave})`
        }}>
            <Card className={styles.login_card} w="lg">
                <CardBody className={styles.login_card_body}>
                    <Avatar size="2xl" />
                    <VStack spacing="17px" mt="40px" w="fit-content">
                        <Input type="email" placeholder="Usuário" />
                        <Input type="password" placeholder="Senha" />
                        <ButtonGroup>
                            <Link to="/">
                                <Button 
                                color="white.50" 
                                bg="pink.50" 
                                _hover={{bgColor: "pink.100"}} 
                                _active={{bgColor: "pink.200"}}>
                                    VOLTAR
                                </Button>
                            </Link>
                            <Button
                            color="white.50"
                            bg="green.50"
                            colorScheme="green"
                            >ENVIAR</Button>
                        </ButtonGroup>
                    </VStack>
                </CardBody>
            </Card>
            
            
        </div>
    );
}

export default Login;