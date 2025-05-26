
import React from "react";
import { useNavigate } from "react-router-dom";

export const Hero = () => {
  const navigate = useNavigate();

  const handleCollectClick = () => {
    navigate("/marketplace?tab=packs");
  };

  return (
    <section className="flex-1">
      <h1 className="text-[64px] font-bold leading-[1.1] mb-4 max-sm:text-[40px]">
        GoINFT
      </h1>
      <div className="text-[32px] mb-4 max-sm:text-2xl">Football NFT Stickers</div>
      <div className="text-[32px] text-[#666] mb-8 max-sm:text-2xl">
        on BNB Chain
      </div>
      <div className="flex gap-4">
        <button 
          onClick={handleCollectClick}
          className="bg-[#FFEB3B] text-black px-6 py-2 rounded-full hover:bg-[#FFD700] transition-colors"
        >
          Collect
        </button>
        <button 
          className="text-white border border-white px-6 py-2 rounded-full hover:bg-gray-800 transition-colors"
        >
          Trade
        </button>
      </div>
    </section>
  );
};
