import { CreditCard } from '@/types/creditCard';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Star, ExternalLink, Gift, Percent, CreditCard as CreditCardIcon, TrendingUp } from 'lucide-react';
import { categoryLabels } from '@/data/creditCards';

interface CreditCardItemProps {
  card: CreditCard;
}

export const CreditCardItem = ({ card }: CreditCardItemProps) => {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('fr-CA', {
      style: 'currency',
      currency: 'CAD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };

  const rewardsTypeLabel = {
    cashback: 'Remise',
    points: 'Points',
    miles: 'Milles'
  };

  return (
    <Card className="group hover:shadow-lg transition-all duration-300 border-border/50 overflow-hidden">
      <CardContent className="p-0">
        <div className="flex flex-col lg:flex-row">
          {/* Card Image Section */}
          <div className="lg:w-64 p-6 bg-gradient-to-br from-secondary/5 to-primary/5 flex items-center justify-center">
            <div className="relative">
              <div className="w-48 h-32 rounded-xl bg-gradient-to-br from-secondary to-secondary/80 flex items-center justify-center shadow-xl transform group-hover:scale-105 transition-transform duration-300">
                <div className="text-center text-secondary-foreground">
                  <CreditCardIcon className="w-10 h-10 mx-auto mb-2 opacity-80" />
                  <p className="text-xs font-medium opacity-80">{card.issuer}</p>
                </div>
              </div>
              {card.welcomeBonus && (
                <div className="absolute -top-2 -right-2 bg-primary text-primary-foreground text-xs px-2 py-1 rounded-full font-medium shadow-md">
                  <Gift className="w-3 h-3 inline mr-1" />
                  Bonus
                </div>
              )}
            </div>
          </div>

          {/* Card Details Section */}
          <div className="flex-1 p-6">
            <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <h3 className="text-xl font-semibold text-foreground">{card.name}</h3>
                  <div className="flex items-center gap-1 text-amber-500">
                    <Star className="w-4 h-4 fill-current" />
                    <span className="text-sm font-medium">{card.rating}</span>
                  </div>
                </div>
                
                <div className="flex flex-wrap gap-2 mb-4">
                  {card.categories.map((category) => (
                    <Badge key={category} variant="secondary" className="text-xs">
                      {categoryLabels[category]}
                    </Badge>
                  ))}
                </div>

                {card.welcomeBonus && (
                  <div className="bg-primary/10 text-primary px-3 py-2 rounded-lg mb-4 inline-flex items-center gap-2">
                    <Gift className="w-4 h-4" />
                    <span className="text-sm font-medium">{card.welcomeBonus}</span>
                  </div>
                )}

                <div className="flex flex-wrap gap-2 mt-3">
                  {card.features.slice(0, 3).map((feature, index) => (
                    <span key={index} className="text-xs text-muted-foreground bg-muted/50 px-2 py-1 rounded">
                      {feature}
                    </span>
                  ))}
                </div>
              </div>

              {/* Stats Section */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
                <div className="text-center p-3 bg-card rounded-lg border border-border/50">
                  <p className="text-xs text-muted-foreground mb-1">Frais annuels</p>
                  <p className="text-lg font-bold text-foreground">
                    {card.annualFee === 0 ? (
                      <span className="text-primary">Gratuit</span>
                    ) : (
                      formatCurrency(card.annualFee)
                    )}
                  </p>
                  {card.firstYearFreeAnnualFee && card.annualFee > 0 && (
                    <p className="text-xs text-primary">1ère année gratuite</p>
                  )}
                </div>

                <div className="text-center p-3 bg-card rounded-lg border border-border/50">
                  <p className="text-xs text-muted-foreground mb-1">Taux d'intérêt</p>
                  <p className="text-lg font-bold text-foreground">{card.interestRate}%</p>
                </div>

                <div className="text-center p-3 bg-card rounded-lg border border-border/50">
                  <p className="text-xs text-muted-foreground mb-1">{rewardsTypeLabel[card.rewardsType]}</p>
                  <p className="text-lg font-bold text-primary">{card.rewardsRate}%</p>
                </div>

                <div className="text-center p-3 bg-card rounded-lg border border-border/50">
                  <p className="text-xs text-muted-foreground mb-1">Avance espèces</p>
                  <p className="text-lg font-bold text-foreground">{card.cashAdvanceRate}%</p>
                </div>
              </div>
            </div>

            {/* CTA Section */}
            <div className="flex flex-col sm:flex-row items-center justify-between mt-6 pt-4 border-t border-border/50 gap-4">
              <p className="text-xs text-muted-foreground">
                Mis à jour: {new Date(card.lastUpdated).toLocaleDateString('fr-CA')}
              </p>
              <div className="flex gap-3">
                <Button variant="outline" size="sm">
                  Voir détails
                </Button>
                <Button asChild size="sm" className="gap-2">
                  <a href={card.affiliateLink} target="_blank" rel="noopener noreferrer">
                    Faire une demande
                    <ExternalLink className="w-4 h-4" />
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
