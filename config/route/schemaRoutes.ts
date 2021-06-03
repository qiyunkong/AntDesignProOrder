import { IRoute } from 'umi';

const modelRoutes: IRoute = {
  name: '模型数据 ',
  path:'/schema/',
  routes: [
    {
      path: '/schema/:view',
      component: './schema/View',
    },
  ],
};

export default modelRoutes;
