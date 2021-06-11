import { IRoute } from 'umi';

const serverRoutes: IRoute = {
  name: '业务管理',
  path:'/server/',
  routes: [
    {
      path: '/server/order',
      component: './order',
    },
    {
      path: '/server/product',
      component: './product/List',
    },
    {
      path:'/server/product/Edit',
      component:'./product/Edit'
    },
    {
      path:'/server/product/Add',
      component:'./product/Add'
    }
  ],
};

export default serverRoutes;
