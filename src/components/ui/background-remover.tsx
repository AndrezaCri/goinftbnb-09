
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { removeBackground, loadImage } from '@/utils/backgroundRemoval';
import { toast } from 'sonner';
import { Scissors, Loader2 } from 'lucide-react';

interface BackgroundRemoverProps {
  imageUrl: string;
  onProcessed: (processedImageUrl: string) => void;
}

export const BackgroundRemover: React.FC<BackgroundRemoverProps> = ({
  imageUrl,
  onProcessed
}) => {
  const [isProcessing, setIsProcessing] = useState(false);

  const handleRemoveBackground = async () => {
    setIsProcessing(true);
    try {
      toast.info('Iniciando remoção do fundo...');
      
      // Fetch the image
      const response = await fetch(imageUrl);
      const blob = await response.blob();
      
      // Load as image element
      const imageElement = await loadImage(blob);
      
      // Remove background
      const processedBlob = await removeBackground(imageElement);
      
      // Create object URL for the processed image
      const processedImageUrl = URL.createObjectURL(processedBlob);
      
      onProcessed(processedImageUrl);
      toast.success('Fundo removido com sucesso!');
    } catch (error) {
      console.error('Error removing background:', error);
      toast.error('Erro ao remover o fundo da imagem');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <Button
      onClick={handleRemoveBackground}
      disabled={isProcessing}
      variant="outline"
      size="sm"
      className="absolute top-2 right-2 bg-black/70 hover:bg-black/90 text-white border-gray-600"
    >
      {isProcessing ? (
        <>
          <Loader2 className="w-4 h-4 mr-2 animate-spin" />
          Processando...
        </>
      ) : (
        <>
          <Scissors className="w-4 h-4 mr-2" />
          Remover Fundo
        </>
      )}
    </Button>
  );
};
