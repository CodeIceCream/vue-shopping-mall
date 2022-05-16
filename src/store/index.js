import Vue from "vue";
import Vuex from "vuex";
// 使用插件都需要Vue.use()
Vue.use(Vuex);
// 引入各种小仓库
import btn from './btn'
import home from "./home";
import search from "./search";
// 对外默认暴露一个Store类的实例
export default new Vuex.Store({
  // 使用modules属性对象中注册各种小仓库kv同名
  modules: {
    btn,
    home,
    search,
  }
})