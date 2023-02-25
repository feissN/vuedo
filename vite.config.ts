import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import { VitePWA } from "vite-plugin-pwa";

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [vue(), vueJsx(), VitePWA({
        mode: "development",
        base: "/",
        srcDir: "src",
        filename: "sw.ts",
        includeAssets: ["/normanfeiss.svg", "/assets/normanfeiss192.png"],
        strategies: "injectManifest",
        manifest: {
            name: "Vuedo",
            short_name: "Vuedo",
            theme_color: "#f2f2f2",
            start_url: "/",
            display: "standalone",
            background_color: "#f2f2f2",
            icons: [
                {
                    src: "assets/normanfeiss192.png",
                    sizes: "192x192",
                    type: "image/png"
                }
            ],
        }
    })],
    resolve: {
        alias: {
            '@': fileURLToPath(new URL('./src', import.meta.url))
        }
    }
})
