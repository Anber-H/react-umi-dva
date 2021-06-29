import React, { useEffect, FC } from 'react';
import { Modal, Button, Form, Input, message } from 'antd';
import { SingleUserType, FormValues } from '../data.d';

interface UserModalProps {
  visible: boolean;
  record: SingleUserType | undefined;
  closeHandler: () => void;
  onFinish: (values: FormValues) => void;
}
const userModal: FC<UserModalProps> = (props) => {
  const [form] = Form.useForm();
  const {visible, record, closeHandler, onFinish} = props;

  // 参数一（是函数）：参数二触发之后执行参数一
  // 参数二：函数触发的执行条件
  // 也就是当visible有变化的时候，执行form.setFieldsValue(record)
  useEffect(() => {
    if (record === undefined){
      form.resetFields();
    } else {
      form.setFieldsValue(record);
    }
  },[visible]);
  const onOk = () => {
    form.submit();
  }
  const onFinishFailed = (errorInfo:any) => {
    message.error(errorInfo.errorFields[0].errors[0]);
  };
  return (
    <div>
      <Modal
        title="Basic Modal"
        visible={visible}
        onOk={onOk}
        onCancel={closeHandler}
        forceRender>
          <Form
            form={form}
            name="basic"
            labelCol={{ span: 4 }}
            wrapperCol={{ span: 16 }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}>
            <Form.Item
              label="Name"
              name="name"
              rules={[{ required: true, message: 'Please input your name!' }]}
            >
              <Input />
            </Form.Item>
            <Form.Item label="Email" name="email">
              <Input />
            </Form.Item>
            <Form.Item label="Create_Time" name="create_time">
              <Input />
            </Form.Item>
            <Form.Item label="Status" name="status">
              <Input />
            </Form.Item>
          </Form>
      </Modal>
    </div>
  )
}
export default userModal;
