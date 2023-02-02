import axios from 'axios';
import type { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';

import { RequestConfig, RequestInterceptors } from './type';

class LXRequest {
  // axios 实例
  instance: AxiosInstance;
  interceptorsObj?: RequestInterceptors;
  constructor(config: RequestConfig) {
    this.instance = axios.create(config);
    // 如果传入拦截器就使用该拦截器
    this.interceptorsObj = config.interceptors;
    this.instance.interceptors.request.use(
      (res: AxiosRequestConfig) => {
        return res;
      },
      (err: any) => err
    );

    // 使用实例拦截器  拦截器的执行顺序为实例请求→类请求→实例响应→类响应
    this.instance.interceptors.request.use(
      this.interceptorsObj?.requestInterceptors,
      this.interceptorsObj?.requestInterceptorsCatch
    );
    this.instance.interceptors.response.use(
      this.interceptorsObj?.responseInterceptors,
      this.interceptorsObj?.responseInterceptorsCatch
    );

    this.instance.interceptors.response.use(
      // 因为我们接口的数据都在res.data下，所以我们直接返回res.data
      (res: AxiosResponse) => {
        return res.data;
      },
      (err: any) => err
    );
  }
  // 使用泛型确定返回data的具体类型
  request<T = any>(config: RequestConfig<T>) {
    // 单个instance中某个请求也可能会有单独拦截器,对config进行处理后重新赋值给config
    if (config.interceptors?.requestInterceptors) {
      config = config.interceptors.requestInterceptors(config);
    }
    return new Promise<T>((resolve, reject) => {
      this.instance
        .request<any, T>(config)
        .then((res) => {
          // 单个instance中某个请求也可能会有单独拦截器,对res进行处理后重新赋值给res
          if (config.interceptors?.responseInterceptors) {
            res = config.interceptors.responseInterceptors(res);
          }
          resolve(res);
        })
        .catch((err) => {
          reject(err);
        });
    });
  }
  get<T = any>(config: RequestConfig<T>) {
    return this.request({ ...config, method: 'GET' });
  }
  post<T = any>(config: RequestConfig<T>) {
    return this.request({ ...config, method: 'POST' });
  }
  delete<T = any>(config: RequestConfig<T>) {
    return this.request({ ...config, method: 'DELETE' });
  }
  patch<T = any>(config: RequestConfig<T>) {
    return this.request({ ...config, method: 'PATCH' });
  }
}
export default LXRequest;
