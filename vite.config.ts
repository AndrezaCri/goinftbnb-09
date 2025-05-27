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
      // Use SWC for faster compilation
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
    chunkSizeWarningLimit: 300,
    rollupOptions: {
      output: {
        manualChunks: {
          // Critical vendor chunk - keep small
          'vendor-core': ['react', 'react-dom'],
          'router': ['react-router-dom'],
          
          // UI chunks by priority
          'ui-critical': ['@radix-ui/react-slot', '@radix-ui/react-progress'],
          'ui-forms': ['@radix-ui/react-checkbox', '@radix-ui/react-select', '@radix-ui/react-dialog'],
          'ui-layout': ['@radix-ui/react-accordion', '@radix-ui/react-tabs', '@radix-ui/react-navigation-menu'],
          'ui-feedback': ['@radix-ui/react-toast'],
          
          // Data management
          'query': ['@tanstack/react-query'],
          
          // Web3 - lazy loaded
          'web3': ['ethers'],
          
          // Icons - separate chunk for lazy loading
          'icons': ['lucide-react'],
          
          // Utilities
          'utils': ['clsx', 'class-variance-authority', 'tailwind-merge']
        },
        chunkFileNames: (chunkInfo) => {
          const name = chunkInfo.name || 'chunk';
          // Use shorter hash for smaller file names
          return `assets/js/${name}-[hash:8].js`;
        },
        entryFileNames: 'assets/js/[name]-[hash:8].js',
        assetFileNames: (assetInfo) => {
          const info = assetInfo.name || '';
          if (info.endsWith('.css')) {
            return 'assets/css/[name]-[hash:8].[ext]';
          }
          if (/\.(png|jpe?g|svg|gif|webp|avif)$/.test(info)) {
            return 'assets/img/[name]-[hash:8].[ext]';
          }
          return 'assets/[name]-[hash:8].[ext]';
        }
      },
      external: (id) => {
        // Don't externalize in development for easier debugging
        return false;
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
    minifyIdentifiers: true,
    minifySyntax: true,
    minifyWhitespace: true,
    // Remove some features for better compression
    drop: mode === 'production' ? ['console', 'debugger'] : [],
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
      'clsx',
      'tailwind-merge',
      // Include only critical UI components in main bundle
      '@radix-ui/react-slot',
      '@radix-ui/react-progress'
    ],
    exclude: [
      // Lazy load these for better initial bundle size
      'lucide-react',
      'ethers',
      'bn.js'
    ]
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
