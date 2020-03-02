import request from '@/utils/request';
import { ITagParams } from '@/models/data';

export async function queryTag(params?: ITagParams) {
  return request('/api/admin/tags', {
    params,
  });
}

export async function removeTag(tag:number ) {
  return request(`/api/admin/tags/${tag}`, {
    method: 'delete',
  });
}
export async function removeTags(params: { id: (number | undefined)[] }) {
  return request('/api/admin/tags', {
    method: 'POST',
    data: {
      ...params,
      method: 'delete',
    },
  });
}

export async function addTag(params: ITagParams) {
  return request('/api/admin/tags', {
    method: 'POST',
    data: {
      ...params,
      method: 'post',
    },
  });
}

export async function updateTag(tag: number,params: ITagParams) {
  return request(`/api/admin/tags/${tag}`, {
    method: 'PUT',
    data: {
      ...params,
      method: 'update',
    },
  });
}
