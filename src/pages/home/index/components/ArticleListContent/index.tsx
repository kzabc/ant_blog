import { Avatar,Icon, Tooltip  } from 'antd';
import React from 'react';
import styles from './index.less';
import Ellipsis from '@/components/Ellipsis';
import {IArticle} from "@/models/data";
interface ArticleListContentProps {
  data: IArticle
}

const IconText: React.FC<{
  type: string;
  text: React.ReactNode;
  tooltip?: string;
}> = ({ type, text, tooltip }) => {
  if (tooltip) {
    return (
      <Tooltip title={tooltip}>
        <span style={{ marginRight: 16 }}>
          <Icon type={type} style={{ marginRight: 4 }} />
          {text}
        </span>
      </Tooltip>
    );
  }

  return (
    <span style={{ marginRight: 16 }}>
      <Icon type={type} style={{ marginRight: 4 }} />
      {text}
    </span>
  );
};
const ArticleListContent: React.FC<ArticleListContentProps> = ({data: { content, created_at_timeago,author,created_at,friendly_views_count,friendly_comments_count,friendly_likes_count },
 }) => (
  <div className={styles.listContent}>
    <div className={styles.description}> <Ellipsis lines={3}>
      {content.combine_markdown}    </Ellipsis></div>
    <div className={styles.extra}>
      <Avatar src={author.avatar} size="small" />
      <a >{author.nickname}</a>
      <em><IconText type="clock-circle-o" text={created_at_timeago} tooltip={created_at} /></em>
      <IconText key="eye" type="star-o" text={friendly_views_count} />
      <IconText key="like" type="like-o" text={friendly_likes_count} />
      <IconText type="message" key="message" text={friendly_comments_count} />
    </div>
  </div>
);

export default ArticleListContent;
