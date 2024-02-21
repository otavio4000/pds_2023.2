import Overlay from "components/Overlay";
import styles from "./styles.module.css";
import PathButton from "./components/PathButton";
import { ReactComponent as PieChart } from "assets/icons/graph-pie-svgrepo-com.svg";
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
                    {/* <PathButton pathName={"Estatísticas"} icon={PieChart} selected={path === "/stats"}/> */}
                    <PathButton linkTo="/students" pathName={"Alunos"} icon={Student} selected={path === "/students"}/>


                </div>
            </Slide>
            <Overlay {...props} />

        </>

    )


}

export default SideBar;