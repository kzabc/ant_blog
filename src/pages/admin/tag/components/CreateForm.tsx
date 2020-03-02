import { Form } from '@ant-design/compatible';
import '@ant-design/compatible/assets/index.css';
import { Input, Modal } from 'antd';

import { FormComponentProps } from '@ant-design/compatible/es/form';
import React from 'react';

const FormItem = Form.Item;

interface CreateFormProps extends FormComponentProps {
  modalVisible: boolean;
  onSubmit: (fieldsValue: { desc: string }) => void;
  onCancel: () => void;
}

const CreateForm: React.FC<CreateFormProps> = props => {
  const { modalVisible, form, onSubmit: handleAdd, onCancel} = props;
  const okHandle = () => {
    form.validateFields((err, fieldsValue) => {
      if (err) return;
      form.resetFields();
      handleAdd(fieldsValue);
    });
  };
  return (
    <Modal
      destroyOnClose
      title="新建标签"
      visible={modalVisible}
      onOk={okHandle}
      onCancel={() => onCancel()}
    >
      <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="标签名字">
        {form.getFieldDecorator('name', {
          rules: [{ required: true, message: '请输入标签名字！', }],
        })(<Input placeholder="请输入" />)}
      </FormItem>
      <FormItem  labelCol={{ span: 5 }} wrapperCol={{ span: 15 }}  label="slug" >
        {form.getFieldDecorator('slug')(<Input placeholder="请输入" />)}
      </FormItem>
      <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="排序">
        {form.getFieldDecorator('order', {
          rules: [{ required: true, message: '请输入排序！', }],
        })(<Input placeholder="请输入" />)}
      </FormItem>
    </Modal>
  );
};

export default Form.create<CreateFormProps>()(CreateForm);
