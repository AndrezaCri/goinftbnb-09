
import React, { Suspense, lazy, memo } from 'react';
import { LucideProps } from 'lucide-react';

interface IconLazyProps extends Omit<LucideProps, 'ref'> {
  name: string;
  fallback?: React.ReactNode;
}

// Cache para ícones carregados
const iconCache = new Map<string, React.ComponentType<LucideProps>>();

// Componente de fallback ultra-leve
const IconFallback = memo(({ size = 16 }: { size?: number }) => (
  <div 
    className="inline-block bg-gray-600 rounded animate-pulse" 
    style={{ width: size, height: size }}
  />
));

export const IconLazy: React.FC<IconLazyProps> = memo(({ 
  name, 
  fallback = <IconFallback />, 
  size = 16,
  ...props 
}) => {
  // Verificar cache primeiro
  const cachedIcon = iconCache.get(name);
  
  if (cachedIcon) {
    const IconComponent = cachedIcon;
    return <IconComponent size={size} {...props} />;
  }

  // Import dinâmico otimizado
  const IconComponent = lazy(async () => {
    try {
      const module = await import('lucide-react');
      const Icon = (module as any)[name];
      
      if (Icon) {
        iconCache.set(name, Icon);
        return { default: Icon };
      }
      
      // Fallback para ícone básico
      iconCache.set(name, module.Circle);
      return { default: module.Circle };
    } catch {
      const module = await import('lucide-react');
      iconCache.set(name, module.Circle);
      return { default: module.Circle };
    }
  });

  return (
    <Suspense fallback={typeof fallback === 'function' ? fallback({ size }) : fallback}>
      <IconComponent size={size} {...props} />
    </Suspense>
  );
});

IconLazy.displayName = 'IconLazy';
