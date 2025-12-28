interface LogoFinivoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

export const LogoFinivo = ({ className = '', size = 'md' }: LogoFinivoProps) => {
  const sizeClasses = {
    sm: 'h-8',
    md: 'h-10',
    lg: 'h-12'
  };

  return (
    <svg 
      viewBox="0 0 140 40" 
      className={`${sizeClasses[size]} w-auto ${className}`}
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      aria-label="Finivo - Comparateur de cartes de crédit"
    >
      {/* Blue checkmark icon */}
      <circle cx="8" cy="8" r="4" fill="hsl(var(--primary))" />
      <rect 
        x="6" 
        y="12" 
        width="8" 
        height="24" 
        rx="4" 
        fill="hsl(var(--primary))" 
      />
      <rect 
        x="12" 
        y="8" 
        width="8" 
        height="16" 
        rx="4" 
        fill="hsl(var(--primary))" 
        transform="rotate(35 16 16)"
      />
      
      {/* Finivo text */}
      <text 
        x="36" 
        y="28" 
        fontFamily="Plus Jakarta Sans, Inter, system-ui, sans-serif" 
        fontSize="22" 
        fontWeight="600" 
        fill="currentColor"
      >
        Finivo
      </text>
    </svg>
  );
};
