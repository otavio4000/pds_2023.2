import banner from "assets/images/wave-banner.svg"
import { Link } from "react-router-dom";
import { Box, Heading, Divider, Text, FormControl, FormLabel, FormErrorMessage, ButtonGroup, Button } from "@chakra-ui/react";
import { Input, Select, RadioGroup, Radio, Textarea, Stack } from "@chakra-ui/react";
import { ReactComponent as HandIcon } from "assets/icons/closed-fist-icon.svg";
import styles from "./styles.module.css";


const Header = () => {
    return (
        <Box className={styles.banner} style={{
            backgroundColor: "white",
            backgroundImage: `url(${banner})`,
        }}>
            <Heading className={styles.banner_heading}>Denúncia de Violência</Heading>
            <Divider orientation="horizontal" />
            <Text fontSize="lg" className={styles.banner_text}>
            Aqui é um espaço livre e seguro para você denunciar qualquer maus-tratos que tenha ocorrido
        </Text>
        </Box>
    )
}


function FazerDenuncia() {
    return (
        <div className={styles.container}>
            <Header />
            <form action="#" onSubmit={() => {}} className={styles.container_main}>
                <Stack className={styles.complaint_report}>
                    <FormControl className={styles.violence_type}>
                        <FormLabel fontSize="lg">
                            Caracterize o seu relato
                        </FormLabel>
                        <RadioGroup className={styles.radio_group} colorScheme="red" size="lg">
                            <Stack spacing={4}>
                                <Radio value="fisica">Violência Física</Radio>
                                <Radio value="verbal">Violência Verbal</Radio>
                                <Radio value="bullying">Bullying</Radio>
                                <Radio value="assedio">Assédio</Radio>
                            </Stack>
                        </RadioGroup>
                    </FormControl>
                    <Stack spacing={4}>
                        <FormControl className={styles.violence_reccurence}>
                            <FormLabel fontSize="lg">
                                Qual a recorrência da violência?
                            </FormLabel>
                            <Select>
                                <option value='1'>Primeira vez</option>
                                <option value='2'>Recorrente</option>
                            </Select>
                        </FormControl>
                        <FormControl className={styles.violence_date}>
                            <FormLabel fontSize="lg">
                                Quando ocorreu?
                            </FormLabel>
                            <Input type="date" />
                        </FormControl>
                    </Stack>
                </Stack>
                <Stack spacing={3} className={styles.complaint_registration}>
                    <FormControl className={styles.student_registration}>
                        <Input type="number" placeholder="Número de matrícula" />
                    </FormControl>
                    <FormControl className={styles.report_description}>
                        <Textarea resize="none" placeholder="Digite o seu relato..." />
                    </FormControl>
                    <FormControl className={styles.identification}>
                        <FormLabel fontSize="lg">
                            Você deseja se identificar?
                        </FormLabel>
                        <RadioGroup className={styles.radio_group} colorScheme="blue" size="md">
                            <Stack spacing={2}>
                                <Radio value="s">Sim</Radio>
                                <Radio value="n">Não</Radio>
                            </Stack>
                        </RadioGroup>
                    </FormControl>
                    <ButtonGroup className={styles.form_buttons}>
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
                            type="submit" 
                            bg="green.50" 
                            colorScheme="green">
                                ENVIAR
                        </Button>
                        <Button 
                        leftIcon={<HandIcon width="20" />}
                        bg="orange"
                        colorScheme="orange">
                            SOFREU VIOLÊNCIA DOMÉSTICA?
                        </Button>
                    </ButtonGroup>
                </Stack>
            </form>
        </div>
    );
}

export default FazerDenuncia;