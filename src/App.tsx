
import React from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AlbumProvider } from "@/contexts/AlbumContext";
import Index from "./pages/Index";
import Albums from "./pages/Albums";
import AlbumLab from "./pages/AlbumLab";
import Community from "./pages/Community";
import Challenges from "./pages/Challenges";
import Marketplace from "./pages/Marketplace";
import NotFound from "./pages/NotFound";

// Create a new QueryClient instance
const queryClient = new QueryClient();

const App = () => {
  return (
    <React.StrictMode>
      <QueryClientProvider client={queryClient}>
        <AlbumProvider>
          <BrowserRouter>
            <TooltipProvider>
              <Toaster />
              <Sonner />
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/albums" element={<Albums />} />
                <Route path="/album-lab" element={<AlbumLab />} />
                <Route path="/community" element={<Community />} />
                <Route path="/challenges" element={<Challenges />} />
                <Route path="/marketplace" element={<Marketplace />} />
                {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </TooltipProvider>
          </BrowserRouter>
        </AlbumProvider>
      </QueryClientProvider>
    </React.StrictMode>
  );
};

export default App;
