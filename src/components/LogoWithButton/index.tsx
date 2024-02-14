import { ReactComponent as Logo } from "assets/images/vigialuno-logo.svg";
import { ReactComponent as MenuIcon } from "assets/icons/hamburger-menu-svgrepo-com.svg";
import { ReactComponent as BackIcon } from "assets/icons/chevron-left-svgrepo-com.svg";
import styles from "./styles.module.css";
import { Button } from "@chakra-ui/react";

const LogoWithButton = (props: {
    onOpen: () => void,
    onClose: () => void
}) => {

    const { onOpen, onClose } = props; 

    return (
        <div className={styles.container}>
            <Button variant="icon" className={styles.button} onClick={onOpen}>
                <MenuIcon className={styles.button_icon} /> 
            </Button>
            <Logo className={styles.logo} />
        </div>

    )
}


export default LogoWithButton; 