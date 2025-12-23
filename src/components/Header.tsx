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
            <div className="relative w-12 h-12 bg-gradient-to-br from-primary via-primary/80 to-accent rounded-2xl flex items-center justify-center shadow-lg shadow-primary/25 group-hover:shadow-primary/40 group-hover:scale-105 transition-all duration-300">
              <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/20 to-transparent rounded-2xl" />
              <CreditCard className="w-6 h-6 text-primary-foreground relative z-10" />
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-accent rounded-full animate-pulse" />
            </div>
            <div className="flex flex-col">
              <span className="font-bold text-xl text-foreground tracking-tight leading-tight">ComparCartes</span>
              <span className="text-xs text-primary font-medium flex items-center gap-1">
                <span className="w-1.5 h-1.5 bg-accent rounded-full" />
                Québec
              </span>
            </div>
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1">
            {[
              { href: '#comparer', label: 'Comparer' },
              { href: '#categories', label: 'Catégories' },
              { href: '#guide', label: 'Guide' },
              { href: '/blog', label: 'Blog', isRoute: true },
              { href: '#faq', label: 'FAQ' },
            ].map((link) => (
              link.isRoute ? (
                <a 
                  key={link.href}
                  href={link.href} 
                  className="px-4 py-2 text-muted-foreground hover:text-foreground hover:bg-muted/50 rounded-lg transition-all font-medium text-sm"
                >
                  {link.label}
                </a>
              ) : (
                <a 
                  key={link.href}
                  href={link.href} 
                  className="px-4 py-2 text-muted-foreground hover:text-foreground hover:bg-muted/50 rounded-lg transition-all font-medium text-sm"
                >
                  {link.label}
                </a>
              )
            ))}
          </nav>

          {/* Desktop CTA */}
          <div className="hidden md:block">
            <a href="#comparer">
              <Button className="btn-gradient font-semibold gap-2 shadow-lg">
                <Sparkles className="w-4 h-4" />
                Trouver ma carte
              </Button>
            </a>
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
                { href: '/blog', label: 'Blog', isRoute: true },
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
              <a href="#comparer">
                <Button className="btn-gradient font-semibold gap-2 mt-2 w-full" onClick={() => setIsMenuOpen(false)}>
                  <Sparkles className="w-4 h-4" />
                  Trouver ma carte
                </Button>
              </a>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
};
