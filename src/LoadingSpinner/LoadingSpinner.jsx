import { HashLoader } from "react-spinners";

const LoadingSpinner = () => {
    return (
        <div className="absolute top-0 bottom-0 left-0 right-0 h-full w-full flex justify-center items-center z-50">

            <HashLoader color="#4361ee" size={100} />

        </div>
    );
};

export default LoadingSpinner;