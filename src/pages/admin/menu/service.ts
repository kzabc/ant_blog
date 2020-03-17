import request from '@/utils/request';
import { IMenuParams } from '@/models/data';

export async function queryMenu(params?: IMenuParams) {
  return request('/api/admin/menus', {
    params,
  });
}

export async function removeMenu(params: { key: number[] }) {
  return request('/api/menu', {
    method: 'POST',
    data: {
      ...params,
      method: 'delete',
    },
  });
}

export async function addMenu(params: {
  template?: string;
  owner?: string;
  callNo?: number;
  avatar?: string;
  type?: string;
  title?: string;
  target?: string;
  frequency?: string;
  createdAt?: Date;
  name?: string;
  progress?: number;
  disabled?: boolean;
  time?: string;
  href?: string;
  key?: number;
  desc?: string;
  status?: number;
  updatedAt?: Date;
}) {
  return request('/api/admin/menus', {
    method: 'POST',
    data: {
      ...params,
      method: 'post',
    },
  });
}

export async function updateMenu(params: IMenuParams) {
  return request('/api/menu', {
    method: 'POST',
    data: {
      ...params,
      method: 'update',
    },
  });
}
