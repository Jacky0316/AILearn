import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// GitHub Pages 部署在子路径 /AILearn/ 下：构建时加 base 前缀，本地 dev 不受影响
export default defineConfig(({ command }) => ({
  plugins: [react()],
  base: command === 'build' ? '/AILearn/' : '/',
  server: { port: 5173 },
}))
