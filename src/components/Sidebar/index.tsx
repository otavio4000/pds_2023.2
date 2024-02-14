import styles from "./styles.module.css";
import LogoWithButton from "components/LogoWithButton";

import {
    Slide,
    Button,
    Fade
  } from '@chakra-ui/react'

const SideBar = (props: {
    isOpen: boolean,
    onOpen: () => void,
    onClose: () => void
}) => {

    const { isOpen, onOpen, onClose } = props;

    return (
        <Slide
        in={isOpen}
        style={{zIndex: 10}}
        direction="left"
        className={styles.slide}
        >
            <div className={styles.sidebar_container}>
                <LogoWithButton onOpen={onOpen} onClose={onClose} /> 

                <p>Aqui tem um texto e blablabla</p>
                <br />
                Lorem, ipsum dolor sit amet consectetur adipisicing elit. Animi aliquam ducimus odio, veniam est sit molestias minima mollitia, alias ipsa corrupti quidem, voluptatem recusandae impedit voluptas hic nihil quos laboriosam?
            </div>
        </Slide>

    )


}

export default SideBar;