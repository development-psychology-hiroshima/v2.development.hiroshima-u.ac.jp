/* eslint-disable no-unused-vars */
import { visualizer } from "rollup-plugin-visualizer";
import { fileURLToPath } from "url";
import { defineConfig } from "vite";
import viteCompression from "vite-plugin-compression";
import vitePluginImp from "vite-plugin-imp";
import { VitePWA } from "vite-plugin-pwa";
import topLevelAwait from "vite-plugin-top-level-await";
import legacy from "@vitejs/plugin-legacy";
import vue from "@vitejs/plugin-vue";

// https://vitejs.dev/config/
// noinspection JSUnusedGlobalSymbols
export default defineConfig({
  plugins: [
    vue(),
    topLevelAwait({
      // The export name of top-level await promise for each chunk module
      promiseExportName: "__tla",
      // The function to generate import names of top-level await promise in each chunk module
      promiseImportName: (i) => `__tla_${i}`,
    }),
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
            urlPattern: /(.*?)\.(png|jpe?g|svg|gif|webp)/,
            handler: "StaleWhileRevalidate",
            options: {
              cacheName: "image-cache",
            },
          },
          {
            urlPattern: /(.*?)\.(js|css|ya?ml)/,
            handler: "NetworkFirst",
            options: {
              cacheName: "js-css-cache",
            },
          },
        ],
      },
      // uncomment to unregister service worker
      // selfDestroying: true,
    }),
    vitePluginImp(),
    // viteCompression({ algorithm: "brotliCompress" }),
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
        index: fileURLToPath(new URL("./index.html", import.meta.url)),
        umemura: fileURLToPath(new URL("./umemura.html", import.meta.url)),
        sugimura: fileURLToPath(new URL("./sugimura.html", import.meta.url)),
        // members: fileURLToPath(new URL("./members.html", import.meta.url)),
        // research_activity_umemura: fileURLToPath(
        //   new URL("./research_activity_umemura.html", import.meta.url)
        // ),
        // research_activity_students: fileURLToPath(
        //   new URL("./research_activity_students.html", import.meta.url)
        // ),
        // annual_schedule: fileURLToPath(
        //   new URL("./annual_schedule.html", import.meta.url)
        // ),
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
