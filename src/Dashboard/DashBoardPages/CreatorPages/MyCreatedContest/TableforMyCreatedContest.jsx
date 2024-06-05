import { AiOutlineDelete } from "react-icons/ai";
import { BiSolidEdit } from "react-icons/bi";
import { Link } from "react-router-dom";
import useAxiosPublic from './../../../../Hooks/useAxiosPublic/useAxiosPublic';
import Swal from 'sweetalert2';
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { Form, Input, Modal, message } from "antd";
import useAuth from "../../../../Hooks/useAuth/useAuth";

const TableforMyCreatedContest = ({ index, item, refetch }) => {

    const axiosPublic = useAxiosPublic();

    const [isModalOpen, setIsModalOpen] = useState(false);

    const [form] = Form.useForm();

    const { user } = useAuth();


    const userName = user?.displayName;
    const userEmail = user?.email;

   


    const initialValues = {
        username: userName,
        email: userEmail,
    };

    console.log(initialValues.username)

    const { mutateAsync } = useMutation({
        mutationFn: async (id) => {
            const { data } = await axiosPublic.delete(`/contestsData/${id}`);
            return data
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

    const showModal = () => {
        setIsModalOpen(true);
    };

    // const handleApplyButton = (_id) => {
    //     console.log(_id)
    //     showModal();
    // }

    const onFinish = () => {
        message.success('Submit success!');
    };

    const onFinishFailed = () => {
        message.error('Submit failed!');
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    const handleOk = () => {

        form
            .validateFields()
            .then(values => {
                console.log(values)


            })
            .catch(errorInfo => {
                console.error('Validation failed:', errorInfo);
            });

    };



    return (

        <tbody className="capitalize" >

            <tr className="border border-neutral-300">
                <th>{index}</th>
                <td>{item.contestName}</td>
                <td>{item.contestStatus}</td>

                <td className="flex justify-center cursor-pointer items-center gap-4 flex-col"><BiSolidEdit onClick={showModal} /> <AiOutlineDelete onClick={() => handleDeleteButton(item._id)} className=" text-red-500" /></td>
                <td ><Link className="text-center bg-sky-500 text-white px-2 py-1 rounded cursor-pointer" to='/dashboard/contestsubmittedpage'>Submission</Link></td>
            </tr>

            <Modal title="Apply For The Job" open={isModalOpen} onOk={handleOk} onCancel={handleCancel} okText="Submit">

                <Form
                    name="wrap"
                    labelCol={{ flex: '110px' }}
                    labelAlign="left"
                    labelWrap
                    wrapperCol={{ flex: 1 }}
                    colon={false}
                    style={{ maxWidth: 600 }}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    form={form}
                    initialValues={initialValues}
                >
                    <Form.Item label="User Name" name="username" rules={[{ required: true }]}>
                        <Input readOnly defaultValue={initialValues?.username} />                       
                    </Form.Item>

                    <Form.Item label="Email Address" name="email" rules={[{ required: true }]}>
                        <Input readOnly defaultValue={initialValues.email} />
                    </Form.Item>

                    <Form.Item
                        name="url"
                        label="Your Resume URL"
                        rules={[{ required: true, message: 'Please input the URL' }, { type: 'url', warningOnly: true }, { type: 'string', min: 6 }]}
                    >
                        <Input placeholder="Enter Resume Link Here" />
                    </Form.Item>

                </Form>

            </Modal>

        </tbody >

    );

};

export default TableforMyCreatedContest;