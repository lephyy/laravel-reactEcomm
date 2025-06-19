import { Children, useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext,useAuth } from "../components/Auth";


export const RequireAuth = ({children}) => {
    const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
    return children;
}