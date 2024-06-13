
const SingleBestContestCreator = ({ item }) => {

    console.log(item);
    return (
        <div className="flex flex-col w-full shadow-lg mx-2 px-2">

            <a rel="noopener noreferrer" href="#" aria-label="Te nulla oportere reprimique his dolorum">
                <img alt="...Loading" className="object-cover w-full h-52 bg-gray-500" src={item.creatorPhotoURL} />
            </a>

            <div className="flex flex-col p-6 overflow-auto">

                <h3 className="flex-1 py-2 text-sm md:text-base xl:text-lg font-semibold leading-snug text-start">{item.creatorName}</h3>

                <div className="flex flex-wrap pt-3 space-x-2 text-xs text-gray-400 text-wrap">
                    <p>{item.creatorEmail}</p>
                </div>
            </div>


        </div>
    );
};

export default SingleBestContestCreator;