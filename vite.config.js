import { defineConfig } from 'vite'
import {  resolve } from 'path'

export default defineConfig({
  resolve: {
    alias: {
      '@': resolve(__dirname, './src')
    }
  },
  server: {
    open: true,
    },
  base: './'
})