/*
 * @Author: XJN
 * @Date: 2023-10-06 02:30:44
 * @LastEditors: xiaojunnanya
 * @LastEditTime: 2023-12-07 09:38:21
 * @FilePath: \easy_pan\src\service\request\index.ts
 * @Description: 
 * @前端实习生: 鲸落
 */
import axios from 'axios'
import type { AxiosInstance } from 'axios'

import { jlRequestConfig } from './type'

class jlRequest{
    instance: AxiosInstance

    // 创建axios实例
    constructor(config: jlRequestConfig){
        this.instance = axios.create(config)

        // 请求拦截器
        this.instance.interceptors.request.use((config)=>{
            config.headers['Content-Type'] = 'application/x-www-form-urlencoded'
            // config.cancelToken = cancelTokenSource.token
            return config
        },(error) =>{})

        // 响应拦截器
        this.instance.interceptors.response.use((res)=>{
            return res
        },(error) =>{})

        // 针对特定的实例添加拦截器
        this.instance.interceptors.request.use(
            config.interceptors?.requestSuccessFn,
            config.interceptors?.requestFailureFn
        )

        this.instance.interceptors.response.use(
            config.interceptors?.responseSuccessFn,
            config.interceptors?.responseFailureFn
        )
    }

    // 创建网络请求的方法
    request<T=any>(config: jlRequestConfig){

        // 可以设置单次请求的成功拦截
        // if(config.interceptors?.requestSuccessFn){
        //     config = config.interceptors.requestSuccessFn(config)
        // }
 
        return this.instance.request<T>(config)
    }

    get<T=any>(config: jlRequestConfig){
        return this.request<T>({...config, method:'GET'})
    }

    post<T=any>(config: jlRequestConfig){
        return this.request<T>({...config, method:'POST'})
    }
}

export default jlRequest