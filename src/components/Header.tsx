import { Menu, X, Calculator, BookOpen, Scale, Library, Sparkles } from 'lucide-react';
import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import logoFinivo from '@/assets/logo-finivo.png';

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close menu on route change
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname]);

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMenuOpen]);

  const handleNavClick = (href: string, isRoute: boolean = false) => {
    setIsMenuOpen(false);
    if (isRoute) {
      navigate(href);
      return;
    }
    if (location.pathname !== '/') {
      navigate('/' + href);
      return;
    }
    const elementId = href.replace('#', '');
    const element = document.getElementById(elementId);
    if (element) {
      element.scrollIntoView({
        behavior: 'smooth'
      });
    }
  };

  const navLinks = [
    { href: '/comparateurs', label: 'Comparateurs', isRoute: true, icon: Scale },
    { href: '/calculateurs', label: 'Calculateurs', isRoute: true, icon: Calculator },
    { href: '/bibliotheque', label: 'Bibliothèque', isRoute: true, icon: Library },
    { href: '/blog', label: 'Blog', isRoute: true, icon: BookOpen }
  ];

  const isActive = (href: string) => location.pathname === href || location.pathname.startsWith(href + '/');

  return (
    <header className={`sticky top-0 z-50 transition-all duration-300 ${
      isScrolled 
        ? 'bg-card/95 backdrop-blur-xl shadow-lg border-b border-border/50' 
        : 'bg-transparent'
    }`}>
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-18 py-3">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2.5 group">
            <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center group-hover:scale-105 transition-transform shadow-md">
              <Sparkles className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="font-extrabold text-xl text-foreground tracking-tight">Finivo</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map(link => (
              <button 
                key={link.href} 
                onClick={() => handleNavClick(link.href, link.isRoute)} 
                className={`px-4 py-2.5 rounded-full transition-all font-medium text-sm ${
                  isActive(link.href) 
                    ? 'text-primary bg-primary/10' 
                    : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
                }`}
              >
                {link.label}
              </button>
            ))}
          </nav>

          {/* CTA Button - Desktop */}
          <div className="hidden md:block">
            <Button 
              onClick={() => navigate('/comparateurs/cartes-de-credit')}
              className="btn-gradient rounded-full font-semibold gap-2"
            >
              <Scale className="w-4 h-4" />
              Comparer maintenant
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden p-2.5 hover:bg-muted/50 rounded-xl transition-colors active:scale-95" 
            onClick={() => setIsMenuOpen(!isMenuOpen)} 
            aria-label={isMenuOpen ? 'Fermer le menu' : 'Ouvrir le menu'}
          >
            {isMenuOpen ? <X className="w-6 h-6 text-foreground" /> : <Menu className="w-6 h-6 text-foreground" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Overlay */}
      <div 
        className={`md:hidden fixed inset-0 top-[72px] bg-background/80 backdrop-blur-sm transition-opacity duration-300 ${
          isMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`} 
        onClick={() => setIsMenuOpen(false)} 
      />

      {/* Mobile Navigation Menu */}
      <nav className={`md:hidden fixed left-0 right-0 top-[72px] bg-card border-b border-border shadow-xl transition-all duration-300 ease-out ${
        isMenuOpen ? 'translate-y-0 opacity-100' : '-translate-y-4 opacity-0 pointer-events-none'
      }`}>
        <div className="container mx-auto px-4 py-4">
          <div className="flex flex-col gap-1">
            {navLinks.map(link => {
              const Icon = link.icon;
              return (
                <button 
                  key={link.href} 
                  onClick={() => handleNavClick(link.href, link.isRoute)} 
                  className={`flex items-center gap-3 px-4 py-3.5 rounded-xl transition-all font-medium text-left active:scale-[0.98] ${
                    isActive(link.href) 
                      ? 'text-primary bg-primary/10' 
                      : 'text-foreground hover:bg-muted/50'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  {link.label}
                </button>
              );
            })}
            
            {/* Mobile CTA */}
            <div className="pt-3 mt-2 border-t border-border">
              <Button 
                onClick={() => {
                  setIsMenuOpen(false);
                  navigate('/comparateurs/cartes-de-credit');
                }}
                className="w-full btn-gradient rounded-xl font-semibold gap-2"
              >
                <Scale className="w-4 h-4" />
                Comparer maintenant
              </Button>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
};
