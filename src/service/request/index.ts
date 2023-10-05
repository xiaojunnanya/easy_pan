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
            console.log("全局请求成功拦截，这里可以开启loading、header携带token等");
            if(sessionStorage.getItem('token')){
                config.headers['Authorization'] = sessionStorage.getItem('token')
            }
            return config
        },(error) =>{
            // console.log(error);
        })

        // 响应拦截器
        this.instance.interceptors.response.use((res)=>{
            console.log("全局响应成功拦截，这里可以去掉loading");
            
            return res
        },(error) =>{
            // console.log(error);
        })

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