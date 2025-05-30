import React, { useState, useEffect } from "react";
import { Wallet, BookOpen, UsersRound, Trophy, DollarSign, LogOut, Menu } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { conectarCarteira, verificarCarteiraConectada, isMetaMaskInstalled, verificarSaldo } from "@/utils/metamaskUtils";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { MetaMaskInstallDialog } from "@/components/dialogs/MetaMaskInstallDialog";
import { ResponsiveLogo } from "@/components/ui/responsive-logo";
import { useIsMobile } from "@/hooks/use-mobile";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";

export const Navbar = () => {
  const [enderecoCarteira, setEnderecoCarteira] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isCheckingBalance, setIsCheckingBalance] = useState(false);
  const [showMetaMaskDialog, setShowMetaMaskDialog] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { toast } = useToast();
  const isMobile = useIsMobile();
  const location = useLocation();

  // Função para verificar se o link está ativo
  const isActiveLink = (path: string): boolean => {
    return location.pathname === path;
  };

  // Função para aplicar classes do link ativo
  const getLinkClasses = (path: string): string => {
    const baseClasses = "text-sm transition-colors flex items-center gap-1";
    const activeClasses = "text-[#FFEB3B] font-medium";
    const inactiveClasses = "hover:text-[#FFEB3B]";
    
    return `${baseClasses} ${isActiveLink(path) ? activeClasses : inactiveClasses}`;
  };

  // Função para aplicar classes do link móvel ativo
  const getMobileLinkClasses = (path: string): string => {
    const baseClasses = "text-lg py-3 border-b border-gray-600 transition-colors";
    const activeClasses = "text-[#FFEB3B] font-medium border-[#FFEB3B]";
    const inactiveClasses = "hover:text-[#FFEB3B]";
    
    return `${baseClasses} ${isActiveLink(path) ? activeClasses : inactiveClasses}`;
  };

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

  // Debug logs para o menu mobile
  const handleMobileMenuToggle = (open: boolean) => {
    console.log('Menu mobile toggle:', open);
    setMobileMenuOpen(open);
  };

  const MobileMenuContent = () => (
    <div className="flex flex-col space-y-4 p-6 min-h-[400px]" style={{ backgroundColor: '#1a1a1a' }}>
      <DrawerClose asChild>
        <Link 
          to="/" 
          className={getMobileLinkClasses('/')}
          style={{ color: isActiveLink('/') ? '#FFEB3B' : '#e0e0e0', textDecoration: 'none' }}
        >
          Home
        </Link>
      </DrawerClose>
      <DrawerClose asChild>
        <Link 
          to="/albums" 
          className={getMobileLinkClasses('/albums')}
          style={{ color: isActiveLink('/albums') ? '#FFEB3B' : '#e0e0e0', textDecoration: 'none' }}
        >
          Albums
        </Link>
      </DrawerClose>
      <DrawerClose asChild>
        <Link 
          to="/album-lab" 
          className={getMobileLinkClasses('/album-lab')}
          style={{ color: isActiveLink('/album-lab') ? '#FFEB3B' : '#e0e0e0', textDecoration: 'none' }}
        >
          <BookOpen className="h-5 w-5" style={{ color: isActiveLink('/album-lab') ? '#FFEB3B' : '#e0e0e0' }} />
          <span style={{ color: isActiveLink('/album-lab') ? '#FFEB3B' : '#e0e0e0' }}>Lab</span>
        </Link>
      </DrawerClose>
      <DrawerClose asChild>
        <Link 
          to="/community" 
          className={getMobileLinkClasses('/community')}
          style={{ color: isActiveLink('/community') ? '#FFEB3B' : '#e0e0e0', textDecoration: 'none' }}
        >
          <UsersRound className="h-5 w-5" style={{ color: isActiveLink('/community') ? '#FFEB3B' : '#e0e0e0' }} />
          <span style={{ color: isActiveLink('/community') ? '#FFEB3B' : '#e0e0e0' }}>Community</span>
        </Link>
      </DrawerClose>
      <DrawerClose asChild>
        <Link 
          to="/challenges" 
          className={getMobileLinkClasses('/challenges')}
          style={{ color: isActiveLink('/challenges') ? '#FFEB3B' : '#e0e0e0', textDecoration: 'none' }}
        >
          <Trophy className="h-5 w-5" style={{ color: isActiveLink('/challenges') ? '#FFEB3B' : '#e0e0e0' }} />
          <span style={{ color: isActiveLink('/challenges') ? '#FFEB3B' : '#e0e0e0' }}>Challenges</span>
        </Link>
      </DrawerClose>
      <DrawerClose asChild>
        <Link 
          to="/marketplace" 
          className={getMobileLinkClasses('/marketplace')}
          style={{ color: isActiveLink('/marketplace') ? '#FFEB3B' : '#e0e0e0', textDecoration: 'none' }}
        >
          Marketplace
        </Link>
      </DrawerClose>
      
      {/* Wallet actions in mobile menu */}
      <div className="pt-6 space-y-4">
        {enderecoCarteira && (
          <>
            <DrawerClose asChild>
              <Button
                variant="outline"
                className="w-full bg-[#1F1F1F] text-white border-[#FFEB3B] hover:bg-[#FFEB3B] hover:text-black transition-colors"
                onClick={handleVerificarSaldo}
                disabled={isCheckingBalance}
              >
                <DollarSign className="h-4 w-4 mr-2" />
                {isCheckingBalance ? "Verificando..." : "Ver Saldo"}
              </Button>
            </DrawerClose>
            
            <DrawerClose asChild>
              <Button
                variant="outline"
                className="w-full bg-[#1F1F1F] text-white border-[#FFEB3B] hover:bg-[#FFEB3B] hover:text-black transition-colors"
                onClick={handleDesconectarCarteira}
              >
                <LogOut className="h-4 w-4 mr-2" />
                Desconectar
              </Button>
            </DrawerClose>
          </>
        )}
        
        {!enderecoCarteira && (
          <DrawerClose asChild>
            <Button 
              variant="default"
              className="w-full bg-[#FFEB3B] text-black font-medium hover:bg-[#FFD700] transition-colors"
              onClick={handleConectarCarteira}
              disabled={isLoading}
            >
              <div className="flex items-center gap-2">
                <Wallet className="h-4 w-4" />
                {isLoading ? "Conectando..." : "Connect Wallet"}
              </div>
            </Button>
          </DrawerClose>
        )}
      </div>
    </div>
  );

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
        
        {/* Desktop Menu */}
        <div className="flex items-center gap-8 max-md:hidden">
          <Link to="/" className={getLinkClasses('/')}>Home</Link>
          <Link to="/albums" className={getLinkClasses('/albums')}>Albums</Link>
          <Link to="/album-lab" className={getLinkClasses('/album-lab')}>
            <BookOpen className="h-4 w-4" />
            <span>Lab</span>
          </Link>
          <Link to="/community" className={getLinkClasses('/community')}>
            <UsersRound className="h-4 w-4" />
            <span>Community</span>
          </Link>
          <Link to="/challenges" className={getLinkClasses('/challenges')}>
            <Trophy className="h-4 w-4" />
            <span>Challenges</span>
          </Link>
          <Link to="/marketplace" className={getLinkClasses('/marketplace')}>Marketplace</Link>
        </div>

        {/* Desktop Wallet Actions */}
        <div className="flex items-center gap-2 max-md:hidden">
          {enderecoCarteira && (
            <>
              <Button
                variant="outline"
                className="bg-[#1F1F1F] text-white border-[#FFEB3B] hover:bg-[#FFEB3B] hover:text-black transition-colors"
                onClick={handleVerificarSaldo}
                disabled={isCheckingBalance}
              >
                <DollarSign className="h-4 w-4 mr-1" />
                {isCheckingBalance ? "Verificando..." : "Ver Saldo"}
              </Button>
              
              <Button
                variant="outline"
                className="bg-[#1F1F1F] text-white border-[#FFEB3B] hover:bg-[#FFEB3B] hover:text-black transition-colors"
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

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <Drawer open={mobileMenuOpen} onOpenChange={handleMobileMenuToggle}>
            <DrawerTrigger asChild>
              <Button 
                variant="ghost" 
                size="icon" 
                className="text-white hover:bg-white/10"
                onClick={() => console.log('Hamburger clicked')}
              >
                <Menu className="h-6 w-6" />
                <span className="sr-only">Abrir menu</span>
              </Button>
            </DrawerTrigger>
            <DrawerContent className="z-[100] max-h-[85vh]" style={{ backgroundColor: '#1a1a1a', border: '1px solid #333' }}>
              <DrawerHeader className="text-center" style={{ backgroundColor: '#1a1a1a' }}>
                <DrawerTitle className="text-xl font-semibold" style={{ color: '#e0e0e0' }}>Menu de Navegação</DrawerTitle>
                <DrawerDescription className="text-sm" style={{ color: '#a0a0a0' }}>
                  Navegue pelas seções do site
                </DrawerDescription>
              </DrawerHeader>
              <MobileMenuContent />
            </DrawerContent>
          </Drawer>
        </div>
      </nav>
      
      <MetaMaskInstallDialog 
        open={showMetaMaskDialog} 
        onOpenChange={setShowMetaMaskDialog} 
      />
    </>
  );
};
