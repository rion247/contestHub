
import LoadingSpinner from "../../../LoadingSpinner/LoadingSpinner";
import { toast } from "react-toastify";
import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../../Hooks/useAxiosPublic/useAxiosPublic";
import AdvertisementDetails from "./AdvertisementDetails";


const AdvertisementSection = () => {

    const axiosPublic = useAxiosPublic();

    const { isPending, error, data: userData = [] } = useQuery({
        queryKey: ['userWinnerData'],
        queryFn: async () => {
            const { data } = await axiosPublic(`/users`);
            return data;
        }
    })

    if (isPending) return <LoadingSpinner />

    if (error) return toast.error(error.message);

    

    const userWinner = userData.filter(data => data.winCount > 0)

    const totalWinnerCount = userWinner.reduce((total, item) => {
        return total + item.winCount;
    }, 0);

    // console.log(totalWinnerCount)

    // console.log(userWinner)

    return (
        <div className="font-poppins mt-10 md:mt-16 lg:mt-24  text-center container mx-auto mb-10 md:mb-16 lg:mb-24 xl:mb-32 max-w-xs md:max-w-2xl lg:max-w-4xl xl:max-w-6xl p-6  space-y-6 sm:space-y-12">

            

                <AdvertisementDetails totalWinnerCount={totalWinnerCount} />

            

        </div >
    );
};

export default AdvertisementSection;