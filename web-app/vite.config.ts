import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'
import svgr from '@svgr/rollup';
import react from '@vitejs/plugin-react-swc'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(), 
    tailwindcss(),
    svgr(),
  ],
})
