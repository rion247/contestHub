import axios from "axios";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../AuthProvider/AuthProvider";

export const axiosSecure = axios.create({
    baseURL: import.meta.env.VITE_SERVER_URL,
    withCredentials: true,
});

// -----------------------------------------------------------------------------------------------------------

// const useAxiosSecure = () => {

//     const { logOutUser } = useContext(AuthContext);

//     const navigate = useNavigate();

//     useEffect(() => {
//         axiosSecure.interceptors.response.use((response) => {
//             return response;
//         }, async (error) => {

//             if (error.response.status === 401 || error.response.status === 403) {
//                 await logOutUser();
//                 navigate('/logInPage');
//             }

//             return Promise.reject(error);
//         });
//     }, [logOutUser, navigate])

//     return axiosSecure;
// };

// -----------------------------------------------------------------------------------------------------------

const useAxiosSecure = () => {

    const { logOutUser } = useContext(AuthContext);

    const navigate = useNavigate();

    axios.interceptors.request.use((config) => {
        // Do something before request is sent
        const token = localStorage.getItem('access-token');
        config.headers.authorization = `Bearer ${token}`
        return config;
    }, (error) => {
        return Promise.reject(error);
    });

    axios.interceptors.response.use((response) => {
        return response;
    }, async (error) => {

        const status = error.response.status;

        if (status === 401 || status === 403) {
            try {
                await logOutUser();
                navigate('/logInPage');
            } catch (err) {
                console.log(err.message);
            }
        }

        return Promise.reject(error);
    });

    return axiosSecure;
};

export default useAxiosSecure;

