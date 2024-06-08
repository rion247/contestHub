import { useMutation } from '@tanstack/react-query';
import Swal from 'sweetalert2'
import useAxiosPublic from '../../../../../Hooks/useAxiosPublic/useAxiosPublic';
import { LuUserCog } from 'react-icons/lu';
import BlockAndUnBlockModal from './BlockAndUnBlockModal';
import { useState } from 'react';
const TableUserData = ({ user, index, refetch }) => {

    const axiosPublic = useAxiosPublic();
    const [isModalOpen, setIsModalOpen] = useState(false);


    const showModal = () => {

        setIsModalOpen(true);
    };

    const { mutateAsync } = useMutation({
        mutationFn: async (email) => {
            const { data } = await axiosPublic.patch(`/users/updateUsersRole/${email}`, userRole);
            return data
        },
        onSuccess: () => {
            refetch();
        }
    })

    const userRole = {
        role: `${user?.role === 'user' ? 'Contest Creator' : 'user'}`
    }

    const handleUserRole = (email) => {

        Swal.fire({
            title: `Update ${email} role from ${user?.role === 'user' ? 'User' : 'Contest Creator'} to ${user?.role === 'user' ? 'Contest Creator' : 'User'}`,
            text: "You won't be able to revert this!",
            icon: "question",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, update it!"
        }).then(async (result) => {
            if (result.isConfirmed) {
                const data = await mutateAsync(email);
                if (data.modifiedCount > 0) {
                    Swal.fire({
                        title: "Updated!",
                        text: "Your file has been updated.",
                        icon: "success"
                    });
                }
            }
        });
    }

    const handleUserDeleteButton = (id) => {

        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then(async (result) => {
            if (result.isConfirmed) {
                const res = await axiosPublic.delete(`/users/dataDelete/${id}`);
                console.log(res.data)
                if (res.data.deletedCount > 0) {
                    Swal.fire({
                        title: "Deleted!",
                        text: "User Data has been deleted.",
                        icon: "success"
                    });
                }
                refetch();
            }

        });
    }

    return (
        <tbody className="capitalize" >

            <tr className="border border-neutral-300">

                <td>{user?.name}</td>
                <td className='normal-case'>{user?.email}</td>

                <td>
                    <h6>{user?.role === 'user' ? 'user' : 'Contest Creator'}</h6>
                </td>

                <td>
                    <button onClick={() => handleUserRole(user?.email)} className="bg-sky-500 text-white btn">{user?.role === 'user' ? 'Make Contest Creator' : 'Make User'}</button>
                </td>

                <td>
                    <button onClick={() => handleUserDeleteButton(user?._id)} className='btn bg-red-500 text-white'>Delete</button>
                </td>

                <td>
                    <button onClick={showModal}><LuUserCog className='text-2xl text-center' /></button>
                    <BlockAndUnBlockModal user={user} isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} refetch={refetch}/>
                </td>

            </tr>

        </tbody>
    );
};

export default TableUserData;