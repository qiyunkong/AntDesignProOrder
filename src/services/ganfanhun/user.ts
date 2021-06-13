/* eslint-disable */
import { JSONResult, User , UserListItem , PageList} from '@/types';
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

/** 获取当前的用户菜单权限 GET /api/role/tree/admin */
export async function fetchMenuData(params:User | undefined, options?: { [key: string]: any }) {
  const roleId = params?.roleId
  return request<API.MenuData>("/api/role/tree/admin",{
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
    params: {
      roleId,
    },
    ...(options || {}),
  })
}


/** 拉取用户列表的接口函数 GET /api/users */
export async function getUser(params:{
    //query
    /** 当前的页码 */
    current?:number
    pageSize?:number

}, options?: { [key: string]: any }){
    return request<PageList<UserListItem>>('/api/users',{
        method:'GET',
        params:{
          ...params
        },
        ...(options || {}),
    })
}

/** 更新用户的接口函数 PUT /api/users */
export async function putUser(body:UserListItem, options?: { [key: string]: any }){
    return request<UserListItem>('/api/users',{
        method:'PUT',
        data:body,
        ...(options || {}),
    })
}

/** 新建用户的接口函数 POST /api/users */
export async function addUser(body:UserListItem, options?: { [key: string]: any }){
    return request<JSONResult<UserListItem>>('/api/users',{
        method:'POST',
        data:body,
        ...(options || {}),
    })
}

/** 删除用户的接口函数 DELETE /api/users */
export async function delUser(params:{}, options?: { [key: string]: any }){
    return request('/api/users',{
        method:'DELETE',
        params:{
            ...params
        },
        ...(options || {}),
    })
}


