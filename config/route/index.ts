import  {IConfig}    from 'umi'
import  userRoutes   from './userRoutes'
import  systemRoutes from './systemRoutes'
import  serverRoutes from './serverRoutes'
import organizationRoutes from './organizationRoutes'
const routes:IConfig['routes'] = [
    userRoutes,
    organizationRoutes,
    serverRoutes,
    systemRoutes,      
    {
        path:'/',
        name:'系统首页',
        component:'./welcome'
    },
    {
        component: './404',
    },
    
]


export default routes