import request from '@/utils/request';

export async function queryCategoryAll() {
  return request('/api/common/categorys');
}

export async function queryTagAll() {
  return request('/api/common/tags');
}

export async function queryPermissionsAll() {
  return request('/api/common/permissions');
}
