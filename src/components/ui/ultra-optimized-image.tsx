
import React, { useState, useCallback, useRef, useEffect } from 'react';
import { cn } from '@/lib/utils';

interface UltraOptimizedImageProps {
  src: string;
  alt: string;
  width: number;
  height: number;
  priority?: boolean;
  className?: string;
  quality?: number;
  sizes?: string;
}

export const UltraOptimizedImage: React.FC<UltraOptimizedImageProps> = ({
  src,
  alt,
  width,
  height,
  priority = false,
  className,
  quality = 75,
  sizes = '100vw'
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [currentSrc, setCurrentSrc] = useState<string>('');
  const imgRef = useRef<HTMLImageElement>(null);
  const [isInView, setIsInView] = useState(priority);

  // Generate optimized source URLs with multiple formats
  const generateSources = useCallback((originalSrc: string) => {
    const isUnsplash = originalSrc.includes('unsplash.com') || originalSrc.includes('picsum.photos');
    
    if (isUnsplash) {
      const baseUrl = originalSrc.split('?')[0];
      const webpUrl = `${baseUrl}?w=${width}&h=${height}&fit=crop&auto=format&fm=webp&q=${quality}`;
      const jpegUrl = `${baseUrl}?w=${width}&h=${height}&fit=crop&auto=format&fm=jpg&q=${quality}`;
      return { webp: webpUrl, fallback: jpegUrl };
    }
    
    // For local images, return as-is (would need server-side processing for format conversion)
    return { webp: originalSrc, fallback: originalSrc };
  }, [width, height, quality]);

  // Intersection Observer for lazy loading
  useEffect(() => {
    if (priority || !imgRef.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      { rootMargin: '50px' }
    );

    observer.observe(imgRef.current);
    return () => observer.disconnect();
  }, [priority]);

  // Set source when in view
  useEffect(() => {
    if (isInView && !currentSrc) {
      const sources = generateSources(src);
      setCurrentSrc(sources.fallback); // Start with fallback for compatibility
    }
  }, [isInView, src, currentSrc, generateSources]);

  const handleLoad = useCallback(() => {
    setIsLoaded(true);
  }, []);

  const handleError = useCallback(() => {
    if (!hasError) {
      setHasError(true);
      // Try with a simple placeholder
      setCurrentSrc(`data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='${width}' height='${height}'%3E%3Crect width='100%25' height='100%25' fill='%23333'/%3E%3C/svg%3E`);
    }
  }, [hasError, width, height]);

  return (
    <div 
      ref={imgRef}
      className={cn("relative overflow-hidden bg-gray-800", className)}
      style={{ aspectRatio: `${width}/${height}` }}
    >
      {/* Ultra-light placeholder */}
      {!isLoaded && (
        <div 
          className="absolute inset-0 bg-gray-800 animate-pulse"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='${width}' height='${height}'%3E%3Crect width='100%25' height='100%25' fill='%23222'/%3E%3C/svg%3E")`,
            backgroundSize: 'cover'
          }}
        />
      )}
      
      {/* Optimized image with WebP support */}
      {(isInView || priority) && currentSrc && (
        <picture>
          {src.includes('unsplash.com') || src.includes('picsum.photos') ? (
            <source 
              srcSet={generateSources(src).webp} 
              type="image/webp"
            />
          ) : null}
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
              "w-full h-full object-cover transition-opacity duration-200",
              isLoaded ? "opacity-100" : "opacity-0"
            )}
            sizes={sizes}
            style={{
              contentVisibility: 'auto',
              containIntrinsicSize: `${width}px ${height}px`
            }}
          />
        </picture>
      )}
    </div>
  );
};
