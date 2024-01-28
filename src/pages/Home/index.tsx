import styles from "./styles.module.css";
import bg from "assets/images/bg-pexels-pixabay-159213.jpg";
import { ReactComponent as Logo } from "assets/images/vigialuno-logo.svg"
import { Button, ButtonGroup } from "@chakra-ui/react";
import { Link } from "react-router-dom";

const Home = () => {
    return (
        <div className={styles.container}
        style={{
            backgroundImage: `linear-gradient(to bottom, rgba(206, 57, 95, 1), rgba(0, 0, 0, 0.0)), url(${bg})`,
        }}>
            <main className={styles.container_main}>
                <div className={styles.container_logo}>
                    <Logo className={styles.logo} />
                </div>
                <p>
                    Lorem ipsum dolor sit amet. Qui dignissimos corrupti vel deserunt error et laudantium reiciendis ea dolorem provident ut tempora deleniti aut velit accusamus et magni blanditiis. Ut voluptatibus nulla ut cumque voluptates At eaque quae eos maxime.
                </p>
                <ButtonGroup className={styles.container_buttons} variant="solid" size="md" spacing="6">                
                    <Link to="/login"> 
                        <Button color="pink.50">ENTRAR</Button>
                    </Link>
                    <Link to="/denuncia">
                        <Button color="#FFFFFF" bg="pink.50" _hover={{bgColor: "pink.100"}} _active={{bgColor: "pink.200"}}>FAZER DENÚNCIA</Button>
                    </Link>
                </ButtonGroup>
            </main>



            <footer>
                <p>
                Copyright © 2024 - Universidade Federal de Alagoas. Todos os direitos reservados.
                </p>
            </footer>
        </div>
    );
};

export default Home; 