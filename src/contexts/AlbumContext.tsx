
import React, { createContext, useContext, useState, useEffect } from 'react';

export interface Album {
  id: string;
  title: string;
  description: string;
  gridType: string;
  createdAt: string;
  stickers: string[];
}

interface AlbumContextType {
  albums: Album[];
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
    <AlbumContext.Provider value={{ albums, addAlbum, deleteAlbum }}>
      {children}
    </AlbumContext.Provider>
  );
};
