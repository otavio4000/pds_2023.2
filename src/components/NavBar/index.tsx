import { ReactComponent as Logo } from "assets/images/vigialuno-logo.svg";
import IconButton from "components/IconButton";
import { ReactComponent as MenuButton } from "assets/icons/hamburger-menu-svgrepo-com.svg";
import { Link } from "react-router-dom";
import styles from "./styles.module.css";
import { Button } from "@chakra-ui/react";
import { useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import SideBar from "components/Sidebar";
import axios from "axios";
import { useDisclosure } from "@chakra-ui/react";

function NavBar() {
    const [token, setToken] = useState<string>(() => localStorage.getItem('token') || '');
    const [redirected, setRedirected] = useState(false);
    const { isOpen, onToggle } = useDisclosure();

    const location = useLocation();
    const path = location.pathname;

    const logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user_id');
        window.location.href = '/';

    };
    const validToken = async () => {
        try {


            const response = await axios.post('https://backendd-vk3y.onrender.com/api/v1/authentication/token/verify/', { token });

            return response // 
        } catch (error) {
            console.error('Erro ao validar o token:', error);
            return false;
        }
    };


    return (
        <>

            <div className={styles.container}
                // style={path === "/login" ? { position: "absolute" } : { position: "unset" }}
            >   
            <div className={styles.logo_controls}>
                { (path === "/dashboard" || path === "/students") && <IconButton icon={MenuButton} handleClick={onToggle} /> }
                <Link to="/" className={styles.container_logo}>
                    <Logo className={styles.logo} />
                </Link>
            </div>
                {token && path !== "/login" &&
                    <Button
                    onClick={logout}
                    bg="green.50"
                    colorScheme="green"
                    style={{
                        padding: "2px 12px"
                    }}
                    type="submit"
                    >
                        Logout
                    </Button>
                }
            </div>
            
            { (path === "/dashboard" || path === "/students") && <SideBar isOpen={isOpen} onToggle={onToggle}/> }
        </>
    );
}

export default NavBar;