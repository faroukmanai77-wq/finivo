import { CreditCard as CreditCardIcon, Search, TrendingUp, Shield, Sparkles, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import creditCardHero from '@/assets/credit-card-hero.png';

export const Hero = () => {
  const scrollToCompare = () => {
    document.getElementById('comparer')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative overflow-hidden" style={{ background: 'var(--gradient-hero)' }}>
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-accent/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }} />
        <div className="absolute top-1/2 left-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl" />
        
        {/* Grid pattern */}
        <div className="absolute inset-0 opacity-[0.03]" style={{
          backgroundImage: 'linear-gradient(to right, white 1px, transparent 1px), linear-gradient(to bottom, white 1px, transparent 1px)',
          backgroundSize: '60px 60px'
        }} />
      </div>

      <div className="container mx-auto px-4 py-20 lg:py-28 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div className="opacity-0 animate-slide-up" style={{ animationDelay: '0.1s', animationFillMode: 'forwards' }}>
            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-primary/20 backdrop-blur-sm text-primary-foreground px-5 py-2.5 rounded-full text-sm font-semibold mb-8 border border-primary/30">
              <Sparkles className="w-4 h-4" />
              Comparez et économisez au Québec
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-extrabold leading-[1.1] mb-6 text-secondary-foreground">
              Trouvez la
              <span className="block mt-2 bg-gradient-to-r from-primary via-blue-400 to-primary bg-clip-text text-transparent">
                meilleure carte
              </span>
              <span className="block mt-2">pour vous</span>
            </h1>
            
            <p className="text-lg lg:text-xl text-secondary-foreground/70 mb-10 max-w-xl leading-relaxed">
              Comparez les meilleures cartes de crédit au Québec. Taux à jour en temps réel, 
              bonus de bienvenue, et conseils personnalisés.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 mb-12">
              <Button 
                size="lg" 
                className="btn-gradient text-lg h-14 px-8 gap-3 font-semibold"
                onClick={scrollToCompare}
              >
                <Search className="w-5 h-5" />
                Comparer les cartes
              </Button>
              <Button 
                variant="outline" 
                size="lg" 
                className="h-14 px-8 bg-secondary-foreground/10 border-secondary-foreground/20 text-secondary-foreground hover:bg-secondary-foreground/20 font-semibold gap-2"
              >
                <Shield className="w-5 h-5" />
                Comment ça marche
              </Button>
            </div>

            {/* Stats */}
            <div className="flex items-center gap-8 lg:gap-12">
              <div className="opacity-0 animate-scale-in" style={{ animationDelay: '0.4s', animationFillMode: 'forwards' }}>
                <p className="text-4xl lg:text-5xl font-extrabold text-secondary-foreground">50+</p>
                <p className="text-sm text-secondary-foreground/60 font-medium mt-1">Cartes comparées</p>
              </div>
              <div className="w-px h-12 bg-secondary-foreground/20" />
              <div className="opacity-0 animate-scale-in" style={{ animationDelay: '0.5s', animationFillMode: 'forwards' }}>
                <p className="text-4xl lg:text-5xl font-extrabold text-primary">Live</p>
                <p className="text-sm text-secondary-foreground/60 font-medium mt-1">Taux en temps réel</p>
              </div>
              <div className="w-px h-12 bg-secondary-foreground/20" />
              <div className="opacity-0 animate-scale-in" style={{ animationDelay: '0.6s', animationFillMode: 'forwards' }}>
                <p className="text-4xl lg:text-5xl font-extrabold text-accent">100%</p>
                <p className="text-sm text-secondary-foreground/60 font-medium mt-1">Gratuit</p>
              </div>
            </div>
          </div>

          {/* Hero image */}
          <div className="relative hidden lg:flex justify-center items-center opacity-0 animate-scale-in" style={{ animationDelay: '0.3s', animationFillMode: 'forwards' }}>
            <div className="relative">
              {/* Glow effect */}
              <div className="absolute inset-0 bg-primary/30 rounded-3xl blur-3xl scale-90" />
              
              {/* Main card image */}
              <img 
                src={creditCardHero} 
                alt="Carte de crédit" 
                className="relative z-10 w-full max-w-lg drop-shadow-2xl transform hover:scale-105 hover:-rotate-3 transition-all duration-700 animate-float"
              />
              
              {/* Floating elements */}
              <div className="absolute -top-8 -right-8 glass-card rounded-2xl p-4 animate-float" style={{ animationDelay: '1s' }}>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-accent/20 flex items-center justify-center">
                    <TrendingUp className="w-6 h-6 text-accent" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Remise max</p>
                    <p className="text-xl font-bold text-foreground">4%</p>
                  </div>
                </div>
              </div>
              
              <div className="absolute -bottom-4 -left-8 glass-card rounded-2xl p-4 animate-float" style={{ animationDelay: '2s' }}>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center">
                    <CreditCardIcon className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Sans frais</p>
                    <p className="text-xl font-bold text-foreground">0$</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 hidden lg:flex flex-col items-center gap-2 text-secondary-foreground/40">
          <span className="text-xs font-medium">Défiler</span>
          <ChevronDown className="w-5 h-5 animate-bounce" />
        </div>
      </div>
    </section>
  );
};
