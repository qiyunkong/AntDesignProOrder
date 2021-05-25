import {request} from 'umi'
import {CategoryListItem,JSONResult,PageList} from '../../types'

/** 拉取分类列表的接口函数 GET /api/category */
export async function getCategory(params:{
    //query
    /** 当前的页码 */
    current?:number
    pageSize?:number

}, options?: { [key: string]: any }){
    return request<PageList<CategoryListItem>>('/api/category?parentId=0',{
        method:'GET',
        params:{
            ...params
        },
        ...(options || {}),
    })
}

/** 更新分类的接口函数 PUT /api/category */
export async function putCategory(body:CategoryListItem, options?: { [key: string]: any }){
    return request<CategoryListItem>('/api/category',{
        method:'PUT',
        data:body,
        ...(options || {}),
    })
}

/** 新建分类的接口函数 POST /api/category */
export async function addCategory(body:CategoryListItem, options?: { [key: string]: any }){
    return request<JSONResult<CategoryListItem>>('/api/category',{
        method:'POST',
        data:body,
        ...(options || {}),
    })
}

/** 删除分类的接口函数 DELETE /api/category */
export async function delCategory(params:{
}, options?: { [key: string]: any }){
    return request('/api/category',{
        method:'DELETE',
        params:{
            ...params
        },
        ...(options || {}),
    })
}

