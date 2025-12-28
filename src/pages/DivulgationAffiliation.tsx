import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { DollarSign, Handshake, Target, Heart, BadgeCheck, HelpCircle } from 'lucide-react';

const DivulgationAffiliation = () => {
  const sections = [
    {
      icon: Handshake,
      title: "Notre modèle d'affaires",
      content: `Finivo est un service gratuit de comparaison de cartes de crédit. Nous générons des revenus grâce à des partenariats d'affiliation avec les émetteurs de cartes de crédit.

Lorsque vous cliquez sur un lien vers une carte de crédit et que vous êtes approuvé pour cette carte, nous pouvons recevoir une compensation de l'émetteur. Cette compensation nous permet de maintenir notre service gratuit et de continuer à vous offrir des outils de comparaison de qualité.`
    },
    {
      icon: Target,
      title: "Impact sur nos recommandations",
      content: `Nous nous engageons à la transparence totale concernant nos relations d'affiliation :
• La compensation reçue peut influencer l'ordre d'affichage des cartes
• Certaines cartes en vedette peuvent être des partenaires rémunérés
• Nous n'offrons pas toutes les cartes disponibles sur le marché canadien

Cependant, nos évaluations et descriptions de produits restent objectives et basées sur les caractéristiques réelles des cartes.`
    },
    {
      icon: BadgeCheck,
      title: "Notre engagement d'objectivité",
      content: `Malgré nos relations d'affiliation, nous nous engageons à :
• Fournir des informations exactes et à jour sur chaque carte
• Présenter les avantages ET les inconvénients de chaque produit
• Permettre des comparaisons basées sur vos besoins réels
• Ne jamais recommander un produit inadapté pour des raisons financières
• Mettre à jour régulièrement nos évaluations

Votre confiance est notre priorité absolue.`
    },
    {
      icon: DollarSign,
      title: "Types de compensations",
      content: `Nous pouvons recevoir différents types de compensations :
• Commission fixe par approbation de demande
• Commission basée sur le montant des premiers achats
• Paiement pour le placement en vedette
• Bonus pour certaines promotions

Ces compensations proviennent des émetteurs de cartes, jamais des utilisateurs. Nos services restent entièrement gratuits pour vous.`
    },
    {
      icon: Heart,
      title: "Ce qui ne change jamais",
      content: `Quelle que soit notre relation avec les émetteurs :
• Les taux d'intérêt affichés sont toujours exacts
• Les frais annuels sont clairement indiqués
• Les avantages et conditions sont fidèlement rapportés
• Vos demandes vont directement aux émetteurs
• Nous ne partageons jamais vos données avec des tiers non autorisés

Nous croyons qu'un service transparent génère la confiance et les meilleures décisions pour nos utilisateurs.`
    },
    {
      icon: HelpCircle,
      title: "Comment choisir la bonne carte",
      content: `Notre conseil : ne vous fiez pas uniquement à l'ordre d'affichage. Utilisez nos filtres et outils de comparaison pour trouver la carte qui correspond vraiment à vos besoins :
• Évaluez vos habitudes de dépenses
• Considérez les frais annuels vs les avantages
• Vérifiez les taux d'intérêt si vous prévoyez un solde
• Lisez les conditions sur le site de l'émetteur

En cas de doute, consultez un conseiller financier agréé.`
    }
  ];

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative py-16 md:py-24 bg-gradient-to-b from-primary/5 via-background to-background overflow-hidden">
          <div className="absolute inset-0 opacity-30">
            <div className="absolute top-10 left-1/4 w-72 h-72 bg-primary/10 rounded-full blur-3xl" />
            <div className="absolute bottom-20 right-1/4 w-96 h-96 bg-accent/10 rounded-full blur-3xl" />
          </div>
          
          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-4xl mx-auto text-center animate-fade-in">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-primary to-primary/80 rounded-3xl mb-6 shadow-lg shadow-primary/25">
                <DollarSign className="w-10 h-10 text-primary-foreground" />
              </div>
              <h1 className="text-3xl md:text-5xl font-bold text-foreground mb-4">
                Divulgation d'affiliation
              </h1>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                La transparence est au cœur de notre mission. Découvrez comment nous finançons 
                notre service gratuit et comment cela peut affecter nos recommandations.
              </p>
              <p className="text-sm text-muted-foreground mt-4">
                Dernière mise à jour : Décembre 2025
              </p>
            </div>
          </div>
        </section>

        {/* Important Notice */}
        <section className="py-8">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="bg-primary/10 border border-primary/20 rounded-2xl p-6 animate-fade-in">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-10 h-10 bg-primary/20 rounded-xl flex items-center justify-center">
                    <DollarSign className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h2 className="text-lg font-semibold text-foreground mb-2">
                      Avis important
                    </h2>
                    <p className="text-muted-foreground">
                      Ce site peut recevoir une compensation lorsque vous cliquez sur des liens vers 
                      des produits financiers et/ou demandez des cartes de crédit. Cela n'influence 
                      pas notre évaluation éditoriale des produits, mais peut affecter l'ordre 
                      d'affichage et les produits que nous choisissons de présenter.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Content Sections */}
        <section className="py-8 pb-16">
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
                  Questions sur nos partenariats ?
                </h2>
                <p className="text-muted-foreground mb-4">
                  Si vous avez des questions concernant nos relations d'affiliation ou nos méthodes 
                  de recommandation, n'hésitez pas à nous contacter.
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

export default DivulgationAffiliation;
