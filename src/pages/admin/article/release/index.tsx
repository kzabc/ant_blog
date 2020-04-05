import { DownOutlined, PlusOutlined } from '@ant-design/icons';
import { Form } from '@ant-design/compatible';
import '@ant-design/compatible/assets/index.css';
import { Button, Divider, Dropdown, Menu, message, Tag, Avatar } from 'antd';
import React, { useRef } from 'react';
import { Link } from 'umi';
import { FormComponentProps } from '@ant-design/compatible/es/form';
import { GridContent } from '@ant-design/pro-layout';
import ProTable, { ProColumns, ActionType } from '@ant-design/pro-table';
import { TableListItem } from './data.d';
import { queryRule,removeRule } from './service';
import styles from "@/components/GlobalHeader/index.less";


interface TableListProps extends FormComponentProps {}


/**
 *  删除节点
 * @param selectedRows
 */
const handleRemove = async (selectedRows: TableListItem[]) => {
  const hide = message.loading('正在删除');
  if (!selectedRows) return true;
  try {
    await removeRule({
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
const operation = record => (
  <Menu onClick={({ key }) => this.operationClick(key, record)}>
    <Menu.Item key="edit">编辑</Menu.Item>
    <Menu.Item key="delete">删除</Menu.Item>
  </Menu>
);
const TableList: React.FC<TableListProps> = () => {

  const actionRef = useRef<ActionType>();
  const columns: ProColumns<TableListItem>[] = [
    {
      title: '标题',
      dataIndex: 'title',
      ellipsis: true,
      width: 200,
    },
    {
      title: '作者',
      dataIndex: 'author',
      render: text => {
        return  <span className={`${styles.action} ${styles.account}`}>
          <Avatar size="small" className={styles.avatar} src={text.avatar} alt="avatar" />
          <span className={styles.name}>{text.name}</span>
        </span>
      },
    },
    {
      title: '分类',
      dataIndex: 'categorys',
      render: text => {
        let i = 0;
        return text.map(value => (
          <Tag key={i++} color="magenta">
            {value.name}
          </Tag>
        ));
      },

    },
    {
      title: '描述',
      ellipsis: true,
      width: 400,
      hideInSearch: true,
      dataIndex: 'meta_description',
    },
    {
      title: '阅读次数',
      dataIndex: 'view_count',
      hideInSearch: true,
      renderText: (val: string) => `${val} 次`,
    },
    {
      title: '发布时间',
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
          <a onclick={() => this.handleUpdateModalVisible(true, record)}>查看</a>
          <Divider type="vertical"/>
          <Dropdown overlay={operation(record)}>
            <a className="ant-dropdown-link" href="#">
              更多
              <DownOutlined />
            </a>
          </Dropdown>
        </>
      ),
    },
  ];
  return (
    <GridContent>
      <ProTable<TableListItem>
        headerTitle="查询表格"
        actionRef={actionRef}
        params={{ include: 'author,categorys' }}
        rowKey="id"
        toolBarRender={(action, { selectedRows }) => [
          <Link to="/admin/article/create">
          <Button icon={<PlusOutlined />} type="primary">
            新建
          </Button>
          </Link>,
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
                批量操作 <DownOutlined />
              </Button>
            </Dropdown>
          ),
        ]}
        tableAlertRender={(selectedRowKeys, selectedRows) => (
          <div>
            已选择 <a style={{ fontWeight: 600 }}>{selectedRowKeys.length}</a> 项&nbsp;&nbsp;
            <span>
              阅读次数总计 {selectedRows.reduce((pre, item) => pre + item.view_count, 0)} 次
            </span>
          </div>
        )}
        request={params => queryRule(params)}
        columns={columns}
        rowSelection={{}}
      />
    </GridContent>
  );
};

export default Form.create<TableListProps>()(TableList);
