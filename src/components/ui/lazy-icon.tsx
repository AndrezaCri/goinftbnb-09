
import React, { Suspense, lazy } from 'react';
import { LucideProps } from 'lucide-react';

interface LazyIconProps extends Omit<LucideProps, 'ref'> {
  name: string;
}

// Create a cache for loaded icons to avoid re-importing
const iconCache = new Map<string, React.ComponentType<LucideProps>>();

export const LazyIcon: React.FC<LazyIconProps> = ({ name, ...props }) => {
  // Check cache first
  const cachedIcon = iconCache.get(name);
  
  if (cachedIcon) {
    const IconComponent = cachedIcon;
    return <IconComponent {...props} />;
  }

  // Dynamically import the icon
  const IconComponent = lazy(async () => {
    try {
      const module = await import('lucide-react');
      const Icon = (module as any)[name];
      
      if (Icon) {
        iconCache.set(name, Icon);
        return { default: Icon };
      }
      
      // Fallback to a basic icon if not found
      return { default: module.Circle };
    } catch {
      const module = await import('lucide-react');
      return { default: module.Circle };
    }
  });

  return (
    <Suspense fallback={<div className="w-4 h-4 bg-gray-600 rounded animate-pulse" />}>
      <IconComponent {...props} />
    </Suspense>
  );
};
