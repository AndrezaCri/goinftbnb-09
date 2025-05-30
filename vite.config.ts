
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
      // Use SWC for faster compilation with desktop optimizations
      tsDecorators: true,
      plugins: mode === 'production' ? [
        ["@swc/plugin-remove-console", {}]
      ] : []
    }),
    mode === 'development' &&
    componentTagger(),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      // Fix ethers/bn.js compatibility issue - use the CommonJS version
      "bn.js": path.resolve(__dirname, "./node_modules/bn.js/lib/bn.js"),
    },
  },
  build: {
    target: ['es2020', 'chrome80', 'safari14'],
    minify: 'esbuild',
    cssCodeSplit: true,
    sourcemap: false,
    chunkSizeWarningLimit: 200, // Reduced for stricter bundle control
    rollupOptions: {
      output: {
        manualChunks: {
          // Ultra-critical vendor chunk - desktop optimized
          'vendor-core': ['react', 'react-dom'],
          'router': ['react-router-dom'],
          
          // UI chunks by desktop priority
          'ui-critical': ['@radix-ui/react-slot', '@radix-ui/react-progress'],
          'ui-forms': ['@radix-ui/react-checkbox', '@radix-ui/react-select', '@radix-ui/react-dialog'],
          'ui-desktop': ['@radix-ui/react-accordion', '@radix-ui/react-tabs', '@radix-ui/react-navigation-menu'],
          'ui-feedback': ['@radix-ui/react-toast'],
          
          // Data management - desktop optimized
          'query': ['@tanstack/react-query'],
          
          // Web3 - ultra-lazy loaded for desktop
          'web3': ['ethers'],
          
          // Icons - separate chunk for desktop lazy loading
          'icons': ['lucide-react'],
          
          // Utilities - desktop optimized
          'utils': ['clsx', 'class-variance-authority', 'tailwind-merge']
        },
        chunkFileNames: (chunkInfo) => {
          const name = chunkInfo.name || 'chunk';
          // Desktop-optimized chunk naming
          return `assets/js/${name}-[hash:6].js`;
        },
        entryFileNames: 'assets/js/[name]-[hash:6].js',
        assetFileNames: (assetInfo) => {
          const info = assetInfo.name || '';
          if (info.endsWith('.css')) {
            return 'assets/css/[name]-[hash:6].[ext]';
          }
          if (/\.(png|jpe?g|svg|gif|webp|avif)$/.test(info)) {
            return 'assets/img/[name]-[hash:6].[ext]';
          }
          return 'assets/[name]-[hash:6].[ext]';
        }
      }
    },
    commonjsOptions: {
      // Handle ethers and its dependencies including bn.js and hash.js
      include: [/node_modules/],
      transformMixedEsModules: true,
      // Explicitly handle modules as CommonJS
      namedExports: {
        'bn.js': ['BN'],
        'hash.js': ['sha1', 'sha224', 'sha256', 'sha384', 'sha512', 'ripemd160'],
        'js-sha3': ['keccak256', 'keccak512', 'keccak384', 'keccak224', 'sha3_256', 'sha3_512', 'sha3_384', 'sha3_224', 'shake128', 'shake256']
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
    // Enhanced drops for desktop production
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
      // Include critical UI components for desktop
      '@radix-ui/react-slot',
      '@radix-ui/react-progress',
      // Force include ethers and its problematic dependencies for compatibility
      'ethers',
      'bn.js',
      'hash.js',
      'js-sha3'
    ],
    exclude: [
      // Ultra-lazy load for desktop optimization
      'lucide-react'
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
