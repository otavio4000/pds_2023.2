import React from 'react';
import Pais from './Pais';
import Coordenacao from './Coordenação';

function Dashboard() {
    const access_type = localStorage.getItem("user_type");

    if (access_type == "pai") {
        return (
            <Pais />
        )
    } else if (access_type == "coord") {
        return (
            <Coordenacao />
        )
    } else {
        return (
            <div>
                Oops, algo deu errado aqui. 
            </div>
        );
    }

}

export default Dashboard;