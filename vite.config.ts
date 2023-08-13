import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig(({command}) => {
  if(command === 'serve') {
    return {
      plugins: [react()],
      server: {
        proxy: {
          '/api': 'http://localhost:8181'
        }
      }
    }
  }
  return {
    plugins: [react()],
  }
})
