## 项目需求

1. 主题修改 官网链接[https://preview.pro.ant.design/]

   > 配置
   >
   > ```json
   > {
   >   "navTheme": "light",
   >   "primaryColor": "#13C2C2",
   >   "layout": "side",
   >   "contentWidth": "Fluid",
   >   "fixedHeader": false,
   >   "fixSiderbar": true,
   >   "title": "Ant Design Pro",
   >   "pwa": false,
   >   "iconfontUrl": "",
   >   "menu": { "locale": true },
   >   "headerHeight": 48
   > }
   > ```

2. 路由权限控制

3. 异步组件

4. 修改菜单图标 配置 logo 图标修改

## 项目结构

## 项目问题

## 项目页面

## 项目中的不解代码

src:`src\utils\bem.ts\gen` src:`src\utils\bem.ts\createBEM`

## TS 中的踩坑处

解构对象不使用会报错

## 知识盲区

### decodeURIComponent()

类型：函数作用:对编码后的 URL 进行解码 详情：

### Proxy

作用:代理博客：`https://www.jianshu.com/p/77eaaf34e732` 官网：`https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Proxy`

### Object.keys()

作用:返回一组键名字符串类型数组官网:`https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/keys`

### toLowerCase()

类型：函数作用:小写官网：

### GlobalObject

作用:全局对象官网：

### antd Grid 栅格

作用：栅格系统 gutterp[x,y] 官方：`https://ant.design/components/grid-cn/#Col`

### startsWith()

类型：函数作用：检测字符串是否以指定的子字符串开始。三方：http://www.w3school.me/jsref/jsref-startswith.html 官方：

## web API

### 应用列表数量-接口数据

Method:`GET` Response:Number URL:`http://webapi.mangxu.cn/api/app`

### 激活用户数量-接口数据

Method:`GET` Response:Number URL:`http://webapi.mangxu.cn/api/user/authorization/total`

### 总共用户数量-接口数据

Method:`GET` Response:Number URL:`http://webapi.mangxu.cn/api/user/total`

#### 上班神曲

##### 网易云--运动

URL:`https://music.163.com/#/playlist?id=2829779628`

## ant design pro

5.6 日编写了 系统 page 上传图标组件

图标 https://ant.design/components/icon-cn/

route 路由的文件

ProCard 组件 https://www.npmjs.com/package/@ant-design/pro-card

Popconfirm 气泡确认框 https://ant.design/components/popconfirm-cn/#header

5.7

Hook 下的文件夹组件的使用的方法 components 组件文件
