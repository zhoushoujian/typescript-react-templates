import React from "react";
import ReactDOM from "react-dom";
import axios from 'axios'
import thunk from "redux-thunk";
import { createStore, applyMiddleware, compose } from 'redux';
import { createLogger } from 'redux-logger';
import { Provider } from "react-redux";
import { axiosInterceptorsConfig } from "@/utils/common";
import reducer from "@/ducks";

import Routers from "./router";

window.axios = axios.create({ baseURL: `/` });
window.getRoute = () => location.href.replace(/.+#/, "");
window.goRouteClass = (self: any, path: string) => self.props.history.push(path);

const middleware = [thunk];
middleware.push(createLogger({
  collapsed: false,
}));
const store = createStore(reducer, compose(applyMiddleware(...middleware)));
export const $dispatch = store.dispatch;
export const $getState = store.getState;

axiosInterceptorsConfig()

ReactDOM.render(
  <Provider store={store}>
    <Routers />
  </Provider>,
  document.getElementById("root"));
