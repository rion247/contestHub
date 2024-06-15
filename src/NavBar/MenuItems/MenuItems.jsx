import Container from "../../components/Shared/Container";
import { Link, NavLink } from "react-router-dom";
import useAuth from './../../Hooks/useAuth/useAuth';
import userPic from '../../assets/user.png'
import { toast } from "react-toastify";
import LoadingSpinner from "../../LoadingSpinner/LoadingSpinner";
import { Tooltip } from 'react-tooltip'

const MenuItems = () => {
    const { user, logOutUser, loading } = useAuth();

    if (loading) {
        return <LoadingSpinner />
    }

    const handleLogOutButton = async () => {
        try {
            await logOutUser();
            toast('User Logged Out Successfully');
        } catch (err) {
            console.log(err.message);
        }
    }
    const links = <>
        <NavLink data-tooltip-id="my-tooltip" data-tooltip-place="bottom" data-tooltip-content="Home" to="/" className={({ isActive }) => isActive ? "px-4 xl:px-6 py-3 bg-sky-500 rounded font-semibold text-white" : "px-3 xl:px-5 py-2 bg-transparent font-normal text-neutral-500"}>Home</NavLink>
        <NavLink data-tooltip-id="my-tooltip" data-tooltip-place="bottom" data-tooltip-content="All Contests" to="/all-contests" className={({ isActive }) => isActive ? "px-4 xl:px-6 py-3 bg-sky-500 rounded font-semibold text-white" : "px-3 xl:px-5 py-2 bg-transparent font-normal text-neutral-500"}>All Contests</NavLink>
        <NavLink data-tooltip-id="my-tooltip" data-tooltip-place="bottom" data-tooltip-content="Time Visualization" to="/timeVisualization" className={({ isActive }) => isActive ? "px-4 xl:px-6 py-3 bg-sky-500 rounded font-semibold text-white" : "px-3 xl:px-5 py-2 bg-transparent font-normal text-neutral-500"}>Time Visualization</NavLink>
    </>

    return (
        <Container>
            <div className="navbar font-poppins">

                <div className="navbar-start flex-1 w-full">
                    <div className="dropdown">
                        <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                        </div>
                        <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-50 p-2 shadow bg-base-100 rounded-box w-52">
                            {links}
                        </ul>
                    </div>

                    <div className="hidden lg:flex ">
                        <ul className="menu menu-horizontal px-1 gap-x-2 items-center">
                            {links}
                        </ul>
                    </div>

                </div>

                <div className="">
                    <div className="dropdown dropdown-end md:mr-1 lg:mr-3 xl:mr-4">
                        <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                            <div className="w-6 md:w-7 lg:w-8 xl:w-9 rounded-full">
                                <img alt="...Loading" src={user ? user.photoURL : userPic} />
                            </div>
                        </div>
                        {
                            user && <ul tabIndex={0} className="mt-3 z-40 p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52">

                                <li><Link>{user?.displayName}</Link></li>
                                <li><Link to='/dashboard'>Dashboard</Link></li>
                                <li onClick={handleLogOutButton}><Link>Logout</Link></li>
                            </ul>
                        }
                    </div>

                    {
                        user ? <Link to='/logInPage' className="px-2 md:px-3 xl:px-6 py-1 md:py-2 bg-amber-500 hidden hover:bg-amber-400 text-white rounded md:rounded text-xs md:text-sm xl:text-base uppercase">LogIn</Link>
                            : <Link to='/logInPage' className="px-2 md:px-3 flex xl:px-6 py-1 md:py-2 bg-amber-500 hover:bg-amber-400 text-white rounded md:rounded text-xs md:text-sm xl:text-base uppercase">LogIn</Link>
                    }

                    <Link to='/registrationPage' className="px-2 md:px-3 flex xl:px-6 py-1 md:py-2 bg-sky-500 hover:bg-blue-600 text-white rounded md:rounded text-xs md:text-sm xl:text-base uppercase ml-2 xl:ml-3">Register</Link>

                </div>

            </div>
            <Tooltip id="my-tooltip" />

        </Container>
    );
};

export default MenuItems;