import useAuth from "../../../../Hooks/useAuth/useAuth";
import LoadingSpinner from "../../../../LoadingSpinner/LoadingSpinner";
import DashboardMenuItem from "../DashBoardMenuItem/DashBoardMenuItem";
import { MdOutlineHome } from "react-icons/md";
import { PiUsersThree } from "react-icons/pi";
import { LuFileSignature } from "react-icons/lu";


const AdminMenu = () => {
    const { loading } = useAuth();

    if (loading) {
        <LoadingSpinner />
    }
    return (
        <div>
            <DashboardMenuItem label='Dashboard Home' address='/dashboard' icon={MdOutlineHome} />
            <DashboardMenuItem label='Manage User' address='/dashboard/manageuser' icon={PiUsersThree} />
            <DashboardMenuItem label='Manage Contests' address='/dashboard/managecontests' icon={LuFileSignature} />

        </div>
    );
};

export default AdminMenu;