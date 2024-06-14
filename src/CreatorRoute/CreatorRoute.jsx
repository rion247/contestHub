import { Navigate, useLocation } from "react-router-dom";
import useRole from './../Hooks/useRole/useRole';
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";
import { PropTypes } from 'prop-types';

const CreatorRoute = ({ children }) => {

    const location = useLocation();

    const [role, isLoading] = useRole();


    if (isLoading) return <LoadingSpinner />

    if (role === 'creator') return children;

    return <Navigate to='/dashboard' state={location.pathname} replace />
};

CreatorRoute.propTypes = {
    children: PropTypes.node,
}

export default CreatorRoute;