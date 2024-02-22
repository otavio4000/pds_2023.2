import { ReactComponent as MenuIcon } from "assets/icons/hamburger-menu-svgrepo-com.svg";
import { ElementType } from "react";
import { ReactComponent as BackIcon } from "assets/icons/chevron-left-svgrepo-com.svg";
import styles from "./styles.module.css";
import { Button } from "@chakra-ui/react";

const IconButton = (props: {
    icon: ElementType,
    handleClick: () => void
}) => {

    const { icon: Icon, handleClick } = props; 

    return (
        <div className={styles.container}>
            <Button variant="icon" className={styles.button} onClick={handleClick}>
                <Icon className={styles.button_icon} /> 
            </Button>
        </div>

    )
}


export default IconButton; 