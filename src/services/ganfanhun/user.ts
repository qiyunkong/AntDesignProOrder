/* eslint-disable */
import { request } from 'umi';

/** 获取当前的用户 GET /api/currentUser */
export async function currentUser(options?: { [key: string]: any }) {
  return request<API.CurrentUser>('/api/account/currentUser', {
    method: 'GET',
    ...(options || {}),
  });
}

/** 获取当前的用户菜单 GET /api/menuData */
export async function fetchMenuData(params:API.CurrentUser | undefined, options?: { [key: string]: any }) {
    return request<API.MenuData>("/api/menu",{
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      params: {
        ...params
      },
      ...(options || {}),
    })
  }
  