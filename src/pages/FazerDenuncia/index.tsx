import banner from "assets/images/wave-banner.svg"
import { Link } from "react-router-dom";
import { Box, Heading, Divider, Text, FormControl, FormLabel, FormErrorMessage, ButtonGroup, Button, InputGroup } from "@chakra-ui/react";
import { Input, InputLeftAddon, Select, RadioGroup, Radio, Textarea, Stack } from "@chakra-ui/react";
import { ReactComponent as HandIcon } from "assets/icons/closed-fist-icon.svg";
import styles from "./styles.module.css";
import { useState, createContext, useContext } from "react";

enum ViolenceType {
    School = "SCHOOL_VIOLENCE",
    Domestic = "DOMESTIC_VIOLENCE"
}

interface DenunciaContextData {
    violenceType: ViolenceType;
    setViolenceType: (type: ViolenceType) => void;
    formSent: boolean;
    wasFormSent: (value: boolean) => void
}

const DenunciaContext = createContext<DenunciaContextData>({
    violenceType: ViolenceType.School,
    setViolenceType: () => {},
    formSent: false,
    wasFormSent: () => {}
});


const Header = () => {

    const {violenceType} = useContext(DenunciaContext);

    return (
        <Box className={styles.banner} style={{
            backgroundColor: "white",
            backgroundImage: `url(${banner})`,
        }}>
            <Heading className={styles.banner_heading}>Denúncia de Violência {violenceType === ViolenceType.Domestic && "Doméstica"}</Heading>
            <Divider orientation="horizontal" />
            <Text fontSize="lg" className={styles.banner_text}>
                {
                    violenceType === ViolenceType.School ? 
                    "Aqui é um espaço livre e seguro para você denunciar qualquer maus-tratos que tenha ocorrido na sua escola." :
                    "Sentimos muito que isso esteja acontecendo com você. Por favor, deixe seu relato e número de um parente confiável."
                }
            </Text>
        </Box>
    )
}

const Display = () => {
    
    const {violenceType, setViolenceType, wasFormSent} = useContext(DenunciaContext);

    if (violenceType == ViolenceType.School) {
        return (
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
                </Stack>
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
                        <ButtonGroup>
                            <Button 
                                type="submit" 
                                bg="green.50" 
                                colorScheme="green"
                                onClick={() => {
                                    wasFormSent(true);
                                }}>
                                    ENVIAR
                            </Button>
                            <Button 
                            leftIcon={<HandIcon width="20" />}
                            bg="orange"
                            colorScheme="orange"
                            onClick={() => {
                                setViolenceType(ViolenceType.Domestic)
                            }
                            }>
                                SOFREU VIOLÊNCIA DOMÉSTICA?
                            </Button>
                        </ButtonGroup>
                    </ButtonGroup>
            </form>
        )
    }

    return (
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
                                <Radio value="sexual">Violência Sexual</Radio>
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
                    <Stack direction="row">
                        <InputGroup>
                            <InputLeftAddon>
                                +55
                            </InputLeftAddon>
                            <Input type='tel' placeholder='Contato 1' />
                        </InputGroup>
                        <InputGroup>
                            <InputLeftAddon>
                                +55
                            </InputLeftAddon>
                            <Input type='tel' placeholder='Contato 2' />
                        </InputGroup>
                    </Stack>
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
                </Stack>
                    <ButtonGroup className={styles.form_buttons}>
                            <Button
                                color="white.50" 
                                bg="pink.50" 
                                _hover={{bgColor: "pink.100"}} 
                                _active={{bgColor: "pink.200"}}
                                onClick={() => {
                                    setViolenceType(ViolenceType.School);
                                }}>
                                    VOLTAR
                            </Button>
                        <ButtonGroup>
                            <Button 
                                type="submit" 
                                bg="green.50" 
                                colorScheme="green"
                                onClick={() => {
                                    wasFormSent(true);
                                }}
                                >
                                    ENVIAR
                            </Button>
                        </ButtonGroup>
                    </ButtonGroup>
            </form>
    );
}

const ResponseMessage = () => {
    return (
        <Stack spacing={4} className={styles.response_message}>
            <Heading>Obrigada por sua denúncia!</Heading>
            <Text>
            Agradecemos pela sua coragem e determinação para deixarmos nosso ambiente escolar ainda melhor! 
            VigiAluno é um ambiente seguro, as ações que tomaremos serão em completo sigilo.
            </Text>
            <ButtonGroup className={styles.response_message_buttons}>
                <Link to="/">
                    <Button
                        color="white.50" 
                        bg="pink.50" 
                        _hover={{bgColor: "pink.100"}} 
                        _active={{bgColor: "pink.200"}}
                        >
                            VOLTAR
                    </Button>
                </Link>
            </ButtonGroup>
        </Stack>

    );
}



function FazerDenuncia() {

    /* Três telas diferentes: Violência normal, violência doméstica e obrigada por denunciar
    Contexto deve ser compartilhado por Header e main_component 
    
    */

    const [violenceType, setViolenceType] = useState<ViolenceType>(ViolenceType.School);
    const [formSent, wasFormSent] = useState<boolean>(false);

    return (
        <div className={styles.container}>
            <DenunciaContext.Provider value={{violenceType, setViolenceType, formSent, wasFormSent}}>
                <Header />
                
                {
                    formSent ? 
                    <ResponseMessage />
                    :
                    <Display />
                }

            </DenunciaContext.Provider>
        </div>
    );
}

export default FazerDenuncia;