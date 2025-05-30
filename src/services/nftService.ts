
import { ethers } from "ethers";
import { contractService } from "./contractService";
import { toast } from "sonner";

export interface NFTMetadata {
  id: number;
  name: string;
  description: string;
  image: string;
  rarity: number;
  collection: string;
  attributes: Array<{
    trait_type: string;
    value: string | number;
  }>;
}

export class NFTService {
  // Função para obter NFTs do usuário
  async getUserNFTs(userAddress: string): Promise<NFTMetadata[]> {
    try {
      const nftContract = contractService.getNFTContract();
      const balance = await nftContract.balanceOf(userAddress);
      const nfts: NFTMetadata[] = [];

      for (let i = 0; i < balance.toNumber(); i++) {
        const tokenId = await nftContract.tokenOfOwnerByIndex(userAddress, i);
        const tokenURI = await nftContract.tokenURI(tokenId);
        const rarity = await nftContract.getRarity(tokenId);
        const collection = await nftContract.getCollection(tokenId);
        
        // Buscar metadados do IPFS (simulado por enquanto)
        const metadata: NFTMetadata = {
          id: tokenId.toNumber(),
          name: `NFT #${tokenId}`,
          description: `Figurinha ${collection}`,
          image: "/placeholder.svg", // Substituir pela URL real do IPFS
          rarity: rarity,
          collection: collection,
          attributes: []
        };
        
        nfts.push(metadata);
      }

      console.log(`📦 ${nfts.length} NFTs encontrados para ${userAddress}`);
      return nfts;
    } catch (error) {
      console.error('Erro ao buscar NFTs:', error);
      toast.error('Erro ao carregar NFTs');
      return [];
    }
  }

  // Função para fazer transfer de NFT
  async transferNFT(to: string, tokenId: number): Promise<boolean> {
    try {
      const nftContract = contractService.getNFTContract();
      const signer = await contractService.getNFTContract().signer.getAddress();
      
      toast.info('Iniciando transferência de NFT...');
      const tx = await nftContract.transferFrom(signer, to, tokenId);
      
      toast.info('Aguardando confirmação na blockchain...');
      await tx.wait();
      
      toast.success('NFT transferido com sucesso!');
      return true;
    } catch (error) {
      console.error('Erro no transfer:', error);
      toast.error('Erro ao transferir NFT');
      return false;
    }
  }

  // Função para aprovar marketplace
  async approveMarketplace(tokenId: number): Promise<boolean> {
    try {
      const nftContract = contractService.getNFTContract();
      const marketplaceAddress = contractService.getMarketplaceContract().address;
      
      toast.info('Aprovando marketplace...');
      const tx = await nftContract.approve(marketplaceAddress, tokenId);
      await tx.wait();
      
      toast.success('Marketplace aprovado!');
      return true;
    } catch (error) {
      console.error('Erro na aprovação:', error);
      toast.error('Erro ao aprovar marketplace');
      return false;
    }
  }
}

export const nftService = new NFTService();
