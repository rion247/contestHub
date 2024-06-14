import { Form, Input, Modal, message } from "antd";
import useAxiosPublic from './../../../../Hooks/useAxiosPublic/useAxiosPublic';
import { toast } from "react-toastify";

const UpdateUser = ({ setIsModalOpen, isModalOpen, name, email, photoURL, address, refetch }) => {

    const [form] = Form.useForm();

    const axiosPublic = useAxiosPublic();

    const initialValues = {
        name,
        email,
        photoURL,
        address,
    };

    const handleOk = () => {

        form
            .validateFields()
            .then(async values => {

                const { name, email, photoURL, address } = values;

                const updateUserData = {
                    name,
                    email,
                    photoURL,
                    address
                }

                console.log(updateUserData)

                const res = await axiosPublic.put(`/users/updateUsersInfo/${email}`, updateUserData);

                if (res.data.modifiedCount > 0) {
                    refetch();
                    setIsModalOpen(false);
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

                <Form.Item label="Your Name" name="name">
                    <Input defaultValue={initialValues.name} />
                </Form.Item>

                <Form.Item label="Your Image" name="photoURL">
                    <Input defaultValue={initialValues.photoURL} />
                </Form.Item>

                <Form.Item label="Your Address" name="address">
                    <Input defaultValue={initialValues?.address} />
                </Form.Item>

                <Form.Item label="Your Email" name="email">
                    <Input readOnly defaultValue={initialValues.email} />
                </Form.Item>

            </Form>

        </Modal>
    );
};

export default UpdateUser;