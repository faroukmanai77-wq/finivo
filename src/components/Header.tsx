import { CreditCard, Menu, X, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const handleNavClick = (href: string, isRoute: boolean = false) => {
    setIsMenuOpen(false);
    
    if (isRoute) {
      navigate(href);
      return;
    }

    // If we're not on the home page, navigate there first
    if (location.pathname !== '/') {
      navigate('/' + href);
      return;
    }

    // Scroll to section
    const elementId = href.replace('#', '');
    const element = document.getElementById(elementId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const navLinks = [
    { href: '#comparer', label: 'Comparer' },
    { href: '#categories', label: 'Catégories' },
    { href: '#guide', label: 'Guide' },
    { href: '/blog', label: 'Blog', isRoute: true },
    { href: '#faq', label: 'FAQ' },
  ];

  return (
    <header className="bg-card/80 backdrop-blur-xl border-b border-border/50 sticky top-0 z-50 shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-18 py-4">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <CreditCard className="w-8 h-8 text-primary group-hover:scale-110 transition-transform duration-300" />
            <div className="flex flex-col">
              <span className="font-bold text-2xl text-foreground tracking-tight leading-tight">Finivo</span>
              <span className="text-xs text-primary font-medium flex items-center gap-1">
                <span className="w-1.5 h-1.5 bg-primary rounded-full" />
                Québec
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <button
                key={link.href}
                onClick={() => handleNavClick(link.href, link.isRoute)}
                className="px-4 py-2 text-muted-foreground hover:text-foreground hover:bg-muted/50 rounded-lg transition-all font-medium text-sm"
              >
                {link.label}
              </button>
            ))}
          </nav>

          {/* Desktop CTA */}
          <div className="hidden md:block">
            <Button 
              className="btn-gradient font-semibold gap-2 shadow-lg"
              onClick={() => handleNavClick('#comparer')}
            >
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
              {navLinks.map((link) => (
                <button
                  key={link.href}
                  onClick={() => handleNavClick(link.href, link.isRoute)}
                  className="px-4 py-3 text-muted-foreground hover:text-foreground hover:bg-muted/50 rounded-lg transition-all font-medium text-left"
                >
                  {link.label}
                </button>
              ))}
              <Button 
                className="btn-gradient font-semibold gap-2 mt-2 w-full"
                onClick={() => handleNavClick('#comparer')}
              >
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
