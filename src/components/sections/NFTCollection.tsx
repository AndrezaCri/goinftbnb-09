import React from "react";

export const NFTCollection = () => {
  return (
    <section className="bg-white text-black p-8 rounded-3xl max-sm:p-4">
      <div className="text-[32px] font-bold mb-2">
        NFT Collection Name
      </div>
      <p className="text-[#666] mb-4">
        Your NFT collection short description in about ten-eleven words.
      </p>
      <button className="bg-black text-white mb-12 px-4 py-2 rounded-lg hover:bg-gray-900 transition-colors">
        Learn More
      </button>

      <div className="relative">
        <div className="flex justify-center mb-12">
          <div className="relative">
            <div className="absolute w-[300px] h-[400px] bg-black rotate-[-15deg] translate-x-[60px] rounded-2xl" />
            <div className="absolute w-[300px] h-[400px] bg-black rotate-[15deg] translate-x-[-60px] rounded-2xl" />
            <div className="relative w-[300px] h-[400px] bg-black rounded-2xl" />
          </div>
        </div>
      </div>
    </section>
  );
};
