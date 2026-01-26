import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { SEO, generateOrganizationStructuredData } from '@/components/SEO';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { CreditCard, Calculator, BookOpen, ArrowRight, TrendingUp, PiggyBank, Scale, Receipt, Star, Shield, Zap, CheckCircle, Building2, Library, Users, Target, Wallet, Home } from 'lucide-react';
import DigitalSavingsIllustration from '@/assets/illustrations/digital-savings.svg';
import GrowthGraphIllustration from '@/assets/illustrations/growth-graph.svg';
import CardsIllustration from '@/assets/illustrations/cards.svg';
const Landing = () => {
  const pillars = [{
    icon: CreditCard,
    title: 'Comparateur de Cartes',
    description: 'Comparez plus de 30 cartes de crédit au Québec. Trouvez la meilleure selon vos besoins.',
    href: '/comparateurs/cartes-de-credit',
    color: 'bg-primary/10 text-primary',
    features: ['Remises en argent', 'Cartes voyage', 'Sans frais annuels']
  }, {
    icon: Building2,
    title: 'Comparateur de Courtage',
    description: 'Trouvez la meilleure plateforme pour investir au Canada : Wealthsimple, Questrade et plus.',
    href: '/comparateurs/courtage',
    color: 'bg-chart-4/10 text-chart-4',
    features: ['Zéro commission', 'CELI & REER', 'ETF & Actions']
  }, {
    icon: Calculator,
    title: 'Calculateurs Financiers',
    description: 'Planifiez votre avenir financier avec nos outils interactifs et gratuits.',
    href: '/calculateurs',
    color: 'bg-accent/10 text-accent',
    features: ['Intérêts composés', 'REER & CELIAPP', 'Consolidation de dettes']
  }, {
    icon: Library,
    title: 'Bibliothèque',
    description: 'Les meilleurs livres pour améliorer votre relation à l\'argent et investir intelligemment.',
    href: '/bibliotheque',
    color: 'bg-warning/10 text-warning',
    features: ['Finance personnelle', 'Investissement', 'Mindset']
  }, {
    icon: BookOpen,
    title: 'Blogue & Guides',
    description: 'Conseils d\'experts, actualités financières et guides pratiques pour le Québec.',
    href: '/blog',
    color: 'bg-success/10 text-success',
    features: ['Guides pratiques', 'Actualités 2026', 'Conseils personnalisés']
  }];
  const calculators = [{
    icon: TrendingUp,
    name: 'Intérêts composés',
    href: '/calculateurs/interets-composes'
  }, {
    icon: PiggyBank,
    name: 'Épargne REER',
    href: '/calculateurs/reer'
  }, {
    icon: PiggyBank,
    name: 'Épargne CELIAPP',
    href: '/calculateurs/celiapp'
  }, {
    icon: Scale,
    name: 'Valeur nette',
    href: '/calculateurs/valeur-nette'
  }, {
    icon: Receipt,
    name: 'Consolidation de dettes',
    href: '/calculateurs/consolidation-dettes'
  }, {
    icon: Receipt,
    name: 'Impôt Canada/Québec',
    href: '/calculateurs/impot'
  }, {
    icon: Wallet,
    name: 'Budget mensuel',
    href: '/calculateurs/budget'
  }, {
    icon: Home,
    name: 'Hypothèque',
    href: '/calculateurs/hypotheque'
  }];
  const stats = [{
    value: '30+',
    label: 'Cartes de crédit'
  }, {
    value: '10+',
    label: 'Courtiers en ligne'
  }, {
    value: '20+',
    label: 'Livres recommandés'
  }, {
    value: '8',
    label: 'Calculateurs'
  }];
  const quickLinks = [{
    icon: CreditCard,
    label: 'Cartes de crédit',
    href: '/comparateurs/cartes-de-credit'
  }, {
    icon: Building2,
    label: 'Plateformes de courtage',
    href: '/comparateurs/courtage'
  }, {
    icon: Library,
    label: 'Bibliothèque',
    href: '/bibliotheque'
  }, {
    icon: Calculator,
    label: 'Calculateurs',
    href: '/calculateurs'
  }];
  return <div className="min-h-screen bg-background">
      <SEO title="Finivo | Outils Financiers Gratuits Québec 2026 - Comparateurs & Calculateurs" description="Finivo est LA plateforme québécoise d'outils financiers 100% gratuits en 2026. Comparez 30+ cartes de crédit et 10+ courtiers en ligne. Utilisez nos 8 calculateurs (REER, CELIAPP, CELI, hypothèque, budget, impôts). Découvrez notre bibliothèque de 20+ livres sur la finance personnelle et investissement. Indépendant et sans frais." keywords="finivo, outils financiers gratuits québec 2026, comparateur carte crédit québec, meilleur courtier canada, calculateur REER CELIAPP CELI, calculateur hypothèque québec, budget mensuel, impôt québec canada 2026, finances personnelles, liberté financière, investissement débutant" url="https://finivo.ca" structuredData={generateOrganizationStructuredData()} />
      <Header />
      
      {/* Hero Section - MindMarket Style */}
      <section className="relative overflow-hidden section-cream">
        {/* Decorative background shapes */}
        <div className="absolute inset-0 overflow-hidden">
          {/* Large blob on the right */}
          <div className="absolute -right-20 top-0 w-[60%] h-full bg-gradient-to-bl from-primary/20 via-accent/10 to-transparent rounded-l-[100px]" />
          {/* Small decorative circles */}
          <div className="absolute top-20 left-[10%] w-16 h-16 bg-accent/20 rounded-full blur-sm animate-float" />
          <div className="absolute top-40 left-[20%] w-8 h-8 bg-warning/30 rounded-full animate-float" style={{ animationDelay: '1s' }} />
          <div className="absolute bottom-32 left-[15%] w-12 h-12 bg-primary/20 rounded-full animate-float" style={{ animationDelay: '2s' }} />
          <div className="absolute top-32 right-[40%] w-6 h-6 bg-success/30 rounded-full animate-float" style={{ animationDelay: '0.5s' }} />
        </div>

        <div className="container mx-auto px-4 py-16 lg:py-24 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-8 items-center">
            {/* Left content */}
            <div className="max-w-xl">
              <div className="inline-flex items-center gap-2 bg-primary/15 text-primary px-4 py-2 rounded-full text-sm font-semibold mb-6">
                <Star className="w-4 h-4 fill-primary" />
                Plateforme financière gratuite
              </div>
              
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-[1.1] mb-6 text-foreground">
                Comparez, calculez,
                <span className="block mt-2 text-primary">
                  et prospérez
                </span>
              </h1>
              
              <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                La plateforme complète pour les Québécois : comparez les <strong className="text-foreground">cartes de crédit</strong> et <strong className="text-foreground">plateformes de courtage</strong>, 
                planifiez avec nos <strong className="text-foreground">calculateurs</strong>, et découvrez les meilleurs <strong className="text-foreground">livres sur la finance</strong>.
              </p>

              {/* Quick Links Pills */}
              <div className="flex flex-wrap gap-2 mb-8">
                {quickLinks.map((link, i) => (
                  <Link 
                    key={i} 
                    to={link.href} 
                    className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-card border border-border hover:border-primary hover:bg-primary/5 text-foreground text-sm font-medium transition-all hover:scale-105 shadow-sm"
                  >
                    <link.icon className="w-4 h-4 text-primary" />
                    {link.label}
                  </Link>
                ))}
              </div>

              <div className="flex flex-col sm:flex-row gap-4 mb-10">
                <Button asChild size="lg" className="btn-gradient text-lg h-14 px-8 gap-3 font-semibold group rounded-full">
                  <Link to="/comparateurs">
                    <Scale className="w-5 h-5 group-hover:scale-110 transition-transform" />
                    Voir les comparateurs
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </Button>
                <Button asChild variant="outline" size="lg" className="h-14 px-8 border-2 border-foreground/20 text-foreground hover:bg-foreground/5 font-semibold gap-3 text-lg rounded-full">
                  <Link to="/calculateurs">
                    <Calculator className="w-5 h-5" />
                    Calculateurs
                  </Link>
                </Button>
              </div>

              {/* Stats Row */}
              <div className="flex flex-wrap items-center gap-6 text-sm">
                {stats.map((stat, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <span className="text-2xl font-extrabold text-primary">{stat.value}</span>
                    <span className="text-muted-foreground">{stat.label}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Right illustration */}
            <div className="relative hidden lg:flex items-center justify-center">
              <div className="relative w-full max-w-lg">
                {/* Main illustration */}
                <img 
                  src={DigitalSavingsIllustration} 
                  alt="Économies et finances personnelles" 
                  className="w-full h-auto drop-shadow-2xl animate-float"
                />
                
                {/* Floating decorative cards */}
                <div className="absolute -left-8 top-1/4 bg-card rounded-2xl p-4 shadow-lg border border-border animate-float" style={{ animationDelay: '0.5s' }}>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-success/20 flex items-center justify-center">
                      <TrendingUp className="w-5 h-5 text-success" />
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Rendement</p>
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
                      <p className="text-xs text-muted-foreground">Épargne CELIAPP</p>
                      <p className="font-bold text-foreground">8 000$/an</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Trust badges */}
          <div className="mt-16 pt-8 border-t border-border/50 flex flex-wrap items-center justify-center gap-8 text-muted-foreground text-sm">
            <div className="flex items-center gap-2">
              <Shield className="w-5 h-5 text-primary" />
              <span>100% indépendant</span>
            </div>
            <div className="flex items-center gap-2">
              <Zap className="w-5 h-5 text-accent" />
              <span>Données à jour</span>
            </div>
            <div className="flex items-center gap-2">
              <Users className="w-5 h-5 text-success" />
              <span>Gratuit pour tous</span>
            </div>
            <div className="flex items-center gap-2">
              <Target className="w-5 h-5 text-warning" />
              <span>Fait au Québec 🇨🇦</span>
            </div>
          </div>
        </div>
      </section>

      {/* Three Pillars Section */}
      <section className="py-20 lg:py-28 relative overflow-hidden">
        {/* Decorative background */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-accent/5 rounded-full blur-3xl" />
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
            <div>
              <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-semibold mb-4">
                <Star className="w-4 h-4 fill-primary" />
                Outils complets
              </div>
              <h2 className="text-3xl lg:text-5xl font-extrabold text-foreground mb-4">
                Tout pour gérer 
                <span className="text-primary"> vos finances</span>
              </h2>
              <p className="text-muted-foreground text-lg leading-relaxed">
                Une suite complète d'outils pour prendre le contrôle de votre santé financière et atteindre vos objectifs.
              </p>
            </div>
            <div className="hidden lg:flex justify-center">
              <img 
                src={CardsIllustration} 
                alt="Cartes de crédit illustration" 
                className="w-full max-w-sm drop-shadow-xl animate-float"
              />
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
            {pillars.map((pillar, index) => (
              <Link 
                key={index} 
                to={pillar.href} 
                className="group bg-card rounded-2xl p-6 border border-border hover:border-primary/30 hover:shadow-xl transition-all duration-300 hover:-translate-y-2"
              >
                <div className={`w-14 h-14 rounded-2xl ${pillar.color} flex items-center justify-center mb-5 group-hover:scale-110 transition-transform`}>
                  <pillar.icon className="w-7 h-7" />
                </div>
                <h3 className="text-lg font-bold text-foreground mb-2">{pillar.title}</h3>
                <p className="text-muted-foreground text-sm mb-4 line-clamp-2">{pillar.description}</p>
                <ul className="space-y-1.5 mb-5">
                  {pillar.features.map((feature, i) => (
                    <li key={i} className="flex items-center gap-2 text-xs text-muted-foreground">
                      <CheckCircle className="w-3.5 h-3.5 text-success flex-shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>
                <div className="flex items-center gap-2 text-primary font-semibold text-sm group-hover:gap-3 transition-all">
                  Explorer
                  <ArrowRight className="w-4 h-4" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Calculators Preview Section */}
      <section className="py-20 lg:py-28 section-cream relative overflow-hidden">
        {/* Decorative shapes */}
        <div className="absolute top-20 left-10 w-20 h-20 bg-warning/20 rounded-full animate-float" />
        <div className="absolute bottom-20 right-10 w-16 h-16 bg-primary/20 rounded-full animate-float" style={{ animationDelay: '1s' }} />
        <div className="absolute top-1/2 right-1/4 w-12 h-12 bg-accent/20 rounded-full animate-float" style={{ animationDelay: '2s' }} />
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left - Illustration */}
            <div className="hidden lg:flex justify-center order-2 lg:order-1">
              <img 
                src={GrowthGraphIllustration} 
                alt="Graphique de croissance financière" 
                className="w-full max-w-md drop-shadow-xl animate-float"
              />
            </div>
            
            {/* Right - Content */}
            <div className="order-1 lg:order-2">
              <div className="inline-flex items-center gap-2 bg-accent/15 text-accent px-4 py-2 rounded-full text-sm font-semibold mb-4">
                <Calculator className="w-4 h-4" />
                Calculateurs financiers
              </div>
              <h2 className="text-3xl lg:text-5xl font-extrabold text-foreground mb-4">
                Planifiez votre 
                <span className="text-accent"> avenir financier</span>
              </h2>
              <p className="text-muted-foreground text-lg mb-8 leading-relaxed">
                Des outils interactifs pour simuler vos investissements, votre épargne et optimiser vos finances.
              </p>

              <div className="grid sm:grid-cols-2 gap-3 mb-8">
                {calculators.slice(0, 6).map((calc, index) => (
                  <Link 
                    key={index} 
                    to={calc.href} 
                    className="flex items-center gap-3 p-3 bg-card rounded-xl border border-border hover:border-primary/50 hover:shadow-md transition-all group"
                  >
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors flex-shrink-0">
                      <calc.icon className="w-5 h-5 text-primary" />
                    </div>
                    <span className="font-medium text-foreground text-sm group-hover:text-primary transition-colors">
                      {calc.name}
                    </span>
                  </Link>
                ))}
              </div>

              <Button asChild size="lg" className="btn-gradient font-semibold gap-2 rounded-full">
                <Link to="/calculateurs">
                  Voir tous les calculateurs
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <Shield className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-lg font-bold text-foreground mb-2">100% Indépendant</h3>
              <p className="text-muted-foreground text-sm">
                Nos comparaisons et analyses sont objectives et transparentes.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 rounded-2xl bg-accent/10 flex items-center justify-center mx-auto mb-4">
                <Zap className="w-8 h-8 text-accent" />
              </div>
              <h3 className="text-lg font-bold text-foreground mb-2">Données en temps réel</h3>
              <p className="text-muted-foreground text-sm">
                Taux et informations mis à jour automatiquement.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 rounded-2xl bg-success/10 flex items-center justify-center mx-auto mb-4">
                <Star className="w-8 h-8 text-success" />
              </div>
              <h3 className="text-lg font-bold text-foreground mb-2">Gratuit pour toujours</h3>
              <p className="text-muted-foreground text-sm">
                Tous nos outils sont et resteront entièrement gratuits.
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>;
};
export default Landing;