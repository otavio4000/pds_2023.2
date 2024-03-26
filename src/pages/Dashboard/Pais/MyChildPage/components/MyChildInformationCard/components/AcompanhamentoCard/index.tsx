import LoadingSkeleton from "components/LoadingSkeleton";
import styles from "./styles.module.css"
import { 
    Card,
    CardBody,
    Badge,
    Heading
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "services/api";

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
    id: number, 
    nome: string
}



const AcompanhamentoCard = (props: {
    acompanhamento: Denuncia
}) => {

    const getNameFromStudents = (students: Array<Filho>) => {
        return students.map((student) => {
            return `${student.nome}`;
        }).join(", ");
    }

    const [praticantes, setPraticantes] = useState<Array<Filho>>();
    const [vitimas, setVitimas] = useState<Array<Filho>>();
    const [isLoaded, setIsLoaded] = useState<boolean>(); 

    useEffect(() => {

        setIsLoaded(false);
        const fetchPraticantesVitimas = async () => {

            const praticantesPromises = acompanhamento.praticantes.map(async (id: number) => {
                const response = await api.get(`/alunos/${id}/`, {
                    headers: {
                        "Authorization": "Bearer " + localStorage.getItem("token")
                    }
    
                })
    
                return response.data;
            })
    
    
            const vitimasPromises = acompanhamento.vitimas.map(async (id: number) => {
                const response = await api.get(`/alunos/${id}/`, {
                    headers: {
                        "Authorization": "Bearer " + localStorage.getItem("token")
                    }
                })
    
                return response.data;
            })
    
            const praticantes = await Promise.all(praticantesPromises);
            const vitimas = await Promise.all(vitimasPromises);
            
            setPraticantes(praticantes);
            setVitimas(vitimas);

            setIsLoaded(true);
        }

        fetchPraticantesVitimas(); 
    }, [])

    const { acompanhamento } = props; 
    let typesOfViolence: Array<TypeOfViolence> = [];

    if (acompanhamento.assedio == "yes") {
        typesOfViolence.push({
            title: "ASSÉDIO",
            color: "purple"
        });
    }
    if (acompanhamento.v_fisica == "yes") {
        typesOfViolence.push({
            title: "VIOLÊNCIA FÍSICA",
            color: "pink"
        });
    }
    if (acompanhamento.v_verbal == "yes") {
        typesOfViolence.push({
            title: "VIOLÊNCIA VERBAL",
            color: "green"
        });
    }
    if (acompanhamento.v_domestica == "yes") {
        typesOfViolence.push({
            title: "VIOLÊNCIA DOMÉSTICA",
            color: "orange"
        });
    }
    if (acompanhamento.bullying == "yes") {
        typesOfViolence.push({
            title: "BULLYING",
            color: "blue"
        });
    }

    if (isLoaded) {

            return (
                <Link to={`./${acompanhamento.id}`}>
                    <Card className={styles.card} variant="filled">
                        <CardBody className={styles.main}>
                            <div className={styles.types_of_violence}>
                                {
                                    typesOfViolence.map((type) => {
                                        return(
                                            <Badge variant="solid" colorScheme={type.color}>
                                                { type.title }
                                            </Badge>
                                        )
                                    })
                                }
                            </div>
                            <Heading size="sm">
                                { acompanhamento.title }
                            </Heading>
                            <div className={styles.people}>
                                {
                                    acompanhamento.praticantes && acompanhamento.praticantes.length > 0 && 
                                    <div>
                                        <b>Praticante(s): </b>
                                        { praticantes && praticantes.length > 0 && getNameFromStudents(praticantes) }
                                    </div>
                                }
                                {
                                    acompanhamento.vitimas && acompanhamento.vitimas.length > 0 && 
                                    <div>
                                        <b>Vítima(s): </b>{ vitimas && vitimas.length > 0 && getNameFromStudents(vitimas) }
                                    </div>
                                }
                            </div>
                        </CardBody>
                        
                    </Card>
                </Link>
            )

    } else {

        return (
            <LoadingSkeleton justifyContent="center" width={130} height={100}/>
        )
    }
}

export default AcompanhamentoCard; 