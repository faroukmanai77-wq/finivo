import { Menu, X, Calculator, BookOpen, Scale, Library, Globe } from 'lucide-react';
import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import { FinivoLogoWithText } from './FinivoLogo';
import { useLanguage } from '@/hooks/useLanguage';

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { currentLanguage, switchLanguage, otherLanguage, getLocalizedPath } = useLanguage();

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
      navigate(getLocalizedPath(href));
      return;
    }
    const basePath = getLocalizedPath('/');
    if (location.pathname !== basePath) {
      navigate(basePath + href);
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
    { href: '/comparateurs', label: t('common.comparators'), isRoute: true, icon: Scale },
    { href: '/calculateurs', label: t('common.calculators'), isRoute: true, icon: Calculator },
    { href: '/blog', label: t('common.blog'), isRoute: true, icon: BookOpen }
  ];

  const isActive = (href: string) => {
    const localizedHref = getLocalizedPath(href);
    return location.pathname === localizedHref || location.pathname.startsWith(localizedHref + '/');
  };

  const languageLabels = {
    fr: 'FR',
    en: 'EN'
  };

  return (
    <header className={`sticky top-0 z-50 transition-all duration-300 ${
      isScrolled 
        ? 'bg-card/95 backdrop-blur-xl shadow-lg border-b border-border/50' 
        : 'bg-transparent'
    }`}>
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-18 py-3">
          {/* Logo */}
          <Link to={getLocalizedPath('/')} className="group hover:opacity-90 transition-opacity">
            <FinivoLogoWithText size="md" />
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

          {/* Right side - Language Switcher + CTA */}
          <div className="hidden md:flex items-center gap-2">
            {/* Language Switcher */}
            <Button
              variant="ghost"
              size="sm"
              onClick={() => switchLanguage(otherLanguage)}
              className="gap-1.5 text-muted-foreground hover:text-foreground"
              aria-label={`Switch to ${otherLanguage === 'fr' ? 'French' : 'English'}`}
            >
              <Globe className="h-4 w-4" />
              <span className="font-medium">{languageLabels[otherLanguage]}</span>
            </Button>

            {/* CTA Button */}
            <Button 
              onClick={() => navigate(getLocalizedPath('/bibliotheque'))}
              className="bg-warning hover:bg-warning/90 text-warning-foreground rounded-full font-semibold gap-2 shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-200"
            >
              <Library className="w-4 h-4" />
              {t('common.library')}
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden p-2.5 hover:bg-muted/50 rounded-xl transition-colors active:scale-95" 
            onClick={() => setIsMenuOpen(!isMenuOpen)} 
            aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
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
            
            {/* Language Switcher Mobile */}
            <button 
              onClick={() => {
                switchLanguage(otherLanguage);
                setIsMenuOpen(false);
              }}
              className="flex items-center gap-3 px-4 py-3.5 rounded-xl transition-all font-medium text-left active:scale-[0.98] text-foreground hover:bg-muted/50"
            >
              <Globe className="w-5 h-5" />
              {otherLanguage === 'en' ? 'English' : 'Français'}
            </button>
            
            {/* Mobile CTA */}
            <div className="pt-3 mt-2 border-t border-border">
              <Button 
                onClick={() => {
                  setIsMenuOpen(false);
                  navigate(getLocalizedPath('/bibliotheque'));
                }}
                className="w-full bg-warning hover:bg-warning/90 text-warning-foreground rounded-xl font-semibold gap-2 shadow-lg"
              >
                <Library className="w-4 h-4" />
                {t('common.library')}
              </Button>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
};
