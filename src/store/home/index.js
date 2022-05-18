// home的小仓库 实现模块式开发

import { reqCategoryList } from "@/api";

// state:仓库存储数据的地方
const state = {
  a:'hehe',
  categoryList:[]
};
// mutations:改变state的唯一手段
const mutations = {
  CATEGORYLIST(state, categoryList){
    // 第一个参数是小仓库的state 第二个参数是action传过来的数据
    state.categoryList = categoryList;
  }
};
// action:处理action,可以书写自己的业务逻辑，还可以处理异步
const actions = {
  async categoryList({commit}){
    const res = await reqCategoryList()
    console.log('wu===', res)
    if (res.code === 200) {
      // 仅提交数据
      commit('CATEGORYLIST', res.data)
    }
  }
};
// getters:理解为计算属性，用于简化仓库数据，让组件获取仓库的数据更方便
const getters = {};

export default {
  state,
  mutations,
  actions,
  getters
}