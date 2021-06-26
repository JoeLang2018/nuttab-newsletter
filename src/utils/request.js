//简易版封装axios
import axios from 'axios'

//一、创建axios实例
const instance = axios.create({
  baseURL: process.env.VUE_APP_BASE_URL,
  timeout: 5000
})

//二、拦截器
instance.interceptors.request.use(config => {
  return config
}, err => {
  console.log(err)
})

instance.interceptors.response.use(res => {
  // console.log(res)
  return res.data
}, err => {
  // 出现网络超时
  console.log(err)
})

//三、发送请求
// return instance(config)

export default instance