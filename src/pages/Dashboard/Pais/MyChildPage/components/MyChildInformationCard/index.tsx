import styles from "./styles.module.css";
import banner from "assets/images/wave-banner.svg";
import { useParams } from "react-router-dom";
import { useState, useContext, useEffect } from "react";
import AcompanhamentoCard from "./components/AcompanhamentoCard";
import { Heading, Box, Divider, Text } from "@chakra-ui/react";
import { checkIfUserHasAuthorization } from "utils/checkIfUserHasAuthorization";
import { AuthorizationType } from "enums/authorizationType";
import { ParentDashboardContext } from "context/ParentDashboardContext";
import NotAuthorized from "components/NotAuthorized";
import api from "services/api";


interface TypeOfViolence {
    title: string,
    color: string
}

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
    praticantes: number[],
    vitimas: number[]
};





interface Filho {
    nome: string,
    id: string
}


const MyChildInformationCard = () => {
    const { id } = useParams(); 
    const [isLoaded, setIsLoaded] = useState<boolean>();
    const [denunciasFromChild, setDenunciasFromChild] = useState<Array<Denuncia>>();



    useEffect(() => {

        const fetchAcompanhamentos = async () => {
            const response = await api.get("/denuncia/dependentes", {
                headers: {
                    "Authorization": "Bearer " + localStorage.getItem("token")
                }
            })

            const denuncias: Array<Denuncia> = response.data;
            
            const denunciasFromThisChild = denuncias.filter((denuncia) => {
                if (id) {
                    return denuncia.praticantes.includes(parseInt(id)) || denuncia.vitimas.includes(parseInt(id))
                }
            })


            setDenunciasFromChild(denunciasFromThisChild);
        }

        fetchAcompanhamentos();

    })

   

    if (checkIfUserHasAuthorization(AuthorizationType.Parent)) {
        return (
            <div className={styles.container_main}>
                <div className={styles.main}>
                    <div className={styles.reports}>
                        <Heading size="lg" className={styles.heading}>
                            Acompanhamentos
                        </Heading>
                        <div className={styles.reports_cards}>
                            {
                                denunciasFromChild ? 
                                denunciasFromChild.map(acompanhamento => {
                                    return(
                                        <AcompanhamentoCard acompanhamento={acompanhamento} key={acompanhamento.title} />
                                    )
                                }) : 
                                <Heading> Não existem denúncias que envolvam o seu filho. </Heading>

                            }
                        </div>
                    </div>
                </div>
            </div>
        ) 
    } else {
        return <NotAuthorized />
    }


}

export default MyChildInformationCard;