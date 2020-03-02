import { AnyAction, Reducer } from 'redux';
import { EffectsCommandMap } from 'dva';
import { queryTagAll } from '@/services/tag';
import {ITag} from "@/models/data";

export interface StateType {
  list: ITag[];
}

export interface TagModel {
  namespace: 'tagAll';
  state: StateType;
  effects: {
    fetch: Effect;
  };
  reducers: {
    saveTag: Reducer<StateType>;
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
const TagModel: TagModel = {
  namespace: 'tagAll',

  state: {
    list:[],
  },
  effects: {
    *fetch(_, { call, put }) {
      const { data: list } = yield call(queryTagAll);
      yield put({
        type: 'saveTag',
        payload: {list},
      });
    },
  },

  reducers: {
    saveTag(state, {payload}) {
      return {
        ...state,
        ...payload,
      };
    },
  },
};

export default TagModel;
