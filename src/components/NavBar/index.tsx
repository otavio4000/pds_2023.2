import { ReactComponent as Logo } from "assets/images/vigialuno-logo.svg";
import { Link } from "react-router-dom";
import styles from "./styles.module.css";
import { Button } from "@chakra-ui/react";
import { useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

function NavBar() {
    const [token, setToken] = useState<string>(() => localStorage.getItem('token') || '');
    const [redirected, setRedirected] = useState(false);
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
        <div className={styles.container}
            style={location.pathname === "/login" ? { position: "absolute" } : { position: "unset" }}
        >
            <Link to="/" className={styles.container_logo}>
                <Logo className={styles.logo} />
            </Link>
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
    );
}

export default NavBar;