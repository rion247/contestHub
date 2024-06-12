
import Swal from 'sweetalert2';
import useAxiosPublic from './../../../../Hooks/useAxiosPublic/useAxiosPublic';
import LoadingSpinner from '../../../../LoadingSpinner/LoadingSpinner';
import { toast } from 'react-toastify';
import { useQuery } from '@tanstack/react-query';
import useAuth from '../../../../Hooks/useAuth/useAuth';
const TableforSubmittedContestDetailsPage = ({ data }) => {

    console.log(data);

    const axiosPublic = useAxiosPublic();
    const { user } = useAuth();

    const userEmail = user.email;

    const { isPending, error, data: contestData = [0], refetch } = useQuery({
        queryKey: ['contestData', userEmail],
        queryFn: async () => {
            const { data } = await axiosPublic(`/contestsData/${userEmail}`);
            return data;
        }
    })

    if (isPending) return <LoadingSpinner />

    if (error) return toast.error(error.message);

    const samedata = contestData.filter(item => item._id === data.contestId)

    const participantName = data?.participantName;
    const participantEmail = data?.participantEmail;
    const participantPhotoURL = data?.participantPhotoURL;
    const contestId = data?.contestId;

    const handleDeclareWinButton = (name, email, id, photo) => {


        const winnerInfo = {
            winnerName: name,
            winnerEmail: email,
            winnerPhotoURL: photo,
        }

        Swal.fire({
            title: "Select Winner for This Contest?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, Select it!"
        }).then(async (result) => {
            if (result.isConfirmed) {

                const response = await axiosPublic.put(`/winnerSelectionForContest/${id}`, winnerInfo)
                if (response.data.modifiedCount > 0) {
                    const res = await axiosPublic.put(`/increaseWinCount/${email}`)
                    if (res.data.modifiedCount > 0) {
                        refetch();
                        Swal.fire({
                            title: "Contest Winner Revealed!",
                            text: "A winner has been successfully chosen for the contest.",
                            icon: "success"
                        });
                    }
                }

            }
        });



        console.log(winnerInfo);
    }

    return (
        <tbody className="capitalize" >

            <tr className="border border-neutral-300">
                <td>{data?.contestName}</td>
                <td>{data?.participantName}</td>
                <td className="normal-case">{data?.participantEmail}</td>
                <td className="normal-case">{data?.submittedTaskLink}</td>
                <td>

                    {
                        (samedata[0].winnerEmail)
                            ? <button className="uppercase btn bg-red-500 hover:bg-red-600 text-white">Un-success</button>
                            : <button onClick={() => { handleDeclareWinButton(participantName, participantEmail, contestId, participantPhotoURL) }} className="uppercase btn bg-sky-500 text-white">declare win</button>
                    }



                </td>

            </tr>

        </tbody >
    );
};

export default TableforSubmittedContestDetailsPage;