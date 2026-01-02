import { useParams, Link, useNavigate } from 'react-router-dom';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { SEO, generateBreadcrumbStructuredData } from '@/components/SEO';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { blogPosts } from '@/data/blogPosts';
import { blogCategoryLabels } from '@/types/blog';
import { ArrowLeft, Calendar, Clock, User, BookOpen, ArrowRight } from 'lucide-react';
import { BlogArticleContent } from '@/components/BlogArticleContent';
import { SocialShareMenu } from '@/components/SocialShareMenu';

const BlogPost = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  
  const post = blogPosts.find(p => p.slug === slug);

  if (!post) {
    return (
      <div className="min-h-screen bg-background">
        <SEO 
          title="Article non trouvé | Finivo"
          description="L'article que vous recherchez n'existe pas ou a été déplacé."
          noindex
        />
        <Header />
        <div className="container mx-auto px-4 py-16 sm:py-20 text-center">
          <div className="max-w-md mx-auto">
            <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-muted/50 flex items-center justify-center mx-auto mb-4">
              <BookOpen className="w-7 h-7 sm:w-8 sm:h-8 text-muted-foreground" />
            </div>
            <h1 className="text-xl sm:text-2xl font-bold text-foreground mb-2">Article non trouvé</h1>
            <p className="text-sm sm:text-base text-muted-foreground mb-6">L'article que vous recherchez n'existe pas.</p>
            <Link to="/blog">
              <Button className="gap-2">
                <ArrowLeft className="w-4 h-4" />
                Retour au blog
              </Button>
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  const relatedPosts = blogPosts
    .filter(p => p.id !== post.id && p.category === post.category)
    .slice(0, 2);

  const breadcrumbs = [
    { name: 'Accueil', url: 'https://finivo.ca' },
    { name: 'Blog', url: 'https://finivo.ca/blog' },
    { name: post.title, url: `https://finivo.ca/blog/${post.slug}` }
  ];

  const articleStructuredData = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.excerpt,
    image: post.coverImage,
    author: {
      '@type': 'Person',
      name: post.author
    },
    publisher: {
      '@type': 'Organization',
      name: 'Finivo',
      logo: {
        '@type': 'ImageObject',
        url: 'https://finivo.ca/favicon.png'
      }
    },
    datePublished: post.publishedAt,
    dateModified: post.publishedAt,
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `https://finivo.ca/blog/${post.slug}`
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <SEO 
        title={`${post.title} | Blog Finivo`}
        description={post.excerpt}
        keywords={post.tags.join(', ')}
        image={post.coverImage}
        url={`https://finivo.ca/blog/${post.slug}`}
        type="article"
        structuredData={{
          '@graph': [articleStructuredData, generateBreadcrumbStructuredData(breadcrumbs)]
        }}
      />
      <Header />
      
      {/* Hero */}
      <section className="py-8 sm:py-12 lg:py-20 bg-gradient-to-b from-primary/5 to-background">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <button 
              onClick={() => navigate('/blog')}
              className="inline-flex items-center gap-2 text-sm sm:text-base text-muted-foreground hover:text-foreground transition-colors mb-4 sm:mb-6"
            >
              <ArrowLeft className="w-4 h-4" />
              Retour au blog
            </button>

            <Badge variant="secondary" className="mb-3 sm:mb-4 text-xs sm:text-sm">
              {blogCategoryLabels[post.category]}
            </Badge>

            <h1 className="text-2xl sm:text-3xl lg:text-5xl font-extrabold text-foreground mb-4 sm:mb-6 leading-tight">
              {post.title}
            </h1>

            <p className="text-base sm:text-lg lg:text-xl text-muted-foreground mb-6 sm:mb-8">
              {post.excerpt}
            </p>

            <div className="flex flex-wrap items-center gap-3 sm:gap-6 text-xs sm:text-sm text-muted-foreground">
              <span className="flex items-center gap-1.5 sm:gap-2">
                <User className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                {post.author}
              </span>
              <span className="flex items-center gap-1.5 sm:gap-2">
                <Calendar className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                <span className="hidden xs:inline">
                  {new Date(post.publishedAt).toLocaleDateString('fr-CA', { 
                    day: 'numeric', 
                    month: 'long', 
                    year: 'numeric' 
                  })}
                </span>
                <span className="xs:hidden">
                  {new Date(post.publishedAt).toLocaleDateString('fr-CA', { 
                    day: 'numeric', 
                    month: 'short', 
                    year: 'numeric' 
                  })}
                </span>
              </span>
              <span className="flex items-center gap-1.5 sm:gap-2">
                <Clock className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                {post.readTime} min
              </span>
              <SocialShareMenu title={post.title} />
            </div>
          </div>
        </div>
      </section>

      {/* Cover Image */}
      <section className="container mx-auto px-4 -mt-4 sm:-mt-8">
        <div className="max-w-4xl mx-auto">
          <div className="rounded-xl sm:rounded-2xl overflow-hidden shadow-lg sm:shadow-2xl">
            <img 
              src={post.coverImage} 
              alt={post.title}
              className="w-full h-48 sm:h-64 lg:h-96 object-cover"
            />
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-8 sm:py-12 lg:py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <article>
              <BlogArticleContent content={post.content} />
            </article>

            {/* Tags */}
            <div className="flex flex-wrap gap-2 mt-8 sm:mt-10 pt-8 sm:pt-10 border-t border-border">
              {post.tags.map(tag => (
                <Badge key={tag} variant="outline" className="text-xs sm:text-sm text-muted-foreground">
                  #{tag}
                </Badge>
              ))}
            </div>

            {/* CTA */}
            <div className="mt-8 sm:mt-10 p-5 sm:p-8 rounded-xl sm:rounded-2xl bg-gradient-to-r from-primary/10 to-accent/10 text-center">
              <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-foreground mb-2 sm:mb-3">
                Prêt à trouver votre carte idéale?
              </h3>
              <p className="text-sm sm:text-base text-muted-foreground mb-4 sm:mb-6">
                Utilisez notre comparateur pour découvrir les meilleures offres du moment.
              </p>
              <Link to="/#comparer">
                <Button size="default" className="btn-gradient gap-2 sm:text-base">
                  Comparer les cartes
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Related Posts */}
      {relatedPosts.length > 0 && (
        <section className="py-12 sm:py-16 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-xl sm:text-2xl font-bold text-foreground mb-6 sm:mb-8">Articles similaires</h2>
              <div className="grid sm:grid-cols-2 gap-4 sm:gap-6">
                {relatedPosts.map(relatedPost => (
                  <Link 
                    key={relatedPost.id} 
                    to={`/blog/${relatedPost.slug}`}
                    className="group card-elevated rounded-xl sm:rounded-2xl overflow-hidden hover:shadow-xl transition-all duration-300"
                  >
                    <div className="relative h-32 sm:h-40 overflow-hidden">
                      <img 
                        src={relatedPost.coverImage} 
                        alt={relatedPost.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                    </div>
                    <div className="p-4 sm:p-5">
                      <h3 className="text-sm sm:text-base font-bold text-foreground group-hover:text-primary transition-colors line-clamp-2">
                        {relatedPost.title}
                      </h3>
                      <p className="text-xs sm:text-sm text-muted-foreground mt-1.5 sm:mt-2 line-clamp-2">
                        {relatedPost.excerpt}
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      <Footer />
    </div>
  );
};

export default BlogPost;
