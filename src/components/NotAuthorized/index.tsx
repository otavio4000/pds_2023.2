import styles from "./styles.module.css";
import { ReactComponent as NoCredentials } from "assets/icons/file-corrupted-svgrepo-com.svg";
import {
    Heading,
    Text
} from "@chakra-ui/react";

const NotAuthorized = () => {
    return (
        <div className={styles.container}>
            <Heading>
                Oops!
            </Heading>
            <div className={styles.body}>
                <Text className="message" fontSize="1.8em">
                    Você não tem acesso a essa página.
                </Text>
                <div className={styles.icon_container}>
                    <NoCredentials className={styles.icon} />
                </div>
            </div>
        </div>
    )
}

export default NotAuthorized;
