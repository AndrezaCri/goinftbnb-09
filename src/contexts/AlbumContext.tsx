
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
  
  // Sistema de figurinhas Soccer Stars - 12 total, 3 coletadas (25%)
  const [stickers] = useState<Sticker[]>([
    { id: 1, name: "Pelé", image: "/lovable-uploads/0983abca-88df-4210-8a62-e53e8eba5231.png", rarity: 'legendary', collected: true },
    { id: 2, name: "Maradona", image: "/lovable-uploads/158597eb-8794-4eaa-81bf-c398b03162b1.png", rarity: 'legendary', collected: true },
    { id: 3, name: "Ronaldinho", image: "/lovable-uploads/1b8ffbae-6dd6-42be-8aad-55b2f592e2b6.png", rarity: 'epic', collected: true },
    { id: 4, name: "Messi", image: "/lovable-uploads/22e30fe0-5459-49e4-b297-d2b110aad8e5.png", rarity: 'legendary', collected: false },
    { id: 5, name: "Cristiano Ronaldo", image: "/lovable-uploads/26dc6bd3-e9df-4644-8cec-affbf6c79319.png", rarity: 'legendary', collected: false },
    { id: 6, name: "Neymar", image: "/lovable-uploads/2837a9c3-b272-4196-a96c-3daad0a03103.png", rarity: 'epic', collected: false },
    { id: 7, name: "Ronaldo Fenômeno", image: "/lovable-uploads/335ddb23-10eb-4cfa-b92f-a4032a6bb10d.png", rarity: 'legendary', collected: false },
    { id: 8, name: "Zinedine Zidane", image: "/lovable-uploads/366a2e5c-a8bb-4ad3-93cd-79ad1a85b72f.png", rarity: 'epic', collected: false },
    { id: 9, name: "Kaká", image: "/lovable-uploads/3fbe2d39-07c3-414d-9191-275d52cc520e.png", rarity: 'rare', collected: false },
    { id: 10, name: "Ronaldinho Gaúcho", image: "/lovable-uploads/3ff138cd-7347-4885-a303-e03841fb166c.png", rarity: 'epic', collected: false },
    { id: 11, name: "Roberto Carlos", image: "/lovable-uploads/48f299fc-e84b-45a2-94c9-a2654f4dffa6.png", rarity: 'rare', collected: false },
    { id: 12, name: "Cafu", image: "/lovable-uploads/5d66beca-ee47-4a4e-a404-dc84aa62883f.png", rarity: 'rare', collected: false }
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

  // Salvar álbuns no localStorage quando houver mudanças
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
