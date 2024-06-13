
import { useQuery } from '@tanstack/react-query';
import LoadingSpinner from './../../../../LoadingSpinner/LoadingSpinner';
import useAxiosPublic from './../../../../Hooks/useAxiosPublic/useAxiosPublic';
import useAuth from './../../../../Hooks/useAuth/useAuth';
import { toast } from 'react-toastify';
import SingleWinningContest from './SingleWinningContest';

const MyWinningContestPage = () => {

    const axiosPublic = useAxiosPublic();
    const { user } = useAuth();

    const email = user?.email;

    const { isPending, error, data: winnerData = [] } = useQuery({
        queryKey: ['winnerData', email],
        queryFn: async () => {
            const { data } = await axiosPublic(`/contestsWinnerData/${email}`);
            return data;
        }
    })

    if (isPending) return <LoadingSpinner />

    if (error) return toast.error(error.message);


    return (
        <div>
            {
                winnerData.map(item => <SingleWinningContest key={item._id} item={item} />)
            }
        </div>
    );
};

export default MyWinningContestPage;