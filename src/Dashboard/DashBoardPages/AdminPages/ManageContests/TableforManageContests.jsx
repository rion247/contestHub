import { useMutation } from "@tanstack/react-query";
import { AiOutlineCheck, AiOutlineClose } from "react-icons/ai";
import Swal from "sweetalert2";
import useAxiosPublic from "../../../../Hooks/useAxiosPublic/useAxiosPublic";
import CommentModal from "./CommentModal";
import { useState } from "react";

const TableforManageContests = ({ item, refetch }) => {

    const axiosPublic = useAxiosPublic();

    const [isModalOpen, SetisModalOpen] = useState(false);

    const showModal = () => {
        SetisModalOpen(true);
    };

    const handleStatusButton = async (id) => {

        const statusUpdate = { contestStatus: 'accepted' };

        Swal.fire({
            title: "Want To Change The Contest Status?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, Update it!"
        }).then(async (result) => {
            if (result.isConfirmed) {
                const res = await axiosPublic.patch(`/admin/contestDataStatus/${id}`, statusUpdate);
                if (res.data.modifiedCount > 0) {
                    Swal.fire({
                        title: "Contest Status Changed!",
                        text: "File has been approved.",
                        icon: "success"
                    });
                }

                refetch();
            }
        });

    }

    const { mutateAsync } = useMutation({
        mutationFn: async (id) => {
            const { data } = await axiosPublic.delete(`/contestsData/${id}`);
            return data;
        },
        onSuccess: () => {
            refetch();
        }
    })

    const handleDeleteButton = async (id) => {

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
                const data = await mutateAsync(id)
                if (data.deletedCount > 0) {
                    Swal.fire({
                        title: "Deleted!",
                        text: "Your file has been deleted.",
                        icon: "success"
                    });
                }
            }
        });

    }


    return (
        <tbody className="capitalize" >

            <tr className="border border-neutral-300">

                <td>{item?.contestName}</td>
                <td className='normal-case'>{item?.prizeMoney}</td>
                <td >
                    <button className={` normal-case ${item?.contestStatus === 'pending' ? 'bg-red-200 hover:bg-red-200 text-red-500' : 'bg-green-200 hover:bg-green-200 text-green-500'} btn   cursor-default`}>
                        {item?.contestStatus}
                    </button>
                </td>

                <td>
                    <button onClick={() => handleDeleteButton(item?._id)} className="btn bg-red-500 hover:bg-red-400 text-white">
                        <AiOutlineClose />
                    </button>

                </td>

                <td>
                    <button onClick={() => handleStatusButton(item?._id)} className="btn bg-green-500 hover:bg-green-400 text-white">
                        <AiOutlineCheck />
                    </button>
                </td>

                <td>
                    <button onClick={showModal} className="btn bg-sky-500 hover:bg-sky-400 text-white">
                        Comments
                    </button>
                    <CommentModal item={item} isModalOpen={isModalOpen} SetisModalOpen={SetisModalOpen} />
                </td>

                {/* <td>
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
                    <BlockAndUnBlockModal user={user} isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} refetch={refetch} />
                </td> */}

            </tr>

        </tbody>
    );
};

export default TableforManageContests;