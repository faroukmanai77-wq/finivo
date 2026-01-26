import { useParams, Link } from 'react-router-dom';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { SEO, generateCreditCardStructuredData, generateBreadcrumbStructuredData } from '@/components/SEO';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { useCreditCard } from '@/hooks/useCreditCards';
import { useTranslation } from 'react-i18next';
import { useLanguage } from '@/hooks/useLanguage';
import { 
  ArrowLeft, 
  Star, 
  ExternalLink, 
  DollarSign, 
  Percent, 
  Gift, 
  CreditCard as CreditCardIcon,
  Check,
  Shield,
  Plane,
  ShoppingCart,
  Building2,
  GraduationCap,
  Sparkles,
  TrendingUp,
  Info
} from 'lucide-react';

const CardDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const { t } = useTranslation();
  const { getLocalizedPath, currentLanguage } = useLanguage();
  const { data: card, isLoading, error } = useCreditCard(slug || '');

  const categoryConfig: Record<string, { label: string; icon: React.ElementType; color: string }> = {
    travel: { label: t('creditCards.categories.travel'), icon: Plane, color: 'bg-blue-500/10 text-blue-500' },
    cashback: { label: t('creditCards.categories.cashback'), icon: DollarSign, color: 'bg-green-500/10 text-green-500' },
    rewards: { label: t('cardDetail.categories.rewards'), icon: Gift, color: 'bg-purple-500/10 text-purple-500' },
    'no-fee': { label: t('creditCards.categories.noFee'), icon: CreditCardIcon, color: 'bg-slate-500/10 text-slate-500' },
    student: { label: t('creditCards.categories.student'), icon: GraduationCap, color: 'bg-orange-500/10 text-orange-500' },
    premium: { label: t('creditCards.categories.premium'), icon: Sparkles, color: 'bg-amber-500/10 text-amber-500' },
    business: { label: t('cardDetail.categories.business'), icon: Building2, color: 'bg-indigo-500/10 text-indigo-500' },
    grocery: { label: t('cardDetail.categories.grocery'), icon: ShoppingCart, color: 'bg-emerald-500/10 text-emerald-500' },
  };

  const issuerGradients: Record<string, string> = {
    TD: 'from-green-600 to-green-400',
    BMO: 'from-blue-700 to-blue-500',
    RBC: 'from-blue-600 to-blue-400',
    CIBC: 'from-red-600 to-red-400',
    Scotiabank: 'from-red-700 to-red-500',
    Desjardins: 'from-green-700 to-teal-500',
    Tangerine: 'from-orange-500 to-orange-400',
    default: 'from-primary to-blue-400'
  };

  const gradient = card ? (issuerGradients[card.issuer] || issuerGradients.default) : issuerGradients.default;

  // Generate SEO data
  const generateSeoData = () => {
    if (!card) return null;

    const categoryLabels = card.categories
      .map(cat => categoryConfig[cat]?.label)
      .filter(Boolean)
      .join(', ');

    const title = currentLanguage === 'en' 
      ? `${card.name} - ${card.issuer} | Review and Details`
      : `${card.name} - ${card.issuer} | Avis et détails`;
    const description = currentLanguage === 'en'
      ? `Discover the ${card.name} by ${card.issuer}. ${card.annualFee === 0 ? 'No annual fee.' : `Annual fee: $${card.annualFee}.`} ${card.rewardsRate}% rewards. ${card.welcomeBonus ? `Bonus: ${card.welcomeBonus}.` : ''} Compare now!`
      : `Découvrez la ${card.name} par ${card.issuer}. ${card.annualFee === 0 ? 'Sans frais annuels.' : `Frais annuels: ${card.annualFee}$.`} ${card.rewardsRate}% de remise. ${card.welcomeBonus ? `Bonus: ${card.welcomeBonus}.` : ''} Comparez maintenant!`;
    const keywords = `${card.name}, ${card.issuer}, ${currentLanguage === 'en' ? 'credit card' : 'carte de crédit'}, ${categoryLabels}, Canada`;

    return { title, description, keywords };
  };

  const seoData = generateSeoData();

  const structuredData = card ? {
    ...generateCreditCardStructuredData({
      name: card.name,
      issuer: card.issuer,
      description: seoData?.description,
      image: card.image || undefined,
      rating: card.rating,
      annualFee: card.annualFee,
      slug: card.slug || '',
    }),
  } : undefined;

  const breadcrumbData = card ? generateBreadcrumbStructuredData([
    { name: t('nav.home'), url: 'https://finivo.ca' },
    { name: t('creditCards.title'), url: 'https://finivo.ca/comparateurs/cartes-de-credit' },
    { name: card.name, url: `https://finivo.ca/carte/${card.slug}` },
  ]) : undefined;

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <SEO 
          title={t('common.loading')}
          description={t('cardDetail.loadingDescription')}
          noindex
        />
        <Header />
        <div className="container mx-auto px-4 py-12">
          <Skeleton className="h-8 w-32 mb-8" />
          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-6">
              <Skeleton className="h-64 rounded-2xl" />
              <Skeleton className="h-48 rounded-2xl" />
            </div>
            <div>
              <Skeleton className="h-96 rounded-2xl" />
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (error || !card) {
    return (
      <div className="min-h-screen bg-background">
        <SEO 
          title={t('cardDetail.notFound')}
          description={t('cardDetail.notFoundDescription')}
          noindex
        />
        <Header />
        <div className="container mx-auto px-4 py-20">
          <div className="text-center">
            <div className="w-20 h-20 rounded-2xl bg-muted/50 flex items-center justify-center mx-auto mb-6">
              <CreditCardIcon className="w-10 h-10 text-muted-foreground" />
            </div>
            <h1 className="text-2xl font-bold text-foreground mb-4">{t('cardDetail.notFound')}</h1>
            <p className="text-muted-foreground mb-8">
              {t('cardDetail.notFoundDescription')}
            </p>
            <Link to={getLocalizedPath('/')}>
              <Button className="gap-2">
                <ArrowLeft className="w-4 h-4" />
                {t('common.backToHome')}
              </Button>
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <SEO 
        title={seoData?.title}
        description={seoData?.description}
        keywords={seoData?.keywords}
        image={card.image || undefined}
        url={`https://finivo.ca/carte/${card.slug}`}
        type="product"
        structuredData={{ 
          '@graph': [structuredData, breadcrumbData].filter(Boolean) 
        }}
      />
      
      <Header />
      
      {/* Hero section */}
      <section className="relative overflow-hidden py-12 lg:py-20" style={{ background: 'var(--gradient-hero)' }}>
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-[100px]" />
          <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-accent/15 rounded-full blur-[80px]" />
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          {/* Breadcrumb */}
          <nav aria-label={t('cardDetail.breadcrumb')} className="mb-8">
            <ol className="flex items-center gap-2 text-sm text-secondary-foreground/70">
              <li>
                <Link to={getLocalizedPath('/')} className="hover:text-secondary-foreground transition-colors">
                  {t('nav.home')}
                </Link>
              </li>
              <li>/</li>
              <li>
                <Link to={getLocalizedPath('/comparateurs/cartes-de-credit')} className="hover:text-secondary-foreground transition-colors">
                  {t('creditCards.title')}
                </Link>
              </li>
              <li>/</li>
              <li className="text-secondary-foreground font-medium truncate max-w-[200px]">
                {card.name}
              </li>
            </ol>
          </nav>
          
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Card info */}
            <div>
              <div className="flex flex-wrap gap-2 mb-4">
                {card.categories.map((cat) => {
                  const config = categoryConfig[cat];
                  if (!config) return null;
                  const Icon = config.icon;
                  return (
                    <Badge key={cat} variant="secondary" className="bg-secondary-foreground/10 text-secondary-foreground border-secondary-foreground/20">
                      <Icon className="w-3 h-3 mr-1" />
                      {config.label}
                    </Badge>
                  );
                })}
              </div>
              
              <h1 className="text-3xl lg:text-4xl xl:text-5xl font-extrabold text-secondary-foreground mb-3">
                {card.name}
              </h1>
              
              <p className="text-xl text-secondary-foreground/70 mb-6">
                {t('cardDetail.by')} {card.issuer}
              </p>
              
              <div className="flex items-center gap-4 mb-8">
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star 
                      key={i} 
                      className={`w-5 h-5 ${i < Math.floor(card.rating) ? 'text-warning fill-warning' : 'text-secondary-foreground/30'}`}
                    />
                  ))}
                </div>
                <span className="text-lg font-semibold text-secondary-foreground">{card.rating.toFixed(1)}</span>
              </div>
              
              {card.welcomeBonus && (
                <div className="inline-flex items-center gap-3 bg-accent/20 backdrop-blur-sm px-5 py-3 rounded-xl border border-accent/30">
                  <Gift className="w-5 h-5 text-accent" />
                  <div>
                    <p className="text-sm text-secondary-foreground/70">{t('creditCards.welcomeBonus')}</p>
                    <p className="font-semibold text-secondary-foreground">{card.welcomeBonus}</p>
                  </div>
                </div>
              )}
            </div>
            
            {/* Card visual */}
            <div className="flex justify-center lg:justify-end">
              <div className="relative">
                <div className="absolute inset-0 bg-primary/30 rounded-3xl blur-[40px] scale-90" />
                {card.image ? (
                  <img 
                    src={card.image} 
                    alt={`${t('cardDetail.cardAlt')} ${card.name} ${t('cardDetail.by')} ${card.issuer}`}
                    className="relative w-80 h-auto max-h-64 object-contain rounded-2xl shadow-2xl transform hover:scale-105 transition-transform duration-500"
                    loading="eager"
                  />
                ) : (
                  <div 
                    className={`relative w-80 h-48 rounded-2xl bg-gradient-to-br ${gradient} shadow-2xl p-6 transform hover:scale-105 transition-transform duration-500`}
                    role="img"
                    aria-label={`${t('cardDetail.visualRepresentation')} ${card.name}`}
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-50" />
                    
                    <div className="relative h-full flex flex-col justify-between">
                      <div className="flex justify-between items-start">
                        <div className="w-12 h-9 rounded-md bg-gradient-to-br from-yellow-300 to-yellow-500 shadow-lg" />
                        <CreditCardIcon className="w-8 h-8 text-primary-foreground/80" />
                      </div>
                      
                      <div>
                        <p className="text-primary-foreground font-bold text-lg">{card.issuer}</p>
                        <p className="text-primary-foreground/80 text-sm">{card.name}</p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-12 lg:py-20">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Main content */}
            <div className="lg:col-span-2 space-y-8">
              {/* Key stats */}
              <article className="card-elevated rounded-2xl p-6">
                <h2 className="text-xl font-bold text-foreground mb-6 flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-primary" />
                  {t('cardDetail.keyInfo')}
                </h2>
                
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="text-center p-4 rounded-xl bg-muted/30">
                    <DollarSign className="w-6 h-6 text-primary mx-auto mb-2" />
                    <p className="text-xs text-muted-foreground mb-1">{t('creditCards.annualFee')}</p>
                    <p className="text-xl font-bold text-foreground">
                      {card.annualFee === 0 ? t('cardDetail.free') : `${card.annualFee}$`}
                    </p>
                    {card.firstYearFreeAnnualFee && card.annualFee > 0 && (
                      <p className="text-xs text-accent font-medium mt-1">{t('cardDetail.firstYearFree')}</p>
                    )}
                  </div>
                  
                  <div className="text-center p-4 rounded-xl bg-muted/30">
                    <Percent className="w-6 h-6 text-accent mx-auto mb-2" />
                    <p className="text-xs text-muted-foreground mb-1">{t('cardDetail.maxRewards')}</p>
                    <p className="text-xl font-bold text-foreground">{card.rewardsRate}%</p>
                    <p className="text-xs text-muted-foreground mt-1">{card.rewardsType}</p>
                  </div>
                  
                  <div className="text-center p-4 rounded-xl bg-muted/30">
                    <CreditCardIcon className="w-6 h-6 text-warning mx-auto mb-2" />
                    <p className="text-xs text-muted-foreground mb-1">{t('creditCards.interestRate')}</p>
                    <p className="text-xl font-bold text-foreground">{card.interestRate}%</p>
                  </div>
                  
                  <div className="text-center p-4 rounded-xl bg-muted/30">
                    <Info className="w-6 h-6 text-muted-foreground mx-auto mb-2" />
                    <p className="text-xs text-muted-foreground mb-1">{t('cardDetail.cashAdvance')}</p>
                    <p className="text-xl font-bold text-foreground">{card.cashAdvanceRate}%</p>
                  </div>
                </div>
              </article>
              
              {/* Features */}
              {card.features && card.features.length > 0 && (
                <article className="card-elevated rounded-2xl p-6">
                  <h2 className="text-xl font-bold text-foreground mb-6 flex items-center gap-2">
                    <Shield className="w-5 h-5 text-primary" />
                    {t('cardDetail.featuresAndBenefits')}
                  </h2>
                  
                  <ul className="grid md:grid-cols-2 gap-4">
                    {card.features.map((feature, index) => (
                      <li key={index} className="flex items-start gap-3 p-4 rounded-xl bg-muted/20 hover:bg-muted/30 transition-colors">
                        <div className="w-6 h-6 rounded-full bg-accent/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                          <Check className="w-4 h-4 text-accent" />
                        </div>
                        <span className="text-foreground">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </article>
              )}
              
              {/* Requirements */}
              {card.minIncome && (
                <article className="card-elevated rounded-2xl p-6">
                  <h2 className="text-xl font-bold text-foreground mb-6 flex items-center gap-2">
                    <Info className="w-5 h-5 text-primary" />
                    {t('cardDetail.eligibilityRequirements')}
                  </h2>
                  
                  <div className="flex items-center gap-4 p-4 rounded-xl bg-muted/20">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                      <DollarSign className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">{t('cardDetail.minIncome')}</p>
                      <p className="text-xl font-bold text-foreground">{card.minIncome.toLocaleString(currentLanguage === 'en' ? 'en-CA' : 'fr-CA')} $</p>
                    </div>
                  </div>
                </article>
              )}
            </div>
            
            {/* Sidebar - CTA */}
            <aside className="lg:col-span-1">
              <div className="card-elevated rounded-2xl p-6 sticky top-24">
                <div className="text-center mb-6">
                  <p className="text-sm text-muted-foreground mb-1">{t('creditCards.annualFee')}</p>
                  <p className="text-4xl font-extrabold text-foreground">
                    {card.annualFee === 0 ? t('cardDetail.free') : `${card.annualFee}$`}
                  </p>
                  {card.firstYearFreeAnnualFee && card.annualFee > 0 && (
                    <Badge className="mt-2 bg-accent/10 text-accent border-accent/30">
                      {t('cardDetail.firstYearFree')}
                    </Badge>
                  )}
                </div>
                
                {card.welcomeBonusValue && (
                  <div className="bg-accent/10 rounded-xl p-4 mb-6 text-center">
                    <Gift className="w-8 h-8 text-accent mx-auto mb-2" />
                    <p className="text-sm text-muted-foreground">{t('cardDetail.bonusValue')}</p>
                    <p className="text-2xl font-bold text-accent">{card.welcomeBonusValue}$</p>
                  </div>
                )}
                
                <a 
                  href={card.affiliateLink} 
                  target="_blank" 
                  rel="noopener noreferrer sponsored"
                  className="block"
                >
                  <Button className="w-full btn-gradient h-14 text-lg font-semibold gap-2">
                    {t('cardDetail.applyNow')}
                    <ExternalLink className="w-5 h-5" />
                  </Button>
                </a>
                
                <p className="text-xs text-muted-foreground text-center mt-4">
                  {t('cardDetail.redirectNotice', { issuer: card.issuer })}
                </p>
                
                <div className="border-t border-border mt-6 pt-6">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Shield className="w-4 h-4" />
                    <span>{t('cardDetail.secureApplication')}</span>
                  </div>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default CardDetail;
