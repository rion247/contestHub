import { HiMiniBars3CenterLeft } from "react-icons/hi2";
import { Link, Outlet } from "react-router-dom";
import useRole from "../../Hooks/useRole/useRole";
import UserMenu from "../Sidebar/Menu/UserMenu/UserMenu";
import logoPic from '../../../public/logo.png';

const DashboardLayOut = () => {

    const [role, isLoading] = useRole();

    console.log(isLoading);

    return (
        <div className="drawer lg:drawer-open">
            <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
            <div className="drawer-content flex flex-col items-center justify-center relative">
                <Outlet />
                <label htmlFor="my-drawer-2" className=" p-2 bg-transparent border-transparent outline-transparent drawer-button lg:hidden text-lg  md:text-xl absolute right-2 top-2"><HiMiniBars3CenterLeft /></label>

            </div>
            <div className="drawer-side ">
                <label htmlFor="my-drawer-2" aria-label="close sidebar" className="drawer-overlay"></label>

                <ul className="menu p-4 w-80 min-h-full text-white text-base bg-sky-500">
                    {/* Sidebar content here */}

                    <div className="flex justify-center bg-slate-200 rounded items-center p-2">
                        <Link to='/' className="flex justify-start items-end gap-x-3">

                            <img className="w-6 md:w-8 lg:w-10 xl:w-12" src={logoPic} alt="...Loading" />

                            <h4 className="text-2xl uppercase font-extrabold text-amber-400">contest<span className="text-sky-500">hub</span></h4>

                        </Link>

                    </div>

                    {
                        role === 'user' && <UserMenu />
                    }
                </ul>

            </div>
        </div>
    )
};

export default DashboardLayOut;