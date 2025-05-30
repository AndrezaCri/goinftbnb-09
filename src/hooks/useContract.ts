
import { useState, useEffect } from "react";
import { contractService } from "@/services/contractService";
import { toast } from "sonner";

export const useContract = () => {
  const [isConnected, setIsConnected] = useState(false);
  const [isCorrectNetwork, setIsCorrectNetwork] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    checkConnection();
  }, []);

  const checkConnection = async () => {
    setIsLoading(true);
    try {
      const networkCheck = await contractService.checkNetwork();
      setIsCorrectNetwork(networkCheck);
      
      if (typeof window.ethereum !== 'undefined') {
        const accounts = await window.ethereum.request({ method: 'eth_accounts' });
        setIsConnected(accounts.length > 0);
        
        if (accounts.length > 0) {
          await contractService.updateSigner();
        }
      }
    } catch (error) {
      console.error('Erro ao verificar conexão:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const switchToBSC = async () => {
    try {
      await window.ethereum.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId: '0x61' }], // BSC Testnet
      });
      
      await checkConnection();
      toast.success('Rede alterada para BSC Testnet');
    } catch (error: any) {
      if (error.code === 4902) {
        // Rede não adicionada, vamos adicionar
        try {
          await window.ethereum.request({
            method: 'wallet_addEthereumChain',
            params: [{
              chainId: '0x61',
              chainName: 'BNB Smart Chain Testnet',
              nativeCurrency: {
                name: 'tBNB',
                symbol: 'tBNB',
                decimals: 18,
              },
              rpcUrls: ['https://data-seed-prebsc-1-s1.binance.org:8545/'],
              blockExplorerUrls: ['https://testnet.bscscan.com/'],
            }],
          });
          
          await checkConnection();
          toast.success('BSC Testnet adicionada e conectada!');
        } catch (addError) {
          console.error('Erro ao adicionar rede:', addError);
          toast.error('Erro ao adicionar rede BSC');
        }
      } else {
        console.error('Erro ao trocar rede:', error);
        toast.error('Erro ao trocar para BSC');
      }
    }
  };

  return {
    isConnected,
    isCorrectNetwork,
    isLoading,
    checkConnection,
    switchToBSC,
    contractService
  };
};
