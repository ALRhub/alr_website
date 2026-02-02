// @ts-check
import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';

import icon from 'astro-icon';

// https://astro.build/config
export default defineConfig({
  site: "https://alr-kit.de",
  compressHTML: true,
  build: {
    inlineStylesheets: 'always',
    // @ts-expect-error - assetsInlineLimit is not in Astro's type definition but works at runtime
    assetsInlineLimit: 10240,
  },
  vite: {
    plugins: [
      // @ts-expect-error - Tailwind CSS Vite plugin has type incompatibility with Astro's Vite types
      tailwindcss(),
    ],
    build: {
      assetsInlineLimit: 10240,
    }
  },

  integrations: [icon()]
});
