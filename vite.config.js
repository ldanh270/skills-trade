import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

export default defineConfig({
    plugins: [
        react(), // Vite sẽ tự tìm .babelrc
    ],
    resolve: {
        alias: {
            '~': '/src',
        },
    },
})
