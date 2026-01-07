import { cn } from '@/lib/utils';

interface FinivoLogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'default' | 'light' | 'dark';
}

export const FinivoLogo = ({ className, size = 'md', variant = 'default' }: FinivoLogoProps) => {
  const sizes = {
    sm: 'w-8 h-8',
    md: 'w-10 h-10',
    lg: 'w-12 h-12'
  };

  const colors = {
    default: {
      bg: 'hsl(var(--primary))',
      icon: 'hsl(var(--primary-foreground))',
      accent: 'hsl(var(--accent))'
    },
    light: {
      bg: 'hsl(var(--primary))',
      icon: '#ffffff',
      accent: 'hsl(var(--warning))'
    },
    dark: {
      bg: 'hsl(var(--primary))',
      icon: '#ffffff',
      accent: 'hsl(var(--accent))'
    }
  };

  const color = colors[variant];

  return (
    <svg 
      viewBox="0 0 48 48" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      className={cn(sizes[size], className)}
    >
      {/* Background rounded square */}
      <rect 
        x="2" 
        y="2" 
        width="44" 
        height="44" 
        rx="12" 
        fill={color.bg}
      />
      
      {/* Stylized "F" with growth chart motif */}
      <path 
        d="M14 34V14H28V18H18V22H26V26H18V34H14Z" 
        fill={color.icon}
      />
      
      {/* Growth arrow / chart element */}
      <path 
        d="M26 30L30 24L34 28L38 18" 
        stroke={color.accent}
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      
      {/* Dot at the end of the growth line */}
      <circle 
        cx="38" 
        cy="18" 
        r="3" 
        fill={color.accent}
      />
      
      {/* Small decorative sparkle */}
      <path 
        d="M32 12L33 14L35 15L33 16L32 18L31 16L29 15L31 14L32 12Z" 
        fill={color.icon}
        opacity="0.8"
      />
    </svg>
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
    <div className={cn('flex items-center gap-2.5', className)}>
      <FinivoLogo size={size} variant={variant} />
      <span className={cn('font-extrabold tracking-tight', textSizes[size], textColors[variant])}>
        Finivo
      </span>
    </div>
  );
};
