import { IRoute } from 'umi';

const modelRoutes: IRoute = {
  name: '模型管理 ',
  path:'/model/',
  routes: [
    {
      path: '/model/add',
      component: './schema/Add',
    },
    {
      path: '/model/list',
      component: './schema/List',
    },
  ],
};

export default modelRoutes;
