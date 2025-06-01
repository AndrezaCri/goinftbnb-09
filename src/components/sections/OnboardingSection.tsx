
import React, { useState } from "react";
import { Wallet, Plus, ArrowLeftRight, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAccount, useConnect, useDisconnect } from "wagmi";
import { MetaMaskInstallDialog } from "@/components/dialogs/MetaMaskInstallDialog";

export const OnboardingSection = () => {
  // Hooks do metamask
  const { address } = useAccount();
  const { connectors, connect } = useConnect();
  const { disconnect } = useDisconnect();

  // Estado para controlar o diálogo MetaMask
  const [showMetaMaskDialog, setShowMetaMaskDialog] = useState(false);

  const handleCreateWallet = () => {
    console.log("Create wallet button clicked!");
    console.log("Current showMetaMaskDialog state:", showMetaMaskDialog);
    setShowMetaMaskDialog(true);
    console.log("Setting showMetaMaskDialog to true");
  };

  console.log("OnboardingSection render - showMetaMaskDialog:", showMetaMaskDialog);

  return (
    <section className="bg-[#111] p-8 rounded-3xl border border-[#333] max-sm:p-4">
      <h2 className="text-2xl font-bold mb-6">Welcome to GoINFT</h2>
      
      <p className="text-gray-300 mb-8">
        GoINFT is your gateway to collecting, trading, and owning digital football stickers 
        on the BNB chain. Start your collection today with exclusive footballer NFTs!
      </p>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-black p-6 rounded-xl border border-[#333]">
          <div className="bg-[#FFEB3B] w-10 h-10 flex items-center justify-center rounded-full mb-4">
            <Download className="w-5 h-5 text-black" />
          </div>
          <h3 className="text-xl font-bold mb-2">Collect</h3>
          <p className="text-gray-400">Build your collection of rare football stickers from various teams and competitions</p>
        </div>
        
        <div className="bg-black p-6 rounded-xl border border-[#333]">
          <div className="bg-[#FFEB3B] w-10 h-10 flex items-center justify-center rounded-full mb-4">
            <ArrowLeftRight className="w-5 h-5 text-black" />
          </div>
          <h3 className="text-xl font-bold mb-2">Trade</h3>
          <p className="text-gray-400">Exchange stickers with other collectors to complete your albums</p>
        </div>
        
        <div className="bg-black p-6 rounded-xl border border-[#333]">
          <div className="bg-[#FFEB3B] w-10 h-10 flex items-center justify-center rounded-full mb-4">
            <Plus className="w-5 h-5 text-black" />
          </div>
          <h3 className="text-xl font-bold mb-2">Create Albums</h3>
          <p className="text-gray-400">Create personal albums to showcase your collection in unique ways</p>
        </div>
      </div>
      
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        {address ? (
          <Button 
            className="bg-[#FFEB3B] text-black hover:bg-[#FFD700] px-8 py-6 h-auto text-lg"
            onClick={() => disconnect()}>
            <Wallet className="mr-2 h-5 w-5" /> Disconnect
          </Button>
        ) : (
          connectors.map((connector) => (
            <Button 
              key={connector.uid} 
              className="bg-[#FFEB3B] text-black hover:bg-[#FFD700] px-8 py-6 h-auto text-lg"
              onClick={() => connect({ connector })}>
              <Wallet className="mr-2 h-5 w-5" /> {connector.name}
            </Button>
          ))
        )}        
        <Button 
          variant="ghost" 
          className="border border-[#FFEB3B] text-[#FFEB3B] hover:bg-transparent hover:text-[#FFD700] hover:border-[#FFD700] px-8 py-6 h-auto text-lg"
          onClick={handleCreateWallet}
        >
          <Plus className="mr-2 h-5 w-5" /> Create Wallet
        </Button>
      </div>

      <MetaMaskInstallDialog 
        open={showMetaMaskDialog} 
        onOpenChange={setShowMetaMaskDialog} 
      />
    </section>
  );
};
