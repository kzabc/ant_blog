import React from 'react';
import { Form } from '@ant-design/compatible';
import '@ant-design/compatible/assets/index.css';
import { Input, Modal, Select } from 'antd';
import { FormComponentProps } from '@ant-design/compatible/es/form';
import { IUser } from '@/models/data';

const FormItem = Form.Item;

const formItemLayout = {
  labelCol: {
    span: 6,
  },
  wrapperCol: {
    span: 15,
  },
};

interface UpdateFormProps extends FormComponentProps {
  updateModalVisible: boolean;
  onSubmit: (id: number, values: Partial<IUser>) => Promise<void>;
  onCancel: () => void;
  loading: boolean;
  values: IUser;
}

const UpdateForm: React.FC<UpdateFormProps> = props => {
  const { updateModalVisible, form, onSubmit, onCancel, loading, values: user, roles } = props;
  const result = [];
  user.roles.map(value => result.push(value.id));
  const { getFieldDecorator } = form;
  const okHandle = () => {
    form.validateFields(async (err, values) => {
      if (err) return;
      await onSubmit(user.id as number, values);
      form.resetFields();
    });
  };

  return (
    <Modal
      destroyOnClose
      title="编辑标签"
      visible={updateModalVisible}
      onOk={okHandle}
      onCancel={() => onCancel()}
    >
      <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="账户">
        {form.getFieldDecorator('name', {
          initialValue: user.name,
          rules: [{ required: true, message: '请输入至少五个字符的账户！', min: 5 }],
        })(<Input placeholder="请输入" />)}
      </FormItem>
      <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="邮箱">
        {form.getFieldDecorator('email', {
          initialValue: user.email,
          rules: [{ required: true, message: '请输入电子邮箱！' }],
        })(<Input placeholder="请输入" />)}
      </FormItem>
      <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="昵称">
        {form.getFieldDecorator('nickname', {
          initialValue: user.nickname,
          rules: [{ required: true, message: '请输入昵称！' }],
        })(<Input placeholder="请输入" />)}
      </FormItem>
      <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="密码">
        {form.getFieldDecorator('password', {})(<Input.Password placeholder="请输入密码" />)}
      </FormItem>
      <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="角色">
        {form.getFieldDecorator('roles', {
          initialValue: result,
          rules: [{ required: true, message: '请选择角色' }],
        })(
          <Select mode="multiple" style={{ width: '100%' }} placeholder="请选择角色！">
            {roles.map((value: { id: any; name: any }) => (
              // eslint-disable-next-line react/jsx-no-undef
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

export default Form.create<UpdateFormProps>()(UpdateForm);
