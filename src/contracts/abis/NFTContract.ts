
// ABI do contrato de NFT
// Baseada em padrões ERC-721 comuns
export const NFT_CONTRACT_ABI = [
  // Funções básicas ERC-721
  "function name() public view returns (string)",
  "function symbol() public view returns (string)",
  "function totalSupply() public view returns (uint256)",
  "function balanceOf(address owner) public view returns (uint256)",
  "function ownerOf(uint256 tokenId) public view returns (address)",
  "function tokenURI(uint256 tokenId) public view returns (string memory)",
  
  // Funções de transferência
  "function approve(address to, uint256 tokenId) public",
  "function getApproved(uint256 tokenId) public view returns (address)",
  "function setApprovalForAll(address operator, bool approved) public",
  "function isApprovedForAll(address owner, address operator) public view returns (bool)",
  "function transferFrom(address from, address to, uint256 tokenId) public",
  "function safeTransferFrom(address from, address to, uint256 tokenId) public",
  "function safeTransferFrom(address from, address to, uint256 tokenId, bytes memory data) public",
  
  // Funções de mint (se aplicável)
  "function mint(address to, uint256 tokenId) public",
  "function mint(address to) public returns (uint256)",
  "function safeMint(address to, uint256 tokenId) public",
  
  // Funções de consulta específicas (se existirem)
  "function tokenOfOwnerByIndex(address owner, uint256 index) public view returns (uint256)",
  "function tokensOfOwner(address owner) public view returns (uint256[] memory)",
  
  // Eventos padrão ERC-721
  "event Transfer(address indexed from, address indexed to, uint256 indexed tokenId)",
  "event Approval(address indexed owner, address indexed approved, uint256 indexed tokenId)",
  "event ApprovalForAll(address indexed owner, address indexed operator, bool approved)"
] as const;
