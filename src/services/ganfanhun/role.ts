import {request} from 'umi'
import {RoleListItem,JSONResult,PageList} from '../../types'

/** 拉取角色列表的接口函数 GET /api/role */
export async function getRole(params:{
    //query
    /** 当前的页码 */
    current?:number
    pageSize?:number

}, options?: { [key: string]: any }){
    return request<PageList<RoleListItem>>('/api/role',{
        method:'GET',
        params:{
          ...params
        },
        ...(options || {}),
    })
}

/** 更新角色的接口函数 PUT /api/role */
export async function putRole(body:RoleListItem, options?: { [key: string]: any }){
    return request<RoleListItem>('/api/role',{
        method:'PUT',
        data:body,
        ...(options || {}),
    })
}

/** 新建角色的接口函数 POST /api/role */
export async function addRole(body:RoleListItem, options?: { [key: string]: any }){
    return request<JSONResult<RoleListItem>>('/api/role',{
        method:'POST',
        data:body,
        ...(options || {}),
    })
}

/** 删除角色的接口函数 DELETE /api/role */
export async function delRole(params:{}, options?: { [key: string]: any }){
    return request('/api/role',{
        method:'DELETE',
        params:{
            ...params
        },
        ...(options || {}),
    })
}


/** 获取当前的角色授权菜单 GET /api/role/tree/data */
export async function getMenuTree(options?: { [key: string]: any }) {
    return request<API.MenuData>("/api/role/tree/data",{
        method: 'GET',
        headers: {
        'Content-Type': 'application/json',
        },
        ...(options || {}),
    })
}
