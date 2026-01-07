import { Link } from 'react-router-dom';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { SEO } from '@/components/SEO';
import { CreditCard, Building2, ArrowRight, Scale } from 'lucide-react';
import CardsIllustration from '@/assets/illustrations/cards.svg';
import MarketTrendsIllustration from '@/assets/illustrations/market-trends.svg';
import CryptoWealthIllustration from '@/assets/illustrations/crypto-wealth.gif';
const Comparateurs = () => {
  const comparators = [{
    icon: CreditCard,
    title: 'Cartes de crédit',
    description: 'Comparez les meilleures cartes de crédit au Canada. Trouvez celle qui offre les meilleurs avantages selon vos habitudes de dépenses.',
    href: '/comparateurs/cartes-de-credit',
    color: 'bg-primary/10 text-primary',
    illustration: CardsIllustration
  }, {
    icon: Building2,
    title: 'Plateformes de courtage',
    description: 'Comparez les courtiers en ligne au Canada. Trouvez la meilleure plateforme pour investir selon vos besoins : frais, CELI, REER, ETF.',
    href: '/comparateurs/courtage',
    color: 'bg-accent/10 text-accent',
    illustration: MarketTrendsIllustration
  }];
  return <div className="min-h-screen bg-background">
      <SEO title="Comparateurs Financiers | Cartes de Crédit & Courtage | Finivo" description="Comparez les meilleures cartes de crédit et plateformes de courtage au Canada. Outils de comparaison gratuits pour faire les meilleurs choix financiers." keywords="comparateur cartes de crédit, comparateur courtage, courtier en ligne canada, meilleure carte de crédit" url="https://finivo.ca/comparateurs" />
      <Header />
      
      {/* Hero Section */}
      <section className="py-16 lg:py-24 section-cream relative overflow-hidden">
        {/* Decorative shapes */}
        <div className="absolute top-20 right-10 w-24 h-24 bg-primary/10 rounded-full blur-2xl animate-float" />
        <div className="absolute bottom-20 left-10 w-32 h-32 bg-accent/10 rounded-full blur-3xl animate-float" style={{
        animationDelay: '1s'
      }} />
        <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-warning/10 rounded-full blur-xl animate-float" style={{
        animationDelay: '2s'
      }} />
        
        <div className="container mx-auto px-4 relative z-10">
          <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-8">
            <Link to="/" className="hover:text-foreground transition-colors">Accueil</Link>
            <span>/</span>
            <span className="text-primary">Comparateurs</span>
          </nav>

          <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-16">
            <div className="text-center lg:text-left max-w-2xl text-primary">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold mb-6 bg-primary/15 text-primary">
                <Scale className="w-4 h-4" />
                2 comparateurs disponibles
              </div>
              <h1 className="text-4xl lg:text-5xl font-extrabold mb-4 text-foreground">
                Comparateurs 
                <span className="text-primary"> financiers</span>
              </h1>
              <p className="text-lg text-muted-foreground">
                Des outils de comparaison gratuits pour vous aider à choisir les meilleurs produits financiers 
                adaptés à vos besoins.
              </p>
            </div>
            <div className="w-48 h-48 lg:w-64 lg:h-64 flex-shrink-0">
              <img 
                src={CryptoWealthIllustration} 
                alt="Illustration finance" 
                className="w-full h-full object-contain drop-shadow-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Comparators Grid */}
      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {comparators.map((comp, index) => <Link key={index} to={comp.href} className="group bg-card rounded-3xl p-8 border border-border hover:border-primary/30 hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 overflow-hidden relative">
                {/* Background illustration */}
                <div className="absolute -right-10 -bottom-10 w-48 h-48 opacity-10 group-hover:opacity-20 transition-opacity">
                  <img src={comp.illustration} alt="" className="w-full h-full object-contain" />
                </div>
                
                <div className="relative z-10">
                  <div className={`w-16 h-16 rounded-2xl ${comp.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                    <comp.icon className="w-8 h-8" />
                  </div>
                  
                  <h2 className="text-2xl font-bold text-foreground mb-3 group-hover:text-primary transition-colors">
                    {comp.title}
                  </h2>
                  <p className="text-muted-foreground mb-6">
                    {comp.description}
                  </p>
                  
                  <div className="flex items-center gap-2 text-primary font-semibold group-hover:gap-3 transition-all">
                    Comparer maintenant
                    <ArrowRight className="w-5 h-5" />
                  </div>
                </div>
                
                {/* Visible illustration on hover */}
                <div className="hidden lg:block absolute right-4 bottom-4 w-32 h-32 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-4 group-hover:translate-y-0">
                  <img src={comp.illustration} alt="" className="w-full h-full object-contain drop-shadow-lg" />
                </div>
              </Link>)}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 section-cream">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-2xl mx-auto">
            <h2 className="text-2xl lg:text-3xl font-bold text-foreground mb-4">
              Besoin de calculer vos finances?
            </h2>
            <p className="text-muted-foreground mb-8 text-lg">
              Utilisez nos calculateurs gratuits pour simuler vos investissements, planifier votre épargne et gérer vos dettes.
            </p>
            <Link to="/calculateurs" className="inline-flex items-center gap-2 btn-gradient px-8 py-4 rounded-full font-semibold text-primary-foreground text-lg group">
              Voir les calculateurs
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>;
};
export default Comparateurs;