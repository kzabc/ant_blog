import React, { ReactNode } from 'react';
import { connect } from 'dva';
import { router } from 'umi';
import { Modal } from 'antd';
import { debounce } from 'lodash';
import { stringify } from 'qs';
import request from '@/utils/request';
import { getPageQuery } from '@/utils/utils';
import { UserModelState, ConnectState } from '@/models/connect';

export interface RelationBtnProps {
  auth?: UserModelState;
  relation: string;
  action: string;
  item: any;
  on: ReactNode;
  off: ReactNode;
  onAfterToggle?: (status: boolean) => void;
}

export interface RelationBtnState {
  status: boolean;
}

class RelationBtn extends React.Component<RelationBtnProps, RelationBtnState> {
  static types = {
    article: 'App\\Article',
    comment: 'App\\Comment',
  };

  static actions = {
    like: 'has_liked',
    favorite: 'has_favorited',
    upvote: 'has_up_voted',
    downvote: 'has_down_voted',
  };

  constructor (props: RelationBtnProps) {
    super(props);

    const { item, action } = props;

    this.state = {
      status: item[RelationBtn.actions[action]]
    };
  }

  componentWillReceiveProps (nextProps: Readonly<RelationBtnProps>, nextContext: any): void {
    const { item, action } = nextProps;
    this.setState({ status: item[RelationBtn.actions[action]] });
  }

  toggle = debounce(async () => {
    const { relation, action, item, onAfterToggle, user = { logged: false } } = this.props;
    if (!user.logged) {
      Modal.confirm({
        title: '登录确认?',
        content: '您还没有登录，点击【确定】前去登录。',
        okText: '确定',
        cancelText: '取消',
        onOk () {
          const { redirect } = getPageQuery();
          // redirect
          if (window.location.pathname !== '/user/login' && !redirect) {
            router.replace({
              pathname: '/user/login',
              search: stringify({
                redirect: window.location.href,
              }),
            });
          }
        },
        onCancel () {
        },
      });

      return;
    }

    await request(`relations/${action}`, {
      method: 'POST',
      data: {
        followable_type: RelationBtn.types[relation],
        followable_id: item.id,
      },
    });

    const status = !this.state.status;

    if (onAfterToggle) {
      onAfterToggle(status);
    }

    this.setState({ status });
  }, 600);

  render () {
    return (
      <div onClick={this.toggle} style={{ cursor: 'pointer' }}>
        {this.state.status ? this.props.on : this.props.off}
      </div>
    );
  }
}

export default connect(({ user }: ConnectState) => ({
  user,
}))(RelationBtn);
