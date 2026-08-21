import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { SEO, generateOrganizationStructuredData } from '@/components/SEO';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useLanguage } from '@/hooks/useLanguage';
import { CreditCard, Calculator, BookOpen, ArrowRight, TrendingUp, PiggyBank, Scale, Receipt, Star, Shield, Zap, CheckCircle, Building2, Library, Users, Target, Wallet, Home } from 'lucide-react';
import DigitalSavingsIllustration from '@/assets/illustrations/digital-savings.svg';
import GrowthGraphIllustration from '@/assets/illustrations/growth-graph.svg';
import CardsIllustration from '@/assets/illustrations/cards.svg';

const Landing = () => {
  const { t } = useTranslation();
  const { getLocalizedPath } = useLanguage();

  const pillars = [{
    icon: CreditCard,
    titleKey: 'landing.pillars.cards.title',
    descriptionKey: 'landing.pillars.cards.description',
    href: '/comparateurs/cartes-de-credit',
    color: 'bg-primary/10 text-primary',
    featuresKey: 'landing.pillars.cards.features'
  }, {
    icon: Building2,
    titleKey: 'landing.pillars.brokerages.title',
    descriptionKey: 'landing.pillars.brokerages.description',
    href: '/comparateurs/courtage',
    color: 'bg-chart-4/10 text-chart-4',
    featuresKey: 'landing.pillars.brokerages.features'
  }, {
    icon: Calculator,
    titleKey: 'landing.pillars.calculators.title',
    descriptionKey: 'landing.pillars.calculators.description',
    href: '/calculateurs',
    color: 'bg-accent/10 text-accent',
    featuresKey: 'landing.pillars.calculators.features'
  }, {
    icon: Library,
    titleKey: 'landing.pillars.library.title',
    descriptionKey: 'landing.pillars.library.description',
    href: '/bibliotheque',
    color: 'bg-warning/10 text-warning',
    featuresKey: 'landing.pillars.library.features'
  }, {
    icon: BookOpen,
    titleKey: 'landing.pillars.blog.title',
    descriptionKey: 'landing.pillars.blog.description',
    href: '/blog',
    color: 'bg-success/10 text-success',
    featuresKey: 'landing.pillars.blog.features'
  }];

  const calculators = [{
    icon: TrendingUp,
    nameKey: 'landing.calculatorsSection.items.compound',
    href: '/calculateurs/interets-composes'
  }, {
    icon: PiggyBank,
    nameKey: 'landing.calculatorsSection.items.rrsp',
    href: '/calculateurs/reer'
  }, {
    icon: PiggyBank,
    nameKey: 'landing.calculatorsSection.items.fhsa',
    href: '/calculateurs/celiapp'
  }, {
    icon: Scale,
    nameKey: 'landing.calculatorsSection.items.netWorth',
    href: '/calculateurs/valeur-nette'
  }, {
    icon: Receipt,
    nameKey: 'landing.calculatorsSection.items.debtConsolidation',
    href: '/calculateurs/consolidation-dettes'
  }, {
    icon: Receipt,
    nameKey: 'landing.calculatorsSection.items.tax',
    href: '/calculateurs/impot'
  }, {
    icon: Wallet,
    nameKey: 'landing.calculatorsSection.items.budget',
    href: '/calculateurs/budget'
  }, {
    icon: Home,
    nameKey: 'landing.calculatorsSection.items.mortgage',
    href: '/calculateurs/hypotheque'
  }];

  const stats = [{
    value: '30+',
    labelKey: 'landing.stats.creditCards'
  }, {
    value: '10+',
    labelKey: 'landing.stats.brokers'
  }, {
    value: '20+',
    labelKey: 'landing.stats.books'
  }, {
    value: '8',
    labelKey: 'landing.stats.calculators'
  }];

  const quickLinks = [{
    icon: CreditCard,
    labelKey: 'landing.quickLinks.creditCards',
    href: '/comparateurs/cartes-de-credit'
  }, {
    icon: Building2,
    labelKey: 'landing.quickLinks.brokerages',
    href: '/comparateurs/courtage'
  }, {
    icon: Library,
    labelKey: 'landing.quickLinks.library',
    href: '/bibliotheque'
  }, {
    icon: Calculator,
    labelKey: 'landing.quickLinks.calculators',
    href: '/calculateurs'
  }];

  return (
    <div className="min-h-screen bg-background">
      <SEO 
        title={t('seo.homeTitle')} 
        description={t('seo.homeDescription')} 
        keywords="finivo, outils financiers gratuits canada 2026, comparateur carte crédit canada, meilleur courtier canada, calculateur REER CELIAPP CELI, calculateur hypothèque canada, budget mensuel, impôt canada 2026, finances personnelles, liberté financière, investissement débutant" 
        url="https://finivo.ca" 
        structuredData={generateOrganizationStructuredData()} 
      />
      <Header />
      
      {/* Hero Section */}
      <section className="relative overflow-hidden section-cream">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -right-20 top-0 w-[60%] h-full bg-gradient-to-bl from-primary/20 via-accent/10 to-transparent rounded-l-[100px]" />
          <div className="absolute top-20 left-[10%] w-16 h-16 bg-accent/20 rounded-full blur-sm animate-float" />
          <div className="absolute top-40 left-[20%] w-8 h-8 bg-warning/30 rounded-full animate-float" style={{ animationDelay: '1s' }} />
          <div className="absolute bottom-32 left-[15%] w-12 h-12 bg-primary/20 rounded-full animate-float" style={{ animationDelay: '2s' }} />
          <div className="absolute top-32 right-[40%] w-6 h-6 bg-success/30 rounded-full animate-float" style={{ animationDelay: '0.5s' }} />
        </div>

        <div className="container mx-auto px-4 py-16 lg:py-24 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-8 items-center">
            <div className="max-w-xl">
              <div className="inline-flex items-center gap-2 bg-primary/15 text-primary px-4 py-2 rounded-full text-sm font-semibold mb-6">
                <Star className="w-4 h-4 fill-primary" />
                {t('hero.badge')}
              </div>
              
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-[1.1] mb-6 text-foreground">
                {t('hero.title')}
                <span className="block mt-2 text-primary">
                  {t('hero.titleHighlight')}
                </span>
              </h1>
              
              <p 
                className="text-lg text-muted-foreground mb-8 leading-relaxed"
                dangerouslySetInnerHTML={{ __html: t('hero.subtitle') }}
              />

              <div className="flex flex-wrap gap-2 mb-8">
                {quickLinks.map((link, i) => (
                  <Link
                    key={i}
                    to={getLocalizedPath(link.href)}
                    className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-card border border-border hover:border-primary hover:bg-primary/5 text-foreground text-sm font-medium transition-all duration-200 hover:scale-105 shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                  >
                    <link.icon className="w-4 h-4 text-primary" />
                    {t(link.labelKey)}
                  </Link>
                ))}
              </div>

              <div className="flex flex-col sm:flex-row gap-4 mb-10">
                <Button asChild size="lg" className="btn-gradient text-lg h-14 px-8 gap-3 font-semibold group rounded-full">
                  <Link to={getLocalizedPath('/comparateurs')}>
                    <Scale className="w-5 h-5 group-hover:scale-110 transition-transform" />
                    {t('hero.cta')}
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </Button>
                <Button asChild variant="outline" size="lg" className="h-14 px-8 border-2 border-foreground/20 text-foreground hover:bg-foreground/5 font-semibold gap-3 text-lg rounded-full">
                  <Link to={getLocalizedPath('/calculateurs')}>
                    <Calculator className="w-5 h-5" />
                    {t('hero.ctaSecondary')}
                  </Link>
                </Button>
              </div>

              <div className="flex flex-wrap items-center gap-6 text-sm">
                {stats.map((stat, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <span className="text-2xl font-extrabold text-primary">{stat.value}</span>
                    <span className="text-muted-foreground">{t(stat.labelKey)}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative hidden lg:flex items-center justify-center">
              <div className="relative w-full max-w-lg">
                <img 
                  src={DigitalSavingsIllustration} 
                  alt="Digital savings illustration" 
                  className="w-full h-auto drop-shadow-2xl animate-float"
                />
                
                <div className="absolute -left-8 top-1/4 bg-card rounded-2xl p-4 shadow-lg border border-border animate-float" style={{ animationDelay: '0.5s' }}>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-success/20 flex items-center justify-center">
                      <TrendingUp className="w-5 h-5 text-success" />
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">{t('landing.floatingCards.return')}</p>
                      <p className="font-bold text-foreground">+12.5%</p>
                    </div>
                  </div>
                </div>
                
                <div className="absolute -right-4 bottom-1/4 bg-card rounded-2xl p-4 shadow-lg border border-border animate-float" style={{ animationDelay: '1.5s' }}>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                      <PiggyBank className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">{t('landing.floatingCards.fhsaSavings')}</p>
                      <p className="font-bold text-foreground">8 000$/an</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-16 pt-8 border-t border-border/50 flex flex-wrap items-center justify-center gap-8 text-muted-foreground text-sm">
            <div className="flex items-center gap-2">
              <Shield className="w-5 h-5 text-primary" />
              <span>{t('landing.trust.independent')}</span>
            </div>
            <div className="flex items-center gap-2">
              <Zap className="w-5 h-5 text-accent" />
              <span>{t('landing.trust.upToDate')}</span>
            </div>
            <div className="flex items-center gap-2">
              <Users className="w-5 h-5 text-success" />
              <span>{t('landing.trust.freeForAll')}</span>
            </div>
            <div className="flex items-center gap-2">
              <Target className="w-5 h-5 text-warning" />
              <span>{t('landing.trust.madeIn')}</span>
            </div>
          </div>
        </div>
      </section>

      {/* Three Pillars Section */}
      <section className="py-20 lg:py-28 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-accent/5 rounded-full blur-3xl" />
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
            <div>
              <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-semibold mb-4">
                <Star className="w-4 h-4 fill-primary" />
                {t('landing.pillars.badge')}
              </div>
              <h2 className="text-3xl lg:text-5xl font-extrabold text-foreground mb-4">
                {t('landing.pillars.title')}
                <span className="text-primary"> {t('landing.pillars.titleHighlight')}</span>
              </h2>
              <p className="text-muted-foreground text-lg leading-relaxed">
                {t('landing.pillars.subtitle')}
              </p>
            </div>
            <div className="hidden lg:flex justify-center">
              <img 
                src={CardsIllustration} 
                alt="Cards illustration" 
                className="w-full max-w-sm drop-shadow-xl animate-float"
              />
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
            {pillars.map((pillar, index) => {
              const features = t(pillar.featuresKey, { returnObjects: true }) as string[];
              return (
                <Link
                  key={index}
                  to={getLocalizedPath(pillar.href)}
                  className="group bg-card rounded-2xl p-6 border border-border hover:border-primary/30 hover:shadow-xl transition-all duration-300 hover:-translate-y-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                >
                  <div className={`w-14 h-14 rounded-2xl ${pillar.color} flex items-center justify-center mb-5 group-hover:scale-110 transition-transform`}>
                    <pillar.icon className="w-7 h-7" />
                  </div>
                  <h3 className="text-lg font-bold text-foreground mb-2">{t(pillar.titleKey)}</h3>
                  <p className="text-muted-foreground text-sm mb-4 line-clamp-2">{t(pillar.descriptionKey)}</p>
                  <ul className="space-y-1.5 mb-5">
                    {Array.isArray(features) && features.map((feature, i) => (
                      <li key={i} className="flex items-center gap-2 text-xs text-muted-foreground">
                        <CheckCircle className="w-3.5 h-3.5 text-success flex-shrink-0" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <div className="flex items-center gap-2 text-primary font-semibold text-sm group-hover:gap-3 transition-all duration-200">
                    {t('common.explore')}
                    <ArrowRight className="w-4 h-4" />
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Calculators Preview Section */}
      <section className="py-20 lg:py-28 section-cream relative overflow-hidden">
        <div className="absolute top-20 left-10 w-20 h-20 bg-warning/20 rounded-full animate-float" />
        <div className="absolute bottom-20 right-10 w-16 h-16 bg-primary/20 rounded-full animate-float" style={{ animationDelay: '1s' }} />
        <div className="absolute top-1/2 right-1/4 w-12 h-12 bg-accent/20 rounded-full animate-float" style={{ animationDelay: '2s' }} />
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="hidden lg:flex justify-center order-2 lg:order-1">
              <img 
                src={GrowthGraphIllustration} 
                alt="Growth graph illustration" 
                className="w-full max-w-md drop-shadow-xl animate-float"
              />
            </div>
            
            <div className="order-1 lg:order-2">
              <div className="inline-flex items-center gap-2 bg-accent/15 text-accent px-4 py-2 rounded-full text-sm font-semibold mb-4">
                <Calculator className="w-4 h-4" />
                {t('landing.calculatorsSection.badge')}
              </div>
              <h2 className="text-3xl lg:text-5xl font-extrabold text-foreground mb-4">
                {t('landing.calculatorsSection.title')}
                <span className="text-accent"> {t('landing.calculatorsSection.titleHighlight')}</span>
              </h2>
              <p className="text-muted-foreground text-lg mb-8 leading-relaxed">
                {t('landing.calculatorsSection.subtitle')}
              </p>

              <div className="grid sm:grid-cols-2 gap-3 mb-8">
                {calculators.slice(0, 6).map((calc, index) => (
                  <Link
                    key={index}
                    to={getLocalizedPath(calc.href)}
                    className="flex items-center gap-3 p-3 bg-card rounded-xl border border-border hover:border-primary/50 hover:shadow-md transition-all duration-200 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                  >
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors duration-200 flex-shrink-0">
                      <calc.icon className="w-5 h-5 text-primary" />
                    </div>
                    <span className="font-medium text-foreground text-sm group-hover:text-primary transition-colors duration-200">
                      {t(calc.nameKey)}
                    </span>
                  </Link>
                ))}
              </div>

              <Button asChild size="lg" className="btn-gradient font-semibold gap-2 rounded-full">
                <Link to={getLocalizedPath('/calculateurs')}>
                  {t('common.viewAllCalculators')}
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Section */}
      <section className="py-20 lg:py-28">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <Shield className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-lg font-bold text-foreground mb-2">{t('landing.trustSection.independent.title')}</h3>
              <p className="text-muted-foreground text-sm">
                {t('landing.trustSection.independent.description')}
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 rounded-2xl bg-accent/10 flex items-center justify-center mx-auto mb-4">
                <Zap className="w-8 h-8 text-accent" />
              </div>
              <h3 className="text-lg font-bold text-foreground mb-2">{t('landing.trustSection.realtime.title')}</h3>
              <p className="text-muted-foreground text-sm">
                {t('landing.trustSection.realtime.description')}
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 rounded-2xl bg-success/10 flex items-center justify-center mx-auto mb-4">
                <Star className="w-8 h-8 text-success" />
              </div>
              <h3 className="text-lg font-bold text-foreground mb-2">{t('landing.trustSection.free.title')}</h3>
              <p className="text-muted-foreground text-sm">
                {t('landing.trustSection.free.description')}
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Landing;