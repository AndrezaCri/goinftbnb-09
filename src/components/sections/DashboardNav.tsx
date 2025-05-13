
import React from "react";
import { Album, ShoppingCart, BookOpen, UsersRound, Trophy } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

type DashboardButtonProps = {
  icon: React.ReactNode;
  label: string;
  to: string;
}

const DashboardButton = ({ icon, label, to }: DashboardButtonProps) => (
  <Link to={to} className="w-full sm:w-auto">
    <Button 
      variant="outline" 
      className="w-full bg-[#111] border-[#333] text-white hover:bg-[#222] hover:border-[#FFEB3B] flex gap-2 items-center justify-center py-6 px-4 h-auto"
    >
      {icon}
      <span>{label}</span>
    </Button>
  </Link>
);

export const DashboardNav = () => {
  return (
    <section className="w-full">
      <h2 className="text-xl font-medium mb-4">Dashboard</h2>
      <div className="flex flex-wrap gap-3 justify-between">
        <DashboardButton 
          icon={<Album className="h-5 w-5" />} 
          label="My Albums" 
          to="/albums" 
        />
        <DashboardButton 
          icon={<ShoppingCart className="h-5 w-5" />} 
          label="Marketplace" 
          to="/marketplace" 
        />
        <DashboardButton 
          icon={<BookOpen className="h-5 w-5" />} 
          label="Album Lab" 
          to="/album-lab" 
        />
        <DashboardButton 
          icon={<UsersRound className="h-5 w-5" />} 
          label="Community" 
          to="/community" 
        />
        <DashboardButton 
          icon={<Trophy className="h-5 w-5" />} 
          label="Challenges" 
          to="/challenges" 
        />
      </div>
    </section>
  );
};
