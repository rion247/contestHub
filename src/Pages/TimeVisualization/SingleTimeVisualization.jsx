// TimeVisualization.jsx
import ContestTimeline from './Timeline';
import { useQuery } from '@tanstack/react-query';
import useAxiosPublic from './../../Hooks/useAxiosPublic/useAxiosPublic';
import LoadingSpinner from './../../LoadingSpinner/LoadingSpinner';
import { toast } from 'react-toastify';

const SingleTimeVisualization = () => {
    const axiosPublic = useAxiosPublic();

    const { isPending, error, data: contests = [0] } = useQuery({
        queryKey: ['contestsData'],
        queryFn: async () => {
            const { data } = await axiosPublic('/contestData');
            return data;
        }
    })

    if (isPending) return <LoadingSpinner />

    if (error) return toast.error(error.message);

    return (
        <div>
            <h1>Contest Timeline</h1>
            <ContestTimeline contests={contests} />
        </div>
    );
};

export default SingleTimeVisualization;
