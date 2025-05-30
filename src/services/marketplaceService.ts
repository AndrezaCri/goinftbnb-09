
import { ethers } from "ethers";
import { contractService } from "./contractService";
import { toast } from "sonner";

export interface MarketplaceListing {
  nftContract: string;
  tokenId: number;
  seller: string;
  price: string;
  active: boolean;
}

export interface MarketplaceOffer {
  nftContract: string;
  tokenId: number;
  buyer: string;
  amount: string;
  active: boolean;
}

export class MarketplaceService {
  // Função para listar NFT no marketplace
  async listNFT(tokenId: number, priceInBNB: string): Promise<boolean> {
    try {
      const marketplaceContract = contractService.getMarketplaceContract();
      const nftContractAddress = contractService.getNFTContract().address;
      const price = ethers.utils.parseEther(priceInBNB);
      
      toast.info('Listando NFT no marketplace...');
      const tx = await marketplaceContract.listNFT(nftContractAddress, tokenId, price);
      
      toast.info('Aguardando confirmação...');
      await tx.wait();
      
      toast.success('NFT listado com sucesso!');
      return true;
    } catch (error) {
      console.error('Erro ao listar NFT:', error);
      toast.error('Erro ao listar NFT');
      return false;
    }
  }

  // Função para comprar NFT
  async buyNFT(tokenId: number, priceInBNB: string): Promise<boolean> {
    try {
      const marketplaceContract = contractService.getMarketplaceContract();
      const nftContractAddress = contractService.getNFTContract().address;
      const price = ethers.utils.parseEther(priceInBNB);
      
      toast.info('Comprando NFT...');
      const tx = await marketplaceContract.buyNFT(nftContractAddress, tokenId, {
        value: price
      });
      
      toast.info('Aguardando confirmação...');
      await tx.wait();
      
      toast.success('NFT comprado com sucesso!');
      return true;
    } catch (error) {
      console.error('Erro ao comprar NFT:', error);
      toast.error('Erro ao comprar NFT');
      return false;
    }
  }

  // Função para fazer oferta
  async makeOffer(tokenId: number, offerInBNB: string): Promise<boolean> {
    try {
      const marketplaceContract = contractService.getMarketplaceContract();
      const nftContractAddress = contractService.getNFTContract().address;
      const offer = ethers.utils.parseEther(offerInBNB);
      
      toast.info('Fazendo oferta...');
      const tx = await marketplaceContract.makeOffer(nftContractAddress, tokenId, offer, {
        value: offer
      });
      
      toast.info('Aguardando confirmação...');
      await tx.wait();
      
      toast.success('Oferta realizada com sucesso!');
      return true;
    } catch (error) {
      console.error('Erro ao fazer oferta:', error);
      toast.error('Erro ao fazer oferta');
      return false;
    }
  }

  // Função para obter listagem
  async getListing(tokenId: number): Promise<MarketplaceListing | null> {
    try {
      const marketplaceContract = contractService.getMarketplaceContract();
      const nftContractAddress = contractService.getNFTContract().address;
      
      const listing = await marketplaceContract.getListing(nftContractAddress, tokenId);
      
      return {
        nftContract: nftContractAddress,
        tokenId,
        seller: listing.seller,
        price: ethers.utils.formatEther(listing.price),
        active: listing.active
      };
    } catch (error) {
      console.error('Erro ao obter listagem:', error);
      return null;
    }
  }
}

export const marketplaceService = new MarketplaceService();
