import { IRoute } from 'umi';

const serverRoutes: IRoute = {
  name: '业务管理',
  routes: [
    {
      path: '/order',
      component: './order',
    },
    {
      path: '/product',
      component: './product/List',
    },
    {
      path:'/product/Edit',
      component:'./product/Edit'
    }
  ],
};

export default serverRoutes;
