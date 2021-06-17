import { Settings as LayoutSettings } from '@ant-design/pro-layout';
import { useModel } from 'umi';
// const { setInitialState } = useModel('@@initialState');
// const {appSettings} = setInitialState
// const logo = `${appSettings.staticSrc}${appSettings.logo}`
const Settings: LayoutSettings & {
  pwa?: boolean;
  logo?: string;
} = {
  navTheme: 'light',
  primaryColor: '#13C2C2',
  layout: 'side',
  contentWidth: 'Fluid',
  fixedHeader: true,
  fixSiderbar: true,
  colorWeak: false,
  title: '干饭庄平台',
  pwa: false,
  logo: 'http://192.168.19.1:8000/logo.svg',
  iconfontUrl: '',
  menu: {
    locale: false,
  },
  headerHeight: 48,
};
//导出配置
export default Settings;
//
