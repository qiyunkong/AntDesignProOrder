
import {UserAuthorizationParameter, UserOrganization,UserParameter} from '@/types'
import { request } from 'umi'
import { useState } from 'react'

export default function useUser() {

    const [userOrganization, setOrganization] = useState<UserOrganization>()

    /**
     * 获取用户总数
     */
    const getUserTotal = (params:UserParameter) =>{
        const res = request('/api/user/total',{params})
        return res
    }


    /**
     * 获取用户账号数量
     * @param params
     */
    const getUserAuthorizationTotal = (params?:UserAuthorizationParameter) =>{
        const res = request('/api/user/authorization/total',{params})
        return res;
    } 

    /**
     * 获取用户组织架构信息
     * @param id
     */
    const getUserOrganization = (params:any) =>{
        const res = request<UserOrganization>(`/api/user/organization`,{params})
        setOrganization(userOrganization)
        return res
    }
        
    return {
        getUserTotal,
        getUserAuthorizationTotal,
        getUserOrganization,
    }

}