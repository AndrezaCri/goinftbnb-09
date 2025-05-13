import React from "react";

export const Hero = () => {
  return (
    <section className="flex-1">
      <h1 className="text-[64px] font-bold leading-[1.1] mb-4 max-sm:text-[40px]">
        Landing Page Builder
      </h1>
      <div className="text-[32px] mb-4 max-sm:text-2xl">128 screens</div>
      <div className="text-[32px] text-[#666] mb-8 max-sm:text-2xl">
        + auto layouts
      </div>
      <div className="flex gap-4">
        <button 
          className="bg-white text-black px-6 py-2 rounded-full hover:bg-gray-100 transition-colors"
        >
          White
        </button>
        <button 
          className="text-white px-6 py-2 rounded-full hover:bg-gray-800 transition-colors"
        >
          Dark
        </button>
      </div>
    </section>
  );
};
