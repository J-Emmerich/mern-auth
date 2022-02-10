import {Outlet, Navigate} from "react-router-dom";
import useAuth from "../../hooks/useAuth.js";
const PrivateRoute = () => {
    const auth = useAuth();
    return (
        auth ? <Outlet/> : <Navigate to="/login"/>
    )
}

export default PrivateRoute;