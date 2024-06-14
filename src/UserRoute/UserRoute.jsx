import { Navigate, useLocation } from "react-router-dom";
import useRole from "../Hooks/useRole/useRole";
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";
import { PropTypes } from 'prop-types';

const UserRoute = ({children}) => {

    const location = useLocation();

    const [role, isLoading] = useRole();


    if (isLoading) return <LoadingSpinner />

    if (role === 'user') return children;


    return <Navigate to='/dashboard' state={location.pathname} replace />
};

UserRoute.propTypes = {
    children: PropTypes.node,
}

export default UserRoute;