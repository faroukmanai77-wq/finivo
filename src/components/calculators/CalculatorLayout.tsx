import { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { SEO, generateBreadcrumbStructuredData } from '@/components/SEO';
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
  const breadcrumbs = [{
    name: 'Accueil',
    url: 'https://finivo.ca'
  }, {
    name: 'Calculateurs',
    url: 'https://finivo.ca/calculateurs'
  }, {
    name: title,
    url
  }];
  const calculatorStructuredData = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: seoTitle,
    description: seoDescription,
    url,
    applicationCategory: 'FinanceApplication',
    operatingSystem: 'All',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'CAD'
    },
    provider: {
      '@type': 'Organization',
      name: 'Finivo',
      url: 'https://finivo.ca'
    }
  };
  return <div className="min-h-screen bg-background">
      <SEO title={seoTitle} description={seoDescription} keywords={seoKeywords} url={url} structuredData={{
      '@graph': [calculatorStructuredData, generateBreadcrumbStructuredData(breadcrumbs)]
    }} />
      <Header />
      
      {/* Hero Section */}
      <section className="bg-secondary py-10 lg:py-14">
        <div className="container mx-auto px-4">
          {/* Breadcrumbs */}
          <nav aria-label="Fil d'Ariane" className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
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
              <h1 className="text-2xl lg:text-3xl font-extrabold mb-2 text-secondary-foreground">
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
          {featuredCardType && <div className="max-w-4xl mx-auto mt-12">
              <FeaturedCard type={featuredCardType} />
            </div>}
        </div>
      </section>

      {/* Recommended Articles */}
      <section className="py-12 bg-muted/30">
        <div className="container mx-auto px-4">
          <RecommendedArticles category={relatedCategory} />
        </div>
      </section>

      <Footer />
    </div>;
};