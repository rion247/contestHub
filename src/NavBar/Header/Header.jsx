import { useState } from "react";
import Container from "../../components/Shared/Container";
import { useEffect } from "react";
import { MdEmail } from "react-icons/md";
import { Link } from "react-router-dom";
import logoPic from '../../../public/logo.png';
import { BiNoEntry } from "react-icons/bi";
import useAuth from "../../Hooks/useAuth/useAuth";

const Header = () => {

    const { user } = useAuth();

    const [isChecked, SetIsChecked] = useState(localStorage.getItem('theme') === 'dark');

    useEffect(() => {
        const theme = isChecked ? 'dark' : 'light';
        document.querySelector('html').setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);
    }, [isChecked])

    const handleThemeButton = () => {
        SetIsChecked(!isChecked)
    }

    return (

        <Container>

            <div className="flex justify-center items-end  md:hidden mt-4">
                <Link to='/' className="flex justify-start items-baseline gap-x-3">

                    <img className="w-8 lg:w-10 xl:w-12" src={logoPic} alt="...Loading" />

                    <h4 className="text-xl lg:text-2xl uppercase font-extrabold text-yellow-500">contest<span className="text-sky-500">hub</span></h4>

                </Link>

            </div>

            <div className="my-6 md:my-8 lg:my-10 mx-4 flex justify-between items-center" >

                <div className="hidden md:flex">
                    <Link to='/' className="flex justify-start items-baseline gap-x-3">

                        <img className="w-6 md:w-8 lg:w-10 xl:w-12" src={logoPic} alt="...Loading" />

                        <h4 className="text-2xl uppercase font-extrabold text-amber-400">contest<span className="text-sky-500">hub</span></h4>

                    </Link>

                </div>


                <div className=" flex items-center justify-between md:justify-end gap-x-6 md:gap-x-4 lg:gap-x-6 xl:gap-x-8">

                    {
                        user ?
                            <div className="text-sm md:text-base flex items-center justify-start gap-x-2 ">
                                <MdEmail className="text-xl" />

                                {/* need to show the user email */}
                                <h6>{user?.email}</h6>
                            </div>
                            :
                            <div className="text-sm md:text-base flex items-center justify-start gap-x-2 ">
                                <BiNoEntry className="text-xl" />

                                {/* need to show the user email */}
                                <h6>User not Logged In</h6>
                            </div>
                    }


                    <div className="scale-75 md:scale-90" >
                        <label className="flex cursor-pointer gap-2">
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="5" /><path d="M12 1v2M12 21v2M4.2 4.2l1.4 1.4M18.4 18.4l1.4 1.4M1 12h2M21 12h2M4.2 19.8l1.4-1.4M18.4 5.6l1.4-1.4" /></svg>
                            <input type="checkbox" onChange={handleThemeButton} checked={isChecked} value="synthwave" className="toggle theme-controller bg-amber-300 border-sky-400 [--tglbg:theme(colors.sky.500)] checked:bg-blue-300 checked:border-blue-800 checked:[--tglbg:theme(colors.blue.900)] row-start-1 col-start-1 col-span-2" />
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>
                        </label>
                    </div>

                </div>



            </div>

        </Container>


    );
};

export default Header;