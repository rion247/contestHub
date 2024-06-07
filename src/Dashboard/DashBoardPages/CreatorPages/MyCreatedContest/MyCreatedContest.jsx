

import { useQuery } from '@tanstack/react-query';
import useAuth from './../../../../Hooks/useAuth/useAuth';
import Container from './../../../../components/Shared/Container';
import TableforMyCreatedContest from './TableforMyCreatedContest';
import LoadingSpinner from './../../../../LoadingSpinner/LoadingSpinner';
import { toast } from 'react-toastify';
import useAxiosPublic from '../../../../Hooks/useAxiosPublic/useAxiosPublic';

const MyCreatedContest = () => {

    const { user } = useAuth();
    const axiosPublic = useAxiosPublic();

    const email = user.email;

    console.log(email);

    const { isPending, refetch, error, data: contests = [] } = useQuery({
        queryKey: ['contestsData', email],
        queryFn: async () => {
            const { data } = await axiosPublic.get(`/contestsData/${email}`)
            return data;
        }
    })

    if (isPending) return <LoadingSpinner />

    if (error) return toast.error(error.message)

    return (
        <Container>
            <div className="overflow-x-auto h-auto mt-12 flex items-center">

                <table className="table">
                    <thead>
                        <tr>
                            <th>Serial No</th>
                            <th>Contest Name</th>
                            <th>Status</th>
                            <th>Edit or Delete</th>
                            <th>Call To Action</th>
                        </tr>
                    </thead>

                    {
                        contests.map((item, index) => <TableforMyCreatedContest key={item._id} index={index + 1} item={item} refetch={refetch} />)
                    }
                    
                </table>

            </div>
        </Container>
    );
};

export default MyCreatedContest;