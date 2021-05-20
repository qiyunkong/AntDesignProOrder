import { IRoute } from 'umi';

const organizationRoutes: IRoute = {
  name: '组织架构 ',
  path: '/organization',
  routes: [
    {
      path: '/organization/category',
      component: './category',
    },
    {
      path: '/organization/tag',
      component: './tag',
    },
    {
      path: '/organization/user',
      component: './user/List',
    },
    {
      path:'/organization/role',
      component:'./role'
    }
  ],
};

export default organizationRoutes;