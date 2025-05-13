
import React from "react";

const partners = ["BNB Chain", "Binance", "MetaMask", "Trust Wallet", "OpenSea"];

export const TrustedPartners = () => {
  return (
    <section className="bg-black text-white p-6 rounded-2xl">
      <h2 className="text-2xl font-bold mb-6">We are trusted by</h2>
      <div className="flex justify-between gap-4 flex-wrap">
        {partners.map((partner) => (
          <div
            key={partner}
            className="bg-[#222] text-white px-4 py-2 rounded-lg border border-[#333] hover:border-[#FFEB3B] transition-colors"
          >
            {partner}
          </div>
        ))}
      </div>
    </section>
  );
};
