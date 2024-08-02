/// <reference types="vitest" />
import react from '@vitejs/plugin-react';
import autoprefixer from 'autoprefixer';
import tailwindcss from 'tailwindcss';
import { defineConfig, loadEnv } from 'vite';
import svgr from "vite-plugin-svgr";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd());
  return {
    base: mode === "production" ? '/contacts' : '/',
    plugins: [react(), svgr()],
    css: {
      postcss: {
        plugins: [tailwindcss, autoprefixer],
      },
    },
    server: {
      proxy: {
        '/api': {
          target: env.VITE_APP_CONTACTS_URL,
          changeOrigin: true,
          secure: false,
          rewrite: (path) => path.replace(/^\/api/, '')
        },
      },
    },
    test: {
      globals: true,
      environment: 'jsdom',
      setupFiles: ['./vitest.setup.ts'],
      coverage: {
        reporter: ['text', 'json', 'html'],
        exclude: ['node_modules', '**/test/**'],
      },
    },
  }
})
