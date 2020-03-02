import request from '@/utils/request';
export async function queryHeat(params){
  return request('/api/heat',
    {
      params,
    });
}
export async function getNewArticle(params){
  return request('/api/new',
    {
      params,
    });
}

