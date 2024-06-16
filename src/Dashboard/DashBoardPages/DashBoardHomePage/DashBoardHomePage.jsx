
import LoadingSpinner from './../../../LoadingSpinner/LoadingSpinner';
import useAxiosPublic from './../../../Hooks/useAxiosPublic/useAxiosPublic';
import { useQuery } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { FaDollarSign } from 'react-icons/fa';
// import DashBoardBarChart from './DashBoardBarChart';
import { BarChart, Bar, ResponsiveContainer, CartesianGrid, XAxis, YAxis, Tooltip } from 'recharts';
import useAuth from './../../../Hooks/useAuth/useAuth';
import { useLoaderData } from 'react-router-dom';
import { Helmet } from 'react-helmet';

const DashBoardHomePage = () => {

    const { user } = useAuth();

    const value = useLoaderData();

    const userEmail = user.email;

    const loggedUser = value.filter(data => data.email === userEmail);

    // console.log(loggedUser[0].role)

    const axiosPublic = useAxiosPublic();


    const { isPending, error, data: statsData = [0] } = useQuery({
        queryKey: ['statsData', userEmail],
        queryFn: async () => {
            const { data } = await axiosPublic('/dashboardStats', { params: { email: userEmail } });
            return data;
        }
    })

    if (isPending) return <LoadingSpinner />

    if (error) return toast.error(error.message);

    // console.log(statsData)

    const data = [
        {
            name: 'ImageDesign',
            uv: statsData.totalImageDesignContestsData,
            // pv: 2400,
            // amt: 2400,
        },
        {
            name: 'ArticleWriting',
            uv: statsData.totalArticleWritingData,
            // pv: 1398,
            // amt: 2210,
        },
        {
            name: 'Marketing',
            uv: statsData.totalMarketingStrategyData,
            // pv: 9800,
            // amt: 2290,
        },
        {
            name: 'DigitalAdvertisement',
            uv: statsData.totalDigitalAdvertisementContestsData,
            // pv: 3908,
            // amt: 2000,
        },
        {
            name: 'GamingReview',
            uv: statsData.totalGamingReviewData,
            // pv: 4800,
            // amt: 2181,
        },
        {
            name: 'BookReview',
            uv: statsData.totalBookReviewData,
            // pv: 3800,
            // amt: 2500,
        },
        {
            name: 'BusinessIdea',
            uv: statsData.totalBusinessIdeaConcertsData,
            // pv: 4300,
            // amt: 2100,
        },
        {
            name: 'MovieReview',
            uv: statsData.totalMovieReviewData,
            // pv: 4300,
            // amt: 2100,
        },
    ];


    return (

        <div className="p-6 my-6 text-gray-100 overflow-auto flex justify-between flex-col h-full">
            <Helmet>
                <title>ContestHUB | Dashboard Home </title>
            </Helmet>
            <div className="container grid grid-cols-1 gap-6 mx-auto sm:grid-cols-2 xl:grid-cols-4">
                <div className="flex p-4 space-x-4 rounded-lg md:space-x-6 bg-sky-500 text-gray-100 ">
                    <div className="flex justify-center p-2 align-middle rounded-lg sm:p-4 bg-sky-500">
                        <p className="text-3xl font-semibold leading-none">Contest:</p>
                    </div>
                    <div className="flex flex-col justify-center align-middle">
                        <p className="text-3xl font-semibold leading-none">{statsData.totalContestData}</p>

                    </div>
                </div>
                <div className="flex p-4 space-x-4 rounded-lg md:space-x-6 bg-sky-500 text-gray-100">
                    <div className="flex justify-center p-2 align-middle rounded-lg sm:p-4 bg-sky-500">
                        <p className="text-3xl font-semibold leading-none">Creator:</p>
                    </div>
                    <div className="flex flex-col justify-center align-middle">
                        <p className="text-3xl font-semibold leading-none">{statsData.totalContestCreators}</p>

                    </div>
                </div>
                <div className="flex p-4 space-x-4 rounded-lg md:space-x-6 bg-sky-500 text-gray-100">
                    <div className="flex justify-center p-2 align-middle rounded-lg sm:p-4 bg-sky-500">
                        <p className="text-3xl font-semibold leading-none">User:</p>
                    </div>
                    <div className="flex flex-col justify-center align-middle">
                        <p className="text-3xl font-semibold leading-none">{statsData.totalUser}</p>

                    </div>
                </div>
                <div className="flex p-4 space-x-4 rounded-lg md:space-x-6 bg-sky-500 text-gray-100">
                    <div className="flex justify-center p-2 align-middle rounded-lg sm:p-4 bg-sky-500">
                        <p className="text-3xl font-semibold leading-none">Revenue:</p>
                    </div>
                    <div className="flex flex-col justify-center align-middle">
                        <p className="text-3xl font-semibold leading-none flex"><FaDollarSign />{
                            loggedUser[0].role === 'admin' ? statsData.adminRevenue : statsData.userRevenue

                        }</p>

                    </div>
                </div>
            </div>

            <div style={{ width: '100%', height: 400 }}>
                <ResponsiveContainer>
                    <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Bar dataKey="uv" fill="#8884d8" />
                    </BarChart>
                </ResponsiveContainer>
            </div>

        </div>

    );
};

export default DashBoardHomePage;


// const totalPrizeMoney = contests
//         .filter(contest => contest.winnerEmail === userEmail)
//         .reduce((sum, contest) => sum + contest.prizeMoney, 0);