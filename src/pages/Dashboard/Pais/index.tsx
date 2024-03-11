import top_wave from "assets/images/wave-1.svg";
import bottom_wave from "assets/images/wave-2.svg";
import { 
    Heading,
    Card, 
    CardBody, 
    Avatar,
    AvatarBadge
} from "@chakra-ui/react";
import styles from "./styles.module.css";
import { useState } from "react";
import FilhoCard from "./components/FilhoCard";

interface Filho {
    name: string,
    notifications: number, 
    id: string 
}

const Pais = () => {

    const [filhos, setFilhos] = useState<Array<Filho>>([
        {
            name: "Fausto Silva",
            notifications: 2,
            id: "233123123123"
        },
        {
            name: "Silvio Santos",
            notifications: 0,
            id: "123123123123"
        },
    ])


    return (
        <div className={styles.container_main}>
            <img src={top_wave} alt="" className={styles.top_wave} />
            <img src={bottom_wave} alt="" className={styles.bottom_wave} />
            
            <Heading>
                Meus Filhos
            </Heading>

            <div className={styles.filhos_container}>
                {
                    filhos.map((filho) => {
                        return(
                            <FilhoCard filho={filho} key={filho.id} />
                            )
                        })
                }
            </div>



        </div>
    )
}

export default Pais;