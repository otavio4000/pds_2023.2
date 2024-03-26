import { useParams } from "react-router";
import banner from "assets/images/wave-banner.svg";
import styles from "./styles.module.css";
import {
    Heading,
    Box,
    Divider,
    Text
} from "@chakra-ui/react";
import { useContext, useState } from "react";
import { ParentDashboardContext } from "context/ParentDashboardContext";
import MyChildInformationCard from "./components/MyChildInformationCard";
import { checkIfUserHasAuthorization } from "utils/checkIfUserHasAuthorization";
import { AuthorizationType } from "enums/authorizationType";
import NotAuthorized from "components/NotAuthorized";

interface Denuncia {
	matricula: number,
	relato: string,
	recorrencia: string,
	id: number,
	body: string,
	title: string,
	v_fisica: "yes" | "no",
	v_domestica: "yes" | "no",
	v_verbal: "yes" | "no",
	bullying: "yes" | "no",
	assedio: "yes" | "no",
	data_ocorrido: string,
	pontuacao: number,
};



const Header = () => {

    const [denuncias, setDenuncias] = useState();

    return (
        <Box className={styles.banner} style={{
            backgroundColor: "white",
            backgroundImage: `url(${banner})`,
            height: "147px"
        }}>
            <Heading className={styles.banner_heading}>
                {}
            </Heading>
            <Divider orientation="horizontal" />
            <Text fontSize="lg" className={styles.banner_text}>
                {""}
            </Text>
        </Box>

    )
}



const MyChildPage = () => {

    if (checkIfUserHasAuthorization(AuthorizationType.Parent)) {
        return (
            <MyChildInformationCard />
        )
    } else {
        return <NotAuthorized />
    }

}

export default MyChildPage;