import path from "path";
import { visualizer } from "rollup-plugin-visualizer";
import { fileURLToPath } from "url";
import { defineConfig } from "vite";
import { VitePWA } from "vite-plugin-pwa";
import legacy from "@vitejs/plugin-legacy";
import vue from "@vitejs/plugin-vue";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
// https://vitejs.dev/config/
// noinspection JSUnusedGlobalSymbols
export default defineConfig({
  plugins: [
    vue(),
    legacy({
      targets: [
        "Android >= 39",
        "Chrome >= 50",
        "Safari >= 10.1",
        "iOS >= 10.3",
        "> 1%",
      ],
    }),
    VitePWA({
      injectRegister: "auto",
      registerType: "autoUpdate",
      includeManifestIcons: true,
      includeAssets: ["favicons/*.png"],
      manifest: {
        name: "広島大学発達心理学研究室",
        short_name: "広大発達研",
        description: "広島大学発達心理学研究室",
        lang: "ja",
        theme_color: "#ffffff",
        icons: [
          {
            src: "/favicons/apple-touch-icon.png",
            sizes: "180x180",
            type: "image/png",
          },
          {
            src: "/favicons/maskable-192x192.png",
            sizes: "192x192",
            type: "image/png",
            purpose: "maskable",
          },
          {
            src: "/favicons/android-chrome-192x192.png",
            sizes: "192x192",
            type: "image/png",
          },
          {
            src: "/favicons/android-chrome-512x512.png",
            sizes: "512x512",
            type: "image/png",
          },
        ],
      },
      workbox: {
        runtimeCaching: [
          {
            urlPattern: /(.*?)\.(png|jpe?g|svg|gif|webp|ico)$/i,
            handler: "StaleWhileRevalidate",
            options: {
              cacheName: "image-cache",
            },
          },
          {
            urlPattern: /(.*?)\.(js|css|ya?ml|json)$/i,
            handler: "NetworkFirst",
            options: {
              cacheName: "static-cache",
              networkTimeoutSeconds: 5,
            },
          },
        ],
      },
      // uncomment to unregister service worker
      // selfDestroying: true,
    }),
    visualizer(),
  ],
  build: {
    cssCodeSplit: false,
    emptyOutDir: true,
    reportCompressedSize: true,
    minify: "terser",
    terserOptions: {
      toplevel: true,
      safari10: true,
    },
    rollupOptions: {
      input: {
        index: path.resolve(__dirname, "index.html"),
        umemura: path.resolve(__dirname, "umemura.html"),
        sugimura: path.resolve(__dirname, "sugimura.html"),
        members: path.resolve(__dirname, "members.html"),
        research_students: path.resolve(__dirname, "research_students.html"),
        annual_schedule: path.resolve(__dirname, "annual_schedule.html"),
      },

      // output: {
      //   manualChunks(id) {
      //     if (id.includes("components")) {
      //       // packs all /components/*.vue files into components.js
      //       return "components";
      //     }
      //   },
      // },
    },
  },
});
