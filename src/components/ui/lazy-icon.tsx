
import React, { Suspense, lazy, ComponentType } from 'react';
import type { LucideProps } from 'lucide-react';

interface LazyIconProps extends LucideProps {
  name: string;
}

const iconCache = new Map<string, ComponentType<LucideProps>>();

const LazyIcon: React.FC<LazyIconProps> = ({ name, ...props }) => {
  // Get or create the lazy component
  if (!iconCache.has(name)) {
    const IconComponent = lazy(() =>
      import('lucide-react').then((module) => {
        const Component = (module as any)[name];
        if (!Component) {
          console.warn(`Icon "${name}" not found in lucide-react`);
          // Return a fallback component
          return { default: (module as any).HelpCircle };
        }
        return { default: Component };
      })
    );
    iconCache.set(name, IconComponent);
  }

  const IconComponent = iconCache.get(name)!;

  return (
    <Suspense fallback={<div className="w-4 h-4 bg-gray-300 rounded animate-pulse" />}>
      <IconComponent {...props} />
    </Suspense>
  );
};

export default LazyIcon;
