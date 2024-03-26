import styles from "./styles.module.css";
import {
    Card,
    CardBody,
    Avatar,
    AvatarBadge,
    Heading,
    Badge,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";

interface Filho {
    nome: string,
    id: string
}

const FilhoCard = (props: {
    filho: Filho
}) => {

    const { filho } = props;

    return (
        <Link to={`/dashboard/mychild/${filho.id}`}>
            <Card className={styles.card}>
                <CardBody className={styles.card_body}>
                    <Avatar size="2xl" name={filho.nome} color="white" className={styles.avatar_child} />
                    <Heading size="md">
                        {filho.nome}
                    </Heading>
                </CardBody>
            </Card>
        </Link>
    )
}

export default FilhoCard; 