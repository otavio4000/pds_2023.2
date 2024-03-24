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
import Notification from "./components/Notification";
import AcompanhamentoCard from "./components/AcompanhamentoCard";
import MyChildInformationCard from "./MyChildInformationCard";
import AcompanhamentoInformationCard from "./AcompanhamentoInformationCard";

interface INotification {
    type: string,
    title: string,
    time: string,
    description: string, 
    color: string 
}

interface TypeOfViolence {
    title: string,
    color: string
}


interface AcompanhamentoDetails {
    types: Array<TypeOfViolence>,
    title: string, 
    praticante: string,
    vitima: string,
    link: string 
}

const Header = () => {

    const { parentDashboardState } = useContext(ParentDashboardContext);
    console.log("parentDashboardState", parentDashboardState)

    return (
        <Box className={styles.banner} style={{
            backgroundColor: "white",
            backgroundImage: `url(${banner})`,
            height: "147px"
        }}>
            <Heading className={styles.banner_heading}> 
                { parentDashboardState == "general" ? "" : "Título da denúncia"}
            </Heading>
            <Divider orientation="horizontal" />
            <Text fontSize="lg" className={styles.banner_text}> 
                { parentDashboardState == "general" ? "" : "Aqui deve ficar o nome do meu filho."} 
            </Text>
        </Box>
        
    )
}

const Display = () => {

    const { parentDashboardState } = useContext(ParentDashboardContext);

    if (parentDashboardState == "general") {
        return (
            <MyChildInformationCard />
        )
    } else {
        return (
            <AcompanhamentoInformationCard />
        )
    }

}

const MyChildPage = () => {

    return (
        <>
            <Header />
            <Display />
        </>
    )
    
}

export default MyChildPage;