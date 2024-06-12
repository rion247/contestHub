import { Link } from "react-router-dom";

const ArticleWriting = ({ item }) => {
    return (
        <div className="flex flex-col w-full shadow-lg h-full p-4 ">

            <div className="relative flex-1">

                <img className="h-full" src={item.contestImageURL} alt="...Loading" />

                <div className="absolute top-3 left-3">
                    <h6 className="rounded-sm px-2 py-1 bg-sky-500 text-xs text-white uppercase font-semibold font-open-sans">Participant Count: {item.participantCount}</h6>
                </div>

            </div>

            <div className="flex flex-col p-6 ">

                <a rel="noopener noreferrer" href="#" className="text-sm tracking-wider uppercase hover:underline text-sky-500 mb-2">Prize Money : {item.prizeMoney}</a>

                <h3 className="flex-1 py-2 text-base xl:text-lg font-semibold leading-snug">{item.contestName}</h3>

                <div className="flex flex-wrap pt-3 space-x-2 text-xs text-gray-400">
                    <p>{item.contestDescription.slice(0, 150)}</p>
                </div>

            </div>

            <Link to={`/contestDetails/${item._id}`}>
                <button className="w-full text-white bg-sky-500 hover:bg-sky-400 btn">Details</button>
            </Link>

        </div>
    );
};

export default ArticleWriting;