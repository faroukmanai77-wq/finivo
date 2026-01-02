import { useState, useMemo, useEffect } from 'react';
import { Header } from '@/components/Header';
import { FilterSidebar } from '@/components/FilterSidebar';
import { CreditCardItem } from '@/components/CreditCardItem';
import { SortSelect } from '@/components/SortSelect';
import { CreditCardSkeleton } from '@/components/CreditCardSkeleton';
import { Footer } from '@/components/Footer';
import { SEO, generateOrganizationStructuredData, generateBreadcrumbStructuredData } from '@/components/SEO';
import { FilterState, CreditCard, CardCategory } from '@/types/creditCard';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Filter, CreditCard as CreditCardIcon, Sparkles } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { Link } from 'react-router-dom';
const CreditCardComparator = () => {
  const [creditCards, setCreditCards] = useState<CreditCard[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const {
    toast
  } = useToast();
  const [filters, setFilters] = useState<FilterState>({
    categories: [],
    maxAnnualFee: null,
    minCashback: null,
    noAnnualFee: false,
    hasWelcomeBonus: false,
    sortBy: 'rating'
  });

  // Listen for category filter events
  useEffect(() => {
    const handleCategoryFilter = (e: CustomEvent<string>) => {
      setFilters(prev => ({
        ...prev,
        categories: [e.detail as CardCategory]
      }));
    };
    window.addEventListener('setCategoryFilter', handleCategoryFilter as EventListener);
    return () => {
      window.removeEventListener('setCategoryFilter', handleCategoryFilter as EventListener);
    };
  }, []);

  // Fetch credit cards from database
  useEffect(() => {
    const fetchCreditCards = async () => {
      try {
        const {
          data,
          error
        } = await supabase.from('credit_cards').select('*').eq('is_active', true);
        if (error) throw error;
        const mappedCards: CreditCard[] = (data || []).map(card => ({
          id: card.id,
          slug: card.slug || card.id,
          name: card.name,
          issuer: card.issuer,
          image: card.image_url || '',
          annualFee: Number(card.annual_fee),
          firstYearFreeAnnualFee: card.first_year_free || false,
          interestRate: Number(card.interest_rate),
          cashAdvanceRate: Number(card.cash_advance_rate),
          rewardsRate: Number(card.rewards_rate),
          rewardsType: card.rewards_type as 'cashback' | 'points' | 'miles',
          welcomeBonus: card.welcome_bonus || undefined,
          welcomeBonusValue: card.welcome_bonus_value ? Number(card.welcome_bonus_value) : undefined,
          minIncome: card.min_income ? Number(card.min_income) : undefined,
          features: card.features || [],
          categories: (card.categories || []) as CardCategory[],
          affiliateLink: card.affiliate_link,
          rating: Number(card.rating),
          lastUpdated: card.updated_at
        }));
        setCreditCards(mappedCards);
      } catch (error) {
        console.error('Error fetching credit cards:', error);
        toast({
          title: "Erreur",
          description: "Impossible de charger les cartes de crédit",
          variant: "destructive"
        });
      } finally {
        setIsLoading(false);
      }
    };
    fetchCreditCards();

    // Subscribe to realtime updates
    const channel = supabase.channel('credit-cards-changes').on('postgres_changes', {
      event: '*',
      schema: 'public',
      table: 'credit_cards'
    }, payload => {
      if (payload.eventType === 'INSERT' && payload.new.is_active) {
        const newCard = payload.new;
        setCreditCards(prev => [...prev, {
          id: newCard.id,
          slug: newCard.slug || newCard.id,
          name: newCard.name,
          issuer: newCard.issuer,
          image: newCard.image_url || '',
          annualFee: Number(newCard.annual_fee),
          firstYearFreeAnnualFee: newCard.first_year_free || false,
          interestRate: Number(newCard.interest_rate),
          cashAdvanceRate: Number(newCard.cash_advance_rate),
          rewardsRate: Number(newCard.rewards_rate),
          rewardsType: newCard.rewards_type as 'cashback' | 'points' | 'miles',
          welcomeBonus: newCard.welcome_bonus || undefined,
          welcomeBonusValue: newCard.welcome_bonus_value ? Number(newCard.welcome_bonus_value) : undefined,
          minIncome: newCard.min_income ? Number(newCard.min_income) : undefined,
          features: newCard.features || [],
          categories: (newCard.categories || []) as CardCategory[],
          affiliateLink: newCard.affiliate_link,
          rating: Number(newCard.rating),
          lastUpdated: newCard.updated_at
        }]);
        toast({
          title: "Nouvelle carte ajoutée",
          description: `${newCard.name} a été ajoutée`
        });
      } else if (payload.eventType === 'UPDATE') {
        const updatedCard = payload.new;
        setCreditCards(prev => prev.map(card => card.id === updatedCard.id ? {
          id: updatedCard.id,
          slug: updatedCard.slug || updatedCard.id,
          name: updatedCard.name,
          issuer: updatedCard.issuer,
          image: updatedCard.image_url || '',
          annualFee: Number(updatedCard.annual_fee),
          firstYearFreeAnnualFee: updatedCard.first_year_free || false,
          interestRate: Number(updatedCard.interest_rate),
          cashAdvanceRate: Number(updatedCard.cash_advance_rate),
          rewardsRate: Number(updatedCard.rewards_rate),
          rewardsType: updatedCard.rewards_type as 'cashback' | 'points' | 'miles',
          welcomeBonus: updatedCard.welcome_bonus || undefined,
          welcomeBonusValue: updatedCard.welcome_bonus_value ? Number(updatedCard.welcome_bonus_value) : undefined,
          minIncome: updatedCard.min_income ? Number(updatedCard.min_income) : undefined,
          features: updatedCard.features || [],
          categories: (updatedCard.categories || []) as CardCategory[],
          affiliateLink: updatedCard.affiliate_link,
          rating: Number(updatedCard.rating),
          lastUpdated: updatedCard.updated_at
        } : card).filter(card => card.id !== updatedCard.id || updatedCard.is_active));
      } else if (payload.eventType === 'DELETE') {
        setCreditCards(prev => prev.filter(card => card.id !== payload.old.id));
      }
    }).subscribe();
    return () => {
      supabase.removeChannel(channel);
    };
  }, [toast]);
  const filteredCards = useMemo(() => {
    let result = [...creditCards];
    if (filters.categories.length > 0) {
      result = result.filter(card => filters.categories.some(cat => card.categories.includes(cat)));
    }
    if (filters.noAnnualFee) {
      result = result.filter(card => card.annualFee === 0);
    }
    if (filters.hasWelcomeBonus) {
      result = result.filter(card => card.welcomeBonus);
    }
    if (filters.maxAnnualFee !== null) {
      result = result.filter(card => card.annualFee <= filters.maxAnnualFee!);
    }
    if (filters.minCashback !== null) {
      result = result.filter(card => card.rewardsRate >= filters.minCashback!);
    }
    switch (filters.sortBy) {
      case 'rating':
        result.sort((a, b) => b.rating - a.rating);
        break;
      case 'annualFee':
        result.sort((a, b) => a.annualFee - b.annualFee);
        break;
      case 'rewardsRate':
        result.sort((a, b) => b.rewardsRate - a.rewardsRate);
        break;
      case 'interestRate':
        result.sort((a, b) => a.interestRate - b.interestRate);
        break;
    }
    return result;
  }, [filters, creditCards]);
  const breadcrumbs = [{
    name: 'Accueil',
    url: 'https://finivo.ca'
  }, {
    name: 'Comparateurs',
    url: 'https://finivo.ca/comparateurs'
  }, {
    name: 'Cartes de crédit',
    url: 'https://finivo.ca/comparateurs/cartes-de-credit'
  }];
  const categories = [{
    id: 'cashback',
    label: 'Remises en argent',
    icon: '💰'
  }, {
    id: 'travel',
    label: 'Voyage',
    icon: '✈️'
  }, {
    id: 'no-fee',
    label: 'Sans frais',
    icon: '🆓'
  }, {
    id: 'student',
    label: 'Étudiants',
    icon: '🎓'
  }, {
    id: 'premium',
    label: 'Premium',
    icon: '⭐'
  }, {
    id: 'low-interest',
    label: 'Faible taux',
    icon: '📉'
  }];
  return <div className="min-h-screen bg-background">
      <SEO title="Comparateur de Cartes de Crédit au Québec 2025 | Finivo" description="Comparez plus de 30 cartes de crédit au Québec. Trouvez la meilleure carte selon vos besoins: remise en argent, voyage, sans frais annuels, étudiants. Comparaison gratuite et indépendante." keywords="comparateur carte de crédit, meilleure carte de crédit Québec, carte de crédit remise en argent, carte de crédit voyage Canada, carte de crédit sans frais, carte de crédit étudiant" url="https://finivo.ca/comparateurs/cartes-de-credit" structuredData={generateBreadcrumbStructuredData(breadcrumbs)} />
      <Header />
      
      {/* Hero Section */}
      <section className="bg-secondary py-12 lg:py-16">
        <div className="container mx-auto px-4">
          {/* Breadcrumbs */}
          <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
            <Link to="/" className="hover:text-foreground transition-colors">Accueil</Link>
            <span>/</span>
            <span>Comparateurs</span>
            <span>/</span>
            <span className="text-foreground">Cartes de crédit</span>
          </nav>

          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            <div>
              <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-semibold mb-4">
                <CreditCardIcon className="w-4 h-4" />
                Comparateur 2025
              </div>
              <h1 className="text-3xl lg:text-4xl font-extrabold mb-3 text-secondary-foreground">
                Comparez les cartes de crédit au Québec
              </h1>
              <p className="text-muted-foreground max-w-2xl text-lg">
                Trouvez la carte parfaite selon vos besoins. Tous les taux sont mis à jour en temps réel.
              </p>
            </div>
            <div className="flex gap-3">
              <Button className="btn-gradient font-semibold gap-2" onClick={() => document.getElementById('cards-list')?.scrollIntoView({
              behavior: 'smooth'
            })}>
                <Sparkles className="w-4 h-4" />
                Voir les cartes
              </Button>
            </div>
          </div>

          {/* Category quick filters */}
          <div className="flex flex-wrap gap-2 mt-8">
            {categories.map(cat => <button key={cat.id} onClick={() => setFilters(prev => ({
            ...prev,
            categories: prev.categories.includes(cat.id as CardCategory) ? prev.categories.filter(c => c !== cat.id) : [...prev.categories, cat.id as CardCategory]
          }))} className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${filters.categories.includes(cat.id as CardCategory) ? 'bg-primary text-primary-foreground' : 'bg-background hover:bg-muted'}`}>
                {cat.icon} {cat.label}
              </button>)}
          </div>
        </div>
      </section>

      {/* Comparison Section */}
      <section id="cards-list" className="py-12 lg:py-16">
        <div className="container mx-auto px-4">
          <div className="flex gap-8">
            {/* Desktop Sidebar */}
            <aside className="hidden lg:block w-80 flex-shrink-0">
              <FilterSidebar filters={filters} onFilterChange={setFilters} />
            </aside>

            {/* Main Content */}
            <div className="flex-1">
              {/* Mobile Filter Button */}
              <div className="lg:hidden mb-6">
                <Sheet>
                  <SheetTrigger asChild>
                    <Button variant="outline" className="w-full gap-2 h-12 font-semibold">
                      <Filter className="w-4 h-4" />
                      Filtres
                      {(filters.categories.length > 0 || filters.noAnnualFee || filters.hasWelcomeBonus) && <span className="ml-2 w-5 h-5 rounded-full bg-primary text-primary-foreground text-xs flex items-center justify-center">
                          {filters.categories.length + (filters.noAnnualFee ? 1 : 0) + (filters.hasWelcomeBonus ? 1 : 0)}
                        </span>}
                    </Button>
                  </SheetTrigger>
                  <SheetContent side="left" className="w-80 p-0 overflow-y-auto">
                    <div className="p-4">
                      <FilterSidebar filters={filters} onFilterChange={setFilters} />
                    </div>
                  </SheetContent>
                </Sheet>
              </div>

              <SortSelect value={filters.sortBy} onChange={value => setFilters({
              ...filters,
              sortBy: value
            })} totalCards={filteredCards.length} />

              {isLoading ? <div className="space-y-6">
                  {[...Array(3)].map((_, i) => <CreditCardSkeleton key={i} />)}
                </div> : <div className="space-y-6">
                  {filteredCards.map((card, index) => <CreditCardItem key={card.id} card={card} index={index} />)}

                  {filteredCards.length === 0 && <div className="text-center py-20 card-elevated rounded-2xl">
                      <div className="w-16 h-16 rounded-2xl bg-muted/50 flex items-center justify-center mx-auto mb-4">
                        <CreditCardIcon className="w-8 h-8 text-muted-foreground" />
                      </div>
                      <h3 className="text-lg font-semibold text-foreground mb-2">Aucune carte trouvée</h3>
                      <p className="text-muted-foreground">
                        Essayez d'ajuster les filtres pour voir plus de résultats.
                      </p>
                    </div>}
                </div>}
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>;
};
export default CreditCardComparator;