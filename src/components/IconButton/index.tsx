import { CSSProperties, ElementType } from "react";
import styles from "./styles.module.css";
import { Button } from "@chakra-ui/react";

const IconButton = (props: {
    icon: ElementType,
    handleClick: () => void,
    style?: CSSProperties
}) => {

    const { icon: Icon, handleClick, style } = props;

    return (
        <div className={styles.container}>
            <Button variant="icon" className={styles.button} onClick={handleClick} style={style}>
                <Icon className={styles.button_icon} />
            </Button>
        </div>

    )
}


export default IconButton; 