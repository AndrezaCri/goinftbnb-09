
import { ethers } from "ethers";
import { CONTRACT_ADDRESSES } from "@/contracts/addresses";
import { NFT_CONTRACT_ABI } from "@/contracts/abis/NFTContract";
import { MARKETPLACE_CONTRACT_ABI } from "@/contracts/abis/MarketplaceContract";
import { PACK_CONTRACT_ABI } from "@/contracts/abis/PackContract";

export class ContractService {
  private provider: ethers.providers.Web3Provider | null = null;
  private signer: ethers.Signer | null = null;

  constructor() {
    this.initializeProvider();
  }

  private async initializeProvider() {
    if (typeof window.ethereum !== 'undefined') {
      this.provider = new ethers.providers.Web3Provider(window.ethereum);
      this.signer = this.provider.getSigner();
      console.log('🔗 Provider inicializado para contratos');
    }
  }

  // Função para obter instância do contrato NFT
  getNFTContract() {
    if (!this.signer) throw new Error('Signer não disponível');
    return new ethers.Contract(
      CONTRACT_ADDRESSES.NFT_CONTRACT,
      NFT_CONTRACT_ABI,
      this.signer
    );
  }

  // Função para obter instância do contrato Marketplace
  getMarketplaceContract() {
    if (!this.signer) throw new Error('Signer não disponível');
    return new ethers.Contract(
      CONTRACT_ADDRESSES.MARKETPLACE_CONTRACT,
      MARKETPLACE_CONTRACT_ABI,
      this.signer
    );
  }

  // Função para obter instância do contrato Pack
  getPackContract() {
    if (!this.signer) throw new Error('Signer não disponível');
    return new ethers.Contract(
      CONTRACT_ADDRESSES.PACK_CONTRACT,
      PACK_CONTRACT_ABI,
      this.signer
    );
  }

  // Função para atualizar o signer (quando usuário troca de conta)
  async updateSigner() {
    if (this.provider) {
      this.signer = this.provider.getSigner();
    }
  }

  // Função para verificar se está conectado à rede correta
  async checkNetwork() {
    if (!this.provider) return false;
    const network = await this.provider.getNetwork();
    return network.chainId === 97; // BSC Testnet
  }
}

// Instância singleton
export const contractService = new ContractService();
