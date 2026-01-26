import { useTranslation } from 'react-i18next';

/**
 * Utility hook to get translated content from database fields
 * Returns the appropriate field based on current language
 */
export const useTranslatedContent = () => {
  const { i18n } = useTranslation();
  const isEnglish = i18n.language === 'en';

  /**
   * Get translated value - returns English version if available and language is English,
   * otherwise returns the default (French) value
   */
  const getTranslated = <T>(defaultValue: T, englishValue: T | null | undefined): T => {
    if (isEnglish && englishValue !== null && englishValue !== undefined) {
      // For strings, also check if it's not empty
      if (typeof englishValue === 'string' && englishValue.trim() === '') {
        return defaultValue;
      }
      // For arrays, check if it's not empty
      if (Array.isArray(englishValue) && englishValue.length === 0) {
        return defaultValue;
      }
      return englishValue;
    }
    return defaultValue;
  };

  /**
   * Get translated string value
   */
  const t = (defaultValue: string, englishValue: string | null | undefined): string => {
    return getTranslated(defaultValue, englishValue);
  };

  /**
   * Get translated array value
   */
  const tArray = (defaultValue: string[], englishValue: string[] | null | undefined): string[] => {
    return getTranslated(defaultValue, englishValue);
  };

  return {
    isEnglish,
    getTranslated,
    t,
    tArray,
    currentLanguage: i18n.language,
  };
};
