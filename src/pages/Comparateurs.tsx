import { Link } from 'react-router-dom';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { SEO } from '@/components/SEO';
import { CreditCard, Building2, ArrowRight, Scale } from 'lucide-react';
const Comparateurs = () => {
  const comparators = [{
    icon: CreditCard,
    title: 'Cartes de crédit',
    description: 'Comparez les meilleures cartes de crédit au Canada. Trouvez celle qui offre les meilleurs avantages selon vos habitudes de dépenses.',
    href: '/comparateurs/cartes-de-credit',
    color: 'bg-primary/10 text-primary'
  }, {
    icon: Building2,
    title: 'Plateformes de courtage',
    description: 'Comparez les courtiers en ligne au Canada. Trouvez la meilleure plateforme pour investir selon vos besoins : frais, CELI, REER, ETF.',
    href: '/comparateurs/courtage',
    color: 'bg-accent/10 text-accent'
  }];
  return <div className="min-h-screen bg-background">
      <SEO title="Comparateurs Financiers | Cartes de Crédit & Courtage | Finivo" description="Comparez les meilleures cartes de crédit et plateformes de courtage au Canada. Outils de comparaison gratuits pour faire les meilleurs choix financiers." keywords="comparateur cartes de crédit, comparateur courtage, courtier en ligne canada, meilleure carte de crédit" url="https://finivo.ca/comparateurs" />
      <Header />
      
      {/* Hero Section */}
      <section className="py-12 lg:py-16 bg-secondary-foreground">
        <div className="container mx-auto px-4">
          <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
            <Link to="/" className="hover:text-foreground transition-colors">Accueil</Link>
            <span>/</span>
            <span className="text-muted">Comparateurs</span>
          </nav>

          <div className="text-center max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold mb-4 text-destructive-foreground bg-[#b1b148]">
              <Scale className="w-4 h-4" />
              2 comparateurs
            </div>
            <h1 className="text-3xl lg:text-4xl font-extrabold mb-4 text-sidebar-foreground">
              Comparateurs financiers
            </h1>
            <p className="text-lg text-secondary">
              Des outils de comparaison pour vous aider à choisir les meilleurs produits financiers 
              adaptés à vos besoins.
            </p>
          </div>
        </div>
      </section>

      {/* Comparators Grid */}
      <section className="py-12 lg:py-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {comparators.map((comp, index) => <Link key={index} to={comp.href} className="group card-elevated rounded-2xl p-8 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                <div className={`w-16 h-16 rounded-xl ${comp.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                  <comp.icon className="w-8 h-8" />
                </div>
                
                <h2 className="text-2xl font-bold text-foreground mb-3 group-hover:text-primary transition-colors">
                  {comp.title}
                </h2>
                <p className="text-muted-foreground mb-6">
                  {comp.description}
                </p>
                
                <div className="flex items-center gap-2 text-primary font-semibold group-hover:gap-3 transition-all">
                  Comparer
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
              Besoin de calculer vos finances?
            </h2>
            <p className="text-muted-foreground mb-6">
              Utilisez nos calculateurs gratuits pour simuler vos investissements, planifier votre épargne et gérer vos dettes.
            </p>
            <Link to="/calculateurs" className="inline-flex items-center gap-2 btn-gradient px-6 py-3 rounded-lg font-semibold text-primary-foreground">
              Voir les calculateurs
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>;
};
export default Comparateurs;