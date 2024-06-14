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
import DashboardLayOut from "../Dashboard/DashboardLayOut/DashboardLayOut";
import DashBoardHomePage from "../Dashboard/DashBoardPages/DashBoardHomePage/DashBoardHomePage";
import MyParticipatedContest from "../Dashboard/DashBoardPages/UserPages/MyParticipatedContest/MyParticipatedContest";
import MyWinningContestPage from "../Dashboard/DashBoardPages/UserPages/MyWinningContestPage/MyWinningContestPage";
import MyProfile from "../Dashboard/DashBoardPages/UserPages/MyProfile/MyProfile";
import AddContest from "../Dashboard/DashBoardPages/CreatorPages/AddContest/AddContest";
import MyCreatedContest from "../Dashboard/DashBoardPages/CreatorPages/MyCreatedContest/MyCreatedContest";
import ContestSubmittedPage from "../Dashboard/DashBoardPages/CreatorPages/ContestSubmittedPage/ContestSubmittedPage";
import ManageUser from "../Dashboard/DashBoardPages/AdminPages/ManageUser/ManageUser";
import ManageContests from "../Dashboard/DashBoardPages/AdminPages/ManageContests/ManageContests";
import PopularContestDetailsPage from "../Pages/HomePage/PopularContestSection/PopularContestDetailsPage";
import PaymentPage from "../Pages/PaymentPage/PaymentPage";
import SubmittedContestDetailsPage from "../Dashboard/DashBoardPages/CreatorPages/ContestSubmittedPage/SubmittedContestDetailsPage";


const router = createBrowserRouter([
    {
        path: "/",
        element: <MainLayOut />,
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
            {
                path: "/contestDetails/:id",
                element: <PopularContestDetailsPage />,
            },
            {
                path: "/payment/:_id",
                element: <PaymentPage />,
                // loader: ({params})=>fetch(`http://localhost:5000/singleContestData/${params._id}`)
                loader: ({ params }) => fetch(`https://contest-hub-server-side-ivory.vercel.app/singleContestData/${params._id}`)
            },
        ],
    },

    {
        path: "/dashboard",
        element: <DashboardLayOut />,
        children: [
            {
                index: true,
                element: <DashBoardHomePage />,
                // loader: ()=>fetch('http://localhost:5000/users')
                loader: () => fetch('https://contest-hub-server-side-ivory.vercel.app/users')
            },
            {
                path: "/dashboard/myparticipatedcontest",
                element: <MyParticipatedContest />,
            },
            {
                path: "/dashboard/mywinningcontestpage",
                element: <MyWinningContestPage />,
            },
            {
                path: "/dashboard/myprofile",
                element: <MyProfile />,
            },
            {
                path: "/dashboard/addcontest",
                element: <AddContest />,
            },
            {
                path: "/dashboard/mycreatedcontest",
                element: <MyCreatedContest />,
            },
            {
                path: "/dashboard/contestsubmittedpage",
                element: <ContestSubmittedPage />,
            },
            {
                path: "/dashboard/contestsubmittedpage/:id",
                element: <SubmittedContestDetailsPage />,
                // loader: ({params}) => fetch(`http://localhost:5000/getParticipantCollectionSubmittedData/${params.id}`)
                loader: ({ params }) => fetch(`https://contest-hub-server-side-ivory.vercel.app/getParticipantCollectionSubmittedData/${params.id}`)
            },
            {
                path: "/dashboard/manageuser",
                element: <ManageUser />,
            },
            {
                path: "/dashboard/managecontests",
                element: <ManageContests />,
            },

        ],
    },
]);




export default router;