import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { SEO } from '@/components/SEO';
import { CreditCard, Building2, ArrowRight, Scale } from 'lucide-react';
import { useLanguage } from '@/hooks/useLanguage';
import CardsIllustration from '@/assets/illustrations/cards.svg';
import MarketTrendsIllustration from '@/assets/illustrations/market-trends.svg';
import CryptoWealthIllustration from '@/assets/illustrations/crypto-wealth.gif';

const Comparateurs = () => {
  const { t } = useTranslation();
  const { getLocalizedPath, currentLanguage } = useLanguage();

  const comparators = [{
    icon: CreditCard,
    titleKey: 'comparators.creditCards.title',
    descriptionKey: 'comparators.creditCards.description',
    href: '/comparateurs/cartes-de-credit',
    color: 'bg-primary/10 text-primary',
    illustration: CardsIllustration
  }, {
    icon: Building2,
    titleKey: 'comparators.brokerages.title',
    descriptionKey: 'comparators.brokerages.description',
    href: '/comparateurs/courtage',
    color: 'bg-accent/10 text-accent',
    illustration: MarketTrendsIllustration
  }];
  
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: t('comparators.seo.name'),
    description: t('comparators.seo.description'),
    url: 'https://finivo.ca/comparateurs',
    mainEntity: {
      '@type': 'ItemList',
      itemListElement: [
        {
          '@type': 'ListItem',
          position: 1,
          name: t('comparators.creditCards.title'),
          url: 'https://finivo.ca/comparateurs/cartes-de-credit'
        },
        {
          '@type': 'ListItem',
          position: 2,
          name: t('comparators.brokerages.title'),
          url: 'https://finivo.ca/comparateurs/courtage'
        }
      ]
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <SEO 
        title={t('comparators.seo.title')}
        description={t('comparators.seo.description')}
        keywords={t('comparators.seo.keywords')}
        url="https://finivo.ca/comparateurs"
        structuredData={structuredData}
      />
      <Header />
      
      {/* Hero Section */}
      <section className="py-10 md:py-12 lg:py-16 section-cream relative overflow-hidden">
        <div className="absolute top-20 right-10 w-24 h-24 bg-primary/10 rounded-full blur-2xl animate-float" />
        <div className="absolute bottom-20 left-10 w-32 h-32 bg-accent/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '1s' }} />
        <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-warning/10 rounded-full blur-xl animate-float" style={{ animationDelay: '2s' }} />
        
        <div className="container mx-auto px-4 relative z-10">
          <nav className="flex items-center gap-2 text-xs md:text-sm text-muted-foreground mb-4 md:mb-6" aria-label="Breadcrumb">
            <Link to={getLocalizedPath('/')} className="hover:text-foreground transition-colors">{t('common.home')}</Link>
            <span>/</span>
            <span className="text-primary">{t('common.comparators')}</span>
          </nav>

          <div className="flex flex-col lg:flex-row items-center gap-6 md:gap-8 lg:gap-16">
            <div className="text-center lg:text-left max-w-2xl text-primary">
              <div className="inline-flex items-center gap-2 px-3 md:px-4 py-1.5 md:py-2 rounded-full text-xs md:text-sm font-semibold mb-3 md:mb-4 bg-primary/15 text-primary">
                <Scale className="w-3.5 h-3.5 md:w-4 md:h-4" />
                {t('comparators.badge')}
              </div>
              <h1 className="text-2xl md:text-3xl lg:text-4xl font-extrabold mb-3 md:mb-4 text-foreground leading-tight">
                {t('comparators.title')}
              </h1>
              <p className="text-base md:text-lg text-muted-foreground">
                {t('comparators.subtitle')}
              </p>
            </div>
            <div className="w-40 h-40 md:w-56 md:h-56 lg:w-80 lg:h-80 flex-shrink-0">
              <img 
                src={CryptoWealthIllustration} 
                alt={t('comparators.illustrationAlt')}
                className="w-full h-full object-contain drop-shadow-lg"
                loading="eager"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Comparators Grid */}
      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {comparators.map((comp, index) => (
              <Link 
                key={index} 
                to={getLocalizedPath(comp.href)} 
                className="group bg-card rounded-3xl p-8 border border-border hover:border-primary/30 hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 overflow-hidden relative"
              >
                <div className="absolute -right-10 -bottom-10 w-48 h-48 opacity-10 group-hover:opacity-20 transition-opacity">
                  <img src={comp.illustration} alt="" className="w-full h-full object-contain" />
                </div>
                
                <div className="relative z-10">
                  <div className={`w-16 h-16 rounded-2xl ${comp.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                    <comp.icon className="w-8 h-8" />
                  </div>
                  
                  <h2 className="text-2xl font-bold text-foreground mb-3 group-hover:text-primary transition-colors">
                    {t(comp.titleKey)}
                  </h2>
                  <p className="text-muted-foreground mb-6">
                    {t(comp.descriptionKey)}
                  </p>
                  
                  <div className="flex items-center gap-2 text-primary font-semibold group-hover:gap-3 transition-all">
                    {t('comparators.compareNow')}
                    <ArrowRight className="w-5 h-5" />
                  </div>
                </div>
                
                <div className="hidden lg:block absolute right-4 bottom-4 w-32 h-32 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-4 group-hover:translate-y-0">
                  <img src={comp.illustration} alt="" className="w-full h-full object-contain drop-shadow-lg" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 section-cream">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-2xl mx-auto">
            <h2 className="text-2xl lg:text-3xl font-bold text-foreground mb-4">
              {t('comparators.cta.title')}
            </h2>
            <p className="text-muted-foreground mb-8 text-lg">
              {t('comparators.cta.subtitle')}
            </p>
            <Link 
              to={getLocalizedPath('/calculateurs')} 
              className="inline-flex items-center gap-2 btn-gradient px-8 py-4 rounded-full font-semibold text-primary-foreground text-lg group"
            >
              {t('comparators.cta.button')}
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Comparateurs;