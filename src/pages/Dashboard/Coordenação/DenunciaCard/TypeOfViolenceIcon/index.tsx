import styles from "./styles.module.css";
import { ReactComponent as Verbal } from "assets/icons/cha-bubble-female-svgrepo-com.svg";
import { ReactComponent as Fisica } from "assets/icons/punch-svgrepo-com.svg";
import { ReactComponent as Sexual } from "assets/icons/fist-svgrepo-com.svg";
import { ReactComponent as Bullying } from "assets/icons/man-threating-svgrepo-com.svg";
import { ReactComponent as Domestica } from "assets/icons/home-svgrepo-com.svg";
import { useState } from "react";

type TypeOfViolence = "verbal" | "fisica" | "sexual" | "bullying" | "domestica";

const TypeOfViolenceIcon = (props: {
    violenceType: TypeOfViolence
}) => {

    const { violenceType } = props;

    if (violenceType == "verbal") {
        return (
            <div className={styles.icon_container}>
                <Verbal className={styles.icon} title="Violência verbal" />
            </div>
        )
    } else if (violenceType == "fisica") {
        return (
            <div className={styles.icon_container}>
                <Fisica className={styles.icon} title="Violência física" />
            </div>
        )
    } else if (violenceType == "sexual") {
        return (
            <div className={styles.icon_container}>
                <Sexual className={styles.icon} title="Violência sexual" />
            </div>
        )
    } else if (violenceType == "bullying") {
        return (
            <div className={styles.icon_container}>
                <Bullying className={styles.icon} title="Bullying" />
            </div>
        )
    } else {
        // Violência doméstica 
        return (
            <div className={`${styles.icon_container} ${styles.v_domestica}`}>
                <Domestica className={styles.icon} title="Violência Doméstica" />
            </div>
        )
    }

}

export default TypeOfViolenceIcon;