import { Button, Card, DatePicker, Form, Input, Radio, Select,message ,Upload, Icon} from 'antd';
import SimpleMDEEditor, { SimpleMDEEditorProps } from 'yt-simplemde-editor';
import emojiDependencies from 'yt-simplemde-editor/dist/emoji';
import DOMPurify from 'dompurify';
import { UploadChangeParam } from 'antd/lib/upload';
import { getAuthorization } from '@/utils/authority';
// @ts-ignore
import { IArticle, ITag } from '@/models/data';
import emojiToolkit from 'emoji-toolkit';
import marked from 'marked';
import moment from "moment";
import { FormattedMessage, formatMessage } from 'umi-plugin-react/locale';
import React, { Component } from 'react';
import { Dispatch } from 'redux';
import { FormComponentProps } from 'antd/es/form';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { connect } from 'dva';
import * as services from './service';
import styles from './style.less';
import 'yt-simplemde-editor/dist/style.css';

const FormItem = Form.Item;
const { Option } = Select;
interface CreateProps extends FormComponentProps {
  submitting: boolean;
  dispatch: Dispatch<any>;
}

type GetBase64Callback = (base64: any) => void;

function getBase64 (img: File | Blob, cb: GetBase64Callback): void {
  const reader = new FileReader();
  reader.addEventListener('load', () => cb(reader.result));
  reader.readAsDataURL(img);
}

function beforeUpload (file: File): boolean {
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    message.error('Image must smaller than 2MB!');
  }
  return isLt2M;
}

function range(start, end) {
  const result = [];
  for (let i = start; i < end; i++) {
    result.push(i);
  }
  return result;
}
function disabledDate(current) {
  return current && current < moment().endOf('day');
}
function disabledDateTime() {
  return {
    disabledHours: () => range(0, 24).splice(4, 20),
    disabledMinutes: () => range(30, 60),
    disabledSeconds: () => [55, 56],
  };
}

interface ArticleCreateState {
  allTags:ITag[];
  allCategorys:ITag[];
  uploading: boolean;
  previewBase64: string;
}
const uploadUrl = '/api/attachments/upload';
class Create extends Component<CreateProps> {
  state: ArticleCreateState = {
    allTags: [],
    allCategorys:[],
    uploading: false,
    previewBase64: '',
  };
  async UNSAFE_componentWillMount() {
    const { data: allTags } = await services.queryAllTags();
    const { data: allCategorys } = await services.queryAllCategorys();
    this.setState({ allTags,allCategorys });
  }

  handleSubmit = (e: React.FormEvent) => {
    const { dispatch, form } = this.props;
    e.preventDefault();
    form.validateFieldsAndScroll((err, values:IArticle) => {
      if (!err) {
        dispatch({
          type: 'articleCreate/submitRegularForm',
          payload: values,
        });

      }
    });
  };

  handlePreviewChange = ({ file }: UploadChangeParam) => {
    if (file.status === 'uploading') {
      return this.setState({ uploading: true });
    }
    if (file.status === 'done') {
      const { setFieldsValue } = this.props.form;

      file.originFileObj &&
      getBase64(file.originFileObj, previewBase64 =>
        this.setState(
          {
            previewBase64,
            uploading: false,
          },
          () => {
            setFieldsValue({ preview: file.response.data.url });
          },
        ),
      );
    }
  };

  renderMarkdown = (text: string) => {
    let html = marked(text);
    return DOMPurify.sanitize(emojiToolkit.toImage(html));
  };

