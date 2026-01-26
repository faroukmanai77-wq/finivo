import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { SEO, generateBreadcrumbStructuredData } from '@/components/SEO';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Skeleton } from '@/components/ui/skeleton';
import { useBlogPosts } from '@/hooks/useBlogPosts';
import { blogCategoryLabels, BlogCategory } from '@/types/blogPost';
import { BookOpen, Calendar, Clock, User, ArrowRight } from 'lucide-react';
const Blog = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<BlogCategory | null>(null);
  const {
    data: blogPosts = [],
    isLoading
  } = useBlogPosts();
  const filteredPosts = useMemo(() => {
    let result = [...blogPosts];
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(post => post.title.toLowerCase().includes(query) || post.excerpt.toLowerCase().includes(query) || post.tags.some(tag => tag.toLowerCase().includes(query)));
    }
    if (selectedCategory) {
      result = result.filter(post => post.category === selectedCategory);
    }
    return result;
  }, [blogPosts, searchQuery, selectedCategory]);
  const categories: BlogCategory[] = ['guides', 'conseils', 'comparatifs', 'actualites'];
  const breadcrumbs = [{
    name: 'Accueil',
    url: 'https://finivo.ca'
  }, {
    name: 'Blog',
    url: 'https://finivo.ca/blog'
  }];
  return <div className="min-h-screen bg-background">
      <SEO title="Blog Finivo | Guides Finances, Investissement, Immobilier & Impôts Québec 2026" description="Découvrez nos 25+ guides complets sur les finances personnelles au Québec en 2026 : REER, CELIAPP, CELI, investissement, immobilier, hypothèques, impôts, cartes de crédit. Articles rédigés par des experts pour les Québécois qui veulent prendre contrôle de leurs finances." keywords="blog finances personnelles québec 2026, guide REER CELIAPP CELI, investissement débutant, immobilier québec 2026, impôts québec, carte crédit remises, hypothèque taux, épargne placements, FNB ETF tout-en-un" url="https://finivo.ca/blog" structuredData={generateBreadcrumbStructuredData(breadcrumbs)} />
      <Header />
      
      {/* Hero Section */}
      <section className="py-16 lg:py-24 bg-gradient-to-b from-primary/5 to-background">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold mb-4 bg-[#28bd4d]/25 text-primary">
              <BookOpen className="w-4 h-4" />
              Blog Finivo
            </div>
            <h1 className="text-4xl lg:text-5xl font-extrabold text-foreground mb-6">Conseils et guides  ​<span className="gradient-text">​</span>
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              Tout ce que vous devez savoir pour faire les meilleurs choix financiers au Québec.
            </p>

            {/* Search */}
            
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-8 border-b border-border/50">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap items-center justify-center gap-3">
            <Button variant={selectedCategory === null ? 'default' : 'outline'} size="sm" onClick={() => setSelectedCategory(null)} className="rounded-full">
              Tous
            </Button>
            {categories.map(category => <Button key={category} variant={selectedCategory === category ? 'default' : 'outline'} size="sm" onClick={() => setSelectedCategory(category)} className="rounded-full">
                {blogCategoryLabels[category]}
              </Button>)}
          </div>
        </div>
      </section>

      {/* Articles Grid */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          {isLoading ? <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[1, 2, 3, 4, 5, 6].map(i => <div key={i} className="card-elevated rounded-2xl overflow-hidden">
                  <Skeleton className="h-48 w-full" />
                  <div className="p-6 space-y-3">
                    <Skeleton className="h-4 w-32" />
                    <Skeleton className="h-6 w-full" />
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-24" />
                  </div>
                </div>)}
            </div> : filteredPosts.length > 0 ? <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredPosts.map((post, index) => <Link key={post.id} to={`/blog/${post.slug}`} className="group card-elevated rounded-2xl overflow-hidden hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 animate-fade-in" style={{
            animationDelay: `${index * 50}ms`
          }}>
                  <div className="relative h-48 overflow-hidden">
                    <img src={post.cover_image_url || 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&auto=format&fit=crop'} alt={post.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                    <div className="absolute top-4 left-4">
                      <Badge variant="secondary" className="bg-background/90 backdrop-blur-sm text-foreground ml-2">
                        {blogCategoryLabels[post.category]}
                      </Badge>
                    </div>
                  </div>
                  <div className="p-6">
                    <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        {new Date(post.published_at).toLocaleDateString('fr-CA', {
                    day: 'numeric',
                    month: 'short',
                    year: 'numeric'
                  })}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        {post.read_time} min
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
                        Lire <ArrowRight className="w-4 h-4" />
                      </span>
                    </div>
                  </div>
                </Link>)}
            </div> : <div className="text-center py-20 card-elevated rounded-2xl">
              <div className="w-16 h-16 rounded-2xl bg-muted/50 flex items-center justify-center mx-auto mb-4">
                <BookOpen className="w-8 h-8 text-muted-foreground" />
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">Aucun article trouvé</h3>
              <p className="text-muted-foreground">
                Essayez de modifier votre recherche ou les filtres.
              </p>
            </div>}
        </div>
      </section>

      <Footer />
    </div>;
};
export default Blog;