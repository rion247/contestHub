import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../../Hooks/useAxiosPublic/useAxiosPublic";
import SingleBestContestCreator from "./SingleBestContestCreator";
import LoadingSpinner from "../../../LoadingSpinner/LoadingSpinner";
import { toast } from "react-toastify";
import Slider from "react-slick";

const BestContestCreatorSection = () => {

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


    const uniqueContests = contestData.reduce((acc, current) => {
        const x = acc.find(item => item.creatorEmail === current.creatorEmail);
        if (!x) {
            return acc.concat([current]);
        } else {
            return acc;
        }
    }, []);

    const popularContestData = uniqueContests.sort((a, b) => b.participantCount - a.participantCount)

    console.log(popularContestData);

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 3,
        autoplay: true,
        speed: 4000,
        autoplaySpeed: 2000,
        cssEase: "linear"
    };

    return (
        <div className="slider-container font-poppins mt-10 md:mt-16 lg:mt-24 xl:mt-32 text-center container mx-auto mb-8 md:mb-16 lg:mb-24 xl:mb-32">

            <h4 className="text-xl md:text-2xl lg:text-3xl xl:text-5xl font-semibold mb-3">Best Contest Creator</h4>

            <p className="text-xs md:text-sm xl:text-base text-neutral-500 text-center mb-10 md:mb-12 lg:mb-16 xl:mb-24 w-[350px] md:w-[635px] xl:w-[750px] mx-auto">
                Join us in celebrating creativity, pushing boundaries, and making your mark in the world of contests. Dive into the magic of competition.
            </p>
            <Slider {...settings}>
                {
                    popularContestData.map(item => <SingleBestContestCreator key={item._id} item={item} />)
                }

            </Slider>
        </div>
    );
};

export default BestContestCreatorSection;



