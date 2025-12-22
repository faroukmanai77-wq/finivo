import { Search, TrendingUp, Shield, Sparkles, ChevronDown, Star, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';

export const Hero = () => {
  const scrollToCompare = () => {
    document.getElementById('comparer')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative overflow-hidden min-h-[90vh] flex items-center" style={{ background: 'var(--gradient-hero)' }}>
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Gradient orbs */}
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-primary/20 rounded-full blur-[120px] animate-pulse-slow" />
        <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-accent/15 rounded-full blur-[100px] animate-pulse-slow" style={{ animationDelay: '1.5s' }} />
        <div className="absolute top-1/2 right-0 w-[300px] h-[300px] bg-primary/10 rounded-full blur-[80px] animate-float" />
        
        {/* Animated particles */}
        <div className="absolute inset-0">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-primary/30 rounded-full animate-float"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 5}s`,
                animationDuration: `${4 + Math.random() * 4}s`
              }}
            />
          ))}
        </div>
        
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
            <div className="inline-flex items-center gap-2 bg-primary/20 backdrop-blur-sm text-primary-foreground px-5 py-2.5 rounded-full text-sm font-semibold mb-8 border border-primary/30 animate-pulse-slow">
              <Sparkles className="w-4 h-4" />
              Comparez et économisez au Québec
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-extrabold leading-[1.1] mb-6 text-secondary-foreground">
              Trouvez la
              <span className="block mt-2 bg-gradient-to-r from-primary via-blue-400 to-accent bg-clip-text text-transparent bg-[length:200%_auto] animate-shimmer">
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
                className="btn-gradient text-lg h-14 px-8 gap-3 font-semibold group"
                onClick={scrollToCompare}
              >
                <Search className="w-5 h-5 group-hover:scale-110 transition-transform" />
                Comparer les cartes
              </Button>
              <Button 
                variant="outline" 
                size="lg" 
                className="h-14 px-8 bg-secondary-foreground/10 border-secondary-foreground/20 text-secondary-foreground hover:bg-secondary-foreground/20 font-semibold gap-2 group"
              >
                <Shield className="w-5 h-5 group-hover:scale-110 transition-transform" />
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

          {/* 3D Card Stack */}
          <div className="relative hidden lg:flex justify-center items-center opacity-0 animate-scale-in" style={{ animationDelay: '0.3s', animationFillMode: 'forwards', perspective: '1000px' }}>
            <div className="relative w-full max-w-lg" style={{ transformStyle: 'preserve-3d' }}>
              {/* Glow effect */}
              <div className="absolute inset-0 bg-primary/40 rounded-3xl blur-[60px] scale-75 animate-pulse-slow" />
              
              {/* Back card */}
              <div 
                className="absolute top-8 left-8 w-[320px] h-[200px] rounded-2xl bg-gradient-to-br from-secondary/80 to-secondary shadow-2xl animate-float"
                style={{ 
                  animationDelay: '0.5s',
                  transform: 'rotateY(-5deg) rotateX(5deg) translateZ(-40px)'
                }}
              >
                <div className="absolute inset-0 rounded-2xl overflow-hidden">
                  <div className="absolute top-4 left-6 w-12 h-8 rounded bg-muted/30" />
                  <div className="absolute bottom-4 left-6 right-6">
                    <div className="h-3 w-3/4 rounded bg-muted/20 mb-2" />
                    <div className="h-3 w-1/2 rounded bg-muted/20" />
                  </div>
                </div>
              </div>
              
              {/* Middle card */}
              <div 
                className="absolute top-4 left-4 w-[320px] h-[200px] rounded-2xl bg-gradient-to-br from-muted to-muted/80 shadow-2xl animate-float"
                style={{ 
                  animationDelay: '0.25s',
                  transform: 'rotateY(-3deg) rotateX(3deg) translateZ(-20px)'
                }}
              >
                <div className="absolute inset-0 rounded-2xl overflow-hidden">
                  <div className="absolute top-4 left-6 w-12 h-8 rounded bg-secondary/30" />
                  <div className="absolute bottom-4 left-6 right-6">
                    <div className="h-3 w-3/4 rounded bg-secondary/20 mb-2" />
                    <div className="h-3 w-1/2 rounded bg-secondary/20" />
                  </div>
                </div>
              </div>
              
              {/* Main card */}
              <div 
                className="relative w-[320px] h-[200px] rounded-2xl shadow-2xl overflow-hidden animate-float group cursor-pointer transition-transform duration-500 hover:scale-105"
                style={{ 
                  background: 'linear-gradient(135deg, hsl(217 91% 60%), hsl(200 98% 50%))',
                  transform: 'rotateY(0deg) rotateX(0deg) translateZ(0)'
                }}
              >
                {/* Card shine effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                
                {/* Card content */}
                <div className="absolute inset-0 p-6">
                  {/* Chip */}
                  <div className="w-12 h-9 rounded-md bg-gradient-to-br from-yellow-300 to-yellow-500 mb-4 shadow-lg" />
                  
                  {/* Card number placeholder */}
                  <div className="flex gap-4 mb-4">
                    <div className="flex gap-1">
                      {[...Array(4)].map((_, i) => (
                        <div key={i} className="w-2 h-2 rounded-full bg-primary-foreground/80" />
                      ))}
                    </div>
                    <div className="flex gap-1">
                      {[...Array(4)].map((_, i) => (
                        <div key={i} className="w-2 h-2 rounded-full bg-primary-foreground/80" />
                      ))}
                    </div>
                    <div className="flex gap-1">
                      {[...Array(4)].map((_, i) => (
                        <div key={i} className="w-2 h-2 rounded-full bg-primary-foreground/80" />
                      ))}
                    </div>
                    <div className="text-primary-foreground font-mono text-sm">1234</div>
                  </div>
                  
                  {/* Card holder */}
                  <div className="flex justify-between items-end">
                    <div>
                      <p className="text-xs text-primary-foreground/60 uppercase tracking-wider mb-1">Titulaire</p>
                      <p className="text-primary-foreground font-semibold">VOTRE NOM</p>
                    </div>
                    <div className="text-right">
                      <p className="text-xs text-primary-foreground/60 uppercase tracking-wider mb-1">Expire</p>
                      <p className="text-primary-foreground font-semibold">12/28</p>
                    </div>
                  </div>
                </div>
                
                {/* Contactless icon */}
                <div className="absolute top-4 right-4">
                  <svg className="w-8 h-8 text-primary-foreground/80" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M6.5 12c.94-3.46 4.94-6 8.5-6" />
                    <path d="M6.5 6c2.98-2.5 8.98-2.5 12 0" />
                    <path d="M6.5 18c2.5-3 5.5-4.5 8.5-4.5" />
                  </svg>
                </div>
              </div>
              
              {/* Floating badges */}
              <div 
                className="absolute -top-4 -right-4 glass-card rounded-2xl p-4 animate-float shadow-xl"
                style={{ animationDelay: '1s' }}
              >
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
              
              <div 
                className="absolute -bottom-4 -left-4 glass-card rounded-2xl p-4 animate-float shadow-xl"
                style={{ animationDelay: '1.5s' }}
              >
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-warning/20 flex items-center justify-center">
                    <Star className="w-6 h-6 text-warning fill-warning" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Top carte</p>
                    <p className="text-xl font-bold text-foreground">4.9★</p>
                  </div>
                </div>
              </div>
              
              <div 
                className="absolute top-1/2 -right-8 glass-card rounded-2xl p-4 animate-float shadow-xl"
                style={{ animationDelay: '2s' }}
              >
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center">
                    <Zap className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Bonus</p>
                    <p className="text-xl font-bold text-foreground">250$</p>
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
