import {parse,stringify} from 'qs'
import {history} from 'umi'
import useApp from './useApp'

const getQuery = () =>{
    const {href} = window.location
    const qsIndex = href.indexOf('?')
    if(qsIndex !== -1){
        return parse(href.split('?')[1])
    }
    return {}
}

export default function useRouter(){
    const {currentApp} = useApp()
    const reloadPage = (params:Object = {})=>{
        const query = {...getQuery(),...params}
        const querystring = stringify(query)
        history.replace(`${history.location.pathname}?${querystring}`)
    }
    interface LoadPageOption{
        isReplace:boolean
    }
    const loadPage = (url?:string,query?:{[name:string]:any},option?:LoadPageOption) =>{
        const querystring = query ? `?${stringify(query)}` : ''
        let pathName = url || history.location.pathname

        if(pathName.startsWith('/') && currentApp.id && pathName !== '/' && !!url){
            pathName = `/${currentApp.eName}${pathName}`
        }
        if(option?.isReplace){
            history.replace(pathName + querystring)
        }else{
            history.replace(pathName + querystring)
        }
    }
    const goBack = () =>{
        history.goBack()
    }
    return {
        reloadPage,
        loadPage,
        goBack
    }

}