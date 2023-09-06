import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
//@ts-ignore
import vitePluginLess2CssModule from 'vite-plugin-less-2cssmodule';
import { consoleFormat } from '@szhou/script-tools';

consoleFormat();

// https://vitejs.dev/config/
export default defineConfig({
  root: path.resolve(__dirname, './src'),
  publicDir: path.resolve(__dirname, './public'),
  //@ts-ignore
  plugins: [react(), vitePluginLess2CssModule()],
  clearScreen: false,
  server: {
    port: 8080,
    strictPort: true,
    open: true,
    hmr: true,
    proxy: {
      '/api': {
        target: 'http://10.30.4.94:8077',
        changeOrigin: true,
        rewrite: (path: string) => {
          // eslint-disable-next-line no-console
          console.log('proxy received, path: ', path);
          return `http://10.30.4.94:8077${path}`;
        },
      },
    },
  },
  envPrefix: ['VITE_'],
  build: {
    target: process.env.TAURI_PLATFORM === 'windows' ? 'chrome105' : 'safari13',
    minify: !process.env.TAURI_DEBUG ? 'esbuild' : false,
    sourcemap: !!process.env.TAURI_DEBUG,
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  // optimizeDeps: {
  //   force: true, // 强制进行依赖预构建
  // },
  css: {
    modules: {
      generateScopedName: '[name]__[local]___[hash:base64:5]',
    },
    preprocessorOptions: {
      less: {
        javascriptEnabled: true,
        additionalData: '@root-entry-name: default;',
      },
    },
  },
});
