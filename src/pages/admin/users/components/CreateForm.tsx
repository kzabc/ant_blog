import { Form } from '@ant-design/compatible';
import '@ant-design/compatible/assets/index.css';
import { Input, Modal, Select } from 'antd';

import { FormComponentProps } from '@ant-design/compatible/es/form';
import React from 'react';

const FormItem = Form.Item;

interface CreateFormProps extends FormComponentProps {
  modalVisible: boolean;
  onSubmit: (fieldsValue: { desc: string }) => void;
  onCancel: () => void;
}

const CreateForm: React.FC<CreateFormProps> = props => {
  const { modalVisible, form, onSubmit: handleAdd, onCancel, roles } = props;
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
      title="新建用户"
      visible={modalVisible}
      onOk={okHandle}
      onCancel={() => onCancel()}
    >
      <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="账户">
        {form.getFieldDecorator('name', {
          rules: [{ required: true, message: '请输入至少五个字符的账户！', min: 5 }],
        })(<Input placeholder="请输入" />)}
      </FormItem>
      <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="邮箱">
        {form.getFieldDecorator('email', {
          rules: [{ required: true, message: '请输入电子邮箱！' }],
        })(<Input placeholder="请输入" />)}
      </FormItem>
      <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="昵称">
        {form.getFieldDecorator('nickname', {
          rules: [{ required: true, message: '请输入昵称！' }],
        })(<Input placeholder="请输入" />)}
      </FormItem>
      <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="密码">
        {form.getFieldDecorator('password', {
          rules: [{ required: true, message: '请输入密码！' }],
        })(<Input.Password placeholder="请输入密码" />)}
      </FormItem>
      <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="角色">
        {form.getFieldDecorator('roles', {
          rules: [{ required: true, message: '请选择角色' }],
        })(
          <Select mode="multiple" style={{ width: '100%' }} placeholder="请选择角色！">
            {roles.map(value => (
              <Option key={value.id} value={value.id}>
                {value.name}
              </Option>
            ))}
          </Select>,
        )}
      </FormItem>
    </Modal>
  );
};

export default Form.create<CreateFormProps>()(CreateForm);
