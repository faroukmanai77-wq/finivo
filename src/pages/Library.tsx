import { useState, useMemo } from 'react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { SEO, generateBreadcrumbStructuredData } from '@/components/SEO';
import { BookFilterSidebar } from '@/components/library/BookFilterSidebar';
import { BookCard } from '@/components/library/BookCard';
import { useBooks } from '@/hooks/useBooks';
import { BookFilterState, BookCategory, BookLevel, BookLanguage } from '@/types/book';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Filter, BookOpen, Search, AlertCircle, Loader2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
const Library = () => {
  const {
    data: books = [],
    isLoading,
    error
  } = useBooks();
  const [filters, setFilters] = useState<BookFilterState>({
    search: '',
    categories: [],
    levels: [],
    languages: [],
    sortBy: 'popularity'
  });
  const filteredBooks = useMemo(() => {
    let result = [...books];

    // Search filter
    if (filters.search) {
      const searchLower = filters.search.toLowerCase();
      result = result.filter(book => book.title.toLowerCase().includes(searchLower) || book.author.toLowerCase().includes(searchLower));
    }

    // Category filter
    if (filters.categories.length > 0) {
      result = result.filter(book => filters.categories.includes(book.category));
    }

    // Level filter
    if (filters.levels.length > 0) {
      result = result.filter(book => filters.levels.includes(book.level));
    }

    // Language filter
    if (filters.languages.length > 0) {
      result = result.filter(book => filters.languages.includes(book.language));
    }

    // Sorting
    switch (filters.sortBy) {
      case 'popularity':
        result.sort((a, b) => (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0) || (b.rating || 0) - (a.rating || 0));
        break;
      case 'beginner':
        result.sort((a, b) => {
          const levelOrder = {
            beginner: 0,
            intermediate: 1,
            advanced: 2
          };
          return levelOrder[a.level] - levelOrder[b.level];
        });
        break;
      case 'recommended':
        result.sort((a, b) => (b.rating || 0) - (a.rating || 0));
        break;
      case 'title':
        result.sort((a, b) => a.title.localeCompare(b.title));
        break;
    }
    return result;
  }, [filters, books]);
  const breadcrumbs = [{
    name: 'Accueil',
    url: 'https://finivo.ca'
  }, {
    name: 'Bibliothèque',
    url: 'https://finivo.ca/bibliotheque'
  }];
  const categories: {
    id: BookCategory;
    label: string;
    icon: string;
  }[] = [{
    id: 'finance-personnelle',
    label: 'Finance personnelle',
    icon: '💰'
  }, {
    id: 'investissement',
    label: 'Investissement',
    icon: '📈'
  }, {
    id: 'liberte-financiere',
    label: 'Liberté financière',
    icon: '🆓'
  }, {
    id: 'business',
    label: 'Business',
    icon: '💼'
  }, {
    id: 'mindset',
    label: 'Mindset',
    icon: '🧠'
  }];
  const activeFiltersCount = filters.categories.length + filters.levels.length + filters.languages.length;
  return <div className="min-h-screen bg-background">
      <SEO title="Bibliothèque Finance & Liberté Financière | Finivo" description="Découvrez les meilleurs livres pour améliorer votre relation à l'argent, investir intelligemment et bâtir votre liberté financière. Sélection de livres en français et en anglais." keywords="livres finance personnelle, livres investissement, liberté financière, meilleurs livres argent, livres budget, livres REER CELI" url="https://finivo.ca/bibliotheque" structuredData={generateBreadcrumbStructuredData(breadcrumbs)} />
      <Header />
      
      {/* Hero Section */}
      <section className="py-12 lg:py-16 bg-[#e5eabe]">
        <div className="container mx-auto px-4">
          {/* Breadcrumbs */}
          <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
            <Link to="/" className="hover:text-foreground transition-colors">Accueil</Link>
            <span>/</span>
            <span className="text-primary-foreground">Bibliothèque</span>
          </nav>

          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold mb-4 text-muted bg-[#acaf74]">
                <BookOpen className="w-4 h-4" />
                Bibliothèque
              </div>
              <h1 className="text-3xl lg:text-4xl font-extrabold mb-3 text-secondary">
                Bibliothèque Finance & Liberté Financière
              </h1>
              <p className="max-w-2xl text-lg text-muted-foreground">
                Les meilleurs livres pour améliorer votre relation à l'argent, investir intelligemment et bâtir votre liberté financière.
              </p>
            </div>
          </div>

          {/* Affiliate Disclosure */}
          

          {/* Search Bar */}
          <div className="mt-8 max-w-xl">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input type="text" placeholder="Rechercher par titre ou auteur..." value={filters.search} onChange={e => setFilters({
              ...filters,
              search: e.target.value
            })} className="pl-12 h-12 text-base" />
            </div>
          </div>

          {/* Category quick filters */}
          <div className="flex flex-wrap gap-2 mt-6">
            {categories.map(cat => <button key={cat.id} onClick={() => setFilters(prev => ({
            ...prev,
            categories: prev.categories.includes(cat.id) ? prev.categories.filter(c => c !== cat.id) : [...prev.categories, cat.id]
          }))} className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${filters.categories.includes(cat.id) ? 'bg-primary text-primary-foreground' : 'bg-background hover:bg-muted'}`}>
                {cat.icon} {cat.label}
              </button>)}
          </div>
        </div>
      </section>

      {/* Books Section */}
      <section id="books-list" className="py-12 lg:py-16">
        <div className="container mx-auto px-4">
          <div className="flex gap-8">
            {/* Desktop Sidebar */}
            <aside className="hidden lg:block w-80 flex-shrink-0">
              <BookFilterSidebar filters={filters} onFilterChange={setFilters} />
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
                      {activeFiltersCount > 0 && <span className="ml-2 w-5 h-5 rounded-full bg-primary text-primary-foreground text-xs flex items-center justify-center">
                          {activeFiltersCount}
                        </span>}
                    </Button>
                  </SheetTrigger>
                  <SheetContent side="left" className="w-80 p-0 overflow-y-auto">
                    <div className="p-4">
                      <BookFilterSidebar filters={filters} onFilterChange={setFilters} />
                    </div>
                  </SheetContent>
                </Sheet>
              </div>

              {/* Sort Controls */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
                <span className="text-sm text-muted-foreground">
                  {filteredBooks.length} livre{filteredBooks.length > 1 ? 's' : ''} trouvé{filteredBooks.length > 1 ? 's' : ''}
                </span>
                <Select value={filters.sortBy} onValueChange={(value: 'popularity' | 'beginner' | 'recommended' | 'title') => setFilters({
                ...filters,
                sortBy: value
              })}>
                  <SelectTrigger className="w-[200px]">
                    <SelectValue placeholder="Trier par" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="popularity">Popularité</SelectItem>
                    <SelectItem value="beginner">Pour débutants</SelectItem>
                    <SelectItem value="recommended">Les plus recommandés</SelectItem>
                    <SelectItem value="title">Titre A-Z</SelectItem>
                  </SelectContent>
                </Select>
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
                    Impossible de charger les livres. Veuillez réessayer.
                  </p>
                </div> : <div className="space-y-6">
                  {filteredBooks.map((book, index) => <BookCard key={book.id} book={book} index={index} />)}

                  {filteredBooks.length === 0 && <div className="text-center py-20 card-elevated rounded-2xl">
                      <div className="w-16 h-16 rounded-2xl bg-muted/50 flex items-center justify-center mx-auto mb-4">
                        <BookOpen className="w-8 h-8 text-muted-foreground" />
                      </div>
                      <h3 className="text-lg font-semibold text-foreground mb-2">Aucun livre trouvé</h3>
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
export default Library;