
import React from "react";
import { Link, useLocation } from "react-router-dom";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetClose,
} from "@/components/ui/sheet";
import { useAccount, useConnect, useDisconnect } from "wagmi";

interface MobileNavProps {
  isOpen: boolean;
  onClose: () => void;
}

export const MobileNav = ({ isOpen, onClose }: MobileNavProps) => {
  const { address } = useAccount();
  const { connectors, connect } = useConnect();
  const { disconnect } = useDisconnect();
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  const handleLinkClick = () => {
    onClose();
  };

  const navLinks = [
    { to: "/", label: "Home" },
    { to: "/albums", label: "Albums" },
    { to: "/album-lab", label: "Lab" },
    { to: "/community", label: "Community" },
    { to: "/challenges", label: "Challenges" },
    { to: "/marketplace", label: "Marketplace" },
    { to: "/borrowing", label: "Defi" },
  ];

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent side="right" className="w-80 bg-black border-gray-800">
        <SheetHeader className="border-b border-gray-800 pb-4">
          <div className="flex items-center justify-between">
            <SheetTitle className="text-white">Menu</SheetTitle>
            <SheetClose asChild>
              <Button
                variant="ghost"
                size="sm"
                className="text-white hover:bg-gray-800"
              >
                <X className="h-5 w-5" />
              </Button>
            </SheetClose>
          </div>
        </SheetHeader>

        <div className="flex flex-col h-full py-6">
          <nav className="flex flex-col space-y-4 flex-1">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                onClick={handleLinkClick}
                className={`text-lg transition-colors py-2 px-3 rounded-md ${
                  isActive(link.to)
                    ? "text-[#FFEB3B] bg-[#FFEB3B]/10"
                    : "text-white hover:text-[#FFEB3B] hover:bg-gray-800"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="border-t border-gray-800 pt-4">
            {address ? (
              <Button
                onClick={() => {
                  disconnect();
                  onClose();
                }}
                className="w-full bg-transparent border border-[#FFEB3B] text-[#FFEB3B] hover:bg-[#FFEB3B] hover:text-black"
              >
                Disconnect Wallet
              </Button>
            ) : (
              <div className="space-y-2">
                {connectors.map((connector) => (
                  <Button
                    key={connector.uid}
                    onClick={() => {
                      connect({ connector });
                      onClose();
                    }}
                    className="w-full bg-transparent border border-[#FFEB3B] text-[#FFEB3B] hover:bg-[#FFEB3B] hover:text-black"
                  >
                    Connect {connector.name}
                  </Button>
                ))}
              </div>
            )}
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};
