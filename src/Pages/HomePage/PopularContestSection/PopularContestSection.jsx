import SinglePopularContest from "./SinglePopularContest";
import useAxiosPublic from './../../../Hooks/useAxiosPublic/useAxiosPublic';
import { useQuery } from '@tanstack/react-query';
import LoadingSpinner from './../../../LoadingSpinner/LoadingSpinner';
import { toast } from "react-toastify";

const PopularContestSection = () => {

    const axiosPublic = useAxiosPublic();

    const { isPending, error, data: contestData = [0] } = useQuery({
        queryKey: ['contestsData'],
        queryFn: async () => {
            const { data } = await axiosPublic('/contestData');
            return data;
        }
    })

    if (isPending) return <LoadingSpinner />

    if (error) return toast.error(error.message);


    return (
        <div className="font-poppins mt-10 md:mt-16 lg:mt-24 xl:mt-32 text-center container mx-auto mb-8 md:mb-16 lg:mb-24 xl:mb-32">

            <h4 className="text-xl md:text-2xl lg:text-3xl xl:text-5xl font-semibold mb-3">Popular Contest Section</h4>

            <p className="text-xs md:text-sm xl:text-base text-neutral-500 text-center mb-10 md:mb-12 lg:mb-16 xl:mb-24 w-[350px] md:w-[635px] xl:w-[750px] mx-auto">
                Dive into the excitement with our most popular contests! These competitions are where the brightest talents converge, showcasing their skills and creativity.
            </p>

            <div className="max-w-xs md:max-w-2xl xl:max-w-full mx-auto grid grid-cols-1 xl:grid-cols-2 gap-6" >

                {
                    contestData.sort((a, b) => (b.participantCount - a.participantCount)).slice(0, 6).map(contest => <SinglePopularContest key={contest._id} contest={contest}></SinglePopularContest>)
                }

            </div>

        </div>
    );
};

export default PopularContestSection;