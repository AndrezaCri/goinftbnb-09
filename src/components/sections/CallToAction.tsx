import React from "react";

export const CallToAction = () => {
  return (
    <section className="mt-6">
      <h2 className="text-2xl font-bold mb-6">
        A pack of unique generative 10.000 collectible NFT cards with randomly
        generated set of attributes.
      </h2>
      <div className="flex gap-4 flex-wrap">
        {[1, 2, 3, 4].map((index) => (
          <button
            key={index}
            className="bg-[#FFEB3B] px-4 py-2 rounded-lg hover:bg-[#FFD700] transition-colors"
            onClick={() => window.open("https://digitaleyes.market", "_blank")}
          >
            Get from DigitalEyes
          </button>
        ))}
      </div>
    </section>
  );
};
