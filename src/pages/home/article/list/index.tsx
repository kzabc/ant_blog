import { Card, Col, Form, Icon, List, Row, Tag ,Menu, Layout ,Tooltip} from 'antd';
import React, { Component } from 'react'
import { Link, router } from 'umi';
import { GridContent} from '@ant-design/pro-layout';
import { Dispatch } from 'redux';
import { FormComponentProps } from 'antd/es/form';
import { connect } from 'dva';
import ArticleListContent from './components/ArticleListContent';
import { ConnectState, ConnectProps, Loading, ArticleListModelState,CategoryListAllState,TagListAllState ,HeatListState} from '@/models/connect';
import { IArticle } from '@/models/data';
import styles from './style.less'
import { parse, stringify } from 'qs';
import TagSelect from './components/TagSelect';

const { Content } = Layout;
const FormItem = Form.Item;
interface ArticleListProps extends ConnectProps,FormComponentProps {
  dispatch: Dispatch<any>;
  loading: Loading;
  homeAndarticle: ArticleListModelState;
  categoryAll: CategoryListAllState;
  tagAll:TagListAllState;
  heat:HeatListState;
}
const defaultQueryParams = {
  include: 'author,categorys,content,tags',
};

class Article extends Component<ArticleListProps,ArticleListModelState> {

  async UNSAFE_componentWillMount(){

    const { dispatch } = this.props;
    await  dispatch({
      type: 'categoryAll/fetch',

    });
    await  dispatch({
      type: 'heat/fetch',
      payload:{ include: 'categorys'}
    });
    await  dispatch({
      type: 'tagAll/fetch',

    });

    this.queryList(this.props.location.search);

  }

  UNSAFE_componentWillReceiveProps (nextProps: ArticleListProps) {
    if (nextProps.location.search !== this.props.location.search) {
      this.queryList(nextProps.location.search);
    }
  }

  scrollToAnchor = (id: string) => {
    const dom = document.getElementById(id);
    dom && dom.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
      inline: 'start',
    });
  };

  queryList = async (params: object | string) => {
    const query = params instanceof Object ? params : parse(params.replace(/^\?/, ''));

    const queryParams = {
      ...defaultQueryParams,
      ...query,
    };

    await this.props.dispatch({
      type: 'homeAndarticle/fetch',
      payload: queryParams,
    });

    if (queryParams.page) {
      this.scrollToAnchor('searchForm');
    }
  };

  render() {
    const {
      form,
      loading,
      location: { pathname, search },
      homeAndarticle: { list,meta},
      categoryAll:{list:category},
      tagAll:{list:tag},
      heat:{list:heatList}
    } = this.props;
    const { getFieldDecorator } = form;
    const { pagination } =meta;
    const query = parse(search.replace(/^\?/, ''));

    const formItemLayout = {
      xl: { span: 8 },
    };

    const topColResponsiveProps = {
      xl: { span: 16 },
    };
    return (
      <GridContent >
        <Row gutter={12} >
        <Col {...topColResponsiveProps}>

          <Layout mode="horizontal" >
            <Card
              loading={loading.global}
              size="small"
              bordered={false}
              bodyStyle={{ padding: '0px' }}
              >
              <div><img alt="example" width= '100%'  src="https://www.duoguyu.com/uploads/201905/09/190509025425284.png" /></div>

            </Card>
            <Card bordered={false} hidden={query && !!query.keyword} id="searchForm"  size="small"   style={{ marginTop: 12}}>

              <Form layout="inline">

                  <FormItem>
                    {getFieldDecorator('category_ids', {
                      initialValue: query.tag_ids,
                    })(
                      <TagSelect >
                        {category.map(tag => (
                          <TagSelect.Option value={String(tag.id)} key={String(tag.id)} style={{fontSize:18}}>
                            {tag.name}
                          </TagSelect.Option>
                        ))}
                      </TagSelect>,
                    )}
                  </FormItem>
              </Form>
            </Card>
            <Content >
              <Card
                loading={loading.global}
                bordered={false}
                bodyStyle={{ padding: '8px 32px 32px 32px' }}

              >
                <List<IArticle>
                  size="small"
                  rowKey="id"
                  loading={loading.global}
                  itemLayout="vertical"
                  dataSource={list}
                  pagination={pagination}
                  renderItem={item => (
                    <List.Item
                      key={item.id}
                      extra={  <div className={styles.listItemExtra}>
                        {item.preview && <img src={item.preview} width="100%"  alt="预览" />}
                      </div>}
                    >
                      <List.Item.Meta
                        title={
                          <Link
                            className={styles.listItemMetaTitle}
                            to={`/article/${item.id}`}
                          >{item.title}
                          </Link>
                        }
                        description={
                          <span>
                           {item.tags.map(tag => (
                             <Tag>{tag.name}</Tag>
                           ))}
                          </span>
                        }
                      />
                      <ArticleListContent data={item} />
                    </List.Item>
                  )}
                />

              </Card>
            </Content>
          </Layout>

        </Col>
          <Col {...formItemLayout}>

            <Card
              loading={loading.global}
              size="small"
              title="特别推荐"
              bordered={false}
              bodyStyle={{ padding: '8px 32px 32px 32px' }}
            >
              <List<IArticle>
                size="small"
                rowKey="id"
                itemLayout="vertical"
                dataSource={heatList}
                renderItem={item => (
                  <List.Item
                    key={item.id}
                  >
                    <List.Item.Meta
                      description={
                        <Row gutter={[16, 16]} >
                          <Col span={8}>
                            <img width='100%' height="74px" src={item.preview}/>
                          </Col>
                          <Col span={16}>
                            <p>
                              <a className={styles.listItemMetaTitle} href={item.href}>
                                {item.title}
                              </a>
                            </p>
                            <span>
                            {item.created_at_timeago}
                            </span>
                            <span style={{marginLeft:"10px" }}>
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

            <Card  loading={loading.global}   style={{ marginTop: 12}} bodyStyle={{ padding: '0px' }}>
              <div><img alt="example" width= '100%' height= {'145px'} src="https://www.duoguyu.com/uploads/201905/09/190509025519155.png" /></div>
            </Card>

            <Card
              loading={loading.global}
              size="small"
              style={{ marginTop: 12}}
              title={"热门标签"}
              bordered={false}
              bodyStyle={{ padding: 24 }}
            >
              {tag.map(tagItem => (
                <Link
                  className={styles.listItemMetaTitle}
                  to={`/article/list?tags=${tagItem.id}`}
                >
                  <Tag style={{marginBottom:"8px"}}   color={`#${Math.floor(Math.random()*16777215).toString(16)}`}>{tagItem.name}</Tag>
                </Link>
              ))}

            </Card>
            <Card
              loading={loading.global}
              style={{ marginTop: 12}}
              bodyStyle={{ padding: '0px' }}
            >
              <div><img alt="example" width= '100%' height= {'145px'} src="https://www.duoguyu.com/dist/images/brand/brand-aliyun.jpg" /></div>
            </Card>
          </Col>
        </Row>
      </GridContent>
    );
  }
}

const WarpForm = Form.create<ArticleListProps>({
  onValuesChange ({ location: { pathname } }: ArticleListProps, changedValues, allValues) {
    router.push({
      pathname,
      search: stringify({
        ...allValues,
      }),
    });
  },
})(Article);

export default connect(
  ({
     homeAndarticle,
     tagAll,
     categoryAll,
    heat,
    loading,
  }:ConnectState) => ({
    homeAndarticle,
    tagAll,
    heat,
    categoryAll,
    loading,
  }),
)(WarpForm);
