
import { useState, useEffect } from "react";
import { useContract } from "./useContract";
import { contractService } from "@/services/contractService";
import { toast } from "sonner";

export const useContractTest = () => {
  const [isTestingConnection, setIsTestingConnection] = useState(false);
  const [connectionResults, setConnectionResults] = useState<{
    nft: { connected: boolean; name?: string; symbol?: string; error?: string };
    marketplace: { connected: boolean; fee?: string; error?: string };
  }>({
    nft: { connected: false },
    marketplace: { connected: false }
  });
  
  const { isConnected, isCorrectNetwork } = useContract();

  const testNFTContract = async () => {
    try {
      const nftContract = contractService.getNFTContract();
      
      // Testar funções básicas
      const name = await nftContract.name();
      const symbol = await nftContract.symbol();
      const totalSupply = await nftContract.totalSupply();
      
      console.log('✅ NFT Contract connected:', { name, symbol, totalSupply: totalSupply.toString() });
      
      return {
        connected: true,
        name,
        symbol,
        totalSupply: totalSupply.toString()
      };
    } catch (error) {
      console.error('❌ NFT Contract connection failed:', error);
      return {
        connected: false,
        error: error instanceof Error ? error.message : 'Unknown error'
      };
    }
  };

  const testMarketplaceContract = async () => {
    try {
      const marketplaceContract = contractService.getMarketplaceContract();
      
      // Testar função básica
      const fee = await marketplaceContract.getMarketplaceFee();
      
      console.log('✅ Marketplace Contract connected:', { fee: fee.toString() });
      
      return {
        connected: true,
        fee: fee.toString()
      };
    } catch (error) {
      console.error('❌ Marketplace Contract connection failed:', error);
      return {
        connected: false,
        error: error instanceof Error ? error.message : 'Unknown error'
      };
    }
  };

  const testContracts = async () => {
    if (!isConnected || !isCorrectNetwork) {
      toast.error('Conecte-se à rede BSC primeiro');
      return;
    }

    setIsTestingConnection(true);
    toast.info('Testando conexão com contratos...');

    try {
      const [nftResult, marketplaceResult] = await Promise.all([
        testNFTContract(),
        testMarketplaceContract()
      ]);

      setConnectionResults({
        nft: nftResult,
        marketplace: marketplaceResult
      });

      if (nftResult.connected && marketplaceResult.connected) {
        toast.success('✅ Ambos contratos conectados com sucesso!');
      } else {
        toast.warning('⚠️ Alguns contratos não conseguiram conectar');
      }
    } catch (error) {
      console.error('Erro geral ao testar contratos:', error);
      toast.error('Erro ao testar contratos');
    } finally {
      setIsTestingConnection(false);
    }
  };

  // Testar automaticamente quando conectado
  useEffect(() => {
    if (isConnected && isCorrectNetwork) {
      // Aguardar um pouco para garantir que tudo está inicializado
      setTimeout(testContracts, 1000);
    }
  }, [isConnected, isCorrectNetwork]);

  return {
    isTestingConnection,
    connectionResults,
    testContracts,
    testNFTContract,
    testMarketplaceContract
  };
};
