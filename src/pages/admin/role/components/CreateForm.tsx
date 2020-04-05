import { Form } from '@ant-design/compatible';
import '@ant-design/compatible/assets/index.css';
import { Input, Modal, Tree } from 'antd';
import { FormComponentProps } from '@ant-design/compatible/es/form';
import React from 'react';

const FormItem = Form.Item;
const { TreeNode } = Tree;
interface CreateFormProps extends FormComponentProps {
  modalVisible: boolean;
  onSubmit: (fieldsValue: { desc: string }) => void;
  onCancel: () => void;
}

const CreateForm: React.FC<CreateFormProps> = props => {
  const { modalVisible, form, onSubmit: handleAdd, onCancel, menu: treeData } = props;
  const okHandle = () => {
    form.validateFields((err, fieldsValue) => {
      if (err) return;
      form.resetFields();
      handleAdd(fieldsValue);
    });
  };
  const renderTreeNodes = data =>
    data.map(item => {
      if (item.children) {
        return (
          <TreeNode title={item.title} key={item.id} dataRef={item}>
            {renderTreeNodes(item.children)}
          </TreeNode>
        );
      }
      return <TreeNode {...item} title={item.title} key={item.id} />;
    });

  return (
    <Modal
      width={640}
      destroyOnClose
      title="新建角色"
      visible={modalVisible}
      onOk={okHandle}
      onCancel={() => onCancel()}
    >
      <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="角色">
        {form.getFieldDecorator('name', {
          rules: [{ required: true, message: '请输入角色！' }],
        })(<Input placeholder="请输入" />)}
      </FormItem>
      <Form.Item labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="权限">
        {form.getFieldDecorator('menus', {
          rules: [{ required: true, message: '请选择权限 ！' }],
          trigger: 'onCheck',
        })(<Tree checkable>{renderTreeNodes(treeData)}</Tree>)}
      </Form.Item>
    </Modal>
  );
};

export default Form.create<CreateFormProps>()(CreateForm);
