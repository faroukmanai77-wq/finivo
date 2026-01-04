import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Book } from '@/types/book';

const mapDatabaseBookToBook = (dbBook: any): Book => ({
  id: dbBook.id,
  slug: dbBook.slug,
  title: dbBook.title,
  author: dbBook.author,
  coverImageUrl: dbBook.cover_image_url,
  category: dbBook.category,
  subCategories: dbBook.sub_categories || [],
  level: dbBook.level,
  language: dbBook.language,
  shortDescription: dbBook.short_description,
  fullDescription: dbBook.full_description,
  whyReadThisBook: dbBook.why_read_this_book,
  readerProfile: dbBook.reader_profile,
  themes: dbBook.themes || [],
  quote: dbBook.quote,
  affiliateLink: dbBook.affiliate_link,
  affiliatePlatform: dbBook.affiliate_platform,
  rating: dbBook.rating,
  isFeatured: dbBook.is_featured,
  isActive: dbBook.is_active,
  createdAt: dbBook.created_at,
  updatedAt: dbBook.updated_at,
});

export const useBooks = () => {
  return useQuery({
    queryKey: ['books'],
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
  return useQuery({
    queryKey: ['book', slug],
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
