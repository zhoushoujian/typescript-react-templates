import * as path from 'path';

const config = {
  appPath: path.resolve(__dirname, '../'),
  srcPath: path.resolve(__dirname, '../src'),
  distPath: path.resolve(__dirname, '../dist'),
  publicPath: path.resolve(__dirname, '../public'),
  moduleFileExtensions: ['.ts', '.tsx', '.json', '.jsx', '.js'],
  nodeModulesPath: path.resolve(__dirname, '../node_modules'),
};

export default config;
