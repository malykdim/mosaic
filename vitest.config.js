import { defineConfig } from 'vitest/config'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [vue()],
  test: {
    environment: 'jsdom', // 👈 Required for anything DOM related
    globals: true,         // 👈 Optional but helpful for `describe`, `it`, etc. without imports
  },
})