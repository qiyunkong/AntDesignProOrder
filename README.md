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

2. 路由权限控制，访问路由触发的函数，路由的全局对象 [https://beta-pro.ant.design/docs/authority-management-cn]

3. 异步组件

4. 修改菜单图标 配置 logo 图标修改

5. 去国际化问题，关闭没有效果

6. config/proxy.ts 进行代理，可以解决跨域问题

7. 代码规范设计 

   - post 参数命名为 body
   - get  参数命名为  params

8. 统一数据返回格式并使用TS接口声明一个基类

9. 泛型的 复用性会大大提升，以及性能上的提升。

10. less 样式设计 面向对象设计，增加复用新

## 项目结构

## 项目问题

## 项目页面

## 项目参考

官网：https://beta-pro.ant.design/

个人张立志博客：https://www.yuque.com/aspirantzhang/antdprov5/

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
