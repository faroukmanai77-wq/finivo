import { CreditCard, Menu, X, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useState } from 'react';

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-card/80 backdrop-blur-xl border-b border-border/50 sticky top-0 z-50 shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-18 py-4">
          {/* Logo */}
          <a href="/" className="flex items-center gap-3 group">
            <div className="w-11 h-11 bg-gradient-to-br from-primary to-blue-600 rounded-xl flex items-center justify-center shadow-lg shadow-primary/20 group-hover:shadow-primary/40 transition-shadow">
              <CreditCard className="w-6 h-6 text-primary-foreground" />
            </div>
            <div>
              <span className="font-bold text-xl text-foreground tracking-tight">ComparCartes</span>
              <span className="hidden sm:block text-xs text-muted-foreground">Québec</span>
            </div>
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1">
            {[
              { href: '#comparer', label: 'Comparer' },
              { href: '#categories', label: 'Catégories' },
              { href: '#guide', label: 'Guide' },
              { href: '#faq', label: 'FAQ' },
            ].map((link) => (
              <a 
                key={link.href}
                href={link.href} 
                className="px-4 py-2 text-muted-foreground hover:text-foreground hover:bg-muted/50 rounded-lg transition-all font-medium text-sm"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Desktop CTA */}
          <div className="hidden md:block">
            <Button className="btn-gradient font-semibold gap-2 shadow-lg">
              <Sparkles className="w-4 h-4" />
              Trouver ma carte
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 hover:bg-muted/50 rounded-lg transition-colors"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? (
              <X className="w-6 h-6 text-foreground" />
            ) : (
              <Menu className="w-6 h-6 text-foreground" />
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <nav className="md:hidden py-4 border-t border-border/50 animate-fade-in">
            <div className="flex flex-col gap-2">
              {[
                { href: '#comparer', label: 'Comparer' },
                { href: '#categories', label: 'Catégories' },
                { href: '#guide', label: 'Guide' },
                { href: '#faq', label: 'FAQ' },
              ].map((link) => (
                <a 
                  key={link.href}
                  href={link.href} 
                  className="px-4 py-3 text-muted-foreground hover:text-foreground hover:bg-muted/50 rounded-lg transition-all font-medium"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {link.label}
                </a>
              ))}
              <Button className="btn-gradient font-semibold gap-2 mt-2">
                <Sparkles className="w-4 h-4" />
                Trouver ma carte
              </Button>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
};
