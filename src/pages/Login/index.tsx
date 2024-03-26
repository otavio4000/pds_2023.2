import wave from "assets/images/wave-1.svg";
import styles from "./styles.module.css";
import { Link, useNavigate } from "react-router-dom";
import {
    Card,
    VStack,
    Input,
    CardBody,
    Avatar,
    Button,
    ButtonGroup,
    Alert,
    AlertIcon,
    AlertTitle,
    AlertDescription,
} from "@chakra-ui/react";
import api from "services/api";
import { useState, createContext, useContext } from "react";


function Login() {

    const navigate = useNavigate();

    const [post, setPost] = useState({
        username: '',
        password: ''
    })
    const [token, setToken] = useState<string>('');
    const [isLoading, setIsLoading] = useState(false);
    const [errorInLoging, setErrorInLoging] = useState("");

    const handleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setPost((prevPost) => ({
            ...prevPost,
            [name]: value,
        }));
    };

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        setIsLoading(true);

        api.post('/authentication/token/', post)
            .then(response => {
                setIsLoading(false);

                const token = response.data.access;
                setToken(token);
                localStorage.setItem('token', token);

                const payload = JSON.parse(atob(token.split('.')[1]));
                const userId = payload.user_id;
                localStorage.setItem('user_id', userId);

                navigate("/dashboard");
            })
            .catch(err => {
                setErrorInLoging(err.response.data.detail)
                setIsLoading(false);
                console.log(err);
            });
    }
    return (
        <div className={styles.container}
            style={{
                backgroundImage: `url(${wave})`
            }}>
            <form onSubmit={handleSubmit}>
                <Card className={styles.login_card} w="lg">
                    <CardBody className={styles.login_card_body}>
                        <Avatar size="2xl" />
                        <VStack spacing="17px" mt="40px" w="fit-content">

                            <Input type="text" onChange={handleInput} placeholder="Usuário" name="username" />
                            <Input type="password" onChange={handleInput} placeholder="Senha" name="password" />

                            {
                                errorInLoging != "" && 
                                <Alert status='error'>
                                    <AlertIcon />
                                    <AlertDescription> {errorInLoging} </AlertDescription>
                                </Alert>
                            }

                            <ButtonGroup>
                                <Link to="/">
                                    <Button
                                        color="white.50"
                                        bg="pink.50"
                                        _hover={{ bgColor: "pink.100" }}
                                        _active={{ bgColor: "pink.200" }}>
                                        VOLTAR
                                    </Button>
                                </Link>
                                <Button
                                    type="submit"
                                    color="white.50"
                                    bg="green.50"
                                    colorScheme="green"
                                    isLoading={isLoading}
                                >ENVIAR</Button>
                            </ButtonGroup>
                        </VStack>
                    </CardBody>
                </Card>
            </form>

        </div>
    );
}

export default Login;