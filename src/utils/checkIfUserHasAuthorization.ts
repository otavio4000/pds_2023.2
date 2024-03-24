import { AuthorizationType } from "enums/authorizationType"
import { isUserLogged } from "./checkIfUserIsLogged";
export const checkIfUserHasAuthorization = (authorization: AuthorizationType): boolean => {

    
    if (isUserLogged()) {
        
        let userId: string | number | null = localStorage.getItem("user_id");
        userId = userId == null ? 0 : parseInt(userId); 

        if (authorization == AuthorizationType.Coordenation) {
            return (userId < 9);
        } else if (authorization == AuthorizationType.Parent) {
            return (userId >= 9);
        } else {
            return false;
        }

    } else {
        return false; 
    }
    

} 