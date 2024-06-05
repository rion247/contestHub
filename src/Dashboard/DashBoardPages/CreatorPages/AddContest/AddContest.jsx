import { Helmet } from "react-helmet";
import { useState } from "react";
import DatePicker from "react-datepicker";
import { useForm } from "react-hook-form";

import "react-datepicker/dist/react-datepicker.css";
import useAuth from './../../../../Hooks/useAuth/useAuth';
import { toast } from "react-toastify";
import useAxiosPublic from "../../../../Hooks/useAxiosPublic/useAxiosPublic";
import { TbFidgetSpinner } from "react-icons/tb";
// import { uploadImage } from "../../../../components/Utilities/ImgBB/ImgBB";

const AddContest = () => {

    const [dataLoading, SetDataLoading] = useState(false);

    const [contestPostingDate, SetContestPostingDate] = useState(new Date());

    const [contestDeadlineDate, SetContestDeadlineDate] = useState(new Date());

    const { user } = useAuth();

    const axiosPublic = useAxiosPublic();

    const userEmail = user?.email;
    const userName = user?.displayName;

    const { register, handleSubmit, reset, formState: { errors } } = useForm();

    const onSubmit = async (data) => {

        const { contestName, contestTypeTags, contestContestCategory, price, prizeMoneyOthers, contestDescription, taskSubmissionTextInstruction, contestImageURL } = data;

        // const image = photo[0];

        // console.log(image);

        const prizeMoney = parseFloat(prizeMoneyOthers);
        const contestPrice = parseFloat(price);

        try {

            SetDataLoading(true);

            // const photoURL = await uploadImage(image);

            const contestData = {
                contestName,
                contestTypeTags,
                contestContestCategory,
                contestPrice,
                prizeMoney,
                contestDescription,
                taskSubmissionTextInstruction,
                creatorEmail: userEmail,
                creatorName: userName,
                contestPostingDate,
                contestDeadlineDate,
                contestStatus: 'pending',
                // contestImageURL: photoURL
                contestImageURL
            }

            const { data } = await axiosPublic.post('/contestData', contestData);

            if (data.acknowledged) {
                toast.success('Contest created successfully!!!');
                SetDataLoading(false);
                reset();
            }

        } catch (err) {
            toast.error(err.message);
        }

    };



    return (
        <div className="w-full max-w-80 p-4 mx-auto md:max-w-2xl lg:max-w-4xl xl:max-w-7xl md:p-12 rounded-md shadow sm:p-8 border border-neutral-300 text-black mt-12 font-poppins mb-16 md:mb-20 lg:mb-32 xl:mb-40">

            <Helmet>
                <title>ContestHub | Add Contest Page</title>
            </Helmet>

            <div className="space-y-2 col-span-full lg:col-span-1 text-start lg:text-center mb-4 md:mb-6 lg:mb-8 xl:mb-12">
                <p className="font-bold text-lg md:text-xl lg:text-2xl xl:text-3xl mb-2 md:mb-4 xl:mb-6">Add Contest Page</p>
                <p className="text-xs text-center md:text-sm xl:text-base text-neutral-500">As a creator, you are the architect of possibility, the maestro of innovation, and the catalyst for change. Your contest isnt just an event—its a canvas upon which dreams are painted, passions are ignited, and legacies are forged.</p>
            </div>

            <form onSubmit={handleSubmit(onSubmit)}>

                <div className="grid grid-cols-1 md:grid-cols-6 gap-6 mb-10">

                    <div className="space-y-2 col-span-3">
                        <label htmlFor="contestName" className="block text-sm md:text-base xl:text-lg">Contest Name</label>
                        <input type="text" name="contestName" id="contestName" placeholder="Enter Contest Name" className="w-full px-3 py-2 md:py-3 xl:py-4 border rounded-md border-neutral-300 bg-transparent text-gray-900 text-sm md:text-base xl:text-lg focus:border-violet-400"
                            {...register("contestName", { required: true })}
                        />
                        {errors.contestName && <span className="text-red-500">This field is required</span>}

                    </div>

                    <div className="space-y-2 col-span-3">
                        <label htmlFor="contestImageURL" className="block text-sm md:text-base xl:text-lg">Contest Image</label>
                        <input type="text" name="contestImageURL" id="contestImageURL" placeholder="Enter Contest Image" className="w-full px-3 py-2 md:py-3 xl:py-4 border rounded-md border-neutral-300 bg-transparent text-gray-900 text-sm md:text-base xl:text-lg focus:border-violet-400"
                            {...register("contestImageURL", { required: true })}
                        />
                        {errors.contestImageURL && <span className="text-red-500">This field is required</span>}

                    </div>

                    {/* <div className="space-y-2 col-span-3">
                        <label htmlFor="photo" className="block text-sm md:text-base xl:text-lg">Contest Image</label>
                        <input name="photo" type="file" className="file-input file-input-bordered w-full h-[38px] md:h-[50px] xl:h-[62px]"  {...register("photo", { required: true })} />
                        {errors.contestImage && <span className="text-red-500">This field is required</span>}
                    </div> */}

                    <div className="space-y-2 col-span-3">
                        <label htmlFor="contestTypeTags" className="block text-sm md:text-base xl:text-lg">Contest Type/Tags</label>
                        <select className="select select-bordered w-full h-auto md:h-[50px] xl:h-[62px] px-3 py-1 md:py-3 xl:py-4 border rounded-md border-neutral-300 bg-transparent text-gray-400 text-sm md:text-base xl:text-lg focus:border-violet-400" {...register("contestTypeTags")} required >
                            <option disabled selected>Select Contest Type/Tags</option>
                            <option value='imageDesignContests'>Image Design Contests</option>
                            <option value='articleWriting'>Article Writing</option>
                            <option value='marketingStrategy'>Marketing Strategy</option>
                            <option value='digitalAdvertisementContests'>Digital Advertisement Contests</option>
                            <option value='gamingReview'>Gaming Review</option>
                            <option value='bookReview'>Book Review</option>
                            <option value='businessIdeaConcerts'>Business Idea Concerts</option>
                            <option value='movieReview'>Movie Review</option>
                        </select>
                    </div>

                    <div className="space-y-2 col-span-3">
                        <label htmlFor="contestCategory" className="block text-sm md:text-base xl:text-lg">Contest Category</label>
                        <select className="select select-bordered w-full h-auto md:h-[50px] xl:h-[62px] px-3 py-1 md:py-3 xl:py-4 border rounded-md border-neutral-300 bg-transparent text-gray-400 text-sm md:text-base xl:text-lg focus:border-violet-400" {...register("contestContestCategory")} required>
                            <option disabled selected>Select Contest Category</option>
                            <option value='popular'>Popular</option>
                            <option value='trending'>Trending</option>
                            <option value='new'>New</option>
                        </select>
                    </div>

                    <div className="space-y-2 col-span-3">
                        <label htmlFor="price" className="block text-sm md:text-base xl:text-lg">Contest Price</label>
                        <input type="number" name="price" id="price" placeholder="Enter Contest Price" className="w-full px-3 py-2 md:py-3 xl:py-4 border rounded-md border-neutral-300 bg-transparent text-gray-900 text-sm md:text-base xl:text-lg focus:border-violet-400"
                            {...register("price", { required: true })}
                        />
                        {errors.contestPrice && <span className="text-red-500">This field is required</span>}
                    </div>

                    <div className="space-y-2 col-span-3">
                        <label htmlFor="prizeMoneyOthers" className="block text-sm md:text-base xl:text-lg">Prize Money or Others</label>
                        <input type="number" name="prizeMoneyOthers" id="prizeMoneyOthers" placeholder="Enter Prize Money or Others" className="w-full px-3 py-2 md:py-3 xl:py-4 border rounded-md border-neutral-300 bg-transparent text-gray-900 text-sm md:text-base xl:text-lg focus:border-violet-400"
                            {...register("prizeMoneyOthers", { required: true })}
                        />
                        {errors.prizeMoneyOthers && <span className="text-red-500">This field is required</span>}
                    </div>

                    <div className="space-y-2 col-span-6">
                        <label htmlFor="contestDescription" className="block text-sm md:text-base xl:text-lg">Contest Description</label>
                        <input type="text" name="contestDescription" id="contestDescription" placeholder="Enter Contest Description" className="w-full px-3 py-2 md:py-3 xl:py-4 border rounded-md border-neutral-300 bg-transparent text-gray-900 text-sm md:text-base xl:text-lg focus:border-violet-400"
                            {...register("contestDescription", { required: true })}
                        />
                        {errors.contestDescription && <span className="text-red-500">This field is required</span>}
                    </div>

                    <div className="space-y-2 col-span-6">
                        <label htmlFor="taskSubmissionTextInstruction" className="block text-sm md:text-base xl:text-lg">Task Submission Text Instruction</label>
                        <input type="text" name="taskSubmissionTextInstruction" id="taskSubmissionTextInstruction" className="w-full px-3 py-2 md:py-3 xl:py-4 border rounded-md border-neutral-300 bg-transparent text-gray-900 text-sm md:text-base xl:text-lg focus:border-violet-400" placeholder="Enter Task Submission Text Instruction" {...register("taskSubmissionTextInstruction", { required: true })} />
                        {errors.taskSubmissionTextInstruction && <span className="text-red-500">This field is required</span>}
                    </div>

                    <div className="space-y-2 col-span-3">
                        <label htmlFor="contestPostingDate" className="block text-sm md:text-base xl:text-lg">Contest Posting Date</label>
                        <DatePicker dateFormat="dd/MM/yyyy" className="px-3 py-2 md:py-3 xl:py-4 border rounded-md  border-neutral-300 bg-transparent text-gray-400 text-sm md:text-base xl:text-lg focus:border-violet-400 
                        w-[286px] md:w-[275px] lg:w-[387px] xl:w-[579px]" selected={contestPostingDate} onChange={(date) => SetContestPostingDate(date)} required />
                    </div>

                    <div className="space-y-2 col-span-3">
                        <label htmlFor="contestDeadlineDate" className="block text-sm md:text-base xl:text-lg">Contest Deadline Date</label>
                        <DatePicker dateFormat="dd/MM/yyyy" className="px-3 py-2 md:py-3 xl:py-4 border rounded-md border-neutral-300 bg-transparent text-gray-400 text-sm md:text-base xl:text-lg focus:border-violet-400
                        w-[286px] md:w-[275px] lg:w-[387px] xl:w-[579px] " selected={contestDeadlineDate} onChange={(date) => SetContestDeadlineDate(date)} required />
                    </div>

                    <div className="space-y-2 col-span-3">
                        <label htmlFor="emailAddress" className="block text-sm md:text-base xl:text-lg">Email Address</label>
                        <input type="email" name="emailAddress" id="emailAddress" placeholder={userEmail} className="w-full px-3 py-2 md:py-3 xl:py-4 border rounded-md border-neutral-300 bg-transparent text-gray-900 text-sm md:text-base xl:text-lg focus:border-violet-400" readOnly />
                    </div>

                    <div className="space-y-2 col-span-3">
                        <label htmlFor="yourName" className="block text-sm md:text-base xl:text-lg">Your Name</label>
                        <input type="text" name="yourName" id="yourName" placeholder={userName} className="w-full px-3 py-2 md:py-3 xl:py-4 border rounded-md border-neutral-300 bg-transparent text-gray-900 text-sm md:text-base xl:text-lg focus:border-violet-400" readOnly />
                    </div>

                </div>

                {
                    <button disabled={dataLoading} type="submit" className="w-full px-8 py-3 font-medium rounded-md bg-sky-500 hover:bg-sky-400 text-white text-sm md:text-base lg:text-lg text-center flex justify-center ">{
                        dataLoading ?
                            <TbFidgetSpinner className="  animate-spin" />
                            : 'Add Contest'
                    }</button>

                }

            </form >

        </div >
    );
};

export default AddContest;