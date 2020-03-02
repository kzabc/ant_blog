import { AnyAction } from 'redux';
import { MenuDataItem } from '@ant-design/pro-layout';
import { RouterTypes } from 'umi';
import { GlobalModelState } from './global';
import { DefaultSettings as SettingModelState } from '../../config/defaultSettings';
import { UserModelState } from './user';
import { StateType as ArticleListModelState } from '@/pages/home/article/list/model';
import { StateType as ArticleShowModelState } from '@/pages/home/article/show/model';
import { StateType as CategoryListAllState } from '@/models/category';
import { StateType as TagListAllState } from '@/models/tag';
import { StateType as HeatListState } from '@/models/heat';
export {
  GlobalModelState,
  SettingModelState,
  UserModelState,
  ArticleListModelState,
  ArticleShowModelState,
  CategoryListAllState,
  TagListAllState,
  HeatListState,
};

export interface Loading {
  global: boolean;
  effects: { [key: string]: boolean | undefined };
  models: {
    global?: boolean;
    menu?: boolean;
    setting?: boolean;
    user?: boolean;
    login?: boolean;
    homeAndarticle?:boolean;
    articleShow?:boolean;
    categoryAll?:boolean;
    tagAll?:boolean;
    heat?:boolean
  };
}

export interface ConnectState {
  global: GlobalModelState;
  loading: Loading;
  settings: SettingModelState;
  user: UserModelState;
  homeAndarticle:ArticleListModelState;
  articleShow:ArticleShowModelState;
  categoryAll:CategoryListAllState;
  tagAll:TagListAllState;
  heat:HeatListState;
}

export interface Route extends MenuDataItem {
  routes?: Route[];
}
export type Effect = (
  action: AnyAction,
  effects: EffectsCommandMap & { select: <T>(func: (state: ConnectState) => T) => T },
) => void;

export type Dispatch = <P = any, C = (payload: P) => void>(action: {
  type: string;
  payload?: P;
  callback?: C;
  [key: string]: any;
}) => any;

/**
 * @type T: Params matched in dynamic routing
 */
/**
 * @type T: Params matched in dynamic routing
 */
export interface ConnectProps<T = {}> extends RouterTypes<Route, T> {
  dispatch: Dispatch;
  location: RouterTypes<Route, T>['location'] & {
    query: { [key: string]: string };
  };
}
