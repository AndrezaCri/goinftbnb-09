
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from './useAuth';
import { toast } from 'sonner';

export interface DatabaseAlbum {
  id: string;
  title: string;
  description: string | null;
  grid_type: string;
  created_at: string;
  user_id: string;
}

export interface DatabaseSticker {
  id: string;
  album_id: string;
  image_url: string;
  prompt: string | null;
  category: string | null;
  position: number | null;
  created_at: string;
}

export const useSupabaseAlbums = () => {
  const { user } = useAuth();
  const [albums, setAlbums] = useState<DatabaseAlbum[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchAlbums = async () => {
    if (!user) return;
    
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('albums')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setAlbums(data || []);
    } catch (error: any) {
      toast.error('Error fetching albums: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  const createAlbum = async (albumData: {
    title: string;
    description: string;
    grid_type: string;
  }) => {
    if (!user) {
      toast.error('You must be logged in to create albums');
      return null;
    }

    try {
      const { data, error } = await supabase
        .from('albums')
        .insert({
          title: albumData.title,
          description: albumData.description,
          grid_type: albumData.grid_type,
          user_id: user.id
        })
        .select()
        .single();

      if (error) throw error;
      
      await fetchAlbums(); // Refresh albums list
      return data;
    } catch (error: any) {
      toast.error('Error creating album: ' + error.message);
      return null;
    }
  };

  const deleteAlbum = async (albumId: string) => {
    if (!user) return false;

    try {
      const { error } = await supabase
        .from('albums')
        .delete()
        .eq('id', albumId);

      if (error) throw error;
      
      await fetchAlbums(); // Refresh albums list
      return true;
    } catch (error: any) {
      toast.error('Error deleting album: ' + error.message);
      return false;
    }
  };

  const addStickerToAlbum = async (albumId: string, imageUrl: string, prompt?: string) => {
    if (!user) return null;

    try {
      const { data, error } = await supabase
        .from('stickers')
        .insert({
          album_id: albumId,
          image_url: imageUrl,
          prompt: prompt || null,
          category: 'sports'
        })
        .select()
        .single();

      if (error) throw error;
      return data;
    } catch (error: any) {
      toast.error('Error adding sticker: ' + error.message);
      return null;
    }
  };

  useEffect(() => {
    if (user) {
      fetchAlbums();
    }
  }, [user]);

  return {
    albums,
    loading,
    createAlbum,
    deleteAlbum,
    addStickerToAlbum,
    refreshAlbums: fetchAlbums
  };
};
