import request from '@/utils/request';

export async function queryCategoryAll() {
  return request('/api/common/categorys');
}
export async function queryPermissionAll() {
  return request('/api/common/permissions');
}
export async function queryTagAll() {
  return request('/api/common/tags');
}
