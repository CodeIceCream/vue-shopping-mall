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
1. 节流：在规定的间隔时间范围内不会重复触发回调，只有触发时机的时间当大于触发间隔时间才会再次触发。若短时间内连续触发只执行第一次。
2. 防抖：前面的频繁的触发都被取消，直至停下来等待规定时间，在规定的时间之后再触发才再次生效。若短时间内连续触发只执行最后一次。