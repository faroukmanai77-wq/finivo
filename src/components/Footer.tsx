import { Mail, MapPin, Shield, FileText, DollarSign, ArrowRight, CreditCard, Calculator, Library, BookOpen } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { FinivoLogoWithText } from './FinivoLogo';

export const Footer = () => {
  const navigate = useNavigate();

  const handleCategoryClick = (category: string) => {
    navigate('/');
    setTimeout(() => {
      window.dispatchEvent(new CustomEvent('setCategoryFilter', { detail: category }));
      const comparerSection = document.getElementById('comparer');
      if (comparerSection) {
        comparerSection.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  };

  const categoryLinks = [
    { label: 'Remise en argent', category: 'cashback' },
    { label: 'Cartes voyage', category: 'travel' },
    { label: 'Sans frais annuels', category: 'no-fee' },
    { label: 'Cartes étudiants', category: 'student' },
    { label: 'Cartes premium', category: 'premium' }
  ];

  const quickLinks = [
    { label: 'Comparateurs', href: '/comparateurs', icon: CreditCard },
    { label: 'Calculateurs', href: '/calculateurs', icon: Calculator },
    { label: 'Bibliothèque', href: '/bibliotheque', icon: Library },
    { label: 'Blog', href: '/blog', icon: BookOpen }
  ];

  return (
    <footer className="bg-warning text-warning-foreground">
      <div className="container mx-auto px-4 pt-16 pb-8">
        {/* Top Section with CTA */}
        <div className="relative mb-16">
          <div className="relative z-10 grid lg:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-5xl lg:text-6xl font-display text-warning-foreground mb-2 leading-tight">
                Passez à
              </h3>
              <h3 className="text-5xl lg:text-6xl font-display text-warning-foreground leading-tight relative inline-block">
                l'action
                <svg className="absolute -bottom-2 left-0 w-full h-4" viewBox="0 0 200 16" fill="none" preserveAspectRatio="none">
                  <path d="M2 8C40 2 80 14 120 8C160 2 190 10 198 6" stroke="hsl(var(--primary))" strokeWidth="4" strokeLinecap="round" />
                </svg>
              </h3>
            </div>
            <div className="flex justify-start lg:justify-end">
              <Link 
                to="/comparateurs" 
                className="inline-flex items-center gap-3 bg-card text-foreground px-6 py-4 rounded-full font-semibold hover:shadow-xl transition-all group"
              >
                Commencer maintenant
                <span className="w-10 h-10 rounded-full bg-warning flex items-center justify-center group-hover:bg-primary transition-colors">
                  <ArrowRight className="w-5 h-5 text-warning-foreground group-hover:text-primary-foreground" />
                </span>
              </Link>
            </div>
          </div>
        </div>

        {/* Links Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          {/* Brand */}
          <div>
            <Link to="/" className="inline-block mb-5 hover:opacity-80 transition-opacity">
              <FinivoLogoWithText size="md" />
            </Link>
            <p className="text-warning-foreground/70 text-sm leading-relaxed">
              La plateforme québécoise pour comparer les cartes de crédit, plateformes de courtage et planifier vos finances.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-bold text-warning-foreground mb-5">Navigation</h4>
            <ul className="space-y-3">
              {quickLinks.map(link => (
                <li key={link.href}>
                  <Link 
                    to={link.href} 
                    className="flex items-center gap-2 text-warning-foreground/70 hover:text-warning-foreground transition-colors text-sm"
                  >
                    <link.icon className="w-4 h-4" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h4 className="font-bold text-warning-foreground mb-5">Catégories</h4>
            <ul className="space-y-3">
              {categoryLinks.map(link => (
                <li key={link.category}>
                  <button 
                    onClick={() => handleCategoryClick(link.category)} 
                    className="text-warning-foreground/70 hover:text-warning-foreground transition-colors text-sm text-left"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact & Legal */}
          <div>
            <h4 className="font-bold text-warning-foreground mb-5">Contact</h4>
            <ul className="space-y-3 text-sm">
              <li>
                <a 
                  href="mailto:info@finivo.ca" 
                  className="flex items-center gap-2 text-warning-foreground/70 hover:text-warning-foreground transition-colors"
                >
                  <Mail className="w-4 h-4" />
                  info@finivo.ca
                </a>
              </li>
              <li className="flex items-center gap-2 text-warning-foreground/70">
                <MapPin className="w-4 h-4" />
                Montréal, Québec
              </li>
            </ul>

            <h4 className="font-bold text-warning-foreground mt-6 mb-4">Légal</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link 
                  to="/politique-confidentialite" 
                  className="flex items-center gap-2 text-warning-foreground/70 hover:text-warning-foreground transition-colors"
                >
                  <Shield className="w-4 h-4" />
                  Confidentialité
                </Link>
              </li>
              <li>
                <Link 
                  to="/conditions-utilisation" 
                  className="flex items-center gap-2 text-warning-foreground/70 hover:text-warning-foreground transition-colors"
                >
                  <FileText className="w-4 h-4" />
                  Conditions
                </Link>
              </li>
              <li>
                <Link 
                  to="/divulgation-affiliation" 
                  className="flex items-center gap-2 text-warning-foreground/70 hover:text-warning-foreground transition-colors"
                >
                  <DollarSign className="w-4 h-4" />
                  Affiliation
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-warning-foreground/20 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-warning-foreground/60">
              © 2025 Finivo. Tous droits réservés. Fait avec ❤️ au Québec.
            </p>
            <div className="flex items-center gap-4">
              <span className="text-xs text-warning-foreground/50 px-3 py-1 rounded-full bg-warning-foreground/10">
                🇨🇦 Canada
              </span>
              <span className="text-xs text-warning-foreground/50 px-3 py-1 rounded-full bg-warning-foreground/10">
                🍁 Québec
              </span>
            </div>
          </div>
          <p className="text-xs text-warning-foreground/50 mt-6 text-center max-w-3xl mx-auto">
            * Les taux et informations affichés sont fournis à titre indicatif et peuvent changer sans préavis. 
            Veuillez consulter le site officiel de l'émetteur pour les informations les plus récentes.
            Ce site peut recevoir une compensation pour les produits présentés.
          </p>
        </div>
      </div>
    </footer>
  );
};
