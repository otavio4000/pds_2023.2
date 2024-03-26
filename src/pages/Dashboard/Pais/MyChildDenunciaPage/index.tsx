import { checkIfUserHasAuthorization } from "utils/checkIfUserHasAuthorization";
import styles from "./styles.module.css";
import { AuthorizationType } from "enums/authorizationType";
import NotAuthorized from "components/NotAuthorized";
import { getBrazilianDate } from "utils/convertTimestampToBRDate";
import {
    Card, CardBody, CardHeader,
    Step,
    StepDescription,
    StepIcon,
    StepIndicator,
    StepNumber,
    StepSeparator,
    StepStatus,
    StepTitle,
    Stepper,
    useSteps,
    Box,
    Heading, 
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import api from "services/api";
import { useParams } from "react-router";
import TypeOfViolenceIcon from "pages/Dashboard/Coordenação/DenunciaCard/TypeOfViolenceIcon";
import LoadingSkeleton from "components/LoadingSkeleton";

interface Student {
    contato_substancias_ilicitas: "yes" | "no",
    cpf: string,
    data_nascimento: string
    engajamento_familia: string,
    historico_academico: string,
    historico_faltas: number
    id: number,
    matricula: number,
    nome: string
    observacoes: string,
    situacao_familiar: string,
    turma_ano: string
}

interface Denuncia {
    matricula: number,
    relato: string,
    telefone_1: string,
    telefone_2: string,
    arquivo_1: string,
    arquivo_2: string,
    arquivo_3: string,
    data_denuncia: string,
    recorrencia: string,
    lugar: string,
    id: number,
    body: string,
    titulo: string,
    praticantes: Array<any>,
    vitimas: Array<any>,
    v_fisica: "yes" | "no",
    v_domestica: "yes" | "no",
    v_verbal: "yes" | "no",
    bullying: "yes" | "no",
    assedio: "yes" | "no",
    data_ocorrido: string,
    pontuacao: number,
};


interface Medida {
    acao: string,
    tipo_acao: string,
    denuncia_id: number,
    id: number
}

const MyChildDenunciaPage = () => {

    const getNameFromStudents = (students: Array<Student>) => {
        return students.map((student) => {
            return `${student.nome}`;
        }).join(", ");
    }

    const { denunciaId } = useParams();
    const [isGettingMedidas, setGettingMedidas] = useState<boolean>();
    const [praticantes, setPraticantes] = useState<Array<Student>>();
    const [vitimas, setVitimas] = useState<Array<Student>>();
    const [medidas, setMedidas] = useState<Array<Medida>>();
    const [denuncia, setDenuncia] = useState<Denuncia>();
    const [title, setTitle] = useState<string>();

    useEffect(() => {

        const fetchDenuncia = async () => {

            const token = localStorage.getItem("token");
            const response = await api.get(`/denuncia/${denunciaId}`, {
                headers: {
                    "Authorization": "Bearer " + token
                }
            })

            const denuncia = response.data;


            const praticantesPromises = denuncia.praticantes.map(async (id: number) => {
                const response = await api.get(`/alunos/${id}/`, {
                    headers: {
                        "Authorization": "Bearer " + token
                    }

                })

                return response.data;
            })


            const vitimasPromises = denuncia.vitimas.map(async (id: number) => {
                const response = await api.get(`/alunos/${id}/`, {
                    headers: {
                        "Authorization": "Bearer " + token
                    }
                })

                return response.data;
            })

            const praticantesObj = await Promise.all(praticantesPromises);
            const vitimasObj = await Promise.all(vitimasPromises);

            setPraticantes(praticantesObj);
            setVitimas(vitimasObj);
            setDenuncia(denuncia);

            denuncia.titulo ? setTitle(denuncia.titulo) : setTitle("Denúncia");

            const medidas = await api.get(`/medida/denuncia/${denunciaId}`, {
                headers: {
                    "Authorization": "Bearer " + localStorage.getItem("token")
                }
            })


            if (medidas.data.length == 0) {
                setActiveStep(0);
            } else {
                setActiveStep(2);
            }

            setMedidas(medidas.data);
            setGettingMedidas(false);


        }

        fetchDenuncia();

    }, [])


    useEffect(() => {
        const fetchAndamentos = async () => {
            const medidas = await api.get(`/medida/denuncia/${denunciaId}`, {
                headers: {
                    "Authorization": "Bearer " + localStorage.getItem("token")
                }
            })


        }

        fetchAndamentos();
    }, [])

    const steps = [
        { title: 'Início', description: 'A denúncia chegou à coordenação' },
        { title: '', description: 'Medidas Tomadas' },
        { title: '', description: 'Situação Resolvida' },
    ]
    const { activeStep, setActiveStep } = useSteps({
        index: 1,
        count: steps.length,
    })


    if (checkIfUserHasAuthorization(AuthorizationType.Parent)) {
        if (denuncia) {

            return (
                <>
                    <div className={styles.container}>
                        <Card className={styles.card}>
                            <CardHeader className={styles.header}>
                                <div className={styles.title}>
    
                                    <Heading>
                                        {title}
                                    </Heading>
    
                                </div>
    
                                <div className={styles.violence_types}>
                                    {denuncia.v_domestica === 'yes' && (
                                        <TypeOfViolenceIcon violenceType="domestica" />
                                    )}
                                    {denuncia.v_fisica === 'yes' && (
                                        <TypeOfViolenceIcon violenceType="fisica" />
                                    )}
                                    {denuncia.v_verbal === 'yes' && (
                                        <TypeOfViolenceIcon violenceType="verbal" />
                                    )}
                                    {denuncia.bullying === 'yes' && (
                                        <TypeOfViolenceIcon violenceType="bullying" />
                                    )}
                                    {denuncia.assedio === 'yes' && (
                                        <TypeOfViolenceIcon violenceType="sexual" />
                                    )}
                                </div>
                            </CardHeader>
                            <CardBody>
                                <div className={styles.info}>
    
                                    {
                                        vitimas && vitimas.length > 0 ?
                                            <div>
                                                <b>Vítima(s):</b> {getNameFromStudents(vitimas)} 
                                            </div>
                                            :
                                            <div>
                                                <b>Vítima(s):</b> Ainda não foram adicionados vítimas
                                            </div>
                                    }
    
                                    {
                                        praticantes && praticantes.length > 0 ?
                                            <div>
                                                <b>Praticante(s):</b> {getNameFromStudents(praticantes)}
                                            </div>
                                            :
                                            <div>
                                                <b>Praticante(s):</b> Ainda não foram adicionados praticantes
                                            </div>
                                    }
                                    {
                                        isGettingMedidas ?
                                            <LoadingSkeleton justifyContent="center" />
                                            :
                                            <div className={styles.andamento}>
                                                <b>Andamento(s):</b> {activeStep == 0 && "Ainda não foram registrados andamentos."}
                                                <Stepper className={styles.medidas_tomadas} index={activeStep} orientation='vertical' gap='0'>
                                                    {steps.map((step, index) => (
                                                        <Step key={index}>
                                                            <StepIndicator>
                                                                <StepStatus
                                                                    complete={<StepIcon />}
                                                                    incomplete={<StepNumber />}
                                                                    active={<StepNumber />}
                                                                />
                                                            </StepIndicator>
    
                                                            <div className={styles.step_info}>
                                                                <Box flexShrink='0'>
                                                                    <StepTitle>{step.title}</StepTitle>
                                                                    <StepDescription>{step.description}</StepDescription>
                                                                </Box>
                                                                {
                                                                    activeStep == 0 && <div className={styles.blank}></div>
                                                                }
                                                                {
                                                                    index == 0 || index == 2 ?
                                                                        <div className={styles.blank}></div> :
                                                                        <div className={styles.medidas}>
                                                                            {
                                                                                medidas?.map((medida, index) => {
                                                                                    return (
                                                                                        <Card variant="filled" className={styles.andamento_card}>
                                                                                            <CardHeader className={styles.andamento_card_header}>
                                                                                                {medida.tipo_acao}
                                                                                            </CardHeader>
                                                                                            <CardBody className={styles.andamento_card_body}>
                                                                                                {medida.acao}
                                                                                            </CardBody>
                                                                                        </Card>
                                                                                    )
                                                                                })
                                                                            }
    
                                                                        </div>
                                                                }
                                                            </div>
    
                                                            <StepSeparator />
                                                        </Step>
                                                    ))}
                                                </Stepper>
                                            </div>
                                    }
                                </div>
                            </CardBody>
                        </Card>
                    </div>
    
                </>
            ) 
        } else {
            return <LoadingSkeleton justifyContent="center" />
        }
    } else {
        return (
            <NotAuthorized />
        )
    }
}

export default MyChildDenunciaPage;
