import {fileURLToPath, URL} from 'node:url'

import {defineConfig} from 'vite'
import vue from '@vitejs/plugin-vue'
import path from "path";

export default defineConfig({
    plugins: [
        vue({
            babel: {
                plugins: [
                    '@babel/plugin-proposal-optional-chaining']
            }
        }),
    ],
    resolve: {
        alias:{
            '@':  path.resolve(__dirname, "./src")
        }
    }
})
