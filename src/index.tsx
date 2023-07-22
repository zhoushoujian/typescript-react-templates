import React from 'react';
import { createRoot } from 'react-dom/client';
import axios from 'axios';
import { Provider } from 'react-redux';
import { axiosInterceptorsConfig } from '@/utils/common';
import store from '@/ducks/main';
import Routers from './router';

window.axios = axios.create({ baseURL: `/` });
axiosInterceptorsConfig();

const container = document.getElementById('root');
const root = createRoot(container!);
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <Routers />
    </Provider>
  </React.StrictMode>,
);
