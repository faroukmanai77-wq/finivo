import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

const faqItems = [
  {
    question: "Comment fonctionne le comparateur de cartes de crédit?",
    answer: "Notre comparateur rassemble les informations des principales cartes de crédit disponibles au Québec. Utilisez les filtres pour affiner votre recherche selon vos critères (remise en argent, voyage, sans frais, etc.) et comparez les taux, frais et avantages en un coup d'œil."
  },
  {
    question: "Les taux affichés sont-ils à jour?",
    answer: "Oui, nous mettons à jour régulièrement les taux et informations. Chaque carte affiche sa date de dernière mise à jour. Pour les informations les plus récentes, nous vous recommandons de vérifier directement sur le site de l'émetteur avant de faire une demande."
  },
  {
    question: "Comment gagnez-vous de l'argent?",
    answer: "Nous recevons une compensation de certains émetteurs de cartes lorsque vous faites une demande via nos liens d'affiliation. Cela n'affecte pas notre classement ou nos recommandations, et l'utilisation de notre site est entièrement gratuite pour vous."
  },
  {
    question: "Comment choisir la meilleure carte pour moi?",
    answer: "Considérez vos habitudes de dépenses: si vous dépensez beaucoup en épicerie, une carte avec remise sur l'épicerie sera idéale. Pour les voyageurs, les cartes avec miles ou sans frais de conversion sont préférables. Si vous êtes étudiant ou préférez éviter les frais, optez pour une carte sans frais annuels."
  },
  {
    question: "Ma demande de carte sera-t-elle affectée par l'utilisation du comparateur?",
    answer: "Non, utiliser notre comparateur n'affecte pas votre crédit. Seule la demande officielle auprès de l'émetteur peut générer une enquête de crédit. Nous vous encourageons à comparer librement avant de faire votre choix."
  }
];

export const FAQ = () => {
  return (
    <section id="faq" className="py-20 bg-gradient-to-b from-background to-card">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          <div 
            className="text-center mb-12 opacity-0 animate-fade-in"
            style={{ animationDelay: '0.1s', animationFillMode: 'forwards' }}
          >
            <h2 className="text-3xl font-bold text-foreground mb-4">
              Questions fréquentes
            </h2>
            <p className="text-muted-foreground">
              Tout ce que vous devez savoir sur notre comparateur de cartes de crédit
            </p>
          </div>

          <Accordion type="single" collapsible className="w-full space-y-3">
            {faqItems.map((item, index) => (
              <AccordionItem 
                key={index} 
                value={`item-${index}`}
                className="border border-border/50 rounded-xl px-6 bg-card/50 backdrop-blur-sm opacity-0 animate-fade-in hover:shadow-[0_8px_30px_-5px_hsl(var(--primary)/0.2),0_0_20px_-5px_hsl(var(--primary)/0.1)] hover:border-primary/30 transition-all duration-300"
                style={{ 
                  animationDelay: `${0.2 + index * 0.1}s`, 
                  animationFillMode: 'forwards' 
                }}
              >
                <AccordionTrigger className="text-left text-foreground hover:text-primary hover:no-underline py-5">
                  <span className="flex items-center gap-3">
                    <span className="flex-shrink-0 w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary font-semibold text-sm">
                      {index + 1}
                    </span>
                    {item.question}
                  </span>
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground pb-5 pl-11">
                  {item.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
};
