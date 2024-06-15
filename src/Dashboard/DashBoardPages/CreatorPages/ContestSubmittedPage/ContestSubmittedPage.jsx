import { toast } from "react-toastify";
import LoadingSpinner from "../../../../LoadingSpinner/LoadingSpinner";
import useAxiosPublic from "../../../../Hooks/useAxiosPublic/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";
import useAuth from './../../../../Hooks/useAuth/useAuth';
import SingleContest from "./SingleContest";
import { Helmet } from "react-helmet";

const ContestSubmittedPage = () => {

  const axiosPublic = useAxiosPublic();
  const { user } = useAuth();

  const email = user.email;

  console.log(email);

  const { isPending, error, data: submittedContestData = [0] } = useQuery({
    queryKey: ['submittedContestData', email],
    queryFn: async () => {
      const { data } = await axiosPublic(`/getParticipantSubmittedData/${email}`);
      return data;
    }
  })

  if (isPending) return <LoadingSpinner />

  if (error) return toast.error(error.message);



  return (
    <div className="grid grid-cols-2 gap-6 mt-10 md:mt-12 p-4">
      <Helmet>
        <title>ContestHUB | Contest Submitted</title>
      </Helmet>
      {
        submittedContestData.map(item => <SingleContest key={item._id} item={item} />)
      }
    </div>
  );
};

export default ContestSubmittedPage;