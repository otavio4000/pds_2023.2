import styles from "./styles.module.css";
import { Link } from "react-router-dom";
import {
    Card,
    CardBody
} from "@chakra-ui/react";
import { format } from 'date-fns';
import TypeOfViolenceIcon from "./TypeOfViolenceIcon";

interface Denuncia {
    matricula: number,
    relato: string,
    recorrencia: string,
    id: number,
    body: string,
    title: string,
    v_fisica: "yes" | "no",
    v_verbal: "yes" | "no",
    bullying: "yes" | "no",
    assedio: "yes" | "no",
    v_domestica: "yes" | "no",
    data_ocorrido: string,
    pontuacao: number,
};


const DenunciaCard = (props: {
    denuncia: Denuncia
}) => {
    const formatDate = (dateTime: string): string => {
        const newDate = new Date(dateTime);

        return format(newDate, 'dd/MM/yyyy ', {
            timeZone: 'America/Sao_Paulo',
        });
    }

    const { denuncia } = props;
    return (
        <Link key={denuncia.id} to={`/dashboard/denuncia/${denuncia.id}`} className={styles.cardLink}>
            <Card className={styles.card_container}>
                <CardBody className={styles.card}>


                        <div className={styles.cardIcons}>
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

                        <div className={styles.content}>
                            <p><strong>Matrícula: </strong>{denuncia.matricula}</p>
                            <p><strong>Recorrência: </strong>{denuncia.recorrencia}</p>
                            <p><strong>Data: </strong> {formatDate(denuncia.data_ocorrido)}</p>

                        </div>
                </CardBody>
            </Card>

        </Link>
    )
}

export default DenunciaCard; 