import { Link } from 'react-router-dom';
import { CreditCard } from '@/types/creditCard';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Star, ExternalLink, Gift, Check, TrendingUp } from 'lucide-react';
import { categoryLabels } from '@/data/creditCards';

interface CreditCardItemProps {
  card: CreditCard;
  index?: number;
}

export const CreditCardItem = ({ card, index = 0 }: CreditCardItemProps) => {
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
    <Card 
      className="group card-elevated overflow-hidden opacity-0 animate-slide-up bg-background"
      style={{ animationDelay: `${index * 0.1}s`, animationFillMode: 'forwards' }}
    >
      <CardContent className="p-0">
        <div className="flex flex-col lg:flex-row">
          {/* Card Image Section */}
          <div className="lg:w-72 p-6 lg:p-8 bg-gradient-to-br from-muted/30 to-muted/10 flex items-center justify-center relative overflow-hidden">
            {/* Background decoration */}
            <div className="absolute inset-0 opacity-30">
              <div className="absolute -top-10 -right-10 w-40 h-40 bg-primary/20 rounded-full blur-3xl" />
              <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-accent/20 rounded-full blur-3xl" />
            </div>
            
            <div className="relative z-10">
              {card.image ? (
                <img 
                  src={card.image} 
                  alt={card.name}
                  className="w-56 h-36 object-contain rounded-xl shadow-2xl transform group-hover:scale-105 group-hover:-rotate-2 transition-all duration-500"
                />
              ) : (
                <div className="w-56 h-36 rounded-2xl bg-muted/50 flex items-center justify-center shadow-2xl transform group-hover:scale-105 group-hover:-rotate-2 transition-all duration-500">
                  <span className="text-muted-foreground text-sm font-medium">{card.issuer}</span>
                </div>
              )}
              
              {/* Bonus badge */}
              {card.welcomeBonus && (
                <div className="absolute -top-3 -right-3 bg-gradient-to-r from-accent to-emerald-500 text-accent-foreground text-xs px-3 py-1.5 rounded-full font-semibold shadow-lg flex items-center gap-1.5 animate-pulse-slow">
                  <Gift className="w-3.5 h-3.5" />
                  Bonus
                </div>
              )}
            </div>
          </div>

          {/* Card Details Section */}
          <div className="flex-1 p-6 lg:p-8">
            <div className="flex flex-col gap-5">
              {/* Header */}
              <div>
                <div className="flex items-start justify-between gap-4 mb-3">
                  <h3 className="text-xl lg:text-2xl font-bold text-foreground leading-tight group-hover:text-primary transition-colors">
                    {card.name}
                  </h3>
                  <div className="flex items-center gap-1.5 bg-amber-100 text-amber-700 px-2.5 py-1 rounded-full shrink-0">
                    <Star className="w-4 h-4 fill-current" />
                    <span className="text-sm font-bold">{card.rating}</span>
                  </div>
                </div>
                
                <div className="flex flex-wrap gap-2 mb-4">
                  {card.categories.map((category) => (
                    <Badge 
                      key={category} 
                      variant="secondary" 
                      className="text-xs font-medium px-3 py-1 bg-primary/10 text-primary border-0 hover:bg-primary/20 transition-colors"
                    >
                      {categoryLabels[category]}
                    </Badge>
                  ))}
                </div>

                {card.welcomeBonus && (
                  <div className="bg-gradient-to-r from-accent/10 to-emerald-500/10 border border-accent/20 text-foreground px-4 py-3 rounded-xl mb-4 flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-accent/20 flex items-center justify-center shrink-0">
                      <Gift className="w-5 h-5 text-accent" />
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground font-medium">Bonus de bienvenue</p>
                      <p className="text-sm font-semibold text-foreground">{card.welcomeBonus}</p>
                    </div>
                  </div>
                )}
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
                <div className="stat-card text-center">
                  <p className="text-xs text-muted-foreground mb-1 font-medium">Frais annuels</p>
                  <p className="text-xl font-bold">
                    {card.annualFee === 0 ? (
                      <span className="text-accent">Gratuit</span>
                    ) : (
                      <span className="text-foreground">{formatCurrency(card.annualFee)}</span>
                    )}
                  </p>
                  {card.firstYearFreeAnnualFee && card.annualFee > 0 && (
                    <p className="text-xs text-accent font-medium mt-1">1ère année gratuite</p>
                  )}
                </div>

                <div className="stat-card text-center">
                  <p className="text-xs text-muted-foreground mb-1 font-medium">Taux d'intérêt</p>
                  <p className="text-xl font-bold text-foreground">{card.interestRate}%</p>
                </div>

                <div className="stat-card text-center">
                  <p className="text-xs text-muted-foreground mb-1 font-medium">{rewardsTypeLabel[card.rewardsType]}</p>
                  <p className="text-xl font-bold text-primary flex items-center justify-center gap-1">
                    {card.rewardsRate}%
                    <TrendingUp className="w-4 h-4" />
                  </p>
                </div>

                <div className="stat-card text-center">
                  <p className="text-xs text-muted-foreground mb-1 font-medium">Avance espèces</p>
                  <p className="text-xl font-bold text-foreground">{card.cashAdvanceRate}%</p>
                </div>
              </div>

              {/* Features */}
              <div className="flex flex-wrap gap-2">
                {card.features.slice(0, 4).map((feature, idx) => (
                  <span key={idx} className="feature-badge">
                    <Check className="w-3 h-3 text-accent" />
                    {feature}
                  </span>
                ))}
              </div>

              {/* CTA Section */}
              <div className="flex flex-col sm:flex-row items-center justify-between pt-5 border-t border-border/50 gap-4">
                <p className="text-xs text-muted-foreground">
                  Mis à jour: {new Date(card.lastUpdated).toLocaleDateString('fr-CA', { 
                    day: 'numeric', 
                    month: 'short', 
                    year: 'numeric' 
                  })}
                </p>
                <div className="flex gap-3">
                  <Link to={`/carte/${card.id}`}>
                    <Button 
                      variant="outline" 
                      size="sm"
                      className="font-medium hover:bg-muted/50"
                    >
                      Voir détails
                    </Button>
                  </Link>
                  <Button 
                    asChild 
                    size="sm" 
                    className="btn-success font-semibold gap-2"
                  >
                    <a href={card.affiliateLink} target="_blank" rel="noopener noreferrer">
                      Faire une demande
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
