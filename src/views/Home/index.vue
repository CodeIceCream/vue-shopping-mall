<template lang="">
  <div>
    <!-- 使用全局注册的组件无需引入 -->
    <TypeNav />
    <ListContainer />
    <Recommend />
    <Rank/>
    <Like/>
    <Floor/>
    <Floor/>
    <Brand/>
  </div>
</template>
<script>
// 引入其余组件
import ListContainer from '@/views/Home/ListContainer'
import Recommend from '@/views/Home/Recommend'
import Rank from '@/views/Home/Rank'
import Like from '@/views/Home/Like'
import Floor from '@/views/Home/Floor'
import Brand from '@/views/Home/Brand'
export default {
  name: '',
  components:{
    ListContainer,
    Recommend,
    Rank,
    Like,
    Floor,
    Brand
  }
}
</script>
<style lang="">
  
</style>