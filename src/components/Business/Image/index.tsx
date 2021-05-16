import useFile from '@/hooks/useFile'
import {FileType} from '@/types'
import React from 'react'

interface ImageProps{
    src:string
    type:FileType
    width?:number | string
    height?:number | string
    className?:string
    style?:React.CSSProperties
    isLocal?:boolean // 本地模式 图片直接从本获取
}

export default function MxImage(props:ImageProps){
    const {getUrl} = useFile()
    const { src, type, width, height, className, isLocal } = props
    //const {}
    const realUrl = ()=>{
        if(isLocal){
            return src
        }
        return getUrl(type,`${src}?width=${width}&height=${height}`)
    }
    return (
       <img
        src={`${realUrl()}`}
        width={width}
        height={height}
        className={className}
        alt=""
        style={{...props.style}}/>
    )
}