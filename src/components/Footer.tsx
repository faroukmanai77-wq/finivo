import { Mail, MapPin, Shield, FileText, DollarSign } from 'lucide-react';
import { Link } from 'react-router-dom';
import { LogoFinivo } from '@/components/LogoFinivo';

export const Footer = () => {
  return (
    <footer className="bg-secondary text-secondary-foreground">
      <div className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="md:col-span-1">
            <Link to="/" className="inline-block mb-4 hover:opacity-80 transition-opacity">
              <LogoFinivo size="md" />
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
              <li><a href="#" className="hover:text-secondary-foreground transition-colors">Remise en argent</a></li>
              <li><a href="#" className="hover:text-secondary-foreground transition-colors">Cartes voyage</a></li>
              <li><a href="#" className="hover:text-secondary-foreground transition-colors">Sans frais annuels</a></li>
              <li><a href="#" className="hover:text-secondary-foreground transition-colors">Cartes étudiants</a></li>
              <li><a href="#" className="hover:text-secondary-foreground transition-colors">Cartes premium</a></li>
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
                <a href="mailto:info@comparcartes.ca" className="hover:text-secondary-foreground transition-colors">
                  info@comparcartes.ca
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
              © 2025 ComparCartes. Tous droits réservés.
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
