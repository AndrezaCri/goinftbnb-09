
import { ethers } from "ethers";
import { contractService } from "./contractService";
import { toast } from "sonner";

export interface NFTMetadata {
  id: number;
  name: string;
  description: string;
  image: string;
  rarity?: number;
  collection?: string;
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

      console.log(`🔍 Buscando ${balance.toString()} NFTs para ${userAddress}`);

      // Se o contrato tem tokenOfOwnerByIndex, usar essa função
      try {
        for (let i = 0; i < balance.toNumber(); i++) {
          const tokenId = await nftContract.tokenOfOwnerByIndex(userAddress, i);
          const nft = await this.getNFTById(tokenId.toNumber());
          if (nft) nfts.push(nft);
        }
      } catch (error) {
        console.log('tokenOfOwnerByIndex não disponível, tentando método alternativo...');
        
        // Método alternativo: verificar a totalSupply e filtrar por owner
        try {
          const totalSupply = await nftContract.totalSupply();
          for (let tokenId = 1; tokenId <= totalSupply.toNumber(); tokenId++) {
            try {
              const owner = await nftContract.ownerOf(tokenId);
              if (owner.toLowerCase() === userAddress.toLowerCase()) {
                const nft = await this.getNFTById(tokenId);
                if (nft) nfts.push(nft);
              }
            } catch (err) {
              // Token pode não existir, continuar
              continue;
            }
          }
        } catch (totalSupplyError) {
          console.error('Erro ao obter totalSupply:', totalSupplyError);
        }
      }

      console.log(`📦 ${nfts.length} NFTs encontrados para ${userAddress}`);
      return nfts;
    } catch (error) {
      console.error('Erro ao buscar NFTs:', error);
      toast.error('Erro ao carregar NFTs');
      return [];
    }
  }

  // Função para obter um NFT específico por ID
  async getNFTById(tokenId: number): Promise<NFTMetadata | null> {
    try {
      const nftContract = contractService.getNFTContract();
      
      // Verificar se o token existe
      try {
        const owner = await nftContract.ownerOf(tokenId);
        if (!owner || owner === ethers.constants.AddressZero) {
          return null;
        }
      } catch (error) {
        // Token não existe
        return null;
      }

      // Obter URI do token
      let tokenURI = '';
      try {
        tokenURI = await nftContract.tokenURI(tokenId);
      } catch (error) {
        console.log(`Token ${tokenId} não tem URI definida`);
      }

      // Criar metadata básica
      const metadata: NFTMetadata = {
        id: tokenId,
        name: `NFT #${tokenId}`,
        description: `Token ID ${tokenId}`,
        image: "/placeholder.svg", // Placeholder até termos IPFS
        attributes: []
      };

      // Se temos URI, tentar buscar metadados
      if (tokenURI && tokenURI !== '') {
        try {
          // Se for IPFS, converter para gateway HTTP
          let fetchUrl = tokenURI;
          if (tokenURI.startsWith('ipfs://')) {
            fetchUrl = tokenURI.replace('ipfs://', 'https://ipfs.io/ipfs/');
          }

          const response = await fetch(fetchUrl);
          if (response.ok) {
            const ipfsMetadata = await response.json();
            metadata.name = ipfsMetadata.name || metadata.name;
            metadata.description = ipfsMetadata.description || metadata.description;
            metadata.image = ipfsMetadata.image || metadata.image;
            metadata.attributes = ipfsMetadata.attributes || [];
          }
        } catch (error) {
          console.log(`Erro ao buscar metadados IPFS para token ${tokenId}:`, error);
        }
      }

      return metadata;
    } catch (error) {
      console.error(`Erro ao buscar NFT ${tokenId}:`, error);
      return null;
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

  // Função para verificar se marketplace está aprovado
  async isMarketplaceApproved(tokenId: number): Promise<boolean> {
    try {
      const nftContract = contractService.getNFTContract();
      const marketplaceAddress = contractService.getMarketplaceContract().address;
      const approved = await nftContract.getApproved(tokenId);
      
      return approved.toLowerCase() === marketplaceAddress.toLowerCase();
    } catch (error) {
      console.error('Erro ao verificar aprovação:', error);
      return false;
    }
  }
}

export const nftService = new NFTService();
