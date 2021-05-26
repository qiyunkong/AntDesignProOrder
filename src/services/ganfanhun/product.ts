import {request} from 'umi'
import {ProductListItem,JSONResult,PageList} from '../../types'

/** 拉取分类列表的接口函数 GET /api/category */
export async function getProduct(params:{
    //query
    /** 当前的页码 */
    current?:number
    pageSize?:number
    parentId?:string | '0'

}, options?: { [key: string]: any }){
    return request<PageList<ProductListItem>>('/api/category?parentId=0',{
        method:'GET',
        params:{
            ...params
        },
        ...(options || {}),
    })
}

/** 更新分类的接口函数 PUT /api/category */
export async function putProduct(body:ProductListItem, options?: { [key: string]: any }){
    return request<ProductListItem>('/api/category',{
        method:'PUT',
        data:body,
        ...(options || {}),
    })
}

/** 新建分类的接口函数 POST /api/category */
export async function addProduct(body:ProductListItem, options?: { [key: string]: any }){
    return request<JSONResult<ProductListItem>>('/api/category',{
        method:'POST',
        data:body,
        ...(options || {}),
    })
}

/** 删除分类的接口函数 DELETE /api/category */
export async function delProduct(params:{}, options?: { [key: string]: any }){
    return request('/api/category',{
        method:'DELETE',
        params:{
            ...params
        },
        ...(options || {}),
    })
}

