

import React, { createContext, useContext, useState, useEffect } from 'react';

export interface Album {
  id: string;
  title: string;
  description: string;
  gridType: string;
  createdAt: string;
  stickers: string[];
}

export interface Sticker {
  id: number;
  name: string;
  image: string;
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
  collected: boolean;
}

interface AlbumContextType {
  albums: Album[];
  stickers: Sticker[];
  collectedStickers: number;
  totalStickers: number;
  completionPercentage: number;
  addAlbum: (album: Omit<Album, 'id' | 'createdAt'>) => void;
  deleteAlbum: (id: string) => void;
}

const AlbumContext = createContext<AlbumContextType | undefined>(undefined);

export const useAlbums = () => {
  const context = useContext(AlbumContext);
  if (!context) {
    throw new Error('useAlbums must be used within an AlbumProvider');
  }
  return context;
};

export const AlbumProvider = ({ children }: { children: React.ReactNode }) => {
  const [albums, setAlbums] = useState<Album[]>([]);
  
  // Sistema de figurinhas Soccer Stars - 12 total, 3 coletadas (25%) - posições 1, 6 e 12
  const [stickers] = useState<Sticker[]>([
    { id: 1, name: "Pelé", image: "/lovable-uploads/3121786f-498c-43f6-938a-2d39160b74b2.png", rarity: 'legendary', collected: true },
    { id: 2, name: "Messi", image: "/lovable-uploads/150546b1-72fa-4491-af20-c03769ac8524.png", rarity: 'legendary', collected: false },
    { id: 3, name: "Cristiano", image: "/lovable-uploads/ecf235a4-ca9f-4979-a92b-abc709669da9.png", rarity: 'legendary', collected: false },
    { id: 4, name: "Neymar Jr", image: "/lovable-uploads/edda13e2-4967-47b2-922a-11d95d8c5a24.png", rarity: 'epic', collected: false },
    { id: 5, name: "Mbappé", image: "/lovable-uploads/66a51bba-ded5-4a66-9028-2437120eb10b.png", rarity: 'epic', collected: false },
    { id: 6, name: "Ronaldinho", image: "/lovable-uploads/bbf691dd-219d-4f84-8565-71bf1077c9aa.png", rarity: 'epic', collected: true },
    { id: 7, name: "Ansu Fati", image: "/lovable-uploads/a3594a7c-698e-4bd0-a685-f26c3e9c057a.png", rarity: 'rare', collected: false },
    { id: 8, name: "Maradona", image: "/lovable-uploads/158597eb-8794-4eaa-81bf-c398b03162b1.png", rarity: 'legendary', collected: false },
    { id: 9, name: "Kaká", image: "/lovable-uploads/3fbe2d39-07c3-414d-9191-275d52cc520e.png", rarity: 'rare', collected: false },
    { id: 10, name: "Zidane", image: "/lovable-uploads/366a2e5c-a8bb-4ad3-93cd-79ad1a85b72f.png", rarity: 'epic', collected: false },
    { id: 11, name: "Roberto Carlos", image: "/lovable-uploads/48f299fc-e84b-45a2-94c9-a2654f4dffa6.png", rarity: 'rare', collected: false },
    { id: 12, name: "Cafu", image: "/lovable-uploads/5d66beca-ee47-4a4e-a404-dc84aa62883f.png", rarity: 'rare', collected: true }
  ]);

  const collectedStickers = stickers.filter(sticker => sticker.collected).length;
  const totalStickers = stickers.length;
  const completionPercentage = Math.round((collectedStickers / totalStickers) * 100);

  // Carregar álbuns do localStorage na inicialização
  useEffect(() => {
    const savedAlbums = localStorage.getItem('user-albums');
    if (savedAlbums) {
      setAlbums(JSON.parse(savedAlbums));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('user-albums', JSON.stringify(albums));
  }, [albums]);

  const addAlbum = (albumData: Omit<Album, 'id' | 'createdAt'>) => {
    const newAlbum: Album = {
      ...albumData,
      id: crypto.randomUUID(),
      createdAt: new Date().toISOString(),
    };
    setAlbums(prev => [...prev, newAlbum]);
  };

  const deleteAlbum = (id: string) => {
    setAlbums(prev => prev.filter(album => album.id !== id));
  };

  return (
    <AlbumContext.Provider value={{ 
      albums, 
      stickers,
      collectedStickers,
      totalStickers,
      completionPercentage,
      addAlbum, 
      deleteAlbum 
    }}>
      {children}
    </AlbumContext.Provider>
  );
};
