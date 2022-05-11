// API的统一管理
import requests from './request'

// 三级联动接口：/api/product/getBaseCategoryList
// 发GET请求:axios发请求返回的结果是Promise对象
export const reqCategoryList = () => requests({url: '/product/getBaseCategoryList',method:'get'})
