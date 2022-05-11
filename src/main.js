import Vue from 'vue'
import App from './App.vue'
import TypeNav from '@/views/Home/TypeNav'
Vue.component(TypeNav.name, TypeNav)
Vue.config.productionTip = false
// 引入路由
import router from './router'
import {reqCategoryList} from '@/api'
reqCategoryList();
new Vue({
  render: h => h(App),
  // 注册路由
  router
}).$mount('#app')
