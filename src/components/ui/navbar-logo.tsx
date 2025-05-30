
import React from 'react';
import { UltraOptimizedImage } from './ultra-optimized-image';

interface NavbarLogoProps {
  className?: string;
}

export const NavbarLogo: React.FC<NavbarLogoProps> = ({ className }) => {
  return (
    <UltraOptimizedImage
      src="/lovable-uploads/48f299fc-e84b-45a2-94c9-a2654f4dffa6.png"
      alt="GoINFT Logo"
      width={80}
      height={80}
      priority={true}
      className={className}
      quality={90}
      sizes="80px"
    />
  );
};
