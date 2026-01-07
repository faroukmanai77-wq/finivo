import { useState, useMemo } from 'react';
import { Header } from '@/components/Header';
import { BrokerageFilterSidebar } from '@/components/BrokerageFilterSidebar';
import { BrokerageItem } from '@/components/BrokerageItem';
import { BrokerageComparisonTable } from '@/components/BrokerageComparisonTable';
import { Footer } from '@/components/Footer';
import { SEO, generateBreadcrumbStructuredData } from '@/components/SEO';
import { BrokerageFilterState, BrokerageCategory } from '@/types/brokerage';
import { useBrokeragePlatforms } from '@/hooks/useBrokeragePlatforms';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Filter, Building2, LayoutGrid, Table2, AlertCircle, Loader2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
const BrokerageComparator = () => {
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
  const breadcrumbs = [{
    name: 'Accueil',
    url: 'https://finivo.ca'
  }, {
    name: 'Comparateurs',
    url: 'https://finivo.ca/comparateurs'
  }, {
    name: 'Plateformes de courtage',
    url: 'https://finivo.ca/comparateurs/courtage'
  }];
  const categories = [{
    id: 'zero-commission',
    label: 'Zéro commission',
    icon: '💰'
  }, {
    id: 'debutant',
    label: 'Débutant',
    icon: '🎓'
  }, {
    id: 'avance',
    label: 'Avancé',
    icon: '📈'
  }, {
    id: 'comptes-enregistres',
    label: 'CELI / REER',
    icon: '🏦'
  }, {
    id: 'crypto',
    label: 'Crypto',
    icon: '₿'
  }, {
    id: 'quebec-friendly',
    label: 'Québec friendly',
    icon: '🍁'
  }];
  return <div className="min-h-screen bg-background">
      <SEO title="Comparateur de 10+ Courtiers en Ligne Canada 2025 | Wealthsimple, Questrade, IBKR | Finivo" description="Comparez gratuitement les meilleures plateformes de courtage au Canada : Wealthsimple Trade (0$ commission), Questrade, Interactive Brokers, Disnat et les banques (TD, RBC, BMO). Trouvez le courtier idéal pour votre CELI, REER, CELIAPP. Comparez frais, produits (ETF, actions, crypto, options) et fonctionnalités." keywords="comparateur courtier canada, wealthsimple vs questrade, meilleur courtier CELI REER, plateforme investissement québec, courtier zéro commission, interactive brokers canada, disnat, courtier crypto canada" url="https://finivo.ca/comparateurs/courtage" structuredData={generateBreadcrumbStructuredData(breadcrumbs)} />
      <Header />
      
      {/* Hero Section */}
      <section className="py-12 lg:py-16 bg-secondary-foreground">
        <div className="container mx-auto px-4 bg-secondary-foreground">
          {/* Breadcrumbs */}
          <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
            <Link to="/" className="hover:text-foreground transition-colors">Accueil</Link>
            <span>/</span>
            <span>Comparateurs</span>
            <span>/</span>
            <span className="text-primary">Plateformes de courtage</span>
          </nav>

          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold mb-4 bg-[#28bd4d]/[0.23] text-primary">
                <Building2 className="w-4 h-4" />
                Comparateur de plateformes de courtage en ligne     
              </div>
              <h1 className="text-3xl lg:text-4xl font-extrabold mb-3 text-popover-foreground">
                Comparer les plateformes de courtage en ligne au Canada
              </h1>
              <p className="max-w-2xl text-lg text-secondary">
                Trouvez la meilleure plateforme pour investir selon vos besoins : frais, CELI, REER, ETF, actions, options.
              </p>
            </div>
          </div>

          {/* Disclaimer */}
          <div className="mt-6 flex items-start gap-3 bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800 rounded-xl p-4 max-w-2xl">
            <AlertCircle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
            <p className="text-sm text-amber-800 dark:text-amber-200">
              Comparaison à titre informatif – données susceptibles de changer. Vérifiez toujours les conditions sur le site officiel du courtier.
            </p>
          </div>

          {/* Category quick filters */}
          <div className="flex flex-wrap gap-2 mt-8">
            {categories.map(cat => <button key={cat.id} onClick={() => setFilters(prev => ({
            ...prev,
            categories: prev.categories.includes(cat.id as BrokerageCategory) ? prev.categories.filter(c => c !== cat.id) : [...prev.categories, cat.id as BrokerageCategory]
          }))} className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${filters.categories.includes(cat.id as BrokerageCategory) ? 'bg-primary text-primary-foreground' : 'bg-background hover:bg-muted'}`}>
                {cat.icon} {cat.label}
              </button>)}
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
                      Filtres
                      {(filters.categories.length > 0 || filters.hasNoFees || filters.hasFrench || filters.hasCrypto || filters.hasOptions) && <span className="ml-2 w-5 h-5 rounded-full bg-primary text-primary-foreground text-xs flex items-center justify-center">
                          {filters.categories.length + (filters.hasNoFees ? 1 : 0) + (filters.hasFrench ? 1 : 0) + (filters.hasCrypto ? 1 : 0) + (filters.hasOptions ? 1 : 0)}
                        </span>}
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
                    {filteredPlatforms.length} plateforme{filteredPlatforms.length > 1 ? 's' : ''} trouvée{filteredPlatforms.length > 1 ? 's' : ''}
                  </span>
                  <Select value={filters.sortBy} onValueChange={(value: 'rating' | 'fees' | 'name') => setFilters({
                  ...filters,
                  sortBy: value
                })}>
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Trier par" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="rating">Note</SelectItem>
                      <SelectItem value="fees">Frais les plus bas</SelectItem>
                      <SelectItem value="name">Nom</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* View Toggle */}
                <Tabs value={viewMode} onValueChange={v => setViewMode(v as 'cards' | 'table')} className="hidden md:block">
                  <TabsList>
                    <TabsTrigger value="cards" className="gap-2">
                      <LayoutGrid className="w-4 h-4" />
                      Cartes
                    </TabsTrigger>
                    <TabsTrigger value="table" className="gap-2">
                      <Table2 className="w-4 h-4" />
                      Tableau
                    </TabsTrigger>
                  </TabsList>
                </Tabs>
              </div>

              {/* Content */}
              {isLoading ? <div className="flex items-center justify-center py-20">
                  <Loader2 className="w-8 h-8 animate-spin text-primary" />
                </div> : error ? <div className="text-center py-20 card-elevated rounded-2xl">
                  <div className="w-16 h-16 rounded-2xl bg-destructive/10 flex items-center justify-center mx-auto mb-4">
                    <AlertCircle className="w-8 h-8 text-destructive" />
                  </div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">Erreur de chargement</h3>
                  <p className="text-muted-foreground">
                    Impossible de charger les plateformes. Veuillez réessayer.
                  </p>
                </div> : viewMode === 'cards' ? <div className="space-y-6">
                  {filteredPlatforms.map((platform, index) => <BrokerageItem key={platform.id} platform={platform} index={index} />)}

                  {filteredPlatforms.length === 0 && <div className="text-center py-20 card-elevated rounded-2xl">
                      <div className="w-16 h-16 rounded-2xl bg-muted/50 flex items-center justify-center mx-auto mb-4">
                        <Building2 className="w-8 h-8 text-muted-foreground" />
                      </div>
                      <h3 className="text-lg font-semibold text-foreground mb-2">Aucune plateforme trouvée</h3>
                      <p className="text-muted-foreground">
                        Essayez d'ajuster les filtres pour voir plus de résultats.
                      </p>
                    </div>}
                </div> : <BrokerageComparisonTable platforms={filteredPlatforms} />}
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>;
};
export default BrokerageComparator;