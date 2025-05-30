
import React, { useState } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ThumbsUp, ThumbsDown, User, Calendar, Award } from "lucide-react";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";
import { toast } from "sonner";

// Mock data for soccer community albums
const initialAlbums = [
  {
    id: 1,
    title: "CastaCrypto",
    creator: "Crypto philosopher",
    createdAt: "2025-05-01",
    imageUrl: "/lovable-uploads/158597eb-8794-4eaa-81bf-c398b03162b1.png",
    description: "Education, privacy and critical thinking in Web3",
    upvotes: 124,
    downvotes: 8,
    tags: ["education", "sovereignty", "blockchain"]
  },
  {
    id: 2,
    title: "Coruja Cripto",
    creator: "Digital explorers",
    createdAt: "2025-05-02",
    imageUrl: "/lovable-uploads/92627ff6-fee9-43e4-af64-9fcfcf4e34f3.png",
    description: "Learning and evolving in the Web3 universe",
    upvotes: 98,
    downvotes: 12,
    tags: ["education", "blockchain", "community"]
  },
  {
    id: 3,
    title: "Binance",
    creator: "Global exchange leader",
    createdAt: "2025-05-03",
    imageUrl: "/lovable-uploads/9eada32b-37ba-4cfc-a78e-6e750250b816.png",
    description: "Empowering freedom through crypto and finance",
    upvotes: 87,
    downvotes: 5,
    tags: ["trading", "blockchain", "innovation"]
  },
  {
    id: 4,
    title: "Premier League Collection",
    creator: "Football legends",
    createdAt: "2025-05-04",
    imageUrl: "/lovable-uploads/3fbe2d39-07c3-414d-9191-275d52cc520e.png",
    description: "The ultimate collection of Premier League moments and stars",
    upvotes: 156,
    downvotes: 7,
    tags: ["football", "premier league", "collectibles"]
  }
];

const Community = () => {
  const [albums, setAlbums] = useState(initialAlbums);
  const [currentPage, setCurrentPage] = useState(1);
  const albumsPerPage = 3;
  
  const indexOfLastAlbum = currentPage * albumsPerPage;
  const indexOfFirstAlbum = indexOfLastAlbum - albumsPerPage;
  const currentAlbums = albums.slice(indexOfFirstAlbum, indexOfLastAlbum);
  
  const totalPages = Math.ceil(albums.length / albumsPerPage);
  
  const handleVote = (id: number, voteType: 'up' | 'down') => {
    setAlbums(albums.map(album => {
      if (album.id === id) {
        if (voteType === 'up') {
          toast.success("Upvoted soccer album!");
          return { ...album, upvotes: album.upvotes + 1 };
        } else {
          toast.info("Downvoted soccer album");
          return { ...album, downvotes: album.downvotes + 1 };
        }
      }
      return album;
    }));
  };

  const handleImageLoad = (imageUrl: string) => {
    console.log('Image loaded successfully:', imageUrl);
  };

  const handleImageError = (imageUrl: string) => {
    console.log('Image failed to load:', imageUrl);
  };
  
  return (
    <div className="min-h-screen bg-[#121212] text-white">
      <Navbar />
      
      <main className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <div className="flex items-center">
            <Award className="mr-2 text-green-500" size={24} />
            <h1 className="text-3xl font-bold">Soccer Community Albums</h1>
          </div>
          <div className="flex space-x-2">
            <Badge variant="secondary" className="bg-[#1F1F1F] text-white border-[#333] hover:bg-[#2A2A2A]">Latest</Badge>
            <Badge variant="outline" className="bg-transparent text-gray-300 border-[#333] hover:bg-[#1F1F1F]">Popular</Badge>
            <Badge variant="outline" className="bg-transparent text-gray-300 border-[#333] hover:bg-[#1F1F1F]">Trending</Badge>
          </div>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {currentAlbums.map((album) => (
            <Card key={album.id} className="bg-[#1F1F1F] border-[#333] text-white overflow-hidden hover:border-green-500 transition-all">
              <div className="relative bg-[#2A2A2A]">
                <AspectRatio ratio={1 / 1}>
                  <img
                    src={album.imageUrl}
                    alt={album.title}
                    className="w-full h-full object-contain"
                    onLoad={() => handleImageLoad(album.imageUrl)}
                    onError={() => handleImageError(album.imageUrl)}
                    style={{ 
                      objectPosition: 'center'
                    }}
                  />
                </AspectRatio>
              </div>
              
              <CardContent className="pt-4">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-xl font-semibold">{album.title}</h3>
                </div>
                
                <div className="flex items-center gap-2 mb-2 text-sm text-gray-400">
                  <User size={16} />
                  <span>{album.creator}</span>
                </div>
                
                <p className="text-sm text-gray-300 mb-3">{album.description}</p>
                
                <div className="flex flex-wrap gap-1 mb-2">
                  {album.tags.map((tag) => (
                    <Badge key={tag} variant="outline" className="text-xs bg-green-900/20 text-green-400 border-green-900">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </CardContent>
              
              <CardFooter className="pt-0 flex justify-between">
                <div className="flex gap-4">
                  <button 
                    onClick={() => handleVote(album.id, 'up')}
                    className="flex items-center gap-1 text-gray-400 hover:text-green-500"
                  >
                    <ThumbsUp size={18} />
                    <span>{album.upvotes}</span>
                  </button>
                  
                  <button 
                    onClick={() => handleVote(album.id, 'down')}
                    className="flex items-center gap-1 text-gray-400 hover:text-red-500"
                  >
                    <ThumbsDown size={18} />
                    <span>{album.downvotes}</span>
                  </button>
                </div>
                
                <div className="flex items-center gap-1 text-sm text-gray-400">
                  <Calendar size={16} />
                  <span>{album.createdAt}</span>
                </div>
              </CardFooter>
            </Card>
          ))}
        </div>
        
        {totalPages > 1 && (
          <Pagination className="mt-8">
            <PaginationContent className="text-white">
              {currentPage > 1 && (
                <PaginationItem>
                  <PaginationPrevious 
                    onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                    className="bg-[#1F1F1F] text-white border-[#FFEB3B] hover:bg-[#FFEB3B] hover:text-black transition-colors"
                  />
                </PaginationItem>
              )}
              
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <PaginationItem key={page}>
                  <PaginationLink 
                    isActive={currentPage === page}
                    onClick={() => setCurrentPage(page)}
                    className={currentPage === page 
                      ? "bg-[#FFEB3B] text-black border-[#FFEB3B] hover:bg-[#FFEB3B]/90" 
                      : "bg-[#1F1F1F] text-white border-[#FFEB3B] hover:bg-[#FFEB3B] hover:text-black transition-colors"
                    }
                  >
                    {page}
                  </PaginationLink>
                </PaginationItem>
              ))}
              
              {currentPage < totalPages && (
                <PaginationItem>
                  <PaginationNext 
                    onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                    className="bg-[#1F1F1F] text-white border-[#FFEB3B] hover:bg-[#FFEB3B] hover:text-black transition-colors"
                  />
                </PaginationItem>
              )}
            </PaginationContent>
          </Pagination>
        )}
      </main>
    </div>
  );
};

export default Community;
