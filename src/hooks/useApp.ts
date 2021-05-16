import { App } from '@/types' //引入APP类型
import getQuery from '@/utils/qsHelper'
import { useModel } from 'umi'

//使用APP
export default function useApp(){
    //使用全局初始化的应用数组
    const apps = useModel("@@initialState").initialState?.apps
    //解构window对中的location 属性
    const {location} = window
    //获取当前页
    const  getCurrentPages = () =>{
        const query = getQuery<{appId?:number;app?:string}>()

        let app
        if(query.appId || query.app){

            app = apps?.find((a:App) => a.id === query.appId || a.eName === query.app)
        }else{
            const pathName = location.pathname.split('/')
            if(pathName.length > 1){
                app = apps?.find((a:App)=> pathName.includes(a.eName?.toLocaleLowerCase() || '' ))
            }

        }
        return app
    }
    return {currentApp:getCurrentPages() || {id:0}}
    

}

