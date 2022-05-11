// 配置路由
import Vue from "vue";
import VueRouter from "vue-router";
// 使用插件
Vue.use(VueRouter);
// 引入路由组件
import Home from '@/views/Home';
import Login from '@/views/Login';
import Register from '@/views/Register';
import Search from '@/views/Search';
// 先把VueRouter原型对象的push|replace保存一份
const originPush = VueRouter.prototype.push;
const originReplace = VueRouter.prototype.push;
// 重写push|replace方法
VueRouter.prototype.push = function (location, resolve, reject) {
  if (resolve && reject) {
    originPush.call(this, location, resolve, reject);
  } else {
    originPush.call(this, location, () => { }, () => { });
  }
}
VueRouter.prototype.replace = function (location, resolve, reject) {
  if (resolve && reject) {
    originReplace.call(this, location, resolve, reject);
  } else {
    originReplace.call(this, location, () => { }, () => { })
  }
}


// 开始配置路由
export default new VueRouter({
  routes: [
    {
      path: '/home',
      component: Home,
      meta: {
        showFooter: true
      }
    },
    {
      name: 'search',
      // params传参需要用自定义的key占位符
      path: '/search/:parVal?',
      component: Search,
      meta: { showFooter: true },
      // 路由组件可以传递props
      // 布尔值写法只能传params,在路由组件种用props接parVal
      // props:true,
      // 对象写法:额外给路由组件传一些props
      // props:{a:1,b:3}
      // 函数写法(最常用):可以将params、query参数通过props传给路由组件
      props: ($route) => {
        return {
          parVal: $route.params.parVal,
          queryVal: $route.query.queryVal
        }
      }
    },
    {
      path: '/login',
      component: Login,
      meta: {
        showFooter: false
      }
    },
    {
      path: '/register',
      component: Register,
      meta: {
        showFooter: false
      }
    },
    {
      // 重定向：代码跑起来时，访问/时，立马让它定向到首页
      path: '*',
      redirect: '/home'
    }
  ]
})