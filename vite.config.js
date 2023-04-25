import fs from "node:fs";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import * as esbuild from "esbuild";
import laravel from "laravel-vite-plugin";

const sourceJSPattern = /\/resources\/js\/.*\.js$/;
const rollupPlugin = (matchers) => ({
    name: "js-in-jsx",
    load(id) {
        if (matchers.some(matcher => matcher.test(id))) {
            const file = fs.readFileSync(id, { encoding: "utf-8" });
            return esbuild.transformSync(file, { loader: "jsx" });
        }
    }
});

export default defineConfig({
    plugins: [
        laravel({
            input: ['resources/css/app.css', 'resources/js/app.js'],
            refresh: true,
        }),
        react(),
    ],
    build: {
        rollupOptions: {
            plugins: [
                rollupPlugin([sourceJSPattern])
            ],
        },
        commonjsOptions: {
            transformMixedEsModules: true,
        },
    },
    optimizeDeps: {
        esbuildOptions: {
            loader: {
                ".js": "jsx",
            },
        },
    },
    esbuild: {
        loader: "jsx",
        include: [sourceJSPattern],
        exclude: [],
    },
});
