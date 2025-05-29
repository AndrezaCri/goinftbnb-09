
import React from "react";
import { ExternalLink, X } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface MetaMaskInstallDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const MetaMaskInstallDialog = ({ open, onOpenChange }: MetaMaskInstallDialogProps) => {
  const handleCreateAccount = () => {
    window.open("https://metamask.io/download/", "_blank");
    onOpenChange(false);
  };

  const handleCancel = () => {
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md bg-[#0D0D0D] border-[#333] text-white">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-white mb-4">
            🦊 How to Create Your MetaMask Wallet
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4 text-[#E0E0E0]">
          <div className="space-y-3 text-sm leading-relaxed">
            <div>
              <span className="font-semibold text-white">1. Install MetaMask:</span>
              <br />
              Go to{" "}
              <a 
                href="https://metamask.io/download" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-[#00BFFF] hover:underline"
              >
                metamask.io/download
              </a>
              {" "}and install the browser extension or mobile app.
            </div>
            
            <div>
              <span className="font-semibold text-white">2. Create a new wallet:</span>
              <br />
              When you open the app/extension, click <strong>"Create a new wallet"</strong>.
            </div>
            
            <div>
              <span className="font-semibold text-white">3. Set a strong password:</span>
              <br />
              This password will be used locally. Avoid weak passwords.
            </div>
            
            <div>
              <span className="font-semibold text-white">4. Write down your secret phrase (Seed Phrase):</span>
              <br />
              This 12-word phrase is your recovery key. <strong>Never share it. Write it down in a safe place.</strong>
            </div>
            
            <div>
              <span className="font-semibold text-white">5. Confirm the secret phrase:</span>
              <br />
              Click on the words in the correct order to confirm.
            </div>
            
            <div>
              <span className="font-semibold text-white">6. All set!</span>
              <br />
              Now you have a Web3 wallet ready to use on GoINFT.
            </div>
          </div>
          
          <div className="space-y-3 mt-6">
            <Button
              onClick={handleCreateAccount}
              className="w-full bg-[#FFEB3B] text-black hover:bg-[#FFD700] transition-colors font-medium"
            >
              <ExternalLink className="h-4 w-4 mr-2" />
              Create MetaMask Account
            </Button>
            
            <Button
              onClick={handleCancel}
              className="w-full bg-[#0D0D0D] text-gray-400 hover:bg-[#1A1A1A] border border-[#333]"
            >
              <X className="h-4 w-4 mr-2 text-red-500" />
              Cancel
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
