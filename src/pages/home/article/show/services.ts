import request from '@/utils/request';

export async function queryArticle (id: number | string, params: object) {
  return request(`/api/articles/${id}`, {
    params,
  });
}

export async function queryArticleComments (article_id: number | string, params: object) {
  return request(`/api/articles/${article_id}/comments`, {
    params,
  });
}

export async function postArticleComment (article_id: number | string, params: object) {
  return request(`/api/articles/${article_id}/comments`, {
    method: 'post',
    data: params,
  });
}
