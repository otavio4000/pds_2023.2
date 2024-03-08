import React, { useEffect, useState } from "react";
import styles from "./styles.module.css";

const Overlay = (
    props: {
        onClickFunction?: () => void,
        isOpen: boolean,
    }
    ) => {


    const { onClickFunction, isOpen } = props; 

    const handleClick = () => {

        if (onClickFunction) onClickFunction(); 
    }

    if (isOpen) {
        return (
            <div className={styles.overlay} onClick={handleClick}>
            </div>
        )
    }

    return <></>;


}

export default Overlay;