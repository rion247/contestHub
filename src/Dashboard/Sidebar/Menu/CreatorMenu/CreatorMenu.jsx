import useAuth from "../../../../Hooks/useAuth/useAuth";
import LoadingSpinner from "../../../../LoadingSpinner/LoadingSpinner";
import DashboardMenuItem from "../DashBoardMenuItem/DashBoardMenuItem";
import { MdOutlineHome } from "react-icons/md";
import { MdOutlineLibraryAdd } from "react-icons/md";
import { FiBook } from "react-icons/fi";
import { AiOutlineFileDone } from "react-icons/ai";


const CreatorMenu = () => {

    const { loading } = useAuth();

    if (loading) {
        <LoadingSpinner />
    }

    return (
        <div>
            <DashboardMenuItem label='Dashboard Home' address='/dashboard' icon={MdOutlineHome} />
            <DashboardMenuItem label='Add Contest' address='/dashboard/addcontest' icon={MdOutlineLibraryAdd} />
            <DashboardMenuItem label='My Created Contest' address='/dashboard/mycreatedcontest' icon={FiBook} />
            <DashboardMenuItem label='Contest Submitted Page' address='/dashboard/contestsubmittedpage' icon={AiOutlineFileDone} />

        </div>
    );
};

export default CreatorMenu;