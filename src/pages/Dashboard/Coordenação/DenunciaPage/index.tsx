import { checkIfUserHasAuthorization } from "utils/checkIfUserHasAuthorization";
import styles from "./styles.module.css";
import { useParams } from "react-router";
import { ReactComponent as PlusSign } from "assets/icons/add-plus-svgrepo-com.svg";
import { ReactComponent as Edit } from "assets/icons/edit-3-svgrepo-com.svg";
import { ReactComponent as Confirm } from "assets/icons/confirm-svgrepo-com.svg";
import { AuthorizationType } from "enums/authorizationType";
import {
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    ButtonGroup,
    Button,
    Heading,
    useDisclosure,
    Input,
    useToast,
    Skeleton,
    Stack
} from "@chakra-ui/react";
import {
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
} from "@chakra-ui/react";
import NotAuthorized from "components/NotAuthorized";
import TypeOfViolenceIcon from "../DenunciaCard/TypeOfViolenceIcon";
import { useEffect, useState } from "react";
import { getBrazilianDate } from "utils/convertTimestampToBRDate";
import api from "services/api";

import AddPraticantesModal from "./components/AddPraticantesModal";
import AddVitimasModal from "./components/AddVitimasModal";
import IconButton from "components/IconButton";
import AddAndamentoModal from "./components/AddAndamentoModal";

import axios from "axios";
import LoadingSkeleton from "components/LoadingSkeleton";


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

interface Medida {
    acao: string,
    tipo_acao: string,
    denuncia_id: number,
    id: number
}


