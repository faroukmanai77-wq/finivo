import { CreditCard, Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useState } from 'react';

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-card border-b border-border sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <a href="/" className="flex items-center gap-2">
            <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
              <CreditCard className="w-6 h-6 text-primary-foreground" />
            </div>
            <span className="font-bold text-xl text-foreground">ComparCartes</span>
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            <a href="#comparer" className="text-muted-foreground hover:text-foreground transition-colors">
              Comparer
            </a>
            <a href="#categories" className="text-muted-foreground hover:text-foreground transition-colors">
              Catégories
            </a>
            <a href="#guide" className="text-muted-foreground hover:text-foreground transition-colors">
              Guide
            </a>
            <a href="#faq" className="text-muted-foreground hover:text-foreground transition-colors">
              FAQ
            </a>
          </nav>

          {/* Desktop CTA */}
          <div className="hidden md:block">
            <Button>Trouver ma carte</Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2"
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
          <nav className="md:hidden py-4 border-t border-border">
            <div className="flex flex-col gap-4">
              <a href="#comparer" className="text-muted-foreground hover:text-foreground transition-colors">
                Comparer
              </a>
              <a href="#categories" className="text-muted-foreground hover:text-foreground transition-colors">
                Catégories
              </a>
              <a href="#guide" className="text-muted-foreground hover:text-foreground transition-colors">
                Guide
              </a>
              <a href="#faq" className="text-muted-foreground hover:text-foreground transition-colors">
                FAQ
              </a>
              <Button className="w-full">Trouver ma carte</Button>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
};
