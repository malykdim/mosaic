import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { fileURLToPath } from 'url'

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue()],
  base: '/',
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  server: {
    open: true  // Auto-open browser
  },
  // PRODUCTION CONFIG - UNCOMMENT WHEN DEPLOYING TO damyanovi.netlify.app
  // build: {
  //   target: 'esnext',
  //   minify: 'terser',
  //   sourcemap: false,
  //   rollupOptions: {
  //     output: {
  //       manualChunks: {
  //         vendor: ['vue', 'vue-router', '@supabase/supabase-js'],
  //         pinia: ['pinia']
  //       }
  //     }
  //   }
  // },
  // define: {
  //   __VUE_OPTIONS_API__: false,
  //   __VUE_PROD_DEVTOOLS__: false
  // }
})