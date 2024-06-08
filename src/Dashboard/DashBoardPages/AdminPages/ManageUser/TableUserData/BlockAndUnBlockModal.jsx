import { Option } from "antd/es/mentions";
import { Form, Input, Modal, Select, message } from "antd";
import useAxiosPublic from './../../../../../Hooks/useAxiosPublic/useAxiosPublic';
import { toast } from "react-toastify";

const BlockAndUnBlockModal = ({ isModalOpen, user, setIsModalOpen, refetch }) => {

    const [form] = Form.useForm();
    const axiosPublic = useAxiosPublic();

    const initialValues = {
        name: user?.name,
        email: user?.email,
        condition: user?.condition,
    }

    const handleOk = () => {

        form
            .validateFields()
            .then(async values => {

                console.log(values)

                const { email, condition } = values;

                const updateUsersCondition = { condition }

                const res = await axiosPublic.patch(`/users/updateUsersCondition/${email}`, updateUsersCondition);

                setIsModalOpen(false);

                if (res.data.modifiedCount > 0) {
                    refetch();
                    return toast.warning('User Condition Successfully Changed!!!')
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

        <Modal title="Block or Unblock User Form" open={isModalOpen} onOk={handleOk} onCancel={handleCancel} okText="Apply">

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
                <Form.Item label="User Name" name="name">
                    <Input readOnly defaultValue={initialValues.name} />
                </Form.Item>

                <Form.Item label="Email Address" name="email">
                    <Input readOnly defaultValue={initialValues.email} />
                </Form.Item>

                <Form.Item
                    name="condition"
                    label="User Condition"
                >
                    <Select className="capitalize" defaultValue={initialValues.condition}>
                        {
                            initialValues.condition === 'block' ? <Option value="unblock">Unblock User</Option>
                                : <Option value="block">Block User</Option>
                        }

                    </Select>
                </Form.Item>

            </Form>

        </Modal>

    );
};

export default BlockAndUnBlockModal;