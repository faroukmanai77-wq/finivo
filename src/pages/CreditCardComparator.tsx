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
import { useCreditCards } from '@/hooks/useCreditCards';
import { useToast } from '@/hooks/use-toast';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useLanguage } from '@/hooks/useLanguage';

const CreditCardComparator = () => {
  const { t } = useTranslation();
  const { getLocalizedPath, currentLanguage } = useLanguage();
  const { data: creditCards = [], isLoading } = useCreditCards();
  const { toast } = useToast();
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
    name: t('nav.home'),
    url: 'https://finivo.ca'
  }, {
    name: t('nav.comparators'),
    url: 'https://finivo.ca/comparateurs'
  }, {
    name: t('creditCards.title'),
    url: 'https://finivo.ca/comparateurs/cartes-de-credit'
  }];

  const categories = [{
    id: 'cashback',
    label: t('creditCards.categories.cashback'),
    icon: '💰'
  }, {
    id: 'travel',
    label: t('creditCards.categories.travel'),
    icon: '✈️'
  }, {
    id: 'no-fee',
    label: t('creditCards.categories.noFee'),
    icon: '🆓'
  }, {
    id: 'student',
    label: t('creditCards.categories.student'),
    icon: '🎓'
  }, {
    id: 'premium',
    label: t('creditCards.categories.premium'),
    icon: '⭐'
  }, {
    id: 'low-interest',
    label: t('creditCards.categories.lowInterest'),
    icon: '📉'
  }];
  return <div className="min-h-screen bg-background">
      <SEO 
        title={t('seo.creditCards.title')} 
        description={t('seo.creditCards.description')} 
        keywords={t('seo.creditCards.keywords')} 
        url="https://finivo.ca/comparateurs/cartes-de-credit" 
        structuredData={generateBreadcrumbStructuredData(breadcrumbs)} 
      />
      <Header />
      
      {/* Hero Section */}
      <section className="py-12 lg:py-16 bg-secondary-foreground">
        <div className="container mx-auto px-4">
          {/* Breadcrumbs */}
          <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
            <Link to={getLocalizedPath('/')} className="hover:text-foreground transition-colors">{t('nav.home')}</Link>
            <span>/</span>
            <span>{t('nav.comparators')}</span>
            <span>/</span>
            <span className="text-primary">{t('creditCards.title')}</span>
          </nav>

          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold mb-4 bg-[#28bd4d]/[0.23] text-primary">
                <CreditCardIcon className="w-4 h-4" />
                {t('creditCards.comparator')}
              </div>
              <h1 className="text-3xl lg:text-4xl font-extrabold mb-3 text-left text-popover-foreground">
                {t('creditCards.heroTitle')}
              </h1>
              <p className="max-w-2xl text-lg text-secondary">
                {t('creditCards.heroDescription')}
              </p>
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
                      {t('common.filters')}
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
                      <h3 className="text-lg font-semibold text-foreground mb-2">{t('creditCards.noResults')}</h3>
                      <p className="text-muted-foreground">
                        {t('creditCards.adjustFilters')}
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