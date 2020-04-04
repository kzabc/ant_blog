import { Button, Divider, Dropdown, Form, Icon, Menu, message, Input } from 'antd';
import React, { useState, useRef } from 'react';
import { FormComponentProps } from 'antd/es/form';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import ProTable, { ProColumns, ActionType } from '@ant-design/pro-table';
import CreateForm from './components/CreateForm';
import UpdateForm, { FormValueType } from './components/UpdateForm';
import { IRole } from '@/models/data';
import { queryRole, updateRole, addRole, removeRole } from './service';
import { queryMenu } from '@/pages/admin/menu/service';
import { queryPermission } from '@/pages/admin/permission/service';

interface TableListProps extends FormComponentProps {}

/**
 * 添加节点
 * @param fields
 */
const handleAdd = async (fields: FormValueType) => {
  const hide = message.loading('正在添加');
  try {
    await addRole({
      ...fields,
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
    await updateRole({
      name: fields.name,
      desc: fields.desc,
      key: fields.key,
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
const handleRemove = async (selectedRows: IRole[]) => {
  const hide = message.loading('正在删除');
  if (!selectedRows) return true;
  try {
    await removeRole({
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
  const [MenusState, setMenusState] = useState([]);
  const actionRef = useRef<ActionType>();
  const columns: ProColumns<IRole>[] = [
    {
      title: 'ID',
      dataIndex: 'id',
    },
    {
      title: '角色',
      dataIndex: 'name',
    },
    {
      title: '守卫',
      dataIndex: 'guard_name',
    },
    {
      title: '更新时间',
      dataIndex: 'updated_at',
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
            编辑
          </a>
          <Divider type="vertical" />
          <a href="">删除</a>
        </>
      ),
    },
  ];

  return (
    <PageHeaderWrapper>
      <ProTable<IRole>
        headerTitle="查询表格"
        actionRef={actionRef}
        rowKey="id"
        toolBarRender={(action, { selectedRows }) => [
          <Input.Search placeholder="请输入" onSearch={value => setKeyWord(value)} />,
          <Button
            icon="plus"
            type="primary"
            onClick={async () => {
              const { data } = await queryMenu({ include: 'children' });
              setMenusState(data);
              handleModalVisible(true);
            }}
          >
            新建
          </Button>,

          selectedRows && selectedRows.length > 0 && (
            <Dropdown
              overlay={
                <Menu
                  onClick={async e => {
                    if (e.key === 'remove') {
                      await handleRemove(selectedRows);
                      action.reload();
                    }
                  }}
                  selectedKeys={[]}
                >
                  <Menu.Item key="remove">批量删除</Menu.Item>
                </Menu>
              }
            >
              <Button>
                批量操作 <Icon type="down" />
              </Button>
            </Dropdown>
          ),
        ]}
        request={async params => {
          const {
            data,
            meta: { pagination },
          } = await queryRole(params);
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
        search={false}
      />
      <CreateForm
        onSubmit={async value => {
          console.log(value);
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
        menu={MenusState}
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
