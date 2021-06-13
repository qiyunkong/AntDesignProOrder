import {request} from 'umi'
import {TagListItem,JSONResult,PageList} from '../../types'

/** 拉取标签列表的接口函数 GET /api/tag */
export async function getTag(params:{
    //query
    /** 当前的页码 */
    current?:number
    pageSize?:number

}, options?: { [key: string]: any }){
    return request<PageList<TagListItem>>('/api/tag',{
        method:'GET',
        params:{
          ...params
        },
        ...(options || {}),
    })
}

/** 更新标签的接口函数 PUT /api/tag */
export async function putTag(body:TagListItem, options?: { [key: string]: any }){
    return request<TagListItem>('/api/tag',{
        method:'PUT',
        data:body,
        ...(options || {}),
    })
}

/** 新建标签的接口函数 POST /api/tag */
export async function addTag(body:TagListItem, options?: { [key: string]: any }){
    return request<JSONResult<TagListItem>>('/api/tag',{
        method:'POST',
        data:body,
        ...(options || {}),
    })
}

/** 删除标签的接口函数 DELETE /api/tag */
export async function delTag(params:{}, options?: { [key: string]: any }){
    return request('/api/tag',{
        method:'DELETE',
        params:{
            ...params
        },
        ...(options || {}),
    })
}

