import { AnyAction, Reducer } from 'redux';
import { EffectsCommandMap } from 'dva';
import { queryHeat,getNewArticle} from '@/services/heat';
import {IArticle} from "@/models/data";

export interface StateType {
  list: IArticle[];
  newList: IArticle[];
}

export interface HeatModel {
  namespace: 'heat';
  state: StateType;
  effects: {
    fetch: Effect;
    newfetch:Effect;
  };
  reducers: {
    saveHeat: Reducer<StateType>;
    saveNewList: Reducer<StateType>;
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
  };
  reducers: {
    save: Reducer<StateType>;
  };
}
const HeatModel: HeatModel = {
  namespace: 'heat',

  state: {
    list:[],
    newList:[],
  },
  effects: {
    *fetch(payload, { call, put }) {
      const { data: list } = yield call(queryHeat,payload);
      yield put({
        type: 'saveHeat',
        payload: {list},
      });
    },
    *newfetch(payload, { call, put }) {
      const { data: newList } = yield call(getNewArticle,payload);
      yield put({
        type: 'saveNewList',
        payload: {newList},
      });
    },
  },

  reducers: {
    saveHeat(state, {payload}) {
      return {
        ...state,
        ...payload,
      };
    },
    saveNewList(state, {payload}) {
      return {
        ...state,
        ...payload,
      };
    },
  },
};

export default HeatModel;
