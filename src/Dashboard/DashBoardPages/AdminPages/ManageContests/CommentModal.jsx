import { Form, Input, Modal, message } from "antd";
import useAxiosPublic from "../../../../Hooks/useAxiosPublic/useAxiosPublic";
import TextArea from "antd/es/input/TextArea";
import { toast } from "react-toastify";

const CommentModal = ({ item, isModalOpen, SetisModalOpen }) => {

    const [form] = Form.useForm();
    const axiosPublic = useAxiosPublic();

    const initialValues = {
        contestName: item?.contestName,
    }

    const handleOk = () => {

        form
            .validateFields()
            .then(async values => {

                const { contestComment } = values;

                const insertComment = { contestComment };

                console.log(insertComment)

                const res = await axiosPublic.put(`/admin/insertComment/${item?._id}`, insertComment);

                SetisModalOpen(false);

                if (res.data.modifiedCount > 0) {
                    return toast('Comment Added!!!');
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
        SetisModalOpen(false);
    };

    return (
        <Modal title="Block or Unblock User Form" open={isModalOpen} onOk={handleOk} onCancel={handleCancel} okText="Post">

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
                    <Input readOnly defaultValue={initialValues.contestName} />
                </Form.Item>

                <Form.Item label="Comment" name="contestComment">
                    <TextArea />
                </Form.Item>

            </Form>

        </Modal>
    );
};

export default CommentModal;