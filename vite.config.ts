import path from 'node:path'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

// https://vite.dev/config/
export default defineConfig({
  // Build optimizations
  build: {
    // Target modern browsers for smaller bundles
    target: 'es2020',
    // Enable minification
    minify: 'terser',
    // Optimize CSS
    cssMinify: true,
    // Source maps for debugging
    sourcemap: false,
    // Rollup options for better chunking
    rollupOptions: {
      output: {
        // Manual chunks for better caching
        manualChunks: {
          // Vendor libraries
          vendor: ['react', 'react-dom'],
          ui: ['lucide-react', '@radix-ui/react-select', '@radix-ui/react-dialog'],
          forms: ['zod'],
          utils: ['clsx', 'tailwind-merge', 'class-variance-authority'],
          // PWA related
          pwa: ['workbox-window']
        },
        // Chunk file naming
        chunkFileNames: 'assets/[name]-[hash].js',
        entryFileNames: 'assets/[name]-[hash].js',
        assetFileNames: 'assets/[name]-[hash].[ext]'
      }
    },
    // Chunk size warning limit
    chunkSizeWarningLimit: 1000
  },
  
  // Performance optimizations
  optimizeDeps: {
    include: ['react', 'react-dom', 'lucide-react', 'zod'],
    exclude: ['@vite/client', '@vite/env']
  },
  
  // Server optimizations
  server: {
    fs: {
      strict: true
    }
  },
  
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.ico', 'apple-touch-icon.png', 'safari-pinned-tab.svg'],
      manifest: {
        name: 'Baby Food Tracker - Introdução Alimentar',
        short_name: 'Baby Food',
        description: 'Acompanhe a introdução alimentar do seu bebê de forma prática e segura',
        theme_color: '#8b5cf6',
        background_color: '#ffffff',
        display: 'standalone',
        orientation: 'portrait',
        start_url: '/',
        scope: '/',
        id: 'baby-food-tracker',
        categories: ['health', 'medical', 'lifestyle', 'productivity'],
        lang: 'pt-BR',
        dir: 'ltr',
        icons: [
          {
            src: 'icons/icon-72x72.svg',
            sizes: '72x72',
            type: 'image/svg+xml'
          },
          {
            src: 'icons/icon-96x96.svg',
            sizes: '96x96',
            type: 'image/svg+xml'
          },
          {
            src: 'icons/icon-128x128.svg',
            sizes: '128x128',
            type: 'image/svg+xml'
          },
          {
            src: 'icons/icon-144x144.svg',
            sizes: '144x144',
            type: 'image/svg+xml'
          },
          {
            src: 'icons/icon-152x152.svg',
            sizes: '152x152',
            type: 'image/svg+xml'
          },
          {
            src: 'icons/icon-192x192.svg',
            sizes: '192x192',
            type: 'image/svg+xml'
          },
          {
            src: 'icons/icon-384x384.svg',
            sizes: '384x384',
            type: 'image/svg+xml'
          },
          {
            src: 'icons/icon-512x512.svg',
            sizes: '512x512',
            type: 'image/svg+xml'
          },
          {
            src: 'icons/icon-512x512.svg',
            sizes: '512x512',
            type: 'image/svg+xml',
            purpose: 'maskable'
          }
        ]
      },
      workbox: {
        globPatterns: ['**/*.{js,css,html,ico,png,svg,woff2}'],
        cleanupOutdatedCaches: true,
        skipWaiting: true,
        clientsClaim: true,
        runtimeCaching: [
          {
            urlPattern: /^https:\/\/fonts\.googleapis\.com\/.*/i,
            handler: 'CacheFirst',
            options: {
              cacheName: 'google-fonts-cache',
              expiration: {
                maxEntries: 10,
                maxAgeSeconds: 60 * 60 * 24 * 365 // 1 year
              }
            }
          },
          {
            urlPattern: /\.(?:png|jpg|jpeg|svg|gif|ico)$/,
            handler: 'CacheFirst',
            options: {
              cacheName: 'images-cache',
              expiration: {
                maxEntries: 100,
                maxAgeSeconds: 60 * 60 * 24 * 30 // 30 days
              }
            }
          },
          {
            urlPattern: /^https:\/\/api\./,
            handler: 'NetworkFirst',
            options: {
              cacheName: 'api-cache',
              networkTimeoutSeconds: 3,
              expiration: {
                maxEntries: 50,
                maxAgeSeconds: 60 * 60 * 24 // 24 hours
              }
            }
          },
          {
            urlPattern: ({ request }) => request.destination === 'document',
            handler: 'NetworkFirst',
            options: {
              cacheName: 'pages-cache',
              networkTimeoutSeconds: 3,
              expiration: {
                maxEntries: 50,
                maxAgeSeconds: 60 * 60 * 24 // 24 hours
              }
            }
          }
        ]
      },
      devOptions: {
        enabled: true,
        type: 'module'
      }
    })
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
})
