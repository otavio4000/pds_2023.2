import { checkIfUserHasAuthorization } from "utils/checkIfUserHasAuthorization";
import styles from "./styles.module.css";
import { useParams } from "react-router";
import { ReactComponent as PlusSign } from "assets/icons/add-plus-svgrepo-com.svg";
import { AuthorizationType } from "enums/authorizationType";
import { 
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    ButtonGroup,
    Button,
    Heading
} from "@chakra-ui/react";
import NotAuthorized from "components/NotAuthorized";
import TypeOfViolenceIcon from "../DenunciaCard/TypeOfViolenceIcon";
import { useEffect, useState } from "react";
import { getBrazilianDate } from "utils/convertTimestampToBRDate";
import api from "services/api";
import axios from "axios";


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
	title: string,
	v_fisica: "yes" | "no",
	v_domestica: "yes" | "no",
	v_verbal: "yes" | "no",
	bullying: "yes" | "no",
	assedio: "yes" | "no",
	data_ocorrido: string,
	pontuacao: number,
    status:string
};


const DenunciaPage = () => {

    const { id } = useParams(); 
    const [denuncia, setDenuncia] = useState<Denuncia>();

    const [status, setStatus] = useState('não investigado');
    const [redirect, setRedirect] = useState(false);

    const handleMarcarResolvido = () => {
        const token = localStorage.getItem("token");
        const config = {
            headers: {
                Authorization: `Bearer ${token}`
            }
        };
        axios.patch(`http://127.0.0.1:8000/api/v1/denuncia/edit/${id}/`, { status: 'resolvido' }, config)
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

            setDenuncia(response.data);
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
                <div className={styles.container}>
                    <Card className={styles.card}>
                        <CardHeader className={styles.header}> 
                            <Heading>
                                Denúncia
                            </Heading>
                            <div className={styles.violence_types}>
                            {denuncia.v_domestica === 'yes' && (
                                <TypeOfViolenceIcon violenceType="domestica"/>
                            )}
                            {denuncia.v_fisica === 'yes' && (
                                <TypeOfViolenceIcon violenceType="fisica" />
                            )}
                            {denuncia.v_verbal === 'yes' && (
                                <TypeOfViolenceIcon violenceType="verbal"/>
                            )}
                            {denuncia.bullying === 'yes' && (
                                <TypeOfViolenceIcon violenceType="bullying"/>
                            )}
                            {denuncia.assedio === 'yes' && (
                                <TypeOfViolenceIcon violenceType="sexual"/>
                            )}
                            </div>
                        </CardHeader>
                        <CardBody>
                            <div className={styles.info}>
                                <div>
                                    <b>Nº de matrícula:</b> {denuncia.matricula}
                                </div>
                                <div>
                                    <b>Recorrência:</b> {denuncia.recorrencia}
                                </div>
                                <div>
                                    <b>Data de ocorrência:</b> {getBrazilianDate(denuncia.data_ocorrido)}
                                </div>
                            </div>
                            <div className={styles.relato}>
                                <div>
                                    <b>Relato:</b>
                                </div>
                                <div>
                                    { denuncia.relato }
                                </div>
                            </div>
                        </CardBody>
                        <CardFooter>
                            <ButtonGroup>
                                <Button colorScheme="blue" leftIcon={<PlusSign width="30px"/>}>
                                    Adicionar andamento
                                </Button>
                                <Button onClick={handleMarcarResolvido} bg="pink.50"
                                color="white"
                                _hover={{ bgColor: "pink.100" }}
                                _active={{ bgColor: "pink.200" }}>
                                    Marcar como resolvido
                                </Button>
                            </ButtonGroup>
                        </CardFooter>
                    </Card>
                </div>
            )
        }
    } else {
        return (
            <>
            TO carregando</>
        )
    }



}

export default DenunciaPage;