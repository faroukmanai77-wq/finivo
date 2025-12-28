import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { FileText, Scale, AlertTriangle, CheckCircle, Ban, Gavel } from 'lucide-react';

const ConditionsUtilisation = () => {
  const sections = [
    {
      icon: CheckCircle,
      title: "Acceptation des conditions",
      content: `En accédant et en utilisant le site Finivo (finivo.ca), vous acceptez d'être lié par les présentes conditions d'utilisation. Si vous n'acceptez pas ces conditions, veuillez ne pas utiliser notre site.

Ces conditions sont régies par les lois du Québec et du Canada. Tout litige sera soumis à la compétence exclusive des tribunaux du Québec.`
    },
    {
      icon: Scale,
      title: "Nature des services",
      content: `Finivo est un service de comparaison de cartes de crédit destiné aux consommateurs canadiens, particulièrement québécois.

Nos services incluent :
• Comparaison objective de cartes de crédit
• Information sur les caractéristiques des produits financiers
• Outils de calcul et de simulation
• Contenu éducatif sur les finances personnelles

Nous ne sommes pas un conseiller financier agréé et nos informations ne constituent pas des conseils financiers personnalisés.`
    },
    {
      icon: AlertTriangle,
      title: "Limitation de responsabilité",
      content: `Les informations présentées sur notre site sont fournies à titre indicatif uniquement :
• Les taux, frais et conditions peuvent changer sans préavis
• Nous nous efforçons de maintenir des informations exactes, mais ne garantissons pas leur exhaustivité
• Consultez toujours le site officiel de l'émetteur avant de faire une demande
• Nous ne sommes pas responsables des décisions prises sur la base de nos informations

Votre admissibilité à une carte de crédit dépend de l'évaluation de l'émetteur.`
    },
    {
      icon: Ban,
      title: "Utilisations interdites",
      content: `Vous vous engagez à ne pas :
• Utiliser notre site à des fins illégales ou frauduleuses
• Tenter d'accéder à des zones non autorisées du site
• Reproduire, dupliquer ou copier notre contenu sans autorisation
• Utiliser des robots, scrapers ou outils automatisés
• Transmettre des virus ou codes malveillants
• Usurper l'identité d'une autre personne

Toute violation peut entraîner la suspension de votre accès.`
    },
    {
      icon: FileText,
      title: "Propriété intellectuelle",
      content: `Tout le contenu du site Finivo est protégé par les droits d'auteur canadiens :
• Textes, graphiques, logos et images
• Design et mise en page du site
• Outils de calcul et fonctionnalités
• Base de données de produits

L'utilisation non autorisée de notre contenu est strictement interdite. Les marques de commerce des émetteurs de cartes appartiennent à leurs propriétaires respectifs.`
    },
    {
      icon: Gavel,
      title: "Modification des conditions",
      content: `Nous nous réservons le droit de modifier ces conditions à tout moment. Les modifications entrent en vigueur dès leur publication sur le site.

Votre utilisation continue du site après la publication des modifications constitue votre acceptation des nouvelles conditions.

Nous vous encourageons à consulter régulièrement cette page pour rester informé des mises à jour.`
    }
  ];

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative py-16 md:py-24 bg-gradient-to-b from-primary/5 via-background to-background overflow-hidden">
          <div className="absolute inset-0 opacity-30">
            <div className="absolute top-20 right-20 w-72 h-72 bg-primary/10 rounded-full blur-3xl" />
            <div className="absolute bottom-10 left-10 w-96 h-96 bg-accent/10 rounded-full blur-3xl" />
          </div>
          
          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-4xl mx-auto text-center animate-fade-in">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-primary to-primary/80 rounded-3xl mb-6 shadow-lg shadow-primary/25">
                <FileText className="w-10 h-10 text-primary-foreground" />
              </div>
              <h1 className="text-3xl md:text-5xl font-bold text-foreground mb-4">
                Conditions d'utilisation
              </h1>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Veuillez lire attentivement ces conditions avant d'utiliser notre service de 
                comparaison de cartes de crédit.
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
                  Des questions ?
                </h2>
                <p className="text-muted-foreground mb-4">
                  Si vous avez des questions concernant ces conditions d'utilisation, 
                  n'hésitez pas à nous contacter.
                </p>
                <p className="text-foreground font-medium">
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

export default ConditionsUtilisation;
