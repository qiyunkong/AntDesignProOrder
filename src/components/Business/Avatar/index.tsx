import useFile from '@/hooks/useFile' //文件模块
import {Avatar} from 'antd'
import { AvatarProps } from 'antd/lib/skeleton/Avatar'
import React from 'react'

interface MxAvatarParops extends AvatarProps{
    userId:number
}

export default function MxAvatar(props:MxAvatarParops){
   const {getAvatarUrl} = useFile(); 
   const {userId,size,...rest} = props
   let sizevar = 32
   if(typeof size === 'number'){
       sizevar = size
   }else{
        switch(size){
            case 'large':
                sizevar = 128
                break
            case  'small':
                sizevar = 32
                break
            default:
            case 'default':
                sizevar = 64
                break        

        }
   }

   return <Avatar src={getAvatarUrl(userId, sizevar)}  size={size} {...rest}/>

}

