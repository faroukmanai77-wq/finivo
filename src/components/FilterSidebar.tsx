import { CardCategory, FilterState } from '@/types/creditCard';
import { categoryLabels } from '@/data/creditCards';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Button } from '@/components/ui/button';
import { Filter, RotateCcw, Sparkles, Gift, Tag } from 'lucide-react';

interface FilterSidebarProps {
  filters: FilterState;
  onFilterChange: (filters: FilterState) => void;
}

const categories: CardCategory[] = [
  'cashback',
  'travel',
  'rewards',
  'no-fee',
  'low-interest',
  'student',
  'premium'
];

const categoryIcons: Record<string, string> = {
  'cashback': '💰',
  'travel': '✈️',
  'rewards': '🎁',
  'no-fee': '🆓',
  'low-interest': '📉',
  'student': '🎓',
  'premium': '👑',
};

export const FilterSidebar = ({ filters, onFilterChange }: FilterSidebarProps) => {
  const handleCategoryToggle = (category: CardCategory) => {
    const newCategories = filters.categories.includes(category)
      ? filters.categories.filter((c) => c !== category)
      : [...filters.categories, category];
    onFilterChange({ ...filters, categories: newCategories });
  };

  const handleReset = () => {
    onFilterChange({
      categories: [],
      maxAnnualFee: null,
      minCashback: null,
      noAnnualFee: false,
      hasWelcomeBonus: false,
      sortBy: 'rating'
    });
  };

  const activeFiltersCount = filters.categories.length + 
    (filters.noAnnualFee ? 1 : 0) + 
    (filters.hasWelcomeBonus ? 1 : 0) +
    (filters.maxAnnualFee !== null ? 1 : 0) +
    (filters.minCashback !== null ? 1 : 0);

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
                  {categoryLabels[category]}
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
                filters.noAnnualFee 
                  ? 'bg-accent/10 border border-accent/20' 
                  : 'hover:bg-muted/50 border border-transparent'
              }`}
              onClick={() => onFilterChange({ ...filters, noAnnualFee: !filters.noAnnualFee })}
            >
              <Checkbox
                id="noAnnualFee"
                checked={filters.noAnnualFee}
                onCheckedChange={(checked) =>
                  onFilterChange({ ...filters, noAnnualFee: checked as boolean })
                }
                className="data-[state=checked]:bg-accent data-[state=checked]:border-accent"
              />
              <Label htmlFor="noAnnualFee" className="text-sm cursor-pointer font-medium">
                🆓 Sans frais annuels
              </Label>
            </div>
            <div 
              className={`flex items-center space-x-3 p-2.5 rounded-xl transition-all cursor-pointer ${
                filters.hasWelcomeBonus 
                  ? 'bg-accent/10 border border-accent/20' 
                  : 'hover:bg-muted/50 border border-transparent'
              }`}
              onClick={() => onFilterChange({ ...filters, hasWelcomeBonus: !filters.hasWelcomeBonus })}
            >
              <Checkbox
                id="hasWelcomeBonus"
                checked={filters.hasWelcomeBonus}
                onCheckedChange={(checked) =>
                  onFilterChange({ ...filters, hasWelcomeBonus: checked as boolean })
                }
                className="data-[state=checked]:bg-accent data-[state=checked]:border-accent"
              />
              <Label htmlFor="hasWelcomeBonus" className="text-sm cursor-pointer flex items-center gap-2 font-medium">
                <Gift className="w-4 h-4 text-accent" />
                Avec bonus de bienvenue
              </Label>
            </div>
          </div>
        </div>

        {/* Max Annual Fee */}
        <div className="pt-4 border-t border-border/50">
          <h4 className="font-semibold text-sm mb-2 text-foreground">
            Frais annuels max
          </h4>
          <p className="text-2xl font-bold text-primary mb-4">
            {filters.maxAnnualFee !== null ? `${filters.maxAnnualFee}$` : 'Tous'}
          </p>
          <Slider
            value={[filters.maxAnnualFee ?? 200]}
            onValueChange={(value) =>
              onFilterChange({ ...filters, maxAnnualFee: value[0] === 200 ? null : value[0] })
            }
            max={200}
            step={10}
            className="w-full"
          />
          <div className="flex justify-between text-xs text-muted-foreground mt-2 font-medium">
            <span>0$</span>
            <span>200$+</span>
          </div>
        </div>

        {/* Min Cashback */}
        <div className="pt-4 border-t border-border/50">
          <h4 className="font-semibold text-sm mb-2 text-foreground">
            Remise minimum
          </h4>
          <p className="text-2xl font-bold text-primary mb-4">
            {filters.minCashback !== null ? `${filters.minCashback}%` : 'Tous'}
          </p>
          <Slider
            value={[filters.minCashback ?? 0]}
            onValueChange={(value) =>
              onFilterChange({ ...filters, minCashback: value[0] === 0 ? null : value[0] })
            }
            max={5}
            step={0.5}
            className="w-full"
          />
          <div className="flex justify-between text-xs text-muted-foreground mt-2 font-medium">
            <span>0%</span>
            <span>5%</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
