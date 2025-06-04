
import React, { useState } from "react";
import { Wallet, Menu } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { useAccount, useConnect, useDisconnect } from "wagmi";
import { Button } from "@/components/ui/button";
import { MobileNav } from "./MobileNav";
import { useIsMobile } from "@/hooks/use-mobile";

export const Navbar = () => {
  const { address } = useAccount();
  const { connectors, connect } = useConnect();
  const { disconnect } = useDisconnect();
  const location = useLocation();
  const isMobile = useIsMobile();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const isActive = (path: string) => location.pathname === path;

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      <nav className="flex justify-between items-center px-8 py-6 max-sm:px-4 max-sm:py-4">
        <Link to="/" className="flex items-center">
          <img
            src="/lovable-uploads/5dcc5072-cc22-4325-bb15-f782d454fcac.png"
            alt="GoINFT Logo"
            className={`${
              isMobile ? "h-16" : "h-40"
            } w-auto cursor-pointer hover:opacity-80 transition-opacity`}
          />
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-10">
          <Link
            to="/"
            className={`text-base transition-colors ${
              isActive("/")
                ? "text-[#FFEB3B]"
                : "text-white hover:text-[#FFEB3B]"
            }`}
          >
            <span>Home</span>
          </Link>
          <Link
            to="/albums"
            className={`text-base transition-colors ${
              isActive("/albums")
                ? "text-[#FFEB3B]"
                : "text-white hover:text-[#FFEB3B]"
            }`}
          >
            <span>Albums</span>
          </Link>
          <Link
            to="/album-lab"
            className={`text-base transition-colors flex items-center gap-1 ${
              isActive("/album-lab")
                ? "text-[#FFEB3B]"
                : "text-white hover:text-[#FFEB3B]"
            }`}
          >
            <span>Lab</span>
          </Link>
          <Link
            to="/community"
            className={`text-base transition-colors flex items-center gap-1 ${
              isActive("/community")
                ? "text-[#FFEB3B]"
                : "text-white hover:text-[#FFEB3B]"
            }`}
          >
            <span>Community</span>
          </Link>
          <Link
            to="/challenges"
            className={`text-base transition-colors flex items-center gap-1 ${
              isActive("/challenges")
                ? "text-[#FFEB3B]"
                : "text-white hover:text-[#FFEB3B]"
            }`}
          >
            <span>Challenges</span>
          </Link>
          <Link
            to="/marketplace"
            className={`text-base transition-colors ${
              isActive("/marketplace")
                ? "text-[#FFEB3B]"
                : "text-white hover:text-[#FFEB3B]"
            }`}
          >
            <span>Marketplace</span>
          </Link>
          <Link
            to="/borrowing"
            className={`text-base transition-colors flex items-center gap-1 ${
              isActive("/borrowing")
                ? "text-[#FFEB3B]"
                : "text-white hover:text-[#FFEB3B]"
            }`}
          >
            <span>Defi</span>
          </Link>
        </div>

        {/* Desktop Wallet Connection */}
        <div className="hidden md:block">
          {address ? (
            <button
              className="text-[#FFEB3B] text-base font-medium px-6 py-3 rounded-lg hover:bg-[#FFEB3B] hover:text-black transition-colors border border-[#FFEB3B]"
              onClick={() => disconnect()}
            >
              Disconnect
            </button>
          ) : (
            connectors.map((connector) => (
              <button
                className="text-[#FFEB3B] text-base font-medium px-6 py-3 rounded-lg hover:bg-[#FFEB3B] hover:text-black transition-colors border border-[#FFEB3B]"
                key={connector.uid}
                onClick={() => connect({ connector })}
              >
                <div className="flex items-center gap-2">
                  <Wallet className="h-5 w-5" />
                  {connector.name}
                </div>
              </button>
            ))
          )}
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center gap-3">
          {/* Mobile Wallet - Simplified */}
          {address ? (
            <Button
              variant="ghost"
              size="sm"
              className="text-[#FFEB3B] border border-[#FFEB3B] px-3 py-2 text-xs"
              onClick={() => disconnect()}
            >
              <Wallet className="h-4 w-4" />
            </Button>
          ) : (
            connectors.map((connector) => (
              <Button
                key={connector.uid}
                variant="ghost"
                size="sm"
                className="text-[#FFEB3B] border border-[#FFEB3B] px-3 py-2 text-xs"
                onClick={() => connect({ connector })}
              >
                <Wallet className="h-4 w-4" />
              </Button>
            ))
          )}

          {/* Hamburger Menu Button */}
          <Button
            variant="ghost"
            size="sm"
            className="text-white hover:text-[#FFEB3B] p-2"
            onClick={toggleMobileMenu}
            aria-label="Toggle mobile menu"
          >
            <Menu className="h-6 w-6" />
          </Button>
        </div>
      </nav>

      {/* Mobile Navigation Sheet */}
      <MobileNav isOpen={isMobileMenuOpen} onClose={closeMobileMenu} />
    </>
  );
};
