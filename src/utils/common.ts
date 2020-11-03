import { message } from '@shuyun-ep-team/kylin-ui';
import * as axiosPackage from 'axios';

const axiosPendingArr: { u: string, cancel: () => void }[] = []
export const removePending = (config: { url: string, method: string }) => {
  for (const i in axiosPendingArr) {
    if (axiosPendingArr[i].u === config.url + '&' + config.method) {
      axiosPendingArr[i].cancel();
      axiosPendingArr.splice(Number(i), 1);
    }
  }
}

// axios拦截器配置 => 拦截死循环请求和重复点击发起的请求
export const axiosInterceptorsConfig = () => {
  let currentDate = Date.now();
  let requestTimes = 0
  let visitApiMoreTimes = false
  let visitApiMoreTimesTimer: any = null
  const CancelToken = (axiosPackage as any).CancelToken
  window.axios.defaults.timeout = 10000;

  window.axios.interceptors.request.use(function (config) {
    removePending(config)
    config.cancelToken = new CancelToken((c) => {
      axiosPendingArr.push({ u: config.url + '&' + config.method, cancel: c });
    });
    requestTimes++;
    if (requestTimes > 50) {
      if (Date.now() - currentDate > 10 * 1000) {
        currentDate = Date.now();
        requestTimes = 0
      } else {
        console.error('more calls in short time, config', config)
      }
    }
    const token = localStorage.getItem('tk')
    if (token) {
      try {
        const tokenInfo = JSON.parse(token)
        config.headers.Authorization = tokenInfo.access_token;
      } catch (err) {
        console.error('parse token err', err)
      }
    }
    return config;
  }, function (err) {
    console.error("axios.interceptors.request err", err);
    return Promise.reject(err);
  });

  window.axios.interceptors.response.use(
    response => {
      removePending(response.config);
      if (response) {
        if (response.data.result && response.data.result.token) {
          localStorage.setItem('tk', JSON.stringify(response.data.result.token))
        }
        return response.data.result;
      } else {
        console.error("axios.interceptors no response", response)
        // eslint-disable-next-line prefer-promise-reject-errors
        return Promise.reject("no response");
      }
    },
    error => {
      if (error && error.response) {
        if (!error.response.data) {
          console.error('axios.interceptors.response.use error.response', error.response);
        } else if (!error.response.data.result) {
          console.error('axios.interceptors.response.use error.response.data', error.response.data);
        } else if (error.response.data.result.errText === "ip blocked") {
          console.error('axios.interceptors.response.use ip blocked');
          if (!visitApiMoreTimes) {
            message.error("您在短时间内访问服务器次数过多，请稍后重试");
            visitApiMoreTimes = true;
          } else {
            clearTimeout(visitApiMoreTimesTimer)
          }
          visitApiMoreTimesTimer = setTimeout(() => {
            visitApiMoreTimes = false
          }, 2000)
        }
        if (error.response.data && error.response.data.result) {
          switch (error.response.data.result.errCode) {
            case 401:
              message.error('token已过期');
              location.replace(location.origin + "#/login");
              break;
            default:
              console.error(`error.response.data.result.errCode: ${error.response.data.result.errCode}`);
              break;
          }
        }
      }
      let response = null;
      if (error) {
        if (error.response) {
          if (error.response.data) {
            response = error.response.data
          } else {
            response = error.response
          }
        } else {
          response = error
        }
      }
      return Promise.reject(response); // 返回接口返回的错误信息
    }
  );
};
