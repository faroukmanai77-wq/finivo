import { CardCategory, FilterState } from '@/types/creditCard';
import { categoryLabels } from '@/data/creditCards';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Button } from '@/components/ui/button';
import { Filter, RotateCcw } from 'lucide-react';

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

  return (
    <Card className="sticky top-4">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg flex items-center gap-2">
            <Filter className="w-5 h-5" />
            Filtres
          </CardTitle>
          <Button variant="ghost" size="sm" onClick={handleReset} className="text-muted-foreground">
            <RotateCcw className="w-4 h-4 mr-1" />
            Réinitialiser
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Categories */}
        <div>
          <h4 className="font-medium text-sm mb-3 text-foreground">Catégories</h4>
          <div className="space-y-2">
            {categories.map((category) => (
              <div key={category} className="flex items-center space-x-2">
                <Checkbox
                  id={category}
                  checked={filters.categories.includes(category)}
                  onCheckedChange={() => handleCategoryToggle(category)}
                />
                <Label htmlFor={category} className="text-sm cursor-pointer">
                  {categoryLabels[category]}
                </Label>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Filters */}
        <div>
          <h4 className="font-medium text-sm mb-3 text-foreground">Filtres rapides</h4>
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="noAnnualFee"
                checked={filters.noAnnualFee}
                onCheckedChange={(checked) =>
                  onFilterChange({ ...filters, noAnnualFee: checked as boolean })
                }
              />
              <Label htmlFor="noAnnualFee" className="text-sm cursor-pointer">
                Sans frais annuels
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="hasWelcomeBonus"
                checked={filters.hasWelcomeBonus}
                onCheckedChange={(checked) =>
                  onFilterChange({ ...filters, hasWelcomeBonus: checked as boolean })
                }
              />
              <Label htmlFor="hasWelcomeBonus" className="text-sm cursor-pointer">
                Avec bonus de bienvenue
              </Label>
            </div>
          </div>
        </div>

        {/* Max Annual Fee */}
        <div>
          <h4 className="font-medium text-sm mb-3 text-foreground">
            Frais annuels max: {filters.maxAnnualFee !== null ? `${filters.maxAnnualFee}$` : 'Tous'}
          </h4>
          <Slider
            value={[filters.maxAnnualFee ?? 200]}
            onValueChange={(value) =>
              onFilterChange({ ...filters, maxAnnualFee: value[0] === 200 ? null : value[0] })
            }
            max={200}
            step={10}
            className="w-full"
          />
          <div className="flex justify-between text-xs text-muted-foreground mt-1">
            <span>0$</span>
            <span>200$+</span>
          </div>
        </div>

        {/* Min Cashback */}
        <div>
          <h4 className="font-medium text-sm mb-3 text-foreground">
            Remise min: {filters.minCashback !== null ? `${filters.minCashback}%` : 'Tous'}
          </h4>
          <Slider
            value={[filters.minCashback ?? 0]}
            onValueChange={(value) =>
              onFilterChange({ ...filters, minCashback: value[0] === 0 ? null : value[0] })
            }
            max={5}
            step={0.5}
            className="w-full"
          />
          <div className="flex justify-between text-xs text-muted-foreground mt-1">
            <span>0%</span>
            <span>5%</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
