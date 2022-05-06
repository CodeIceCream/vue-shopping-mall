<template lang="">
  <div>
    <h1>params参数---{{$route.params.parVal}}---{{parVal}}</h1>
    <h1>query参数---{{$route.query.queryVal}}---{{queryVal}}</h1>
  </div>
</template>
<script>
export default {
  name:'',
  props:['parVal','queryVal']
}
</script>
<style lang="">
  
</style>