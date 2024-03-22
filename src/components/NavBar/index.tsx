import { ReactComponent as Logo } from "assets/images/vigialuno-logo.svg";
import IconButton from "components/IconButton";
import { ReactComponent as MenuButton } from "assets/icons/hamburger-menu-svgrepo-com.svg";
import { Link } from "react-router-dom";
import styles from "./styles.module.css";
import { Button } from "@chakra-ui/react";
import { useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import SideBar from "components/Sidebar";
import api from "services/api";
import { useDisclosure } from "@chakra-ui/react";
import axios from "axios";



function NavBar() {
    const [token, setToken] = useState<string>(() => localStorage.getItem('token') || '');
    const [redirected, setRedirected] = useState(false);
    const { isOpen, onToggle } = useDisclosure();

    const navigate = useNavigate();

    const location = useLocation();
    const path = location.pathname;

    const logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user_id');
        window.location.href = '/';

    };

    const validToken = async () => {
        try {
            const response = await api.post('/authentication/token/verify/', { token });

            return response // 
        } catch (error) {
            console.error('Erro ao validar o token:', error);
            return false;
        }


    };

    /**
     * Logout: só deve aparecer se a pessoa estiver logada
     * NavBar + sidebar: só deve aparecer nas telas da administração
     * NavBar: só não deve aparecer nas telas de login e hom
     */

    const noNavBarPaths = ["/"];
    const sideBarPath = "/dashboard";

    const shouldHaveNavBar = !noNavBarPaths.includes(path);
    const shouldHaveSideBar = path.startsWith(sideBarPath);

    if (shouldHaveNavBar) {
        return (
            <>


                <div className={styles.container}>
                    <div className={styles.logo_controls}>
                        {shouldHaveSideBar && <IconButton icon={MenuButton} handleClick={onToggle} />}
                        <Link to="/" className={styles.container_logo}>
                            <Logo className={styles.logo} />
                        </Link>
                    </div>
                    {token && (path !== "/login" && path !== "/denuncia" && path !== "/responsaveis/add") &&
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



                {shouldHaveSideBar && <SideBar isOpen={isOpen} onToggle={onToggle} />}
            </>
        );
    }

    return <></>



}

export default NavBar;