import Overlay from "components/Overlay";
import styles from "./styles.module.css";
import PathButton from "./components/PathButton";
import { ReactComponent as AddStudent } from "assets/icons/add-profile-svgrepo-com.svg";
import { ReactComponent as Student } from "assets/icons/user-svgrepo-com.svg";
import { ReactComponent as Complaint } from "assets/icons/complaint-svgrepo-com.svg";
import { ReactComponent as Token } from "assets/icons/ticket-simple-svgrepo-com.svg";
import { useLocation } from "react-router-dom";
import {
    Slide,
} from '@chakra-ui/react'

const SideBar = (props: {
    isOpen: boolean,
    onToggle: () => void,
}) => {

    const location = useLocation();
    const path = location.pathname;

    const { isOpen, onToggle } = props;

    return (
        <>
            <Slide
                in={isOpen}
                style={{ zIndex: 10 }}
                direction="left"
                className={styles.slide}
                onClick={(event) => event.stopPropagation()}
            >
                <div className={styles.sidebar_container}>

                    <PathButton linkTo="/dashboard" pathName={"Denúncias"} icon={Complaint} selected={path === "/dashboard"}/>
                    <PathButton linkTo="/dashboard/students" pathName={"Alunos"} icon={Student} selected={path === "/dashboard/students"}/>
                    <PathButton linkTo="/dashboard/students/add" pathName={"Adicionar Aluno"} icon={AddStudent} selected={path === "/dashboard/students/add"}/>
                    <PathButton linkTo="/dashboard/generate_token" pathName={"Gerar Token"} icon={Token} selected={path === "/dashboard/generate_token"}/>

                </div>
            </Slide>
            <Overlay onClickFunction={onToggle} isOpen={isOpen} />

        </>

    )


}

export default SideBar;