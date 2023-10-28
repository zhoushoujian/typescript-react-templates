import { combineReducers } from 'redux';

import common from './common';

const reducersMap: any = {
  common: {
    common,
  },
};

export default combineReducers({
  ...Object.keys(reducersMap).reduce(
    (total, item) =>
      Object.assign({}, total, {
        [item]: (state: any, action: any) => {
          return Object.keys(reducersMap[item])
              .map((i) => reducersMap[item][i](state, action))
              .reduce((prev, next) => Object.assign({}, prev, next), {});
        },
      }),
    {},
  ),
});
