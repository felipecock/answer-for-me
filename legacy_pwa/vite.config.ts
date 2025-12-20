import path from 'path';
import fs from 'fs';
import { defineConfig, loadEnv } from 'vite';
import tailwindcss from '@tailwindcss/vite';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, '.', '');
  // Default ahora en raíz '/'; ajusta VITE_BASE_PATH si necesitas subruta.
  const basePath = env.VITE_BASE_PATH || '/';
  return {
    base: basePath.endsWith('/') ? basePath : basePath + '/',
    define: {
      'process.env.API_KEY': JSON.stringify(env.GEMINI_API_KEY),
      'process.env.GEMINI_API_KEY': JSON.stringify(env.GEMINI_API_KEY)
    },
    plugins: [
      tailwindcss(),
      VitePWA({
        registerType: 'autoUpdate',
        manifest: JSON.parse(fs.readFileSync(path.resolve(__dirname, 'public/manifest.webmanifest'), 'utf-8')),
        includeAssets: [
          'assets/a4m-icon.svg',
          'assets/a4m-icon-192.png',
          'assets/a4m-icon-512.png',
          'assets/a4m-icon-maskable-192.png',
          'assets/a4m-icon-180.png',
          'offline.html'
        ],
        workbox: {
          navigateFallback: basePath + 'index.html',
          globPatterns: ['**/*.{js,css,html,png,svg,json}']
        }
      })
    ],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      }
    }
  };
});
