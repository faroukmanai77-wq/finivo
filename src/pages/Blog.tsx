import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { SEO, generateBreadcrumbStructuredData } from '@/components/SEO';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Skeleton } from '@/components/ui/skeleton';
import { useBlogPosts } from '@/hooks/useBlogPosts';
import { blogCategoryLabels, BlogCategory } from '@/types/blogPost';
import { useLanguage } from '@/hooks/useLanguage';
import { BookOpen, Calendar, Clock, User, ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';

const ARTICLES_PER_PAGE = 9;

const Blog = () => {
  const { t } = useTranslation();
  const { getLocalizedPath, currentLanguage } = useLanguage();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<BlogCategory | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  
  const { data: blogPosts = [], isLoading } = useBlogPosts();
  
  const filteredPosts = useMemo(() => {
    let result = [...blogPosts];
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(post => 
        post.title.toLowerCase().includes(query) || 
        post.excerpt.toLowerCase().includes(query) || 
        post.tags.some(tag => tag.toLowerCase().includes(query))
      );
    }
    if (selectedCategory) {
      result = result.filter(post => post.category === selectedCategory);
    }
    return result;
  }, [blogPosts, searchQuery, selectedCategory]);

  const handleSearchChange = (value: string) => {
    setSearchQuery(value);
    setCurrentPage(1);
  };

  const handleCategoryChange = (category: BlogCategory | null) => {
    setSelectedCategory(category);
    setCurrentPage(1);
  };

  const totalPages = Math.ceil(filteredPosts.length / ARTICLES_PER_PAGE);
  const paginatedPosts = useMemo(() => {
    const startIndex = (currentPage - 1) * ARTICLES_PER_PAGE;
    return filteredPosts.slice(startIndex, startIndex + ARTICLES_PER_PAGE);
  }, [filteredPosts, currentPage]);
  
  const categories: BlogCategory[] = ['guides', 'conseils', 'comparatifs', 'actualites'];
  
  const breadcrumbs = [{
    name: t('common.home'),
    url: 'https://finivo.ca'
  }, {
    name: t('common.blog'),
    url: 'https://finivo.ca/blog'
  }];

  const categoryLabels: Record<BlogCategory, string> = {
    guides: t('categories.guides'),
    conseils: t('categories.conseils'),
    comparatifs: t('categories.comparatifs'),
    actualites: t('categories.actualites')
  };

  return (
    <div className="min-h-screen bg-background">
      <SEO 
        title={t('seo.blogTitle')}
        description={t('seo.blogDescription')}
        keywords="blog finances personnelles canada 2026, guide REER CELIAPP CELI, investissement débutant, immobilier canada 2026, impôts canada, carte crédit remises, hypothèque taux, épargne placements, FNB ETF tout-en-un"
        url="https://finivo.ca/blog"
        structuredData={generateBreadcrumbStructuredData(breadcrumbs)}
      />
      <Header />
      
      {/* Hero Section */}
      <section className="py-16 lg:py-24 bg-gradient-to-b from-primary/5 to-background">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold mb-4 bg-[#28bd4d]/25 text-primary">
              <BookOpen className="w-4 h-4" />
              {t('blogPage.badge')}
            </div>
            <h1 className="text-4xl lg:text-5xl font-extrabold text-foreground mb-6">
              {t('blog.title')}
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              {t('blog.subtitle')}
            </p>

            {/* Search */}
            <div className="relative max-w-md mx-auto">
              <Input
                type="text"
                placeholder={t('blog.searchPlaceholder')}
                value={searchQuery}
                onChange={(e) => handleSearchChange(e.target.value)}
                className="pl-10 pr-4 py-3 h-12 rounded-full border-border/50 bg-background shadow-sm"
              />
              <BookOpen className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            </div>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-8 border-b border-border/50">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap items-center justify-center gap-3">
            <Button 
              variant={selectedCategory === null ? 'default' : 'outline'} 
              size="sm" 
              onClick={() => handleCategoryChange(null)} 
              className="rounded-full"
            >
              {t('common.all')}
            </Button>
            {categories.map(category => (
              <Button 
                key={category} 
                variant={selectedCategory === category ? 'default' : 'outline'} 
                size="sm" 
                onClick={() => handleCategoryChange(category)} 
                className="rounded-full"
              >
                {categoryLabels[category]}
              </Button>
            ))}
          </div>
        </div>
      </section>

      {/* Articles Grid */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          {isLoading ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[1, 2, 3, 4, 5, 6].map(i => (
                <div key={i} className="card-elevated rounded-2xl overflow-hidden">
                  <Skeleton className="h-48 w-full" />
                  <div className="p-6 space-y-3">
                    <Skeleton className="h-4 w-32" />
                    <Skeleton className="h-6 w-full" />
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-24" />
                  </div>
                </div>
              ))}
            </div>
          ) : paginatedPosts.length > 0 ? (
            <>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {paginatedPosts.map((post, index) => (
                  <Link 
                    key={post.id} 
                    to={getLocalizedPath(`/blog/${post.slug}`)}
                    className="group card-elevated rounded-2xl overflow-hidden hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 animate-fade-in"
                    style={{ animationDelay: `${index * 50}ms` }}
                  >
                    <div className="relative h-48 overflow-hidden">
                      <img 
                        src={post.cover_image_url || 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&auto=format&fit=crop'} 
                        alt={post.title} 
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" 
                      />
                      <div className="absolute top-4 left-4">
                        <Badge variant="secondary" className="bg-background/90 backdrop-blur-sm text-foreground ml-2">
                          {categoryLabels[post.category]}
                        </Badge>
                      </div>
                    </div>
                    <div className="p-6">
                      <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
                        <span className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          {new Date(post.published_at).toLocaleDateString(currentLanguage === 'fr' ? 'fr-CA' : 'en-CA', {
                            day: 'numeric',
                            month: 'short',
                            year: 'numeric'
                          })}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          {post.read_time} {t('common.min')}
                        </span>
                      </div>
                      <h2 className="text-xl font-bold text-foreground mb-2 group-hover:text-primary transition-colors line-clamp-2">
                        {post.title}
                      </h2>
                      <p className="text-muted-foreground line-clamp-3 mb-4">
                        {post.excerpt}
                      </p>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <User className="w-4 h-4" />
                          <span>{post.author}</span>
                        </div>
                        <span className="text-primary font-medium flex items-center gap-1 text-sm group-hover:gap-2 transition-all">
                          {t('common.readMore')} <ArrowRight className="w-4 h-4" />
                        </span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
              
              {/* Pagination */}
              {totalPages > 1 && (
                <div className="flex items-center justify-center gap-2 mt-12">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                    disabled={currentPage === 1}
                    className="gap-1"
                  >
                    <ChevronLeft className="w-4 h-4" />
                    {t('common.previous')}
                  </Button>
                  
                  <div className="flex items-center gap-1">
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => {
                      if (
                        page === 1 ||
                        page === totalPages ||
                        (page >= currentPage - 1 && page <= currentPage + 1)
                      ) {
                        return (
                          <Button
                            key={page}
                            variant={currentPage === page ? 'default' : 'outline'}
                            size="sm"
                            onClick={() => setCurrentPage(page)}
                            className="w-10"
                          >
                            {page}
                          </Button>
                        );
                      }
                      if (page === currentPage - 2 || page === currentPage + 2) {
                        return <span key={page} className="px-2 text-muted-foreground">...</span>;
                      }
                      return null;
                    })}
                  </div>
                  
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                    disabled={currentPage === totalPages}
                    className="gap-1"
                  >
                    {t('common.next')}
                    <ChevronRight className="w-4 h-4" />
                  </Button>
                </div>
              )}
              
              {/* Results count */}
              <p className="text-center text-sm text-muted-foreground mt-4">
                {filteredPosts.length} {filteredPosts.length > 1 ? t('common.articles') : t('common.article')} {t('common.found')}
                {totalPages > 1 && ` • ${t('common.page')} ${currentPage} ${t('common.of')} ${totalPages}`}
              </p>
            </>
          ) : (
            <div className="text-center py-20 card-elevated rounded-2xl">
              <div className="w-16 h-16 rounded-2xl bg-muted/50 flex items-center justify-center mx-auto mb-4">
                <BookOpen className="w-8 h-8 text-muted-foreground" />
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">{t('blog.noResults')}</h3>
              <p className="text-muted-foreground">
                {t('blog.noResultsSubtitle')}
              </p>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Blog;