import { useState, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { CalculatorLayout } from '@/components/calculators/CalculatorLayout';
import { CalculatorFAQ } from '@/components/calculators/CalculatorFAQ';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Home, DollarSign, Calendar, PiggyBank, AlertTriangle } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { useLanguage } from '@/hooks/useLanguage';

const Hypotheque = () => {
  const { t } = useTranslation();
  const { currentLanguage } = useLanguage();
  const [prixMaison, setPrixMaison] = useState<number>(400000);
  const [miseDeFonds, setMiseDeFonds] = useState<number>(80000);
  const [tauxInteret, setTauxInteret] = useState<number>(5.5);
  const [amortissement, setAmortissement] = useState<number>(25);
  const [frequence, setFrequence] = useState<string>('mensuel');

  const frequences = [
    { value: 'mensuel', label: t('calculators.mortgage.frequencies.monthly'), periodesParAn: 12 },
    { value: 'bimensuel', label: t('calculators.mortgage.frequencies.biweekly'), periodesParAn: 26 },
    { value: 'hebdomadaire', label: t('calculators.mortgage.frequencies.weekly'), periodesParAn: 52 },
  ];

  const calculations = useMemo(() => {
    const montantHypotheque = prixMaison - miseDeFonds;
    const pourcentageMiseDeFonds = (miseDeFonds / prixMaison) * 100;
    
    // Assurance SCHL si mise de fonds < 20%
    let assuranceSCHL = 0;
    if (pourcentageMiseDeFonds < 20) {
      if (pourcentageMiseDeFonds >= 15) {
        assuranceSCHL = montantHypotheque * 0.028;
      } else if (pourcentageMiseDeFonds >= 10) {
        assuranceSCHL = montantHypotheque * 0.031;
      } else if (pourcentageMiseDeFonds >= 5) {
        assuranceSCHL = montantHypotheque * 0.04;
      }
    }
    
    const montantTotal = montantHypotheque + assuranceSCHL;
    
    const freqData = frequences.find(f => f.value === frequence) || frequences[0];
    const periodesParAn = freqData.periodesParAn;
    const nombreTotalPaiements = amortissement * periodesParAn;
    
    const tauxPeriodique = tauxInteret / 100 / periodesParAn;
    
    // Formule de paiement hypothécaire
    let paiement = 0;
    if (tauxPeriodique > 0) {
      paiement = (montantTotal * tauxPeriodique * Math.pow(1 + tauxPeriodique, nombreTotalPaiements)) / 
                 (Math.pow(1 + tauxPeriodique, nombreTotalPaiements) - 1);
    } else {
      paiement = montantTotal / nombreTotalPaiements;
    }
    
    const totalPaiements = paiement * nombreTotalPaiements;
    const totalInterets = totalPaiements - montantTotal;
    
    // Données pour le graphique d'amortissement
    const chartData = [];
    let soldeRestant = montantTotal;
    for (let annee = 0; annee <= amortissement; annee++) {
      const capitalRembourse = montantTotal - soldeRestant;
      chartData.push({
        annee: annee,
        solde: Math.max(0, Math.round(soldeRestant)),
        capitalRembourse: Math.round(capitalRembourse),
      });
      
      // Calculer le solde pour l'année suivante
      for (let i = 0; i < periodesParAn && soldeRestant > 0; i++) {
        const interetPeriode = soldeRestant * tauxPeriodique;
        const capitalPeriode = Math.min(paiement - interetPeriode, soldeRestant);
        soldeRestant -= capitalPeriode;
      }
    }
    
    return {
      montantHypotheque,
      pourcentageMiseDeFonds,
      assuranceSCHL,
      montantTotal,
      paiement,
      totalPaiements,
      totalInterets,
      chartData,
      frequenceLabel: freqData.label.toLowerCase(),
    };
  }, [prixMaison, miseDeFonds, tauxInteret, amortissement, frequence, frequences]);

  const formatCurrency = (value: number) => {
    return value.toLocaleString(currentLanguage === 'en' ? 'en-CA' : 'fr-CA', { style: 'currency', currency: 'CAD', maximumFractionDigits: 0 });
  };

  const handleInputChange = (setter: (value: number) => void) => (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/[^0-9.,]/g, '').replace(',', '.');
    setter(parseFloat(value) || 0);
  };

  const faqItems = [
    {
      question: t('calculators.mortgage.faq.q1'),
      answer: t('calculators.mortgage.faq.a1')
    },
    {
      question: t('calculators.mortgage.faq.q2'),
      answer: t('calculators.mortgage.faq.a2')
    },
    {
      question: t('calculators.mortgage.faq.q3'),
      answer: t('calculators.mortgage.faq.a3')
    },
    {
      question: t('calculators.mortgage.faq.q4'),
      answer: t('calculators.mortgage.faq.a4')
    },
    {
      question: t('calculators.mortgage.faq.q5'),
      answer: t('calculators.mortgage.faq.a5')
    }
  ];

  return (
    <CalculatorLayout
      title={t('calculators.mortgage.title')}
      description={t('calculators.mortgage.description')}
      icon={<Home className="w-8 h-8 text-primary" />}
      seoTitle={t('calculators.mortgage.seo.title')}
      seoDescription={t('calculators.mortgage.seo.description')}
      seoKeywords={t('calculators.mortgage.seo.keywords')}
      url={`https://finivo.ca/${currentLanguage}/calculateurs/hypotheque`}
      relatedCategory="epargne"
      featuredCardType="cashback"
    >
      <div className="space-y-6">
        {/* Inputs */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-3 text-lg">
              <Home className="w-5 h-5 text-primary" />
              {t('calculators.mortgage.params')}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid sm:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="prixMaison">{t('calculators.mortgage.propertyPrice')}</Label>
                <div className="relative">
                  <Input
                    id="prixMaison"
                    type="text"
                    inputMode="decimal"
                    value={prixMaison || ''}
                    onChange={handleInputChange(setPrixMaison)}
                    className="pr-8 [appearance:textfield]"
                    placeholder="400000"
                  />
                  <span className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground">$</span>
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="miseDeFonds">{t('calculators.mortgage.downPayment')}</Label>
                <div className="relative">
                  <Input
                    id="miseDeFonds"
                    type="text"
                    inputMode="decimal"
                    value={miseDeFonds || ''}
                    onChange={handleInputChange(setMiseDeFonds)}
                    className="pr-8 [appearance:textfield]"
                    placeholder="80000"
                  />
                  <span className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground">$</span>
                </div>
                <p className="text-xs text-muted-foreground">
                  {calculations.pourcentageMiseDeFonds.toFixed(1)}% {t('calculators.mortgage.ofPrice')}
                </p>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="tauxInteret">{t('calculators.mortgage.interestRate')}</Label>
                <div className="relative">
                  <Input
                    id="tauxInteret"
                    type="text"
                    inputMode="decimal"
                    value={tauxInteret || ''}
                    onChange={handleInputChange(setTauxInteret)}
                    className="pr-8 [appearance:textfield]"
                    placeholder="5.5"
                  />
                  <span className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground">%</span>
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="amortissement">{t('calculators.mortgage.amortization')}</Label>
                <Select value={amortissement.toString()} onValueChange={(v) => setAmortissement(parseInt(v))}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {[15, 20, 25, 30].map((years) => (
                      <SelectItem key={years} value={years.toString()}>
                        {years} {t('calculators.common.years')}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2 sm:col-span-2">
                <Label htmlFor="frequence">{t('calculators.mortgage.paymentFrequency')}</Label>
                <Select value={frequence} onValueChange={setFrequence}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {frequences.map((freq) => (
                      <SelectItem key={freq.value} value={freq.value}>
                        {freq.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Alerte SCHL */}
        {calculations.assuranceSCHL > 0 && (
          <Card className="border-warning/50 bg-warning/5">
            <CardContent className="pt-6">
              <div className="flex items-start gap-3">
                <AlertTriangle className="w-5 h-5 text-warning shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-foreground">{t('calculators.mortgage.schlAlert.title')}</p>
                  <p className="text-sm text-muted-foreground mt-1">
                    {t('calculators.mortgage.schlAlert.message', { amount: formatCurrency(calculations.assuranceSCHL) })}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Résultats */}
        <Card className="bg-primary text-primary-foreground">
          <CardContent className="pt-6">
            <div className="text-center mb-6">
              <p className="text-sm opacity-80 flex items-center justify-center gap-1.5">
                <DollarSign className="w-4 h-4" />
                {t('calculators.mortgage.results.payment')} ({calculations.frequenceLabel})
              </p>
              <p className="text-4xl md:text-5xl font-bold mt-2">{formatCurrency(calculations.paiement)}</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
              <div>
                <p className="text-sm opacity-80">{t('calculators.mortgage.results.amountBorrowed')}</p>
                <p className="text-xl md:text-2xl font-semibold mt-1">{formatCurrency(calculations.montantTotal)}</p>
              </div>
              <div>
                <p className="text-sm opacity-80">{t('calculators.mortgage.results.totalInterest')}</p>
                <p className="text-xl md:text-2xl font-semibold mt-1">{formatCurrency(calculations.totalInterets)}</p>
              </div>
              <div>
                <p className="text-sm opacity-80">{t('calculators.mortgage.results.totalCost')}</p>
                <p className="text-xl md:text-2xl font-semibold mt-1">{formatCurrency(calculations.totalPaiements + miseDeFonds)}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Graphique d'amortissement */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-3 text-lg">
              <Calendar className="w-5 h-5 text-primary" />
              {t('calculators.mortgage.chart.title')}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[350px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={calculations.chartData}>
                  <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                  <XAxis 
                    dataKey="annee" 
                    tickFormatter={(value) => `${value} ${t('calculators.common.years')}`}
                    className="text-xs"
                  />
                  <YAxis 
                    tickFormatter={(value) => `${(value / 1000).toFixed(0)}k$`}
                    className="text-xs"
                  />
                  <Tooltip 
                    formatter={(value: number, name: string) => [
                      formatCurrency(value),
                      name === 'solde' ? t('calculators.mortgage.chart.remainingBalance') : t('calculators.mortgage.chart.principalPaid')
                    ]}
                    labelFormatter={(label) => `${currentLanguage === 'en' ? 'Year' : 'Année'} ${label}`}
                    contentStyle={{ 
                      backgroundColor: 'hsl(var(--card))', 
                      border: '1px solid hsl(var(--border))',
                      borderRadius: '8px'
                    }}
                  />
                  <Legend />
                  <Area 
                    type="monotone" 
                    dataKey="solde" 
                    name={t('calculators.mortgage.chart.remainingBalance')}
                    stroke="hsl(var(--destructive))" 
                    fill="hsl(var(--destructive))"
                    fillOpacity={0.2}
                  />
                  <Area 
                    type="monotone" 
                    dataKey="capitalRembourse" 
                    name={t('calculators.mortgage.chart.principalPaid')}
                    stroke="hsl(var(--success))" 
                    fill="hsl(var(--success))"
                    fillOpacity={0.2}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Résumé détaillé */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-3 text-lg">
              <PiggyBank className="w-5 h-5 text-success" />
              {t('calculators.mortgage.summary.title')}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex justify-between py-2 border-b border-border">
                <span className="text-muted-foreground">{t('calculators.mortgage.summary.propertyPrice')}</span>
                <span className="font-medium">{formatCurrency(prixMaison)}</span>
              </div>
              <div className="flex justify-between py-2 border-b border-border">
                <span className="text-muted-foreground">{t('calculators.mortgage.summary.downPayment')} ({calculations.pourcentageMiseDeFonds.toFixed(1)}%)</span>
                <span className="font-medium">- {formatCurrency(miseDeFonds)}</span>
              </div>
              <div className="flex justify-between py-2 border-b border-border">
                <span className="text-muted-foreground">{t('calculators.mortgage.summary.mortgageAmount')}</span>
                <span className="font-medium">{formatCurrency(calculations.montantHypotheque)}</span>
              </div>
              {calculations.assuranceSCHL > 0 && (
                <div className="flex justify-between py-2 border-b border-border">
                  <span className="text-muted-foreground">{t('calculators.mortgage.summary.schlInsurance')}</span>
                  <span className="font-medium text-warning">+ {formatCurrency(calculations.assuranceSCHL)}</span>
                </div>
              )}
              <div className="flex justify-between py-2 border-b border-border">
                <span className="text-muted-foreground">{t('calculators.mortgage.summary.totalFinanced')}</span>
                <span className="font-bold">{formatCurrency(calculations.montantTotal)}</span>
              </div>
              <div className="flex justify-between py-2 border-b border-border">
                <span className="text-muted-foreground">{t('calculators.mortgage.summary.totalInterestYears', { years: amortissement })}</span>
                <span className="font-medium text-destructive">{formatCurrency(calculations.totalInterets)}</span>
              </div>
              <div className="flex justify-between py-3 bg-muted/50 rounded-lg px-3 -mx-3">
                <span className="font-semibold">{t('calculators.mortgage.summary.totalPayments')}</span>
                <span className="font-bold text-lg">{formatCurrency(calculations.totalPaiements + miseDeFonds)}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <CalculatorFAQ items={faqItems} />
      </div>
    </CalculatorLayout>
  );
};

export default Hypotheque;
