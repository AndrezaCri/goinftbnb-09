
import React from 'react';
import { useAlbums } from '@/contexts/AlbumContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Trash2, Grid2x2, Grid3x3, GridIcon } from 'lucide-react';
import { toast } from 'sonner';

export const UserAlbumsSection = () => {
  const { albums, deleteAlbum } = useAlbums();

  const getGridIcon = (gridType: string) => {
    switch (gridType) {
      case '2x2':
        return <Grid2x2 className="h-4 w-4" />;
      case '3x3':
        return <Grid3x3 className="h-4 w-4" />;
      case '3x4':
        return <GridIcon className="h-4 w-4" />;
      case '4x4':
        return <GridIcon className="h-4 w-4" />;
      default:
        return <GridIcon className="h-4 w-4" />;
    }
  };

  const handleDeleteAlbum = (id: string, title: string) => {
    deleteAlbum(id);
    toast.success(`Album "${title}" deleted successfully`);
  };

  if (albums.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-muted-foreground">You haven't created any albums yet.</p>
        <p className="text-sm text-muted-foreground">Use the Album Lab to create your first album!</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">My Albums</h2>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {albums.map((album) => (
          <Card key={album.id} className="hover:shadow-lg transition-shadow bg-gray-800 border-gray-700">
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div className="space-y-1">
                  <CardTitle className="text-lg text-white">{album.title}</CardTitle>
                  <div className="flex items-center gap-2 text-sm text-gray-400">
                    {getGridIcon(album.gridType)}
                    <span>{album.gridType} Grid</span>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleDeleteAlbum(album.id, album.title)}
                  className="text-red-400 hover:text-red-300 hover:bg-red-400/10"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-300 line-clamp-2">
                {album.description || 'No description'}
              </p>
              <div className="mt-3 flex items-center justify-between text-xs text-gray-400">
                <span>Created {new Date(album.createdAt).toLocaleDateString()}</span>
                <span>{album.stickers.length} stickers</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};
