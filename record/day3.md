1) 完成一级分类动态添加背景颜色
+ 1.采用样式完成item:hover{background:skybule;}
+ 2.采用js完成  
    鼠标移入事件：@mouseenter 传入index值  
    鼠标移出事件：事件委托：找到公共移出后的部分，将该部分和一级分类表写入一个共同容器，在公共容器下写@mouseleave的响应事件  

2) 通过JS控制二三级商品分类的显示和隐藏
+ 1.采用样式伪类样式:hover实现
    + 默认时设置盒子display:none
    + 鼠标悬浮时设置盒子display:block  
+ 2.采用js控制显示
    + 动态获取style样式实现:`:style="{display: currIndex==index?'block':'none'}`
    + 使用v-show实现  

3) 演示卡顿现象
场景：事件触发非常频繁，而且每一次触发，回调函数都需要去执行
问题：若该场景下时间很频繁且回调函数执行费时，则会导致浏览器卡顿
解决方法：
+ 1. 节流：在规定的间隔时间范围内不会重复触发回调，只有触发时机的时间当大于触发间隔时间才会再次触发。若短时间内连续触发只执行第一次。
+ 2. 防抖：前面的频繁的触发都被取消，直至停下来等待规定时间，在规定的时间之后再触发才再次生效。若短时间内连续触发只执行最后一次。

4. 三级联动组件的路由跳转与传递参数

+ 三级联动用户可以点击的：一级分类、二级分类、三级分类，当你点击的时候Home模块转跳到Search模块，以及会把用户选中的产品（产品的名字、产品的ID）在路由转跳的时候进行传递。

+ 路由转跳：

  声明式导航：router-link

  编程式导航：push|replace

+ 三级联动：如果使用声明式导航router-link，可以实现路由的跳转与传递参数，但是会出现卡顿现象，因为router-link是一个组件，当服务器数据返回之后，循环遍历出很多个router-link组件，创建了1000+个组件实例对象，非常耗内存，因此出现了卡顿现象。

  最佳解决方案：编程式导航 + 事件委派

  事件委派缺点：

  + 把全部的子节点`h3、dt、dl、em`的事件委派给父节点，我们需要考虑仅仅点击a标签时，才进行路由跳转。

  + 确定点击的是a标签，还有区分点击的是一级、二级、三级标签

  解决事件委派的两个问题：

  + 把子节点中需要标识处理的a标签加上自定义属性data-categoryName，其余子节点绝不会有这个属性，这样就可以区分
  + 在a标签中添加data-category1Id、data-category2Id、data-category3Id自定义属性来标签一级、二级、三级标签

+ 编程式路由

  当有new VueRouter({

   routes: [

  {

  ​	name: 'search',

  ​	path: '/search/:parVal?',

     component: Search,}

  ]

  })

  + query的参数理解：  this.$router.push({name:'search',query:{categoryName:'音乐',category1Id:'1'}});

    带查询参数，变成search?categoryName=音乐&category1Id=1

    此时this.$route.query是{categoryName:'音乐',category1Id:'1'}

  + params的参数理解：

    this.$router.push({name:'search',params: { parVal: this.keyword} })

    当keyword是aaa时

    带params参数，变成search/aaa
