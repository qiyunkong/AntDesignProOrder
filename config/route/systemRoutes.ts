import {IRoute} from 'umi'

const systemRoutes:IRoute = {
    name:'系统管理',
    path:'/system',
    routes:[

        {
            name: '表格管理',
            icon: 'table',
            path: '/list',
            component: './TableList',
        },
        {
            name:'授权配置',
            path:'configs',
            access: 'canAdmin',  
            exact:true,
            component:'./system/config',
        },
        {
            name:'系统配置',
            path:'settings',
            access: 'canAdmin',  
            exact:true,
            component:'./system/setting',
        },
        {
            name:'日志管理',
            path:'log',
            exact:true,
            component:'./system/setting',
        }

    ]
}

export default systemRoutes