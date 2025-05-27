
import React, { useState } from 'react';
import { cn } from '@/lib/utils';

interface OptimizedImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
  width: number;
  height: number;
  quality?: number;
  priority?: boolean;
  placeholder?: string;
}

export const OptimizedImage: React.FC<OptimizedImageProps> = ({
  src,
  alt,
  width,
  height,
  quality = 60, // Reduced default quality for better performance
  priority = false,
  placeholder = "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjQwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjMjIyIi8+PC9zdmc+",
  className,
  ...props
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);

  // Create WebP version with aggressive optimization
  const createOptimizedSrc = (originalSrc: string) => {
    if (originalSrc.includes('unsplash.com')) {
      return `${originalSrc}&w=${width}&h=${height}&q=${quality}&fm=webp&fit=crop&auto=format`;
    }
    return originalSrc;
  };

  const optimizedSrc = createOptimizedSrc(src);

  const handleLoad = () => {
    setIsLoaded(true);
  };

  const handleError = () => {
    setHasError(true);
  };

  return (
    <div 
      className={cn("relative overflow-hidden", className)}
      style={{ width, height }}
    >
      {/* Ultra-light placeholder */}
      {!isLoaded && !hasError && (
        <div
          className="absolute inset-0 bg-gray-800 animate-pulse"
          style={{
            backgroundImage: `url("${placeholder}")`,
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}
          aria-hidden="true"
        />
      )}
      
      {/* Main optimized image with WebP support */}
      <picture>
        <source 
          srcSet={optimizedSrc} 
          type="image/webp"
        />
        <img
          src={optimizedSrc}
          alt={alt}
          width={width}
          height={height}
          loading={priority ? "eager" : "lazy"}
          decoding="async"
          fetchPriority={priority ? "high" : "low"}
          onLoad={handleLoad}
          onError={handleError}
          className={cn(
            "w-full h-full object-cover transition-opacity duration-200",
            isLoaded ? "opacity-100" : "opacity-0",
            hasError && "hidden"
          )}
          {...props}
        />
      </picture>
      
      {/* Minimal error fallback */}
      {hasError && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-800 text-gray-400">
          <span className="text-xs">⚠</span>
        </div>
      )}
    </div>
  );
};
