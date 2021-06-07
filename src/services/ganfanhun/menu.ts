import {JSONResult,Menu,MenuListItem,PageList} from '@/types'
import {request} from 'umi'


/** 拉取菜单列表的接口函数 GET /api/menu  */
export async function getMenu(params:{
  /** 当前的页码 */
  current?:number
  pageSize?:number
  parentId?:string

}, options?: { [key: string]: any }){
  return request<PageList<MenuListItem>>('/api/menu',{
      method:'GET',
      params:{
        ...params
      },
      ...(options || {}),
  })
}



/** 新建菜单接口函数 PSOT /api/menu */
export async function addMenu(
  body:Menu,
  options?:{[key:string]:any}){
  return request<JSONResult<Menu>>('/api/menu',{
    method:'POST',
    data:body,
    ...(options || {})
  })
}


/** 更新菜单的接口函数 PUT /api/category */
export async function putMenu(body:MenuListItem, options?: { [key: string]: any }){
  return request<MenuListItem>('/api/menu',{
      method:'PUT',
      data:body,
      ...(options || {}),
  })
}
