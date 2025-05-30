
// Endereços dos contratos deployados
// IMPORTANTE: Substitua pelos endereços reais dos seus contratos
export const CONTRACT_ADDRESSES = {
  // Contratos principais
  NFT_CONTRACT: '0xB094cA02D1AAF7dA4668e11951AF35634fC97c29', // Endereço real do contrato NFT
  MARKETPLACE_CONTRACT: '0x14d624D49513b9B2678f5e0b8EE8c5B8a89Cb9c7', // Endereço real do Marketplace
  PACK_CONTRACT: '0x0000000000000000000000000000000000000000', // Substitua pelo endereço real
  
  // Contratos auxiliares (se houver)
  TOKEN_CONTRACT: '0x0000000000000000000000000000000000000000', // Token utilitário (opcional)
  STAKING_CONTRACT: '0x0000000000000000000000000000000000000000', // Contrato de staking (opcional)
} as const;

export type ContractName = keyof typeof CONTRACT_ADDRESSES;
