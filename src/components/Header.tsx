import { Wallet, Menu, X, Calculator, BookOpen, Scale, Library } from 'lucide-react';
import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

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
  const navLinks = [{
    href: '/comparateurs',
    label: 'Comparateurs',
    isRoute: true,
    icon: Scale
  }, {
    href: '/calculateurs',
    label: 'Calculateurs',
    isRoute: true,
    icon: Calculator
  }, {
    href: '/bibliotheque',
    label: 'Bibliothèque',
    isRoute: true,
    icon: Library
  }, {
    href: '/blog',
    label: 'Blog',
    isRoute: true,
    icon: BookOpen
  }];
  const isActive = (href: string) => location.pathname === href || location.pathname.startsWith(href + '/');
  return <header className="bg-card/95 backdrop-blur-xl border-b border-border/50 sticky top-0 z-50 shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <Wallet className="w-7 h-7 sm:w-8 sm:h-8 group-hover:scale-110 transition-transform duration-300 text-card" />
            <span className="font-bold text-xl sm:text-2xl text-foreground tracking-tight">Finivo</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map(link => <button key={link.href} onClick={() => handleNavClick(link.href, link.isRoute)} className={`px-4 py-2 rounded-lg transition-all font-medium text-sm ${isActive(link.href) ? 'text-primary bg-primary/10' : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'}`}>
                {link.label}
              </button>)}
          </nav>


          {/* Mobile Menu Button */}
          <button className="md:hidden p-2.5 hover:bg-muted/50 rounded-xl transition-colors active:scale-95" onClick={() => setIsMenuOpen(!isMenuOpen)} aria-label={isMenuOpen ? 'Fermer le menu' : 'Ouvrir le menu'}>
            {isMenuOpen ? <X className="w-6 h-6 text-foreground" /> : <Menu className="w-6 h-6 text-foreground" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Overlay */}
      <div className={`md:hidden fixed inset-0 top-16 bg-background/80 backdrop-blur-sm transition-opacity duration-300 ${isMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`} onClick={() => setIsMenuOpen(false)} />

      {/* Mobile Navigation Menu */}
      <nav className={`md:hidden fixed left-0 right-0 top-16 bg-card border-b border-border shadow-xl transition-all duration-300 ease-out ${isMenuOpen ? 'translate-y-0 opacity-100' : '-translate-y-4 opacity-0 pointer-events-none'}`}>
        <div className="container mx-auto px-4 py-4">
          <div className="flex flex-col gap-1">
            {navLinks.map(link => {
            const Icon = link.icon;
            return <button key={link.href} onClick={() => handleNavClick(link.href, link.isRoute)} className={`flex items-center gap-3 px-4 py-3.5 rounded-xl transition-all font-medium text-left active:scale-[0.98] ${isActive(link.href) ? 'text-primary bg-primary/10' : 'text-foreground hover:bg-muted/50'}`}>
                  <Icon className="w-5 h-5" />
                  {link.label}
                </button>;
          })}
            
          </div>
        </div>
      </nav>
    </header>;
};