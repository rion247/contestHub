import axios from "axios";
import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../AuthProvider/AuthProvider";

export const axiosSecure = axios.create({
    baseURL: import.meta.env.VITE_SERVER_URL,
    withCredentials: true,
});

const useAxiosSecure = () => {

    const { logOutUser } = useContext(AuthContext);

    const navigate = useNavigate();

    useEffect(() => {
        axiosSecure.interceptors.response.use((response) => {
            return response;
        }, async (error) => {

            if (error.response.status === 401 || error.response.status === 403) {
                await logOutUser();
                navigate('/logInPage');
            }

            return Promise.reject(error);
        });
    }, [logOutUser, navigate])

    return axiosSecure;
};

export default useAxiosSecure;

