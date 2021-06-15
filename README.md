# Ant Design Pro

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

6. FormattedMessage 组件是国际化组件， useIntl 使用

7. config/proxy.ts 进行代理，可以解决跨域问题

8. 代码规范设计 

   - post 参数命名为 body
   - get  参数命名为  params

9. 统一数据返回格式并使用TS接口声明一个基类

10. 泛型的 复用性会大大提升，以及性能上的提升。

11. less 样式设计 面向对象设计，增加复用新

12. 服务端修改页面logo，页面标题， icon

13. 使用token 验证用户 请求拦截器

14. 更新分类模块 取消问题， 更新根据ID值怎么去更新操作

15. 高级组件中 modalPro 显示状态问题 确定 和取消按钮问题

16. 表格不展示ID列

17. 发起GET请求时 路由对象的使用  pages切换  在?后拼接参数

18. 用户信息没有展示的问题

19. 搭建面包屑

20. 网站刷新右侧菜单不高亮BUG

21. (动态路由)[https://www.cnblogs.com/MrZhujl/p/13331116.html]

## 项目结构

## 项目问题

1. git commit -m "备注" 提交失败，报错：git提交失败——running pre-commit hook: lint-staged <a href="https://blog.csdn.net/zhan_lang/article/details/88691279">解放方案</a>

2. util.js:18 async-validator: ["请输入undefined"] 黄色警告

3. devScripts.js:6523 Warning: Form already set 'initialValues' with path 'name'. Field can not overwrite it.红色报错

4. > 黄色 运行警告 处理时间
   >
   > [Violation] 'requestAnimationFrame' handler took <N>ms
   > index.js:31 [Violation] 'requestAnimationFrame' handler took 137ms
   > index.js:31 [Violation] 'requestAnimationFrame' handler took 87ms
   > index.js:31 [Violation] 'requestAnimationFrame' handler took 66ms
   > index.js:31 [Violation] 'requestAnimationFrame' handler took 95ms
   > index.js:31 [Violation] 'requestAnimationFrame' handler took 59ms
   > index.js:31 [Violation] 'requestAnimationFrame' handler took 55ms
   > index.js:31 [Violation] 'requestAnimationFrame' handler took 120ms
   
5. 表格泛型不可以定义children命名规则   [解决方案](https://stackoverflow.com/questions/65890189/typeerror-data-foreach-is-not-a-function)

6. 组件状态剥离



## 笔记使用

```
[描述](http) == a标签
```

## 项目页面

表格规格 表格组件的参数说明

```js
const colums = {
	  title: '分类名称',  //表头名称
      dataIndex: 'name', //绑定接口数据源键值
      tip: '规则名称是唯一的 key', //提示语
      valueEnum:"枚举"
      render: (dom, entity) => {  //回调事件
        return (
          <a
            onClick={() => {
              setCurrentRow(entity);
              setShowDetail(true);
            }}
          >
            {dom}
          </a>
        );
      },
}
```

ProTable 组件使用 

```
//表格标题
headerTitle

```

token 的使用 获取当前用户  [参考案例](https://blog.csdn.net/Violent_clown/article/details/108468950)

```js
return request<API.CurrentUser>('/api/account/currentUser', {
    method: 'GET',
    ...(options || {}),
});
```

表格的回调函数

①首先声明`hook`的变量是一个全局的`opId `
②当点击`查看子分类`时触发事件 执行`setOpID `函数，在使用`声明周期函数useEffect`监听`opId `变化
③执行表格数据的渲染函数 对象.run()

```

```

ant design pro  IP 端口修改  

```json
ipconfig  WLAN IP 
"start": "cross-env UMI_ENV=dev umi dev --HOST=10.12.249.0",

```

[图表组件](https://v2-pro.ant.design/components/charts-cn/)







## 项目参考

官网：https://beta-pro.ant.design/

个人张立志博客：https://www.yuque.com/aspirantzhang/antdprov5/  学习参考

芒旭项目：

​	Router 使用	/hooks/useRouter 

​    表格 自定义表格 表格头  pages/form/data/index.tsx  [学习案例](https://blog.csdn.net/jenie/article/details/106248150)

​     pro表格  pages/order/index.tsx  



核心动态模型开发参考案例



//https://www.cnblogs.com/guapitomjoy/p/12044141.html 小程序本地存储

小程序点击两次商品会添加两次

项目正常：

1. 商品批量删除正常
2. 分类批量删除正常
3. 分类查询操作正常
4. 商品添加操作正常   /  没有跳转列表页面
5. 修改

​	





















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







明台jquery

```js
/**
	· 全局参数 pageData:{currentUser,settings,...query,...初始化数据,...formData}
  · 全局参数 formHandler:FormInstance form表单的ref视图页面没有此属性
  · 可用组件名称+Onload获取载入事件。例：function componentNameOnload(data){}
*/

/tak
function Link(parameters){
            const  {elementId,url} = parameters
            this.obj =  document.getElementById(elementId);
            this.init = function(){
                this.initEvent();
            }
            this.initEvent = function(){
                this.obj.onclick = function toURL(){
                    if(url){
                      console.log(url)
                      history.pushState(null,null,url);
                      history.pushState(null,null,url);
                    }
                     history.back();
                }

            }
  }
new Link({
   elementId:"goback",
   }).init();

new Link({
 elementId:"goadd",
 url:"/pianoroom/form/?formId=510"
 }).init();
function goURL(url){
    if(url){
      console.log(url)
      history.pushState(null,null,url);
      history.pushState(null,null,url);
    }
     history.back();
}
```

home

```js
// init()
//  function init(){
//     new linkBox("#linkBox_1").init();
//     new linkBox("#linkBox_2").init();  
//  }
//  function linkBox(boxId){
//     this.boxObj = $(boxId);
//     var  itemObj = this.boxObj.children().eq(1)
//      // router.loadPage('/form',{formId:'aaa'})
//     this.init = function(){
//         headEvent()
//     }
//     function headEvent(){
//         itemObj.children().click(toURL)
//     }
 //    function toURL(){
 //      	if($(this).data('url')!= ""){
 //          	router.loadPage($(this).data('url'));
 //        }
 //    }
 // }


function toURL(url){
    if(url!= ""){
        router.loadPage(url);
    }
}




// var userId;
// // console.log(document.referrer);
// function ModalTips(parameters){
//     let  {elementId,onOk,onNo,modalvisible,showModal} = parameters
//     this.obj = $(elementId);
    
//     this.init = function(){
//         this.setIsModalVisible(modalvisible);
//         this.initEvent();
//     }

//     this.initEvent = function(){
//         this.obj.on("click",(e)=>{
//             console.log(e.target.className);
//             console.log(this);
//             switch(e.target.id){
//                 case "onOK":
//                     onOk(e.target,this) 
//                     break
//                 case "onNO":
//                     onNo(e.target,this) 
//                     break
//                 case "showModal":
//                     showModal(e.target,this) 
//                     break      
//                 default:
//                     console.log("元素id问题");
//                     break
//             }
//         })
//     }

//     this.setIsModalVisible = function(state){
//         this.obj.css("display",`${state?"block":"none"}`);
//     }
// }

//  var modal = new ModalTips({
//     elementId:"#modal-tips",
//     onOk:function(obj,that){
//         that.setIsModalVisible(false);
//         router.loadPage("/flow/?flowId=285")
//     },
//     onNo:function(obj,that){
//         that.setIsModalVisible(false);
//     },
//     showModal:function(obj,that){
//         that.setIsModalVisible(false);
//     },
// })


//  var remind = new ModalTips({
//     elementId:"#modal-remind",
//     onOk:function(obj,that){
//         that.setIsModalVisible(false);
//       	router.loadPage("/flow/?flowId=285")
        
//     },
//     onNo:function(obj,that){
//         that.setIsModalVisible(false);
//     },
//     showModal:function(obj,that){
//         that.setIsModalVisible(false);
//     },
// })
 

// remind.init();
// modal.init();
 console.log(document.querySelector("header #username"))
$("#currentflow").click(function(e){
  
  let id = $("#username").data("userId")
      
  if(id=="") return
    $.ajax({
    url:window.baseURL + 
    "/api/flow/data?formId=496&flowId=285&completed=false&current=1&StarterId="+id,
    method:"Get",
    async: false,
    xhrFields:{withCredentials:true},
    success: function({data}){
    if(data.length == 0){
    modal.setIsModalVisible(true)
    }else{
      router.loadPage("/flow/?flowId=285");
    }
    }
    });
})

var indexpoll = 0;

 // 异步请求接口情况
// function poll() {
//     indexpoll++;
//     setTimeout(function() {
//         $.get("/api/user/current", function(data, status) {
//             if(indexpoll == 5){
//             	 remind.setIsModalVisible(true);
//             	 return 
//             }
//             // 前端接收到后端返回的数据时发起下一次请求
//             poll();
//         });
//     }, 3000);
// }
//  poll()
```















前端

```cmd
mkdir OrderWeb #mkdir(创建文件夹)  [文件夹名称]
cd OrderWeb #cd(跳转目录)  [文件路径]
npm create umi #npm(npm指令) create(创建)
##选择 ant-design-pro
npm install #下载依赖包
npm start #启动项目
```

后端

```cmd
mkdir OrderWebAPI #mkdir(创建文件夹)  [文件夹名称]
cd OrderWebAPI #cd(跳转目录)  [文件路径]
npm init -y #npm(npm指令) 初始化 package.json
echo. > app.js  #创建创建入口文件 编写程序
npm install koa koa-bodyparser  mongose #npm() install(安裝) 安裝依赖包
node app.js
```

数据库

```cmd
mkdir OrderDB #mkdir(创建文件夹)  [文件夹名称]
mongod  --dbpath OrderDB --port 27018  #mongod() --dbpath(数据库文件夹路径) --port(服务器端口)
```





win 整体

```cmd
mkdir FinalDesign
cd OrderWeb
mkdir OrderWeb #mkdir(创建文件夹)  [文件夹名称]
cd OrderWeb #cd(跳转目录)  [文件路径]
npm create umi #npm(npm指令) create(创建)
##选择 ant-design-pro
npm install #下载依赖包
npm start #启动项目
cd ../	  #返回上級目录	
mkdir OrderWebAPI #mkdir(创建文件夹)  [文件夹名称]
cd OrderWebAPI #cd(跳转目录)  [文件路径]
npm init -y #npm(npm指令) 初始化 package.json
echo. > app.js  #创建创建入口文件 编写程序
npm install koa koa-bodyparser  mongose #npm() install(安裝) 安裝依赖包
node app.js #node(指令) 文件
cd ../  #返回上級目录
mkdir OrderDB #mkdir(创建文件夹)  [文件夹名称]
mongod  --dbpath OrderDB --port 27018  #mongod() --dbpath(数据库文件夹路径) --port(服务器端口)
```



liunx

touch

```cmd
mkdir FinalDesign
cd OrderWeb
mkdir OrderWeb #mkdir(创建文件夹)  [文件夹名称]
cd OrderWeb #cd(跳转目录)  [文件路径]
npm create umi #npm(npm指令) create(创建)
##选择 ant-design-pro
npm install #下载依赖包
npm start #启动项目
cd ../	  #返回上級目录	
mkdir OrderWebAPI #mkdir(创建文件夹)  [文件夹名称]
cd OrderWebAPI #cd(跳转目录)  [文件路径]
npm init -y #npm(npm指令) 初始化 package.json
touch app.js  #创建创建入口文件 编写程序
npm install koa koa-bodyparser  mongose #npm() install(安裝) 安裝依赖包
node app.js #node(指令) 文件
cd ../  #返回上級目录
mkdir OrderDB #mkdir(创建文件夹)  [文件夹名称]
mongod  --dbpath OrderDB --port 27018  #mongod() --dbpath(数据库文件夹路径) --port(服务器端口)
```





环境搭建

```cmd
 #apt-get (ubuntu) yum(centOS) #快速下载安装某些东西
  apt-get update 			#更新apt-get包的文件目录
 # 安装nginx
  apt-get install nginx 	#中间要按一下回车等待
 # node 环境安装
  apt-get install npm 		#安装npm包
  npm i -g n 			   #全局安装n
  n latest 				   #安装最新版本的node
  cd  /etc/nginx/		    #nginx文件
  vi nginx.conf
  #退出编辑模式 
　#按ESC键，然后：
  #　　　 退出vi
  # 　　　 :q!  不保存文件，强制退出vi命令
  # 　　　 :w   保存文件，不退出vi命令
  # 　　　 :wq  保存文件，退出vi命令  
  #       :wq!(保存编辑强制退出)
 #nginx 重启(启动) 
 service nginx restart 
```



```html

<ProFormSelect.SearchSelect
          name="spec"
          label="规格"
          options={[
            { label: '大份', value: 'all' },
            { label: '中份', value: 'open' },
            { label: '小份', value: 'closed' },
            { label: '特大份', value: 'processing' },
          ]}
        />
```

```js
{
  request: {
    method: 'GET',
    url: '/api/product?current=1&pageSize=5',
    header: {
      'accept-language': 'zh-CN,zh;q=0.9',
      'accept-encoding': 'gzip, deflate',
      referer: 'http://192.168.19.1:8000/server/product',
      accept: '*/*',
      'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.77 Safari/537.36',
      authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYwYTM0YmU3ZDI0MWM1Mzg4NDNhYWUwMSIsImlhdCI6MTYyMzQ4NTA4OCwiZXhwIjoxNjIzNDg4Njg4fQ.6SlPlFGigKcskOWvosrdAwcHyBG7-AE9Be3JJIKG7lM',
      connection: 'close',
      host: '127.0.0.1:3001'
    }
  },
  response: {
    status: 404,
    message: 'Not Found',
    header: [Object: null prototype] {}
  },
  app: { subdomainOffset: 2, proxy: false, env: 'development' },
  originalUrl: '/api/product?current=1&pageSize=5',
  req: '<original node req>',
  res: '<original node res>',
  socket: '<original node socket>'
}

///1


{
  request: {
    method: 'GET',
    url: '/api/product?current=1&pageSize=5',
    header: {
      'accept-language': 'zh-CN,zh;q=0.9',
      'accept-encoding': 'gzip, deflate',
      referer: 'http://192.168.19.1:8000/server/product',
      accept: '*/*',
      'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.77 Safari/537.36',
      authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYwYTM0YmU3ZDI0MWM1Mzg4NDNhYWUwMSIsImlhdCI6MTYyMzQ4NTA4OCwiZXhwIjoxNjIzNDg4Njg4fQ.6SlPlFGigKcskOWvosrdAwcHyBG7-AE9Be3JJIKG7lM',
      connection: 'close',
      host: '127.0.0.1:3001'
    }
  },
  response: {
    status: 200,
    message: 'OK',
    header: [Object: null prototype] {
      'content-type': 'application/json; charset=utf-8'
    }
  },
  app: { subdomainOffset: 2, proxy: false, env: 'development' },
  originalUrl: '/api/product?current=1&pageSize=5',
  req: '<original node req>',
  res: '<original node res>',
  socket: '<original node socket>'
}

```

点击事件

```
https://www.aliyue.net/10693.html
```

