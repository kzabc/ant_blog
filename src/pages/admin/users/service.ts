import request from '@/utils/request';
import { TableListParams } from '@m/data.d';

export async function queryUsers(params?: TableListParams) {
  return request('/api/admin/users', {
    params,
  });
}

export async function removeUser(id: number) {
  return request(`/api/admin/users/${id}`, {
    method: 'delete',
  });
}
export async function removeUsers(params: { key: any[] }) {
  return request('/api/admin/users/', {
    method: 'delete',
    data: {
      ...params,
      method: 'delete',
    },
  });
}
export async function addUsers(params: {}) {
  return request('/api/admin/users', {
    method: 'POST',
    data: {
      ...params,
      method: 'post',
    },
  });
}

export async function updateUsers(id: number, params) {
  return request(`/api/admin/users/${id}`, {
    method: 'PUT',
    data: {
      ...params,
      method: 'update',
    },
  });
}

export async function getRolesAll() {
  return request('/api/admin/roles/all');
}
