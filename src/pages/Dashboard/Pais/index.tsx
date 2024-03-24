import top_wave from "assets/images/wave-1.svg";
import bottom_wave from "assets/images/wave-2.svg";
import {
    Heading,
    Stack,
    Skeleton
} from "@chakra-ui/react";
import { Link } from "react-router-dom"; 
import styles from "./styles.module.css";
import { useEffect, useState } from "react";
import FilhoCard from "./components/FilhoCard";
import api from "services/api";

interface Filho {
    nome: string,
    notifications: number,
    id: string
}

const Pais = () => {

    const [filhos, setFilhos] = useState<Array<Filho>>([]);
    const [isLoaded, setIsLoaded] = useState<boolean>(false);
    const token = localStorage.getItem("token");

    useEffect(() => {
        const fetchChildren = async () => {

            const response = await api.get(`/alunos/responsavel/`, {
                headers: {
                    "Authorization": "Bearer " + token
                }
            })

            setFilhos(response.data);
            setIsLoaded(true);
        }

        fetchChildren();
    }, [])



    return (
        <div className={styles.container_main}>
            <img src={top_wave} alt="" className={styles.top_wave} />
            <img src={bottom_wave} alt="" className={styles.bottom_wave} />

            {
                !isLoaded ? 
                    <div className={styles.skeletons}>
                        <Stack w="300px">
                            <Skeleton height='50px' />
                            <Skeleton height='300px' />
                        </Stack>


                    </div> : 
                    <>
                        {
                filhos.length == 0 ?
                    <>
                        <Heading>Você ainda não tem filhos registrados.</Heading>
                        
                        <p>
                            Vá para <a href="/dashboard/students" style={{
                                textDecoration: "underline"
                            }}>este link</a> para registrar seu filho
                        </p>
                    </>
                    :
                    <>
                        <Heading>
                            Meus Filhos
                        </Heading>

                        <div className={styles.filhos_container}>
                            {
                                filhos.map((filho) => {
                                    return (
                                        <FilhoCard filho={filho} key={filho.id} />
                                    )
                                })
                            }
                        </div>
                    </>
            }
                    </>
                    

            }



        </div>
    )
}

export default Pais;