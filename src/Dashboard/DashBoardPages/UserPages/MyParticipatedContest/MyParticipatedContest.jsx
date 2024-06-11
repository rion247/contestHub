import { useQuery } from '@tanstack/react-query';
import useAxiosPublic from './../../../../Hooks/useAxiosPublic/useAxiosPublic';
import LoadingSpinner from './../../../../LoadingSpinner/LoadingSpinner';
import { toast } from 'react-toastify';
import useAuth from './../../../../Hooks/useAuth/useAuth';
import TableforMyParticipatedContest from './TableforMyParticipatedContest';
import Container from '../../../../components/Shared/Container';


const MyParticipatedContest = () => {

    const axiosPublic = useAxiosPublic();
    const { user } = useAuth();

    const email = user?.email;

    const { isPending, error, data: paymentHistory = [], refetch } = useQuery({
        queryKey: ['paymentHistory', email],
        queryFn: async () => {
            const { data } = await axiosPublic(`/participantData/${email}`);
            return data;
        }
    })

    if (isPending) return <LoadingSpinner />

    if (error) return toast.error(error.message);

    return (

        <Container>
            <div className="overflow-x-auto h-auto mt-12 flex items-center">

                <table className="table">
                    <thead>
                        <tr>
                            <th>Payment ID</th>
                            <th>Contest Name</th>
                            <th>Contest Posting Date</th>
                            <th>Contest Deadline Date</th>
                            <th></th>
                        </tr>
                    </thead>

                    {
                        paymentHistory.map(data => <TableforMyParticipatedContest  key={data._id} data={data} email={email} refetch={refetch} />)
                    }

                </table>

            </div>
        </Container>

    );
};

export default MyParticipatedContest;