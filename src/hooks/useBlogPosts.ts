import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { BlogPost, BlogCategory } from '@/types/blogPost';
import { useTranslatedContent } from './useTranslatedContent';

const mapBlogPost = (post: any, t: (def: string, en: string | null) => string, tArray: (def: string[], en: string[] | null) => string[]): BlogPost => ({
  id: post.id,
  title: t(post.title, post.title_en),
  slug: post.slug,
  excerpt: t(post.excerpt, post.excerpt_en),
  content: t(post.content, post.content_en),
  cover_image_url: post.cover_image_url,
  author: post.author,
  published_at: post.published_at,
  category: t(post.category, post.category_en) as BlogCategory,
  read_time: post.read_time,
  tags: tArray(post.tags || [], post.tags_en),
  is_active: post.is_active,
  is_featured: post.is_featured,
  created_at: post.created_at,
  updated_at: post.updated_at,
});

export const useBlogPosts = () => {
  const { t, tArray, currentLanguage } = useTranslatedContent();

  return useQuery({
    queryKey: ['blog-posts', currentLanguage],
    queryFn: async (): Promise<BlogPost[]> => {
      const { data, error } = await supabase
        .from('blog_posts')
        .select('*')
        .order('published_at', { ascending: false });

      if (error) {
        console.error('Error fetching blog posts:', error);
        throw error;
      }

      return (data || []).map(post => mapBlogPost(post, t, tArray));
    }
  });
};

export const useBlogPost = (slug: string) => {
  const { t, tArray, currentLanguage } = useTranslatedContent();

  return useQuery({
    queryKey: ['blog-post', slug, currentLanguage],
    queryFn: async (): Promise<BlogPost | null> => {
      const { data, error } = await supabase
        .from('blog_posts')
        .select('*')
        .eq('slug', slug)
        .maybeSingle();

      if (error) {
        console.error('Error fetching blog post:', error);
        throw error;
      }

      if (!data) return null;

      return mapBlogPost(data, t, tArray);
    },
    enabled: !!slug
  });
};

export const useFeaturedBlogPosts = (limit: number = 3) => {
  const { t, tArray, currentLanguage } = useTranslatedContent();

  return useQuery({
    queryKey: ['blog-posts-featured', limit, currentLanguage],
    queryFn: async (): Promise<BlogPost[]> => {
      const { data, error } = await supabase
        .from('blog_posts')
        .select('*')
        .order('published_at', { ascending: false })
        .limit(limit);

      if (error) {
        console.error('Error fetching featured blog posts:', error);
        throw error;
      }

      return (data || []).map(post => mapBlogPost(post, t, tArray));
    }
  });
};

export const useRelatedBlogPosts = (category: BlogCategory, excludeSlug: string, limit: number = 3) => {
  const { t, tArray, currentLanguage } = useTranslatedContent();

  return useQuery({
    queryKey: ['blog-posts-related', category, excludeSlug, limit, currentLanguage],
    queryFn: async (): Promise<BlogPost[]> => {
      const { data, error } = await supabase
        .from('blog_posts')
        .select('*')
        .eq('category', category)
        .neq('slug', excludeSlug)
        .order('published_at', { ascending: false })
        .limit(limit);

      if (error) {
        console.error('Error fetching related blog posts:', error);
        throw error;
      }

      return (data || []).map(post => mapBlogPost(post, t, tArray));
    },
    enabled: !!category && !!excludeSlug
  });
};
