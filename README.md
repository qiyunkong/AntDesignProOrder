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

13. 使用token 验证用户

14. 更新分类模块 取消问题， 更新根据ID值怎么去更新操作

15. 

## 项目结构

## 项目问题

1. git commit -m "备注" 提交失败，报错：git提交失败——running pre-commit hook: lint-staged <a href="https://blog.csdn.net/zhan_lang/article/details/88691279">解放方案</a>
2. util.js:18 async-validator: ["请输入undefined"] 黄色警告



## 笔记使用

```
[描述](http) == a标签
```

## 项目页面

1. 表格规格 表格组件的参数说明

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

2. ProTable 组件使用 

   ```
   //表格标题
   headerTitle
   
   ```
   
3. token 的使用 获取当前用户  [参考案例](https://blog.csdn.net/Violent_clown/article/details/108468950)

   ```js
   return request<API.CurrentUser>('/api/account/currentUser', {
       method: 'GET',
       ...(options || {}),
   });
   ```
   
## 项目参考

官网：https://beta-pro.ant.design/

个人张立志博客：https://www.yuque.com/aspirantzhang/antdprov5/

芒旭项目：

​	Router 使用	/hooks/useRouter 

​    表格 自定义表格 表格头  pages/form/data/index.tsx  [学习案例](https://blog.csdn.net/jenie/article/details/106248150)

​     pro表格  pages/order/index.tsx  

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

