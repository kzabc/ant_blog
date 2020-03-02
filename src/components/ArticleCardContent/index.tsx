import { Avatar } from 'antd';
import React from 'react';
import moment from 'moment';
import styles from './index.less';

interface ArticleCardContentProps {
  data: {
    updatedAt: number;
    avatar: string;
    owner: string;
    href: string;
  };
}

const ArticleCardContent: React.FC<ArticleCardContentProps> = ({
  data: {updatedAt, avatar, owner, href },
}) => (
  <div className={styles.listContent}>
    <div className={styles.extra}>
      <Avatar src={avatar} size="small" />
      <a href={href}>{owner}</a> 发布在 <a href={href}>{href}</a>
      <em>{moment(updatedAt).format('YYYY-MM-DD HH:mm')}</em>
    </div>
  </div>
);

export default ArticleCardContent;
