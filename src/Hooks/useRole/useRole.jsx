import { useQuery } from "@tanstack/react-query";
import useAuth from "../useAuth/useAuth";
import useAxiosSecure from "../useAxiosSecure/useAxiosSecure";

const useRole = () => {

    const { user, loading } = useAuth();

    const userEmail = user?.email;

    const axiosSecure = useAxiosSecure();


    const { isPending: isLoading, error, data: role = '' } = useQuery({
        queryKey: ['userRoleData', userEmail],
        enabled: !loading || userEmail,
        queryFn: async () => {
            const { data } = await axiosSecure(`/user/${userEmail}`);
            return data.role;
        }

    })


    if (error) return 'An error has occurred: ' + error.message


    return [role, isLoading]
};

export default useRole;