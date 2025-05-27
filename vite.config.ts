
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
      // Use SWC for faster compilation without unnecessary polyfills
      tsDecorators: true,
    }),
    mode === 'development' &&
    componentTagger(),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      // Fix ethers/bn.js compatibility issue
      "bn.js": path.resolve(__dirname, "./node_modules/bn.js/lib/bn.js"),
    },
  },
  build: {
    target: ['es2020', 'chrome80', 'safari14'],
    minify: 'esbuild',
    cssCodeSplit: true,
    sourcemap: false,
    chunkSizeWarningLimit: 500,
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          router: ['react-router-dom'],
          'ui-critical': ['@radix-ui/react-slot'],
          'ui-secondary': ['@radix-ui/react-toast', '@radix-ui/react-dialog', '@radix-ui/react-checkbox', '@radix-ui/react-select'],
          'ui-layout': ['@radix-ui/react-accordion', '@radix-ui/react-tabs', '@radix-ui/react-navigation-menu'],
          query: ['@tanstack/react-query'],
          web3: ['ethers'],
          icons: ['lucide-react'],
          utils: ['clsx', 'class-variance-authority', 'tailwind-merge']
        },
        chunkFileNames: (chunkInfo) => {
          const name = chunkInfo.name || 'chunk';
          return `assets/${name}-[hash:6].js`;
        },
        entryFileNames: 'assets/[name]-[hash:6].js',
        assetFileNames: (assetInfo) => {
          const info = assetInfo.name || '';
          if (info.endsWith('.css')) {
            return 'assets/css/[name]-[hash:6].[ext]';
          }
          if (/\.(png|jpe?g|svg|gif|webp|avif)$/.test(info)) {
            return 'assets/images/[name]-[hash:6].[ext]';
          }
          return 'assets/[name]-[hash:6].[ext]';
        }
      },
      external: (id) => {
        return id.includes('ethers') && mode === 'production';
      }
    },
    commonjsOptions: {
      // Handle ethers and its dependencies
      include: [/node_modules/],
      transformMixedEsModules: true,
    }
  },
  esbuild: {
    target: 'es2020',
    legalComments: 'none',
    treeShaking: true,
    minifyIdentifiers: mode === 'production',
    minifySyntax: true,
    minifyWhitespace: true,
    supported: {
      'bigint': true,
      'top-level-await': true,
      'import-meta': true,
      'dynamic-import': true
    }
  },
  optimizeDeps: {
    esbuildOptions: {
      target: 'es2020',
      supported: {
        'bigint': true,
        'top-level-await': true
      }
    },
    include: [
      'react', 
      'react-dom', 
      'react-router-dom',
      'lucide-react',
      'clsx',
      'tailwind-merge',
      'ethers',
      'bn.js'
    ],
    exclude: []
  },
  define: {
    global: 'globalThis',
  },
  experimental: {
    renderBuiltUrl(filename) {
      return { relative: true };
    }
  }
}));
