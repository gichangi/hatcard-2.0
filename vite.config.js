//import fs from "node:fs";
import fs from 'fs/promises';
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import * as esbuild from "esbuild";
import laravel from "laravel-vite-plugin";

const sourceJSPattern = /\/resources\/js\/.*\.jsx$/;
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
/*    server:{
        hmr: true,
      watch:{
          usePolling:true
      }
    },*/
    plugins: [
        laravel({
            input: ['resources/css/app.css', 'resources/js/index.jsx'],
            refresh: false,
        }),
        react(/*{ fastRefresh: false }*/)
    ],
/*    build: {
        rollupOptions: {
            plugins: [
                rollupPlugin([sourceJSPattern])
            ],
        },
        commonjsOptions: {
            transformMixedEsModules: true,
        },
    },*/
/*    optimizeDeps: {
        esbuildOptions: {
            loader: {
                ".js": "jsx",
            },
        },
    },*/
 /*   optimizeDeps: {
        esbuildOptions: {
            plugins: [
                {
                    name: "load-js-files-as-jsx",
                    setup(build) {
                        build.onLoad({ filter: /\/resources\/js\/.*\.js$/ }, async (args) => ({
                            loader: "jsx",
                            contents: await fs.readFile(args.path, "utf8"),
                        }));
                    },
                },
            ],
        },
    },*/
    esbuild: {
        loader: "jsx",
        include: [/\/resources\/.*\.jsx$/, sourceJSPattern],
        exclude: [],
    }
});
