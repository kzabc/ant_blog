import request from '@/utils/request';
export async function queryCategoryAll(){
  return request('/api/common/categorys');
}
