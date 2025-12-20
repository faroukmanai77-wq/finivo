import { useState, useMemo, useEffect } from 'react';
import { Header } from '@/components/Header';
import { Hero } from '@/components/Hero';
import { FilterSidebar } from '@/components/FilterSidebar';
import { CreditCardItem } from '@/components/CreditCardItem';
import { SortSelect } from '@/components/SortSelect';
import { FAQ } from '@/components/FAQ';
import { Footer } from '@/components/Footer';
import { FilterState, CreditCard, CardCategory } from '@/types/creditCard';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Filter, Loader2 } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

const Index = () => {
  const [creditCards, setCreditCards] = useState<CreditCard[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();
  
  const [filters, setFilters] = useState<FilterState>({
    categories: [],
    maxAnnualFee: null,
    minCashback: null,
    noAnnualFee: false,
    hasWelcomeBonus: false,
    sortBy: 'rating'
  });

  // Fetch credit cards from database
  useEffect(() => {
    const fetchCreditCards = async () => {
      try {
        const { data, error } = await supabase
          .from('credit_cards')
          .select('*')
          .eq('is_active', true);

        if (error) throw error;

        const mappedCards: CreditCard[] = (data || []).map((card) => ({
          id: card.id,
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
    const channel = supabase
      .channel('credit-cards-changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'credit_cards'
        },
        (payload) => {
          console.log('Credit card update received:', payload);
          
          if (payload.eventType === 'INSERT' && payload.new.is_active) {
            const newCard = payload.new;
            setCreditCards(prev => [...prev, {
              id: newCard.id,
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
            setCreditCards(prev => prev.map(card => 
              card.id === updatedCard.id 
                ? {
                    id: updatedCard.id,
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
                  }
                : card
            ).filter(card => card.id !== updatedCard.id || updatedCard.is_active));
            toast({
              title: "Carte mise à jour",
              description: `${updatedCard.name} a été mise à jour`
            });
          } else if (payload.eventType === 'DELETE') {
            setCreditCards(prev => prev.filter(card => card.id !== payload.old.id));
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [toast]);

  const filteredCards = useMemo(() => {
    let result = [...creditCards];

    // Filter by categories
    if (filters.categories.length > 0) {
      result = result.filter((card) =>
        filters.categories.some((cat) => card.categories.includes(cat))
      );
    }

    // Filter by no annual fee
    if (filters.noAnnualFee) {
      result = result.filter((card) => card.annualFee === 0);
    }

    // Filter by welcome bonus
    if (filters.hasWelcomeBonus) {
      result = result.filter((card) => card.welcomeBonus);
    }

    // Filter by max annual fee
    if (filters.maxAnnualFee !== null) {
      result = result.filter((card) => card.annualFee <= filters.maxAnnualFee!);
    }

    // Filter by min cashback
    if (filters.minCashback !== null) {
      result = result.filter((card) => card.rewardsRate >= filters.minCashback!);
    }

    // Sort
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

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <Hero />

      {/* Comparison Section */}
      <section id="comparer" className="py-12 lg:py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-foreground mb-3">
              Comparez les meilleures cartes
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Utilisez les filtres pour trouver la carte parfaite selon vos besoins. 
              Tous les taux sont mis à jour en temps réel.
            </p>
          </div>

          <div className="flex gap-8">
            {/* Desktop Sidebar */}
            <aside className="hidden lg:block w-72 flex-shrink-0">
              <FilterSidebar filters={filters} onFilterChange={setFilters} />
            </aside>

            {/* Main Content */}
            <div className="flex-1">
              {/* Mobile Filter Button */}
              <div className="lg:hidden mb-4">
                <Sheet>
                  <SheetTrigger asChild>
                    <Button variant="outline" className="w-full gap-2">
                      <Filter className="w-4 h-4" />
                      Filtres
                    </Button>
                  </SheetTrigger>
                  <SheetContent side="left" className="w-80 p-0">
                    <div className="p-4">
                      <FilterSidebar filters={filters} onFilterChange={setFilters} />
                    </div>
                  </SheetContent>
                </Sheet>
              </div>

              <SortSelect
                value={filters.sortBy}
                onChange={(value) => setFilters({ ...filters, sortBy: value })}
                totalCards={filteredCards.length}
              />

              {isLoading ? (
                <div className="flex items-center justify-center py-12">
                  <Loader2 className="w-8 h-8 animate-spin text-primary" />
                  <span className="ml-2 text-muted-foreground">Chargement des cartes...</span>
                </div>
              ) : (
                <div className="space-y-4">
                  {filteredCards.map((card) => (
                    <CreditCardItem key={card.id} card={card} />
                  ))}

                  {filteredCards.length === 0 && (
                    <div className="text-center py-12">
                      <p className="text-muted-foreground">
                        Aucune carte ne correspond à vos critères. Essayez d'ajuster les filtres.
                      </p>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      <FAQ />
      <Footer />
    </div>
  );
};

export default Index;
