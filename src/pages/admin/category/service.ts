import request from '@/utils/request';
import {ICategory} from "@/models/data";

export async function queryCategory(params?: ICategory) {
  return request('/api/admin/categorys', {
    params,
  });
}

export async function removeCategorys(params: { key: number[] }) {
  return request('/api/admin/categorys', {
    method: 'delete',
    data: {
      ...params,
      method: 'delete',
    }
  });
}
export async function removeCategory(category:number) {
  return request(`/api/admin/categorys/${category}`, {
    method: 'delete',

  });
}

export async function addCategory(params: ICategory) {
  return request('/api/admin/categorys', {
    method: 'POST',
    data: {
      ...params,
      method: 'post',
    },
  });
}

export async function updateCategory(category: number,params: ICategory) {
  return request(`/api/admin/categorys/${category}`, {
    method: 'PUT',
    data: {
      ...params,
      method: 'update',
    },
  });
}
