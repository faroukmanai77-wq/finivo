import { 
  Plane, 
  ShoppingCart, 
  Fuel, 
  Utensils, 
  Building2, 
  Gift,
  Percent,
  CreditCard,
  ArrowRight
} from 'lucide-react';
import { Button } from '@/components/ui/button';

const categories = [
  {
    id: 'voyage',
    name: 'Voyage',
    description: 'Accumulez des points et miles pour vos prochaines aventures',
    icon: Plane,
    color: 'from-blue-500 to-cyan-500',
    bgColor: 'bg-blue-500/10',
    textColor: 'text-blue-500',
    cards: 12
  },
  {
    id: 'epicerie',
    name: 'Épicerie',
    description: 'Économisez sur vos achats alimentaires quotidiens',
    icon: ShoppingCart,
    color: 'from-green-500 to-emerald-500',
    bgColor: 'bg-green-500/10',
    textColor: 'text-green-500',
    cards: 8
  },
  {
    id: 'essence',
    name: 'Essence',
    description: 'Remises sur le carburant à chaque plein',
    icon: Fuel,
    color: 'from-orange-500 to-amber-500',
    bgColor: 'bg-orange-500/10',
    textColor: 'text-orange-500',
    cards: 6
  },
  {
    id: 'restaurants',
    name: 'Restaurants',
    description: 'Profitez de remises sur vos sorties au restaurant',
    icon: Utensils,
    color: 'from-red-500 to-pink-500',
    bgColor: 'bg-red-500/10',
    textColor: 'text-red-500',
    cards: 10
  },
  {
    id: 'affaires',
    name: 'Affaires',
    description: 'Cartes adaptées aux besoins des entreprises',
    icon: Building2,
    color: 'from-purple-500 to-violet-500',
    bgColor: 'bg-purple-500/10',
    textColor: 'text-purple-500',
    cards: 5
  },
  {
    id: 'cashback',
    name: 'Remises en argent',
    description: 'Recevez un pourcentage de vos achats en cash',
    icon: Percent,
    color: 'from-emerald-500 to-teal-500',
    bgColor: 'bg-emerald-500/10',
    textColor: 'text-emerald-500',
    cards: 15
  },
  {
    id: 'recompenses',
    name: 'Récompenses',
    description: 'Échangez vos points contre des cadeaux et expériences',
    icon: Gift,
    color: 'from-pink-500 to-rose-500',
    bgColor: 'bg-pink-500/10',
    textColor: 'text-pink-500',
    cards: 9
  },
  {
    id: 'sans-frais',
    name: 'Sans frais annuels',
    description: 'Cartes gratuites sans aucun frais annuel',
    icon: CreditCard,
    color: 'from-slate-500 to-gray-500',
    bgColor: 'bg-slate-500/10',
    textColor: 'text-slate-500',
    cards: 20
  }
];

export const CategoriesSection = () => {
  const scrollToCompare = (category: string) => {
    const element = document.getElementById('comparer');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="categories" className="py-20 lg:py-28 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-semibold mb-4">
            <ShoppingCart className="w-4 h-4" />
            Explorez par catégorie
          </div>
          <h2 className="text-3xl lg:text-4xl font-extrabold text-foreground mb-4">
            Trouvez la carte idéale pour vos besoins
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            Chaque catégorie regroupe les meilleures cartes optimisées pour un type de dépense spécifique.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((category, index) => {
            const Icon = category.icon;
            return (
              <button
                key={category.id}
                onClick={() => scrollToCompare(category.id)}
                className="group card-elevated p-6 text-left opacity-0 animate-fade-in hover:border-primary/30"
                style={{ animationDelay: `${index * 0.05}s`, animationFillMode: 'forwards' }}
              >
                <div className={`w-14 h-14 rounded-2xl ${category.bgColor} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                  <Icon className={`w-7 h-7 ${category.textColor}`} />
                </div>
                
                <h3 className="text-lg font-bold text-foreground mb-2 group-hover:text-primary transition-colors">
                  {category.name}
                </h3>
                
                <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                  {category.description}
                </p>
                
                <div className="flex items-center justify-between">
                  <span className="text-xs font-medium text-muted-foreground">
                    {category.cards} cartes
                  </span>
                  <ArrowRight className="w-4 h-4 text-primary opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                </div>
              </button>
            );
          })}
        </div>

        <div className="text-center mt-12">
          <Button 
            variant="outline" 
            size="lg" 
            className="font-semibold gap-2"
            onClick={() => scrollToCompare('')}
          >
            Voir toutes les cartes
            <ArrowRight className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </section>
  );
};
