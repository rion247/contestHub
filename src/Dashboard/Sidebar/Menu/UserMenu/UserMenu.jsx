import { FaWalking } from "react-icons/fa";
import { GrTrophy } from "react-icons/gr";
import { FiUser } from "react-icons/fi";
import DashboardMenuItem from './../DashBoardMenuItem/DashBoardMenuItem';
import useAuth from "../../../../Hooks/useAuth/useAuth";
import LoadingSpinner from "../../../../LoadingSpinner/LoadingSpinner";
import { MdOutlineHome } from "react-icons/md";


const UserMenu = () => {

    const { loading } = useAuth();

    if (loading) {
        <LoadingSpinner />
    }

    return (

        <div>

            <DashboardMenuItem label='Dashboard Home' address='/dashboard' icon={MdOutlineHome} />
            <DashboardMenuItem label='My Participated Contest' address='/dashboard/myparticipatedcontest' icon={FaWalking} />
            <DashboardMenuItem label='My Winning Contest' address='/dashboard/mywinningcontestpage' icon={GrTrophy} />
            <DashboardMenuItem label='My Profile' address='/dashboard/myprofile' icon={FiUser} />

        </div>

    )
};

export default UserMenu;
