
import React, { useState, useEffect } from "react";
import { Wallet, BookOpen, UsersRound, Trophy, DollarSign, LogOut } from "lucide-react";
import { Link } from "react-router-dom";
import { conectarCarteira, verificarCarteiraConectada, isMetaMaskInstalled, verificarSaldo } from "@/utils/metamaskUtils";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { MetaMaskInstallDialog } from "@/components/dialogs/MetaMaskInstallDialog";
import { ResponsiveLogo } from "@/components/ui/responsive-logo";

export const Navbar = () => {
  const [enderecoCarteira, setEnderecoCarteira] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isCheckingBalance, setIsCheckingBalance] = useState(false);
  const [showMetaMaskDialog, setShowMetaMaskDialog] = useState(false);
  const { toast } = useToast();

  // Verificar carteira conectada ao montar o componente
  useEffect(() => {
    const checkWallet = async () => {
      // Somente verifica se a carteira já está conectada, sem mostrar alertas
      const endereco = await verificarCarteiraConectada();
      if (endereco) {
        setEnderecoCarteira(endereco);
        toast({
          title: "Carteira detectada",
          description: `Carteira ${formatarEndereco(endereco)} já está conectada`,
          variant: "default",
        });
      }
    };
    
    checkWallet();
  }, []);

  const handleConectarCarteira = async () => {
    setIsLoading(true);
    try {
      // Verifica se o MetaMask está instalado antes de tentar conectar
      if (!isMetaMaskInstalled()) {
        setShowMetaMaskDialog(true);
        return;
      }
      
      const conta = await conectarCarteira();
      if (conta) {
        setEnderecoCarteira(conta);
        toast({
          title: "Conectado com sucesso!",
          description: `Carteira ${formatarEndereco(conta)} conectada`,
          variant: "default",
        });
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerificarSaldo = async () => {
    if (!enderecoCarteira) {
      toast({
        title: "Carteira não conectada",
        description: "Por favor, conecte sua carteira primeiro",
        variant: "destructive",
      });
      return;
    }

    setIsCheckingBalance(true);
    try {
      const { saldo, sucesso } = await verificarSaldo();
      if (sucesso) {
        toast({
          title: "Saldo verificado",
          description: `💰 Saldo: ${saldo} BNB`,
          variant: "default",
        });
      } else {
        toast({
          title: "Erro ao verificar saldo",
          description: "Não foi possível verificar o saldo",
          variant: "destructive",
        });
      }
    } finally {
      setIsCheckingBalance(false);
    }
  };

  // Nova função para desconectar a carteira (apenas visualmente)
  const handleDesconectarCarteira = () => {
    setEnderecoCarteira(null);
    toast({
      title: "Carteira desconectada",
      description: "Sua carteira foi desconectada visualmente da aplicação",
      variant: "default",
    });
    console.log('Carteira desconectada visualmente (a MetaMask não desconecta de fato via API).');
  };

  // Função para formatar o endereço da carteira
  const formatarEndereco = (endereco: string): string => {
    return `${endereco.substring(0, 6)}...${endereco.substring(endereco.length - 4)}`;
  };

  return (
    <>
      <nav className="flex justify-between items-center px-8 py-6 max-sm:px-4 max-sm:py-4">
        <Link to="/">
          <ResponsiveLogo 
            src="/lovable-uploads/366a2e5c-a8bb-4ad3-93cd-79ad1a85b72f.png" 
            alt="GoINFT Logo" 
            className="h-[150px] w-auto" 
          />
        </Link>
        
        <div className="flex items-center gap-8 max-sm:hidden">
          <Link to="/" className="text-sm hover:text-[#FFEB3B] transition-colors">Home</Link>
          <Link to="/albums" className="text-sm hover:text-[#FFEB3B] transition-colors">Albums</Link>
          <Link to="/album-lab" className="text-sm hover:text-[#FFEB3B] transition-colors flex items-center gap-1">
            <BookOpen className="h-4 w-4" />
            <span>Lab</span>
          </Link>
          <Link to="/community" className="text-sm hover:text-[#FFEB3B] transition-colors flex items-center gap-1">
            <UsersRound className="h-4 w-4" />
            <span>Community</span>
          </Link>
          <Link to="/challenges" className="text-sm hover:text-[#FFEB3B] transition-colors flex items-center gap-1">
            <Trophy className="h-4 w-4" />
            <span>Challenges</span>
          </Link>
          <Link to="/marketplace" className="text-sm hover:text-[#FFEB3B] transition-colors">Marketplace</Link>
        </div>

        <div className="flex items-center gap-2">
          {enderecoCarteira && (
            <>
              <Button
                variant="outline"
                className="border-[#FFEB3B] text-[#FFEB3B] hover:bg-[#FFEB3B]/10"
                onClick={handleVerificarSaldo}
                disabled={isCheckingBalance}
              >
                <DollarSign className="h-4 w-4 mr-1" />
                {isCheckingBalance ? "Verificando..." : "Ver Saldo"}
              </Button>
              
              <Button
                variant="outline"
                className="border-red-500 text-red-500 hover:bg-red-500/10"
                onClick={handleDesconectarCarteira}
              >
                <LogOut className="h-4 w-4 mr-1" />
                Desconectar
              </Button>
            </>
          )}
          
          {!enderecoCarteira && (
            <Button 
              variant="default"
              className="bg-[#FFEB3B] text-black font-medium hover:bg-[#FFD700] transition-colors"
              onClick={handleConectarCarteira}
              disabled={isLoading}
            >
              <div className="flex items-center gap-2">
                <Wallet className="h-4 w-4" />
                {isLoading ? "Conectando..." : "Connect Wallet"}
              </div>
            </Button>
          )}
        </div>
      </nav>
      
      <MetaMaskInstallDialog 
        open={showMetaMaskDialog} 
        onOpenChange={setShowMetaMaskDialog} 
      />
    </>
  );
};
