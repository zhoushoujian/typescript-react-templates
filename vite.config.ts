import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import vitePluginLess2CssModule from 'vite-plugin-less-2cssmodule';

// https://vitejs.dev/config/
export default defineConfig({
  root: path.resolve(__dirname, './src'),
  //@ts-ignore
  plugins: [react(), vitePluginLess2CssModule()],
  clearScreen: false,
  server: {
    port: 8080,
    strictPort: true,
    open: true,
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
  // proxy: {
  //   '/api': {
  //     target: 'http url',
  //     changeOrigin: true,
  //     rewrite: (path: string) => path.replace(/^\/api/, ''),
  //   },
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
