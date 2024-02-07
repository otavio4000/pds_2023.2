import styles from "../styles.module.css";
import { useContext } from "react";
import { DenunciaContext } from "context/DenunciaContext";
import { ViolenceType } from "enums/violencetype";
import { 
    Stack,
    FormControl,
    FormLabel,
    RadioGroup,
    Radio,
    Select,
    InputGroup,
    InputLeftAddon,
    Input,
    Textarea,
    ButtonGroup, 
    Button
 } from "@chakra-ui/react";

const DomesticViolenceCard = () => {

    const {violenceType, setViolenceType, wasFormSent} = useContext(DenunciaContext);

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
    )
}

export default DomesticViolenceCard;