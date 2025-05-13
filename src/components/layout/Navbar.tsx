
import React from "react";
import { Wallet } from "lucide-react";

export const Navbar = () => {
  return (
    <nav className="flex justify-between items-center px-8 py-4 max-sm:px-4">
      <div className="flex items-center gap-2">
        <div className="w-8 h-8 bg-[#FFEB3B] rounded-lg flex items-center justify-center">
          <Wallet className="w-5 h-5 text-black" />
        </div>
        <span className="text-base font-medium">GoINFT</span>
      </div>
      
      <div className="flex items-center gap-8 max-sm:hidden">
        <a href="#home" className="text-sm hover:text-[#FFEB3B] transition-colors">Home</a>
        <a href="#albums" className="text-sm hover:text-[#FFEB3B] transition-colors">Albums</a>
        <a href="#collection" className="text-sm hover:text-[#FFEB3B] transition-colors">Collection</a>
        <a href="#marketplace" className="text-sm hover:text-[#FFEB3B] transition-colors">Marketplace</a>
        <a href="#faq" className="text-sm hover:text-[#FFEB3B] transition-colors">FAQ</a>
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
