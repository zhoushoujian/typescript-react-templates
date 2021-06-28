import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import { Provider } from 'react-redux';
import Logger from 'logger-for-cannot-duplicate';
import { axiosInterceptorsConfig } from '@/utils/common';
import store from '@/ducks/main';
import Routers from './router';

window.axios = axios.create({ baseURL: `/` });
window.getRoute = () => location.href.replace(/.+#/, '');
window.goRouteClass = (self: any, path: string) => self.props.history.push(path);
const logger = new Logger({
  isDevEnv: /localhost/.test(location.host),
  collectionName: 'typescript',
  serverAddr: 'http://api.track.shuyun.com/lfcd',
});
window.logger = logger;

axiosInterceptorsConfig();

ReactDOM.render(
  <Provider store={store}>
    <Routers />
  </Provider>,
  document.getElementById('root'),
);
