import React from 'react'
import {ConfigConsumer,ConfigConsumerProps,ConfigContext} from './context'

export interface ConfigProviderProps {
    prefixCls?:string
}

const ConfigProvider:React.FC<ConfigProviderProps> = (props) =>{
    const getPrefixClsWrapper = (context:ConfigConsumerProps) =>{
        return (suffixCls?:string,customizedPrefixCls?:string) =>{
            const {prefixCls} = props
            if(customizedPrefixCls ) return customizedPrefixCls
            const mergedPrefixCls = prefixCls || context.getPrefixCls('')
            return suffixCls ? `${mergedPrefixCls}-${suffixCls}` : mergedPrefixCls
        }
    }

    const renderProvider = (context:ConfigConsumerProps) => {
        const {children} = props
        const config:ConfigConsumerProps = {
            ...context,
            getPrefixCls:getPrefixClsWrapper(context)
        }
        return <ConfigContext.Provider value={config}>{children}</ConfigContext.Provider>
    }

    return <ConfigConsumer>{(context)=>renderProvider(context)}</ConfigConsumer>
}

export default ConfigProvider
export {ConfigContext}