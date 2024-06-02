import { Outlet, useLocation } from "react-router-dom";
import NavBar from "../NavBar/NavBar";

const MainLayOut = () => {

    const location = useLocation();
    const noHeaderFooter = location.pathname.includes('/logInPage') || location.pathname.includes('/registrationPage');

    return (
        <div>

            {
                noHeaderFooter || <NavBar />
            }

            <Outlet />

        </div>
    );
};

export default MainLayOut;