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
      tsDecorators: true,
      plugins: mode === 'production' ? [
        ["@swc/plugin-remove-console", {}]
      ] : []
    }),
    mode === 'development' && componentTagger(),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      "bn.js": path.resolve(__dirname, "./node_modules/bn.js/lib/bn.js"),
    },
  },
  build: {
    target: ['es2020', 'chrome80', 'safari14'],
    minify: 'esbuild',
    cssCodeSplit: true,
    sourcemap: false,
    chunkSizeWarningLimit: 150, // Reduced for stricter bundle control
    rollupOptions: {
      output: {
        manualChunks: {
          // Ultra-critical core - keep minimal
          'vendor-core': ['react', 'react-dom'],
          'router': ['react-router-dom'],
          
          // UI components - aggressive splitting
          'ui-primitives': ['@radix-ui/react-slot'],
          'ui-interactive': ['@radix-ui/react-dialog', '@radix-ui/react-select', '@radix-ui/react-checkbox'],
          'ui-layout': ['@radix-ui/react-accordion', '@radix-ui/react-tabs', '@radix-ui/react-navigation-menu'],
          'ui-feedback': ['@radix-ui/react-toast', '@radix-ui/react-progress'],
          
          // Data management - lazy loaded
          'query': ['@tanstack/react-query'],
          
          // Web3 - ultra-lazy loaded only when needed
          'web3': ['ethers'],
          
          // Icons - completely separate for lazy loading
          'icons': ['lucide-react'],
          
          // Chart library - lazy loaded
          'charts': ['recharts'],
          
          // Utilities
          'utils': ['clsx', 'class-variance-authority', 'tailwind-merge'],
          
          // Form handling
          'forms': ['react-hook-form', '@hookform/resolvers', 'zod']
        },
        chunkFileNames: (chunkInfo) => {
          const name = chunkInfo.name || 'chunk';
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
      }
    },
    commonjsOptions: {
      include: [/node_modules/],
      transformMixedEsModules: true,
      namedExports: {
        'bn.js': ['BN']
      }
    }
  },
  esbuild: {
    target: 'es2020',
    legalComments: 'none',
    treeShaking: true,
    minifyIdentifiers: true,
    minifySyntax: true,
    minifyWhitespace: true,
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
      '@radix-ui/react-slot'
    ],
    exclude: [
      'lucide-react', // Lazy load icons
      'ethers', // Lazy load Web3
      'recharts' // Lazy load charts
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
