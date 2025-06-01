import React from "react";
import { Wallet, BookOpen, UsersRound, Trophy, CreditCard } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { useAccount, useConnect, useDisconnect, useSwitchChain } from "wagmi";

export const Navbar = () => {
  const { address } = useAccount()
  const { connectors, connect } = useConnect()
  const { disconnect } = useDisconnect()
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="flex justify-between items-center px-8 py-6 max-sm:px-4">
      <Link to="/" className="flex items-center">
        <img
          src="/lovable-uploads/5dcc5072-cc22-4325-bb15-f782d454fcac.png"
          alt="GoINFT Logo"
          className="h-40 w-auto cursor-pointer hover:opacity-80 transition-opacity"
        />
      </Link>

      <div className="flex items-center gap-10 max-sm:hidden">
        <Link to="/" className={`text-base transition-colors ${isActive("/") ? "text-[#FFEB3B]" : "text-white hover:text-[#FFEB3B]"}`}>
          <span>Home</span>
        </Link>
        <Link to="/albums" className={`text-base transition-colors ${isActive("/albums") ? "text-[#FFEB3B]" : "text-white hover:text-[#FFEB3B]"}`}>
          <span>Albums</span>
        </Link>
        <Link to="/album-lab" className={`text-base transition-colors flex items-center gap-1 ${isActive("/album-lab") ? "text-[#FFEB3B]" : "text-white hover:text-[#FFEB3B]"}`}>
          <span>Lab</span>
        </Link>
        <Link to="/community" className={`text-base transition-colors flex items-center gap-1 ${isActive("/community") ? "text-[#FFEB3B]" : "text-white hover:text-[#FFEB3B]"}`}>
          <span>Community</span>
        </Link>
        <Link to="/challenges" className={`text-base transition-colors flex items-center gap-1 ${isActive("/challenges") ? "text-[#FFEB3B]" : "text-white hover:text-[#FFEB3B]"}`}>
          <span>Challenges</span>
        </Link>
        <Link to="/marketplace" className={`text-base transition-colors ${isActive("/marketplace") ? "text-[#FFEB3B]" : "text-white hover:text-[#FFEB3B]"}`}>
          <span>Marketplace</span>
        </Link>
        <Link to="/borrowing" className={`text-base transition-colors flex items-center gap-1 ${isActive("/borrowing") ? "text-[#FFEB3B]" : "text-white hover:text-[#FFEB3B]"}`}>
          <span>Defi</span>
        </Link>
      </div>

      <div>
        {address ? (
          <button className="text-[#FFEB3B] text-base font-medium px-6 py-3 rounded-lg hover:bg-[#FFEB3B] hover:text-black transition-colors border border-[#FFEB3B]"
            onClick={() => disconnect()}>Disconnect
          </button>
        ) : (
          connectors.map((connector) => (
            <button className="text-[#FFEB3B] text-base font-medium px-6 py-3 rounded-lg hover:bg-[#FFEB3B] hover:text-black transition-colors border border-[#FFEB3B]"
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
