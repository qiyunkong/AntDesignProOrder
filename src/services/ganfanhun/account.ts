
import { request }  from 'umi'
import {AccountLoginParameter, AccountLoginResult, JSONResult} from '@/types'

/** 登录接口 POST /api/account/login */
export async function login(body:AccountLoginParameter,options?: { [key: string]: any }) {
    return request<JSONResult<AccountLoginResult>>('/api/account/login',{
        method:'POST',
        headers:{
            'Content-Type': 'application/json',
        },
        data: body,
        ...(options || {}),
    })
}