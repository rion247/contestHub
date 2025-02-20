
import { useQuery } from '@tanstack/react-query';
// import useAxiosPublic from './../../../../Hooks/useAxiosPublic/useAxiosPublic';
import TableUserData from './TableUserData/TableUserData';
import Container from '../../../../components/Shared/Container';
import useAxiosSecure from '../../../../Hooks/useAxiosSecure/useAxiosSecure';
import { Helmet } from 'react-helmet';
// import { axiosSecure } from './../../../../Hooks/useAxiosSecure/useAxiosSecure';

const ManageUser = () => {

    // const axiosPublic = useAxiosPublic();

    const axiosSecure = useAxiosSecure();

    const { isPending, error, data: usersData, refetch } = useQuery({
        queryKey: ['usersData'],
        queryFn: async () => {
            const { data } = await axiosSecure('/users');
            return data;
        }
    })

    if (isPending) return 'Loading...'

    if (error) return 'An error has occurred: ' + error.message

    return (
        <Container>
            <Helmet>
                <title>ContestHUB | Manage User</title>
            </Helmet>
            <div className="overflow-x-auto h-auto mt-12 flex items-center">

                <table className="table">
                    <thead>
                        <tr>
                            <th>User Name</th>
                            <th>User Email</th>
                            <th>Default Role</th>
                            <th>Update Role</th>
                            <th>Delete</th>
                            <th>Block or Unblock</th>
                        </tr>
                    </thead>

                    {
                        usersData.filter(data => data.role !== 'admin').map((user, index) => <TableUserData key={user._id} user={user} refetch={refetch} />)
                    }

                </table>

            </div>
        </Container>
    );
};

export default ManageUser;