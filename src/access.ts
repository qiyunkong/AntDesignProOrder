/**
 * @see https://umijs.org/zh-CN/plugins/plugin-access
 * */
export default function access(initialState: { currentUser?: API.CurrentUser | undefined }) {
  const { currentUser } = initialState || {};
  return {
    canAdmin: currentUser && currentUser.access === 'admin', 
  };
}


/*
  accessv 导出的方法会在项目初始化时被执行
    返回是一个对象 每一个属性就是权限如果是true就为有
    每个路由都设置权限，通过服务器返回的菜单来调整
    canAdmin admin 

*/