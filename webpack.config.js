const path = require('path');
const webpack = require('webpack');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const ParallelUglifyPlugin = require('webpack-parallel-uglify-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const SpeedMeasurePlugin = require('speed-measure-webpack-plugin');
const CircularDependencyPlugin = require('circular-dependency-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CaseSensitivePathsPlugin = require('case-sensitive-paths-webpack-plugin');

const analyze = process.env.npm_config_report ? true : false;
const isDev = process.env.NODE_ENV !== 'production' ? true : false;
console.info('isDev', isDev);
const smp = new SpeedMeasurePlugin();

process.env.NODE_ENV = isDev ? 'development' : 'production';

const webpackConfig = {
  entry: ['./src/index.tsx'],
  output: {
    path: path.resolve(__dirname, 'build'),
    publicPath: '',
    filename: 'js/main.min.js',
    chunkFilename: 'js/[name].min.chunk.js?[hash:8]',
  },
  devtool: isDev ? 'cheap-module-eval-source-map' : 'hidden-source-map',
  mode: isDev ? 'development' : 'production',
  module: {
    strictExportPresence: true,
    rules: [
      {
        test: /\.css$|\.less$/,
        use: [
          { loader: MiniCssExtractPlugin.loader },
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
        use: [
          {
            loader: 'url-loader',
            options: {
              name: 'fonts/[name].[hash:8].[ext]',
              limit: 102400,
            },
          },
        ],
      },
    ],
  },
  plugins: [
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
    new MiniCssExtractPlugin({
      // Options similar to the same options in webpackOptions.output
      // both options are optional
      filename: '[name].css',
      chunkFilename: '[id].css',
      ignoreOrder: true, // Enable to remove warnings about conflicting order
    }),
    new ParallelUglifyPlugin({
      cacheDir: '.cache/',
      uglifyJS: {
        output: {
          beautify: false, //是否输出可读性较强的代码，即会保留空格和制表符，默认为输出，为了达到更好的压缩效果，可以设置为false
          comments: false, //不保留代码中的注释，默认为保留，为了达到更好的压缩效果
        },
        warnings: false,
        compress: {
          drop_debugger: true,
          drop_console: true,
        },
      },
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
    minimizer: [
      new UglifyJsPlugin({
        cache: true,
        parallel: true,
        sourceMap: true,
      }),
      new OptimizeCSSAssetsPlugin({}),
    ],
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
        configFile: path.resolve(__dirname, './tsconfig.json'),
      }),
    ],
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  devServer: {
    contentBase: path.join(__dirname, 'public'),
    host: '0.0.0.0',
    useLocalIp: true,
  },
};

const enableLoaderAnalysis = !isDev;
module.exports = enableLoaderAnalysis ? smp.wrap(webpackConfig) : webpackConfig;
