import {createContext} from 'react'

//接口
export interface ConfigConsumerProps {
    rootPerfixCls?:string
    getPrefixCls:(suffixCls?:string,customizePrefixCls?:string) => string
}

//通过createContext 创建一个对象
export const ConfigContext = createContext<ConfigConsumerProps>({
    //获取前缀  suffixCls 后缀   customizePrefixCls 自定义前缀
    getPrefixCls:(suffixCls?:string,customizePrefixCls?:string) =>{
        //如果是自定义前缀就返回
        if(customizePrefixCls) return customizePrefixCls
        //后缀有值就返回mx-后缀字符串
        return suffixCls ? `mx-${suffixCls}`:'mx'
    }
})

export const ConfigConsumer = ConfigContext.Consumer