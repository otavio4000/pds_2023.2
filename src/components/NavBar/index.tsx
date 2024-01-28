import { ReactComponent as Logo } from "assets/images/vigialuno-logo.svg";
import { Link } from "react-router-dom";
import styles from "./styles.module.css";
import { Button } from "@chakra-ui/react";
import { useLocation } from "react-router-dom";

function NavBar() {

    const location = useLocation(); 

    return (
        <div className={styles.container}
        style={location.pathname === "/login" ? {position: "absolute"} : {position: "unset"}}
        >
            <Link to="/" className={styles.container_logo}> 
                    <Logo className={styles.logo} />
            </Link>
            {location.pathname !== "/login" && 
                <Link to="/login">
                    <Button 
                    bg="green.50"
                    colorScheme="green"
                    style={{
                        padding: "2px 12px"
                    }}
                    >Login</Button>
                </Link>
            }
        </div>
    );
}

export default NavBar;