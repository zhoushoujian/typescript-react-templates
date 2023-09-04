import { message } from 'antd';
import * as axiosPackage from 'axios';

// axios拦截器配置
export const axiosInterceptorsConfig = () => {
  window.axios.defaults.timeout = 10000;

  window.axios.interceptors.request.use(
    function (config: axiosPackage.AxiosRequestConfig) {
      return config;
    },
    function (err: Error) {
      // eslint-disable-next-line no-console
      console.error('axios.interceptors.request err', err);
      return Promise.reject(err);
    },
  );

  window.axios.interceptors.response.use(
    (response: axiosPackage.AxiosResponse) => {
      return response.data;
    },
    (error: axiosPackage.AxiosError) => {
      return Promise.reject(error); // 返回接口的错误信息
    },
  );
};

export const reportCallError = (err: any) => {
  if (err && err.result && err.result.errCode === 400) {
    message.error(err.result.errText);
  }
};
