import request from '@/utils/request';

export async function fakeSubmitForm(params: any) {
  return request('/api/admin/articles', {
    method: 'POST',
    data: params,
  });
}
export async function queryAllTags () {
  return request('/api/common/tags/');
}

export async function queryAllCategorys() {
  return request('/api/common/categorys');
}

