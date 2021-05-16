import {PageList} from '@/types'
import getQuery from '@/utils/qsHelper'
import {useEffect,useRef,useState} from 'react'
import useRouter from './useRouter'

export default function useRequset<T>(
    service:(params:any) => Promise<T>,

    options?:{
        manual?:boolean
        refreshDeps?:any[]
        defaultValue?:T
        delay:number,
        callback?:(res:any) => any
        checkPageData?:boolean
        params?:any
    },
){
    const router = useRouter()
    // react hook 变量
    const [loading,setLoading] = useState<any>(false)
    const [data,setData] = useState<any>(options?.defaultValue)

    //
    const timer = useRef<any>()


    const run = async () =>{
        if(options?.delay){
            timer.current = setTimeout(()=>{
                setLoading(true)
            },options.delay)
        }else{
            setLoading(true)
        }
        const res = await service(options?.params)
        if(res){
            if(options?.checkPageData){
                const checkData = (res as unknown) as PageList<any>
                const parameter = getQuery<any>()
                if(!checkData.data?.length && (parameter.current || 1 ) > 1){
                    router.loadPage(undefined,{...(parameter as any),current:1})
                }
            }
            setData(res)
            if(options?.callback) options.callback(res)
        }
        if(timer.current){
            clearTimeout(timer.current)
        }
        setLoading(false)
        return res;
    }

    useEffect(()=>{
        if(!options?.manual){
            run()
        }
    },options?.refreshDeps || [])
    return {
        loading,
        data:data as T,

    }
}


/***
 * 新的环境，会交到的新的朋友，
 * 如果你的朋友没有变化,
 * 但是你的朋友交道了新的朋友,
 * 那你们应该不会在是朋友了,
 * 或者说是一种熟悉的陌生人的关系?
 * 
 */