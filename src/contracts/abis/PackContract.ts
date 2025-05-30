
// ABI do contrato de Pacotes
// IMPORTANTE: Substitua pela ABI real do seu contrato
export const PACK_CONTRACT_ABI = [
  // Funções de pacotes
  "function buyPack(uint8 packType) public payable",
  "function openPack(uint256 packId) public returns (uint256[] memory tokenIds)",
  "function getPackPrice(uint8 packType) public view returns (uint256)",
  "function getPackContent(uint8 packType) public view returns (uint8 nftCount, uint8[] memory rarityWeights)",
  
  // Funções de consulta
  "function getUserPacks(address user) public view returns (uint256[] memory)",
  "function getPackInfo(uint256 packId) public view returns (uint8 packType, bool opened, address owner)",
  
  // Eventos
  "event PackPurchased(address indexed buyer, uint256 indexed packId, uint8 packType, uint256 price)",
  "event PackOpened(address indexed owner, uint256 indexed packId, uint256[] tokenIds)"
] as const;
