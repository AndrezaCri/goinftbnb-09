
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
            🦊 Como criar sua carteira MetaMask
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4 text-[#E0E0E0]">
          <div className="space-y-3 text-sm leading-relaxed">
            <div>
              <span className="font-semibold text-white">1. Instale a MetaMask:</span>
              <br />
              Acesse{" "}
              <a 
                href="https://metamask.io/download" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-[#00BFFF] hover:underline"
              >
                metamask.io/download
              </a>
              {" "}e instale a extensão do navegador ou o app no seu celular.
            </div>
            
            <div>
              <span className="font-semibold text-white">2. Crie uma nova carteira:</span>
              <br />
              Ao abrir o app/extensão, clique em <strong>"Criar uma nova carteira"</strong>.
            </div>
            
            <div>
              <span className="font-semibold text-white">3. Defina uma senha forte:</span>
              <br />
              Essa senha será usada localmente. Evite senhas fracas.
            </div>
            
            <div>
              <span className="font-semibold text-white">4. Anote a sua frase secreta (Seed Phrase):</span>
              <br />
              Essa frase de 12 palavras é sua chave de recuperação. <strong>Nunca compartilhe. Anote em local seguro.</strong>
            </div>
            
            <div>
              <span className="font-semibold text-white">5. Confirme a frase secreta:</span>
              <br />
              Clique nas palavras na ordem correta para confirmar.
            </div>
            
            <div>
              <span className="font-semibold text-white">6. Tudo certo!</span>
              <br />
              Agora você tem uma carteira Web3 pronta para usar no GoINft.
            </div>
          </div>
          
          <div className="space-y-3 mt-6">
            <Button
              onClick={handleCreateAccount}
              className="w-full bg-[#FFEB3B] text-black hover:bg-[#FFD700] transition-colors font-medium"
            >
              <ExternalLink className="h-4 w-4 mr-2" />
              Criar conta MetaMask
            </Button>
            
            <Button
              onClick={handleCancel}
              className="w-full bg-[#0D0D0D] text-gray-400 hover:bg-[#1A1A1A] border border-[#333]"
            >
              <X className="h-4 w-4 mr-2 text-red-500" />
              Cancelar
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
