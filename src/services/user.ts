import request from '@/utils/request';

export async function query(): Promise<any> {
  return request('/api/users');
}

export async function queryCurrent(): Promise<any> {
  return request('/api/currentUser');
}

export async function queryNotices(): Promise<any> {
  return request('/api/notices');
}
// 获取权限菜单
export async function getAccountMenus(params: { include: string }) {
  return request('/api/common/menus', {
    params,
  });
}
