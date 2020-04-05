import React from 'react';
import { Form } from '@ant-design/compatible';
import '@ant-design/compatible/assets/index.css';
import { Input, Modal } from 'antd';
import { FormComponentProps } from '@ant-design/compatible/es/form';
import {ICategory} from '@/models/data';

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
  onSubmit: (id: number, values: Partial<ICategory>) => Promise<void>;
  onCancel: () => void;
  loading: boolean;
  values: ICategory;
}

const UpdateForm: React.FC<UpdateFormProps> = props => {
  const {
    updateModalVisible,
    form,
    onSubmit,
    onCancel,
    loading,
    values:category,
  } = props;

  const { getFieldDecorator } = form;
  const okHandle = () => {
    form.validateFields(async (err, values) => {
      if (err) return;
      await onSubmit(category.id as number, values);
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
      <FormItem {...formItemLayout} label="分类名称" hasFeedback>
        {getFieldDecorator('name', {
          initialValue: category.name,
          rules: [{ required: true, message: '请填写分类名称' }],
        })(<Input placeholder="请输入分类名称" disabled={loading} />)}
      </FormItem>

    </Modal>
  );
};

export default Form.create<UpdateFormProps>()(UpdateForm);
