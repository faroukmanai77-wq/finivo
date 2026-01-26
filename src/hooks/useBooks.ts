import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Book, BookCategory } from '@/types/book';
import { useTranslatedContent } from './useTranslatedContent';

export const useBooks = () => {
  const { t, tArray, currentLanguage } = useTranslatedContent();

  const mapDatabaseBookToBook = (dbBook: any): Book => ({
    id: dbBook.id,
    slug: dbBook.slug,
    title: t(dbBook.title, dbBook.title_en),
    author: dbBook.author,
    coverImageUrl: dbBook.cover_image_url,
    category: t(dbBook.category, dbBook.category_en) as BookCategory,
    subCategories: tArray(dbBook.sub_categories || [], dbBook.sub_categories_en),
    level: dbBook.level,
    language: dbBook.language,
    shortDescription: t(dbBook.short_description, dbBook.short_description_en),
    fullDescription: dbBook.full_description ? t(dbBook.full_description, dbBook.full_description_en) : null,
    whyReadThisBook: dbBook.why_read_this_book ? t(dbBook.why_read_this_book, dbBook.why_read_this_book_en) : null,
    readerProfile: dbBook.reader_profile ? t(dbBook.reader_profile, dbBook.reader_profile_en) : null,
    themes: tArray(dbBook.themes || [], dbBook.themes_en),
    quote: dbBook.quote ? t(dbBook.quote, dbBook.quote_en) : null,
    affiliateLink: dbBook.affiliate_link,
    affiliatePlatform: dbBook.affiliate_platform,
    rating: dbBook.rating,
    isFeatured: dbBook.is_featured,
    isActive: dbBook.is_active,
    createdAt: dbBook.created_at,
    updatedAt: dbBook.updated_at,
  });

  return useQuery({
    queryKey: ['books', currentLanguage],
    queryFn: async (): Promise<Book[]> => {
      const { data, error } = await supabase
        .from('books')
        .select('*')
        .order('is_featured', { ascending: false })
        .order('rating', { ascending: false });

      if (error) throw error;
      return (data || []).map(mapDatabaseBookToBook);
    },
  });
};

export const useBook = (slug: string) => {
  const { t, tArray, currentLanguage } = useTranslatedContent();

  const mapDatabaseBookToBook = (dbBook: any): Book => ({
    id: dbBook.id,
    slug: dbBook.slug,
    title: t(dbBook.title, dbBook.title_en),
    author: dbBook.author,
    coverImageUrl: dbBook.cover_image_url,
    category: t(dbBook.category, dbBook.category_en) as BookCategory,
    subCategories: tArray(dbBook.sub_categories || [], dbBook.sub_categories_en),
    level: dbBook.level,
    language: dbBook.language,
    shortDescription: t(dbBook.short_description, dbBook.short_description_en),
    fullDescription: dbBook.full_description ? t(dbBook.full_description, dbBook.full_description_en) : null,
    whyReadThisBook: dbBook.why_read_this_book ? t(dbBook.why_read_this_book, dbBook.why_read_this_book_en) : null,
    readerProfile: dbBook.reader_profile ? t(dbBook.reader_profile, dbBook.reader_profile_en) : null,
    themes: tArray(dbBook.themes || [], dbBook.themes_en),
    quote: dbBook.quote ? t(dbBook.quote, dbBook.quote_en) : null,
    affiliateLink: dbBook.affiliate_link,
    affiliatePlatform: dbBook.affiliate_platform,
    rating: dbBook.rating,
    isFeatured: dbBook.is_featured,
    isActive: dbBook.is_active,
    createdAt: dbBook.created_at,
    updatedAt: dbBook.updated_at,
  });

  return useQuery({
    queryKey: ['book', slug, currentLanguage],
    queryFn: async (): Promise<Book | null> => {
      const { data, error } = await supabase
        .from('books')
        .select('*')
        .eq('slug', slug)
        .maybeSingle();

      if (error) throw error;
      return data ? mapDatabaseBookToBook(data) : null;
    },
    enabled: !!slug,
  });
};
