
import React, { Suspense, lazy } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AlbumProvider } from "@/contexts/AlbumContext";
import Index from "./pages/Index";

// Ultra-aggressive lazy loading with route-based code splitting
const Albums = lazy(() => import("./pages/Albums"));
const AlbumLab = lazy(() => import("./pages/AlbumLab"));
const Community = lazy(() => import("./pages/Community"));
const Challenges = lazy(() => import("./pages/Challenges"));
const Marketplace = lazy(() => import("./pages/Marketplace"));
const NotFound = lazy(() => import("./pages/NotFound"));

// Ultra-optimized QueryClient with aggressive caching
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 15, // 15 minutes
      gcTime: 1000 * 60 * 60, // 1 hour
      retry: 1,
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
      networkMode: 'offlineFirst'
    },
    mutations: {
      retry: 1,
      networkMode: 'offlineFirst'
    }
  },
});

// Ultra-fast loading component with content visibility
const PageLoader = React.memo(() => (
  <div 
    className="min-h-screen bg-[#121212] flex items-center justify-center"
    style={{ contentVisibility: 'auto' }}
  >
    <div className="loader" aria-label="Loading page"></div>
  </div>
));

const App = () => {
  return (
    <React.StrictMode>
      <QueryClientProvider client={queryClient}>
        <AlbumProvider>
          <BrowserRouter>
            <TooltipProvider>
              <Suspense fallback={<PageLoader />}>
                <Routes>
                  <Route path="/" element={<Index />} />
                  <Route path="/albums" element={<Albums />} />
                  <Route path="/album-lab" element={<AlbumLab />} />
                  <Route path="/community" element={<Community />} />
                  <Route path="/challenges" element={<Challenges />} />
                  <Route path="/marketplace" element={<Marketplace />} />
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </Suspense>
              <Toaster />
              <Sonner />
            </TooltipProvider>
          </BrowserRouter>
        </AlbumProvider>
      </QueryClientProvider>
    </React.StrictMode>
  );
};

export default App;
