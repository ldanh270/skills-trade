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
    server: {
        proxy: {
            '/api': {
                target: 'http://3.27.34.91:8000',
                changeOrigin: true,
                rewrite: (path) => path.replace(/^\/api/, ''),
            },
        },
    },
})
