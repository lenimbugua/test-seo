import { fileURLToPath, URL } from "url";
import { defineConfig } from "vite";
import eslintPlugin from "vite-plugin-eslint";

import vue from "@vitejs/plugin-vue";
import Components from "unplugin-vue-components/vite";

import AutoImport from "unplugin-auto-import/vite";
import { ElementPlusResolver } from "unplugin-vue-components/resolvers";

// https://vitejs.dev/config/
export default defineConfig({
  base: "./",
  plugins: [
    vue(),
    eslintPlugin(),
    Components({
      resolvers: [ElementPlusResolver()],
    }),
    AutoImport({
      imports: [
        "vue",
        {
          "@vueuse/core": [
            // named imports
            "useMouse", // import { useMouse } from '@vueuse/core',
            "useDark",
            // alias
            ["useFetch", "useMyFetch"], // import { useFetch as useMyFetch } from '@vueuse/core',
          ],
          axios: [
            // default imports
            ["default", "axios"], // import { default as axios } from 'axios',
          ],

          pinia: ["storeToRefs"],
        },
      ],
      resolvers: [ElementPlusResolver()],
      dirs: ["./composables/**"],
      vueTemplate: true,
    }),
  ],
  esbuild: {
    drop: process.env.NODE_ENV === "production" ? ["console", "debugger"] : [],
  },
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
});
