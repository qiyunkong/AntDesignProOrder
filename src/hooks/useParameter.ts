import getQuery from '@/utils/qsHelper'  //查询
import { ignoreCaseProxy } from '@/utils/utils' //引入忽略大小写对象
import { useParams } from 'umi'
import useApp from './useApp'

//使用参数
export default function useParameter<T>(data?:T){
    //
    const {currentApp} = useApp()
    const parameter = getQuery<T>()
    const {app,...params} = useParams<any>()
    let result = {...params,...parameter,appId:currentApp?.id,...data}
    result = ignoreCaseProxy(result)
    return result as T
}
