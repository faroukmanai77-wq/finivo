import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { BlogPost, BlogCategory } from '@/types/blogPost';

export const useBlogPosts = () => {
  return useQuery({
    queryKey: ['blog-posts'],
    queryFn: async (): Promise<BlogPost[]> => {
      const { data, error } = await supabase
        .from('blog_posts')
        .select('*')
        .order('published_at', { ascending: false });

      if (error) {
        console.error('Error fetching blog posts:', error);
        throw error;
      }

      return (data || []).map(post => ({
        ...post,
        category: post.category as BlogCategory
      }));
    }
  });
};

export const useBlogPost = (slug: string) => {
  return useQuery({
    queryKey: ['blog-post', slug],
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

      return {
        ...data,
        category: data.category as BlogCategory
      };
    },
    enabled: !!slug
  });
};

export const useFeaturedBlogPosts = (limit: number = 3) => {
  return useQuery({
    queryKey: ['blog-posts-featured', limit],
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

      return (data || []).map(post => ({
        ...post,
        category: post.category as BlogCategory
      }));
    }
  });
};

export const useRelatedBlogPosts = (category: BlogCategory, excludeSlug: string, limit: number = 3) => {
  return useQuery({
    queryKey: ['blog-posts-related', category, excludeSlug, limit],
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

      return (data || []).map(post => ({
        ...post,
        category: post.category as BlogCategory
      }));
    },
    enabled: !!category && !!excludeSlug
  });
};
