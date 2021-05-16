import {FileType} from '@/types'
import {useModel} from 'umi'

export default function useFile(){
    const settings = useModel("@@initialState").initialState?.appSettings
    
    //获取url  type:文件类型  path:字符串
    const getUrl = (type:FileType,path?:string) =>{
        path = path || ''
        if(
            path.toString().startsWith('http://') ||
            path.toString().startsWith('https://') ||
            path.toString().startsWith('//:') 
        ){
            return path
        }

        switch(type){
            case 'file':
            case 'image':
            case 'icon':
            case 'avater':
                return `${settings?.staticServer}/${path}`
            default:
                return `${settings?.staticServer}/image/${path}`            
        }
    }
    
    //请求资源切换
    const getAvatarUrl = (userId:number,size:number = 128)  =>{
        return `${settings?.staticServer}/avatar/${userId}/${size}.png`
    }

    return {
        getUrl,
        getAvatarUrl,
    }
}