import useAxiosPublic from "../../../../Hooks/useAxiosPublic/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";
import TableforManageContests from './TableforManageContests';
import Container from './../../../../components/Shared/Container';
import LoadingSpinner from './../../../../LoadingSpinner/LoadingSpinner';
import { toast } from "react-toastify";

const ManageContests = () => {

    const axiosPublic = useAxiosPublic();

    const { isPending, error, data: contestsData, refetch } = useQuery({
        queryKey: ['contestsData'],
        queryFn: async () => {
            const { data } = await axiosPublic('/contestData');
            return data;
        }
    })

    if (isPending) return <LoadingSpinner/>

    if (error) return toast(error.message);


    return (
        <Container>
            <div className="overflow-x-auto h-auto mt-12 flex items-center">

                <table className="table">
                    <thead>
                        <tr>
                            <th>Contest Name</th>
                            <th>Contest Prize Money</th>
                            <th>Contest Status</th>
                            <th>Delete Contest</th>
                            <th>Confirm Contest</th>
                            <th></th>
                        </tr>
                    </thead>

                    {
                        contestsData.map((item) => <TableforManageContests key={item._id} item={item} refetch={refetch} />)
                    }

                </table>

            </div>
        </Container>
    );
};

export default ManageContests;