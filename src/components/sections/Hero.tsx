
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
      <div className="hero-content -mt-16">
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
    </section>
  );
};
