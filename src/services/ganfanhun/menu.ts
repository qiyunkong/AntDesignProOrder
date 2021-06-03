import {JSONResult,Menu,MenuListItem,PageList} from '@/types'
import {request} from 'umi'

/** 拉取菜单列表的接口函数 GET /api/menu  */
// export async function getMenu(params:{
//   current?:number
//   pageSize?:number
//   children?:string | '0'
// },options?:{[key:string]:any}){
//   return request<PageList<MenuListItem>>('/api/menu',{
//     method:'GET',
//     params:{
//       ...params
//     },
//     ...(options || {})
//   })
// }

export async function getMenu(params:{
  //query
  /** 当前的页码 */
  current:number
  pageSize:number
  children?:string | '0'

}, options?: { [key: string]: any }){
  return request<JSONResult<MenuListItem>>('/api/menu',{
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
