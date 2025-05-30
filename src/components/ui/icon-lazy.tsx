
import React, { Suspense, lazy, memo } from 'react';
import { LucideProps } from 'lucide-react';

interface LazyIconProps extends Omit<LucideProps, 'ref'> {
  name: string;
}

// Create a cache for loaded icons to avoid re-importing
const iconCache = new Map<string, React.ComponentType<LucideProps>>();

// Componente de fallback ultra-leve
const IconFallback = memo(({ size = 16 }: { size?: number }) => (
  <div 
    className="inline-block bg-gray-600 rounded animate-pulse" 
    style={{ width: size, height: size }}
  />
));

export const LazyIcon: React.FC<LazyIconProps> = memo(({ name, ...props }) => {
  // Check cache first
  const cachedIcon = iconCache.get(name);
  
  if (cachedIcon) {
    const IconComponent = cachedIcon;
    return <IconComponent {...props} />;
  }

  // Dynamically import the icon with proper typing
  const IconComponent = lazy(async () => {
    try {
      const module = await import('lucide-react');
      const Icon = (module as any)[name] as React.ComponentType<LucideProps>;
      
      if (Icon) {
        iconCache.set(name, Icon);
        return { default: Icon };
      }
      
      // Fallback to a basic icon if not found
      const fallbackIcon = module.Circle as React.ComponentType<LucideProps>;
      iconCache.set(name, fallbackIcon);
      return { default: fallbackIcon };
    } catch {
      const module = await import('lucide-react');
      const fallbackIcon = module.Circle as React.ComponentType<LucideProps>;
      iconCache.set(name, fallbackIcon);
      return { default: fallbackIcon };
    }
  });

  // Convert size para number se for string
  const iconSize = typeof props.size === 'string' ? parseInt(props.size) || 24 : props.size || 24;
  const defaultFallback = <IconFallback size={iconSize} />;

  return (
    <Suspense fallback={defaultFallback}>
      <IconComponent {...props} />
    </Suspense>
  );
});

LazyIcon.displayName = 'LazyIcon';
