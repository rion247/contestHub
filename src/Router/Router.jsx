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
import PrivateRoute from './../PrivateRoute/PrivateRoute';
import AdminRoute from './../AdminRoute/AdminRoute';
import CreatorRoute from "../CreatorRoute/CreatorRoute";
import UserRoute from "../UserRoute/UserRoute";


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
                element: <PrivateRoute><PopularContestDetailsPage /></PrivateRoute>,
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
        element: <PrivateRoute><DashboardLayOut /></PrivateRoute>,
        children: [
            {
                index: true,
                element: <PrivateRoute><DashBoardHomePage /></PrivateRoute>,
                // loader: ()=>fetch('http://localhost:5000/users')
                loader: () => fetch('https://contest-hub-server-side-ivory.vercel.app/users')
            },
            {
                path: "/dashboard/myparticipatedcontest",
                element: <UserRoute><PrivateRoute><MyParticipatedContest /></PrivateRoute></UserRoute>,
            },
            {
                path: "/dashboard/mywinningcontestpage",
                element: <UserRoute><PrivateRoute><MyWinningContestPage /></PrivateRoute></UserRoute>,
            },
            {
                path: "/dashboard/myprofile",
                element: <UserRoute><PrivateRoute><MyProfile /></PrivateRoute></UserRoute>,
            },
            {
                path: "/dashboard/addcontest",
                element: <CreatorRoute><PrivateRoute><AddContest /></PrivateRoute></CreatorRoute>,
            },
            {
                path: "/dashboard/mycreatedcontest",
                element: <CreatorRoute><PrivateRoute><MyCreatedContest /></PrivateRoute></CreatorRoute>,
            },
            {
                path: "/dashboard/contestsubmittedpage",
                element: <CreatorRoute><PrivateRoute><ContestSubmittedPage /></PrivateRoute></CreatorRoute>,
            },
            {
                path: "/dashboard/contestsubmittedpage/:id",
                element: <CreatorRoute><PrivateRoute><SubmittedContestDetailsPage /></PrivateRoute></CreatorRoute>,
                // loader: ({params}) => fetch(`http://localhost:5000/getParticipantCollectionSubmittedData/${params.id}`)
                loader: ({ params }) => fetch(`https://contest-hub-server-side-ivory.vercel.app/getParticipantCollectionSubmittedData/${params.id}`)
            },
            {
                path: "/dashboard/manageuser",
                element: <AdminRoute><PrivateRoute><ManageUser /></PrivateRoute></AdminRoute>,
            },
            {
                path: "/dashboard/managecontests",
                element: <AdminRoute><PrivateRoute><ManageContests /></PrivateRoute></AdminRoute>,
            },

        ],
    },
]);




export default router;