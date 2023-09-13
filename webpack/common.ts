import * as path from 'path';
//@ts-ignore
import ProgressBarPlugin from 'progress-bar-webpack-plugin';
import TsconfigPathsPlugin from 'tsconfig-paths-webpack-plugin';
import { consoleFormat } from '@szhou/script-tools';
import webpack from 'webpack';
import config from './config';

const { srcPath, moduleFileExtensions, appPath } = config;
const isDev = process.env.NODE_ENV === 'development';
consoleFormat();

const common = {
  context: appPath,
  output: {
    filename: 'static/js/[name].js',
    chunkFilename: 'static/js/[name].chunk.js',
    publicPath: '',
    clean: true,
  },
  resolve: {
    extensions: moduleFileExtensions,
    plugins: [
      new TsconfigPathsPlugin({
        configFile: path.resolve(__dirname, '../tsconfig.json'),
      }),
    ],
    fallback: { os: false, path: require.resolve('path-browserify'), fs: false },
  },
  cache: {
    type: 'filesystem',
    cacheDirectory: path.join(__dirname, '../node_modules/.cache/webpack'),
  },
  module: {
    strictExportPresence: true,
    rules: [
      {
        oneOf: [
          {
            test: /\.[jt]sx?$/,
            include: srcPath,
            exclude: /node_modules/,
            // use: ['thread-loader', 'babel-loader'],
            use: [
              {
                loader: 'esbuild-loader',
                options: {
                  loader: 'tsx',
                  target: 'es2015',
                  // eslint-disable-next-line global-require
                  // tsconfigRaw: require('../tsconfig.json'),
                },
              },
            ],
            // use: {
            //   loader: 'swc-loader',
            // },
          },
          {
            test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/, /\.svg$/],
            type: 'asset',
          },
          {
            test: /\.css$/,
            include: /node_modules/,
            exclude: srcPath,
            use: ['style-loader', 'css-loader'],
          },
          {
            test: /\.(less|css)$/,
            include: srcPath,
            exclude: /node_modules/,
            use: [
              {
                loader: 'style-loader',
              },
              {
                loader: 'css-loader',
                options: {
                  modules: {
                    localIdentName: isDev ? '[path][name]_[local]_[hash:base64:5]' : '[hash:base64]',
                    // hashPrefix: 'monitor',
                  },
                },
              },
              {
                loader: 'less-loader',
                options: {
                  lessOptions: {
                    javascriptEnabled: true,
                  },
                },
              },
            ],
          },
        ],
      },
    ],
  },
  plugins: [
    new ProgressBarPlugin(),
    new webpack.ProvidePlugin({}),
    new webpack.DefinePlugin({
      process: { env: {} },
    }),
  ],
};

export default common;
