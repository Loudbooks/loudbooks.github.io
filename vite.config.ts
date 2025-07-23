import { sveltekit } from "@sveltejs/kit/vite";
import { enhancedImages } from "@sveltejs/enhanced-img";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [enhancedImages(), sveltekit()],
  css: {
    preprocessorOptions: {
      scss: {
        api: "modern-compiler",
      },
    },
  },
  server: {
    fs: {
      allow: ["static"],
    },
    proxy: {
      "/api/spotify": {
        target: "https://loudbook.dev",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/spotify/, "/api/spotify"),
      },
    },
  },
});
