import { Divider, Form, Input, message, Button } from 'antd';
import React, { useState, useRef } from 'react';
import { DownOutlined, PlusOutlined } from '@ant-design/icons';
import { FormComponentProps } from 'antd/es/form';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import ProTable, { ProColumns, ActionType } from '@ant-design/pro-table';
import CreateForm from './components/CreateForm';
import UpdateForm, { FormValueType } from './components/UpdateForm';
import { IPermission } from '@/models/data';
import { queryPermission, updatePermission, addPermission, removePermission } from './service';

interface TableListProps extends FormComponentProps {}

/**
 * 添加节点
 * @param fields
 */
const handleAdd = async (fields: FormValueType) => {
  const hide = message.loading('正在添加');
  try {
    await addPermission({
      name: fields.name,
    });
    hide();
    message.success('添加成功');
    return true;
  } catch (error) {
    hide();
    message.error('添加失败请重试！');
    return false;
  }
};

/**
 * 更新节点
 * @param fields
 */
const handleUpdate = async (fields: FormValueType) => {
  const hide = message.loading('正在配置');
  try {
    await updatePermission({
      name: fields.name,
    });
    hide();

    message.success('配置成功');
    return true;
  } catch (error) {
    hide();
    message.error('配置失败请重试！');
    return false;
  }
};

/**
 *  删除节点
 * @param selectedRows
 */
const handleRemove = async (selectedRows: IPermission[]) => {
  const hide = message.loading('正在删除');
  if (!selectedRows) return true;
  try {
    await removePermission({
      key: selectedRows.map(row => row.key),
    });
    hide();
    message.success('删除成功，即将刷新');
    return true;
  } catch (error) {
    hide();
    message.error('删除失败，请重试');
    return false;
  }
};

const TableList: React.FC<TableListProps> = () => {
  const [createModalVisible, handleModalVisible] = useState<boolean>(false);
  const [updateModalVisible, handleUpdateModalVisible] = useState<boolean>(false);
  const [stepFormValues, setStepFormValues] = useState({});
  const [KeyWord, setKeyWord] = useState();
  const actionRef = useRef<ActionType>();
  const columns: ProColumns<IPermission>[] = [
    {
      title: 'ID',
      dataIndex: 'id',
    },
    {
      title: '名称',
      dataIndex: 'name',
    },
    {
      title: '守护名称',
      dataIndex: 'guard_name',
    },
    {
      title: '创建时间',
      dataIndex: 'created_at',
      sorter: true,
      valueType: 'dateTime',
    },
    {
      title: '操作',
      dataIndex: 'option',
      valueType: 'option',
      render: (_, record) => (
        <>
          <a
            onClick={() => {
              handleUpdateModalVisible(true);
              setStepFormValues(record);
            }}
          >
            配置
          </a>
          <Divider type="vertical" />
          <a href="">删除</a>
        </>
      ),
    },
  ];

  return (
    <PageHeaderWrapper>
      <ProTable<IPermission>
        headerTitle="查询表格"
        actionRef={actionRef}
        rowKey="id"
        toolBarRender={() => [
          <Input.Search placeholder="请输入" onSearch={value => setKeyWord(value)} />,
          <Button
            icon={<PlusOutlined />}
            type="primary"
            onClick={async () => {
              handleModalVisible(true);
            }}
          >
            新建
          </Button>,
        ]}
        request={async params => {
          const {
            data,
            meta: { pagination },
          } = await queryPermission(params);
          return {
            data,
            current: pagination.current_page,
            pageSize: pagination.per_page,
            total: pagination.total,
          };
        }}
        columns={columns}
        rowSelection={{}}
        params={{ KeyWord }}
        pagination={{
          showSizeChanger: true,
        }}
        search={false}
      />
      <CreateForm
        onSubmit={async value => {
          const success = await handleAdd(value);
          if (success) {
            handleModalVisible(false);
            if (actionRef.current) {
              actionRef.current.reload();
            }
          }
        }}
        onCancel={() => handleModalVisible(false)}
        modalVisible={createModalVisible}
      />
      {stepFormValues && Object.keys(stepFormValues).length ? (
        <UpdateForm
          onSubmit={async value => {
            const success = await handleUpdate(value);
            if (success) {
              handleModalVisible(false);
              setStepFormValues({});
              if (actionRef.current) {
                actionRef.current.reload();
              }
            }
          }}
          onCancel={() => {
            handleUpdateModalVisible(false);
            setStepFormValues({});
          }}
          updateModalVisible={updateModalVisible}
          values={stepFormValues}
        />
      ) : null}
    </PageHeaderWrapper>
  );
};

export default Form.create<TableListProps>()(TableList);
