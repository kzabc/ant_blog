import { Form } from '@ant-design/compatible';
import '@ant-design/compatible/assets/index.css';
import { Input, Modal, Switch, Select, TreeSelect } from 'antd';

import { FormComponentProps } from '@ant-design/compatible/es/form';
import React from 'react';
import { IMenu, IPermission } from '@/models/data';

const FormItem = Form.Item;

interface CreateFormProps extends FormComponentProps {
  modalVisible: boolean;
  onSubmit: (fieldsValue: {
    name: string;
    stor: number;
    icon: string;
    path: string;
    show: boolean;
    status: boolean;
  }) => void;
  onCancel: () => void;
  permission: IPermission[];
  menu: IMenu[];
}

const CreateForm: React.FC<CreateFormProps> = props => {
  const { modalVisible, form, onSubmit: handleAdd, onCancel, permission, menu } = props;
  const okHandle = () => {
    form.validateFields((err, fieldsValue) => {
      if (err) return;
      form.resetFields();
      handleAdd(fieldsValue);
    });
  };

  // @ts-ignore
  return (
    <Modal
      destroyOnClose
      title="新增菜单"
      visible={modalVisible}
      onOk={okHandle}
      onCancel={() => onCancel()}
    >
      <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="名称">
        {form.getFieldDecorator('name', {
          rules: [{ required: true, message: '请输入名称' }],
        })(<Input placeholder="请输入名称" />)}
      </FormItem>
      <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="父菜单">
        {form.getFieldDecorator('pid', {
          rules: [{ required: true, message: '请选择父菜单' }],
        })(
          <TreeSelect
            treeNodeFilterProp="id"
            treeNodeLabelProp="name"
            style={{ width: '100%' }}
            dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
            placeholder="请选择父菜单"
            treeDefaultExpandAll
            treeData={menu}
          />,
        )}
      </FormItem>
      <FormItem
        labelCol={{ span: 5 }}
        min={1}
        max={100000}
        defaultValue={3}
        wrapperCol={{ span: 15 }}
        label="排序"
      >
        {form.getFieldDecorator('stor', {
          rules: [{ required: true, message: '请输入排序' }],
        })(<Input placeholder="请输入" />)}
      </FormItem>
      <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="图标">
        {form.getFieldDecorator('icon', {
          rules: [{ required: true, message: '请输入图标' }],
        })(<Input placeholder="请输入" />)}
      </FormItem>
      <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="路由">
        {form.getFieldDecorator('path', {
          rules: [{ required: true, message: '请输入路由' }],
        })(<Input placeholder="请输入" />)}
      </FormItem>
      <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="绑定权限">
        {form.getFieldDecorator('permission', {
          rules: [{ required: true, message: '请选择权限' }],
        })(
          <Select mode="multiple" style={{ width: '100%' }} placeholder="请选择权限！">
            {permission.map(value => (
              <Option key={value.id} value={value.id}>
                {value.name}
              </Option>
            ))}
          </Select>,
        )}
      </FormItem>
      <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="显示">
        {form.getFieldDecorator('show', {
          initialValue: true,
          rules: [{ required: true, message: '请输' }],
        })(<Switch checkedChildren="开" unCheckedChildren="关" defaultChecked />)}
      </FormItem>
      <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="禁用">
        {form.getFieldDecorator('status', {
          initialValue: true,
          rules: [{ required: true, message: '请输入名称' }],
        })(<Switch checkedChildren="开" unCheckedChildren="关" defaultChecked />)}
      </FormItem>
    </Modal>
  );
};

export default Form.create<CreateFormProps>()(CreateForm);
