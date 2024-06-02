import {
    createBrowserRouter,
  } from "react-router-dom";
import MainLayOut from "../MainLayOut/MainLayOut";
import ErrorPage from "../Pages/ErrorPage/ErrorPage";
import HomePage from "../Pages/HomePage/HomePage";
import AllContests from "../Pages/AllContests/AllContests";
import ExtraRoute1 from "../Pages/ExtraRoute1/ExtraRoute1";
import ExtraRoute2 from "../Pages/ExtraRoute2/ExtraRoute2";
import LogInPage from "../Pages/LogInPage/LogInPage";
import RegistrationPage from "../Pages/RegistrationPage/RegistrationPage";


const router = createBrowserRouter([
    {
        path: "/",
        element: <MainLayOut/>,
        errorElement: <ErrorPage />,
        children: [
            {
                path: "/",
                element: <HomePage />,
            },
            {
                path: "/all-contests",
                element: <AllContests />,
            },
            {
                path: "/extraRoute1",
                element: <ExtraRoute1 />,
            },
            {
                path: "/extraRoute2",
                element: <ExtraRoute2 />,
            },
            {
                path: "/logInPage",
                element: <LogInPage />,
            },
            {
                path: "/registrationPage",
                element: <RegistrationPage />,
            },
        ],
    },
]);




export default router;