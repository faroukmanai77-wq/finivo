export type BookCategory = 'finance-personnelle' | 'investissement' | 'liberte-financiere' | 'business' | 'mindset';
export type BookLevel = 'beginner' | 'intermediate' | 'advanced';
export type BookLanguage = 'FR' | 'EN';

export interface Book {
  id: string;
  slug: string;
  title: string;
  author: string;
  coverImageUrl: string | null;
  category: BookCategory;
  subCategories: string[];
  level: BookLevel;
  language: BookLanguage;
  shortDescription: string;
  fullDescription: string | null;
  whyReadThisBook: string | null;
  readerProfile: string | null;
  themes: string[];
  quote: string | null;
  affiliateLink: string;
  affiliatePlatform: string;
  rating: number | null;
  isFeatured: boolean;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface BookFilterState {
  search: string;
  categories: BookCategory[];
  levels: BookLevel[];
  languages: BookLanguage[];
  sortBy: 'popularity' | 'beginner' | 'recommended' | 'title';
}

export const categoryLabels: Record<BookCategory, string> = {
  'finance-personnelle': 'Finance personnelle',
  'investissement': 'Investissement',
  'liberte-financiere': 'Liberté financière',
  'business': 'Business',
  'mindset': 'Mindset',
};

export const levelLabels: Record<BookLevel, string> = {
  'beginner': 'Débutant',
  'intermediate': 'Intermédiaire',
  'advanced': 'Avancé',
};

export const languageLabels: Record<BookLanguage, string> = {
  'FR': 'Français',
  'EN': 'Anglais',
};
