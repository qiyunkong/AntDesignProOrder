export default [
  {
    path: '/user',
    layout: false,
    routes: [
      {
        path: '/user',
        routes: [
          {
            name: 'login',
            path: '/user/login',
            component: './user/Login',
          },
        ],
      },
    ],
  },
  {
    path: '/welcome',
    name: 'home',
    icon: 'smile',
    component: './welcome',
  },
  {
    path: '/admin',
    name: '管理页',
    icon: 'crown',
    access: 'canAdmin',  
    component: './Admin',
    routes: [
      {
        path: '/admin/sub-page',
        name: '二级管理页',
        icon: 'smile',
        component: './welcome',
      },
    ],
  },
  {
    path: '/admin',
    name: '系统配置',
    icon: 'crown',
    access: 'canAdmin',  
    component: './Admin',
    routes: [
      {
        path: '/admin/sub-page',
        name: '二级管理页',
        icon: 'smile',
        component: './welcome',
      },
    ],
  },
  {
    name: '表格管理',
    icon: 'table',
    path: '/list',
    component: './TableList',
  },
  {
    path: '/',
    redirect: '/welcome',
  },
  {
    component: './404',
  },
];


/*
  name:菜单的名称
  icon:图标
  component:组件入径
  redirect:重定向
  path:路由名称

*/