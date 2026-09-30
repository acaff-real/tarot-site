// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import cloudflare from '@astrojs/cloudflare';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  site: 'https://astrobyanisha.com',
  security: {
    checkOrigin: false
  },
  prefetch: {
    prefetchAll: true,
    defaultStrategy: 'hover'
  },
  integrations: [
    sitemap({
      filter: (page) => !page.includes('/404') && !page.includes('/admin') && !page.includes('/journalist') && !page.includes('/publish')
    })
  ],
  vite: {
    plugins: [tailwindcss()]
  },

  adapter: cloudflare()
});