import request from '@/utils/request';
export async function queryTagAll(){
  return request('/api/common/tags');
}
