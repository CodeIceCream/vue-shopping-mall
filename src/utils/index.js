// 声明式函数 考虑this和args问题
export function debounce(fn, delay = 1000) {
  let timer = null;
  return function(){
    const args = arguments;
    const that = this;
    if (timer) {
      clearTimeout(timer)
    }
    timer = setTimeout(function(){
      fn.apply(that, args)
    }, delay)
  }
}

// 防抖debounce 3.0优化 --ES6箭头函数避开this指向和args问题-需要先初始化
export const debounceEs = (fn, delay = 1000) => {
  let timer = null;
  return (...args) => {
    if (timer) {  // 未到时间还存在计时器 -> 清理后重新执行
      clearTimeout(timer)
    }
    timer = setTimeout(()=>{
      fn(...args);
    },delay)
  }
}

// 节流 定时器实现 + 可选第一次能执行
export function throttle(fn, delay = 1000, immediate = false){
  let timer;
  let isExec = immediate; // 传入可选是否立即执行
  return function(){
    const that = this;
    const args = arguments;
    if (timer) { // 未到时间还存在计时器 -> 不执行
      return;
    }
    if (isExec) { //  只进入一次之后,isExec就不要立即执行
      fn.apply(this, arguments);
      isExec = false;
    } else {
      timer = setTimeout(function(){
        fn.apply(that, args);
        timer = null; // 时间到了清空定时器
      },delay)
    }
  }
}

// 节流 时间戳实现  第一次会执行
export function throTimeDiff(fn, delay = 1000){
  let pre = 0;  // 记录上一次执行的时间戳，闭包读取的变量
  return function(){
    const args = arguments;
    const that = this;  // 记录执行函数作用域的this
    const now = Date.now();
    if (now - pre > delay) {  // 到达指定间隙时间，执行并更新闭包变量
      fn.apply(that, args);
      pre = now;
    }
  }
}