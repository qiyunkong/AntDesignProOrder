import { User, System } from '@/types';
import { notification } from 'antd';
import { history, Link } from 'umi';
import type { RequestConfig } from 'umi';
import Footer from '@/components/Footer';
import {tokenIt} from '@/utils/authority';
import fixMenuItemIcon from '@/utils/utils';
import type { ResponseError } from 'umi-request';
import { PageLoading } from '@ant-design/pro-layout';
import RightContent from '@/components/RightContent';
import type { MenuDataItem } from '@ant-design/pro-layout';
import { BookOutlined, LinkOutlined } from '@ant-design/icons';
import { currentUser as queryCurrentUser ,fetchMenuData,getSetting } from './services/ganfanhun';
import type {BasicLayoutProps, Settings as LayoutSettings } from '@ant-design/pro-layout';






const isDev = process.env.NODE_ENV === 'development';
const loginPath = '/user/login';

/** 获取用户信息比较慢的时候会展示一个 loading */
export const initialStateConfig = {
  loading: <PageLoading />,
};

/**
 * @see  https://umijs.org/zh-CN/plugins/plugin-initial-state
 * */
export async function getInitialState(): Promise<{
  settings?: Partial<LayoutSettings>;
  currentUser?: User;
  menuData?: MenuDataItem[];
  fetchUserInfo?: () => Promise<User| undefined>;
  appSettings?:System
}> {
  const fetchUserInfo = async () => {
    try {
      //请求当前用户的信息
      const {data} = await queryCurrentUser();
      //并且返回
      return data;
    } catch (error) {
      //没有请求到当前用户信息就回登录页面url
      history.push(loginPath);
    }
    return undefined;
  };
  const {data} = await getSetting(); //获取网站配置
  console.log(data);
  // 如果是登录页面，不执行
  if (history.location.pathname !== loginPath) {
    const currentUser = await fetchUserInfo(); //获取当前用户
    const menuData  = await fetchMenuData(currentUser); //获取菜单 || 获取当用户的菜单
    console.log("===>",menuData)
    //console.log(data)
    return {
      fetchUserInfo,
      currentUser,
      menuData:menuData,
      settings: {},
      appSettings:data
    };
  }
  return {
    fetchUserInfo,
    menuData: [],
    settings: {},
    appSettings:data
  };
}


// https://umijs.org/zh-CN/plugins/plugin-layout
export const layout = ({ initialState }: {
  initialState: { settings?: LayoutSettings; currentUser?:User; menuData: MenuDataItem[]; };
}):BasicLayoutProps  => {
  return {
    rightContentRender: () => <RightContent />,
    disableContentMargin: false,
    waterMarkProps: {
      content: initialState?.currentUser?.nickName,
    },
    //业务组件 页脚
    footerRender: () => <Footer />,
    onPageChange: () => {
      const { location } = history;
      // 如果没有登录，重定向到 login
      if (!initialState?.currentUser && location.pathname !== loginPath) {
        history.push(loginPath);
      }
    },
    links: isDev
      ? [
          <Link to="/umi/plugin/openapi" target="_blank">
            <LinkOutlined />
            <span>openAPI 文档</span>
          </Link>,
          <Link to="/~docs">
            <BookOutlined />
            <span>业务组件文档</span>
          </Link>,
        ]
      : [],
    //顶部菜单
    menuHeaderRender: undefined,
    // 自定义 403 页面
    // unAccessible: <div>unAccessible</div>,
    ...initialState?.settings,
    menuDataRender: ()=>fixMenuItemIcon(initialState.menuData),

  };
};






const codeMessage = {
  200: '服务器成功返回请求的数据。',
  201: '新建或修改数据成功。',
  202: '一个请求已经进入后台排队（异步任务）。',
  204: '删除数据成功。',
  400: '发出的请求有错误，服务器没有进行新建或修改数据的操作。',
  401: '用户没有权限（令牌、用户名、密码错误）。',
  403: '用户得到授权，但是访问是被禁止的。',
  404: '发出的请求针对的是不存在的记录，服务器没有进行操作。',
  405: '请求方法不被允许。',
  406: '请求的格式不可得。',
  410: '请求的资源被永久删除，且不会再得到的。',
  422: '当创建一个对象时，发生一个验证错误。',
  500: '服务器发生错误，请检查服务器。',
  502: '网关错误。',
  503: '服务不可用，服务器暂时过载或维护。',
  504: '网关超时。',
};

/** 异常处理程序
 * @see https://beta-pro.ant.design/docs/request-cn
 */
const errorHandler = (error: ResponseError) => {
  const { response } = error;
  if (response && response.status) {
    const errorText = codeMessage[response.status] || response.statusText;
    const { status, url } = response;

    notification.error({
      message: `请求错误 ${status}: ${url}`,
      description: errorText,
    });
  }

  if (!response) {
    notification.error({
      description: '您的网络发生异常，无法连接服务器',
      message: '网络异常',
    });
  }
  throw error;
};

// https://umijs.org/zh-CN/plugins/plugin-request
export const request: RequestConfig = {
  errorHandler,
  requestInterceptors:[
    tokenIt
  ]
};



/*
  app.tsx
    getInitialState  会在整个应用最开始执行，返回值会作为全局共享的数据
*/
