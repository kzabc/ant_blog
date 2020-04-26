import React, { Component } from 'react';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { history, connect } from 'umi';

interface ListProps {
  match: {
    url: string;
    path: string;
  };
  location: {
    pathname: string;
  };
}

class List extends Component<ListProps> {
  handleTabChange = (key: string) => {
    const { match } = this.props;
    const url = match.url === '/' ? '' : match.url;
    switch (key) {
      case 'release':
        history.push(`${url}/release`);
        break;
      case 'draft':
        history.push(`${url}/draft`);
        break;
      default:
        break;
    }
  };

  getTabKey = () => {
    const { match, location } = this.props;
    const url = match.path === '/' ? '' : match.path;
    const tabKey = location.pathname.replace(`${url}/`, '');
    if (tabKey && tabKey !== '/') {
      return tabKey;
    }
    return 'articles';
  };

  render() {
    const tabList = [
      {
        key: 'release',
        tab: '已发布',
      },
      {
        key: 'draft',
        tab: '草稿箱',
      },
    ];

    const { children } = this.props;

    return (
      <PageHeaderWrapper
        tabList={tabList}
        tabActiveKey={this.getTabKey()}
        onTabChange={this.handleTabChange}
      >
        {children}
      </PageHeaderWrapper>
    );
  }
}

export default connect()(List);
