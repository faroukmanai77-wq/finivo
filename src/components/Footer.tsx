import { Mail, MapPin, Shield, FileText, DollarSign, Sparkles, ArrowRight, CreditCard, Calculator, Library, BookOpen } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import OnlineEarningsIllustration from '@/assets/illustrations/online-earnings.svg';

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
    <footer className="relative overflow-hidden">
      {/* Top Wave/Curve */}
      <div className="absolute top-0 left-0 right-0 h-20 bg-background" style={{
        clipPath: 'ellipse(70% 100% at 50% 100%)'
      }} />

      {/* Main Footer */}
      <div className="bg-foreground text-background pt-24 pb-8">
        <div className="container mx-auto px-4">
          {/* Top Section with CTA */}
          <div className="relative rounded-3xl bg-primary/20 p-8 lg:p-12 mb-16 overflow-hidden">
            {/* Decorative shapes */}
            <div className="absolute top-4 right-4 w-20 h-20 bg-accent/30 rounded-full blur-2xl" />
            <div className="absolute bottom-4 left-4 w-32 h-32 bg-warning/20 rounded-full blur-3xl" />
            
            <div className="relative z-10 grid lg:grid-cols-2 gap-8 items-center">
              <div>
                <h3 className="text-2xl lg:text-3xl font-extrabold text-background mb-3">
                  Prêt à optimiser vos finances?
                </h3>
                <p className="text-background/70 mb-6">
                  Comparez les meilleures cartes de crédit et plateformes de courtage au Québec. 100% gratuit.
                </p>
                <Link 
                  to="/comparateurs" 
                  className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-6 py-3 rounded-full font-semibold hover:bg-primary/90 transition-colors group"
                >
                  Commencer maintenant
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
              <div className="hidden lg:flex justify-center">
                <img 
                  src={OnlineEarningsIllustration} 
                  alt="Finances illustration" 
                  className="w-48 h-48 opacity-90"
                />
              </div>
            </div>
          </div>

          {/* Links Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
            {/* Brand */}
            <div>
              <Link to="/" className="flex items-center gap-2.5 mb-5 hover:opacity-80 transition-opacity">
                <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center">
                  <Sparkles className="w-5 h-5 text-primary-foreground" />
                </div>
                <span className="font-extrabold text-xl text-background">Finivo</span>
              </Link>
              <p className="text-background/60 text-sm leading-relaxed">
                La plateforme québécoise pour comparer les cartes de crédit, plateformes de courtage et planifier vos finances.
              </p>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="font-bold text-background mb-5">Navigation</h4>
              <ul className="space-y-3">
                {quickLinks.map(link => (
                  <li key={link.href}>
                    <Link 
                      to={link.href} 
                      className="flex items-center gap-2 text-background/60 hover:text-background transition-colors text-sm"
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
              <h4 className="font-bold text-background mb-5">Catégories</h4>
              <ul className="space-y-3">
                {categoryLinks.map(link => (
                  <li key={link.category}>
                    <button 
                      onClick={() => handleCategoryClick(link.category)} 
                      className="text-background/60 hover:text-background transition-colors text-sm text-left"
                    >
                      {link.label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact & Legal */}
            <div>
              <h4 className="font-bold text-background mb-5">Contact</h4>
              <ul className="space-y-3 text-sm">
                <li>
                  <a 
                    href="mailto:info@finivo.ca" 
                    className="flex items-center gap-2 text-background/60 hover:text-background transition-colors"
                  >
                    <Mail className="w-4 h-4" />
                    info@finivo.ca
                  </a>
                </li>
                <li className="flex items-center gap-2 text-background/60">
                  <MapPin className="w-4 h-4" />
                  Montréal, Québec
                </li>
              </ul>

              <h4 className="font-bold text-background mt-6 mb-4">Légal</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link 
                    to="/politique-confidentialite" 
                    className="flex items-center gap-2 text-background/60 hover:text-background transition-colors"
                  >
                    <Shield className="w-4 h-4" />
                    Confidentialité
                  </Link>
                </li>
                <li>
                  <Link 
                    to="/conditions-utilisation" 
                    className="flex items-center gap-2 text-background/60 hover:text-background transition-colors"
                  >
                    <FileText className="w-4 h-4" />
                    Conditions
                  </Link>
                </li>
                <li>
                  <Link 
                    to="/divulgation-affiliation" 
                    className="flex items-center gap-2 text-background/60 hover:text-background transition-colors"
                  >
                    <DollarSign className="w-4 h-4" />
                    Affiliation
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="border-t border-background/10 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <p className="text-sm text-background/50">
                © 2025 Finivo. Tous droits réservés. Fait avec ❤️ au Québec.
              </p>
              <div className="flex items-center gap-4">
                <span className="text-xs text-background/40 px-3 py-1 rounded-full bg-background/5">
                  🇨🇦 Canada
                </span>
                <span className="text-xs text-background/40 px-3 py-1 rounded-full bg-background/5">
                  🍁 Québec
                </span>
              </div>
            </div>
            <p className="text-xs text-background/40 mt-6 text-center max-w-3xl mx-auto">
              * Les taux et informations affichés sont fournis à titre indicatif et peuvent changer sans préavis. 
              Veuillez consulter le site officiel de l'émetteur pour les informations les plus récentes.
              Ce site peut recevoir une compensation pour les produits présentés.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};
