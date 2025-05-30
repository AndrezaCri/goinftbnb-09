
import React from "react";

const partners = [
  { name: "BNB Chain", type: "logo", src: "/lovable-uploads/b106c9dd-0f1b-480f-9873-a7c888dc9c44.png" },
  { name: "Binance", type: "logo", src: "/lovable-uploads/9760dfd8-0775-48ba-8fc6-859c8dfd1323.png" },
  { name: "MetaMask", type: "logo", src: "/lovable-uploads/f82cef2b-84a8-4582-af21-383a96b8d148.png" }
];

export const TrustedPartners = () => {
  return (
    <section className="bg-black text-white p-6 rounded-2xl">
      <h2 className="text-2xl font-bold mb-6">We are trusted by</h2>
      <div className="flex justify-start gap-4 flex-wrap">
        {partners.map((partner) => (
          <div
            key={partner.name}
            className="bg-[#222] text-white px-4 py-2 rounded-lg border border-[#333] hover:border-[#FFEB3B] transition-colors flex items-center justify-center"
          >
            {partner.type === "logo" ? (
              <img 
                src={partner.src} 
                alt={partner.name}
                className="h-12 w-12 object-contain"
              />
            ) : (
              partner.name
            )}
          </div>
        ))}
      </div>
    </section>
  );
};
