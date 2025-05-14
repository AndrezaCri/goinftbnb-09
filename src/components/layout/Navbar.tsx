
import React from "react";
import { Wallet, BookOpen, UsersRound, Trophy } from "lucide-react";
import { Link } from "react-router-dom";

export const Navbar = () => {
  return (
    <nav className="flex justify-between items-center px-8 py-4 max-sm:px-4">
      <Link to="/">
        <img 
          src="/lovable-uploads/48f299fc-e84b-45a2-94c9-a2654f4dffa6.png" 
          alt="GoINFT Logo" 
          className="h-10 w-auto" 
        />
      </Link>
      
      <div className="flex items-center gap-8 max-sm:hidden">
        <Link to="/" className="text-sm hover:text-[#FFEB3B] transition-colors">Home</Link>
        <Link to="/albums" className="text-sm hover:text-[#FFEB3B] transition-colors">Albums</Link>
        <Link to="/album-lab" className="text-sm hover:text-[#FFEB3B] transition-colors flex items-center gap-1">
          <BookOpen className="h-4 w-4" />
          <span>Lab</span>
        </Link>
        <Link to="/community" className="text-sm hover:text-[#FFEB3B] transition-colors flex items-center gap-1">
          <UsersRound className="h-4 w-4" />
          <span>Community</span>
        </Link>
        <Link to="/challenges" className="text-sm hover:text-[#FFEB3B] transition-colors flex items-center gap-1">
          <Trophy className="h-4 w-4" />
          <span>Challenges</span>
        </Link>
        <Link to="/marketplace" className="text-sm hover:text-[#FFEB3B] transition-colors">Marketplace</Link>
      </div>

      <button 
        className="bg-[#FFEB3B] text-black text-sm font-medium px-4 py-2 rounded-lg hover:bg-[#FFD700] transition-colors"
        onClick={() => console.log("Connect wallet")}
      >
        <div className="flex items-center gap-2">
          <Wallet className="h-4 w-4" />
          Connect Wallet
        </div>
      </button>
    </nav>
  );
};