const DenunciaPage = () => {

    const { id } = useParams();
    const [editingTitle, setEditingTitle] = useState<boolean>();
    const [isLoading, setIsLoading] = useState<boolean>();
    const [isGettingMedidas, setGettingMedidas] = useState<boolean>(true);
    const [title, setTitle] = useState<string>("Denúncia");
    const [denuncia, setDenuncia] = useState<Denuncia>();
    const [praticantes, setPraticantes] = useState<Array<Student>>();
    const [vitimas, setVitimas] = useState<Array<Student>>();
    const [medidas, setMedidas] = useState<Array<Medida>>();
    const { isOpen: isOpenAddPraticante, onOpen: onOpenAddPraticante, onClose: onCloseAddPraticante } = useDisclosure();
    const { isOpen: isOpenAddVitima, onOpen: onOpenAddVitima, onClose: onCloseAddVitima } = useDisclosure();
    const { isOpen: isOpenAddAndamento, onOpen: onOpenAddAndamento, onClose: onCloseAddAndamento } = useDisclosure();
    const toast = useToast();
    const steps = [
        { title: 'Início', description: 'A denúncia chegou à coordenação' },
        { title: '', description: 'Medidas Tomadas' },
        { title: '', description: 'Situação Resolvida' },
    ]
    const { activeStep, setActiveStep } = useSteps({
        index: 1,
        count: steps.length,
    })

    const getNameFromStudents = (students: Array<Student>) => {
        return students.map((student) => {
            return `${student.nome} (${student.matricula})`;
        }).join(", ");
    }

    const handleTitleChange = async () => {

        setIsLoading(true);
        try {
            const response = await api.patch(`/denuncia/edit/${denuncia?.id}/`, {
                titulo: title
            }, {
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem("token"),
                }
            })

            setIsLoading(false);
            toast({
                position: "top",
                title: "Título alterado com sucesso!",
                description: "Obrigado por utilizar nossos serviços.",
                status: "success",
                duration: 2000,
                isClosable: true,
                containerStyle: {
                    color: "white"
                },
                onCloseComplete: () => {
                }
            })

        } catch (error) {
            setIsLoading(false);
            toast({
                position: "top",
                title: "Algo deu errado!",
                description: "Por favor, tente novamente.",
                status: "error",
                duration: 2000,
                isClosable: true,
                containerStyle: {
                    color: "white"
                },
                onCloseComplete: () => {
                }
            })

        }

        setEditingTitle(editingState => !editingState);


    }

    const [status, setStatus] = useState('não investigado');
    const [redirect, setRedirect] = useState(false);

    const handleMarcarResolvido = () => {
        const token = localStorage.getItem("token");
        const config = {
            headers: {
                Authorization: `Bearer ${token}`
            }
        };
        axios.patch(`https://backendd-vk3y.onrender.com/api/v1/denuncia/edit/${id}/`, { status: 'resolvido' }, config)
            .then(response => {
                console.log('Denúncia marcada como resolvida:', response.data);
                setStatus("resolvido");
                window.location.href = '/dashboard';
            })

            .catch(error => {
                console.error('Erro ao marcar a denúncia como resolvida:', error);
            });
    };


    useEffect(() => {
        const fetchDenuncia = async () => {

            const token = localStorage.getItem("token");
            const response = await api.get(`/denuncia/${id}`, {
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

            const praticantes = await Promise.all(praticantesPromises);
            const vitimas = await Promise.all(vitimasPromises);

            setPraticantes(praticantes);
            setVitimas(vitimas);
            setDenuncia(denuncia);

            denuncia.titulo ? setTitle(denuncia.titulo) : setTitle("Denúncia");

            const medidas = await api.get(`/medida/denuncia/${id}`, {
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







    if (denuncia) {

        if (!(checkIfUserHasAuthorization(AuthorizationType.Coordenation) || checkIfUserHasAuthorization(AuthorizationType.Parent))) {

            return (
                <NotAuthorized />
            )

        } else {

            return (
                <>
                    <div className={styles.container}>
                        <Card className={styles.card}>
                            <CardHeader className={styles.header}>
                                <div className={styles.title}>
                                    {
                                        editingTitle ?
                                            <Input onChange={e => setTitle(e.target.value)} className={styles.title_input} type="text" placeholder="Insira aqui um título" defaultValue={denuncia.titulo ? denuncia.titulo : ""} />
                                            :
                                            <Heading>
                                                {
                                                    title
                                                }
                                            </Heading>
                                    }
                                    {
                                        editingTitle ?
                                            <IconButton isLoading={isLoading} title="Clique aqui para alterar o título" icon={Confirm} style={{ height: "25px", width: "25px" }} handleClick={handleTitleChange} />
                                            :
                                            <IconButton title="Clique aqui para alterar o título" icon={Edit} style={{ height: "25px", width: "25px" }} handleClick={() => setEditingTitle(true)} />
                                    }
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
                                    <ButtonGroup className={styles.action_buttons}>
                                        <Button colorScheme="red" onClick={onOpenAddPraticante}>
                                            Adicionar praticantes
                                        </Button>
                                        <Button colorScheme="purple" onClick={onOpenAddVitima}>
                                            Adicionar vítimas
                                        </Button>
                                    </ButtonGroup>
                                    <div>
                                        <b>Nº de matrícula:</b> {denuncia.matricula}
                                    </div>
                                    <div>
                                        <b>Recorrência:</b> {denuncia.recorrencia}
                                    </div>
                                    <div>
                                        <b>Data de ocorrência:</b> {getBrazilianDate(denuncia.data_ocorrido)}
                                    </div>
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
                                    <div className={styles.relato}>
                                        <div>
                                            <b>Relato:</b>
                                        </div>
                                        <div>
                                            {denuncia.relato}
                                        </div>
                                    </div>
                                    {
                                        isGettingMedidas ?
                                            <LoadingSkeleton justifyContent="flex-start" />
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
                            <CardFooter>
                                <ButtonGroup>
                                    <Button colorScheme="blue" leftIcon={<PlusSign width="30px" />} onClick={onOpenAddAndamento}>
                                        Adicionar andamento
                                    </Button>
                                    <Button bg="pink.50"
                                        onClick={handleMarcarResolvido}
                                        color="white"
                                        _hover={{ bgColor: "pink.100" }}
                                        _active={{ bgColor: "pink.200" }}>
                                        Marcar como resolvido
                                    </Button>
                                </ButtonGroup>
                            </CardFooter>
                        </Card>
                    </div>

                    <AddPraticantesModal denunciaId={denuncia.id} currentPraticantes={praticantes} onClose={onCloseAddPraticante} onOpen={onOpenAddPraticante} isOpen={isOpenAddPraticante} />
                    <AddVitimasModal denunciaId={denuncia.id} currentVitimas={vitimas} onClose={onCloseAddVitima} onOpen={onOpenAddVitima} isOpen={isOpenAddVitima} />
                    <AddAndamentoModal denunciaId={denuncia.id} onClose={onCloseAddAndamento} onOpen={onOpenAddAndamento} isOpen={isOpenAddAndamento} />
                </>

            )
        }
    } else {
        return (
            <LoadingSkeleton justifyContent="center" />
        )
    }



}

export default DenunciaPage;
