import TypeNav from '@/components/TypeNav'
import Vue from 'vue'
import App from './App.vue'
Vue.component(TypeNav.name, TypeNav)
Vue.config.productionTip = false
// 引入路由
import router from './router'
import store from './store'
const vm = new Vue({
  render: h => h(App),
  // 注册路由,注册后vm拥有$route,$router属性
  router,
  // 注册仓库,注册后vm拥有$store属性
  store
}).$mount('#app')
window.vm = vm
