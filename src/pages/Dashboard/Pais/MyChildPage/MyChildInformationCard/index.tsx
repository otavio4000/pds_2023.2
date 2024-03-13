import styles from "./styles.module.css";
import banner from "assets/images/wave-banner.svg";
import { useParams } from "react-router-dom";
import { useState, useContext } from "react";
import Notification from "../components/Notification";
import AcompanhamentoCard from "../components/AcompanhamentoCard";
import { Heading, Box, Divider, Text } from "@chakra-ui/react";
import { ParentDashboardContext } from "context/ParentDashboardContext";

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



const MyChildInformationCard = () => {
    const { id } = useParams(); 
    const [notifications, setNotifications] = useState<Array<INotification>>([
        {
            type: "bullying",
            title: "Atualização do Caso",
            description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusantium velit perspiciatis ipsum quia quis adipisci rerum commodi excepturi optio! Aliquid quidem vero nisi veritatis quod in accusamus ex maiores! Dicta.",
            color: "pink",
            time: "24 de nov. às 10:30",
        },
        {
            type: "alerta de falta",
            title: "Fausto Silva vêm faltando aulas frequentemente",
            description: "Nosso sistema detectou que Fausto Silva teve x faltas no último mês.",
            color: "orange",
            time: "23 de fev. às 16:30"
        }
    ]);

    const [acompanhamentos, setAcompanhamentos] = useState<Array<AcompanhamentoDetails>>([
        {
            types: [{title: "bullying", color: "purple"}, {title: "violência física", color: "orange"}],
            title: "Bullying durante as aulas de educação física",
            praticante: "Fausto Silva",
            vitima: "Silvio Santos",
            link: "21312331231"
        },
        {
            types: [{title: "violência física", color: "orange"}],
            title: "Briga no pátio ESCOLAR",
            praticante: "Silvio Santos",
            vitima: "Fausto Silva",
            link: "5435345341"
        },
    ])

    return (
        <div className={styles.container_main}>
            <div className={styles.main}>
                <div className={styles.notifications}>
                    <Heading size="lg" className={styles.heading}>
                        Notificações Recentes
                    </Heading>
                    {
                        notifications.map(notification => {
                            return(
                                <Notification info={notification} />
                            )
                        })
                    }

                </div>
                <div className={styles.reports}>
                    <Heading size="lg" className={styles.heading}>
                        Acompanhamento
                    </Heading>
                    <div className={styles.reports_cards}>
                        {
                            acompanhamentos.map(acompanhamento => {
                                return(
                                    <AcompanhamentoCard acompanhamento={acompanhamento} />
                                )
                            })
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default MyChildInformationCard;