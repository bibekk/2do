import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { VitePWA } from 'vite-plugin-pwa'

// https://vite.dev/config/


const manifestForPlugIn = {
  registerType:'autoUpdate',
  includeAssests:['favicon.ico', "apple-touch-icon.png", "maskable_icon.png"],
  manifest:{
    name:"2Do",
    short_name:"2Do",
    description:"Simple 2Do app",
    icons:[
    {
      src: '/apple-touch-icon.png',
      sizes:'180x180',
      type:'image/png',
      purpose:'apple touch icon',
    },
  ],
  theme_color:'#171717',
  }
}

export default defineConfig({
  plugins: [react(), tailwindcss(), VitePWA(manifestForPlugIn)]
})