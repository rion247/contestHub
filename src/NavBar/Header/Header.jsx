import { useState } from "react";
import Container from "../../components/Shared/Container";
import { useEffect } from "react";
import { MdEmail } from "react-icons/md";

const Header = () => {

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

            <div className="my-6 flex justify-between items-center" >

                <div className=" flex items-center justify-start gap-x-2 md:gap-x-3 lg:gap-x-4 text-base lg:text-lg">
                    <MdEmail className="text-xl lg:text-2xl"/> 

                    {/* need to show the user email */}
                    <h6>noreply@gmail.com</h6>
                </div>

                <div >
                    <label className="flex cursor-pointer gap-2">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="5" /><path d="M12 1v2M12 21v2M4.2 4.2l1.4 1.4M18.4 18.4l1.4 1.4M1 12h2M21 12h2M4.2 19.8l1.4-1.4M18.4 5.6l1.4-1.4" /></svg>
                        <input type="checkbox" onChange={handleThemeButton} checked={isChecked} value="synthwave" className="toggle theme-controller bg-amber-300 border-sky-400 [--tglbg:theme(colors.sky.500)] checked:bg-blue-300 checked:border-blue-800 checked:[--tglbg:theme(colors.blue.900)] row-start-1 col-start-1 col-span-2" />
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>
                    </label>
                </div>

            </div>

        </Container>


    );
};

export default Header;