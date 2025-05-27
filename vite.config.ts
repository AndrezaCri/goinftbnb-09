
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [
    react({
      // Disable automatic JSX runtime for smaller bundles
      jsxRuntime: 'automatic',
      // Use SWC for faster compilation without unnecessary polyfills
      tsDecorators: true,
    }),
    mode === 'development' &&
    componentTagger(),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    target: ['es2020', 'chrome80', 'safari14'], // Specific modern browser targets
    minify: 'esbuild',
    cssCodeSplit: true,
    sourcemap: false, // Disable sourcemaps in production for smaller bundles
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          router: ['react-router-dom'],
          ui: ['@radix-ui/react-slot', '@radix-ui/react-toast'],
          query: ['@tanstack/react-query']
        },
        // Optimize chunk names for better caching
        chunkFileNames: 'assets/[name]-[hash].js',
        entryFileNames: 'assets/[name]-[hash].js',
        assetFileNames: 'assets/[name]-[hash].[ext]'
      }
    }
  },
  esbuild: {
    target: 'es2020',
    legalComments: 'none',
    treeShaking: true,
    // Disable transformation of modern JS features
    supported: {
      'bigint': true,
      'top-level-await': true,
      'import-meta': true,
      'dynamic-import': true,
      'optional-chaining': true,
      'nullish-coalescing': true,
      'logical-assignment': true
    }
  },
  optimizeDeps: {
    esbuildOptions: {
      target: 'es2020',
      // Don't transform modern JS features during optimization
      supported: {
        'bigint': true,
        'top-level-await': true
      }
    }
  },
  // Disable legacy polyfills completely
  define: {
    // Remove unnecessary global polyfills
    global: 'globalThis',
  }
}));
