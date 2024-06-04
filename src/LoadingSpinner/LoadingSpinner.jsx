import { HashLoader } from "react-spinners";

const LoadingSpinner = () => {
    return (
        <div className="absolute top-0 bottom-0 left-0 right-0 h-full w-full flex justify-center items-center z-10 bg-neutral-200">

            <HashLoader color="#45b3e0" />

        </div>
    );
};

export default LoadingSpinner;