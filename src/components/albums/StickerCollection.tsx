
import React from 'react';
import { useAlbums } from '@/contexts/AlbumContext';
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';

export const StickerCollection = () => {
  const { stickers, collectedStickers, totalStickers, completionPercentage, collectSticker } = useAlbums();

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case 'common': return 'bg-gray-500';
      case 'rare': return 'bg-blue-500';
      case 'epic': return 'bg-purple-500';
      case 'legendary': return 'bg-yellow-500';
      default: return 'bg-gray-500';
    }
  };

  const handleCollectSticker = (stickerId: number) => {
    collectSticker(stickerId);
  };

  return (
    <div className="space-y-6">
      {/* Progress Section */}
      <div className="bg-[#1a1a1a] rounded-lg p-6 border border-[#333]">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold" style={{ color: '#FFEB3B' }}>
            My Soccer Stars Collection
          </h2>
          <Badge variant="secondary" className="text-lg px-4 py-2">
            {collectedStickers}/{totalStickers} Figurinhas
          </Badge>
        </div>
        
        <div className="space-y-2">
          <div className="flex justify-between text-sm text-gray-400">
            <span>Progresso da Coleção</span>
            <span>{completionPercentage}% Completo</span>
          </div>
          <Progress value={completionPercentage} className="h-3" />
        </div>
      </div>

      {/* Stickers Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {stickers.map((sticker) => (
          <Card 
            key={sticker.id} 
            className={`transition-all duration-300 ${
              sticker.collected 
                ? 'bg-[#1a1a1a] border-[#333] hover:border-[#FFEB3B]/50' 
                : 'bg-[#0a0a0a] border-[#222] opacity-60 hover:opacity-80 cursor-pointer'
            }`}
            onClick={() => !sticker.collected && handleCollectSticker(sticker.id)}
          >
            <CardContent className="p-4">
              {sticker.collected ? (
                <div className="space-y-3">
                  <div className="aspect-square rounded-lg overflow-hidden bg-[#333]">
                    <img 
                      src={sticker.image} 
                      alt={sticker.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="space-y-2">
                    <h3 className="font-semibold text-sm text-white">{sticker.name}</h3>
                    <Badge 
                      className={`${getRarityColor(sticker.rarity)} text-white text-xs`}
                    >
                      {sticker.rarity.toUpperCase()}
                    </Badge>
                  </div>
                </div>
              ) : (
                <div className="space-y-3">
                  <div className="aspect-square rounded-lg bg-[#222] flex items-center justify-center relative group">
                    <div className="text-4xl text-gray-600">?</div>
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <Button 
                        size="sm" 
                        className="bg-[#FFEB3B] text-black hover:bg-[#FFEB3B]/90"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleCollectSticker(sticker.id);
                        }}
                      >
                        <Plus className="w-4 h-4 mr-1" />
                        Stick
                      </Button>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <h3 className="font-semibold text-sm text-gray-500">???</h3>
                    <Badge variant="outline" className="text-xs border-gray-600 text-gray-500">
                      NÃO COLETADA
                    </Badge>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};
