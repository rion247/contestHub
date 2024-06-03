import { FaWalking } from "react-icons/fa";
import { GrTrophy } from "react-icons/gr";
import { FiUser } from "react-icons/fi";
import DashboardMenuItem from './../DashBoardMenuItem/DashBoardMenuItem';


const UserMenu = () => {
    return (
        <div>

            <DashboardMenuItem label='My Participated Contest' address='/dashboard/myparticipatedcontest' icon={FaWalking}  />
            <DashboardMenuItem label='My Winning Contest' address='/dashboard/mywinningcontestpage' icon={GrTrophy}  />
            <DashboardMenuItem label='My Profile' address='/dashboard/myprofile' icon={FiUser}  />

        </div>
    )
};

export default UserMenu;
