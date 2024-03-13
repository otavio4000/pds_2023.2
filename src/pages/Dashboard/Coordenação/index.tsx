import NavBar from "components/NavBar";
import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import styles from "./styles.module.css";
import v_fisica from "../../../assets/images/icons8-soco-60.png";
import bulliyng from "../../../assets/images/icons8-rufia-60.png";
import v_verbal from "../../../assets/images/icons8-homem-xingando-60.png";
import assedio from "../../../assets/images/icons8-agressor-sexual-60.png"
import { format } from 'date-fns';
import { Link } from 'react-router-dom';


declare module 'date-fns' {
  interface FormatOptions {
    timeZone?: string;
  }
}


export type Title = {
    matricula: number;
    relato: string;
    recorrencia:string;
    id: number;
    body: string;
    title: string;
    v_fisica: string;
    v_verbal: string;
    bullying: string;
    assedio: string;
    data_ocorrido: string;
    pontuacao: number;
  };


const Coordenacao = () => {
    const [token, setToken] = useState<string>(() => localStorage.getItem('token') || '');
    const [redirected, setRedirected] = useState(false);
    
    const [titles, setTitles] = useState<Title[] | null>(null);
    const navigate = useNavigate();
 
    const location = useLocation();
    const path = location.pathname;
    function formatDate(dateTime: string): string {
      const newDate = new Date(dateTime);
     
      return format(newDate, 'dd/MM/yyyy ', {
        timeZone: 'America/Sao_Paulo', 
      });
    }

   

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
        
      
      <div className={styles.cardaqui}>
  <div className={styles.section}>
    <h1 >Últimas Denúncias</h1> 
    <div className={styles.cardContainer}>
    
      {titles
        ? titles
        .sort((a, b) => new Date(b.data_ocorrido).getTime() -new Date(a.data_ocorrido).getTime())
          .slice(0, 5) 
          .map((id,index) => (
            
            
            <Link key={id.id} to={`/denuncia/${id.id}`} className={styles.cardLink} > 
            
              <div className={styles.card}>

                <div className={styles.cardIcons}>
                {id.v_fisica === 'yes' && (
                    <img
                      src={v_fisica}
                      
                      className={styles.icone}
                    />
                  )}
                  {id.v_verbal=== 'yes' && (
                    <img
                      src={v_verbal}
                      
                      className={styles.icone}
                    />
                  )}
                  {id.bullying=== 'yes' && (
                    <img
                      src={bulliyng}
                      
                      className={styles.icone}
                    />
                  )}
                  {id.assedio=== 'yes' && (
                    <img
                      src={assedio}
                      
                      className={styles.icone}
                    />
                  )}
                </div>
                <div className={styles.content}>
                  <p><strong>Matrícula: </strong>{id.matricula}</p>
                  <p><strong>Recorrência: </strong>{id.recorrencia}</p>
                  <p><strong>Data: </strong> {formatDate(id.data_ocorrido)}</p>

                </div>
              </div>
              
            </Link>
            
          ))
        : null}
    </div>
  </div>

  <div className={styles.section}>
    <h1 >Denúncias Mais Graves</h1> 
    <div className=  {styles.cardContainer}>
      {titles
        ? titles
          .sort((a, b) => b.pontuacao - a.pontuacao) 
          .slice(0, 5) 
          .map((id) => (   
            
            <Link key={id.id} to={`/denuncia/${id.id}`} className={styles.cardLink}> 
            
              <div className={styles.card} >

                <div className={styles.cardIcons}>
                  {id.v_fisica === 'yes' && (
                    <img
                      src={v_fisica}
                      
                      className={styles.icone}
                    />
                  )}
                  {id.v_verbal=== 'yes' && (
                    <img
                      src={v_verbal}
                      
                      className={styles.icone}
                    />
                  )}
                  {id.bullying=== 'yes' && (
                    <img
                      src={bulliyng}
                      
                      className={styles.icone}
                    />
                  )}
                  {id.assedio=== 'yes' && (
                    <img
                      src={assedio}
                      
                      className={styles.icone}
                    />
                  )}
                </div>
                <div className={styles.content}>
                  <p><strong>Matrícula: </strong>{id.matricula}</p>
                  <p><strong>Recorrência: </strong>{id.recorrencia}</p>
                  <p><strong>Data: </strong> {formatDate(id.data_ocorrido)}</p>

                </div>
              </div>
              
            </Link> 
          
          ))
          
        : null}
    </div>
  </div>
</div>
        
         
    )
}

export default Coordenacao;



