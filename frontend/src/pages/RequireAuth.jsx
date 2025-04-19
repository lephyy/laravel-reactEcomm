import { Children, useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../components/Auth";


export const RequireAuth = ({children}) => {
    const {user} = useContext(AuthContext);

    if (!user) {
        return <Navigate to ={`/account/login`}/>

    }
    return children;
}