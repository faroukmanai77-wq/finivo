import { BrokerageCategory, BrokerageFilterState, brokerageCategoryLabels } from '@/types/brokerage';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Filter, RotateCcw, Sparkles, Tag } from 'lucide-react';

interface BrokerageFilterSidebarProps {
  filters: BrokerageFilterState;
  onFilterChange: (filters: BrokerageFilterState) => void;
}

const categories: BrokerageCategory[] = [
  'zero-commission',
  'debutant',
  'avance',
  'comptes-enregistres',
  'actions-etf',
  'options',
  'crypto',
  'quebec-friendly',
];

const categoryIcons: Record<BrokerageCategory, string> = {
  'zero-commission': '💰',
  'debutant': '🎓',
  'avance': '📈',
  'comptes-enregistres': '🏦',
  'actions-etf': '📊',
  'options': '⚡',
  'crypto': '₿',
  'quebec-friendly': '🍁',
};

export const BrokerageFilterSidebar = ({ filters, onFilterChange }: BrokerageFilterSidebarProps) => {
  const handleCategoryToggle = (category: BrokerageCategory) => {
    const newCategories = filters.categories.includes(category)
      ? filters.categories.filter((c) => c !== category)
      : [...filters.categories, category];
    onFilterChange({ ...filters, categories: newCategories });
  };

  const handleReset = () => {
    onFilterChange({
      categories: [],
      hasNoFees: false,
      hasFrench: false,
      hasCrypto: false,
      hasOptions: false,
      sortBy: 'rating',
    });
  };

  const activeFiltersCount = 
    filters.categories.length + 
    (filters.hasNoFees ? 1 : 0) + 
    (filters.hasFrench ? 1 : 0) +
    (filters.hasCrypto ? 1 : 0) +
    (filters.hasOptions ? 1 : 0);

  return (
    <Card className="card-elevated sticky top-24 overflow-hidden">
      <CardHeader className="pb-4 bg-gradient-to-r from-primary/5 to-transparent">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg flex items-center gap-2 font-bold">
            <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
              <Filter className="w-4 h-4 text-primary" />
            </div>
            Filtres
            {activeFiltersCount > 0 && (
              <span className="ml-2 w-6 h-6 rounded-full bg-primary text-primary-foreground text-xs font-bold flex items-center justify-center">
                {activeFiltersCount}
              </span>
            )}
          </CardTitle>
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={handleReset} 
            className="text-muted-foreground hover:text-foreground font-medium"
          >
            <RotateCcw className="w-4 h-4 mr-1" />
            Réinitialiser
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-6 pt-2">
        {/* Categories */}
        <div>
          <h4 className="font-semibold text-sm mb-4 text-foreground flex items-center gap-2">
            <Tag className="w-4 h-4 text-muted-foreground" />
            Catégories
          </h4>
          <div className="space-y-2">
            {categories.map((category) => (
              <div 
                key={category} 
                className={`flex items-center space-x-3 p-2.5 rounded-xl transition-all cursor-pointer ${
                  filters.categories.includes(category) 
                    ? 'bg-primary/10 border border-primary/20' 
                    : 'hover:bg-muted/50 border border-transparent'
                }`}
                onClick={() => handleCategoryToggle(category)}
              >
                <Checkbox
                  id={category}
                  checked={filters.categories.includes(category)}
                  onCheckedChange={() => handleCategoryToggle(category)}
                  className="data-[state=checked]:bg-primary data-[state=checked]:border-primary"
                />
                <Label 
                  htmlFor={category} 
                  className="text-sm cursor-pointer flex items-center gap-2 flex-1 font-medium"
                >
                  <span>{categoryIcons[category]}</span>
                  {brokerageCategoryLabels[category]}
                </Label>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Filters */}
        <div className="pt-4 border-t border-border/50">
          <h4 className="font-semibold text-sm mb-4 text-foreground flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-muted-foreground" />
            Filtres rapides
          </h4>
          <div className="space-y-2">
            <div 
              className={`flex items-center space-x-3 p-2.5 rounded-xl transition-all cursor-pointer ${
                filters.hasNoFees 
                  ? 'bg-accent/10 border border-accent/20' 
                  : 'hover:bg-muted/50 border border-transparent'
              }`}
              onClick={() => onFilterChange({ ...filters, hasNoFees: !filters.hasNoFees })}
            >
              <Checkbox
                id="hasNoFees"
                checked={filters.hasNoFees}
                onCheckedChange={(checked) =>
                  onFilterChange({ ...filters, hasNoFees: checked as boolean })
                }
                className="data-[state=checked]:bg-accent data-[state=checked]:border-accent"
              />
              <Label htmlFor="hasNoFees" className="text-sm cursor-pointer font-medium">
                💰 Zéro commission
              </Label>
            </div>

            <div 
              className={`flex items-center space-x-3 p-2.5 rounded-xl transition-all cursor-pointer ${
                filters.hasFrench 
                  ? 'bg-accent/10 border border-accent/20' 
                  : 'hover:bg-muted/50 border border-transparent'
              }`}
              onClick={() => onFilterChange({ ...filters, hasFrench: !filters.hasFrench })}
            >
              <Checkbox
                id="hasFrench"
                checked={filters.hasFrench}
                onCheckedChange={(checked) =>
                  onFilterChange({ ...filters, hasFrench: checked as boolean })
                }
                className="data-[state=checked]:bg-accent data-[state=checked]:border-accent"
              />
              <Label htmlFor="hasFrench" className="text-sm cursor-pointer font-medium">
                🇫🇷 Disponible en français
              </Label>
            </div>

            <div 
              className={`flex items-center space-x-3 p-2.5 rounded-xl transition-all cursor-pointer ${
                filters.hasOptions 
                  ? 'bg-accent/10 border border-accent/20' 
                  : 'hover:bg-muted/50 border border-transparent'
              }`}
              onClick={() => onFilterChange({ ...filters, hasOptions: !filters.hasOptions })}
            >
              <Checkbox
                id="hasOptions"
                checked={filters.hasOptions}
                onCheckedChange={(checked) =>
                  onFilterChange({ ...filters, hasOptions: checked as boolean })
                }
                className="data-[state=checked]:bg-accent data-[state=checked]:border-accent"
              />
              <Label htmlFor="hasOptions" className="text-sm cursor-pointer font-medium">
                ⚡ Trading d'options
              </Label>
            </div>

            <div 
              className={`flex items-center space-x-3 p-2.5 rounded-xl transition-all cursor-pointer ${
                filters.hasCrypto 
                  ? 'bg-accent/10 border border-accent/20' 
                  : 'hover:bg-muted/50 border border-transparent'
              }`}
              onClick={() => onFilterChange({ ...filters, hasCrypto: !filters.hasCrypto })}
            >
              <Checkbox
                id="hasCrypto"
                checked={filters.hasCrypto}
                onCheckedChange={(checked) =>
                  onFilterChange({ ...filters, hasCrypto: checked as boolean })
                }
                className="data-[state=checked]:bg-accent data-[state=checked]:border-accent"
              />
              <Label htmlFor="hasCrypto" className="text-sm cursor-pointer font-medium">
                ₿ Crypto disponible
              </Label>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
