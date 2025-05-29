
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
      <div className="hero-content -mt-16 sm:-mt-20 md:-mt-24 lg:-mt-28">
        <h1 className="hero-title desktop-text-large mb-3 sm:mb-4">
          GoINFT
        </h1>
        <div className="hero-subtitle font-medium text-[#e0e0e0] mb-2 sm:mb-3">Football NFT Stickers</div>
        <div className="hero-tagline mb-6 sm:mb-8">
          on BNB Chain
        </div>
        <div className="hero-buttons mt-4 mb-6 flex flex-col sm:flex-row gap-3 sm:gap-6 justify-center items-center w-full px-4 sm:px-0">
          <button 
            onClick={handleCollectClick}
            className="btn-primary w-full sm:w-auto min-w-[160px] px-8 py-4 text-lg font-semibold"
            type="button"
            aria-label="Start collecting NFT stickers"
          >
            Collect
          </button>
          <button 
            onClick={handleTradeClick}
            className="btn-secondary w-full sm:w-auto min-w-[160px] px-8 py-4 text-lg font-semibold"
            type="button"
            aria-label="Start trading NFT stickers"
          >
            Trade
          </button>
        </div>
      </div>
    </section>
  );
};
