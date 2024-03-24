import React from 'react';
import styles from "./styles.module.css";
import { useState } from 'react';
import { Heading, Text } from '@chakra-ui/react';
import { ReactComponent as NoCredentials } from "assets/icons/file-corrupted-svgrepo-com.svg";
import Pais from './Pais';
import Coordenacao from './Coordenação';
import NotAuthorized from 'components/NotAuthorized';
import { checkIfUserHasAuthorization } from 'utils/checkIfUserHasAuthorization';
import { AuthorizationType } from 'enums/authorizationType';

function Dashboard() {

    const [token, setToken] = useState<string | null>(localStorage.getItem("token"))


    if (!token) {
        return (
            <NotAuthorized />
        )
    } else {
    
        if (checkIfUserHasAuthorization(AuthorizationType.Parent)) {
            return (
                <Pais />
            )
        } else {
            return (
                <Coordenacao />
            )
        }
    }



}

export default Dashboard;