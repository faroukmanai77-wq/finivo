import { CreditCard as CreditCardIcon, Search, TrendingUp, Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';
import creditCardHero from '@/assets/credit-card-hero.png';

export const Hero = () => {
  return (
    <section className="relative bg-gradient-to-br from-secondary via-secondary/95 to-secondary/90 text-secondary-foreground overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: 'radial-gradient(circle at 1px 1px, currentColor 1px, transparent 0)',
          backgroundSize: '40px 40px'
        }} />
      </div>

      <div className="container mx-auto px-4 py-16 lg:py-24">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="relative z-10">
            <div className="inline-flex items-center gap-2 bg-primary/20 text-primary-foreground px-4 py-2 rounded-full text-sm font-medium mb-6">
              <TrendingUp className="w-4 h-4" />
              Comparez et économisez au Québec
            </div>
            
            <h1 className="text-4xl lg:text-5xl xl:text-6xl font-bold leading-tight mb-6">
              Trouvez la meilleure
              <span className="text-primary block">carte de crédit</span>
              pour vous
            </h1>
            
            <p className="text-lg text-secondary-foreground/80 mb-8 max-w-xl">
              Comparez les meilleures cartes de crédit au Québec. Taux à jour, bonus de bienvenue, 
              et conseils personnalisés pour maximiser vos récompenses.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" className="gap-2">
                <Search className="w-5 h-5" />
                Comparer les cartes
              </Button>
              <Button variant="outline" size="lg" className="bg-secondary-foreground/10 border-secondary-foreground/20 text-secondary-foreground hover:bg-secondary-foreground/20">
                <Shield className="w-5 h-5 mr-2" />
                Comment ça marche
              </Button>
            </div>

            <div className="flex items-center gap-8 mt-10 pt-8 border-t border-secondary-foreground/20">
              <div>
                <p className="text-3xl font-bold">50+</p>
                <p className="text-sm text-secondary-foreground/70">Cartes comparées</p>
              </div>
              <div>
                <p className="text-3xl font-bold">2025</p>
                <p className="text-sm text-secondary-foreground/70">Taux à jour</p>
              </div>
              <div>
                <p className="text-3xl font-bold">100%</p>
                <p className="text-sm text-secondary-foreground/70">Gratuit</p>
              </div>
            </div>
          </div>

          <div className="relative hidden lg:block">
            <div className="relative z-10">
              <img 
                src={creditCardHero} 
                alt="Carte de crédit" 
                className="w-full max-w-md mx-auto drop-shadow-2xl transform hover:scale-105 transition-transform duration-500"
              />
            </div>
            {/* Decorative elements */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-primary/20 rounded-full blur-3xl" />
            <div className="absolute top-1/4 right-0 w-32 h-32 bg-primary/30 rounded-full blur-2xl" />
          </div>
        </div>
      </div>
    </section>
  );
};
