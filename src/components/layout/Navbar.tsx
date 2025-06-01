import React from "react";
import { Wallet, BookOpen, UsersRound, Trophy, CreditCard } from "lucide-react";
import { Link } from "react-router-dom";
import { useAccount, useConnect, useDisconnect, useSwitchChain } from "wagmi";

export const Navbar = () => {
  const { address } = useAccount()
  const { connectors, connect } = useConnect()
  const { disconnect } = useDisconnect()

  return (
    <nav className="flex justify-between items-center px-8 py-6 max-sm:px-4">
      <div className="flex items-center">
        <img
          src="/lovable-uploads/5dcc5072-cc22-4325-bb15-f782d454fcac.png"
          alt="GoINFT Logo"
          className="h-16 w-auto"
        />
      </div>

      <div className="flex items-center gap-10 max-sm:hidden">
        <Link to="/" className="text-base hover:text-[#FFEB3B] transition-colors">
          <span>Home</span>
        </Link>
        <Link to="/albums" className="text-base hover:text-[#FFEB3B] transition-colors">
          <span>Albums</span>
        </Link>
        <Link to="/album-lab" className="text-base hover:text-[#FFEB3B] transition-colors flex items-center gap-1">
          <span>Lab</span>
        </Link>
        <Link to="/community" className="text-base hover:text-[#FFEB3B] transition-colors flex items-center gap-1">
          <span>Community</span>
        </Link>
        <Link to="/challenges" className="text-base hover:text-[#FFEB3B] transition-colors flex items-center gap-1">
          <span>Challenges</span>
        </Link>
        <Link to="/marketplace" className="text-base hover:text-[#FFEB3B] transition-colors">
          <span>Marketplace</span>
        </Link>
        <Link to="/borrowing" className="text-base hover:text-[#FFEB3B] transition-colors flex items-center gap-1">
          <span>Defi</span>
        </Link>
      </div>

      <div>
        {address ? (
          <button className="bg-[#FFEB3B] text-black text-base font-medium px-6 py-3 rounded-lg hover:bg-[#FFD700] transition-colors"
            onClick={() => disconnect()}>Disconnect
          </button>
        ) : (
          connectors.map((connector) => (
            <button className="bg-[#FFEB3B] text-black text-base font-medium px-6 py-3 rounded-lg hover:bg-[#FFD700] transition-colors"
              key={connector.uid} onClick={() => connect({ connector })}>
              <div className="flex items-center gap-2">
                <Wallet className="h-5 w-5" />{connector.name}
              </div>
            </button>
          ))
        )}
      </div>
    </nav>
  );
};
