
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
    title: "World Cup Legends",
    creator: "SoccerFan99",
    createdAt: "2025-05-01",
    imageUrl: "/lovable-uploads/dbf632e2-cd04-465f-ae41-1200d71dd6bd.png",
    description: "Collection of the greatest World Cup moments in history",
    upvotes: 124,
    downvotes: 8,
    tags: ["world cup", "legends", "history"]
  },
  {
    id: 2,
    title: "Premier League Stars",
    creator: "PLenthusiast",
    createdAt: "2025-05-02",
    imageUrl: "https://picsum.photos/seed/soccer2/400/400",
    description: "The best players from the English Premier League",
    upvotes: 98,
    downvotes: 12,
    tags: ["premier league", "stars", "england"]
  },
  {
    id: 3,
    title: "Champions League Moments",
    creator: "UCLfanatic",
    createdAt: "2025-05-03",
    imageUrl: "https://picsum.photos/seed/soccer3/400/400",
    description: "Iconic moments from UEFA Champions League history",
    upvotes: 87,
    downvotes: 5,
    tags: ["champions league", "uefa", "europe"]
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
  
  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar />
      
      <main className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <div className="flex items-center">
            <Award className="mr-2 text-green-500" size={24} />
            <h1 className="text-3xl font-bold">Soccer Community Albums</h1>
          </div>
          <div className="flex space-x-2">
            <Badge variant="secondary">Latest</Badge>
            <Badge variant="outline">Popular</Badge>
            <Badge variant="outline">Trending</Badge>
          </div>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {currentAlbums.map((album) => (
            <Card key={album.id} className="bg-[#111] border-[#333] text-white overflow-hidden hover:border-green-500 transition-all">
              <div className="relative">
                <AspectRatio ratio={1 / 1}>
                  <img
                    src={album.imageUrl}
                    alt={album.title}
                    className="object-cover w-full h-full object-center"
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
