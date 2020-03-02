import { AnyAction, Reducer } from 'redux';
import { EffectsCommandMap } from 'dva';
import { IArticle, IMeta } from '@/models/data';
import { queryFakeList } from './service';

export interface StateType {
  list: IArticle[];
  meta:{
    pagination: Partial<IMeta>
  }
};

export type Effect = (
  action: AnyAction,
  effects: EffectsCommandMap & { select: <T>(func: (state: StateType) => T) => T },
) => void;

export interface ModelType {
  namespace: string;
  state: StateType;
  effects: {
    fetch: Effect;
    appendFetch: Effect;
  };
  reducers: {
    queryList: Reducer<StateType>;
  };
}

// @ts-ignore
const Model: ModelType = {
  namespace: 'homeAndarticle',
  state: {
      list: [],
      meta: {
        pagination:{}
      },
  },

  effects: {
    *fetch({ payload }, { call, put }) {
      const { data: list, meta }  = yield call(queryFakeList, payload);
      yield put({
        type: 'queryList',
        payload: { list, meta },
      });
    },
    *appendFetch({ payload }, { call, put }) {
      const response = yield call(queryFakeList, payload);
      yield put({
        type: 'appendList',
        payload: response,
      });
    },
  },

  reducers: {
    queryList(state, {payload }) {
      return {
        ...state,
        ...payload
      };
    },
  },
};

export default Model;
