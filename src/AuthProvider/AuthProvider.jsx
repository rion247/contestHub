import { createContext, useState } from "react";
import PropTypes from 'prop-types'; // ES6






export const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {

    const [user, SetUser] = useState([]);

    const [loading, SetLoading] = useState(true);

    const [reload, SetReload] = useState(false);








    const authInfo = {
        user,
        loading,
        SetLoading,
        SetReload,


    }

    return (

        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider >
    );
};

AuthProvider.propTypes = {
    children: PropTypes.node,
}

export default AuthProvider;


