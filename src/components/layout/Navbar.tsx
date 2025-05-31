
import React from "react";
import { Wallet, BookOpen, UsersRound, Trophy } from "lucide-react";
import { Link } from "react-router-dom";
import { useAccount, useConnect, useDisconnect, useSwitchChain } from "wagmi";

export const Navbar = () => {
  const { address } = useAccount()
  const { connectors, connect } = useConnect()
  const { disconnect } = useDisconnect()
  
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

      <div>
      {address ? (
        <button className="bg-[#FFEB3B] text-black text-sm font-medium px-4 py-2 rounded-lg hover:bg-[#FFD700] transition-colors"

        onClick={() => disconnect()}>Disconnect
        </button>
      ) : (
        connectors.map((connector) => (
          <button className="bg-[#FFEB3B] text-black text-sm font-medium px-4 py-2 rounded-lg hover:bg-[#FFD700] transition-colors"

          key={connector.uid} onClick={() => connect({ connector })}>
            
             <div className="flex items-center gap-2">
            <Wallet className="h-4 w-4" />{connector.name}
          </div>
          </button>
        ))
      )}
    </div>
    </nav>
  );
};