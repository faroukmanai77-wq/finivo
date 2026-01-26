import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { SEO } from '@/components/SEO';
import { Calculator, TrendingUp, PiggyBank, Scale, Receipt, Building, ArrowRight, Sparkles, Wallet, Home } from 'lucide-react';
import { useLanguage } from '@/hooks/useLanguage';
import AbacusIllustration from '@/assets/illustrations/abacus.gif';

const Calculateurs = () => {
  const { t } = useTranslation();
  const { getLocalizedPath } = useLanguage();

  const calculators = [{
    icon: TrendingUp,
    titleKey: 'calculatorsPage.items.compound.title',
    descriptionKey: 'calculatorsPage.items.compound.description',
    href: '/calculateurs/interets-composes',
    color: 'bg-primary/10 text-primary',
    popular: true
  }, {
    icon: PiggyBank,
    titleKey: 'calculatorsPage.items.rrsp.title',
    descriptionKey: 'calculatorsPage.items.rrsp.description',
    href: '/calculateurs/reer',
    color: 'bg-accent/10 text-accent',
    popular: true
  }, {
    icon: PiggyBank,
    titleKey: 'calculatorsPage.items.fhsa.title',
    descriptionKey: 'calculatorsPage.items.fhsa.description',
    href: '/calculateurs/celiapp',
    color: 'bg-success/10 text-success',
    popular: false
  }, {
    icon: Receipt,
    titleKey: 'calculatorsPage.items.debtConsolidation.title',
    descriptionKey: 'calculatorsPage.items.debtConsolidation.description',
    href: '/calculateurs/consolidation-dettes',
    color: 'bg-warning/10 text-warning',
    popular: true
  }, {
    icon: Scale,
    titleKey: 'calculatorsPage.items.netWorth.title',
    descriptionKey: 'calculatorsPage.items.netWorth.description',
    href: '/calculateurs/valeur-nette',
    color: 'bg-purple-100 text-purple-600 dark:bg-purple-900/20 dark:text-purple-400',
    popular: false
  }, {
    icon: Building,
    titleKey: 'calculatorsPage.items.tax.title',
    descriptionKey: 'calculatorsPage.items.tax.description',
    href: '/calculateurs/impot',
    color: 'bg-red-100 text-red-600 dark:bg-red-900/20 dark:text-red-400',
    popular: false
  }, {
    icon: Wallet,
    titleKey: 'calculatorsPage.items.budget.title',
    descriptionKey: 'calculatorsPage.items.budget.description',
    href: '/calculateurs/budget',
    color: 'bg-primary/10 text-primary',
    popular: true
  }, {
    icon: Home,
    titleKey: 'calculatorsPage.items.mortgage.title',
    descriptionKey: 'calculatorsPage.items.mortgage.description',
    href: '/calculateurs/hypotheque',
    color: 'bg-chart-4/10 text-chart-4',
    popular: true
  }];
  
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: t('calculatorsPage.seo.name'),
    description: t('calculatorsPage.seo.description'),
    url: 'https://finivo.ca/calculateurs',
    applicationCategory: 'FinanceApplication',
    operatingSystem: 'Web',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'CAD'
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <SEO 
        title={t('calculatorsPage.seo.title')}
        description={t('calculatorsPage.seo.description')}
        keywords={t('calculatorsPage.seo.keywords')}
        url="https://finivo.ca/calculateurs"
        structuredData={structuredData}
      />
      <Header />
      
      {/* Hero Section */}
      <section className="py-10 md:py-12 lg:py-16 bg-secondary-foreground">
        <div className="container mx-auto px-4">
          <nav className="flex items-center gap-2 text-xs md:text-sm text-muted-foreground mb-4 md:mb-6" aria-label="Breadcrumb">
            <Link to={getLocalizedPath('/')} className="hover:text-foreground transition-colors">{t('common.home')}</Link>
            <span>/</span>
            <span className="text-primary">{t('common.calculators')}</span>
          </nav>

          <div className="flex flex-col lg:flex-row items-center gap-6 md:gap-8 lg:gap-16">
            <div className="text-center lg:text-left max-w-2xl">
              <div className="inline-flex items-center gap-2 px-3 md:px-4 py-1.5 md:py-2 rounded-full text-xs md:text-sm font-semibold mb-3 md:mb-4 text-primary bg-primary/15">
                <Calculator className="w-3.5 h-3.5 md:w-4 md:h-4" />
                {t('calculatorsPage.badge')}
              </div>
              <h1 className="text-2xl md:text-3xl lg:text-4xl font-extrabold mb-3 md:mb-4 text-popover-foreground leading-tight">
                {t('calculatorsPage.title')}
              </h1>
              <p className="text-base md:text-lg text-secondary">
                {t('calculatorsPage.subtitle')}
              </p>
            </div>
            <div className="w-40 h-40 md:w-56 md:h-56 lg:w-80 lg:h-80 flex-shrink-0">
              <img 
                src={AbacusIllustration} 
                alt={t('calculatorsPage.illustrationAlt')}
                className="w-full h-full object-contain drop-shadow-lg"
                loading="eager"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Calculators Grid */}
      <section className="py-12 lg:py-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {calculators.map((calc, index) => (
              <Link 
                key={index} 
                to={getLocalizedPath(calc.href)} 
                className="group card-elevated rounded-2xl p-6 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 relative"
              >
                {calc.popular && (
                  <div className="absolute top-4 right-4">
                    <span className="inline-flex items-center gap-1 bg-primary/10 text-primary px-2 py-1 rounded-full text-xs font-semibold">
                      <Sparkles className="w-3 h-3" />
                      {t('calculatorsPage.popular')}
                    </span>
                  </div>
                )}
                
                <div className={`w-14 h-14 rounded-xl ${calc.color} flex items-center justify-center mb-5 group-hover:scale-110 transition-transform`}>
                  <calc.icon className="w-7 h-7" />
                </div>
                
                <h2 className="text-xl font-bold text-foreground mb-2 group-hover:text-primary transition-colors">
                  {t(calc.titleKey)}
                </h2>
                <p className="text-muted-foreground text-sm mb-4">
                  {t(calc.descriptionKey)}
                </p>
                
                <div className="flex items-center gap-2 text-primary font-semibold text-sm group-hover:gap-3 transition-all">
                  {t('calculatorsPage.useCalculator')}
                  <ArrowRight className="w-4 h-4" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-2xl mx-auto">
            <h2 className="text-2xl font-bold text-foreground mb-4">
              {t('calculatorsPage.cta.title')}
            </h2>
            <p className="text-muted-foreground mb-6">
              {t('calculatorsPage.cta.subtitle')}
            </p>
            <Link 
              to={getLocalizedPath('/comparateurs/cartes-de-credit')} 
              className="inline-flex items-center gap-2 btn-gradient px-6 py-3 rounded-lg font-semibold text-primary-foreground"
            >
              {t('calculatorsPage.cta.button')}
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Calculateurs;