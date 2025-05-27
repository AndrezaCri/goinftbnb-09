
import React from "react";
import { useNavigate } from "react-router-dom";

export const Hero = () => {
  const navigate = useNavigate();

  const handleCollectClick = () => {
    navigate("/marketplace?tab=packs");
  };

  const handleTradeClick = () => {
    navigate("/marketplace?tab=trading");
  };

  return (
    <section className="hero-container desktop-enhanced">
      <div className="hero-content">
        <h1 className="hero-title desktop-text-large">
          GoINFT
        </h1>
        <div className="hero-subtitle">Football NFT Stickers</div>
        <div className="hero-tagline">
          on BNB Chain
        </div>
        <div className="hero-buttons">
          <button 
            onClick={handleCollectClick}
            className="btn-primary"
            type="button"
            aria-label="Start collecting NFT stickers"
          >
            Collect
          </button>
          <button 
            onClick={handleTradeClick}
            className="btn-secondary"
            type="button"
            aria-label="Start trading NFT stickers"
          >
            Trade
          </button>
        </div>
      </div>
      
      {/* Desktop-only hero image section */}
      <div className="hidden lg:flex items-center justify-center p-8">
        <div className="relative">
          <div className="absolute w-[280px] h-[380px] bg-gradient-to-br from-[#FFEB3B] to-[#FDD835] rotate-[-10deg] translate-x-[40px] rounded-2xl opacity-20" />
          <div className="absolute w-[280px] h-[380px] bg-gradient-to-br from-[#FFEB3B] to-[#FDD835] rotate-[10deg] translate-x-[-40px] rounded-2xl opacity-20" />
          <div className="relative w-[280px] h-[380px] bg-gradient-to-br from-[#333] to-[#555] rounded-2xl border-4 border-[#FFEB3B] overflow-hidden shadow-2xl">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-white text-center">
                <div className="text-2xl font-bold mb-2">Premier Player</div>
                <div className="text-sm text-gray-300 mb-4">Limited Edition</div>
                <div className="w-16 h-16 mx-auto bg-[#FFEB3B] rounded-full flex items-center justify-center">
                  <span className="text-black font-bold text-xl">⚽</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
