import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import eslintPlugin from 'vite-plugin-eslint';
import vuetify from 'vite-plugin-vuetify';

import 'dotenv/config'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vuetify(),
    eslintPlugin({
      emitWarning: true,
      emitError: true,
    }),
  ],
  base: '/',
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    }
  },
  server: {
    port: parseInt(process.env.VITE_PORT) || 3000,
    host: '0.0.0.0',
    hot: true,
    disableHostCheck: true
  },
})
