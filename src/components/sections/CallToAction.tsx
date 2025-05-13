
import React from "react";

export const CallToAction = () => {
  return (
    <section className="mt-6">
      <h2 className="text-2xl font-bold mb-6">
        Over 10,000 unique football player NFT stickers with special attributes and rarities
      </h2>
      <div className="flex gap-4 flex-wrap">
        <button
          className="bg-[#FFEB3B] px-4 py-2 rounded-lg hover:bg-[#FFD700] transition-colors"
          onClick={() => console.log("Start collecting")}
        >
          Start Collecting
        </button>
        <button
          className="bg-[#333] px-4 py-2 rounded-lg hover:bg-[#444] transition-colors"
          onClick={() => console.log("View marketplace")}
        >
          View Marketplace
        </button>
        <button
          className="bg-[#333] px-4 py-2 rounded-lg hover:bg-[#444] transition-colors"
          onClick={() => console.log("Create album")}
        >
          Create Album
        </button>
        <button
          className="bg-[#333] px-4 py-2 rounded-lg hover:bg-[#444] transition-colors"
          onClick={() => console.log("Trade stickers")}
        >
          Trade Stickers
        </button>
      </div>
    </section>
  );
};
