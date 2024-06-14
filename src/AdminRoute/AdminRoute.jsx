import { Navigate, useLocation } from "react-router-dom";
// import useAuth from "../Hooks/useAuth/useAuth";
// import useAdmin from "../Hooks/useAdmin/useAdmin";
import PropTypes from 'prop-types'; // ES6
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";
import useRole from './../Hooks/useRole/useRole';


const AdminRoute = ({ children }) => {

    // const { user, loading } = useAuth();
    // const [isAdmin, isAdminLoading] = useAdmin();

    const location = useLocation();

    const [role, isLoading] = useRole();


    if (isLoading) return <LoadingSpinner />

    if (role === 'admin') return children;


    // if (loading || isAdminLoading) {
    //     return <LoadingSpinner />
    // }

    // if (user && isAdmin) {
    //     return children;
    // }

    return <Navigate to='/dashboard' state={location.pathname} replace />
};

AdminRoute.propTypes = {
    children: PropTypes.node,
}

export default AdminRoute;
