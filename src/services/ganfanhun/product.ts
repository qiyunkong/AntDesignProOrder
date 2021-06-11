import {request} from 'umi'
import {ProductListItem,JSONResult,PageList} from '../../types'

/** 拉取商品列表的接口函数 GET /api/product */
export async function getProduct(params:{
    //query
    /** 当前的页码 */
    current?:number
    pageSize?:number
    parentId?:string | '0'

}, options?: { [key: string]: any }){
    return request<PageList<ProductListItem>>('/api/product',{
        method:'GET',
        params:{
            ...params
        },
        ...(options || {}),
    })
}

/** 获取商品信息的接口函数 Get /api/product */
export async function getProductInfo(id:string | undefined, options?: { [key: string]: any }) {
  return request<PageList<ProductListItem>>(`/api/product/${id}`,{
    method:'GET',
    ...(options || {}),
})

}

/** 更新商品的接口函数 PUT /api/product */
export async function putProduct(body:ProductListItem, options?: { [key: string]: any }){
    return request<ProductListItem>('/api/product',{
        method:'PUT',
        data:body,
        ...(options || {}),
    })
}

/** 新建商品的接口函数 POST /api/product */
export async function addProduct(body:ProductListItem, options?: { [key: string]: any }){
    return request<JSONResult<ProductListItem>>('/api/product',{
        method:'POST',
        data:body,
        ...(options || {}),
    })
}

/** 删除商品的接口函数 DELETE /api/product */
export async function delProduct(params:{}, options?: { [key: string]: any }){
    return request('/api/product',{
        method:'DELETE',
        params:{
            ...params
        },
        ...(options || {}),
    })
}

