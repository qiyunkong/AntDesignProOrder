import { IRoute } from 'umi';

const modelRoutes: IRoute = {
  name: '模型管理 ',
  path: '/model/',
  routes: [
    {
      path: '/model/Add',
      component: './schema/Add',
    },
    {
      path: '/model/List',
      component: './schema/List',
    },
  ],
};

export default modelRoutes;
