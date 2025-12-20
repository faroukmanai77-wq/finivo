import { useState, useMemo } from 'react';
import { Header } from '@/components/Header';
import { Hero } from '@/components/Hero';
import { FilterSidebar } from '@/components/FilterSidebar';
import { CreditCardItem } from '@/components/CreditCardItem';
import { SortSelect } from '@/components/SortSelect';
import { FAQ } from '@/components/FAQ';
import { Footer } from '@/components/Footer';
import { creditCards } from '@/data/creditCards';
import { FilterState } from '@/types/creditCard';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Filter } from 'lucide-react';

const Index = () => {
  const [filters, setFilters] = useState<FilterState>({
    categories: [],
    maxAnnualFee: null,
    minCashback: null,
    noAnnualFee: false,
    hasWelcomeBonus: false,
    sortBy: 'rating'
  });

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
  }, [filters]);

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
              Tous les taux sont mis à jour régulièrement.
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
