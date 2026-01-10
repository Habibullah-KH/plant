import { useContext } from "react";
import AuthContext from "../context/AuthContext";
import { Navigate, useLocation } from "react-router";

const PrivateRoute = ({children}) => {
    const {user} = useContext(AuthContext);
    const location = useLocation();

if(user && user?.email){
    return children;
}

return(
    <>
    <Navigate to={'/login'} state={{from: location.pathname}} replace/>
    </>
)
}

export default PrivateRoute;