import { 
  Search, 
  CheckCircle2, 
  FileText, 
  CreditCard,
  ArrowRight,
  Shield,
  Clock,
  ThumbsUp
} from 'lucide-react';
import { Button } from '@/components/ui/button';

const steps = [
  {
    number: '01',
    title: 'Comparez les offres',
    description: 'Utilisez nos filtres pour trouver les cartes qui correspondent à vos habitudes de dépenses et vos objectifs.',
    icon: Search,
    color: 'from-primary to-blue-400'
  },
  {
    number: '02',
    title: 'Analysez les avantages',
    description: 'Examinez les taux de remise, bonus de bienvenue, frais annuels et avantages de chaque carte.',
    icon: CheckCircle2,
    color: 'from-accent to-emerald-400'
  },
  {
    number: '03',
    title: 'Faites votre demande',
    description: 'Cliquez sur le lien d\'application pour être redirigé vers le site officiel de l\'émetteur.',
    icon: FileText,
    color: 'from-warning to-amber-400'
  },
  {
    number: '04',
    title: 'Profitez de vos avantages',
    description: 'Une fois approuvé, commencez à accumuler des récompenses sur tous vos achats.',
    icon: CreditCard,
    color: 'from-purple-500 to-pink-400'
  }
];

const benefits = [
  {
    icon: Shield,
    title: 'Comparaison impartiale',
    description: 'Nous présentons toutes les cartes de manière objective'
  },
  {
    icon: Clock,
    title: 'Données à jour',
    description: 'Taux et offres actualisés en temps réel'
  },
  {
    icon: ThumbsUp,
    title: '100% gratuit',
    description: 'Notre service est entièrement gratuit pour vous'
  }
];

export const GuideSection = () => {
  const scrollToCompare = () => {
    document.getElementById('comparer')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="guide" className="py-20 lg:py-28">
      <div className="container mx-auto px-4">
        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-2 bg-accent/10 text-accent px-4 py-2 rounded-full text-sm font-semibold mb-4">
            <FileText className="w-4 h-4" />
            Guide pratique
          </div>
          <h2 className="text-3xl lg:text-4xl font-extrabold text-foreground mb-4">
            Comment choisir votre carte?
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            Suivez ces étapes simples pour trouver et obtenir la carte de crédit parfaite pour vos besoins.
          </p>
        </div>

        {/* Steps */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <div 
                key={step.number}
                className="relative opacity-0 animate-slide-up"
                style={{ 
                  animationDelay: `${index * 0.2}s`, 
                  animationFillMode: 'forwards',
                  animationDuration: '0.6s'
                }}
              >
                {/* Connector line */}
                {index < steps.length - 1 && (
                  <div 
                    className="hidden lg:block absolute top-12 left-[60%] w-[80%] h-0.5 bg-gradient-to-r from-border to-transparent opacity-0 animate-fade-in"
                    style={{ 
                      animationDelay: `${(index + 1) * 0.2 + 0.3}s`, 
                      animationFillMode: 'forwards' 
                    }}
                  />
                )}
                
                <div className="bg-card rounded-xl p-6 h-full shadow-[var(--shadow-card)] hover:shadow-[0_8px_30px_-5px_hsl(var(--primary)/0.25),0_0_20px_-5px_hsl(var(--primary)/0.15)] hover:-translate-y-2 hover:scale-[1.02] transition-all duration-300">
                  <div 
                    className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${step.color} flex items-center justify-center mb-5 shadow-lg opacity-0 animate-scale-in`}
                    style={{ 
                      animationDelay: `${index * 0.2 + 0.15}s`, 
                      animationFillMode: 'forwards' 
                    }}
                  >
                    <Icon className="w-7 h-7 text-primary-foreground" />
                  </div>
                  
                  <span className="text-5xl font-extrabold text-muted/30 absolute top-4 right-6">
                    {step.number}
                  </span>
                  
                  <h3 className="text-lg font-bold text-foreground mb-3">
                    {step.title}
                  </h3>
                  
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Benefits */}
        <div className="card-elevated rounded-2xl overflow-hidden">
          <div className="grid lg:grid-cols-2">
            {/* Left side - Content */}
            <div className="p-8 lg:p-12">
              <h3 className="text-2xl lg:text-3xl font-bold text-foreground mb-6">
                Pourquoi utiliser ComparCartes?
              </h3>
              
              <div className="space-y-6 mb-8">
                {benefits.map((benefit, index) => {
                  const Icon = benefit.icon;
                  return (
                    <div key={index} className="flex gap-4">
                      <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <Icon className="w-6 h-6 text-primary" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-foreground mb-1">{benefit.title}</h4>
                        <p className="text-sm text-muted-foreground">{benefit.description}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
              
              <Button 
                className="btn-gradient font-semibold gap-2"
                onClick={scrollToCompare}
              >
                Commencer la comparaison
                <ArrowRight className="w-4 h-4" />
              </Button>
            </div>
            
            {/* Right side - Visual */}
            <div className="hidden lg:block relative overflow-hidden" style={{ background: 'var(--gradient-hero)' }}>
              <div className="absolute inset-0">
                <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-primary/20 rounded-full blur-[80px]" />
                <div className="absolute bottom-1/4 right-1/4 w-48 h-48 bg-accent/20 rounded-full blur-[60px]" />
              </div>
              
              <div className="relative h-full flex items-center justify-center p-12">
                {/* Floating cards illustration */}
                <div className="relative" style={{ perspective: '1000px' }}>
                  <div 
                    className="w-64 h-40 rounded-xl bg-gradient-to-br from-primary to-blue-400 shadow-2xl animate-float"
                    style={{ transform: 'rotateY(-10deg) rotateX(5deg)' }}
                  >
                    <div className="p-5">
                      <div className="w-10 h-7 rounded bg-yellow-400/80 mb-4" />
                      <div className="space-y-2">
                        <div className="h-2 w-3/4 rounded bg-primary-foreground/30" />
                        <div className="h-2 w-1/2 rounded bg-primary-foreground/20" />
                      </div>
                    </div>
                  </div>
                  
                  <div 
                    className="absolute -bottom-8 -right-8 w-64 h-40 rounded-xl bg-gradient-to-br from-accent to-emerald-400 shadow-2xl animate-float"
                    style={{ animationDelay: '1s', transform: 'rotateY(10deg) rotateX(-5deg)' }}
                  >
                    <div className="p-5">
                      <div className="w-10 h-7 rounded bg-yellow-400/80 mb-4" />
                      <div className="space-y-2">
                        <div className="h-2 w-3/4 rounded bg-accent-foreground/30" />
                        <div className="h-2 w-1/2 rounded bg-accent-foreground/20" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
