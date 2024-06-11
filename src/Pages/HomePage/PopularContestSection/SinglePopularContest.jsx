import { BsCurrencyDollar } from "react-icons/bs";
import { Link } from "react-router-dom";

const SinglePopularContest = ({ contest }) => {

    return (
        <div className="flex flex-col md:flex-row justify-between rounded-lg border border-neutral-200 font-poppins gap-x-3" data-aos="flip-left" >

            <div className="relative md:w-2/4">

                <img className="h-full rounded-lg md:rounded-none md:rounded-l-lg" src={contest.contestImageURL} alt="...Loading" />

                <div className="absolute top-3 left-3">
                    <h6 className="rounded-sm px-2 py-1 bg-sky-500 text-xs text-white uppercase font-semibold font-open-sans">Participant Count: {contest.participantCount}</h6>
                </div>

            </div>

            <div className="md:w-2/4 p-4 text-start  flex flex-col">

                <h4 className="text-xl font-semibold mb-3">{contest.contestName}</h4>

                <p className="text-start text-sm text-neutral-500 mb-3 flex-1">{contest.contestDescription.slice(0, 120)}</p>

                <div className="flex items-center justify-start text-blue-700 mb-3 font-semibold lg:text-lg xl:text-xl">
                    <h6 className="text-neutral-700">Price Money:</h6>
                    <BsCurrencyDollar />
                    <h6>{contest.prizeMoney}</h6>
                </div>

                <Link className="table text-base font-semibold text-center w-full bg-sky-500 hover:bg-sky-400 text-white py-2 rounded px-4" to={`contestDetails/${contest._id}`}>Details</Link>


            </div>

        </div>
    );
};

export default SinglePopularContest;