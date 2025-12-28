import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Shield, Lock, Eye, UserCheck, Database, Bell } from 'lucide-react';

const PolitiqueConfidentialite = () => {
  const sections = [
    {
      icon: Eye,
      title: "Collecte de renseignements personnels",
      content: `Conformément à la Loi 25 sur la protection des renseignements personnels dans le secteur privé du Québec, nous collectons uniquement les renseignements nécessaires à la fourniture de nos services de comparaison de cartes de crédit.

Les renseignements que nous pouvons collecter incluent :
• Informations de navigation (pages visitées, durée des visites)
• Adresse IP et données de localisation approximative
• Informations fournies volontairement via nos formulaires
• Préférences de navigation et cookies techniques`
    },
    {
      icon: Database,
      title: "Utilisation des renseignements",
      content: `Vos renseignements personnels sont utilisés exclusivement pour :
• Améliorer votre expérience de navigation sur notre plateforme
• Personnaliser les recommandations de cartes de crédit
• Analyser l'utilisation de notre site pour l'améliorer
• Communiquer avec vous si vous nous contactez
• Respecter nos obligations légales

Nous ne vendons jamais vos renseignements personnels à des tiers.`
    },
    {
      icon: Lock,
      title: "Protection des données",
      content: `Nous mettons en œuvre des mesures de sécurité appropriées pour protéger vos renseignements personnels contre tout accès, utilisation ou divulgation non autorisés :
• Chiffrement SSL/TLS pour toutes les communications
• Accès limité aux données personnelles
• Surveillance continue de nos systèmes
• Formation de notre personnel sur la protection des données`
    },
    {
      icon: UserCheck,
      title: "Vos droits (Loi 25)",
      content: `En vertu de la Loi 25 du Québec, vous disposez des droits suivants :
• Droit d'accès à vos renseignements personnels
• Droit de rectification de vos données
• Droit à l'effacement de vos données
• Droit à la portabilité de vos données
• Droit de retirer votre consentement

Pour exercer ces droits, contactez-nous à : info@finivo.ca`
    },
    {
      icon: Bell,
      title: "Cookies et technologies similaires",
      content: `Nous utilisons des cookies pour :
• Assurer le bon fonctionnement du site
• Mémoriser vos préférences
• Analyser le trafic (cookies analytiques)
• Améliorer nos services

Vous pouvez gérer vos préférences de cookies à tout moment via les paramètres de votre navigateur.`
    }
  ];

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative py-16 md:py-24 bg-gradient-to-b from-primary/5 via-background to-background overflow-hidden">
          <div className="absolute inset-0 opacity-30">
            <div className="absolute top-20 left-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl" />
            <div className="absolute bottom-10 right-10 w-96 h-96 bg-accent/10 rounded-full blur-3xl" />
          </div>
          
          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-4xl mx-auto text-center animate-fade-in">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-primary to-primary/80 rounded-3xl mb-6 shadow-lg shadow-primary/25">
                <Shield className="w-10 h-10 text-primary-foreground" />
              </div>
              <h1 className="text-3xl md:text-5xl font-bold text-foreground mb-4">
                Politique de confidentialité
              </h1>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Votre vie privée est notre priorité. Cette politique explique comment nous collectons, 
                utilisons et protégeons vos renseignements personnels conformément à la Loi 25 du Québec.
              </p>
              <p className="text-sm text-muted-foreground mt-4">
                Dernière mise à jour : Décembre 2025
              </p>
            </div>
          </div>
        </section>

        {/* Content Sections */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto space-y-8">
              {sections.map((section, index) => (
                <div 
                  key={section.title}
                  className="bg-card rounded-2xl border border-border/50 p-8 shadow-sm hover:shadow-md hover:shadow-primary/5 transition-all duration-300 animate-fade-in"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
                      <section.icon className="w-6 h-6 text-primary" />
                    </div>
                    <div className="flex-1">
                      <h2 className="text-xl font-semibold text-foreground mb-4">
                        {section.title}
                      </h2>
                      <div className="text-muted-foreground whitespace-pre-line leading-relaxed">
                        {section.content}
                      </div>
                    </div>
                  </div>
                </div>
              ))}

              {/* Contact Section */}
              <div className="bg-gradient-to-br from-primary/5 to-accent/5 rounded-2xl border border-border/50 p-8 text-center">
                <h2 className="text-xl font-semibold text-foreground mb-4">
                  Questions ou préoccupations ?
                </h2>
                <p className="text-muted-foreground mb-4">
                  Si vous avez des questions concernant notre politique de confidentialité ou souhaitez exercer vos droits, 
                  n'hésitez pas à nous contacter.
                </p>
                <p className="text-foreground font-medium">
                  Responsable de la protection des renseignements personnels<br />
                  <a href="mailto:info@finivo.ca" className="text-primary hover:underline">
                    info@finivo.ca
                  </a>
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default PolitiqueConfidentialite;
