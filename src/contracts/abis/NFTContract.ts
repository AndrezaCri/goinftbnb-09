
// ABI do contrato de NFT
// IMPORTANTE: Substitua pela ABI real do seu contrato
export const NFT_CONTRACT_ABI = [
  // Funções básicas ERC-721
  "function mint(address to, uint256 tokenId, string memory uri) public",
  "function ownerOf(uint256 tokenId) public view returns (address)",
  "function balanceOf(address owner) public view returns (uint256)",
  "function tokenURI(uint256 tokenId) public view returns (string memory)",
  "function approve(address to, uint256 tokenId) public",
  "function transferFrom(address from, address to, uint256 tokenId) public",
  
  // Funções específicas do projeto
  "function getRarity(uint256 tokenId) public view returns (uint8)",
  "function getCollection(uint256 tokenId) public view returns (string memory)",
  "function totalSupply() public view returns (uint256)",
  "function tokenOfOwnerByIndex(address owner, uint256 index) public view returns (uint256)",
  
  // Eventos
  "event Transfer(address indexed from, address indexed to, uint256 indexed tokenId)",
  "event Approval(address indexed owner, address indexed approved, uint256 indexed tokenId)",
  "event NFTMinted(address indexed to, uint256 indexed tokenId, uint8 rarity)"
] as const;
