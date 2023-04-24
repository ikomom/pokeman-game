import { URL, fileURLToPath } from 'node:url'

import { defineConfig } from 'vite'

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    proxy: {
      // "/intapi": {
      //   // target: "http://192.168.31.132:8088", //程洋
      //   // target: "http://192.168.31.79:8088", //东旺
      //   // target: "http://192.168.31.46:8088", //旭辉
      //   // target: "http://192.168.0.137:8088", //旭辉
      //   // target: "http://192.168.95.126:8088", //崇恒
      //   // target: "http://112.5.142.34:14043/intapi", //外网地址
      //   target: "http://192.168.100.120:31761/intapi", //内网地址
      //   // target: "http://192.168.100.120:32262", //线上
      //   changeOrigin: true,
      //   rewrite: (path: string) => path.replace(new RegExp(`^/intapi`), ""),
      // },
      // "/fileApi//": {
      //   target: `http://112.5.142.34:14021/fileApi/`,
      //   rewrite: (path: string) => path.replace(new RegExp(`^/fileApi//`), ""),
      //   changeOrigin: true,
      // },
    },
  },
  plugins: [
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
})
