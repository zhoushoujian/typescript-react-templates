import * as path from 'path';
import webpack from 'webpack';
import { merge } from 'webpack-merge';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import { CleanWebpackPlugin } from 'clean-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import SpeedMeasurePlugin from 'speed-measure-webpack-plugin';
import config from './config';
import commonConf from './common';

const { srcPath, publicPath, appPath } = config;
const smp = new SpeedMeasurePlugin();

const prod = smp.wrap(
  //@ts-ignore
  merge(commonConf, {
    mode: 'production',
    devtool: 'nosources-source-map',
    context: appPath,
    bail: true,
    entry: [path.join(srcPath, '../src/index.tsx')],
    output: {
      //@ts-ignore
      pathinfo: false,
      // publicPath: './web-monitor/',
      path: path.resolve(__dirname, '../dist'),
      filename: 'static/js/[name].bundle.js',
      chunkFilename: 'static/js/[name].[contenthash:8].chunk.js',
      clean: true,
    },
    optimization: {
      minimize: true,
      // moduleIds: 'hashed',
      // chunkIds: 'named',
      splitChunks: {
        chunks: 'all', // 共有3个值"initial"，"async"和"all"。配置后，代码分割优化仅选择初始块，按需块或所有块
        cacheGroups: {
          vendors: {
            test: /[\\/]node_modules[\\/]/,
            priority: -10,
          },
          default: {
            minChunks: 2,
            priority: -20,
            reuseExistingChunk: true,
          },
        },
      },
    },
    plugins: [
      new HtmlWebpackPlugin({
        inject: true,
        template: path.join(publicPath, 'index.html'),
        hash: true,
        minify: {
          removeComments: true,
          collapseWhitespace: true,
          removeRedundantAttributes: true,
          useShortDoctype: true,
          removeEmptyAttributes: true,
          removeStyleLinkTypeAttributes: true,
          keepClosingSlash: true,
          minifyJS: true,
          minifyCSS: true,
          minifyURLs: true,
        },
      }),
      new webpack.DefinePlugin({
        'process.env.NODE_ENV': JSON.stringify('production'),
        'process.env.BABEL_ENV': JSON.stringify('production'),
      }),
      new CleanWebpackPlugin(),
      new MiniCssExtractPlugin({
        filename: 'static/css/[name].[contenthash:8].css',
        chunkFilename: 'static/css/[name].[contenthash:8].chunk.css',
      }),
    ],
  }),
);

export default prod;
