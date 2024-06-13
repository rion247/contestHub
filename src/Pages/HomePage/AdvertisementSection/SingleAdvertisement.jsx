


const SingleAdvertisement = ({ item, totalWinnerCount, text }) => {

    // console.log(totalWinnerCount, item)
    return (
        <div className=" xl:container flex flex-col items-center p-4 mx-auto space-y-6">
            <h4 className="text-2xl py-4 border-y border-dashed border-neutral-300 uppercase italic text-sky-500 ">Total Contest</h4>
            <h6>Winner Count: {totalWinnerCount}</h6>

            <p className="px-6 py-2 font-semibold text-center sm:font-bold text-sm md:text-lg xl:text-2xl lg:max-w-xl xl:max-w-4xl text-gray-900">{text.map(t => t.text)}</p>
            <div className="flex justify-center items-center space-x-3">
                <img src={item.winnerPhotoURL} alt="" className="w-16 lg:w-20 h-16 lg:h-20 bg-center bg-cover rounded-md  bg-gray-700" />
                <div>
                    <p className="leading-tight font-semibold text-justify">{item.contestName}</p>
                    <p className="text-sm leading-tight text-gray-500 text-justify">Winner Name: {item.winnerName}</p>
                    <p className="text-sm leading-tight text-gray-500 text-justify">Winner Email: {item.winnerEmail}</p>
                    <p className="text-sm leading-tight text-gray-500 text-justify">Participant Count: {item.participantCount}</p>


                </div>
            </div>


        </div>
    );
};

export default SingleAdvertisement;