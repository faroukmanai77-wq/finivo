import { BrokeragePlatform } from '@/types/brokerage';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useTranslation } from 'react-i18next';
import { 
  Star, 
  ExternalLink, 
  Check, 
  X, 
  Smartphone, 
  Globe, 
  Shield,
  TrendingUp,
} from 'lucide-react';

interface BrokerageItemProps {
  platform: BrokeragePlatform;
  index?: number;
}

export const BrokerageItem = ({ platform, index = 0 }: BrokerageItemProps) => {
  const { t } = useTranslation();

  const levelLabels: Record<string, string> = {
    debutant: t('brokerages.levels.beginner'),
    intermediaire: t('brokerages.levels.intermediate'),
    avance: t('brokerages.levels.advanced'),
  };

  const levelColors: Record<string, string> = {
    debutant: 'bg-primary/10 text-primary',
    intermediaire: 'bg-warning/15 text-warning',
    avance: 'bg-accent/10 text-accent',
  };

  return (
    <Card 
      className="group card-elevated overflow-hidden opacity-0 animate-slide-up bg-background" 
      style={{ animationDelay: `${index * 0.1}s`, animationFillMode: 'forwards' }}
    >
      <CardContent className="p-0">
        <div className="flex flex-col lg:flex-row">
          {/* Platform Logo Section */}
          <div className="lg:w-72 p-6 lg:p-8 flex items-center justify-center relative overflow-hidden bg-primary-foreground">
            <div className="relative z-10">
              <div className="w-56 h-36 rounded-2xl bg-gradient-to-br from-muted/30 to-muted/10 flex items-center justify-center shadow-2xl transform group-hover:scale-105 transition-all duration-500 border border-border/20 p-4">
                <img 
                  src={platform.logo} 
                  alt={`Logo ${platform.name}`} 
                  className="max-w-full max-h-full object-contain"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.style.display = 'none';
                    target.parentElement!.innerHTML = `<div class="text-center"><svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-primary mx-auto mb-2"><rect width="16" height="20" x="4" y="2" rx="2" ry="2"/><path d="M9 22v-4h6v4"/><path d="M8 6h.01"/><path d="M16 6h.01"/><path d="M12 6h.01"/><path d="M12 10h.01"/><path d="M12 14h.01"/><path d="M16 10h.01"/><path d="M16 14h.01"/><path d="M8 10h.01"/><path d="M8 14h.01"/></svg><span class="text-lg font-bold text-foreground">${platform.name}</span></div>`;
                  }}
                />
              </div>
              
              {/* Type badge */}
              <div className="absolute -top-3 -right-3 bg-primary text-primary-foreground text-xs px-3 py-1.5 rounded-full font-semibold shadow-lg capitalize">
                {platform.type === 'courtier' ? t('brokerages.types.broker') : t('brokerages.types.roboAdvisor')}
              </div>
            </div>
          </div>

          {/* Platform Details Section */}
          <div className="flex-1 p-6 lg:p-8 bg-primary-foreground">
            <div className="flex flex-col gap-5">
              {/* Header */}
              <div>
                <div className="flex items-start justify-between gap-4 mb-3">
                  <h3 className="text-xl lg:text-2xl font-bold text-foreground leading-tight group-hover:text-primary transition-colors">
                    {platform.name}
                  </h3>
                  <div className="flex items-center gap-1.5 bg-warning/15 px-2.5 py-1 rounded-full shrink-0">
                    <Star className="w-4 h-4 fill-warning text-warning" />
                    <span className="text-sm font-bold text-foreground">{platform.rating}</span>
                  </div>
                </div>
                
                <div className="flex flex-wrap gap-2 mb-4">
                  <Badge className={`text-xs font-medium px-3 py-1 border-0 ${levelColors[platform.level] || levelColors.debutant}`}>
                    {levelLabels[platform.level] || platform.level}
                  </Badge>
                  {platform.hasFrench && (
                    <Badge variant="secondary" className="text-xs font-medium px-3 py-1 bg-accent/10 text-accent border-0">
                      🇫🇷 {t('brokerages.french')}
                    </Badge>
                  )}
                  {platform.regulation.includes('AMF') && (
                    <Badge variant="secondary" className="text-xs font-medium px-3 py-1 bg-primary/10 text-primary border-0">
                      <Shield className="w-3 h-3 mr-1" />
                      AMF
                    </Badge>
                  )}
                </div>

                {/* Ideal for */}
                <div className="bg-gradient-to-r from-primary/10 to-primary/5 border border-primary/20 text-foreground px-4 py-3 rounded-xl mb-4 flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center shrink-0">
                    <TrendingUp className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground font-medium">{t('brokerages.idealFor')}</p>
                    <p className="text-sm font-semibold text-foreground">{platform.idealFor}</p>
                  </div>
                </div>
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
                <div className="stat-card text-center">
                  <p className="text-xs text-muted-foreground mb-1 font-medium">{t('brokerages.stats.stocks')}</p>
                  <p className="text-lg font-bold text-foreground">{platform.transactionFeeStocks}</p>
                </div>

                <div className="stat-card text-center">
                  <p className="text-xs text-muted-foreground mb-1 font-medium">{t('brokerages.stats.etf')}</p>
                  <p className="text-lg font-bold">
                    {platform.transactionFeeETF === '0 $' || platform.transactionFeeETF.includes('0 $') ? (
                      <span className="text-accent">{platform.transactionFeeETF}</span>
                    ) : (
                      <span className="text-foreground">{platform.transactionFeeETF}</span>
                    )}
                  </p>
                </div>

                <div className="stat-card text-center">
                  <p className="text-xs text-muted-foreground mb-1 font-medium">{t('brokerages.stats.options')}</p>
                  <p className="text-lg font-bold">
                    {platform.hasOptions ? (
                      <span className="text-accent flex items-center justify-center gap-1">
                        <Check className="w-4 h-4" /> {t('common.yes')}
                      </span>
                    ) : (
                      <span className="text-muted-foreground flex items-center justify-center gap-1">
                        <X className="w-4 h-4" /> {t('common.no')}
                      </span>
                    )}
                  </p>
                </div>

                <div className="stat-card text-center">
                  <p className="text-xs text-muted-foreground mb-1 font-medium">{t('brokerages.stats.crypto')}</p>
                  <p className="text-lg font-bold">
                    {platform.hasCrypto ? (
                      <span className="text-accent flex items-center justify-center gap-1">
                        <Check className="w-4 h-4" /> {t('common.yes')}
                      </span>
                    ) : (
                      <span className="text-muted-foreground flex items-center justify-center gap-1">
                        <X className="w-4 h-4" /> {t('common.no')}
                      </span>
                    )}
                  </p>
                </div>
              </div>

              {/* Accounts & Products */}
              <div className="flex flex-wrap gap-2">
                {platform.accounts.slice(0, 4).map((account, idx) => (
                  <span key={idx} className="feature-badge">
                    <Check className="w-3 h-3 text-accent" />
                    {account}
                  </span>
                ))}
                {platform.hasMobileApp && (
                  <span className="feature-badge">
                    <Smartphone className="w-3 h-3 text-primary" />
                    {t('brokerages.features.mobileApp')}
                  </span>
                )}
                {platform.marketsAccess.includes('International') && (
                  <span className="feature-badge">
                    <Globe className="w-3 h-3 text-primary" />
                    {t('brokerages.features.international')}
                  </span>
                )}
              </div>

              {/* Strengths & Weaknesses */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="text-xs font-semibold text-accent mb-2">✓ {t('brokerages.strengths')}</p>
                  <ul className="space-y-1">
                    {platform.strengths.map((s, i) => (
                      <li key={i} className="text-xs text-muted-foreground">• {s}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <p className="text-xs font-semibold text-destructive mb-2">✗ {t('brokerages.weaknesses')}</p>
                  <ul className="space-y-1">
                    {platform.weaknesses.map((w, i) => (
                      <li key={i} className="text-xs text-muted-foreground">• {w}</li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* CTA Section */}
              <div className="flex flex-col sm:flex-row items-center justify-between pt-5 border-t border-border/50 gap-4">
                <p className="text-xs text-muted-foreground">
                  {t('brokerages.monthlyFees')}: {platform.monthlyFee}
                </p>
                <div className="flex gap-3">
                  <Button asChild size="sm" className="btn-success font-semibold gap-2">
                    <a href={platform.affiliateLink} target="_blank" rel="noopener noreferrer">
                      {t('brokerages.openAccount')}
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
