import Overlay from "components/Overlay";
import styles from "./styles.module.css";
import PathButton from "./components/PathButton";
import { ReactComponent as AddStudent } from "assets/icons/add-profile-svgrepo-com.svg";
import { ReactComponent as Student } from "assets/icons/user-svgrepo-com.svg";
import { ReactComponent as Complaint } from "assets/icons/complaint-svgrepo-com.svg";
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
                    <PathButton linkTo="/students" pathName={"Alunos"} icon={Student} selected={path === "/students"}/>
                    <PathButton linkTo="/students/add" pathName={"Adicionar Aluno"} icon={AddStudent} selected={path === "/students/add"}/>
                    <PathButton linkTo="/responsaveis/add" pathName={"Adicionar Responsável"} icon={AddStudent} selected={path === "/responsaveis/add"}/>

                </div>
            </Slide>
            <Overlay onClickFunction={onToggle} isOpen={isOpen} />

        </>

    )


}

export default SideBar;