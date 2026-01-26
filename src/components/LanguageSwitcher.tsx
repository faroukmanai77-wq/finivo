import { Globe } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/hooks/useLanguage';

export const LanguageSwitcher = () => {
  const { currentLanguage, switchLanguage, otherLanguage } = useLanguage();

  const languageLabels = {
    fr: 'FR',
    en: 'EN'
  };

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={() => switchLanguage(otherLanguage)}
      className="gap-1.5 text-muted-foreground hover:text-foreground"
      aria-label={`Switch to ${otherLanguage === 'fr' ? 'French' : 'English'}`}
    >
      <Globe className="h-4 w-4" />
      <span className="font-medium">{languageLabels[otherLanguage]}</span>
    </Button>
  );
};
