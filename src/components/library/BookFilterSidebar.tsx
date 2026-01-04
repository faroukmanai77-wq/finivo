import { BookFilterState, BookCategory, BookLevel, BookLanguage, categoryLabels, levelLabels, languageLabels } from '@/types/book';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { RotateCcw, BookOpen, GraduationCap, Globe } from 'lucide-react';

interface BookFilterSidebarProps {
  filters: BookFilterState;
  onFilterChange: (filters: BookFilterState) => void;
}

const categories: BookCategory[] = ['finance-personnelle', 'investissement', 'liberte-financiere', 'business', 'mindset'];
const levels: BookLevel[] = ['beginner', 'intermediate', 'advanced'];
const languages: BookLanguage[] = ['FR', 'EN'];

const categoryIcons: Record<BookCategory, string> = {
  'finance-personnelle': '💰',
  'investissement': '📈',
  'liberte-financiere': '🆓',
  'business': '💼',
  'mindset': '🧠',
};

export const BookFilterSidebar = ({ filters, onFilterChange }: BookFilterSidebarProps) => {
  const handleCategoryToggle = (category: BookCategory) => {
    const newCategories = filters.categories.includes(category)
      ? filters.categories.filter(c => c !== category)
      : [...filters.categories, category];
    onFilterChange({ ...filters, categories: newCategories });
  };

  const handleLevelToggle = (level: BookLevel) => {
    const newLevels = filters.levels.includes(level)
      ? filters.levels.filter(l => l !== level)
      : [...filters.levels, level];
    onFilterChange({ ...filters, levels: newLevels });
  };

  const handleLanguageToggle = (language: BookLanguage) => {
    const newLanguages = filters.languages.includes(language)
      ? filters.languages.filter(l => l !== language)
      : [...filters.languages, language];
    onFilterChange({ ...filters, languages: newLanguages });
  };

  const handleReset = () => {
    onFilterChange({
      search: '',
      categories: [],
      levels: [],
      languages: [],
      sortBy: 'popularity',
    });
  };

  const activeFiltersCount = filters.categories.length + filters.levels.length + filters.languages.length;

  return (
    <Card className="card-elevated sticky top-24">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-primary" />
            Filtres
          </CardTitle>
          {activeFiltersCount > 0 && (
            <Button variant="ghost" size="sm" onClick={handleReset} className="gap-1 text-muted-foreground hover:text-foreground">
              <RotateCcw className="w-4 h-4" />
              Réinitialiser ({activeFiltersCount})
            </Button>
          )}
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Categories */}
        <div>
          <h4 className="font-semibold text-sm text-foreground mb-3 flex items-center gap-2">
            <BookOpen className="w-4 h-4" />
            Catégories
          </h4>
          <div className="space-y-2">
            {categories.map(category => (
              <div key={category} className="flex items-center gap-2">
                <Checkbox
                  id={`cat-${category}`}
                  checked={filters.categories.includes(category)}
                  onCheckedChange={() => handleCategoryToggle(category)}
                />
                <Label htmlFor={`cat-${category}`} className="text-sm cursor-pointer flex items-center gap-2">
                  <span>{categoryIcons[category]}</span>
                  {categoryLabels[category]}
                </Label>
              </div>
            ))}
          </div>
        </div>

        {/* Levels */}
        <div>
          <h4 className="font-semibold text-sm text-foreground mb-3 flex items-center gap-2">
            <GraduationCap className="w-4 h-4" />
            Niveau
          </h4>
          <div className="space-y-2">
            {levels.map(level => (
              <div key={level} className="flex items-center gap-2">
                <Checkbox
                  id={`level-${level}`}
                  checked={filters.levels.includes(level)}
                  onCheckedChange={() => handleLevelToggle(level)}
                />
                <Label htmlFor={`level-${level}`} className="text-sm cursor-pointer">
                  {levelLabels[level]}
                </Label>
              </div>
            ))}
          </div>
        </div>

        {/* Languages */}
        <div>
          <h4 className="font-semibold text-sm text-foreground mb-3 flex items-center gap-2">
            <Globe className="w-4 h-4" />
            Langue
          </h4>
          <div className="space-y-2">
            {languages.map(language => (
              <div key={language} className="flex items-center gap-2">
                <Checkbox
                  id={`lang-${language}`}
                  checked={filters.languages.includes(language)}
                  onCheckedChange={() => handleLanguageToggle(language)}
                />
                <Label htmlFor={`lang-${language}`} className="text-sm cursor-pointer">
                  {languageLabels[language]}
                </Label>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
