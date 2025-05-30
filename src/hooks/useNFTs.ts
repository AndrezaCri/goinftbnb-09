
import { useState, useEffect } from "react";
import { nftService, NFTMetadata } from "@/services/nftService";
import { useContract } from "./useContract";

export const useNFTs = (userAddress?: string) => {
  const [nfts, setNfts] = useState<NFTMetadata[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { isConnected, isCorrectNetwork } = useContract();

  const fetchUserNFTs = async (address: string) => {
    if (!isConnected || !isCorrectNetwork) {
      setError('Conecte-se à rede BSC primeiro');
      return;
    }

    setIsLoading(true);
    setError(null);
    
    try {
      const userNFTs = await nftService.getUserNFTs(address);
      setNfts(userNFTs);
    } catch (err) {
      setError('Erro ao carregar NFTs');
      console.error('Erro ao buscar NFTs:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const transferNFT = async (to: string, tokenId: number) => {
    const success = await nftService.transferNFT(to, tokenId);
    if (success && userAddress) {
      // Recarregar NFTs após transferência
      await fetchUserNFTs(userAddress);
    }
    return success;
  };

  const approveMarketplace = async (tokenId: number) => {
    return await nftService.approveMarketplace(tokenId);
  };

  useEffect(() => {
    if (userAddress && isConnected && isCorrectNetwork) {
      fetchUserNFTs(userAddress);
    }
  }, [userAddress, isConnected, isCorrectNetwork]);

  return {
    nfts,
    isLoading,
    error,
    fetchUserNFTs,
    transferNFT,
    approveMarketplace,
    refetch: () => userAddress ? fetchUserNFTs(userAddress) : Promise.resolve()
  };
};
