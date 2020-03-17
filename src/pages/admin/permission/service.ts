import request from '@/utils/request';
import { IPermissionParams } from '@/models/data';

export async function queryPermission(params?: IPermissionParams) {
  return request('/api/admin/permissions', {
    params,
  });
}

export async function removePermission(params: { key: number[] }) {
  return request('/api/rule', {
    method: 'POST',
    data: {
      ...params,
      method: 'delete',
    },
  });
}

export async function addPermission(params: IPermissionParams) {
  return request('/api/rule', {
    method: 'POST',
    data: {
      ...params,
      method: 'post',
    },
  });
}

export async function updatePermission(params: IPermissionParams) {
  return request('/api/rule', {
    method: 'POST',
    data: {
      ...params,
      method: 'update',
    },
  });
}
