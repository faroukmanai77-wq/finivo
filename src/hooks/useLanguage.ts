import { useTranslation } from 'react-i18next';
import { useNavigate, useLocation } from 'react-router-dom';
import { SupportedLanguage, supportedLanguages, defaultLanguage } from '@/i18n/config';

export const useLanguage = () => {
  const { i18n } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();

  const currentLanguage = i18n.language as SupportedLanguage;

  const getLanguageFromPath = (path: string): SupportedLanguage | null => {
    const segments = path.split('/').filter(Boolean);
    const firstSegment = segments[0];
    if (supportedLanguages.includes(firstSegment as SupportedLanguage)) {
      return firstSegment as SupportedLanguage;
    }
    return null;
  };

  const getPathWithoutLanguage = (path: string): string => {
    const segments = path.split('/').filter(Boolean);
    if (supportedLanguages.includes(segments[0] as SupportedLanguage)) {
      segments.shift();
    }
    return '/' + segments.join('/');
  };

  const getLocalizedPath = (path: string, lang?: SupportedLanguage): string => {
    const targetLang = lang || currentLanguage;
    const cleanPath = getPathWithoutLanguage(path);
    return `/${targetLang}${cleanPath}`;
  };

  const switchLanguage = (lang: SupportedLanguage) => {
    if (lang === currentLanguage) return;
    
    i18n.changeLanguage(lang);
    
    const currentPath = location.pathname;
    const newPath = getLocalizedPath(currentPath, lang);
    navigate(newPath + location.search + location.hash, { replace: true });
  };

  const otherLanguage: SupportedLanguage = currentLanguage === 'fr' ? 'en' : 'fr';

  return {
    currentLanguage,
    otherLanguage,
    switchLanguage,
    getLocalizedPath,
    getPathWithoutLanguage,
    getLanguageFromPath,
    supportedLanguages,
    defaultLanguage,
    isEnglish: currentLanguage === 'en',
    isFrench: currentLanguage === 'fr'
  };
};
