import {IRoute} from 'umi'
const systemRoutes:IRoute = {
    path:'/user',
    layout:false,

    routes: [
      {
        path: '/user',
        routes: [
          {
            name: 'login',
            path: '/user/login',
            component: './user/Login',
            exact:true,
          },
        ],
      },
    ],
}

export default systemRoutes