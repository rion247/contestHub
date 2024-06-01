import Container from "../../components/Shared/Container";
import { Link, NavLink } from "react-router-dom";
import useAuth from './../../Hooks/useAuth/useAuth';
import userPic from '../../assets/user.png'

const MenuItems = () => {
    const { user, logOutUser } = useAuth();


    const handleLogOutButton = async () => {
        try {
            await logOutUser();
        } catch (err) {
            console.log(err.message);
        }
    }

    const links = <>
        <NavLink to="/" className={({ isActive }) => isActive ? "px-4 xl:px-6 py-3 bg-blue-500 rounded font-semibold text-white" : "px-3 xl:px-5 py-2 bg-transparent font-normal text-neutral-500"}>Home</NavLink>
        <NavLink to="/all-contests" className={({ isActive }) => isActive ? "px-4 xl:px-6 py-3 bg-blue-500 rounded font-semibold text-white" : "px-3 xl:px-5 py-2 bg-transparent font-normal text-neutral-500"}>All Contests</NavLink>
        <NavLink to="/abc" className={({ isActive }) => isActive ? "px-4 xl:px-6 py-3 bg-blue-500 rounded font-semibold text-white" : "px-3 xl:px-5 py-2 bg-transparent font-normal text-neutral-500"}>Extra Route 1</NavLink>
        <NavLink to="/xyz" className={({ isActive }) => isActive ? "px-4 xl:px-6 py-3 bg-blue-500 rounded font-semibold text-white" : "px-3 xl:px-5 py-2 bg-transparent font-normal text-neutral-500"}>Extra Route 2</NavLink>
    </>

    return (
        <Container>
            <div className="navbar font-poppins">

                <div className="navbar-start">
                    <div className="dropdown">
                        <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                        </div>
                        <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-40 p-2 shadow bg-base-100 rounded-box w-52">
                            {links}
                        </ul>
                    </div>

                    <div className="hidden lg:flex ">
                        <ul className="menu menu-horizontal px-1 gap-x-2 items-center">
                            {links}
                        </ul>
                    </div>

                </div>

                <div className="navbar-end">
                    <div className="dropdown dropdown-end md:mr-1 lg:mr-3 xl:mr-4">
                        <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                            <div className="w-6 md:w-7 lg:w-8 xl:w-9 rounded-full">
                                <img alt="...Loading" src={userPic} />
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

        </Container>
    );
};

export default MenuItems;