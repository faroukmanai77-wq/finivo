import { useState, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { PiggyBank } from 'lucide-react';
import { CalculatorLayout } from '@/components/calculators/CalculatorLayout';
import { CalculatorFAQ } from '@/components/calculators/CalculatorFAQ';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import InvestmentPathIllustration from '@/assets/illustrations/investment-path.svg';
import { useLanguage } from '@/hooks/useLanguage';

const EpargneREER = () => {
  const { t } = useTranslation();
  const { currentLanguage } = useLanguage();
  const [soldeActuel, setSoldeActuel] = useState(25000);
  const [cotisationAnnuelle, setCotisationAnnuelle] = useState(6000);
  const [frequenceCotisation, setFrequenceCotisation] = useState<'mensuel' | 'annuel'>('annuel');
  const [tauxRendementTravail, setTauxRendementTravail] = useState(5);
  const [ageActuel, setAgeActuel] = useState(35);
  const [anneesAvantRetraite, setAnneesAvantRetraite] = useState(30);
  const [anneesRetraite, setAnneesRetraite] = useState(25);
  const [tauxRendementRetraite, setTauxRendementRetraite] = useState(3);

  const resultats = useMemo(() => {
    const cotisationMensuelle = frequenceCotisation === 'mensuel' 
      ? cotisationAnnuelle 
      : cotisationAnnuelle / 12;
    
    const tauxMensuelTravail = tauxRendementTravail / 100 / 12;
    const tauxMensuelRetraite = tauxRendementRetraite / 100 / 12;
    
    let solde = soldeActuel;
    let totalCotisations = soldeActuel;
    const donnees = [];

    // Phase accumulation (travail)
    for (let annee = 0; annee <= anneesAvantRetraite; annee++) {
      donnees.push({
        annee,
        phase: 'Accumulation',
        solde: Math.round(solde),
        cotisations: Math.round(totalCotisations),
      });
      
      for (let mois = 0; mois < 12; mois++) {
        solde = solde * (1 + tauxMensuelTravail) + cotisationMensuelle;
        totalCotisations += cotisationMensuelle;
      }
    }

    const soldeRetraite = solde;
    
    // Phase décaissement (retraite)
    const retraitAnnuel = soldeRetraite / anneesRetraite;
    const retraitMensuel = retraitAnnuel / 12;
    
    for (let annee = 1; annee <= anneesRetraite; annee++) {
      for (let mois = 0; mois < 12; mois++) {
        solde = solde * (1 + tauxMensuelRetraite) - retraitMensuel;
        if (solde < 0) solde = 0;
      }
      
      donnees.push({
        annee: anneesAvantRetraite + annee,
        phase: 'Retraite',
        solde: Math.round(solde),
        cotisations: Math.round(totalCotisations),
      });
    }

    return {
      donnees,
      soldeRetraite: Math.round(soldeRetraite),
      retraitAnnuel: Math.round(retraitAnnuel),
      retraitMensuel: Math.round(retraitMensuel),
      totalCotisations: Math.round(totalCotisations - soldeActuel),
      interetsGagnes: Math.round(soldeRetraite - totalCotisations),
    };
  }, [soldeActuel, cotisationAnnuelle, frequenceCotisation, tauxRendementTravail, ageActuel, anneesAvantRetraite, anneesRetraite, tauxRendementRetraite]);

  const formatMontant = (montant: number) => {
    return new Intl.NumberFormat(currentLanguage === 'en' ? 'en-CA' : 'fr-CA', { style: 'currency', currency: 'CAD', maximumFractionDigits: 0 }).format(montant);
  };

  const faqItems = [
    { question: t('calculators.rrsp.faq.q1'), answer: t('calculators.rrsp.faq.a1') },
    { question: t('calculators.rrsp.faq.q2'), answer: t('calculators.rrsp.faq.a2') },
    { question: t('calculators.rrsp.faq.q3'), answer: t('calculators.rrsp.faq.a3') },
    { question: t('calculators.rrsp.faq.q4'), answer: t('calculators.rrsp.faq.a4') },
    { question: t('calculators.rrsp.faq.q5'), answer: t('calculators.rrsp.faq.a5') },
  ];

  return (
    <CalculatorLayout
      title={t('calculators.rrsp.title')}
      description={t('calculators.rrsp.description')}
      icon={<PiggyBank className="w-8 h-8 text-primary" />}
      seoTitle={t('calculators.rrsp.seo.title')}
      seoDescription={t('calculators.rrsp.seo.description')}
      seoKeywords={t('calculators.rrsp.seo.keywords')}
      url={`https://finivo.ca/${currentLanguage}/calculateurs/epargne-reer`}
      relatedCategory="epargne"
      featuredCardType="cashback"
      illustration={InvestmentPathIllustration}
    >
      <div className="space-y-8">
        {/* Section explicative */}
        <Card className="bg-muted/50">
          <CardContent className="pt-6">
            <h2 className="text-lg font-semibold mb-3">{t('calculators.rrsp.whatIs')}</h2>
            <div className="space-y-3 text-sm text-muted-foreground">
              <p>{t('calculators.rrsp.explanation')}</p>
              <div className="grid md:grid-cols-2 gap-4 mt-4">
                <div>
                  <h3 className="font-medium text-foreground mb-2">{t('calculators.rrsp.advantages')}</h3>
                  <ul className="list-disc list-inside space-y-1">
                    <li>{currentLanguage === 'en' ? 'Tax-deductible contributions' : 'Cotisations déductibles d\'impôt'}</li>
                    <li>{currentLanguage === 'en' ? 'Tax-sheltered growth' : 'Croissance à l\'abri de l\'impôt'}</li>
                    <li>{currentLanguage === 'en' ? 'Tax deferral until withdrawal' : 'Report d\'impôt jusqu\'au retrait'}</li>
                    <li>{currentLanguage === 'en' ? 'Can reduce your tax rate' : 'Peut réduire votre taux d\'imposition'}</li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-medium text-foreground mb-2">{t('calculators.rrsp.rules')}</h3>
                  <ul className="list-disc list-inside space-y-1">
                    <li>{currentLanguage === 'en' ? 'Contribution limit: 18% of income (max ~$32,490 in 2026)' : 'Limite de cotisation : 18% du revenu (max ~32 490 $ en 2026)'}</li>
                    <li>{currentLanguage === 'en' ? 'Unused room carries forward' : 'Les droits inutilisés sont reportés'}</li>
                    <li>{currentLanguage === 'en' ? 'Withdrawals taxable at marginal rate' : 'Retraits imposables à votre taux marginal'}</li>
                    <li>{currentLanguage === 'en' ? 'Must convert to RRIF before age 71' : 'À convertir en FERR avant 71 ans'}</li>
                  </ul>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Phase travail */}
          <Card>
            <CardHeader>
              <CardTitle>{t('calculators.rrsp.whileWorking')}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <p className="text-sm text-muted-foreground">
                {t('calculators.rrsp.workingExplanation')}
              </p>

              <div className="space-y-3">
                <Label htmlFor="solde">{t('calculators.rrsp.currentValue')}</Label>
                <div className="flex items-center gap-3">
                  <Input
                    id="solde"
                    type="number"
                    value={soldeActuel}
                    onChange={(e) => setSoldeActuel(Number(e.target.value))}
                    className="w-32"
                  />
                  <span className="text-muted-foreground">$</span>
                </div>
              </div>

              <div className="space-y-3">
                <Label htmlFor="taux-travail">{t('calculators.rrsp.annualReturn')}</Label>
                <div className="flex items-center gap-3">
                  <Input
                    id="taux-travail"
                    type="number"
                    step="0.1"
                    value={tauxRendementTravail}
                    onChange={(e) => setTauxRendementTravail(Number(e.target.value))}
                    className="w-24"
                  />
                  <span className="text-muted-foreground">%</span>
                </div>
              </div>

              <div className="space-y-3">
                <Label>{t('calculators.rrsp.contributionAmount')}</Label>
                <div className="flex items-center gap-3">
                  <Input
                    type="number"
                    value={cotisationAnnuelle}
                    onChange={(e) => setCotisationAnnuelle(Number(e.target.value))}
                    className="w-32"
                  />
                  <span className="text-muted-foreground">$</span>
                  <Select value={frequenceCotisation} onValueChange={(v: 'mensuel' | 'annuel') => setFrequenceCotisation(v)}>
                    <SelectTrigger className="w-32">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="mensuel">{t('calculators.common.perMonth')}</SelectItem>
                      <SelectItem value="annuel">{t('calculators.common.perYear')}</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-3">
                <Label>{t('calculators.rrsp.currentAge')}</Label>
                <div className="flex items-center gap-4">
                  <Input
                    type="number"
                    value={ageActuel}
                    onChange={(e) => setAgeActuel(Number(e.target.value))}
                    className="w-20"
                  />
                  <Slider
                    value={[ageActuel]}
                    onValueChange={(v) => setAgeActuel(v[0])}
                    min={18}
                    max={70}
                    step={1}
                    className="flex-1"
                  />
                </div>
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>18</span>
                  <span>70</span>
                </div>
              </div>

              <div className="space-y-3">
                <Label>{t('calculators.rrsp.yearsToRetirement')}</Label>
                <div className="flex items-center gap-4">
                  <Input
                    type="number"
                    value={anneesAvantRetraite}
                    onChange={(e) => setAnneesAvantRetraite(Number(e.target.value))}
                    className="w-20"
                  />
                  <Slider
                    value={[anneesAvantRetraite]}
                    onValueChange={(v) => setAnneesAvantRetraite(v[0])}
                    min={1}
                    max={50}
                    step={1}
                    className="flex-1"
                  />
                </div>
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>1</span>
                  <span>50</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Phase retraite */}
          <Card>
            <CardHeader>
              <CardTitle>{t('calculators.rrsp.atRetirement')}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <p className="text-sm text-muted-foreground">
                {t('calculators.rrsp.retirementExplanation')}
              </p>

              <div className="space-y-3">
                <Label>{t('calculators.rrsp.retirementYears')}</Label>
                <div className="flex items-center gap-4">
                  <Input
                    type="number"
                    value={anneesRetraite}
                    onChange={(e) => setAnneesRetraite(Number(e.target.value))}
                    className="w-20"
                  />
                  <Slider
                    value={[anneesRetraite]}
                    onValueChange={(v) => setAnneesRetraite(v[0])}
                    min={1}
                    max={40}
                    step={1}
                    className="flex-1"
                  />
                </div>
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>1</span>
                  <span>40</span>
                </div>
              </div>

              <div className="space-y-3">
                <Label htmlFor="taux-retraite">{t('calculators.rrsp.retirementReturn')}</Label>
                <div className="flex items-center gap-3">
                  <Input
                    id="taux-retraite"
                    type="number"
                    step="0.1"
                    value={tauxRendementRetraite}
                    onChange={(e) => setTauxRendementRetraite(Number(e.target.value))}
                    className="w-24"
                  />
                  <span className="text-muted-foreground">%</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Résultats */}
        <Card className="bg-primary text-primary-foreground">
          <CardContent className="pt-6">
            <div className="text-center mb-6">
              <p className="text-sm opacity-80">{t('calculators.rrsp.results.valueAtRetirement')}</p>
              <p className="text-4xl md:text-5xl font-bold mt-2">{formatMontant(resultats.soldeRetraite)}</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
              <div>
                <p className="text-sm opacity-80">{t('calculators.rrsp.results.annualIncome')}</p>
                <p className="text-xl md:text-2xl font-semibold mt-1">{formatMontant(resultats.retraitAnnuel)}</p>
              </div>
              <div>
                <p className="text-sm opacity-80">{t('calculators.rrsp.results.monthlyIncome')}</p>
                <p className="text-xl md:text-2xl font-semibold mt-1">{formatMontant(resultats.retraitMensuel)}</p>
              </div>
              <div>
                <p className="text-sm opacity-80">{t('calculators.rrsp.results.interestEarned')}</p>
                <p className="text-xl md:text-2xl font-semibold mt-1">{formatMontant(resultats.interetsGagnes)}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Graphique */}
        <Card>
          <CardHeader>
            <CardTitle>{t('calculators.rrsp.results.chartTitle')}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={resultats.donnees}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis 
                    dataKey="annee" 
                    tickFormatter={(v) => v <= anneesAvantRetraite ? `${v}` : `R+${v - anneesAvantRetraite}`} 
                  />
                  <YAxis tickFormatter={(v) => `${(v / 1000).toFixed(0)}k`} />
                  <Tooltip
                    formatter={(value: number) => formatMontant(value)}
                    labelFormatter={(label) => label <= anneesAvantRetraite ? `${currentLanguage === 'en' ? 'Year' : 'Année'} ${label}` : `${currentLanguage === 'en' ? 'Retirement' : 'Retraite'} +${label - anneesAvantRetraite} ${t('calculators.common.years')}`}
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
                    stroke="hsl(var(--primary))" 
                    fill="hsl(var(--primary))" 
                    fillOpacity={0.6}
                    name={currentLanguage === 'en' ? 'RRSP Balance' : 'Solde REER'}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <CalculatorFAQ items={faqItems} />
      </div>
    </CalculatorLayout>
  );
};

export default EpargneREER;
