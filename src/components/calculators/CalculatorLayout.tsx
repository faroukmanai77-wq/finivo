import { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { SEO } from '@/components/SEO';
import { ArrowRight, Calculator } from 'lucide-react';
import { RecommendedArticles } from './RecommendedArticles';
import { FeaturedCard } from './FeaturedCard';

interface CalculatorLayoutProps {
  title: string;
  description: string;
  icon: ReactNode;
  children: ReactNode;
  seoTitle: string;
  seoDescription: string;
  seoKeywords: string;
  url: string;
  relatedCategory?: 'epargne' | 'dettes' | 'cartes' | 'impot' | 'investissement';
  featuredCardType?: 'transfer' | 'cashback' | 'savings';
}

export const CalculatorLayout = ({
  title,
  description,
  icon,
  children,
  seoTitle,
  seoDescription,
  seoKeywords,
  url,
  relatedCategory = 'investissement',
  featuredCardType
}: CalculatorLayoutProps) => {
  return (
    <div className="min-h-screen bg-background">
      <SEO 
        title={seoTitle}
        description={seoDescription}
        keywords={seoKeywords}
        url={url}
      />
      <Header />
      
      {/* Hero Section */}
      <section className="bg-secondary py-10 lg:py-14">
        <div className="container mx-auto px-4">
          {/* Breadcrumbs */}
          <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
            <Link to="/" className="hover:text-foreground transition-colors">Accueil</Link>
            <span>/</span>
            <Link to="/calculateurs" className="hover:text-foreground transition-colors">Calculateurs</Link>
            <span>/</span>
            <span className="text-foreground">{title}</span>
          </nav>

          <div className="flex items-start gap-6">
            <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center flex-shrink-0">
              {icon}
            </div>
            <div>
              <h1 className="text-2xl lg:text-3xl font-extrabold text-foreground mb-2">
                {title}
              </h1>
              <p className="text-muted-foreground max-w-2xl">
                {description}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Calculator Content */}
      <section className="py-10 lg:py-14">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            {children}
          </div>

          {/* Featured Product Widget */}
          {featuredCardType && (
            <div className="max-w-4xl mx-auto mt-12">
              <FeaturedCard type={featuredCardType} />
            </div>
          )}
        </div>
      </section>

      {/* Recommended Articles */}
      <section className="py-12 bg-muted/30">
        <div className="container mx-auto px-4">
          <RecommendedArticles category={relatedCategory} />
        </div>
      </section>

      <Footer />
    </div>
  );
};
