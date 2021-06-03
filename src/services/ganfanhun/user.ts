/* eslint-disable */
import { JSONResult, User } from '@/types';
import { request } from 'umi';
/** 获取当前的用户 GET /api/currentUser */
export async function currentUser(options?: { [key: string]: any }) {
  return request<JSONResult<User>>('/api/account/currentUser', {
    headers: {
      'Content-Type': 'application/json',
    },
    method: 'GET',
    ...(options || {}),
  });
}

/** 获取当前的用户菜单 GET /api/menuData */
export async function fetchMenuData(params:User | undefined, options?: { [key: string]: any }) {
    return request<API.MenuData>("/api/menu/dev",{
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
