import { sveltekit } from "@sveltejs/kit/vite";
import { enhancedImages } from '@sveltejs/enhanced-img';
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [
    enhancedImages(),
    sveltekit()
  ],
  css: {
    preprocessorOptions: {
      scss: {
        api: 'modern-compiler'
      }
    }
  },
  server: {
    fs: {
      allow: [
        "static",
      ]
    }
  },
});
