import { useEffect } from "react";
import { useAuth } from "../store/auth"
import { Navigate } from "react-router-dom";

const Logout = () => {

    //@ts-ignore
    const {logout} = useAuth();

    useEffect(() => {
        logout();
    }, [])

  return (
    <Navigate to={'/login'} />
  )
}

export default Logout