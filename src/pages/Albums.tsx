import React, { useState } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { UserAlbumsSection } from "@/components/albums/UserAlbumsSection";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import LazyIcon from "@/components/ui/lazy-icon";

const Albums = () => {
  const [albums, setAlbums] = useState([
    {
      id: 1,
      title: "My Summer Vacation",
      description: "A collection of memories from my trip to Europe.",
      coverImage: "https://images.unsplash.com/photo-1533622550144-c3292ca59056?w=400&h=400&fit=crop",
      cards: 32,
      likes: 128,
      creator: "john_doe",
      createdAt: "2024-07-01",
    },
    {
      id: 2,
      title: "Best of 2023",
      description: "My favorite moments and experiences from the past year.",
      coverImage: "https://images.unsplash.com/photo-1485291571150-772bcfc06961?w=400&h=400&fit=crop",
      cards: 15,
      likes: 95,
      creator: "jane_smith",
      createdAt: "2024-01-15",
    },
    {
      id: 3,
      title: "Cityscapes",
      description: "Exploring the urban landscape and capturing its beauty.",
      coverImage: "https://images.unsplash.com/photo-1496038973910-5a2ce9567ad1?w=400&h=400&fit=crop",
      cards: 24,
      likes: 63,
      creator: "alex_jones",
      createdAt: "2023-11-20",
    },
  ]);

  return (
    <div className="min-h-screen bg-[#121212] text-white">
      <Navbar />

      <main className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">My Albums</h1>
          <Button>Create New Album</Button>
        </div>

        <UserAlbumsSection albums={albums} />
      </main>
    </div>
  );
};

export default Albums;
