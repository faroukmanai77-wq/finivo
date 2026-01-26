import { useState, useMemo } from 'react';
import { CalculatorLayout } from '@/components/calculators/CalculatorLayout';
import { CalculatorFAQ } from '@/components/calculators/CalculatorFAQ';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Home, DollarSign, Percent, Calendar, TrendingUp, PiggyBank, AlertTriangle } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend, AreaChart, Area } from 'recharts';

const Hypotheque = () => {
  const [prixMaison, setPrixMaison] = useState<number>(400000);
  const [miseDeFonds, setMiseDeFonds] = useState<number>(80000);
  const [tauxInteret, setTauxInteret] = useState<number>(5.5);
  const [amortissement, setAmortissement] = useState<number>(25);
  const [frequence, setFrequence] = useState<string>('mensuel');

  const frequences = [
    { value: 'mensuel', label: 'Mensuel', periodesParAn: 12 },
    { value: 'bimensuel', label: 'Aux deux semaines', periodesParAn: 26 },
    { value: 'hebdomadaire', label: 'Hebdomadaire', periodesParAn: 52 },
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
  }, [prixMaison, miseDeFonds, tauxInteret, amortissement, frequence]);

  const formatCurrency = (value: number) => {
    return value.toLocaleString('fr-CA', { style: 'currency', currency: 'CAD', maximumFractionDigits: 0 });
  };

  const handleInputChange = (setter: (value: number) => void) => (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/[^0-9.,]/g, '').replace(',', '.');
    setter(parseFloat(value) || 0);
  };

  const faqItems = [
    {
      question: "Qu'est-ce que l'assurance prêt hypothécaire (SCHL)?",
      answer: "L'assurance prêt hypothécaire est obligatoire au Canada si votre mise de fonds est inférieure à 20%. Elle protège le prêteur en cas de défaut de paiement. Les primes varient de 2,8% à 4% du montant emprunté selon votre mise de fonds."
    },
    {
      question: "Quelle mise de fonds minimum pour acheter une maison?",
      answer: "Au Canada, la mise de fonds minimum est de 5% pour les propriétés jusqu'à 500 000$. Entre 500 000$ et 1 million$, c'est 5% sur les premiers 500 000$ et 10% sur le reste. Au-delà de 1 million$, c'est 20% minimum."
    },
    {
      question: "Quelle est la différence entre taux fixe et variable?",
      answer: "Un taux fixe reste constant pendant tout le terme (ex: 5 ans). Un taux variable fluctue selon le taux directeur de la Banque du Canada. Le variable est souvent plus bas initialement mais comporte plus de risque."
    },
    {
      question: "Qu'est-ce que l'amortissement?",
      answer: "L'amortissement est la durée totale prévue pour rembourser l'hypothèque. Le maximum est 25 ans avec assurance SCHL, ou 30 ans sans assurance. Un amortissement plus court = paiements plus élevés mais moins d'intérêts au total."
    },
    {
      question: "Comment réduire mes paiements hypothécaires?",
      answer: "Vous pouvez augmenter votre mise de fonds, choisir un amortissement plus long, magasiner les taux entre plusieurs prêteurs, ou opter pour des paiements accélérés aux deux semaines pour économiser des intérêts."
    }
  ];

  return (
    <CalculatorLayout
      title="Calculateur d'hypothèque"
      description="Estimez vos paiements hypothécaires mensuels, le coût total de votre prêt et visualisez l'amortissement de votre hypothèque."
      icon={<Home className="w-8 h-8 text-primary" />}
      seoTitle="Calculateur Hypothèque Gratuit 2026 | Paiement Mensuel Maison Québec | Finivo"
      seoDescription="Calculez vos paiements hypothécaires au Québec en 2026. Estimez le coût total, l'assurance SCHL, les taux actuels et visualisez l'amortissement. Outil gratuit pour planifier l'achat de votre maison."
      seoKeywords="calculateur hypothèque 2026, paiement hypothécaire québec, calculateur maison, prêt immobilier québec, assurance SCHL, amortissement hypothèque, taux hypothécaire 2026"
      url="https://finivo.ca/calculateurs/hypotheque"
      relatedCategory="epargne"
      featuredCardType="cashback"
    >
      <div className="space-y-6">
        {/* Inputs */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-3 text-lg">
              <Home className="w-5 h-5 text-primary" />
              Paramètres de l'hypothèque
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid sm:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="prixMaison">Prix de la propriété</Label>
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
                <Label htmlFor="miseDeFonds">Mise de fonds</Label>
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
                  {calculations.pourcentageMiseDeFonds.toFixed(1)}% du prix
                </p>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="tauxInteret">Taux d'intérêt annuel</Label>
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
                <Label htmlFor="amortissement">Période d'amortissement</Label>
                <Select value={amortissement.toString()} onValueChange={(v) => setAmortissement(parseInt(v))}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {[15, 20, 25, 30].map((years) => (
                      <SelectItem key={years} value={years.toString()}>
                        {years} ans
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2 sm:col-span-2">
                <Label htmlFor="frequence">Fréquence des paiements</Label>
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
                  <p className="font-semibold text-foreground">Assurance hypothécaire requise (SCHL)</p>
                  <p className="text-sm text-muted-foreground mt-1">
                    Votre mise de fonds est inférieure à 20%. Une assurance de {formatCurrency(calculations.assuranceSCHL)} sera ajoutée à votre hypothèque.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Résultats */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card className="bg-primary/5 border-primary/20">
            <CardContent className="pt-6">
              <div className="flex items-center gap-2 text-primary mb-2">
                <DollarSign className="w-5 h-5" />
                <span className="text-sm font-medium">Paiement {calculations.frequenceLabel}</span>
              </div>
              <p className="text-2xl font-bold text-foreground">
                {formatCurrency(calculations.paiement)}
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-2 text-muted-foreground mb-2">
                <Home className="w-5 h-5" />
                <span className="text-sm font-medium">Montant emprunté</span>
              </div>
              <p className="text-2xl font-bold text-foreground">
                {formatCurrency(calculations.montantTotal)}
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-2 text-destructive mb-2">
                <Percent className="w-5 h-5" />
                <span className="text-sm font-medium">Total des intérêts</span>
              </div>
              <p className="text-2xl font-bold text-foreground">
                {formatCurrency(calculations.totalInterets)}
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-2 text-muted-foreground mb-2">
                <TrendingUp className="w-5 h-5" />
                <span className="text-sm font-medium">Coût total</span>
              </div>
              <p className="text-2xl font-bold text-foreground">
                {formatCurrency(calculations.totalPaiements + miseDeFonds)}
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Graphique d'amortissement */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-3 text-lg">
              <Calendar className="w-5 h-5 text-primary" />
              Évolution du solde hypothécaire
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[350px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={calculations.chartData}>
                  <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                  <XAxis 
                    dataKey="annee" 
                    tickFormatter={(value) => `${value} ans`}
                    className="text-xs"
                  />
                  <YAxis 
                    tickFormatter={(value) => `${(value / 1000).toFixed(0)}k$`}
                    className="text-xs"
                  />
                  <Tooltip 
                    formatter={(value: number, name: string) => [
                      formatCurrency(value),
                      name === 'solde' ? 'Solde restant' : 'Capital remboursé'
                    ]}
                    labelFormatter={(label) => `Année ${label}`}
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
                    name="Solde restant"
                    stroke="hsl(var(--destructive))" 
                    fill="hsl(var(--destructive))"
                    fillOpacity={0.2}
                  />
                  <Area 
                    type="monotone" 
                    dataKey="capitalRembourse" 
                    name="Capital remboursé"
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
              Résumé de votre hypothèque
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex justify-between py-2 border-b border-border">
                <span className="text-muted-foreground">Prix de la propriété</span>
                <span className="font-medium">{formatCurrency(prixMaison)}</span>
              </div>
              <div className="flex justify-between py-2 border-b border-border">
                <span className="text-muted-foreground">Mise de fonds ({calculations.pourcentageMiseDeFonds.toFixed(1)}%)</span>
                <span className="font-medium">- {formatCurrency(miseDeFonds)}</span>
              </div>
              <div className="flex justify-between py-2 border-b border-border">
                <span className="text-muted-foreground">Montant de l'hypothèque</span>
                <span className="font-medium">{formatCurrency(calculations.montantHypotheque)}</span>
              </div>
              {calculations.assuranceSCHL > 0 && (
                <div className="flex justify-between py-2 border-b border-border">
                  <span className="text-muted-foreground">Assurance SCHL</span>
                  <span className="font-medium text-warning">+ {formatCurrency(calculations.assuranceSCHL)}</span>
                </div>
              )}
              <div className="flex justify-between py-2 border-b border-border">
                <span className="text-muted-foreground">Montant total financé</span>
                <span className="font-bold">{formatCurrency(calculations.montantTotal)}</span>
              </div>
              <div className="flex justify-between py-2 border-b border-border">
                <span className="text-muted-foreground">Total des intérêts sur {amortissement} ans</span>
                <span className="font-medium text-destructive">{formatCurrency(calculations.totalInterets)}</span>
              </div>
              <div className="flex justify-between py-3 bg-muted/50 rounded-lg px-3 -mx-3">
                <span className="font-semibold">Coût total de la propriété</span>
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
