import request from '@/utils/request';
import { TableListParams } from '../release/data';

export async function queryArticle(params?: TableListParams) {
  return request('/api/admin/articles', {
    params,
  });
}

export async function removeArticle(params: { key: number[] }) {
  return request('/api/admin/articles', {
    method: 'POST',
    data: {
      ...params,
      method: 'delete',
    },
  });
}
