import { PieChart, Pie, Tooltip, Cell, ResponsiveContainer } from 'recharts';
import useAxiosPublic from '../../../../Hooks/useAxiosPublic/useAxiosPublic';
import useAuth from '../../../../Hooks/useAuth/useAuth';
import { useQuery } from '@tanstack/react-query';
import LoadingSpinner from '../../../../LoadingSpinner/LoadingSpinner';
import { toast } from 'react-toastify';
import { useState } from 'react';
import UpdateUser from './UpdateUser';

const MyProfile = () => {

    const [isModalOpen, setIsModalOpen] = useState(false);

    const axiosPublic = useAxiosPublic();
    const { user } = useAuth();

    const userEmail = user.email;

    const { isPending, error, data: userData = [0], refetch } = useQuery({
        queryKey: ['userData', userEmail],
        queryFn: async () => {
            const { data } = await axiosPublic(`/user/${userEmail}`);
            return data;
        }
    })

    if (isPending) return <LoadingSpinner />

    if (error) return toast.error(error.message);

    // console.log(userData.winCount)
    console.log(userData);

    const name = userData?.name;
    const email = userData?.email;
    const photoURL = userData?.photoURL;
    const address = userData?.address;

    const win = userData.winCount;
    const attempt = userData.attemptCount;

    const COLORS = ['#0088FE', '#FF8042', '#FFBB28', '#00C49F'];


    const data = [
        { name: 'Win Count', value: win },
        { name: 'Attempt Count', value: attempt },
    ];

    return (
        <div className='w-full flex justify-center flex-col items-center gap-6 mt-6'>


            <div className='text-center w-full'>
                <h1>Win Percentage</h1>

                <ResponsiveContainer width="100%" height={400}>
                    <PieChart>
                        <Pie
                            data={data}
                            dataKey="value"
                            cx="50%"
                            cy="50%"
                            outerRadius={150}
                            fill="#8884d8"
                            label={({ cx, cy, midAngle, innerRadius, outerRadius, value, index }) => {
                                const RADIAN = Math.PI / 180;
                                const radius = 25 + innerRadius + (outerRadius - innerRadius);
                                const x = cx + radius * Math.cos(-midAngle * RADIAN);
                                const y = cy + radius * Math.sin(-midAngle * RADIAN);

                                return (
                                    <text x={x} y={y} fill="#8884d8" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
                                        {`${data[index].name} (${(value / data.reduce((acc, curr) => acc + curr.value, 0) * 100).toFixed(0)}%)`}
                                    </text>
                                );
                            }}
                        >

                            {data.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}

                        </Pie>
                        <Tooltip />
                    </PieChart>
                </ResponsiveContainer>
            </div>

            <div className="flex flex-col justify-center max-w-2xl p-6 shadow-md rounded-xl sm:px-12 border border-neutral-300 text-gray-100 items-center">
                <img src={userData.photoURL} alt="" className="w-32 h-32 mx-auto rounded-full bg-gray-500 aspect-square" />
                <div className="space-y-4 text-center">
                    <div className="my-2 space-y-1 text-gray-500 ">
                        <h2 className="text-xl font-semibold sm:text-2xl">{userData?.name}</h2>
                        <p className="px-5 text-xs sm:text-base text-gray-500 normal-case text-wrap">{userData?.address}</p>
                        <p className="px-5 text-xs sm:text-base text-gray-500 normal-case">{userData?.email}</p>
                        <p className="px-5 text-xs sm:text-base text-gray-500 capitalize">{userData?.role}</p>
                    </div>
                    <div className="flex justify-center pt-2 space-x-4 align-center">

                        <button onClick={() => setIsModalOpen(true)} className='btn w-full bg-sky-500 text-white hover:bg-sky-400'>Update Profile</button>
                        <UpdateUser setIsModalOpen={setIsModalOpen} isModalOpen={isModalOpen} name={name} email={email} photoURL={photoURL} address={address} refetch={refetch} />
                    </div>
                </div>
            </div>
        </div>

    );
};

export default MyProfile;