import {AppSettings} from '@/types'
import {request} from 'umi'

//获取系统配置信息
export function getAppSettings(){
    return request<AppSettings>('/api/config/settings')
}