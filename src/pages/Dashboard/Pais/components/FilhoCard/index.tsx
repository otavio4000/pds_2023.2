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
    notifications: number,
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
                    <Avatar size="2xl" name={filho.nome} color="white" className={styles.avatar_child}>
                        {
                            filho.notifications > 0 &&
                            <AvatarBadge boxSize='1.25em' bg="red.50" />
                        }
                    </Avatar>
                    <Heading size="md">
                        {filho.nome}
                    </Heading>
                    {
                        filho.notifications > 0 &&
                        <Badge variant="subtle" colorScheme="blue">
                            {filho.notifications} novas notificações
                        </Badge>
                    }
                </CardBody>
            </Card>
        </Link>
    )
}

export default FilhoCard; 