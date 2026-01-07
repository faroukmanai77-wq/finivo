import { cn } from '@/lib/utils';
import logoSvg from '@/assets/logo.svg';

interface FinivoLogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'default' | 'light' | 'dark';
}

export const FinivoLogo = ({ className, size = 'md' }: FinivoLogoProps) => {
  const sizes = {
    sm: 'w-10 h-10',
    md: 'w-12 h-12',
    lg: 'w-14 h-14'
  };

  return (
    <img 
      src={logoSvg} 
      alt="Finivo Logo" 
      className={cn(sizes[size], className)}
    />
  );
};

export const FinivoLogoWithText = ({ 
  className, 
  size = 'md',
  variant = 'default' 
}: FinivoLogoProps) => {
  const textSizes = {
    sm: 'text-lg',
    md: 'text-xl',
    lg: 'text-2xl'
  };

  const textColors = {
    default: 'text-foreground',
    light: 'text-background',
    dark: 'text-foreground'
  };

  return (
    <div className={cn('flex items-center gap-1', className)}>
      <FinivoLogo size={size} />
      <span className={cn('font-extrabold tracking-tight', textSizes[size], textColors[variant])}>
        Finivo
      </span>
    </div>
  );
};
