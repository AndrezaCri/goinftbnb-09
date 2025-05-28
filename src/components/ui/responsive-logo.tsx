
import React, { useState } from 'react';
import { cn } from '@/lib/utils';

interface ResponsiveLogoProps {
  src: string;
  alt: string;
  className?: string;
}

export const ResponsiveLogo: React.FC<ResponsiveLogoProps> = ({
  src,
  alt,
  className
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);

  const handleLoad = () => {
    setIsLoaded(true);
  };

  const handleError = () => {
    setHasError(true);
  };

  return (
    <div className={cn("relative", className)}>
      {/* Ultra-light placeholder for logo */}
      {!isLoaded && !hasError && (
        <div
          className="navbar-logo bg-gray-800 animate-pulse rounded"
          aria-hidden="true"
        />
      )}
      
      {/* Responsive logo with optimized loading */}
      <img
        src={src}
        alt={alt}
        width={80}
        height={80}
        loading="eager"
        decoding="sync"
        fetchPriority="high"
        onLoad={handleLoad}
        onError={handleError}
        className={cn(
          "navbar-logo transition-opacity duration-150",
          isLoaded ? "opacity-100" : "opacity-0",
          hasError && "hidden"
        )}
        style={{
          aspectRatio: '1/1',
          imageRendering: 'crisp-edges'
        }}
      />
      
      {/* Minimal error fallback */}
      {hasError && (
        <div className="navbar-logo flex items-center justify-center bg-gray-800 text-white text-xs rounded">
          Logo
        </div>
      )}
    </div>
  );
};
