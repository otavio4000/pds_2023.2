import styles from "./styles.module.css"
import { 
    Card,
    CardBody,
    Badge,
    Heading
} from "@chakra-ui/react";

interface TypeOfViolence {
    title: string,
    color: string
}

interface AcompanhamentoDetails {
    types: Array<TypeOfViolence>,
    title: string, 
    praticante: string,
    vitima: string 
}

const AcompanhamentoCard = (props: {
    acompanhamento: AcompanhamentoDetails
}) => {

    const { acompanhamento } = props; 

    return (
        <Card variant="filled">
            <CardBody className={styles.main}>
                <div className={styles.types_of_violence}>
                    {
                        acompanhamento.types.map((type) => {
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
                    <div>
                        <b>Praticante: </b>
                        { acompanhamento.praticante }
                    </div>
                    <div>
                        <b>Vítima: </b>{ acompanhamento.vitima }
                    </div>
                </div>
            </CardBody>
            
        </Card>
    )
}

export default AcompanhamentoCard; 