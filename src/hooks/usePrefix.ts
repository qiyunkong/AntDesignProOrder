import {ConfigContext} from '@/components/Config-provider'
import {createBEM} from '@/utils'
import {useContext} from 'react'


//使用前缀函数
export default function usePrefix(cls:string,customizePrefixCls?:string){
    //解构出获取前缀函数
    const {getPrefixCls} = useContext(ConfigContext)
    //
    const prefixCls = getPrefixCls(cls,customizePrefixCls)
    
    const bem = createBEM(prefixCls)
    return {
        prefixCls,
        bem,
    }
}