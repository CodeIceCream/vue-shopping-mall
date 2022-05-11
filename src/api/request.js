// 对于axios进行二次封装
import axios from "axios";

// 1. 利用axios对象的方法create，创建一个axios实例
// 2. requests就是配置过后的axios
const requests = axios.create({
  // 基础路径
  baseURL:"api",
  // 请求超时时间
  timeout: 5000,
})
// 请求拦截器：发请求前，请求拦截器可以检测到请求发出前做的一些事情
requests.interceptors.request.use((config)=>{
  // config是配置对象，它有一个重要属性headers请求头
  return config;
})
// 响应拦截器
requests.interceptors.response.use((res)=>{
  // 成功回调：服务器返回数据时响应拦截器检测到，此时可以写一些逻辑处理数据
  return res.data;
},(error)=>{
  // 失败回调
  return Promise(new Error('req fail'))
})
export default requests;