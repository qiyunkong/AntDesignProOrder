import { JSONResult,System} from '@/types'
import {request} from 'umi'

/** 修改系统配置 */
export async function postSetting(body:System,options?: { [key: string]: any }) {
  return request<JSONResult<System>>('/api/system',{
    method:'POST',
    data:body,
    ...(options || {}),
  })
}


/** 获取新的配置  */
export async function getSetting(params?:any,options?: { [key: string]: any }) {
  return request<JSONResult<System>>('/api/system',{
    method:'GET',
    params:{
      ...params
    },
    ...(options || {}),
})

}


