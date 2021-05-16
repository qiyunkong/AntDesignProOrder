import {IConfig} from 'umi'
import  userRoutes  from './userRoutes'
import  systemRoutes from './systemRoutes'
const routes:IConfig['routes'] = [
    userRoutes,            
    systemRoutes,         
    {
        path:'/',
        name:'后台首页',
        component:'./welcome'
    },
    {
        component: './404',
    },
    
]


export default routes