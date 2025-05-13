
import React, { useState } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ThumbsUp, ThumbsDown, User, Album } from "lucide-react";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";
import { toast } from "sonner";

// Mock data for community albums
const initialAlbums = [
  {
    id: 1,
    title: "Crypto Punk Collection",
    creator: "CryptoArtist",
    createdAt: "2025-05-01",
    imageUrl: "https://picsum.photos/seed/album1/400/400",
    description: "A unique collection of digital punk characters",
    upvotes: 24,
    downvotes: 3,
    tags: ["punk", "digital", "collection"]
  },
  {
    id: 2,
    title: "Nature Scenes",
    creator: "EcoCreator",
    createdAt: "2025-05-02",
    imageUrl: "https://picsum.photos/seed/album2/400/400",
    description: "Beautiful natural landscapes as NFTs",
    upvotes: 42,
    downvotes: 5,
    tags: ["nature", "landscape", "art"]
  },
  {
    id: 3,
    title: "Abstract Shapes",
    creator: "ArtisticMind",
    createdAt: "2025-05-03",
    imageUrl: "https://picsum.photos/seed/album3/400/400",
    description: "Collection of abstract geometric shapes",
    upvotes: 18,
    downvotes: 2,
    tags: ["abstract", "geometry", "colorful"]
  },
  {
    id: 4,
    title: "Space Exploration",
    creator: "CosmicArtist",
    createdAt: "2025-05-04",
    imageUrl: "https://picsum.photos/seed/album4/400/400",
    description: "NFTs inspired by outer space and cosmic wonders",
    upvotes: 37,
    downvotes: 4,
    tags: ["space", "cosmic", "galaxy"]
  },
  {
    id: 5,
    title: "Digital Pets",
    creator: "PetLover",
    createdAt: "2025-05-05",
    imageUrl: "https://picsum.photos/seed/album5/400/400",
    description: "Adorable digital pets as collectible NFTs",
    upvotes: 56,
    downvotes: 2,
    tags: ["pets", "cute", "collectible"]
  },
  {
    id: 6,
    title: "Retro Gaming",
    creator: "GameNostalgia",
    createdAt: "2025-05-06",
    imageUrl: "https://picsum.photos/seed/album6/400/400",
    description: "NFTs inspired by classic video games",
    upvotes: 31,
    downvotes: 7,
    tags: ["gaming", "retro", "pixel-art"]
  }
];

const Community = () => {
  const [albums, setAlbums] = useState(initialAlbums);
  const [currentPage, setCurrentPage] = useState(1);
  const albumsPerPage = 6;
  
  const indexOfLastAlbum = currentPage * albumsPerPage;
  const indexOfFirstAlbum = indexOfLastAlbum - albumsPerPage;
  const currentAlbums = albums.slice(indexOfFirstAlbum, indexOfLastAlbum);
  
  const totalPages = Math.ceil(albums.length / albumsPerPage);
  
  const handleVote = (id: number, voteType: 'up' | 'down') => {
    setAlbums(albums.map(album => {
      if (album.id === id) {
        if (voteType === 'up') {
          toast.success("Upvoted album!");
          return { ...album, upvotes: album.upvotes + 1 };
        } else {
          toast.info("Downvoted album");
          return { ...album, downvotes: album.downvotes + 1 };
        }
      }
      return album;
    }));
  };
  
  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar />
      
      <main className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Community Albums</h1>
          <div className="flex space-x-2">
            <Badge variant="secondary">Latest</Badge>
            <Badge variant="outline">Popular</Badge>
            <Badge variant="outline">Trending</Badge>
          </div>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {currentAlbums.map((album) => (
            <Card key={album.id} className="bg-[#111] border-[#333] text-white overflow-hidden hover:border-[#FFEB3B] transition-all">
              <div className="relative">
                <AspectRatio ratio={1 / 1}>
                  <img
                    src={album.imageUrl}
                    alt={album.title}
                    className="object-cover w-full h-full"
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
                    <Badge key={tag} variant="outline" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </CardContent>
              
              <CardFooter className="pt-0 flex justify-between">
                <div className="flex gap-4">
                  <button 
                    onClick={() => handleVote(album.id, 'up')}
                    className="flex items-center gap-1 text-gray-400 hover:text-[#FFEB3B]"
                  >
                    <ThumbsUp size={18} />
                    <span>{album.upvotes}</span>
                  </button>
                  
                  <button 
                    onClick={() => handleVote(album.id, 'down')}
                    className="flex items-center gap-1 text-gray-400 hover:text-[#FFEB3B]"
                  >
                    <ThumbsDown size={18} />
                    <span>{album.downvotes}</span>
                  </button>
                </div>
                
                <div className="flex items-center gap-1 text-sm text-gray-400">
                  <Album size={16} />
                  <span>{album.createdAt}</span>
                </div>
              </CardFooter>
            </Card>
          ))}
        </div>
        
        {totalPages > 1 && (
          <Pagination className="mt-8">
            <PaginationContent>
              {currentPage > 1 && (
                <PaginationItem>
                  <PaginationPrevious onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))} />
                </PaginationItem>
              )}
              
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <PaginationItem key={page}>
                  <PaginationLink 
                    isActive={currentPage === page}
                    onClick={() => setCurrentPage(page)}
                  >
                    {page}
                  </PaginationLink>
                </PaginationItem>
              ))}
              
              {currentPage < totalPages && (
                <PaginationItem>
                  <PaginationNext onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))} />
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
