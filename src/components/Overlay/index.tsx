import React, { useEffect, useState } from "react";
import styles from "./styles.module.css";

const Overlay = (
    props: {
        handleClick?: () => void,
        isOpen: boolean
    }
    ) => {


    const { handleClick, isOpen } = props; 

    const handleClick2 = (event: React.MouseEvent) => {

        if (handleClick) handleClick(); 
        console.log("Overlay was clicked")


    }

    if (isOpen) {
        return (
            <div className={styles.overlay} onClick={(e) => handleClick ? handleClick2(e) : () => {}}>
            </div>
        )
    }

    return <></>;


}

export default Overlay;