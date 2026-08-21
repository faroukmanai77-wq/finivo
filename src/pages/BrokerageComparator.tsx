import { useState, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { Header } from '@/components/Header';
import { BrokerageFilterSidebar } from '@/components/BrokerageFilterSidebar';
import { BrokerageItem } from '@/components/BrokerageItem';
import { BrokerageSkeleton } from '@/components/BrokerageSkeleton';
import { BrokerageComparisonTable } from '@/components/BrokerageComparisonTable';
import { Footer } from '@/components/Footer';
import { SEO, generateBreadcrumbStructuredData } from '@/components/SEO';
import { BrokerageFilterState, BrokerageCategory } from '@/types/brokerage';
import { useBrokeragePlatforms } from '@/hooks/useBrokeragePlatforms';
import { useLanguage } from '@/hooks/useLanguage';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Filter, Building2, LayoutGrid, Table2, AlertCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const BrokerageComparator = () => {
  const { t } = useTranslation();
  const { getLocalizedPath, currentLanguage } = useLanguage();
  
  const {
    data: platforms = [],
    isLoading,
    error
  } = useBrokeragePlatforms();
  
  const [filters, setFilters] = useState<BrokerageFilterState>({
    categories: [],
    hasNoFees: false,
    hasFrench: false,
    hasCrypto: false,
    hasOptions: false,
    sortBy: 'rating'
  });
  const [viewMode, setViewMode] = useState<'cards' | 'table'>('cards');
  
  const filteredPlatforms = useMemo(() => {
    let result = [...platforms];

    // Category filters
    if (filters.categories.includes('zero-commission')) {
      result = result.filter(p => p.transactionFeeStocks === '0 $');
    }
    if (filters.categories.includes('debutant')) {
      result = result.filter(p => p.level === 'debutant');
    }
    if (filters.categories.includes('avance')) {
      result = result.filter(p => p.level === 'avance');
    }
    if (filters.categories.includes('comptes-enregistres')) {
      result = result.filter(p => p.accounts.includes('CELI') && p.accounts.includes('REER'));
    }
    if (filters.categories.includes('actions-etf')) {
      result = result.filter(p => p.products.includes('Actions') && p.products.includes('ETF'));
    }
    if (filters.categories.includes('options')) {
      result = result.filter(p => p.hasOptions);
    }
    if (filters.categories.includes('crypto')) {
      result = result.filter(p => p.hasCrypto);
    }
    if (filters.categories.includes('quebec-friendly')) {
      result = result.filter(p => p.hasFrench && p.regulation.includes('AMF'));
    }

    // Quick filters
    if (filters.hasNoFees) {
      result = result.filter(p => p.transactionFeeStocks === '0 $' || p.transactionFeeETF.includes('0 $'));
    }
    if (filters.hasFrench) {
      result = result.filter(p => p.hasFrench);
    }
    if (filters.hasCrypto) {
      result = result.filter(p => p.hasCrypto);
    }
    if (filters.hasOptions) {
      result = result.filter(p => p.hasOptions);
    }

    // Sorting
    switch (filters.sortBy) {
      case 'rating':
        result.sort((a, b) => b.rating - a.rating);
        break;
      case 'fees':
        result.sort((a, b) => {
          const aFee = a.transactionFeeStocks === '0 $' ? 0 : 100;
          const bFee = b.transactionFeeStocks === '0 $' ? 0 : 100;
          return aFee - bFee;
        });
        break;
      case 'name':
        result.sort((a, b) => a.name.localeCompare(b.name));
        break;
    }
    return result;
  }, [filters, platforms]);

  const baseUrl = 'https://finivo.ca';
  const breadcrumbs = [{
    name: t('common.home'),
    url: baseUrl
  }, {
    name: t('nav.comparators'),
    url: `${baseUrl}${getLocalizedPath('/comparateurs')}`
  }, {
    name: t('brokerages.title'),
    url: `${baseUrl}${getLocalizedPath('/comparateurs/courtage')}`
  }];

  const categories = [
    { id: 'zero-commission', label: t('brokerages.categories.zeroCommission'), icon: '💰' },
    { id: 'debutant', label: t('brokerages.categories.beginner'), icon: '🎓' },
    { id: 'avance', label: t('brokerages.categories.advanced'), icon: '📈' },
    { id: 'comptes-enregistres', label: t('brokerages.categories.registeredAccounts'), icon: '🏦' },
    { id: 'crypto', label: t('brokerages.categories.crypto'), icon: '₿' },
    { id: 'quebec-friendly', label: t('brokerages.categories.quebecFriendly'), icon: '🍁' },
  ];

  return (
    <div className="min-h-screen bg-background">
      <SEO 
        title={t('brokerages.seo.title')}
        description={t('brokerages.seo.description')}
        keywords={t('brokerages.seo.keywords')}
        url={`${baseUrl}${getLocalizedPath('/comparateurs/courtage')}`}
        structuredData={generateBreadcrumbStructuredData(breadcrumbs)} 
      />
      <Header />
      
      {/* Hero Section */}
      <section className="py-12 lg:py-16 bg-secondary-foreground">
        <div className="container mx-auto px-4 bg-secondary-foreground">
          {/* Breadcrumbs */}
          <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
            <Link to={getLocalizedPath('/')} className="hover:text-foreground transition-colors">
              {t('common.home')}
            </Link>
            <span>/</span>
            <span>{t('nav.comparators')}</span>
            <span>/</span>
            <span className="text-primary">{t('brokerages.title')}</span>
          </nav>

          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold mb-4 bg-primary/15 text-primary">
                <Building2 className="w-4 h-4" />
                {t('brokerages.comparator')}
              </div>
              <h1 className="text-3xl lg:text-4xl font-extrabold mb-3 text-popover-foreground">
                {t('brokerages.heroTitle')}
              </h1>
              <p className="max-w-2xl text-lg text-secondary">
                {t('brokerages.heroDescription')}
              </p>
            </div>
          </div>

          {/* Disclaimer */}
          <div className="mt-6 flex items-start gap-3 bg-warning/10 border border-warning/30 rounded-xl p-4 max-w-2xl">
            <AlertCircle className="w-5 h-5 text-warning shrink-0 mt-0.5" />
            <p className="text-sm text-foreground/80">
              {t('brokerages.disclaimer')}
            </p>
          </div>

          {/* Category quick filters */}
          <div className="flex flex-wrap gap-2 mt-8">
            {categories.map(cat => (
              <button 
                key={cat.id} 
                onClick={() => setFilters(prev => ({
                  ...prev,
                  categories: prev.categories.includes(cat.id as BrokerageCategory) 
                    ? prev.categories.filter(c => c !== cat.id) 
                    : [...prev.categories, cat.id as BrokerageCategory]
                }))} 
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 ${
                  filters.categories.includes(cat.id as BrokerageCategory)
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-background hover:bg-muted'
                }`}
              >
                {cat.icon} {cat.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Comparison Section */}
      <section id="platforms-list" className="py-12 lg:py-16">
        <div className="container mx-auto px-4">
          <div className="flex gap-8">
            {/* Desktop Sidebar */}
            <aside className="hidden lg:block w-80 flex-shrink-0">
              <BrokerageFilterSidebar filters={filters} onFilterChange={setFilters} />
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
                      {(filters.categories.length > 0 || filters.hasNoFees || filters.hasFrench || filters.hasCrypto || filters.hasOptions) && (
                        <span className="ml-2 w-5 h-5 rounded-full bg-primary text-primary-foreground text-xs flex items-center justify-center">
                          {filters.categories.length + (filters.hasNoFees ? 1 : 0) + (filters.hasFrench ? 1 : 0) + (filters.hasCrypto ? 1 : 0) + (filters.hasOptions ? 1 : 0)}
                        </span>
                      )}
                    </Button>
                  </SheetTrigger>
                  <SheetContent side="left" className="w-80 p-0 overflow-y-auto">
                    <div className="p-4">
                      <BrokerageFilterSidebar filters={filters} onFilterChange={setFilters} />
                    </div>
                  </SheetContent>
                </Sheet>
              </div>

              {/* Sort & View Controls */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
                <div className="flex items-center gap-4">
                  <span className="text-sm text-muted-foreground">
                    {t('brokerages.platformsFound', { count: filteredPlatforms.length })}
                  </span>
                  <Select 
                    value={filters.sortBy} 
                    onValueChange={(value: 'rating' | 'fees' | 'name') => setFilters({
                      ...filters,
                      sortBy: value
                    })}
                  >
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder={t('brokerages.sort.placeholder')} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="rating">{t('brokerages.sort.rating')}</SelectItem>
                      <SelectItem value="fees">{t('brokerages.sort.lowestFees')}</SelectItem>
                      <SelectItem value="name">{t('brokerages.sort.name')}</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* View Toggle */}
                <Tabs value={viewMode} onValueChange={v => setViewMode(v as 'cards' | 'table')} className="hidden md:block">
                  <TabsList>
                    <TabsTrigger value="cards" className="gap-2">
                      <LayoutGrid className="w-4 h-4" />
                      {t('brokerages.view.cards')}
                    </TabsTrigger>
                    <TabsTrigger value="table" className="gap-2">
                      <Table2 className="w-4 h-4" />
                      {t('brokerages.view.table')}
                    </TabsTrigger>
                  </TabsList>
                </Tabs>
              </div>

              {/* Content */}
              {isLoading ? (
                <div className="space-y-6">
                  {[...Array(3)].map((_, i) => <BrokerageSkeleton key={i} />)}
                </div>
              ) : error ? (
                <div className="text-center py-20 card-elevated rounded-2xl">
                  <div className="w-16 h-16 rounded-2xl bg-destructive/10 flex items-center justify-center mx-auto mb-4">
                    <AlertCircle className="w-8 h-8 text-destructive" />
                  </div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">{t('brokerages.loadingError')}</h3>
                  <p className="text-muted-foreground">
                    {t('brokerages.loadingErrorMessage')}
                  </p>
                </div>
              ) : viewMode === 'cards' ? (
                <div className="space-y-6">
                  {filteredPlatforms.map((platform, index) => (
                    <BrokerageItem key={platform.id} platform={platform} index={index} />
                  ))}

                  {filteredPlatforms.length === 0 && (
                    <div className="text-center py-20 card-elevated rounded-2xl">
                      <div className="w-16 h-16 rounded-2xl bg-muted/50 flex items-center justify-center mx-auto mb-4">
                        <Building2 className="w-8 h-8 text-muted-foreground" />
                      </div>
                      <h3 className="text-lg font-semibold text-foreground mb-2">{t('brokerages.noResults')}</h3>
                      <p className="text-muted-foreground">
                        {t('brokerages.adjustFilters')}
                      </p>
                    </div>
                  )}
                </div>
              ) : (
                <BrokerageComparisonTable platforms={filteredPlatforms} />
              )}
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default BrokerageComparator;
