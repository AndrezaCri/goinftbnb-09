import React from "react";

export const Navbar = () => {
  return (
    <nav className="flex justify-between items-center px-8 py-4 max-sm:px-4">
      <div className="flex items-center gap-2">
        <div className="w-8 h-8 bg-[#333] rounded-lg" />
        <span className="text-base font-medium">Logo</span>
      </div>
      
      <div className="flex items-center gap-8 max-sm:hidden">
        <a href="#home" className="text-sm hover:text-[#FFEB3B] transition-colors">Home</a>
        <a href="#attributes" className="text-sm hover:text-[#FFEB3B] transition-colors">Attributes</a>
        <a href="#collection" className="text-sm hover:text-[#FFEB3B] transition-colors">Collection</a>
        <a href="#faq" className="text-sm hover:text-[#FFEB3B] transition-colors">FAQ</a>
        <a href="#roadmap" className="text-sm hover:text-[#FFEB3B] transition-colors">Roadmap</a>
      </div>

      <button 
        className="bg-[#FFEB3B] text-black text-sm font-medium px-4 py-2 rounded-lg hover:bg-[#FFD700] transition-colors"
        onClick={() => console.log("Connect wallet")}
      >
        Connect Wallet
      </button>
    </nav>
  );
};
