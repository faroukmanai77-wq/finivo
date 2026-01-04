export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  cover_image_url: string | null;
  author: string;
  published_at: string;
  category: BlogCategory;
  read_time: number;
  tags: string[];
  is_active: boolean;
  is_featured: boolean;
  created_at: string;
  updated_at: string;
}

export type BlogCategory = 
  | 'conseils'
  | 'comparatifs'
  | 'actualites'
  | 'guides';

export const blogCategoryLabels: Record<BlogCategory, string> = {
  conseils: 'Conseils',
  comparatifs: 'Comparatifs',
  actualites: 'Actualités',
  guides: 'Guides'
};
