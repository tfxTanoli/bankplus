import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import {defineConfig} from 'vite';

export default defineConfig(() => {
  return {
    plugins: [react(), tailwindcss()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    build: {
      rollupOptions: {
        output: {
          // Split the large third-party libraries out of the app bundle so each
          // chunk stays under the 500 kB warning limit and vendor code stays
          // cached across deploys.
          manualChunks(id) {
            if (!id.includes('node_modules')) return;
            const p = id.replace(/\\/g, '/');
            if (/node_modules\/(react|react-dom|scheduler)\//.test(p)) return 'react-vendor';
            if (p.includes('node_modules/lucide-react/')) return 'icons-vendor';
            if (p.includes('node_modules/@svg-maps/')) return 'map-vendor';
            return 'vendor';
          },
        },
      },
    },
    server: {
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      // Do not modifyâfile watching is disabled to prevent flickering during agent edits.
      hmr: process.env.DISABLE_HMR !== 'true',
      // Disable file watching when DISABLE_HMR is true to save CPU during agent edits.
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
  };
});
