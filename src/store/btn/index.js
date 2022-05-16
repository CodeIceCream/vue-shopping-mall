// btn的小仓库 实现模块式开发
// state:仓库存储数据的地方
const state = {
  count:1
};
// mutations:改变state的唯一手段
const mutations = {
  ADD(state){
    state.count++
  },
  SUB(state){
    state.count--
  }
};
// action:处理action,可以书写自己的业务逻辑，还可以处理异步
const actions = {
  add({state, commit, rootState}){
    // 书写业务逻辑，但绝不能修改state
    commit('ADD')
  },
  sub({commit}){
    commit('SUB')
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