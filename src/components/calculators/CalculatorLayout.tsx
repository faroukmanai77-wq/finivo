import { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { SEO, generateBreadcrumbStructuredData } from '@/components/SEO';
import { ArrowRight, Calculator } from 'lucide-react';
import { RecommendedArticles } from './RecommendedArticles';
import { FeaturedCard } from './FeaturedCard';
import { useLanguage } from '@/hooks/useLanguage';

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
  illustration?: string;
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
  featuredCardType,
  illustration
}: CalculatorLayoutProps) => {
  const { t } = useTranslation();
  const { getLocalizedPath } = useLanguage();

  const breadcrumbs = [{
    name: t('common.home'),
    url: 'https://finivo.ca'
  }, {
    name: t('common.calculators'),
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

  return (
    <div className="min-h-screen bg-background">
      <SEO 
        title={seoTitle} 
        description={seoDescription} 
        keywords={seoKeywords} 
        url={url} 
        structuredData={{
          '@graph': [calculatorStructuredData, generateBreadcrumbStructuredData(breadcrumbs)]
        }} 
      />
      <Header />
      
      {/* Hero Section */}
      <section className="py-10 lg:py-14 section-cream relative overflow-hidden">
        {/* Decorative shapes */}
        <div className="absolute top-10 right-10 w-20 h-20 bg-primary/10 rounded-full blur-2xl" />
        <div className="absolute bottom-10 left-10 w-32 h-32 bg-accent/10 rounded-full blur-3xl" />
        
        <div className="container mx-auto px-4 relative z-10">
          {/* Breadcrumbs */}
          <nav aria-label="Fil d'Ariane" className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
            <Link to={getLocalizedPath('/')} className="hover:text-foreground transition-colors">{t('common.home')}</Link>
            <span>/</span>
            <Link to={getLocalizedPath('/calculateurs')} className="hover:text-foreground transition-colors">{t('common.calculators')}</Link>
            <span>/</span>
            <span className="text-primary">{title}</span>
          </nav>

          <div className="grid lg:grid-cols-2 gap-8 items-center">
            <div className="flex items-start gap-6">
              <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                {icon}
              </div>
              <div>
                <h1 className="text-2xl lg:text-3xl font-extrabold mb-2 text-foreground">
                  {title}
                </h1>
                <p className="max-w-2xl text-muted-foreground">
                  {description}
                </p>
              </div>
            </div>
            
            {illustration && (
              <div className="hidden lg:flex justify-center">
                <img 
                  src={illustration} 
                  alt={title} 
                  className="w-full max-w-xs drop-shadow-lg animate-float"
                />
              </div>
            )}
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
