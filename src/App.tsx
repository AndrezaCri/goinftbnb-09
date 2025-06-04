
import React, { Suspense, lazy } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AlbumProvider } from "@/contexts/AlbumContext";
import Index from "./pages/Index";
import { http, WagmiProvider, createConfig } from "wagmi";
import { mainnet, linea, lineaSepolia } from "wagmi/chains";
import { metaMask } from "wagmi/connectors";

// Lazy load non-critical pages with better chunking
const Albums = lazy(() => import("./pages/Albums"));
const AlbumLab = lazy(() => import("./pages/AlbumLab"));
const Community = lazy(() => import("./pages/Community"));
const Challenges = lazy(() => import("./pages/Challenges"));
const Marketplace = lazy(() => import("./pages/Marketplace"));
const Borrowing = lazy(() => import("./pages/Borrowing"));
const Auth = lazy(() => import("./pages/Auth"));
const NotFound = lazy(() => import("./pages/NotFound"));

//Metamask Config
const config = createConfig({
  ssr: true,
  chains: [mainnet],
  connectors: [metaMask()],
  transports: {
    [mainnet.id]:http("https://data-seed-prebsc-1-s1.bnbchain.org:8545"),
  },
});

// Optimized QueryClient with aggressive caching
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 10, // 10 minutes
      gcTime: 1000 * 60 * 30, // 30 minutes
      retry: 1, // Reduce retries for faster failure
      refetchOnWindowFocus: false, // Reduce unnecessary requests
    },
  },
});

// Ultra-fast loading component
const PageLoader = React.memo(() => (
  <div className="min-h-screen bg-[#121212] flex items-center justify-center">
    <div className="w-8 h-8 border-3 border-gray-700 border-t-[#FFEB3B] rounded-full animate-spin"></div>
  </div>
));

const App = () => {
  return (
    <React.StrictMode>
      <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <AlbumProvider>
          <BrowserRouter>
            <TooltipProvider>
              <Toaster />
              <Sonner />
              <Suspense fallback={<PageLoader />}>
                <Routes>
                  <Route path="/" element={<Index />} />
                  <Route path="/auth" element={<Auth />} />
                  <Route path="/albums" element={<Albums />} />
                  <Route path="/album-lab" element={<AlbumLab />} />
                  <Route path="/community" element={<Community />} />
                  <Route path="/challenges" element={<Challenges />} />
                  <Route path="/marketplace" element={<Marketplace />} />
                  <Route path="/borrowing" element={<Borrowing />} />
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </Suspense>
            </TooltipProvider>
          </BrowserRouter>
        </AlbumProvider>
      </QueryClientProvider>
      </WagmiProvider>
    </React.StrictMode>
  );
};

export default App;
