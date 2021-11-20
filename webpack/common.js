/* eslint-disable no-console */
const path = require('path');
const webpack = require('webpack');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ProgressBarPlugin = require('progress-bar-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const CircularDependencyPlugin = require('circular-dependency-plugin');
const CaseSensitivePathsPlugin = require('case-sensitive-paths-webpack-plugin');

const analyze = process.env.npm_config_report ? true : false;
const isDev = process.env.NODE_ENV !== 'production' ? true : false;
console.info('isDev', isDev);

const webpackConfig = {
  entry: [path.join(__dirname, '../src/index.tsx')],
  output: {
    path: path.resolve(__dirname, '../build'),
    publicPath: '',
    filename: 'js/[name].min.js',
    chunkFilename: 'js/[name].min.chunk.js?[hash:8]',
  },
  cache: {
    type: 'filesystem',
    cacheDirectory: path.join(__dirname, '../node_modules/.cac/webpack'),
  },
  module: {
    strictExportPresence: true,
    rules: [
      {
        test: /\.css$|\.less$/,
        use: [
          {
            loader: 'style-loader',
          },
          {
            loader: 'css-loader',
            options: {
              modules: {
                localIdentName: isDev ? '[path][name]_[local]_[hash:base64:5]' : '[hash:base64]',
              },
            },
          },
          {
            loader: 'less-loader',
            options: {
              lessOptions: {
                modifyVars: { '@primary-color': '#000' },
                javascriptEnabled: true,
              },
            },
          },
        ],
      },
      {
        test: /\.tsx?$/,
        use: ['thread-loader', 'cache-loader', 'babel-loader'],
        exclude: /node_modules/,
      },
      {
        test: /\.(png|jpg|jpeg|ttf|woff|woff2|eot|svg)$/i,
        type: 'asset',
      },
    ],
  },
  plugins: [
    new ProgressBarPlugin(),
    new HtmlWebpackPlugin({
      template: './public/index.html',
      filename: 'index.html',
      inject: 'body',
      hash: true,
      favicon: false,
      minify: false,
      xhtml: true,
      cache: true,
      title: 'typescript-react-templates',
      showErrors: true,
    }),
    new CaseSensitivePathsPlugin(),
    analyze ? new BundleAnalyzerPlugin() : () => {},
    new webpack.optimize.ModuleConcatenationPlugin(),
    new CircularDependencyPlugin({
      exclude: /node_modules/,
      include: /src/,
      failOnError: true,
      allowAsyncCycles: false,
      cwd: process.cwd(),
    }),
  ],
  optimization: {
    minimize: true,
    concatenateModules: true,
    usedExports: true, //只导出被使用的模块
    minimizer: [new OptimizeCSSAssetsPlugin({})],
    splitChunks: {
      chunks: 'async',
      minSize: 30000,
      minChunks: 1,
      maxAsyncRequests: 5,
      maxInitialRequests: 3,
      name: false,
      cacheGroups: {
        vendor: {
          name: 'vendor',
          chunks: 'initial',
          priority: -10,
          reuseExistingChunk: false,
          test: /node_modules\/(.*)\.js/,
        },
        styles: {
          name: 'styles',
          test: /\.(less|css)$/,
          chunks: 'all',
          minChunks: 1,
          reuseExistingChunk: true,
          enforce: true,
        },
      },
    },
    runtimeChunk: {
      name: 'manifest',
    },
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx', '.json'],
    plugins: [
      new TsconfigPathsPlugin({
        configFile: path.resolve(__dirname, '../tsconfig.json'),
      }),
    ],
    alias: {
      '@': path.resolve(__dirname, '../src'),
    },
    fallback: { os: false },
  },
};

module.exports = webpackConfig;
