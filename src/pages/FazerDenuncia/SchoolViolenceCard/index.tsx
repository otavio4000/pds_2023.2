import styles from "../styles.module.css";
import { Link } from "react-router-dom";
import { ReactComponent as HandIcon } from "assets/icons/closed-fist-icon.svg";
import { 
    ButtonGroup,
    Button,
    Stack, 
    FormControl, 
    FormLabel,
    RadioGroup,
    Radio,
    CheckboxGroup,
    Checkbox,
    Select,
    Input,
} from "@chakra-ui/react";
import { ViolenceType } from "enums/violencetype";
import { DenunciaContext } from "context/DenunciaContext";
import { useState, useContext } from "react";

const handleSubmit = () => {

}

const handleInput = () => {

}

const SchoolViolenceCard = () => {

    const {violenceType, setViolenceType, wasFormSent} = useContext(DenunciaContext);

    const [post, setPost] = useState({
        relato:'',
        lugar:'',
        v_fisica: "no",
        v_verbal: "no",
        bullying: "no",
        assedio: "no",
        recorrencia:'',
        data_ocorrido:'',
    
    });

    return (
        <form onSubmit = {handleSubmit} className={styles.container_main}>
        <Stack className={styles.complaint_report}>
            <FormControl className={styles.violence_type} onChange={handleInput}>
                <FormLabel fontSize="lg">
                    Caracterize o seu relato
                </FormLabel>
                <RadioGroup className={styles.radio_group}  colorScheme="red" size="lg">
                    <Stack spacing={4}>
                        <CheckboxGroup colorScheme="pink"> 
                            <Checkbox>Violência Física</Checkbox>
                            <Checkbox>Violência Verbal</Checkbox>
                            <Checkbox>Bullying</Checkbox>
                            <Checkbox>Assédio</Checkbox>
                        </CheckboxGroup>
                        <input type="checkbox" name="v_fisica"  value="yes"  />
                        <input type="checkbox" name="v_verbal" value="yes" />
                        <input type="checkbox" name="bullying" value="yes" />
                        <input type="checkbox" name="assedio" value="yes" />
                    </Stack>
                </RadioGroup>
            </FormControl>
            <Stack spacing={4}>
                <FormControl  onChange = {handleInput} className={styles.violence_reccurence} >
                    <FormLabel fontSize="lg">
                        Qual a recorrência da violência?
                    </FormLabel>
                    <Select name="recorrencia">
                        <option value=''>---</option>
                        <option value='primeira'>Primeira vez</option>
                        <option value='recorrente'>Recorrente</option>
                    </Select>
                </FormControl>
                <FormControl className={styles.violence_date}>
                    <FormLabel fontSize="lg">
                        Quando ocorreu?
                    </FormLabel>
                    <Input type="date" onChange={handleInput} value={post.data_ocorrido}  name ="data_ocorrido" />
                </FormControl>
            </Stack>
        </Stack>
        <Stack spacing={3} className={styles.complaint_registration}>
            <FormControl className={styles.student_registration}>
                <Input type="number" placeholder="Número de matrícula" />
            </FormControl>
            <FormControl className={styles.report_description}>
                {/* <Textarea  resize="none" placeholder="Digite o seu relato..." /> */}
                <input type="text" value={post.relato} onChange={handleInput} name="relato"  placeholder="Digite seu relato"/>
            </FormControl>
            <FormControl className={styles.report_description}>
                
                <input type="text" value={post.lugar} onChange={handleInput} name="lugar"  placeholder="Digite onde ocorreu"/>
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
                        // onClick={() => {
                        //     wasFormSent(true);
                        // }}
                        >
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

export default SchoolViolenceCard;