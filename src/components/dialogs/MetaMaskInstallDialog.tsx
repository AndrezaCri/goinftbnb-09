
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
      <DialogContent className="sm:max-w-md bg-[#111] border-[#333] text-white">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-[#FFEB3B]">
            MetaMask Não Encontrada 🦊
          </DialogTitle>
          <DialogDescription className="text-gray-300 mt-4 text-base leading-relaxed">
            Parece que você não tem uma carteira MetaMask instalada no seu navegador. 
            Para continuar, você precisa de uma conta MetaMask para se conectar de forma segura.
          </DialogDescription>
        </DialogHeader>
        
        <div className="mt-6">
          <h4 className="text-white font-medium mb-4">🔹 O que você deseja fazer?</h4>
          
          <div className="space-y-3">
            <Button
              onClick={handleCreateAccount}
              className="w-full bg-[#FFEB3B] text-black hover:bg-[#FFD700] transition-colors font-medium"
            >
              <ExternalLink className="h-4 w-4 mr-2" />
              ✅ Criar uma conta MetaMask
            </Button>
            
            <Button
              onClick={handleCancel}
              variant="outline"
              className="w-full border-gray-600 text-gray-300 hover:bg-gray-800"
            >
              <X className="h-4 w-4 mr-2" />
              ❌ Cancelar
            </Button>
          </div>
          
          <p className="text-xs text-gray-500 mt-4 text-center">
            <em>Observação: A MetaMask é necessária para interagir com esta plataforma de forma segura.</em>
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
};
