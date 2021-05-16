import Image from '@/components/Business/Image'
import React,{ReactNode} from 'react'

interface MxIconProps{
    icon?:ReactNode
    className?:string
    size:number
    redius?:number
    isLocal?:boolean
}
export default function MxIcon(props:MxIconProps){
    const {icon, className, size, redius, isLocal} = props
    if(!icon) return <></>
    if(typeof icon === 'string'){
        return (
            <Image
                type="icon"
                src={icon || ''}
                className={className}
                width={size}
                height={size}
                isLocal={isLocal}
                style={{borderRadius:redius || 0}}
                />
        )
    }

    return <>{icon}</>
}