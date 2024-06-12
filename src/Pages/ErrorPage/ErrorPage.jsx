import { Link } from "react-router-dom";
import errorPic from '../../../src/assets/error.jpg'

const ErrorPage = () => {
    return (
        <div className="bg-neutral-100 min-h-screen font-work-sans flex justify-center items-center">

            <div className="max-w-80  md:max-w-2xl lg:max-w-4xl xl:max-w-6xl mx-auto flex justify-center items-center">

                <div className="text-center">

                    <div className="flex justify-center">
                        <img className="w-2/4 md:w-3/5 lg:w-3/4 md:h-80 lg:h-96" src={errorPic} alt="...Loading" />
                    </div>

                    <h1 className="text-xl md:text-2xl lg:text-3xl xl:text-4xl font-bold"><span>404.</span> An Error Occurred </h1>

                    <h4 className="text-xs md:text-sm lg:text-base my-4 text-neutral-500">The requested URL/badpage was not found on this server</h4>

                    <p className="text-xs md:text-sm lg:text-base mb-8">Feel Free To Go Back To The Home Page By Clicking The Back To Home Button</p>

                    <Link to="/" className="inline-flex items-center justify-center px-3 md:px-4 lg:px-6 py-3 mb-2 text-sm md:text-base lg:text-lg text-white bg-sky-500 font-semibold rounded-md hover:bg-sky-400 sm:w-auto sm:mb-0" data-primary="green-400" data-rounded="rounded-2xl" data-primary-reset="{}">
                        Back To Home
                    </Link>

                </div>

            </div>

        </div>
    );
};

export default ErrorPage;