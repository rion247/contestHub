import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../../Hooks/useAxiosPublic/useAxiosPublic";
import LoadingSpinner from "../../../LoadingSpinner/LoadingSpinner";
import { toast } from "react-toastify";
import SingleAdvertisement from "./SingleAdvertisement";
import Slider from 'react-slick';
import { FcNext, FcPrevious } from "react-icons/fc";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useEffect, useState } from "react";
const AdvertisementDetails = ({ totalWinnerCount }) => {

    const axiosPublic = useAxiosPublic();
    const [text, SetText] = useState([]);

    useEffect(() => {
        fetch('text.json')
            .then(response => response.json())
            .then(json => SetText(json))
    }, [])

    const { isPending, error, data: contestData = [] } = useQuery({
        queryKey: ['contestData'],
        queryFn: async () => {
            const { data } = await axiosPublic(`/contestData`);
            return data;
        }
    })

    if (isPending) return <LoadingSpinner />

    if (error) return toast.error(error.message);

    const settings = {
        dots: false,
        lazyLoad: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        initialSlide: 2,
        autoplay: true,
        autoplaySpeed: 2000,
        nextArrow: <FcNext />,
        prevArrow: <FcPrevious />
    };

    const winnerData = contestData.filter(item => item.winnerEmail && item.winnerEmail !== null && item.winnerEmail !== '')

    // console.log(winnerData);

    return (
        <div className=" text-black">
            <Slider {...settings}>
                {
                    winnerData.map(item => <SingleAdvertisement key={item._id} item={item} totalWinnerCount={totalWinnerCount} text={text} />)
                }

            </Slider>


        </div >
    );
};

export default AdvertisementDetails;