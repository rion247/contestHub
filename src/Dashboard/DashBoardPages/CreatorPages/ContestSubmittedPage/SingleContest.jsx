import { Link } from 'react-router-dom';

const SingleContest = ({ item }) => {

    // console.log(item);

    return (
        <Link to={`/dashboard/contestsubmittedpage/${item.contestId}`}>

            <article className="flex flex-col w-full shadow-lg">

                <a rel="noopener noreferrer" href="#" aria-label="Te nulla oportere reprimique his dolorum">
                    <img alt="...Loading" className="object-cover w-full h-52 bg-gray-500" src={item.contestImageURL}  />
                </a>

                <div className="flex flex-col p-6">

                    <a rel="noopener noreferrer" href="#" className="text-sm tracking-wider uppercase hover:underline text-sky-500 mb-2">Prize Money : {item.prizeMoney }</a>

                    <h3 className="flex-1 py-2 text-base xl:text-lg font-semibold leading-snug">{item.contestName }</h3>

                    <div className="flex flex-wrap pt-3 space-x-2 text-xs text-gray-400">
                        <p>{item.contestDescription.slice(0,100) }</p>
                    </div>

                </div>


            </article>

        </Link>
    );
};

export default SingleContest;