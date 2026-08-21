import { Mail, MapPin, Shield, FileText, DollarSign, ArrowRight, CreditCard, Calculator, Library, BookOpen } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { FinivoLogoWithText } from './FinivoLogo';
import { useLanguage } from '@/hooks/useLanguage';

export const Footer = () => {
  const { t } = useTranslation();
  const { getLocalizedPath } = useLanguage();

  const categoryLinks = [
    { labelKey: 'footer.categoryLinks.cashback', category: 'cashback' },
    { labelKey: 'footer.categoryLinks.travel', category: 'travel' },
    { labelKey: 'footer.categoryLinks.noFee', category: 'no-fee' },
    { labelKey: 'footer.categoryLinks.student', category: 'student' },
    { labelKey: 'footer.categoryLinks.premium', category: 'premium' }
  ];

  const quickLinks = [
    { labelKey: 'common.comparators', href: '/comparateurs', icon: CreditCard },
    { labelKey: 'common.calculators', href: '/calculateurs', icon: Calculator },
    { labelKey: 'common.library', href: '/bibliotheque', icon: Library },
    { labelKey: 'common.blog', href: '/blog', icon: BookOpen }
  ];

  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-warning text-warning-foreground">
      <div className="container mx-auto px-4 pt-16 pb-8">
        {/* Top Section with CTA */}
        <div className="relative mb-16">
          <div className="relative z-10 grid lg:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-5xl lg:text-6xl font-display text-warning-foreground mb-2 leading-tight">
                {t('footer.cta.line1')}
              </h3>
              <h3 className="text-5xl lg:text-6xl font-display text-warning-foreground leading-tight relative inline-block">
                {t('footer.cta.line2')}
                <svg className="absolute -bottom-2 left-0 w-full h-4" viewBox="0 0 200 16" fill="none" preserveAspectRatio="none">
                  <path d="M2 8C40 2 80 14 120 8C160 2 190 10 198 6" stroke="hsl(var(--primary))" strokeWidth="4" strokeLinecap="round" />
                </svg>
              </h3>
            </div>
            <div className="flex justify-start lg:justify-end">
              <Link
                to={getLocalizedPath('/comparateurs')}
                className="inline-flex items-center gap-3 bg-card text-foreground px-6 py-4 rounded-full font-semibold hover:shadow-xl transition-all duration-200 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-warning"
              >
                {t('common.startNow')}
                <span className="w-10 h-10 rounded-full bg-warning flex items-center justify-center group-hover:bg-primary transition-colors duration-200">
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
            <Link
              to={getLocalizedPath('/')}
              className="inline-block mb-5 hover:opacity-80 transition-opacity duration-200 rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-warning"
            >
              <FinivoLogoWithText size="md" />
            </Link>
            <p className="text-warning-foreground/80 text-sm leading-relaxed">
              {t('footer.description')}
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-bold text-warning-foreground mb-5">{t('footer.navigation')}</h4>
            <ul className="space-y-3">
              {quickLinks.map(link => (
                <li key={link.href}>
                  <Link
                    to={getLocalizedPath(link.href)}
                    className="flex items-center gap-2 text-warning-foreground/80 hover:text-warning-foreground transition-colors duration-200 text-sm rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-warning"
                  >
                    <link.icon className="w-4 h-4" />
                    {t(link.labelKey)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h4 className="font-bold text-warning-foreground mb-5">{t('footer.categories')}</h4>
            <ul className="space-y-3">
              {categoryLinks.map(link => (
                <li key={link.category}>
                  <Link
                    to={getLocalizedPath(`/comparateurs/cartes-de-credit?category=${link.category}`)}
                    className="text-warning-foreground/80 hover:text-warning-foreground transition-colors duration-200 text-sm text-left rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-warning"
                  >
                    {t(link.labelKey)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact & Legal */}
          <div>
            <h4 className="font-bold text-warning-foreground mb-5">{t('footer.contact')}</h4>
            <ul className="space-y-3 text-sm">
              <li>
                <a
                  href="mailto:info@finivo.ca"
                  className="flex items-center gap-2 text-warning-foreground/80 hover:text-warning-foreground transition-colors duration-200 rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-warning"
                >
                  <Mail className="w-4 h-4" />
                  info@finivo.ca
                </a>
              </li>
              <li className="flex items-center gap-2 text-warning-foreground/80">
                <MapPin className="w-4 h-4" />
                {t('footer.location')}
              </li>
            </ul>

            <h4 className="font-bold text-warning-foreground mt-6 mb-4">{t('footer.legal')}</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  to={getLocalizedPath('/politique-confidentialite')}
                  className="flex items-center gap-2 text-warning-foreground/80 hover:text-warning-foreground transition-colors duration-200 rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-warning"
                >
                  <Shield className="w-4 h-4" />
                  {t('footer.privacy')}
                </Link>
              </li>
              <li>
                <Link
                  to={getLocalizedPath('/conditions-utilisation')}
                  className="flex items-center gap-2 text-warning-foreground/80 hover:text-warning-foreground transition-colors duration-200 rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-warning"
                >
                  <FileText className="w-4 h-4" />
                  {t('footer.terms')}
                </Link>
              </li>
              <li>
                <Link
                  to={getLocalizedPath('/divulgation-affiliation')}
                  className="flex items-center gap-2 text-warning-foreground/80 hover:text-warning-foreground transition-colors duration-200 rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-warning"
                >
                  <DollarSign className="w-4 h-4" />
                  {t('footer.affiliation')}
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-warning-foreground/20 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-warning-foreground/75">
              {t('footer.copyright', { year: currentYear })}
            </p>
            <div className="flex items-center gap-4">
              <span className="text-xs font-medium text-warning-foreground/80 px-3 py-1 rounded-full bg-warning-foreground/10">
                🇨🇦 Canada
              </span>
            </div>
          </div>
          <p className="text-xs text-warning-foreground/70 mt-6 text-center max-w-3xl mx-auto">
            {t('footer.disclaimer')}
          </p>
        </div>
      </div>
    </footer>
  );
};