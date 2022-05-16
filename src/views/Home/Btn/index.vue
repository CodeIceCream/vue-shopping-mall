<template lang="">
  <div>
    <button @click="add">点我+1</button>
    <div>count的值为{{count}}</div>
    <button @click="sub">点我-1</button>
    <div>当前时间戳{{loacalState}}</div>
  </div>
</template>
<script>
import {mapState} from 'vuex';
export default {
  name:"",
  computed:{
    loacalState(){
      return Date.now()
    },
    ...mapState({
      count: state => state.btn.count
    })
  },
  methods:{
    add(){
      // 派发action
      this.$store.dispatch('add')
    },
    sub(){
      this.$store.dispatch('sub')
    }
  },
}
</script>
<style lang="less">
  
</style>