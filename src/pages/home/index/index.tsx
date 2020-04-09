import { Card, Col, List, Row, Tag ,Carousel} from 'antd';
import React, { Component } from 'react';
import { GridContent } from '@ant-design/pro-layout';
import { Dispatch } from 'redux';
import { Link } from 'umi';
import { FormComponentProps } from '@ant-design/compatible/es/form';
import { connect } from 'dva';
import ArticleListContent from './components/ArticleListContent';
import {
  ConnectState,
  ConnectProps,
  Loading,
  TagListAllState,
  HeatListState,
} from '@/models/connect';
import { IArticle } from '@/models/data';
import styles from './style.less';

interface IndexProps extends ConnectProps, FormComponentProps {
  dispatch: Dispatch<any>;
  tagAll: TagListAllState;
  loading: Loading;
  heat: HeatListState;
}
const defaultQueryParams = {
  include: 'author,categorys,content,tags',
};

class Index extends Component<IndexProps> {
  async UNSAFE_componentWillMount() {
    const { dispatch } = this.props;
    await dispatch({
      type: 'heat/fetch',
      payload: defaultQueryParams,
    });
    await dispatch({
      type: 'heat/newfetch',
      payload: defaultQueryParams,
    });
    await dispatch({
      type: 'tagAll/fetch',
    });
  }

  render() {
    const {
      loading,
      tagAll: { list: tag },
      heat: { list: heatList, newList },
    } = this.props;
    const formItemLayout = {
      xl: { span: 8 },
    };

    const topColResponsiveProps = {
      xl: { span: 16 },
    };

    return (
      <GridContent>

        <Row gutter={12}>
          <Col {...topColResponsiveProps}>
            <Carousel
              autoplay={true}
              effect="fade"
            >
              <img src="http://qiniu.kzabc.com/banner1.png"/>
              <img src="http://qiniu.kzabc.com/banner2.png"/>
            </Carousel>
          </Col>
          <Col {...formItemLayout}>
            <Card bodyStyle={{ padding: '0px' }}>
              <div>
                <img alt="example" width="100%" src="http://qiniu.kzabc.com/xiao.png" />
              </div>
              <div style={{ marginTop: '6px' }}>
                <img alt="example" width="100%" src="http://qiniu.kzabc.com/ya.png" />
              </div>
            </Card>
          </Col>
          <Col {...topColResponsiveProps}>
            <Card
              size={'small'}
              loading={loading.global}
              title="最新文章"
              style={{ marginTop: 12 }}
              extra={
                <Link className={styles.listItemMetaTitle} to={`/article/list`}>
                  更多
                </Link>
              }
              bordered={false}
              bodyStyle={{ padding: '8px 32px 32px 32px' }}
            >
              <List<IArticle>
                key="id"
                size="small"
                itemLayout="vertical"
                dataSource={newList}
                renderItem={newItem => (
                  <List.Item
                    key={newItem.id}
                    extra={
                      <div className={styles.listItemExtra}>
                        {newItem.preview && <img src={newItem.preview} width="100%" alt="预览" />}
                      </div>
                    }
                  >
                    <List.Item.Meta
                      title={
                        <Link className={styles.listItemMetaTitle} to={`/article/${newItem.id}`}>
                          {newItem.title}
                        </Link>
                      }
                      description={
                        <span>
                          {newItem.tags.map(tag => (
                            <Tag>{tag.name}</Tag>
                          ))}
                        </span>
                      }
                    />
                    <ArticleListContent data={newItem} />
                  </List.Item>
                )}
              />
            </Card>
          </Col>
          <Col {...formItemLayout}>
            <Card
              size={'small'}
              loading={loading.global}
              title={'特别推荐'}
              bordered={false}
              style={{ marginTop: 12 }}
              bodyStyle={{ padding: '8px 32px 32px 32px' }}
            >
              <List<IArticle>
                key="id"
                size="small"
                itemLayout="vertical"
                dataSource={heatList}
                renderItem={item => (
                  <List.Item key={item.id}>
                    <List.Item.Meta
                      description={
                        <Row gutter={[16, 16]}>
                          <Col span={8}>
                            <img width="100%" height="74px" src={item.preview} />
                          </Col>
                          <Col span={16}>
                            <p>
                              <a className={styles.listItemMetaTitle} href={item.href}>
                                {item.title}
                              </a>
                            </p>
                            <span>{item.created_at_timeago}</span>
                            <span style={{ marginLeft: '10px' }}>
                              浏览 {item.friendly_views_count}
                            </span>
                          </Col>
                        </Row>
                      }
                    />
                  </List.Item>
                )}
              />
            </Card>
            <Card loading={loading.global} style={{ marginTop: 12 }} bodyStyle={{ padding: '0px' }}>
              <div>
                <img
                  alt="example"
                  width="100%"
                  height={'145px'}
                  src="http://qiniu.kzabc.com/brand-aliyun%20%281%29.jpg"
                />
              </div>
            </Card>

            <Card
              size={'small'}
              loading={loading.global}
              style={{ marginTop: 12 }}
              title={'热门标签'}
              bordered={false}
              bodyStyle={{ padding: 24 }}
            >
              {tag.map(tagItem => (
                <Link className={styles.listItemMetaTitle} to={`/article/list?tags=${tagItem.id}`}>
                  <Tag
                    style={{ marginBottom: '8px' }}
                    color={`#${Math.floor(Math.random() * 16777215).toString(16)}`}
                  >
                    {tagItem.name}
                  </Tag>
                </Link>
              ))}
            </Card>
          </Col>
        </Row>
      </GridContent>
    );
  }
}

export default connect(({ tagAll, heat, loading }: ConnectState) => ({
  tagAll,
  heat,
  loading,
}))(Index);
