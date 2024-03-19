import styles from "../styles.module.css";
import { useForm } from "react-hook-form";
import wave from "assets/images/wave-1.svg";
import {
    Card, CardHeader, CardBody,
    Heading, FormControl, FormLabel, FormErrorMessage,
    Input, Button, ButtonGroup, useToast
} from "@chakra-ui/react";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import api from "services/api";
import { useState } from "react";

const schema = yup.object().shape({
    username: yup.number().typeError("Por favor, insira o CPF.").required("Por favor, insira o CPF.")
        .test(
            "formatacao-cpf",
            "Por favor, insira um CPF válido.",
            value => {
                const valueToString = value.toString();
                
                if (valueToString.length == 11) {
                    return true;
                }

                return false;
            }
        ),
    first_name: yup.string().required("Por favor, insira um primeiro nome."),
    last_name: yup.string().required("Por favor, insira um sobrenome."),
    email: yup.string().required("Por favor, insira um endereço de e-mail.").matches(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/, "Insira um endereço de e-mail válido."),
    profissao: yup.string().required("Por favor, insira uma profissão."),
    password: yup.string().required("Por favor, insira uma senha."),
    telefone: yup.string().required("Por favor, insira um telefone."),
    endereco: yup.string().required("Por favor, insira um endereço.")
})


const AddPais = () => {

    const [isLoading, setIsLoading] = useState<boolean>(false);
    const toast = useToast();

    const { register, handleSubmit, getValues, formState: { errors }, reset } = useForm({
        resolver: yupResolver(schema),
    });

    const onSubmit = async (data: any) => {

        const { username, ...rest } = data;

        const cpf = username as number;
        const cpfAsString = cpf.toString();

        const post = { 
            username: cpfAsString,
            ...rest
        }

        setIsLoading(true);
        try {
            const response = await api.postForm(
                "/responsaveis/create", 
                post,
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}` 
                    }
                });
            setIsLoading(false);
            
            toast({
                position: "top",
                title: "Responsável cadastrado!",
                description: "Obrigada por utilizar nossos serviços.",
                status: "success",
                duration: 9000,
                isClosable: true,
                containerStyle: {
                    color: "white"
                }
            })

            console.log(response) 
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
            console.log(error)
        }
    }

    return (
        <div className={styles.container}
            style={{
                backgroundImage: `url(${wave})`
            }}>
            <form onSubmit={handleSubmit(onSubmit)}>
                <Card w="lg" className={styles.form_card}>
                    <CardHeader className={styles.header}>
                        <Heading size="lg">
                            Cadastro de Responsável
                        </Heading>
                    </CardHeader>
                    <CardBody className={styles.body}>
                        <FormControl isInvalid={!!errors.username}>
                            <FormLabel>CPF</FormLabel>
                            <Input {...register("username")} type="text" placeholder="Ex: XXX.XXX.XXX-XX" />
                            <FormErrorMessage className={styles.input_error_message}> {errors.username?.message} </FormErrorMessage>
                        </FormControl>
                        <FormControl isInvalid={!!errors.first_name}>
                            <FormLabel>Primeiro Nome</FormLabel>
                            <Input {...register("first_name")} type="text" placeholder="Ex: João" />
                            <FormErrorMessage className={styles.input_error_message}> {errors.first_name?.message} </FormErrorMessage>
                        </FormControl>
                        <FormControl isInvalid={!!errors.last_name}>
                            <FormLabel>Segundo Nome</FormLabel>
                            <Input {...register("last_name")} type="text" placeholder="Ex: Silva" />
                            <FormErrorMessage className={styles.input_error_message}> {errors.last_name?.message} </FormErrorMessage>
                        </FormControl>
                        <FormControl isInvalid={!!errors.email}>
                            <FormLabel>E-mail</FormLabel>
                            <Input {...register("email")} type="email" placeholder="Ex: joaosilva@mail.com" />
                            <FormErrorMessage className={styles.input_error_message}> {errors.email?.message} </FormErrorMessage>
                        </FormControl>
                        <FormControl isInvalid={!!errors.password}>
                            <FormLabel>Senha</FormLabel>
                            <Input {...register("password")} type="password" placeholder="Digite a senha desejada aqui" />
                            <FormErrorMessage className={styles.input_error_message}> {errors.password?.message} </FormErrorMessage>
                        </FormControl>
                        <FormControl isInvalid={!!errors.profissao}>
                            <FormLabel>Profissão</FormLabel>
                            <Input {...register("profissao")} type="text" placeholder="Insira sua profissão aqui" />
                            <FormErrorMessage className={styles.input_error_message}> {errors.profissao?.message} </FormErrorMessage>
                        </FormControl>
                        <FormControl isInvalid={!!errors.telefone}>
                            <FormLabel>Telefone</FormLabel>
                            <Input {...register("telefone")} type="text" placeholder="Insira seu número de celular aqui" />
                            <FormErrorMessage className={styles.input_error_message}> {errors.telefone?.message} </FormErrorMessage>
                        </FormControl>
                        <FormControl isInvalid={!!errors.telefone}>
                            <FormLabel>Endereço</FormLabel>
                            <Input {...register("endereco")} type="text" placeholder="Insira seu endereço aqui" />
                            <FormErrorMessage className={styles.input_error_message}> {errors.endereco?.message} </FormErrorMessage>
                        </FormControl>
                    
                        
                        <ButtonGroup className={styles.buttons}>
                            <Button
                                type="submit"
                                color="white.50"
                                bg="pink.50"
                                _hover={{ bgColor: "pink.100" }}
                                _active={{ bgColor: "pink.200" }}
                                isLoading={isLoading}
                            >
                                AVANÇAR
                            </Button>
                        </ButtonGroup>
                    </CardBody>
                </Card>
            </form>
        </div>
    )
}

export default AddPais;