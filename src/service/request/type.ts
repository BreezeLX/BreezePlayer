import type { AxiosRequestConfig, AxiosResponse } from 'axios';

//定义实例拦截器类型
export interface RequestInterceptors<T = AxiosResponse> {
  // 请求拦截
  requestInterceptors?: (config: AxiosRequestConfig) => AxiosRequestConfig;
  requestInterceptorsCatch?: (err: any) => any;
  // 响应拦截
  responseInterceptors?: (res: T) => T;
  responseInterceptorsCatch?: (err: any) => any;
}
//自定义传入的参数
export interface RequestConfig<T = AxiosResponse> extends AxiosRequestConfig {
  interceptors?: RequestInterceptors<T>;
}
