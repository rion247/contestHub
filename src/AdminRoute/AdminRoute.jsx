import { Navigate, useLocation } from "react-router-dom";
import useAuth from "../Hooks/useAuth/useAuth";
import useAdmin from "../Hooks/useAdmin/useAdmin";
import PropTypes from 'prop-types'; // ES6
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";


const AdminRoute = ({ children }) => {

    const { user, loading } = useAuth();
    const [isAdmin, isAdminLoading] = useAdmin();
    const location = useLocation();


    if (loading || isAdminLoading) {
        return <LoadingSpinner />
    }

    if (user && isAdmin) {
        return children;
    }
    
    return <Navigate to='/logInPage' state={location.pathname} replace />
};

AdminRoute.propTypes = {
    children: PropTypes.node,
}

export default AdminRoute;
