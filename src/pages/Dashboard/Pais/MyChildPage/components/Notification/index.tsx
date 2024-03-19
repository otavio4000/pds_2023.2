import styles from "./styles.module.css";
import {
    Stack,
    Divider,
    Badge,
    Heading,
    Text,
    Box
} from "@chakra-ui/react";
import { ReactComponent as ClockIcon } from "assets/icons/clock-two-svgrepo-com.svg";

interface Notification {
    type: string,
    title: string,
    time: string, 
    description: string, 
    color: string 
}

const Notification = (props: {
    info: Notification
}) => {

    const { info } = props; 

    return (
        <div className={styles.container_main}>
            <div className={styles.info}>
                <Badge variant="solid" color="white" colorScheme={info.color} style={{height: "20px"}}>
                    { info.type }
                </Badge>
                <div className={styles.timing_info}>
                    <div className={styles.icon_container}>
                        <ClockIcon className={styles.icon} />
                    </div>
                    <div className={styles.text}>
                        { info.time }
                    </div>
                </div>

            </div>
            <Heading size="md">
                { info.title }
            </Heading>
            <Text textAlign="left">
                { info.description} 
            </Text>
            <Divider />
        </div>
    )
}

export default Notification;