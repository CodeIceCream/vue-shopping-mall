+ 注意事项:
     + 项目阶段，左侧菜单目录，只能有项目文件夹
     + 联想电脑安装node_modules依赖包的时候，经常丢包。npm install --save axios --force
     + 单词不能有错误
     + 路由理解KV：K--->URL  V---->相应的组件
     + 配置路由：
          + 创建router文件夹在index.js中必须先引入Vue:  
          >`import Vue  from 'vue'`;  
          + 再引入vue-router  
          >`import VueRouter from 'vue-router'`;  
          + Vue使用插件方法调用Vue.use().  
          >`Vue.use(VueRouter)`;  
          + 对外暴露VueRouter类的实例  
          >`export default new VueRouter({  
               routes:[
                    {
                         path:'/home',
                         component:Home
                    }
               ]
          })`  
          + main创建Vue实例时把插件（注册）用上  
          >new Vue({
               render: h => h(App),
               router
          }).$mount('#app')


`$router`: 进行编程式导航的路由跳转：`this.$router.push` or `this.$router.replace`  
$route中可以获取路由的信息|参数：  
+ `this.$route.path`  
+ `this.$route.params|query`  
+ `this.$route.meta`
1) 编程式导航路由跳转到当前路由(参数不变), 多次执行会抛出NavigationDuplicated的警告错误?
注意:编程式导航（push|replace）才会有这种情况的异常，声明式导航是没有这种问题，因为声明式导航内部已经解决这种问题。 

这种异常，对于程序没有任何影响的。  
为什么会出现这种现象？  
由于vue-router最新版本3.5.2，引入了promise，当传递参数多次且重复，会抛出异常，因此出现上面现象。 

+ 第一种解决方案：是给push函数，传入相应的成功的回调与失败的回调
第一种解决方案可以暂时解决当前问题，但是以后再用push|replace还是会出现类似现象，因此我们需要从‘根’治病；
+ 第二种解决方案：重写-->`this.$router.push` and `this.$router.replace`这两个方法代表的是VueRouter的实例下的一个push|reolace方法，''重写它解决根本问题''
+ 面试题：call || apply区别
     + 相同点：都可以调用函数一次，都可以篡改函数上下文一次
     + 不同点：call传递参数用逗号隔开，aooly方法传递的是一个数组

2) 将Home组件的静态组件拆分
+ 静态页面（样式）
+ 拆分静态组件
+ 发请求获取服务器数据进行展示
+ 开发动态业务
+ 拆分组件：结构+样式+图片资源，一共要拆分为七个组件 

3) 三级联动组件完成---由于三级联动，在Home、Search、Detail，把三级联动注册为全局组件。
+ 好处：需要在`main`注册一次，就可以在项目任意地方使用
     + 三级联动组件---全局组件
     `import TypeNav from '@/views/Home/TypeNav'`
     + Vue.component第一个参数是全局组件的名字 第二个参数是哪一个组件
     `Vue.component(TypeNav.name, TypeNav)`

4) Postman测试接口
+ 开发服务器为：http://gmall-h5-api.atguigu.cn
+ 查看文档使用Postman调试接口：api/product/getBaseCategoryList
+ 注意请求类型:`GET|POST`
+ 整个项目接口前缀都有`/api`字样





5) axios二次封装 
1. 为什么要二次封装axios？ 
=>为了使用请求拦截器和响应拦截器
+ 请求拦截器: 可以在发送请求之前处理一些业务
+ 响应拦截器：当服务器数据返回后，可以处理一些事情 

可以完成Ajax请求：XMLHttpRequest、$JQuery、fetch、axios
+ AJAX(异步JavaScript和XML)：客户端可以'悄悄的'向服务器端发请求，在页面没有刷新的情况下，实现页面的局部更新。
2. 工作的时候src目录下的API文件夹，一般关于axios二次封装的文件，那么如何对于axios进行二次封装？
+ `npm install --save axios` 引入axios 
+ 利用axios对象的方法create，创建一个axios实例`const requests = axios.create({})`
+ `requests`就是配置过后的axios实例
+ 请求拦截器：`requests.interceptors.request.use((config)=>{return config;});` config 是配置对象，它有一个重要属性headers请求头
+ 响应拦截器: `requests.interceptors.response.use((res)=>{
  return res.data;
},(error)=>{
  return Promise(new Error('req fail'))
})` 可以在成功和失败对数据进行一定处理

6) 接口的统一管理
+ 项目很小：完全可以在组件的生命周期函数中发请求 
+ 项目大: axios.get('xxx')

7) 跨域问题
什么是跨域：
+ 跨域:如果多次请求协议、域名、端口号有不同的地方，称之为跨域
前端项目本地服务器: http://localhost:8080/#/home
后台服务器: http://gmall-h5-api.atguigu.cn
+ 如何解决跨域? ---> `JSONP、CROS、代理`



8) 进度条：nprogress模块实现进度条功能
+ npm install --save nprogress 下载后import
+ 在请求开始时start(),得到请求响应时done()
+ 需要修改进度条的颜色时，修改源码样式.bar类名的颜色




9) vuex状态管理库的使用
#### vuex: Vue官方提供的一个插件，插件可以管理项目共用数据。
vuex是任何项目都需要vuex？  
当项目大的时候，组件关系复杂，状态不好维护时强烈推荐使用。  
1. Vuex基本使用:
+ 需要创建‘统一管理数据’即为仓库store文件
+ 使用插件都需要Vue.use(Vuex) 
+ main创建Vue实例时把插件（注册）用上  
          >new Vue({
               render: h => h(App),
               store
          }).$mount('#app')  
2. Vuex基本概念：  
state:仓库存储数据的地方  
mutations:改变state的唯一手段  
action:处理action,可以书写自己的业务逻辑，还可以处理异步  
getters:理解为计算属性，用于简化仓库数据，让组件获取仓库的数据更方便
modules：模块式开发存储数据，传入一个对象kv指向各种小仓库

















