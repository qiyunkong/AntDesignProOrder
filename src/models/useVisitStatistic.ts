import type { VisitStatisticParameter,VisitAppRank } from '@/types'
import { request } from 'umi'

export default function useVisitLong(){


    /**
     * 获取App访问比率
     * @param params
     */
    const getAppRank = (params?:VisitStatisticParameter) =>{
        return request<VisitAppRank[]>('/api/log/statistic/app',{
            params,
            useCache:true,
            ttl:60 * 1000 * 30
        })
    }
    /**
     * App日访问量
     */
    const getVisitStatisticTotal = (params?:VisitStatisticParameter)=>{
        return request('/api/log/statistic/total',{params})
    }
    
    return{
        getAppRank, 
        getVisitStatisticTotal
    }
}