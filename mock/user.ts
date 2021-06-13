import { Request, Response } from 'express';

//模仿延迟web服务
const waitTime = (time: number = 100) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, time);
  });
};

//
async function getFakeCaptcha(req: Request, res: Response) {
  await waitTime(2000);
  return res.json('captcha-xxx');
}

const { ANT_DESIGN_PRO_ONLY_DO_NOT_USE_IN_YOUR_PRODUCTION } = process.env;

/**
 * 当前用户的权限，如果为空代表没登录
 * current user access， if is '', user need login
 * 如果是 pro 的预览，默认是有权限的
 */
let access = ANT_DESIGN_PRO_ONLY_DO_NOT_USE_IN_YOUR_PRODUCTION === 'site' ? 'admin' : '';

//权限
const getAccess = () => {
  return access;
};

//管理员菜单
const adminMenu = [
  {
    path: '/',
    name: '系统首页',
    icon: 'HomeOutlined',
  },
  {
    name: '业务管理',
    icon: 'ShopOutlined',
    children: [
      {
        path: '/server/order',
        name: '订单管理',
      },
      {
        path: '/server/product',
        name: '商品管理',
      },
      {
        path: '/server/like',
        name: '点赞管理',
      },
      {
        path: '/server/equipment',
        name: '设备管理',
      },
    ],
  },
  {
    name: '组织架构',
    icon: 'ApartmentOutlined',
    children: [
      {
        path: '/organization/user',
        name: '用户管理',
      },
      {
        path: '/organization/category',
        name: '分类管理',
      },
      {
        path: '/organization/role',
        name: '角色管理',
      },
      {
        path: '/organization/tag',
        name: '标签管理',
      },
    ],
  },
  {
    name: '系统管理',
    icon: 'SettingFilled',
    children: [
      {
        path: '/system/setting',
        name: '系统配置',
      },
      {
        path: '/system/log',
        name: '系统日志',
      },
      {
        path: '/system/empower',
        name: '授权配置',
      },
      {
        path: '/system/menu',
        name: '菜单配置',
      },
      {
        path: '/system/notice',
        name: '轮播配置',
      },
    ],
  },
  {
    name: '数据统计',
    icon: 'dashboard',
    children: [
      {
        path: '/echarts/line',
        name: '折线展示',
      },
      {
        path: '/echarts/pie',
        name: '饼形展示',
      },
      {
        path: '/echarts/bar',
        name: '柱形展示',
      },
    ],
  },
];
//用户菜单
const userMenu = [
  {
    path: '/',
    name: '后台首页',
    icon: 'dashboard',
  },
];

// 代码中会兼容本地 service mock 以及部署站点的静态数据
export default {
  // 支持值为 Object 和 Array
  'GET /api/currentUser': (req: Request, res: Response) => {
    if (!getAccess()) {
      res.status(401).send({
        data: {
          isLogin: false,
        },
        errorCode: '401',
        errorMessage: '请先登录！',
        success: true,
      });
      return;
    }
    res.send({
      name: 'Serati Ma',
      avatar: 'https://gw.alipayobjects.com/zos/antfincdn/XAosXuNZyF/BiazfanxmamNRoxxVxka.png',
      userid: '00000001',
      email: 'antdesign@alipay.com',
      signature: '海纳百川，有容乃大',
      title: '交互专家',
      group: '蚂蚁金服－某某某事业群－某某平台部－某某技术部－UED',
      tags: [
        {
          key: '0',
          label: '很有想法的',
        },
        {
          key: '1',
          label: '专注设计',
        },
        {
          key: '2',
          label: '辣~',
        },
        {
          key: '3',
          label: '大长腿',
        },
        {
          key: '4',
          label: '川妹子',
        },
        {
          key: '5',
          label: '海纳百川',
        },
      ],
      notifyCount: 12,
      unreadCount: 11,
      country: 'China',
      access: getAccess(),
      geographic: {
        province: {
          label: '浙江省',
          key: '330000',
        },
        city: {
          label: '杭州市',
          key: '330100',
        },
      },
      address: '西湖区工专路 77 号',
      phone: '0752-268888888',
    });
  },
  // GET POST 可省略
  'GET /api/dev/users': [
    {
      key: '1',
      name: 'John Brown',
      age: 32,
      address: 'New York No. 1 Lake Park',
    },
    {
      key: '2',
      name: 'Jim Green',
      age: 42,
      address: 'London No. 1 Lake Park',
    },
    {
      key: '3',
      name: 'Joe Black',
      age: 32,
      address: 'Sidney No. 1 Lake Park',
    },
  ],

  //返回客户端:用户菜单
  'POST /api/menuData': async (req: Request, res: Response) => {
    const { access } = req.body;

    await waitTime(2000);
    if (access == 'admin') {
      console.log('admin', access);
      res.send(adminMenu);
    } else {
      console.log('user', access);
      res.send(userMenu);
    }
  },

  //返回客户端：总用户量
  'GET /api/user/total': (req: Request, res: Response) => {
    //res.send 不能传number字面量,会当http状态值
    res.send('2544');
  },

  //返回客户端:激活用户
  'GET /api/user/authorization/total': (req: Request, res: Response) => {
    res.send('1043');
  },

  //返回客户端：日访问量 /api/user/organization
  'GET /api/user/organization': (req: Request, res: Response) => {
    res.send('1043');
  },

  //
  'GET /api/log/statistic/total': (req: Request, res: Response) => {
    console.log(req.query);
    res.send('1368');
  },

  //用户登录
  'POST /api/login/account': async (req: Request, res: Response) => {
    const { password, username, type } = req.body;
    await waitTime(2000);
    if (password === 'admin' && username === 'admin') {
      res.send({
        status: 'ok',
        type,
        currentAuthority: 'admin',
      });
      access = 'admin';
      return;
    }
    if (password === 'user' && username === 'user') {
      res.send({
        status: 'ok',
        type,
        currentAuthority: 'user',
      });
      access = 'user';
      return;
    }
    if (type === 'mobile') {
      res.send({
        status: 'ok',
        type,
        currentAuthority: 'admin',
      });
      access = 'admin';
      return;
    }

    res.send({
      status: 'error',
      type,
      currentAuthority: 'guest',
    });
    access = 'guest';
  },

  //退出登录
  'POST /api/login/outLogin': (req: Request, res: Response) => {
    access = '';
    res.send({ data: {}, success: true });
  },

  'POST /api/register': (req: Request, res: Response) => {
    res.send({ status: 'ok', currentAuthority: 'user', success: true });
  },
  'GET /api/500': (req: Request, res: Response) => {
    res.status(500).send({
      timestamp: 1513932555104,
      status: 500,
      error: 'error',
      message: 'error',
      path: '/base/category/list',
    });
  },
  'GET /api/404': (req: Request, res: Response) => {
    res.status(404).send({
      timestamp: 1513932643431,
      status: 404,
      error: 'Not Found',
      message: 'No message available',
      path: '/base/category/list/2121212',
    });
  },
  'GET /api/403': (req: Request, res: Response) => {
    res.status(403).send({
      timestamp: 1513932555104,
      status: 403,
      error: 'Unauthorized',
      message: 'Unauthorized',
      path: '/base/category/list',
    });
  },
  'GET /api/401': (req: Request, res: Response) => {
    res.status(401).send({
      timestamp: 1513932555104,
      status: 401,
      error: 'Unauthorized',
      message: 'Unauthorized',
      path: '/base/category/list',
    });
  },

  'GET  /api/login/captcha': getFakeCaptcha,
};
