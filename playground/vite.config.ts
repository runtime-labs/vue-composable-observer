import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { VueComposableObserver } from '@runtime-labs/composable-plugin/unplugin'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    VueComposableObserver.vite({}),
  ],
  server: {
    host: true,
  },
})
