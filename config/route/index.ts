import  {IConfig}    from 'umi'
import  userRoutes   from './userRoutes'
import  systemRoutes from './systemRoutes'
import  serverRoutes from './serverRoutes'
import organizationRoutes from './organizationRoutes'
import modelRoutes from './modelRoutes'
const routes:IConfig['routes'] = [
    userRoutes,
    organizationRoutes,
    serverRoutes,
    modelRoutes,
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
