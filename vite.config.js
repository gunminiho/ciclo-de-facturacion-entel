import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import VueInspector from 'vite-plugin-vue-inspector'

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue(),
  VueInspector(),
  ],
})
