import axios from "axios";
export function request(options) {
    return new Promise((resolve, reject) => {
      // 1.创建axios的实例对象
      const instance = axios.create({
        baseURL: 'http://43.136.170.26:3030',
        timeout: 5000
      })
    //   //发送请求前拦截
    //   instance.interceptors.request.use((config)=>{
    //   })
  
    //   // 过滤器(拦截器)
    //   instance.interceptors.response.use(res => {
    //   })
  
  
      // 通过实例发送网络请求
      instance(options)
          .then(res => {
            resolve(res)
          }).catch(err => {
            reject(err)
      })
    })
  }
  