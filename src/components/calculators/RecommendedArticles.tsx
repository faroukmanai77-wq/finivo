import { Link } from 'react-router-dom';
import { ArrowRight, Clock } from 'lucide-react';
import { useBlogPosts } from '@/hooks/useBlogPosts';

interface RecommendedArticlesProps {
  category: 'epargne' | 'dettes' | 'cartes' | 'impot' | 'investissement';
}

export const RecommendedArticles = ({ category }: RecommendedArticlesProps) => {
  const { data: blogPosts = [] } = useBlogPosts();

  // Map category to relevant blog posts
  const getCategoryPosts = () => {
    // Simple matching based on tags/categories
    const categoryKeywords: Record<string, string[]> = {
      epargne: ['épargne', 'reer', 'celiapp', 'investir'],
      dettes: ['dettes', 'crédit', 'erreurs', 'consolidation'],
      cartes: ['carte', 'cashback', 'récompenses', 'débutant'],
      impot: ['impôt', 'taxes', 'réglementation'],
      investissement: ['investir', 'placement', 'intérêts']
    };

    const keywords = categoryKeywords[category] || [];
    
    // Filter and score posts based on relevance
    const scoredPosts = blogPosts.map(post => {
      let score = 0;
      const content = `${post.title} ${post.excerpt} ${post.tags.join(' ')}`.toLowerCase();
      keywords.forEach(keyword => {
        if (content.includes(keyword.toLowerCase())) score++;
      });
      return { ...post, score };
    });

    // Sort by score and return top 3
    return scoredPosts
      .sort((a, b) => b.score - a.score)
      .slice(0, 3);
  };

  const recommendedPosts = getCategoryPosts();

  if (recommendedPosts.length === 0) return null;

  return (
    <div className="max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold text-foreground mb-6 text-center">
        Recommandé pour vous
      </h2>
      
      <div className="grid md:grid-cols-3 gap-6">
        {recommendedPosts.map((post) => (
          <Link
            key={post.id}
            to={`/blog/${post.slug}`}
            className="group bg-card rounded-xl border border-border p-5 hover:shadow-lg hover:border-primary/30 transition-all"
          >
            <h3 className="font-semibold text-foreground mb-2 group-hover:text-primary transition-colors line-clamp-2">
              {post.title}
            </h3>
            <p className="text-sm text-muted-foreground line-clamp-3 mb-4">
              {post.excerpt}
            </p>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1 text-xs text-muted-foreground">
                <Clock className="w-3 h-3" />
                <span>{post.read_time} min</span>
              </div>
              <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};
