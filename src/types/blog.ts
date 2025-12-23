export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  coverImage: string;
  author: string;
  publishedAt: string;
  category: BlogCategory;
  readTime: number;
  tags: string[];
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
