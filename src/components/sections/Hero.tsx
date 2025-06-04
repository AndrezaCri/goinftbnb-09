
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
      <div className="hero-content -mt-20 sm:-mt-24 md:-mt-28 lg:-mt-32">
        <div className="text-left w-full">
          <h1 className="hero-title desktop-text-large mb-2 sm:mb-3">
            GoINFT
          </h1>
          <div className="hero-subtitle font-medium text-[#e0e0e0] mb-1 sm:mb-2">Football NFT Stickers</div>
          <div className="hero-tagline mb-4 sm:mb-6">
            on BNB Chain
          </div>
        </div>
        <div className="hero-buttons mt-2 mb-4 flex flex-col sm:flex-row gap-3 sm:gap-4 justify-start items-start w-full -ml-2">
          <button 
            onClick={handleCollectClick}
            className="btn-primary w-auto min-w-[120px] px-6 py-3 text-base font-semibold"
            type="button"
            aria-label="Start collecting NFT stickers"
          >
            Collect
          </button>
          <button 
            onClick={handleTradeClick}
            className="btn-secondary w-auto min-w-[120px] px-6 py-3 text-base font-semibold"
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
