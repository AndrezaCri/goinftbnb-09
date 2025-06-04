
import React from "react";
import { Button } from "@/components/ui/button";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { LogOut, User } from "lucide-react";

export const Navbar = () => {
  const location = useLocation();
  const { user, signOut } = useAuth();

  const navItems = [
    { name: "Home", path: "/" },
    { name: "Albums", path: "/albums" },
    { name: "Album Lab", path: "/album-lab" },
    { name: "Community", path: "/community" },
    { name: "Challenges", path: "/challenges" },
    { name: "Marketplace", path: "/marketplace" },
    { name: "Borrowing", path: "/borrowing" },
  ];

  return (
    <nav className="bg-[#121212] border-b border-gray-800 px-4 py-4">
      <div className="container mx-auto flex items-center justify-between">
        <Link to="/" className="text-2xl font-bold text-[#FFEB3B]">
          StickerAlbum
        </Link>

        {user && (
          <div className="hidden md:flex items-center space-x-6">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`text-sm font-medium transition-colors hover:text-[#FFEB3B] ${
                  location.pathname === item.path
                    ? "text-[#FFEB3B]"
                    : "text-gray-300"
                }`}
              >
                {item.name}
              </Link>
            ))}
          </div>
        )}

        <div className="flex items-center space-x-4">
          {user ? (
            <>
              <div className="flex items-center space-x-2 text-white">
                <User className="h-4 w-4" />
                <span className="text-sm">{user.email}</span>
              </div>
              <Button
                onClick={signOut}
                variant="outline"
                size="sm"
                className="text-white border-gray-600 hover:bg-gray-700"
              >
                <LogOut className="h-4 w-4 mr-2" />
                Sign Out
              </Button>
            </>
          ) : (
            <Link to="/auth">
              <Button className="bg-[#FFEB3B] text-black hover:bg-[#FFEB3B]/90">
                Sign In
              </Button>
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};
