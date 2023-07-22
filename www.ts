import express from 'express';
import webpack from 'webpack';
// import proxy from 'express-http-proxy';
import openBrowser from 'react-dev-utils/openBrowser';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import webpackConf from './webpack/dev';

// 设置运行环境
process.env.NODE_ENV = 'development';
process.env.BABEL_ENV = 'development';

const app = express();
//@ts-ignore
const compiler = webpack(webpackConf);
const { publicPath } = webpackConf.output;
app.use(webpackDevMiddleware(compiler, { stats: { colors: true, cached: false }, publicPath }));
app.use(webpackHotMiddleware(compiler));

// app.use(
//   '/monitor-service/',
//   proxy('http://track.kylin.shuyun.com', {
//     proxyReqPathResolver(req) {
//       // eslint-disable-next-line no-console
//       console.log('req.url', req.url);
//       return 'http://track.kylin.shuyun.com' + req.url;
//     },
//   }),
// );

const port = 8080;
// const host = '172.18.53.229';
const host = '0.0.0.0';

//@ts-ignore
app.listen(port, host, (err) => {
  if (err) {
    // console.error('服务器启动异常');
    throw err;
  }
  const url = `http://localhost:${port}/index.html`;
  // eslint-disable-next-line no-console
  console.info('服务地址：', url);

  openBrowser(url);
});

process.on('uncaughtException', (err) => {
  // console.error('uncaughtException err', err);
  throw err;
});

process.on('unhandledRejection', (err) => {
  // console.error('unhandledRejection err', err);
  throw err;
});

export default app;
