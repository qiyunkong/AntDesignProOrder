import { IRoute } from 'umi';

const systemRoutes: IRoute = {
  name: '系统管理',
  path:'/system/',
  routes: [
    {
      name: '菜单配置',
      path: '/system/menu',
      component: './config/Menu',
    },
    {
      name: '系统配置',
      path: '/system/setting',
      component: './config/System',
    },
    {
      name: '日志管理',
      path: '/system/log',
      component: './log',
    }
  ],
};

export default systemRoutes;
