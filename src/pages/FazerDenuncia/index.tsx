import banner from "assets/images/wave-banner.svg"
import { Link } from "react-router-dom";
import { Box, Heading, Divider, Text, FormControl, FormLabel, FormErrorMessage, ButtonGroup, Button, InputGroup } from "@chakra-ui/react";
import { Input, InputLeftAddon, Select, RadioGroup, Radio, Checkbox, CheckboxGroup, Textarea, Stack } from "@chakra-ui/react";
import { ViolenceType } from "enums/violencetype";
import { DenunciaContext } from "context/DenunciaContext";
import { VerificationCodeContext } from "context/VerificationCodeContext";
import styles from "./styles.module.css";
import { useState, useContext } from "react";
import SchoolViolenceCard from "./SchoolViolenceCard";
import DomesticViolenceCard from "./DomesticViolenceCard";




const Header = () => {

    const { violenceType } = useContext(DenunciaContext);

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

    const { violenceType, setViolenceType, wasFormSent } = useContext(DenunciaContext);

    if (violenceType == ViolenceType.School) {
        return <SchoolViolenceCard />
    }

    return <DomesticViolenceCard />
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
                        _hover={{ bgColor: "pink.100" }}
                        _active={{ bgColor: "pink.200" }}
                    >
                        VOLTAR
                    </Button>
                </Link>
            </ButtonGroup>
        </Stack>

    );
}



function FazerDenuncia() {

    const [violenceType, setViolenceType] = useState<ViolenceType>(ViolenceType.School);
    const [formSent, wasFormSent] = useState<boolean>(false);

    return (
        <div className={styles.container}>
            <DenunciaContext.Provider value={{ violenceType, setViolenceType, formSent, wasFormSent }}>
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