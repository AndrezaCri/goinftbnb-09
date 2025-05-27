
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
  quality = 75, // Increased default quality for desktop
  priority = false,
  placeholder = "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjQwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjMjIyIi8+PC9zdmc+",
  responsive = true,
  className,
  ...props
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);

  // Create optimized src with multiple formats and sizes
  const createOptimizedSrc = useCallback((originalSrc: string) => {
    if (originalSrc.includes('unsplash.com')) {
      const baseParams = `w=${width}&h=${height}&q=${quality}&fit=crop&auto=format`;
      return {
        webp: `${originalSrc}&${baseParams}&fm=webp`,
        avif: `${originalSrc}&${baseParams}&fm=avif`,
        fallback: `${originalSrc}&${baseParams}&fm=jpg`
      };
    }
    return {
      webp: originalSrc,
      avif: originalSrc,
      fallback: originalSrc
    };
  }, [width, height, quality]);

  const optimizedSrcs = createOptimizedSrc(src);

  const handleLoad = useCallback(() => {
    setIsLoaded(true);
  }, []);

  const handleError = useCallback(() => {
    setHasError(true);
  }, []);

  // Create responsive srcSet for different screen densities
  const createSrcSet = useCallback((baseSrc: string) => {
    if (!responsive) return undefined;
    return `${baseSrc} 1x, ${baseSrc.replace(`w=${width}`, `w=${width * 2}`)} 2x`;
  }, [width, responsive]);

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
      
      {/* Advanced picture element with multiple formats */}
      <picture>
        <source 
          srcSet={createSrcSet(optimizedSrcs.avif)}
          type="image/avif"
        />
        <source 
          srcSet={createSrcSet(optimizedSrcs.webp)}
          type="image/webp"
        />
        <img
          src={optimizedSrcs.fallback}
          srcSet={createSrcSet(optimizedSrcs.fallback)}
          alt={alt}
          width={width}
          height={height}
          loading={priority ? "eager" : "lazy"}
          decoding="async"
          fetchPriority={priority ? "high" : "low"}
          onLoad={handleLoad}
          onError={handleError}
          className={cn(
            "w-full h-full object-cover transition-all duration-300 ease-out",
            isLoaded ? "opacity-100 scale-100" : "opacity-0 scale-105",
            hasError && "hidden"
          )}
          style={{
            imageRendering: quality > 80 ? 'crisp-edges' : 'auto',
            backfaceVisibility: 'hidden',
            transform: 'translateZ(0)'
          }}
          {...props}
        />
      </picture>
      
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
