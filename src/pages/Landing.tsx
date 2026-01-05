import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { SEO, generateOrganizationStructuredData } from '@/components/SEO';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { CreditCard, Calculator, BookOpen, ArrowRight, TrendingUp, PiggyBank, Scale, Receipt, Sparkles, ChevronDown, Star, Shield, Zap, CheckCircle, Building2, Library, Users, Target, Wallet, Home } from 'lucide-react';
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
    features: ['Guides pratiques', 'Actualités 2025', 'Conseils personnalisés']
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
      <SEO title="Finivo | Comparateur Cartes de Crédit, Courtage & Outils Financiers Québec 2025" description="Comparez les meilleures cartes de crédit et plateformes de courtage au Québec. Calculateurs REER, CELIAPP, impôts + bibliothèque de livres finance. 100% gratuit et indépendant." keywords="comparateur carte crédit québec, meilleur courtier canada, wealthsimple questrade comparatif, calculateur REER CELIAPP, outils financiers gratuits, finances personnelles québec, livres investissement, liberté financière canada" url="https://finivo.ca" structuredData={generateOrganizationStructuredData()} />
      <Header />
      
      {/* Hero Section */}
      <section className="relative overflow-hidden min-h-[90vh] flex items-center" style={{
      background: 'var(--gradient-hero)'
    }}>
        {/* Animated background */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-primary/20 rounded-full blur-[120px] animate-pulse-slow" />
          <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-accent/15 rounded-full blur-[100px] animate-pulse-slow" style={{
          animationDelay: '1.5s'
        }} />
          <div className="absolute top-1/2 right-1/3 w-[300px] h-[300px] bg-warning/10 rounded-full blur-[80px] animate-pulse-slow" style={{
          animationDelay: '2.5s'
        }} />
          <div className="absolute inset-0 opacity-[0.03]" style={{
          backgroundImage: 'linear-gradient(to right, white 1px, transparent 1px), linear-gradient(to bottom, white 1px, transparent 1px)',
          backgroundSize: '60px 60px'
        }} />
        </div>

        <div className="container mx-auto px-4 py-16 lg:py-20 relative z-10">
          <div className="text-center max-w-5xl mx-auto">
            <div className="inline-flex items-center gap-2 bg-primary/20 backdrop-blur-sm text-primary-foreground px-5 py-2.5 rounded-full text-sm font-semibold mb-6 border border-primary/30">
              <Sparkles className="w-4 h-4" />
              Plateforme financière 
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-extrabold leading-[1.1] mb-6 text-secondary-foreground">
              Comparez, calculez,
              <span className="block mt-2 bg-gradient-to-r from-primary via-blue-400 to-accent bg-clip-text text-transparent">
                atteignez la liberté financière
              </span>
            </h1>
            
            <p className="text-lg lg:text-xl text-secondary-foreground/70 mb-8 max-w-3xl mx-auto leading-relaxed">
              La plateforme complète pour les Québécois : comparez les <strong className="text-secondary-foreground">cartes de crédit</strong> et <strong className="text-secondary-foreground">plateformes de courtage</strong>, 
              planifiez votre épargne avec nos <strong className="text-secondary-foreground">calculateurs REER/CELIAPP</strong>, et découvrez les meilleurs <strong className="text-secondary-foreground">livres sur la finance</strong>.
            </p>

            {/* Quick Links */}
            <div className="flex flex-wrap justify-center gap-3 mb-8">
              {quickLinks.map((link, i) => <Link key={i} to={link.href} className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary-foreground/10 hover:bg-secondary-foreground/20 border border-secondary-foreground/20 text-secondary-foreground text-sm font-medium transition-all hover:scale-105">
                  <link.icon className="w-4 h-4" />
                  {link.label}
                </Link>)}
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Button asChild size="lg" className="btn-gradient text-lg h-14 px-8 gap-3 font-semibold group">
                <Link to="/comparateurs">
                  <Scale className="w-5 h-5 group-hover:scale-110 transition-transform" />
                  Voir les comparateurs
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="h-14 px-8 bg-secondary-foreground/10 border-secondary-foreground/20 text-secondary-foreground hover:bg-secondary-foreground/20 font-semibold gap-3 text-lg">
                <Link to="/calculateurs">
                  <Calculator className="w-5 h-5" />
                  Utiliser les calculateurs
                </Link>
              </Button>
            </div>

            {/* Stats */}
            <div className="mx-auto w-full max-w-2xl">
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {stats.map((stat, i) => <div key={i} className="bg-secondary-foreground/5 backdrop-blur-sm rounded-xl p-4 border border-secondary-foreground/10 opacity-0 animate-scale-in" style={{
                animationDelay: `${0.4 + i * 0.1}s`,
                animationFillMode: 'forwards'
              }}>
                    <p className="text-2xl lg:text-3xl font-extrabold text-secondary-foreground">{stat.value}</p>
                    <p className="text-xs text-secondary-foreground/60 font-medium mt-1">{stat.label}</p>
                  </div>)}
              </div>
            </div>

            {/* Trust badges */}
            <div className="mt-10 flex flex-wrap items-center justify-center gap-6 text-secondary-foreground/50 text-sm">
              <div className="flex items-center gap-2 text-primary">
                <Shield className="w-4 h-4" />
                <span>100% indépendant</span>
              </div>
              <div className="flex items-center gap-2">
                <Zap className="w-4 h-4" />
                <span>Données à jour</span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4" />
                <span>Gratuit pour tous</span>
              </div>
              <div className="flex items-center gap-2">
                <Target className="w-4 h-4 text-sidebar-primary" />
                <span>Fait au Québec</span>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 hidden lg:flex flex-col items-center gap-2 text-secondary-foreground/40">
          <span className="text-xs font-medium">Découvrir nos outils</span>
          <ChevronDown className="w-5 h-5 animate-bounce" />
        </div>
      </section>

      {/* Three Pillars Section */}
      <section className="py-20 lg:py-28">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-extrabold text-foreground mb-4">
              Tout pour gérer vos finances
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
              Une suite complète d'outils pour prendre le contrôle de votre santé financière.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
            {pillars.map((pillar, index) => <Link key={index} to={pillar.href} className="group card-elevated rounded-2xl p-8 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                <div className={`w-16 h-16 rounded-2xl ${pillar.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                  <pillar.icon className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold text-foreground mb-3">{pillar.title}</h3>
                <p className="text-muted-foreground mb-6">{pillar.description}</p>
                <ul className="space-y-2 mb-6">
                  {pillar.features.map((feature, i) => <li key={i} className="flex items-center gap-2 text-sm text-muted-foreground">
                      <CheckCircle className="w-4 h-4 text-success" />
                      {feature}
                    </li>)}
                </ul>
                <div className="flex items-center gap-2 text-primary font-semibold group-hover:gap-3 transition-all">
                  Explorer
                  <ArrowRight className="w-4 h-4" />
                </div>
              </Link>)}
          </div>
        </div>
      </section>

      {/* Calculators Preview Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-accent/10 text-accent px-4 py-2 rounded-full text-sm font-semibold mb-4">
              <Calculator className="w-4 h-4" />
              Calculateurs financiers
            </div>
            <h2 className="text-3xl lg:text-4xl font-extrabold text-foreground mb-4">
              Planifiez votre avenir financier
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
              Des outils interactifs pour simuler vos investissements, votre épargne et vos dettes.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {calculators.map((calc, index) => <Link key={index} to={calc.href} className="flex items-center gap-4 p-4 bg-card rounded-xl border border-border hover:border-primary/50 hover:shadow-md transition-all group">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                  <calc.icon className="w-6 h-6 text-primary" />
                </div>
                <span className="font-medium text-foreground group-hover:text-primary transition-colors">
                  {calc.name}
                </span>
                <ArrowRight className="w-4 h-4 text-muted-foreground ml-auto group-hover:text-primary group-hover:translate-x-1 transition-all" />
              </Link>)}
          </div>

          <div className="text-center mt-10">
            <Button asChild size="lg" className="btn-gradient font-semibold gap-2">
              <Link to="/calculateurs">
                Voir tous les calculateurs
                <ArrowRight className="w-4 h-4" />
              </Link>
            </Button>
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