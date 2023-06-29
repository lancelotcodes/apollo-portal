import { defineConfig } from 'vite';
import tsconfigPaths from 'vite-tsconfig-paths';
import react from '@vitejs/plugin-react';

// uncomment this if you want to view bundles with visuals
// import { visualizer } from 'rollup-plugin-visualizer';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tsconfigPaths(),
    // visualizer()
  ],
  resolve: {
    alias: [{ find: '@', replacement: '/src' }],
  },
});
