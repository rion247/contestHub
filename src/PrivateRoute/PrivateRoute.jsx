import { Navigate, useLocation } from "react-router-dom";
import useAuth from './../Hooks/useAuth/useAuth';
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";
import PropTypes from 'prop-types'; // ES6


const PrivateRoute = ({ children }) => {

    const { user, loading } = useAuth();

    const location = useLocation();

    if (loading) {
        return <LoadingSpinner />
    }

    if(user){
        return children;
    }

    return <Navigate to='/logInPage' state={location.pathname} replace />
};

PrivateRoute.propTypes = {
    children: PropTypes.node,
}

export default PrivateRoute;