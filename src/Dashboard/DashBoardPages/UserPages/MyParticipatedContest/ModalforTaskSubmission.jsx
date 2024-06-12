import { Form, Input, Modal, message } from "antd";
import useAxiosPublic from './../../../../Hooks/useAxiosPublic/useAxiosPublic';
import { toast } from "react-toastify";
import useAuth from "../../../../Hooks/useAuth/useAuth";

const ModalforTaskSubmission = ({ isModalOpen, setIsModalOpen, data, refetch }) => {

    const [form] = Form.useForm();

    const axiosPublic = useAxiosPublic();

    const { user } = useAuth();

    const userEmail = user.email;

    console.log(data);

    const email = data.participantEmail;
    // ----------------------------------------------------------------------------------------------------------
    // const { mutateAsync } = useMutation({
    //     mutationFn: async (task) => {
    //         console.log(email, task)
    //         const { data } = await axiosPublic.put(`/participantsDataTaskSubmission/${email}`, task);
    //         return data
    //     },
    //     onSuccess: async () => {

    //         // refetch();
    //     }
    // })

    const initialValues = {
        contestName: data?.contestName,
        _id: data?._id,
        contestId: data?.contestId,
    }

    const handleOk = () => {

        form
            .validateFields()
            .then(async values => {

                const { contestName, _id, contestId } = initialValues;

                // console.log(values);

                const id = initialValues._id;
                // console.log(id);

                const submittedTask = {
                    ...initialValues,
                    submittedTaskLink: values.taskLink,
                }
                // console.log(userEmail)
                // console.log(submittedTask)

                const response = await axiosPublic.put(`/participantsDataTaskSubmission/${email}`, submittedTask);

                if (response.data.modifiedCount > 0) {
                    // console.log(id)
                    const res = await axiosPublic.put(`/increaseParticipantCount/${contestId}`)
                    // console.log(res.data)
                    if (res.data.modifiedCount > 0) {
                        const countData = await axiosPublic.put(`/increaseAttemptCount/${userEmail}`)
                        // console.log(countData.data);
                        if (countData.data.modifiedCount > 0) {
                            setIsModalOpen(false);
                            return toast.success('Your application has been successfully processed.')
                        }
                    }
                }else{
                    setIsModalOpen(false);
                    return toast.error('Problem Error');
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
        <Modal title="Submit Task Form" open={isModalOpen} onOk={handleOk} onCancel={handleCancel} okText="Submit">

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

                <Form.Item label="Contest ID" name="_id" hidden>
                    <Input readOnly defaultValue={initialValues._id} />
                </Form.Item>

                <Form.Item label="Contest Name" name="contestName">
                    <Input readOnly defaultValue={initialValues.contestName} />
                </Form.Item>

                <Form.Item label="Your Task URL" name="taskLink">
                    <Input type="url" placeholder="Enter URL" />
                </Form.Item>

            </Form>

        </Modal>
    );
};

export default ModalforTaskSubmission;