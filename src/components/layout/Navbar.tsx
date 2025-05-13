
import React from "react";
import { Wallet } from "lucide-react";

export const Navbar = () => {
  return (
    <nav className="flex justify-between items-center px-8 py-4 max-sm:px-4">
      <div className="flex items-center gap-2">
        <img 
          src="/lovable-uploads/48f299fc-e84b-45a2-94c9-a2654f4dffa6.png" 
          alt="GoINFT Logo" 
          className="h-8 w-auto"
        />
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
