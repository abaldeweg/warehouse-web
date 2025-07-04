import { fileURLToPath, URL } from 'node:url'
import { defineConfig, loadEnv } from 'vite'
import { VitePWA } from 'vite-plugin-pwa'
import { ViteWebfontDownload } from 'vite-plugin-webfont-dl'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  // eslint-disable-next-line no-undef
  const env = loadEnv(mode, process.cwd(), '')

  return {
    plugins: [
      vue(),
      VitePWA({
        includeAssets: ['favicon.svg', 'favicon.ico', 'robots.txt', 'apple-touch-icon.png'],
        manifest: {
          name: 'name',
          short_name: 'warehouse',
          description: 'Discover products in our catalog.',
          theme_color: '#d31e27',
          icons: [
            {
              src: 'android-chrome-192x192.png',
              sizes: '192x192',
              type: 'image/png',
            },
            {
              src: 'android-chrome-512x512.png',
              sizes: '512x512',
              type: 'image/png',
            },
          ],
        },
        registerType: 'autoUpdate',
      }),
      ViteWebfontDownload([
        'https://fonts.googleapis.com/css2?family=Open+Sans&display=swap',
        'https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200',
      ]),
    ],
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url)),
      },
      dedupe: ['vue'],
    },
    base: env.VITE_BASE_URL,
    test: {
      setupFiles: ['src/unit.setup.ts'],
      environment: 'jsdom',
      root: fileURLToPath(new URL('./', import.meta.url)),
    },
  }
})
