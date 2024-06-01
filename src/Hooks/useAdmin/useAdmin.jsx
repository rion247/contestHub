import { toast } from "react-toastify";
// import LoadingSpinner from "../../LoadingSpinner/LoadingSpinner"
import useAuth from './../useAuth/useAuth';
import useAxiosSecure from './../useAxiosSecure/useAxiosSecure';
import { useQuery } from "@tanstack/react-query";

const useAdmin = () => {

    const { user, loading } = useAuth();

    const axiosSecure = useAxiosSecure();

    const userEmail = user?.email;

    const { isPending: isAdminLoading, error, data: isAdmin } = useQuery({
        queryKey: ['isAdmin', userEmail],
        enabled: !loading,
        queryFn: async () =>{
            const {data} = await axiosSecure.get(`/users/admin/${userEmail}`)
            return data?.admin;
        }
    })

    // if (isLoading) return <LoadingSpinner />

    if (error) return toast.error(error.message);

    return [isAdmin, isAdminLoading]
};

export default useAdmin;