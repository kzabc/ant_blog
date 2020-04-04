import { AnyAction, Reducer } from 'redux';
import { EffectsCommandMap } from 'dva';
import { queryCategoryAll } from '@/services/common';
import { ICategory } from '@/models/data';

export interface StateType {
  list: ICategory[];
}

export interface CategoryModel {
  namespace: 'categoryAll';
  state: StateType;
  effects: {
    fetch: Effect;
  };
  reducers: {
    saveCategory: Reducer<StateType>;
  };
}

export type Effect = (
  action: AnyAction,
  effects: EffectsCommandMap & { select: <T>(func: (state: StateType) => T) => T },
) => void;

export interface ModelType {
  namespace: string;
  state: StateType;
  effects: {
    fetch: Effect;
    add: Effect;
    remove: Effect;
    update: Effect;
  };
  reducers: {
    save: Reducer<StateType>;
  };
}
const CategoryModel: CategoryModel = {
  namespace: 'categoryAll',

  state: {
    list: [],
  },
  effects: {
    *fetch(_, { call, put }) {
      const { data: list } = yield call(queryCategoryAll);
      yield put({
        type: 'saveCategory',
        payload: { list },
      });
    },
  },

  reducers: {
    saveCategory(state, { payload }) {
      return {
        ...state,
        ...payload,
      };
    },
  },
};

export default CategoryModel;
