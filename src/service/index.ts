import { BASE_URL, TIME_OUT } from './config';
import LXRequest from './request';
// 根据不同配置创建不同axios实例
const LxRequest = new LXRequest({
  baseURL: BASE_URL,
  timeout: TIME_OUT,
  interceptors: {
    requestInterceptors(config) {
      if (!config?.params) {
        config.params = {};
      }

      config.params.timestamp = Date.now();
      config.params.cookie = localStorage.getItem('USER-COOKIE') || '';
      return config;
    },
    requestInterceptorsCatch(err) {
      return err;
    },
    responseInterceptors(res) {
      return res;
    },
    responseInterceptorsCatch(err) {
      console.log(err);
      return err;
    }
  }
});

export default LxRequest;
