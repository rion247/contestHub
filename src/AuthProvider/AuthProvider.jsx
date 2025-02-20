import { createContext, useEffect, useState } from "react";
import PropTypes from 'prop-types'; // ES6
import { GoogleAuthProvider, createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from "firebase/auth";
import { auth } from "../FireBase/fireBase.Config";
import useAxiosPublic from "../Hooks/useAxiosPublic/useAxiosPublic";


export const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {

    const [user, SetUser] = useState(null);

    const [loading, SetLoading] = useState(true);

    const [reload, SetReload] = useState(false);

    const axiosPublic = useAxiosPublic();


    const createUserManually = (email, password) => {
        SetLoading(true);
        return createUserWithEmailAndPassword(auth, email, password);
    }

    const signInUserManually = (email, password) => {
        SetLoading(true);
        return signInWithEmailAndPassword(auth, email, password);
    }

    const googleProvider = new GoogleAuthProvider();
    const googleSignIn = () => {
        SetLoading(true);
        return signInWithPopup(auth, googleProvider);
    }

    //-----------------------------------------------------------------------------------------------

    // const logOutUser = async () => {
    //     SetLoading(true);
    //     await axiosPublic.get('/logout');
    //     return signOut(auth);
    // }

    //-----------------------------------------------------------------------------------------------

    const logOutUser = async () => {
        SetLoading(true);
        return signOut(auth);
    }

    useEffect(() => {
        const unSubcribe = onAuthStateChanged(auth, async (currentUser) => {

            //-----------------------------------------------------------------------------------------------

            // if (currentUser) {
            //     SetUser(currentUser);
            //     const userInfo = { email: currentUser?.email };
            //     console.log('SignIn Section', userInfo)
            //     await axiosPublic.post('/jwt', userInfo);                
            //     SetLoading(false);
            // } 
            // else {
            //     SetUser(null);
            //     // await axiosPublic.get('/logout');
            //     SetLoading(false);
            // }

            //-----------------------------------------------------------------------------------------------

            // SetUser(currentUser);

            // if (currentUser) {
            //     const userInfo = { email: currentUser?.email };
            //     console.log('SignIn Section', userInfo)
            //     await axiosPublic.post('/jwt', userInfo);
            // }

            // SetLoading(false);

            //-------------------------------------------------------------------------------------------------------------


            //--------------------------------------------local Storage---------------------------------------------------

            SetUser(currentUser);
            if (currentUser) {
                const userInfo = { email: currentUser?.email };
                axiosPublic.post('/jwt', userInfo)
                    .then(res => {
                        if (res.data.token) {
                            localStorage.setItem('access-token', res.data.token)
                        }
                    })
                SetLoading(false);
            }
            else {
                SetUser(null);
                localStorage.removeItem('access-token');
                SetLoading(false);
            }

        });

        return () => {
            return unSubcribe();
        }

    }, [reload, axiosPublic])


    const userProfileUpdater = (name, photoURL) => {
        return updateProfile(auth.currentUser, {
            displayName: name,
            photoURL: photoURL,
        })
    }

    const authInfo = {
        user,
        loading,
        SetLoading,
        SetReload,
        createUserManually,
        signInUserManually,
        logOutUser,
        googleSignIn,
        userProfileUpdater,

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
