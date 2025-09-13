import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { fileURLToPath } from 'url'

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue({
    template: {
      compilerOptions: {
        sourceMap: true
      }
    }
  })],
  base: '/',
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  css: {
    devSourcemap: true, // Explicitly enable CSS source maps in dev
    preprocessorOptions: {
      scss: {
        sourcemap: true,
        api: 'modern-compiler', // if you're using sass-embedded
      }
    },
  },
  server: {
    open: true  // Auto-open browser
  },
  build: {
    sourcemap: true // Enable source maps in build
  }
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