import { CreditCard, Mail, MapPin, Shield, FileText, DollarSign } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

export const Footer = () => {
  const navigate = useNavigate();

  const handleCategoryClick = (category: string) => {
    // Navigate to home page first if not already there
    navigate('/');
    
    // Wait for navigation, then dispatch filter event and scroll
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
    { label: 'Cartes premium', category: 'premium' },
  ];

  return (
    <footer className="bg-secondary text-secondary-foreground">
      <div className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="md:col-span-1">
            <Link to="/" className="flex items-center gap-2 mb-4 hover:opacity-80 transition-opacity">
              <CreditCard className="w-7 h-7 text-primary" />
              <span className="font-bold text-2xl">Finivo</span>
            </Link>
            <p className="text-secondary-foreground/70 text-sm">
              Le meilleur comparateur de cartes de crédit au Québec. 
              Trouvez la carte parfaite pour vos besoins.
            </p>
          </div>

          {/* Categories */}
          <div>
            <h4 className="font-semibold mb-4">Catégories</h4>
            <ul className="space-y-2 text-sm text-secondary-foreground/70">
              {categoryLinks.map((link) => (
                <li key={link.category}>
                  <button
                    onClick={() => handleCategoryClick(link.category)}
                    className="hover:text-secondary-foreground transition-colors text-left"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="font-semibold mb-4">Légal</h4>
            <ul className="space-y-3 text-sm text-secondary-foreground/70">
              <li>
                <Link to="/politique-confidentialite" className="hover:text-secondary-foreground transition-colors flex items-center gap-2">
                  <Shield className="w-4 h-4" />
                  Politique de confidentialité
                </Link>
              </li>
              <li>
                <Link to="/conditions-utilisation" className="hover:text-secondary-foreground transition-colors flex items-center gap-2">
                  <FileText className="w-4 h-4" />
                  Conditions d'utilisation
                </Link>
              </li>
              <li>
                <Link to="/divulgation-affiliation" className="hover:text-secondary-foreground transition-colors flex items-center gap-2">
                  <DollarSign className="w-4 h-4" />
                  Divulgation d'affiliation
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold mb-4">Contact</h4>
            <ul className="space-y-3 text-sm text-secondary-foreground/70">
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4" />
                <a href="mailto:info@finivo.ca" className="hover:text-secondary-foreground transition-colors">
                  info@finivo.ca
                </a>
              </li>
              <li className="flex items-center gap-2">
                <MapPin className="w-4 h-4" />
                <span>Montréal, Québec</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-secondary-foreground/20 mt-10 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-secondary-foreground/60">
              © 2025 Finivo. Tous droits réservés.
            </p>
            <div className="flex gap-6 text-sm text-secondary-foreground/60">
              <Link to="/politique-confidentialite" className="hover:text-secondary-foreground transition-colors">
                Confidentialité
              </Link>
              <Link to="/conditions-utilisation" className="hover:text-secondary-foreground transition-colors">
                Conditions
              </Link>
              <Link to="/divulgation-affiliation" className="hover:text-secondary-foreground transition-colors">
                Affiliation
              </Link>
            </div>
          </div>
          <p className="text-xs text-secondary-foreground/50 mt-4 text-center">
            * Les taux et informations affichés sont fournis à titre indicatif et peuvent changer sans préavis. 
            Veuillez consulter le site officiel de l'émetteur pour les informations les plus récentes.
            Ce site peut recevoir une compensation pour les produits présentés.
          </p>
        </div>
      </div>
    </footer>
  );
};
