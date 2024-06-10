import { AiOutlineDelete } from "react-icons/ai";
import { BiSolidEdit } from "react-icons/bi";
import { Link } from "react-router-dom";
import useAxiosPublic from './../../../../Hooks/useAxiosPublic/useAxiosPublic';
import Swal from 'sweetalert2';
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { DatePicker, Form, Input, Modal, Select, message } from "antd";
import { Option } from "antd/es/mentions";
import useAuth from "../../../../Hooks/useAuth/useAuth";
import { toast } from "react-toastify";

const TableforMyCreatedContest = ({ index, item, refetch }) => {

    const axiosPublic = useAxiosPublic();

    const [isModalOpen, setIsModalOpen] = useState(false);

    const [form] = Form.useForm();

    const { user } = useAuth();

    const userEmail = user.email;

    const contestStatus = item?.contestStatus;

    const initialValues = {
        contestName: item?.contestName,
        contestImageURL: item?.contestImageURL,
        contestTypeTags: item?.contestTypeTags,
        contestContestCategory: item?.contestContestCategory,
        contestPrice: item?.contestPrice,
        prizeMoney: item?.prizeMoney,
        contestDescription: item?.contestDescription,
        taskSubmissionTextInstruction: item?.taskSubmissionTextInstruction,
        creatorEmail: item?.creatorEmail,
        creatorName: item?.creatorName,
        // _id: item?._id,
    };

    // console.log(initialValues)

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
        if (contestStatus === 'accepted') {
            return toast('The editing option is disabled for this contest.');
        }
        setIsModalOpen(true);
    };

    const handleOk = () => {

        form
            .validateFields()
            .then(async values => {

                const { contestName, contestTypeTags, contestContestCategory, contestPrice, prizeMoney, contestDescription, taskSubmissionTextInstruction, creatorEmail, contestPostingDate, contestDeadlineDate, contestImageURL } = values;


                if (creatorEmail !== userEmail) {
                    return toast.error('Forbidden Error')
                }

                const contestPriceNumber = parseFloat(contestPrice);
                const prizeMoneyNumber = parseFloat(prizeMoney);

                const updateContestData = {
                    contestName,
                    contestTypeTags,
                    contestContestCategory,
                    contestPrice: contestPriceNumber,
                    prizeMoney: prizeMoneyNumber,
                    contestDescription,
                    taskSubmissionTextInstruction,
                    contestPostingDate,
                    contestDeadlineDate,
                    contestImageURL
                }

                const res = await axiosPublic.patch(`/contestData/${item._id}`, updateContestData);
                setIsModalOpen(false);

                if (res.data.modifiedCount > 0) {
                    return toast.success('Data Updated Successfully!!!')
                }

            })
            .catch(errorInfo => {
                console.error('Validation failed:', errorInfo);
            });

    };

    const onFinish = () => {
        message.success('Submit success!');
    };

    const onFinishFailed = () => {
        message.error('Submit failed!');
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    return (

        <tbody className="capitalize" >

            <tr className="border border-neutral-300">
                <th>{index}</th>
                <td>{item?.contestName}</td>
                <td>{item?.contestStatus}</td>

                <td className="flex justify-center cursor-pointer items-center gap-4 flex-col"><BiSolidEdit onClick={showModal} /> <AiOutlineDelete onClick={() => handleDeleteButton(item._id)} className=" text-red-500" /></td>
                <td ><Link className="text-center bg-sky-500 text-white px-2 py-1 rounded cursor-pointer" to='/dashboard/contestsubmittedpage'>Submission</Link></td>
                <td>
                    {item?.contestComment ? item?.contestComment : 'No Comments'}
                </td>
            </tr>

            <Modal title="Contest Data Edit Form" open={isModalOpen} onOk={handleOk} onCancel={handleCancel} okText="Submit">

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

                    <Form.Item label="Contest Name" name="contestName">
                        <Input defaultValue={initialValues.contestName} />
                    </Form.Item>

                    <Form.Item label="Contest Image" name="contestImageURL">
                        <Input defaultValue={initialValues.contestImageURL} />
                    </Form.Item>

                    <Form.Item
                        name="contestTypeTags"
                        label="Contest Type/Tags"
                    >
                        <Select placeholder={initialValues.contestTypeTags}>
                            <Option value="imageDesignContests">Image Design Contests</Option>
                            <Option value="articleWriting">Article Writing</Option>
                            <Option value="marketingStrategy">Marketing Strategy</Option>
                            <Option value="digitalAdvertisementContests">Digital Advertisement Contests</Option>
                            <Option value="gamingReview">Gaming Review</Option>
                            <Option value="bookReview">Book Review</Option>
                            <Option value="gamingReview">Gaming Review</Option>
                            <Option value="businessIdeaConcerts">Business Idea Concerts</Option>
                            <Option value="movieReview">Movie Review</Option>
                        </Select>
                    </Form.Item>

                    <Form.Item
                        name="contestContestCategory"
                        label="Contest Category"
                    >
                        <Select placeholder={initialValues.contestContestCategory}>
                            <Option value="popular">Popular</Option>
                            <Option value="trending">Trending</Option>
                            <Option value="new">New</Option>
                        </Select>
                    </Form.Item>

                    <Form.Item label="Contest Price" name="contestPrice">
                        <Input type="number" defaultValue={initialValues.contestPrice} />
                    </Form.Item>

                    <Form.Item label="Prize Money or Others" name="prizeMoney">
                        <Input defaultValue={initialValues.prizeMoney} />
                    </Form.Item>

                    <Form.Item label="Contest Description" name="contestDescription">
                        <Input defaultValue={initialValues.contestDescription} />
                    </Form.Item>

                    <Form.Item label="Task Submission Text Instruction" name="taskSubmissionTextInstruction">
                        <Input defaultValue={initialValues.taskSubmissionTextInstruction} />
                    </Form.Item>

                    <Form.Item
                        name="contestPostingDate"
                        label="Contest Posting Date"
                        dateFormat="dd-MM-yyyy"
                        rules={[{ required: true, message: 'Please select the Contest Posting Date' }]}
                    >
                        <DatePicker
                            selected={form.getFieldValue('contestPostingDate')}
                            onChange={date => form.setFieldsValue({ contestPostingDate: date })}
                        />
                    </Form.Item>

                    <Form.Item
                        name="contestDeadlineDate"
                        label="Contest Deadline Date"
                        dateFormat="dd-MM-yyyy"
                        rules={[{ required: true, message: 'Please select the Contest Deadline Date' }]}
                    >
                        <DatePicker
                            selected={form.getFieldValue('contestDeadlineDate')}
                            onChange={date => form.setFieldsValue({ contestDeadlineDate: date })}
                        />
                    </Form.Item>

                    <Form.Item label="Email Address" name="creatorEmail">
                        <Input readOnly defaultValue={initialValues?.creatorEmail} />
                    </Form.Item>

                    <Form.Item label="User Name" name="creatorName">
                        <Input readOnly defaultValue={initialValues.creatorName} />
                    </Form.Item>

                </Form>

            </Modal>

        </tbody >

    );

};

export default TableforMyCreatedContest;