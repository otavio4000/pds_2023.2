import { ReactComponent as Logo } from "assets/images/vigialuno-logo.svg";
import { ReactComponent as MenuIcon } from "assets/icons/hamburger-menu-svgrepo-com.svg";
import { Link } from "react-router-dom";
import styles from "./styles.module.css";
import { Button } from "@chakra-ui/react";
import { useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import SideBar from "components/Sidebar";
import axios from "axios";
import { useDisclosure } from "@chakra-ui/react";
import LogoWithButton from "components/LogoWithButton";

function NavBar() {
    const [token, setToken] = useState<string>(() => localStorage.getItem('token') || '');
    const [redirected, setRedirected] = useState(false);
    const { isOpen, onOpen, onClose, onToggle } = useDisclosure();
    const location = useLocation();

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
                style={location.pathname === "/login" ? { position: "absolute" } : { position: "unset" }}
            >   
                <LogoWithButton onOpen={onOpen} onClose={onClose} />
                {token && location.pathname !== "/login" &&
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

            <SideBar isOpen={isOpen} onOpen={onOpen} onClose={onClose} />
        </>
    );
}

export default NavBar;