import { Link } from 'react-router-dom';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { SEO } from '@/components/SEO';
import { Calculator, TrendingUp, PiggyBank, Scale, Receipt, Building, ArrowRight, Sparkles } from 'lucide-react';
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
    description: 'Estimez votre impôt fédéral et provincial basé sur les tranches d\'imposition 2025.',
    href: '/calculateurs/impot',
    color: 'bg-red-100 text-red-600 dark:bg-red-900/20 dark:text-red-400',
    popular: false
  }];
  return <div className="min-h-screen bg-background">
      <SEO title="Calculateurs Financiers Gratuits | REER, CELIAPP, Dettes, Impôt | Finivo" description="Outils de calcul financier gratuits pour le Québec : intérêts composés, REER, CELIAPP, consolidation de dettes, valeur nette et impôt. Planifiez votre avenir financier." keywords="calculateur financier, calculateur REER, calculateur CELIAPP, consolidation dettes, calculateur impot quebec, valeur nette, intérêts composés" url="https://finivo.ca/calculateurs" />
      <Header />
      
      {/* Hero Section */}
      <section className="py-12 lg:py-16 bg-[#89a7d2]">
        <div className="container mx-auto px-4">
          <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
            <Link to="/" className="hover:text-foreground transition-colors">Accueil</Link>
            <span>/</span>
            <span className="text-muted">Calculateurs</span>
          </nav>

          <div className="text-center max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold mb-4 bg-secondary text-primary-foreground">
              <Calculator className="w-4 h-4 text-primary" />
              6 outils gratuits
            </div>
            <h1 className="text-3xl lg:text-4xl font-extrabold mb-4 text-secondary">
              Calculateurs financiers
            </h1>
            <p className="text-lg text-secondary">
              Des outils interactifs pour simuler vos investissements, planifier votre épargne 
              et gérer vos dettes efficacement.
            </p>
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