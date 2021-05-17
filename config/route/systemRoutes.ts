import { IRoute } from 'umi';

const systemRoutes: IRoute = {
  name: '系统管理',
  routes: [
    {
      name: '表格管理',
      icon: 'table',
      path: '/list',
      component: './TableList',
    },
    {
      name: '菜单配置',
      icon: 'table',
      path: '/system/menu',
      exact: true,
      component: './system/menu',
    },
    {
      name: '授权配置',
      path: '/system/config',
      access: 'canAdmin',
      exact: true,
      component: './system/config',
    },
    {
      name: '系统配置',
      path: '/system/setting',
      access: 'canAdmin',
      exact: true,
      component: './system/setting',
    },
    {
      name: '日志管理',
      path: 'log',
      exact: true,
      component: './system/setting',
    },
  ],
};

export default systemRoutes;
