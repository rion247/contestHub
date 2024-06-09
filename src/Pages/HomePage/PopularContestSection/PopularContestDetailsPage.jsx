import { Link, useParams } from "react-router-dom";
import useAxiosPublic from "../../../Hooks/useAxiosPublic/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";
import { toast } from "react-toastify";
import LoadingSpinner from './../../../LoadingSpinner/LoadingSpinner';

const PopularContestDetailsPage = () => {

    const { id } = useParams();

    const axiosPublic = useAxiosPublic();

    const { isPending, error, data: singleContestData = [0] } = useQuery({
        queryKey: ['singleContestData'],
        queryFn: async () => {
            const { data } = await axiosPublic(`/singleContestData/${id}`);
            return data;
        }
    })

    if (isPending) return <LoadingSpinner />

    if (error) return toast.error(error.message);

    const { contestName, contestTypeTags, contestPrice, prizeMoney, contestDescription, taskSubmissionTextInstruction, creatorEmail, creatorName, contestPostingDate, contestDeadlineDate, contestImageURL, _id } = singleContestData;

    const postingDate = contestPostingDate.split('T')[0];
    const deadlineDate = contestDeadlineDate.split('T')[0];
    
    return (
        <div className="max-w-[350px] p-4 mx-auto md:max-w-xl lg:max-w-4xl xl:max-w-7xl  mt-4 md:mt-6 lg:mt-8 xl:mt-32 font-poppins text-black mb-16 md:mb-20 lg:mb-32 xl:mb-40">

            <a rel="noopener noreferrer" href="#" className="block max-w-sm gap-3 mx-auto sm:max-w-full group hover:no-underline focus:no-underline lg:grid lg:grid-cols-12 dark:bg-gray-50">
                <img src={contestImageURL} alt="...Loading" className="object-cover w-full h-full rounded lg:col-span-7 dark:bg-gray-500" />
                <div className="p-6 space-y-4 lg:col-span-5">

                    <span className="text-sm text-neutral-600 italic">Contest ID: {_id}</span>

                    <h3 className="text-lg md:text-xl lg::text-2xl font-semibold sm:text-4xl mt-6 md:mt-12 py-4 border-dashed border-y border-neutral-300 mb-4 md:mb-10">{contestName}</h3>

                    <h6 className="text-sm text-sky-500 uppercase">{contestTypeTags}</h6>


                    <p className="text-xs md:text-sm lg:text-base text-neutral-500 text-justify py-4 border-dashed border-b border-transparent mb-4 md:mb-10">{contestDescription}</p>

                    <div className="pb-4 border-dashed border-b border-neutral-300  ">

                        <h3 className="text-lg md:text-xl lg::text-2xl font-semibold sm:text-4xl mb-2 md:mb-6 underline">Task Submission Text Instruction</h3>
                        <p className="text-xs md:text-sm lg:text-base text-neutral-500 text-justify mb-4 md:mb-6">{taskSubmissionTextInstruction}</p>

                        <div className="grid grid-cols-1 gap-4">

                            <div className="flex items-center justify-start gap-2 text-black">

                                <h6 className="text-base font-medium">Contest Posting Date:</h6>
                                <h6 className="text-base font-medium ">{postingDate}</h6>

                            </div>

                            <div className="flex items-center justify-start gap-2 text-black">

                                <h6 className="text-base font-medium">Contest Deadline Date:</h6>
                                <h6 className="text-base font-medium ">{deadlineDate}</h6>

                            </div>

                            <div className="flex items-center justify-start gap-2">

                                <h6 className=" text-sm md:text-base lg:text-lg font-medium">Contest Price:</h6>
                                <h6 className="text-lg md:text-xl lg:text-2xl text-sky-500 font-medium ">${contestPrice}</h6>

                            </div>

                            <div className="flex items-center justify-start gap-2">

                                <h6 className=" text-sm md:text-base lg:text-lg font-medium">Contest Prize Money:</h6>
                                <h6 className="text-lg md:text-xl lg:text-2xl text-sky-500 font-medium ">${prizeMoney}</h6>

                            </div>

                        </div>

                    </div>

                    {/* {
                        contestWinner && <div className="grid grid-cols-1 gap-4 text-neutral-500">

                            <div className="flex items-center justify-start gap-2 ">

                                <h6 className="text-base font-medium">Contest Winner:</h6>
                                <h6 className="text-base font-medium ">{contestWinnerName}</h6>

                            </div>

                            <div className="flex items-center justify-start gap-2">

                                <h6 className="text-base font-medium">Contest Winner Email:</h6>
                                <h6 className="text-base font-medium ">{contestWinnerEmail}</h6>

                            </div>

                        </div>
                    } */}

                    <div className="grid grid-cols-1 gap-4 text-neutral-500">

                        <div className="flex items-center justify-start gap-2 ">

                            <h6 className="text-base font-medium">Creator Name:</h6>
                            <h6 className="text-base font-medium ">{creatorName}</h6>

                        </div>

                        <div className="flex items-center justify-start gap-2">

                            <h6 className="text-base font-medium">Creator Email:</h6>
                            <h6 className="text-base font-medium ">{creatorEmail}</h6>

                        </div>

                    </div>

                    <div className="w-full">
                        <Link to={`/payment/${_id}`}>
                            <button className="bg-sky-500 hover:bg-sky-400 text-white btn w-full uppercase">Contest Registration</button>
                        </Link>
                    </div>



                </div>
            </a>

        </div>
    );
};

export default PopularContestDetailsPage;