import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

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
