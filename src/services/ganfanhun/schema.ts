import {request} from 'umi'
import {SchemaListItem,JSONResult,PageList,SchemaDva,TableSourceType} from '@/types'

/** 拉取模型列表的接口函数 GET /api/model */
export async function getSchema(params:{
    //query
    /** 当前的页码 */
    current?:number
    pageSize?:number
    parentId?:string | '0'

}, options?: { [key: string]: any }){
    return request<PageList<SchemaListItem>>('/api/model',{
        method:'GET',
        params:{
          ...params
        },
        ...(options || {}),
    })
}

/** 更新模型的接口函数 PUT /api/model */
export async function putSchema(body:SchemaListItem, options?: { [key: string]: any }){
    return request<SchemaListItem>('/api/model',{
        method:'PUT',
        data:body,
        ...(options || {}),
    })
}

/** 新建模型的接口函数 POST /api/model */
export async function addSchema(body:SchemaDva<TableSourceType>, options?: { [key: string]: any }){
    return request<JSONResult<SchemaListItem>>('/api/model',{
        method:'POST',
        data:body,
        ...(options || {}),
    })
}

/** 删除模型的接口函数 DELETE /api/model */
export async function delSchema(params:{}, options?: { [key: string]: any }){
    return request('/api/model',{
        method:'DELETE',
        params:{
            ...params
        },
        ...(options || {}),
    })
}

