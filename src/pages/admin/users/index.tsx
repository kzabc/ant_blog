import { Form } from '@ant-design/compatible';
import '@ant-design/compatible/assets/index.css';
import { Button, Divider, Dropdown, Menu, message, Avatar, Tag } from 'antd';
import React, { useState, useRef } from 'react';
import { FormComponentProps } from '@ant-design/compatible/es/form';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import ProTable, { ProColumns, ActionType } from '@ant-design/pro-table';
import CreateForm from './components/CreateForm';
import UpdateForm, { FormValueType } from './components/UpdateForm';
import { IUser } from '@/models/data';
import { queryUsers, updateUsers, addUsers, removeUsers, removeUser, getRolesAll } from './service';
import styles from '@/components/GlobalHeader/index.less';
import { DownOutlined, PlusOutlined } from '@ant-design/icons';
interface TableListProps extends FormComponentProps {}

/**
 * 添加节点
 * @param fields
 */
const handleAdd = async (fields: FormValueType) => {
  const hide = message.loading('正在添加');
  try {
    await addUsers({
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
const handleUpdate = async (id: number, fields: FormValueType) => {
  const hide = message.loading('正在配置');

  try {
    // @ts-ignore
    await updateUsers(id, {
      ...fields,
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
const handleSelectedRemove = async (selectedRows: IUser[]) => {
  const hide = message.loading('正在删除');
  if (!selectedRows) return true;
  try {
    await removeUsers({
      key: selectedRows.map(row => row.id),
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
const handleRemove = async (id: number) => {
  const hide = message.loading('正在删除');
  if (!id) return true;
  try {
    await removeUser(id);
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
  const [RoleState, setRoleState] = useState([]);
  const actionRef = useRef<ActionType>();
  const columns: ProColumns<IUser>[] = [
    {
      title: '头像',
      dataIndex: 'avatar',
      hideInSearch: true,
      render: text => {
        return <Avatar size="small" className={styles.avatar} src={text} alt="avatar" />;
      },
    },
    {
      title: '昵称',
      dataIndex: 'nickname',
    },
    {
      title: '账户',
      dataIndex: 'name',
    },
    {
      title: '邮箱',
      dataIndex: 'email',
    },
    {
      title: '角色',
      dataIndex: 'roles',
      valueEnum: {},
      render: text => {
        let i = 0;
        return text.map(value => <Tag key={i++}>{value.name}</Tag>);
      },
    },
    {
      title: '登录次数',
      hideInSearch: true,
      dataIndex: 'login_count',
      sorter: true,
      renderText: (val: string) => `${val} 次`,
    },
    // {
    //   title: '状态',
    //   dataIndex: 'status',
    //   valueEnum: {
    //     1: { text: '正常', status: 'Success' },
    //     2: { text: '拉黑', status: 'error' },
    //   },
    // },
    {
      title: '创建时间',
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
            onClick={async () => {
              handleUpdateModalVisible(true);
              setStepFormValues(record);
              const { data } = await getRolesAll();
              setRoleState(data);
            }}
          >
            编辑
          </a>
          <Divider type="vertical" />
          <a
            onClick={() => {
              handleRemove(record.id);
            }}
          >
            删除
          </a>
        </>
      ),
    },
  ];

  return (
    <PageHeaderWrapper>
      <ProTable<IUser>
        headerTitle="查询表格"
        actionRef={actionRef}
        rowKey="id"
        toolBarRender={(action, { selectedRows }) => [
          <Button
            icon={<PlusOutlined />}
            type="primary"
            onClick={async () => {
              handleModalVisible(true);
              const { data } = await getRolesAll();
              setRoleState(data);
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
                      await handleSelectedRemove(selectedRows);
                      action.reload();
                    }
                  }}
                  selectedKeys={[]}
                >
                  <Menu.Item key="remove">批量删除</Menu.Item>
                  <Menu.Item key="approval">批量审批</Menu.Item>
                </Menu>
              }
            >
              <Button>
                批量操作 <DownOutlined />
              </Button>
            </Dropdown>
          ),
        ]}
        request={async params => {
          const {
            data,
            meta: { pagination },
          } = await queryUsers(params);
          return {
            data,
            current: pagination.current_page,
            pageSize: pagination.per_page,
            total: pagination.total,
          };
        }}
        columns={columns}
        rowSelection={{}}
      />
      <CreateForm
        roles={RoleState}
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
          roles={RoleState}
          onSubmit={async (id, value) => {
            const success = await handleUpdate(id, value);
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
