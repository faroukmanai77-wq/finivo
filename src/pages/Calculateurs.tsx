import { Link } from 'react-router-dom';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { SEO } from '@/components/SEO';
import { Calculator, TrendingUp, PiggyBank, Scale, Receipt, Building, ArrowRight, Sparkles, Wallet, Home } from 'lucide-react';
import AbacusIllustration from '@/assets/illustrations/abacus.gif';
const Calculateurs = () => {
  const calculators = [{
    icon: TrendingUp,
    title: 'Intérêts composés',
    description: 'Calculez combien un placement peut vous rapporter au fil du temps grâce aux intérêts composés.',
    href: '/calculateurs/interets-composes',
    color: 'bg-primary/10 text-primary',
    popular: true
  }, {
    icon: PiggyBank,
    title: 'Épargne REER',
    description: 'Estimez la valeur de votre REER à la retraite et le revenu annuel qu\'il vous procurera.',
    href: '/calculateurs/reer',
    color: 'bg-accent/10 text-accent',
    popular: true
  }, {
    icon: PiggyBank,
    title: 'Épargne CELIAPP',
    description: 'Calculez vos économies potentielles avec le compte d\'épargne libre d\'impôt pour l\'achat d\'une première maison.',
    href: '/calculateurs/celiapp',
    color: 'bg-success/10 text-success',
    popular: false
  }, {
    icon: Receipt,
    title: 'Consolidation de dettes',
    description: 'Combinez vos dettes en une seule. Calculez vos nouvelles mensualités et le temps pour vous libérer.',
    href: '/calculateurs/consolidation-dettes',
    color: 'bg-warning/10 text-warning',
    popular: true
  }, {
    icon: Scale,
    title: 'Valeur nette',
    description: 'Calculez votre valeur nette en comparant vos actifs et vos passifs. Suivez votre progression.',
    href: '/calculateurs/valeur-nette',
    color: 'bg-purple-100 text-purple-600 dark:bg-purple-900/20 dark:text-purple-400',
    popular: false
  }, {
    icon: Building,
    title: 'Impôt Canada/Québec',
    description: 'Estimez votre impôt fédéral et provincial basé sur les tranches d\'imposition 2026.',
    href: '/calculateurs/impot',
    color: 'bg-red-100 text-red-600 dark:bg-red-900/20 dark:text-red-400',
    popular: false
  }, {
    icon: Wallet,
    title: 'Budget mensuel',
    description: 'Planifiez votre budget en détaillant vos revenus et dépenses. Imprimez ou exportez en Excel.',
    href: '/calculateurs/budget',
    color: 'bg-primary/10 text-primary',
    popular: true
  }, {
    icon: Home,
    title: 'Hypothèque',
    description: 'Calculez vos paiements hypothécaires, le coût total et visualisez l\'amortissement de votre prêt.',
    href: '/calculateurs/hypotheque',
    color: 'bg-chart-4/10 text-chart-4',
    popular: true
  }];
  
  // Structured data for SEO - SoftwareApplication type for calculators
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: 'Calculateurs Financiers Finivo 2026',
    description: '8 calculateurs financiers gratuits pour les Québécois en 2026 : REER, CELIAPP, CELI, hypothèque, budget, intérêts composés, impôt et plus.',
    url: 'https://finivo.ca/calculateurs',
    applicationCategory: 'FinanceApplication',
    operatingSystem: 'Web',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'CAD'
    },
    featureList: calculators.map(c => c.title).join(', ')
  };

  return <div className="min-h-screen bg-background">
      <SEO 
        title="8 Calculateurs Financiers Gratuits Québec 2026 | REER, CELIAPP, CELI, Hypothèque, Budget | Finivo" 
        description="Planifiez vos finances avec nos 8 calculateurs gratuits en 2026 : intérêts composés, épargne REER et CELIAPP, CELI, hypothèque avec assurance SCHL, budget mensuel exportable Excel, consolidation de dettes, valeur nette et impôts Canada/Québec. Outils interactifs pour les Québécois." 
        keywords="calculateur financier gratuit 2026, calculateur REER québec, calculateur CELIAPP 2026, calculateur CELI, calculateur hypothèque SCHL, budget mensuel excel, consolidation dettes, valeur nette, impôt québec canada 2026, intérêts composés, planification financière" 
        url="https://finivo.ca/calculateurs"
        structuredData={structuredData}
      />
      <Header />
      
      {/* Hero Section */}
      <section className="py-10 md:py-12 lg:py-16 bg-secondary-foreground">
        <div className="container mx-auto px-4">
          <nav className="flex items-center gap-2 text-xs md:text-sm text-muted-foreground mb-4 md:mb-6" aria-label="Fil d'Ariane">
            <Link to="/" className="hover:text-foreground transition-colors">Accueil</Link>
            <span>/</span>
            <span className="text-primary">Calculateurs</span>
          </nav>

          <div className="flex flex-col lg:flex-row items-center gap-6 md:gap-8 lg:gap-16">
            <div className="text-center lg:text-left max-w-2xl">
              <div className="inline-flex items-center gap-2 px-3 md:px-4 py-1.5 md:py-2 rounded-full text-xs md:text-sm font-semibold mb-3 md:mb-4 text-primary bg-primary/15">
                <Calculator className="w-3.5 h-3.5 md:w-4 md:h-4" />
                8 outils gratuits
              </div>
              <h1 className="text-2xl md:text-3xl lg:text-4xl font-extrabold mb-3 md:mb-4 text-popover-foreground leading-tight">
                Calculateurs financiers
              </h1>
              <p className="text-base md:text-lg text-secondary">
                Des outils interactifs pour simuler vos investissements, planifier votre épargne 
                et gérer vos dettes efficacement.
              </p>
            </div>
            <div className="w-40 h-40 md:w-56 md:h-56 lg:w-80 lg:h-80 flex-shrink-0">
              <img 
                src={AbacusIllustration} 
                alt="Illustration calculateurs financiers" 
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
            {calculators.map((calc, index) => <Link key={index} to={calc.href} className="group card-elevated rounded-2xl p-6 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 relative">
                {calc.popular && <div className="absolute top-4 right-4">
                    <span className="inline-flex items-center gap-1 bg-primary/10 text-primary px-2 py-1 rounded-full text-xs font-semibold">
                      <Sparkles className="w-3 h-3" />
                      Populaire
                    </span>
                  </div>}
                
                <div className={`w-14 h-14 rounded-xl ${calc.color} flex items-center justify-center mb-5 group-hover:scale-110 transition-transform`}>
                  <calc.icon className="w-7 h-7" />
                </div>
                
                <h2 className="text-xl font-bold text-foreground mb-2 group-hover:text-primary transition-colors">
                  {calc.title}
                </h2>
                <p className="text-muted-foreground text-sm mb-4">
                  {calc.description}
                </p>
                
                <div className="flex items-center gap-2 text-primary font-semibold text-sm group-hover:gap-3 transition-all">
                  Utiliser le calculateur
                  <ArrowRight className="w-4 h-4" />
                </div>
              </Link>)}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-2xl mx-auto">
            <h2 className="text-2xl font-bold text-foreground mb-4">
              Besoin d'une carte de crédit adaptée?
            </h2>
            <p className="text-muted-foreground mb-6">
              Comparez les meilleures cartes de crédit au Québec et trouvez celle qui correspond à vos objectifs financiers.
            </p>
            <Link to="/comparateurs/cartes-de-credit" className="inline-flex items-center gap-2 btn-gradient px-6 py-3 rounded-lg font-semibold text-primary-foreground">
              Comparer les cartes
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>;
};
export default Calculateurs;