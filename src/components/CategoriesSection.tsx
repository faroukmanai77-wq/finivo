import { useState, useEffect } from 'react';
import { 
  Plane, 
  ShoppingCart, 
  Fuel, 
  Utensils, 
  Building2, 
  Gift,
  Percent,
  CreditCard,
  ArrowRight,
  GraduationCap,
  Crown
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { supabase } from '@/integrations/supabase/client';

// Map database categories to display info
const categoryConfig: Record<string, {
  name: string;
  description: string;
  icon: typeof Plane;
  bgColor: string;
  textColor: string;
}> = {
  'travel': {
    name: 'Voyage',
    description: 'Accumulez des points et miles pour vos prochaines aventures',
    icon: Plane,
    bgColor: 'bg-blue-500/10',
    textColor: 'text-blue-500',
  },
  'grocery': {
    name: 'Épicerie',
    description: 'Économisez sur vos achats alimentaires quotidiens',
    icon: ShoppingCart,
    bgColor: 'bg-green-500/10',
    textColor: 'text-green-500',
  },
  'gas': {
    name: 'Essence',
    description: 'Remises sur le carburant à chaque plein',
    icon: Fuel,
    bgColor: 'bg-orange-500/10',
    textColor: 'text-orange-500',
  },
  'dining': {
    name: 'Restaurants',
    description: 'Profitez de remises sur vos sorties au restaurant',
    icon: Utensils,
    bgColor: 'bg-red-500/10',
    textColor: 'text-red-500',
  },
  'business': {
    name: 'Affaires',
    description: 'Cartes adaptées aux besoins des entreprises',
    icon: Building2,
    bgColor: 'bg-purple-500/10',
    textColor: 'text-purple-500',
  },
  'cashback': {
    name: 'Remises en argent',
    description: 'Recevez un pourcentage de vos achats en cash',
    icon: Percent,
    bgColor: 'bg-emerald-500/10',
    textColor: 'text-emerald-500',
  },
  'rewards': {
    name: 'Récompenses',
    description: 'Échangez vos points contre des cadeaux et expériences',
    icon: Gift,
    bgColor: 'bg-pink-500/10',
    textColor: 'text-pink-500',
  },
  'no-fee': {
    name: 'Sans frais annuels',
    description: 'Cartes gratuites sans aucun frais annuel',
    icon: CreditCard,
    bgColor: 'bg-slate-500/10',
    textColor: 'text-slate-500',
  },
  'student': {
    name: 'Étudiant',
    description: 'Cartes conçues pour les étudiants et jeunes adultes',
    icon: GraduationCap,
    bgColor: 'bg-indigo-500/10',
    textColor: 'text-indigo-500',
  },
  'premium': {
    name: 'Premium',
    description: 'Cartes haut de gamme avec avantages exclusifs',
    icon: Crown,
    bgColor: 'bg-amber-500/10',
    textColor: 'text-amber-500',
  }
};

interface CategoryCount {
  category: string;
  count: number;
}

export const CategoriesSection = () => {
  const [categoryCounts, setCategoryCounts] = useState<CategoryCount[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchCategoryCounts = async () => {
      try {
        const { data, error } = await supabase
          .from('credit_cards')
          .select('categories')
          .eq('is_active', true);

        if (error) throw error;

        // Count cards per category
        const counts: Record<string, number> = {};
        (data || []).forEach(card => {
          (card.categories || []).forEach((cat: string) => {
            counts[cat] = (counts[cat] || 0) + 1;
          });
        });

        const result = Object.entries(counts).map(([category, count]) => ({
          category,
          count
        })).sort((a, b) => b.count - a.count);

        setCategoryCounts(result);
      } catch (error) {
        console.error('Error fetching category counts:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCategoryCounts();
  }, []);

  const scrollToCompare = (category?: string) => {
    const element = document.getElementById('comparer');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      
      // Dispatch a custom event to set the filter
      if (category) {
        window.dispatchEvent(new CustomEvent('setCategoryFilter', { detail: category }));
      }
    }
  };

  // Filter to only show categories that have cards
  const displayCategories = categoryCounts
    .filter(({ category }) => categoryConfig[category])
    .map(({ category, count }) => ({
      id: category,
      ...categoryConfig[category],
      cards: count
    }));

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

        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="card-elevated p-6 animate-pulse">
                <div className="w-14 h-14 rounded-2xl bg-muted mb-4" />
                <div className="h-5 bg-muted rounded w-24 mb-2" />
                <div className="h-4 bg-muted rounded w-full mb-4" />
                <div className="h-3 bg-muted rounded w-16" />
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {displayCategories.map((category, index) => {
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
                      {category.cards} carte{category.cards > 1 ? 's' : ''}
                    </span>
                    <ArrowRight className="w-4 h-4 text-primary opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                  </div>
                </button>
              );
            })}
          </div>
        )}

        <div className="text-center mt-12">
          <Button 
            variant="outline" 
            size="lg" 
            className="font-semibold gap-2"
            onClick={() => scrollToCompare()}
          >
            Voir toutes les cartes
            <ArrowRight className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </section>
  );
};
