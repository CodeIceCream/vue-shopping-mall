1) 开发Search模块中的TypeNav商品分类菜单，含过渡动画效果

   + 在TypeNav组件中加入判断if(this.$route.path !== '/home')来判断是否在Search路由组件中，使用一个变量show作为v-show的渲染布尔值，改变this.show来条件渲染

   + 过渡动画前提：元素or组件务必要有v-if|v-show指令才能进行过渡动画

     在有条件渲染指令的元素外包包裹一个`<transition name='xxx'>element</transition>`

     `name` - string，用于自动生成 CSS 过渡类名,例如：`name: 'fade'` 将自动拓展为 `.fade-enter`，`.fade-enter-active` 等。默认类名为 `"v"`

2) TypeNav组件的请求应该得到优化

   问题：每次挂载组件时，无论是切换Search或Home组件都挂载了TypeNav组件，每次挂载都向服务器发请求拿数据，这样做非常浪费服务器资源，最佳实践是只拿一次之后存下来。

   方案：原本TypeNav的挂载mounted函数中去请求服务器数据改为在App挂载时mounted函数中请求，并存入Vuex，原因是App只挂载一次，请求拿到并渲染数据（Vuex3.x使用）流程如下：

   + 在Appmounted函数中派发action至home小仓库，`this.$store.dispatch("categoryList");`

   + 在home小仓库中定义对应名字action-categoryList

     ```js
     const actions = {
      async categoryList({state, commit, rootState}){
       const res = await reqCategoryList()
       console.log('categoryList数据结果', res)
       if (res.code === 200) {
        // 仅提交数据
        commit('CATEGORYLIST', res.data)
       }
      }
     };
     ```

     可以看到在action对象中的函数有state, commit, rootState三个方法，我们可以调用commit将数据提交一个可以改变state的mutations，本例mutations为CATEGORYLIST(一般大写)，commit函数第一个参数是mutations名，第二个参数是传过去的数据`commit('CATEGORYLIST', res.data)`

   + 定义mutations:改变state的唯一手段（仅仅支持同步，所以异步需要放在action中执行）

     ```js
     const mutations = {
      CATEGORYLIST(state, categoryList){
       // 第一个参数是小仓库的state 第二个参数是action传过来的数据
       state.categoryList = categoryList;
      }
     };
     ```

     可以看到在mutations中改变了state的值，但一定要在state中先声明这个值的初始值才能成功赋值

   + state:仓库存储数据的地方

     ```js
     const state = {
      a:'hehe',
      categoryList:[] // 初始化
     };
     ```

   + 模块化开发的话还需要注意将以上home的小仓库对应的四个关键对象放在一个对象里暴露出去使用，形如：

     ```js
     export default {
      state,
      mutations,
      actions,
      getters
     }
     ```

   + 要知道还有很多小仓库，模块化管理小仓库就要用到`modules`这个属性，store/index.js一般如下：

    ```js
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
    ```
   
   +  这样操作之后只要在new Vue实例时注册store，就可以让Vue实例vm中有store对象，`vm.$store`中就会存好请求的数据
   
     ```js
     const vm = new Vue({
      render: h => h(App),
      // 注册仓库,注册后vm拥有$store属性
      store
     }).$mount('#app')
     ```
   
   + 在需要渲染数据的组件的computed计算属性中使用Vuex的辅助函数mapState可以方便的取出，而且还能区别出哪些数据是store中拿出来的，这样比频繁的使用`this.$store.state.home.categoryList`香多了
   
     使用方法如下：
   
     ```js
     import { mapState } from "vuex";
     ...
     computed: {
         ...mapState({
           // 右侧需要的是一个函数,当使用这个计算属性时，右侧函数会立即执行一次
           // 注入一个参数state，它是大仓库中的数据
           categoryList: (state) => state.home.categoryList,
         }),
       },
     ```
   
     
