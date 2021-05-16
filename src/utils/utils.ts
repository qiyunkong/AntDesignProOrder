
import React from 'react';
import { MenuDataItem } from '@ant-design/pro-layout';
import * as allIcons from '@ant-design/icons';

/* eslint no-useless-escape:0 import/prefer-default-export:0 */
const reg = /(((^https?:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+(?::\d+)?|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)$/;


// FIX从接口获取菜单时icon为string类型
const fixMenuItemIcon = (menus: MenuDataItem[], iconType='Outlined'): MenuDataItem[] => {
  menus.forEach((item) => {
    const {icon, children} = item
    if (typeof icon === 'string') {
      let fixIconName = icon.slice(0,1).toLocaleUpperCase()+icon.slice(1) + iconType
      item.icon = React.createElement(allIcons[fixIconName] || allIcons[icon])
    }
    children && children.length>0 ? item.children = fixMenuItemIcon(children) : null
  });
  return menus
};

export default fixMenuItemIcon;

export const isUrl = (path: string): boolean => reg.test(path);

export const isAntDesignPro = (): boolean => {
  if (ANT_DESIGN_PRO_ONLY_DO_NOT_USE_IN_YOUR_PRODUCTION === 'site') {
    return true;
  }
  return window.location.hostname === 'preview.pro.ant.design';
};

// 给官方演示站点用，用于关闭真实开发环境不需要使用的特性
export const isAntDesignProOrDev = (): boolean => {
  const { NODE_ENV } = process.env;
  if (NODE_ENV === 'development') {
    return true;
  }
  return isAntDesignPro();
};

// 对象忽略大小写的代理
export function ignoreCaseProxy(aim: any) {
  //target:目标,key:键名,value:值
  return new Proxy(aim, {
    get(target, key: string) {
      let result
      Object.keys(target).forEach((targetKey) => {
        //键小写相同 就返回 值
        if (key.toString().toLowerCase() === targetKey.toString().toLowerCase()) {
          result = target[targetKey]
        }
      })
      return result
    },
    set(target, key, value) {
      Object.keys(target).forEach((targetKey) => {
        //键小写相同 就设值
        if (key.toString().toLowerCase() === targetKey.toLowerCase()) {
          target[targetKey] = value
        }
      })
      return Reflect.set(target, key, value)
    },
  })
}
