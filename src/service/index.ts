import { BASE_URL, TIME_OUT } from './config';
import LXRequest from './request';
// 根据不同配置创建不同axios实例
const LxRequest = new LXRequest({
  baseURL: BASE_URL,
  timeout: TIME_OUT,
  interceptors: {
    requestInterceptors(config) {
      // console.log("个别axios instance请求成功拦截");
      return config;
    },
    requestInterceptorsCatch(err) {
      return err;
    },
    responseInterceptors(res) {
      return res;
    },
    responseInterceptorsCatch(err) {
      return err;
    }
  }
});

export default LxRequest;
