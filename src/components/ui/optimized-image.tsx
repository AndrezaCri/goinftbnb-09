
import React, { useState, useCallback } from 'react';
import { cn } from '@/lib/utils';

interface OptimizedImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
  width: number;
  height: number;
  quality?: number;
  priority?: boolean;
  placeholder?: string;
  responsive?: boolean;
}

export const OptimizedImage: React.FC<OptimizedImageProps> = ({
  src,
  alt,
  width,
  height,
  quality = 75,
  priority = false,
  placeholder = "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjQwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjMjIyIi8+PC9zdmc+",
  responsive = true,
  className,
  ...props
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [currentSrc, setCurrentSrc] = useState(src);

  // Simplify Unsplash URLs - just add basic size parameters
  const createSimplifiedSrc = useCallback((originalSrc: string) => {
    if (originalSrc.includes('unsplash.com')) {
      // Use simpler parameters for Unsplash
      const baseUrl = originalSrc.split('?')[0]; // Remove existing parameters
      return `${baseUrl}?w=${width}&h=${height}&fit=crop&auto=format`;
    }
    return originalSrc;
  }, [width, height]);

  // Fallback images for when Unsplash fails
  const fallbackImages = [
    `https://picsum.photos/${width}/${height}?random=1`,
    `https://via.placeholder.com/${width}x${height}/333333/FFEB3B?text=Player`,
    "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTUwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjMzMzIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZpbGw9IiNGRkVCM0IiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGR5PSIwLjNlbSIgZm9udC1zaXplPSIxMiI+UGxheWVyPC90ZXh0Pjwvc3ZnPg=="
  ];

  const [fallbackIndex, setFallbackIndex] = useState(-1);

  const handleLoad = useCallback(() => {
    console.log('Image loaded successfully:', currentSrc);
    setIsLoaded(true);
  }, [currentSrc]);

  const handleError = useCallback(() => {
    console.log('Image failed to load:', currentSrc);
    
    if (fallbackIndex < fallbackImages.length - 1) {
      const nextIndex = fallbackIndex + 1;
      setFallbackIndex(nextIndex);
      setCurrentSrc(fallbackImages[nextIndex]);
      console.log('Trying fallback image:', fallbackImages[nextIndex]);
    } else {
      console.log('All fallback images failed');
      setHasError(true);
    }
  }, [currentSrc, fallbackIndex, fallbackImages]);

  // Set the initial simplified source
  React.useEffect(() => {
    if (fallbackIndex === -1) {
      const simplifiedSrc = createSimplifiedSrc(src);
      setCurrentSrc(simplifiedSrc);
      console.log('Using simplified source:', simplifiedSrc);
    }
  }, [src, createSimplifiedSrc, fallbackIndex]);

  return (
    <div 
      className={cn("relative overflow-hidden", className)}
      style={{ width, height, aspectRatio: `${width}/${height}` }}
    >
      {/* Enhanced placeholder with blur effect */}
      {!isLoaded && !hasError && (
        <div
          className="absolute inset-0 bg-gray-800 animate-pulse"
          style={{
            backgroundImage: `url("${placeholder}")`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            filter: 'blur(5px)',
            transform: 'scale(1.1)'
          }}
          aria-hidden="true"
        />
      )}
      
      {/* Simplified image loading */}
      <img
        src={currentSrc}
        alt={alt}
        width={width}
        height={height}
        loading={priority ? "eager" : "lazy"}
        decoding="async"
        onLoad={handleLoad}
        onError={handleError}
        className={cn(
          "w-full h-full object-cover transition-all duration-300 ease-out",
          isLoaded ? "opacity-100 scale-100" : "opacity-0 scale-105",
          hasError && "hidden"
        )}
        style={{
          backfaceVisibility: 'hidden',
          transform: 'translateZ(0)'
        }}
        {...props}
      />
      
      {/* Enhanced error fallback */}
      {hasError && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-800 text-gray-400">
          <div className="text-center">
            <div className="text-2xl mb-2">⚠</div>
            <div className="text-xs">Image failed</div>
          </div>
        </div>
      )}
    </div>
  );
};
