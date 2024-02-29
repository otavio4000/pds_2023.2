import NavBar from "components/NavBar";
import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
export type Title = {
    matricula: number;
    relato: string;
    id: number;
    body: string;
    title: string;
  };


const Coordenacao = () => {
    const [token, setToken] = useState<string>(() => localStorage.getItem('token') || '');
    const [redirected, setRedirected] = useState(false);
    
    const [titles, setTitles] = useState<Title[] | null>(null);
    const navigate = useNavigate();
    
    const location = useLocation();
    const path = location.pathname;




    useEffect(() => {
        const url = 'https://backendd-vk3y.onrender.com/api/v1/denuncia/';
        const token = localStorage.getItem('token');
    
        if (!token) {
          
          navigate('/login');
          return;
        }
    
        axios.get(url, {
          headers: {
            'Authorization': 'Bearer ' + token,
          },
        })
          .then((response) => {
            setTitles(response.data);
          })
          .catch((error) => {
            
            if (error.response && error.response.status === 401) {
              navigate('/login');
            }
          });
      }, [navigate]);
    return (
        // Colocar o modelo do card aqui
         <div className="cardaqui">
                {titles ? titles.map((id) => {
                return <p key={id.id}>{id.relato}</p>;
                }) : null}
            </div> 
        
         
    )
}

export default Coordenacao;