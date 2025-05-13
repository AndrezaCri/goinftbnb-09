
import React from "react";

export const NFTCollection = () => {
  return (
    <section className="bg-white text-black p-8 rounded-3xl max-sm:p-4">
      <div className="text-[32px] font-bold mb-2">
        Featured NFT Collection
      </div>
      <p className="text-[#666] mb-4">
        Premier League 2024/25 - Exclusive digital stickers with unique attributes
      </p>
      <button className="bg-black text-white mb-12 px-4 py-2 rounded-lg hover:bg-gray-900 transition-colors">
        View Collection
      </button>

      <div className="relative">
        <div className="flex justify-center mb-12">
          <div className="relative">
            <div className="absolute w-[300px] h-[400px] bg-[#222] rotate-[-15deg] translate-x-[60px] rounded-2xl border-4 border-[#FFEB3B]" />
            <div className="absolute w-[300px] h-[400px] bg-[#222] rotate-[15deg] translate-x-[-60px] rounded-2xl border-4 border-[#FFEB3B]" />
            <div className="relative w-[300px] h-[400px] bg-[#222] rounded-2xl border-4 border-[#FFEB3B] overflow-hidden">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-white text-center">
                  <div className="text-xl font-bold">Premier Player</div>
                  <div className="text-sm text-gray-300">Limited Edition</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
