
import React, { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Info } from "lucide-react";

export const Footer = () => {
  const [isOpen, setIsOpen] = useState(false);
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen && scrollAreaRef.current) {
      // Scroll to top when dialog opens
      const viewport = scrollAreaRef.current.querySelector('[data-radix-scroll-area-viewport]');
      if (viewport) {
        viewport.scrollTop = 0;
      }
    }
  }, [isOpen]);

  // Scroll to dialog when it opens
  useEffect(() => {
    if (isOpen) {
      // Wait a bit for the dialog to render, then scroll to it
      setTimeout(() => {
        const dialogElement = document.querySelector('[role="dialog"]');
        if (dialogElement) {
          dialogElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 100);
    }
  }, [isOpen]);

  return (
    <footer className="bg-black text-white py-6 border-t border-gray-800">
      <div className="max-w-6xl mx-auto px-8 flex justify-center">
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogTrigger asChild>
            <Button 
              variant="outline" 
              className="bg-[#111] border-[#333] text-white hover:bg-[#222] hover:border-[#FFEB3B] flex items-center gap-2 transition-colors"
            >
              <Info size={16} />
              About GoINFT
            </Button>
          </DialogTrigger>
          <DialogContent className="bg-black text-white border-gray-800 max-w-2xl max-h-[80vh]">
            <DialogHeader>
              <DialogTitle className="text-2xl font-bold text-[#FFEB3B] mb-4">
                GoINFT - Football NFT Stickers
              </DialogTitle>
            </DialogHeader>
            <ScrollArea ref={scrollAreaRef} className="h-[60vh] pr-4">
              <div className="space-y-4">
                <div>
                  <h3 className="text-xl font-semibold mb-2 text-[#FFEB3B]">Mission</h3>
                  <p className="text-gray-300">
                    GoINFT is a revolutionary platform that combines the passion for football with blockchain technology innovation. 
                    Our goal is to create a complete ecosystem for football NFT collectors.
                  </p>
                </div>
                
                <div>
                  <h3 className="text-xl font-semibold mb-2 text-[#FFEB3B]">What we do</h3>
                  <ul className="space-y-2 text-gray-300">
                    <li>• <strong>Collect:</strong> Acquire unique football player NFT stickers</li>
                    <li>• <strong>Trade:</strong> Exchange your cards with other collectors</li>
                    <li>• <strong>Complete Albums:</strong> Build complete collections and earn rewards</li>
                    <li>• <strong>Marketplace:</strong> Buy and sell NFTs in our decentralized market</li>
                    <li>• <strong>Challenges:</strong> Participate in competitions and special events</li>
                    <li>• <strong>Community:</strong> Connect with other football fans and collectors</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-xl font-semibold mb-2 text-[#FFEB3B]">Technology</h3>
                  <p className="text-gray-300">
                    Built on BNB Chain for fast and economical transactions, with MetaMask integration 
                    for a secure and decentralized experience.
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-semibold mb-2 text-[#FFEB3B]">Partners</h3>
                  <p className="text-gray-300">
                    Trusted by BNB Chain, Binance and MetaMask, ensuring security and quality 
                    in all transactions.
                  </p>
                </div>
              </div>
            </ScrollArea>
          </DialogContent>
        </Dialog>
      </div>
    </footer>
  );
};
