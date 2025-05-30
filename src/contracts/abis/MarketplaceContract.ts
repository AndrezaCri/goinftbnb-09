
// ABI do contrato de Marketplace
// IMPORTANTE: Substitua pela ABI real do seu contrato
export const MARKETPLACE_CONTRACT_ABI = [
  // Funções de listagem
  "function listNFT(address nftContract, uint256 tokenId, uint256 price) public",
  "function unlistNFT(address nftContract, uint256 tokenId) public",
  "function buyNFT(address nftContract, uint256 tokenId) public payable",
  
  // Funções de ofertas
  "function makeOffer(address nftContract, uint256 tokenId, uint256 amount) public payable",
  "function acceptOffer(address nftContract, uint256 tokenId, address buyer) public",
  "function cancelOffer(address nftContract, uint256 tokenId) public",
  
  // Funções de consulta
  "function getListing(address nftContract, uint256 tokenId) public view returns (address seller, uint256 price, bool active)",
  "function getOffer(address nftContract, uint256 tokenId, address buyer) public view returns (uint256 amount, bool active)",
  "function getMarketplaceFee() public view returns (uint256)",
  
  // Eventos
  "event NFTListed(address indexed nftContract, uint256 indexed tokenId, address indexed seller, uint256 price)",
  "event NFTSold(address indexed nftContract, uint256 indexed tokenId, address indexed buyer, uint256 price)",
  "event OfferMade(address indexed nftContract, uint256 indexed tokenId, address indexed buyer, uint256 amount)",
  "event OfferAccepted(address indexed nftContract, uint256 indexed tokenId, address indexed buyer, uint256 amount)"
] as const;