  render() {
    const {  uploading, previewBase64 , allTags, allCategorys,} = this.state;
    const {
      submitting,
    } = this.props;
    const {
      form: { getFieldDecorator, getFieldValue },
    } = this.props;

    const formItemLayout = {
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 12, offset: 7 },
        md: { span: 10 },
      },
    };
    const submitFormLayout = {
      wrapperCol: {
        xs: { span: 24, offset: 0 },
        sm: { span: 10, offset: 7 },
      },
    };

    const editorProps: SimpleMDEEditorProps = {
      // 配置文档 https://github.com/sparksuite/simplemde-markdown-editor#configuration
      options: {
        autoDownloadFontAwesome: true,
        spellChecker: false,
        autosave: {
          enabled: true,
          delay: 3000,
          uniqueId: 'article_content',
        },
        previewRender: this.renderMarkdown,
        tabSize: 4,
        toolbar: [
          'bold',
          'italic',
          'heading',
          '|',
          'quote',
          'code',
          'table',
          'horizontal-rule',
          'unordered-list',
          'ordered-list',
          '|',
          'link',
          'image',
          '|',
          'preview',
          'side-by-side',
          'fullscreen',
          '|',
          'guide',
          {
            name: 'submit',
            action: () => {
              this.handleSubmit();
            },
            className: 'fa fa-paper-plane',
            title: '提交',
          },
          '|',
          'emoji',
        ],
      },
      uploadOptions: {
        action: uploadUrl,
        jsonName: 'data.url',
        beforeUpload,
        headers: {
          Accept: `application/x.kzabc.v1+json`,
          Authorization: getAuthorization(),
        },
        onError (err: any, response: { message?: string }) {
          if (response.message) {
            message.error(response.message);
          }
        },
      },
      emoji: {
        enabled: true,
        autoComplete: false,
        insertConvertTo: 'unicode',
      },
      ...emojiDependencies,
    };

    return (
      <PageHeaderWrapper >
        <Card bordered={false}>
          <Form
            onSubmit={this.handleSubmit}
            hideRequiredMark
            style={{ marginTop: 8 }}
          >
            <FormItem {...formItemLayout} colon={false}>
              {getFieldDecorator('title', {
                rules: [
                  {
                    required: true,
                    message: formatMessage({ id: 'article-create.title.required' }),
                  },
                ],
              })(
                <Input
                  addonBefore={<FormattedMessage id="article-create.title.label" />}
                  placeholder={formatMessage({ id: 'article-create.title.placeholder' })}
                />,
              )}
            </FormItem>

            <FormItem {...formItemLayout} colon={false}>
              {getFieldDecorator('category_id', {
                rules: [
                  {
                    required: true,
                    message: formatMessage({ id: 'article-create.category.required' }),
                  },
                ],
              })(
                <Select
                  mode="multiple"
                  placeholder={formatMessage({ id: 'article-create.category.placeholder' })}
                >
                  {allCategorys.map(value => (
                    <Option key={value.id} value={value.id}>
                      {value.name}
                    </Option>
                  ))}
                </Select>,
              )}
            </FormItem>
            <FormItem {...formItemLayout} colon={false}>
              {getFieldDecorator('tag_id', {
                rules: [
                  {
                    required: true,
                    message: formatMessage({ id: 'article-create.tag.required' }),
                  },
                ],
              })(
                <Select
                  mode="multiple"
                  placeholder={formatMessage({ id: 'article-create.tag.placeholder' })}
                >
                  {allTags.map(value => (
                    <Option key={value.id} value={value.id}>
                      {value.name}
                    </Option>
                  ))}
                </Select>,
              )}
            </FormItem>
            <FormItem {...formItemLayout} >
              {getFieldDecorator('preview')(
                <Upload
                  accept="image/*"
                  name="file"
                  listType="picture-card"
                  className={styles.previewUploader}
                  showUploadList={false}
                  action={uploadUrl}
                  headers={{ Authorization: getAuthorization(),  Accept: `application/x.kzabc.v1+json`, }}
                  beforeUpload={beforeUpload}
                  onChange={this.handlePreviewChange}
                >
                  {previewBase64 ? (
                    <img style={{ maxWidth: '100%' }} src={previewBase64} alt="preview" />
                  ) : (
                    <div>
                      <Icon type={uploading ? 'loading' : 'plus'} />
                      <div className="ant-upload-text">Upload</div>
                    </div>
                  )}
                </Upload>,
              )}
            </FormItem>
            <FormItem {...formItemLayout}  colon={false}>
              <div>
                {getFieldDecorator('is_original', {
                  initialValue: '1',
                })(
                  <Radio.Group buttonStyle="solid">
                    <Radio.Button value="1">原 创</Radio.Button>
                    <Radio.Button value="2">转 载</Radio.Button>
                    <Radio.Button value="3">混 合</Radio.Button>
                  </Radio.Group>,
                )}
              </div>
            </FormItem>
            <FormItem {...formItemLayout} colon={false}>
              <div>
                {getFieldDecorator('public', {
                  initialValue: '1',
                })(
                  <Radio.Group buttonStyle="solid">
                    <Radio.Button value="1">立即发布</Radio.Button>
                    <Radio.Button value="2">草 稿</Radio.Button>
                    <Radio.Button value="3">定时发布</Radio.Button>
                  </Radio.Group>,
                )}
                <FormItem style={{ marginBottom: 0 }}>
                  {getFieldDecorator('published_at', {
                    rules: [
                      {
                        required: getFieldValue('public') === '3' ? true : false,
                        message: formatMessage({ id: 'article-create.published_at.required' }),
                      },
                    ],
                  })(
                    <DatePicker
                      addonBefore="aaa"
                      format="YYYY-MM-DD HH:mm:ss"
                      disabledDate={disabledDate}
                      disabledTime={disabledDateTime}
                      showTime={{ defaultValue: moment('00:00:00', 'HH:mm:ss') }}
                      style={{
                        width: '30%',
                        margin: '8px 0',
                        display: getFieldValue('public') === '3' ? 'block' : 'none',
                      }}
                    />,
                  )}
                </FormItem>
              </div>
            </FormItem>
            <FormItem {...formItemLayout}  colon={false}>
              {getFieldDecorator('content.markdown', {
                validateTrigger: 'onBlur',
                rules: [
                  {
                    required: true,
                    message: formatMessage({ id: 'article-create.content.required' }),
                  },
                ],
              })(
                <SimpleMDEEditor {...editorProps} />,
              )}
            </FormItem>
            <FormItem {...submitFormLayout} style={{ marginTop: 32 }}>
              <Button type="primary" htmlType="submit" loading={submitting}>
                <FormattedMessage id="article-create.form.submit" />
              </Button>
              <Button style={{ marginLeft: 8 }}>
                <FormattedMessage id="article-create.form.save" />
              </Button>
            </FormItem>
          </Form>
        </Card>
      </PageHeaderWrapper>
    );
  }
}

export default Form.create<CreateProps>()(
  connect(({ loading }: { loading: { effects: { [key: string]: boolean } } }) => ({
    submitting: loading.effects['articleCreate/submitRegularForm'],
  }))(Create),
);
