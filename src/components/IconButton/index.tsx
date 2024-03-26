import { CSSProperties, ElementType } from "react";
import styles from "./styles.module.css";
import { Button } from "@chakra-ui/react";

const IconButton = (props: {
    icon: ElementType,
    handleClick: () => void,
    style?: CSSProperties,
    title?: string,
    isLoading?: boolean
}) => {

    const { icon: Icon, handleClick, style, title, isLoading } = props;

    return (
        <div className={styles.container}>
            <Button isLoading={isLoading} variant="icon" className={styles.button} onClick={handleClick} style={style}>
                <Icon className={styles.button_icon} title={title} />
            </Button>
        </div>

    )
}


export default IconButton; 