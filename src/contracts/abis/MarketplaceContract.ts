
// ABI do contrato de Marketplace
// Baseada em padrões comuns de marketplace NFT
export const MARKETPLACE_CONTRACT_ABI = [
  // Funções de listagem
  "function listItem(address nftContract, uint256 tokenId, uint256 price) public",
  "function cancelListing(address nftContract, uint256 tokenId) public",
  "function updateListing(address nftContract, uint256 tokenId, uint256 newPrice) public",
  
  // Funções de compra
  "function buyItem(address nftContract, uint256 tokenId) public payable",
  
  // Funções de ofertas (se aplicável)
  "function makeOffer(address nftContract, uint256 tokenId) public payable",
  "function acceptOffer(address nftContract, uint256 tokenId, address buyer) public",
  "function cancelOffer(address nftContract, uint256 tokenId) public",
  
  // Funções de consulta
  "function getListing(address nftContract, uint256 tokenId) public view returns (tuple(address seller, uint256 price, bool active))",
  "function getOffer(address nftContract, uint256 tokenId, address buyer) public view returns (uint256)",
  "function getMarketplaceFee() public view returns (uint256)",
  "function isListed(address nftContract, uint256 tokenId) public view returns (bool)",
  
  // Funções administrativas
  "function setMarketplaceFee(uint256 fee) public",
  "function withdrawFees() public",
  
  // Eventos
  "event ItemListed(address indexed nftContract, uint256 indexed tokenId, address indexed seller, uint256 price)",
  "event ItemCanceled(address indexed nftContract, uint256 indexed tokenId, address indexed seller)",
  "event ItemBought(address indexed nftContract, uint256 indexed tokenId, address indexed buyer, address seller, uint256 price)",
  "event OfferMade(address indexed nftContract, uint256 indexed tokenId, address indexed buyer, uint256 amount)",
  "event OfferAccepted(address indexed nftContract, uint256 indexed tokenId, address indexed buyer, address seller, uint256 amount)",
  "event OfferCanceled(address indexed nftContract, uint256 indexed tokenId, address indexed buyer)"
] as const;
