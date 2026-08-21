import { useState, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { TrendingUp } from 'lucide-react';
import { CalculatorLayout } from '@/components/calculators/CalculatorLayout';
import { CalculatorFAQ } from '@/components/calculators/CalculatorFAQ';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { useLanguage } from '@/hooks/useLanguage';

const InteretsComposes = () => {
  const { t } = useTranslation();
  const { currentLanguage } = useLanguage();
  const [capitalInitial, setCapitalInitial] = useState(10000);
  const [versementRegulier, setVersementRegulier] = useState(200);
  const [frequenceVersement, setFrequenceVersement] = useState<'mensuel' | 'annuel'>('mensuel');
  const [tauxInteret, setTauxInteret] = useState(5);
  const [frequenceComposition, setFrequenceComposition] = useState<'mensuel' | 'annuel'>('mensuel');
  const [duree, setDuree] = useState(25);

  const resultats = useMemo(() => {
    const tauxPeriodique = frequenceComposition === 'mensuel' 
      ? tauxInteret / 100 / 12 
      : tauxInteret / 100;
    const periodesParAn = frequenceComposition === 'mensuel' ? 12 : 1;
    const totalPeriodes = duree * periodesParAn;
    
    const versementParPeriode = frequenceVersement === 'mensuel' 
      ? (frequenceComposition === 'mensuel' ? versementRegulier : versementRegulier * 12)
      : (frequenceComposition === 'mensuel' ? versementRegulier / 12 : versementRegulier);

    let solde = capitalInitial;
    let totalContributions = capitalInitial;
    const donnees = [];

    for (let annee = 0; annee <= duree; annee++) {
      const periodesAnnee = annee * periodesParAn;
      
      if (annee === 0) {
        donnees.push({
          annee: 0,
          capital: capitalInitial,
          contributions: capitalInitial,
          interets: 0,
        });
      } else {
        let soldeAnnee = capitalInitial;
        let contributionsAnnee = capitalInitial;
        
        for (let p = 1; p <= periodesAnnee; p++) {
          soldeAnnee = soldeAnnee * (1 + tauxPeriodique) + versementParPeriode;
          contributionsAnnee += versementParPeriode;
        }
        
        donnees.push({
          annee,
          capital: Math.round(soldeAnnee),
          contributions: Math.round(contributionsAnnee),
          interets: Math.round(soldeAnnee - contributionsAnnee),
        });
      }
    }

    const dernierResultat = donnees[donnees.length - 1];
    
    return {
      donnees,
      montantFinal: dernierResultat.capital,
      totalContributions: dernierResultat.contributions,
      totalInterets: dernierResultat.interets,
    };
  }, [capitalInitial, versementRegulier, frequenceVersement, tauxInteret, frequenceComposition, duree]);

  const formatMontant = (montant: number) => {
    return new Intl.NumberFormat(currentLanguage === 'en' ? 'en-CA' : 'fr-CA', { style: 'currency', currency: 'CAD', maximumFractionDigits: 0 }).format(montant);
  };

  const faqItems = [
    { question: t('calculators.compound.faq.q1'), answer: t('calculators.compound.faq.a1') },
    { question: t('calculators.compound.faq.q2'), answer: t('calculators.compound.faq.a2') },
    { question: t('calculators.compound.faq.q3'), answer: t('calculators.compound.faq.a3') },
    { question: t('calculators.compound.faq.q4'), answer: t('calculators.compound.faq.a4') },
    { question: t('calculators.compound.faq.q5'), answer: t('calculators.compound.faq.a5') },
  ];

  return (
    <CalculatorLayout
      title={t('calculators.compound.title')}
      description={t('calculators.compound.description')}
      icon={<TrendingUp className="w-8 h-8 text-primary" />}
      seoTitle={t('calculators.compound.seo.title')}
      seoDescription={t('calculators.compound.seo.description')}
      seoKeywords={t('calculators.compound.seo.keywords')}
      url={`https://finivo.ca/${currentLanguage}/calculateurs/interets-composes`}
      relatedCategory="investissement"
      featuredCardType="cashback"
    >
      <div className="space-y-8">
        {/* Section explicative */}
        <Card className="bg-muted/50">
          <CardContent className="pt-6">
            <h2 className="text-lg font-semibold mb-3">{t('calculators.compound.whatIs')}</h2>
            <div className="space-y-3 text-sm text-muted-foreground">
              <p>{t('calculators.compound.explanation')}</p>
              <div className="grid md:grid-cols-2 gap-4 mt-4">
                <div>
                  <h3 className="font-medium text-foreground mb-2">{t('calculators.compound.howItWorks')}</h3>
                  <ul className="list-disc list-inside space-y-1">
                    <li>{currentLanguage === 'en' ? 'Your interest gets added to the capital' : 'Vos intérêts s\'ajoutent au capital'}</li>
                    <li>{currentLanguage === 'en' ? 'New capital generates more interest' : 'Le nouveau capital génère plus d\'intérêts'}</li>
                    <li>{currentLanguage === 'en' ? 'Growth accelerates over time' : 'La croissance s\'accélère avec le temps'}</li>
                    <li>{currentLanguage === 'en' ? 'The earlier you start, the better' : 'Plus vous commencez tôt, mieux c\'est'}</li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-medium text-foreground mb-2">{t('calculators.compound.keyFactors')}</h3>
                  <ul className="list-disc list-inside space-y-1">
                    <li><strong>{currentLanguage === 'en' ? 'Time' : 'Temps'}</strong> : {currentLanguage === 'en' ? 'the most powerful factor' : 'le facteur le plus puissant'}</li>
                    <li><strong>{currentLanguage === 'en' ? 'Rate' : 'Taux'}</strong> : {currentLanguage === 'en' ? 'even 1% more makes a difference' : 'même 1% de plus fait une différence'}</li>
                    <li><strong>{currentLanguage === 'en' ? 'Frequency' : 'Fréquence'}</strong> : {currentLanguage === 'en' ? 'monthly > yearly' : 'mensuelle > annuelle'}</li>
                    <li><strong>{currentLanguage === 'en' ? 'Consistency' : 'Régularité'}</strong> : {currentLanguage === 'en' ? 'regular contributions amplify the effect' : 'les versements réguliers amplifient l\'effet'}</li>
                  </ul>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid lg:grid-cols-2 gap-8">
        {/* Formulaire */}
        <Card>
          <CardHeader>
            <CardTitle>{t('calculators.compound.params')}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Capital initial */}
            <div className="space-y-3">
              <Label htmlFor="capital">{t('calculators.compound.initialInvestment')}</Label>
              <div className="flex items-center gap-3">
                <Input
                  id="capital"
                  type="number"
                  value={capitalInitial}
                  onChange={(e) => setCapitalInitial(Number(e.target.value))}
                  min={0}
                  className="w-40"
                />
                <span className="text-muted-foreground">$</span>
              </div>
              <Slider
                value={[capitalInitial]}
                onValueChange={(v) => setCapitalInitial(v[0])}
                min={0}
                max={Math.max(500000, capitalInitial)}
                step={1000}
              />
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>0 $</span>
                <span>{formatMontant(Math.max(500000, capitalInitial))}</span>
              </div>
            </div>

            {/* Versements réguliers */}
            <div className="space-y-3">
              <Label htmlFor="versement">{t('calculators.compound.regularContributions')}</Label>
              <div className="flex items-center gap-3">
                <Input
                  id="versement"
                  type="number"
                  value={versementRegulier}
                  onChange={(e) => setVersementRegulier(Number(e.target.value))}
                  className="w-32"
                />
                <span className="text-muted-foreground">$</span>
                <Select value={frequenceVersement} onValueChange={(v: 'mensuel' | 'annuel') => setFrequenceVersement(v)}>
                  <SelectTrigger className="w-32">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="mensuel">{t('calculators.compound.frequency.perMonth')}</SelectItem>
                    <SelectItem value="annuel">{t('calculators.compound.frequency.perYear')}</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Slider
                value={[versementRegulier]}
                onValueChange={(v) => setVersementRegulier(v[0])}
                min={0}
                max={5000}
                step={50}
              />
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>0 $</span>
                <span>{formatMontant(5000)}</span>
              </div>
            </div>

            {/* Taux d'intérêt */}
            <div className="space-y-3">
              <Label htmlFor="taux">{t('calculators.compound.annualReturnRate')}</Label>
              <div className="flex items-center gap-3">
                <Input
                  id="taux"
                  type="number"
                  step="0.1"
                  value={tauxInteret}
                  onChange={(e) => setTauxInteret(Number(e.target.value))}
                  className="w-24"
                />
                <span className="text-muted-foreground">%</span>
              </div>
              <Slider
                value={[tauxInteret]}
                onValueChange={(v) => setTauxInteret(v[0])}
                min={0}
                max={15}
                step={0.1}
              />
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>0%</span>
                <span>15%</span>
              </div>
            </div>

            {/* Fréquence de composition */}
            <div className="space-y-3">
              <Label>{t('calculators.compound.interestCalculation')}</Label>
              <Select value={frequenceComposition} onValueChange={(v: 'mensuel' | 'annuel') => setFrequenceComposition(v)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="mensuel">{t('calculators.compound.frequency.monthly')}</SelectItem>
                  <SelectItem value="annuel">{t('calculators.compound.frequency.yearly')}</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Durée */}
            <div className="space-y-3">
              <Label htmlFor="duree">{t('calculators.compound.investmentHorizon')}</Label>
              <div className="flex items-center gap-3">
                <Input
                  id="duree"
                  type="number"
                  value={duree}
                  onChange={(e) => setDuree(Number(e.target.value))}
                  className="w-24"
                />
                <span className="text-muted-foreground">{t('calculators.common.years')}</span>
              </div>
              <Slider
                value={[duree]}
                onValueChange={(v) => setDuree(v[0])}
                min={1}
                max={50}
                step={1}
              />
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>1 {t('calculators.common.year')}</span>
                <span>50 {t('calculators.common.years')}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Résultats */}
        <div className="space-y-6">
          <Card className="bg-primary text-primary-foreground">
            <CardContent className="pt-6">
              <div className="text-center">
                <p className="text-sm opacity-80">{t('calculators.compound.results.finalValue')}</p>
                <p className="text-4xl md:text-5xl font-bold mt-2">{formatMontant(resultats.montantFinal)}</p>
              </div>
              <div className="grid grid-cols-2 gap-4 mt-6">
                <div className="text-center">
                  <p className="text-sm opacity-80">{t('calculators.compound.results.totalContributions')}</p>
                  <p className="text-xl md:text-2xl font-semibold">{formatMontant(resultats.totalContributions)}</p>
                </div>
                <div className="text-center">
                  <p className="text-sm opacity-80">{t('calculators.compound.results.interestEarned')}</p>
                  <p className="text-xl md:text-2xl font-semibold">{formatMontant(resultats.totalInterets)}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Graphique */}
          <Card>
            <CardHeader>
              <CardTitle>{t('calculators.compound.results.chartTitle')}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-72">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={resultats.donnees}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="annee" tickFormatter={(v) => `${v} ${t('calculators.common.years')}`} />
                    <YAxis tickFormatter={(v) => `${(v / 1000).toFixed(0)}k`} />
                    <Tooltip
                      formatter={(value: number) => formatMontant(value)}
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
                      dataKey="contributions" 
                      stackId="1"
                      stroke="hsl(var(--muted-foreground))" 
                      fill="hsl(var(--muted))" 
                      name={currentLanguage === 'en' ? 'Contributions' : 'Contributions'}
                    />
                    <Area 
                      type="monotone" 
                      dataKey="interets" 
                      stackId="1"
                      stroke="hsl(var(--primary))" 
                      fill="hsl(var(--primary))" 
                      name={currentLanguage === 'en' ? 'Interest' : 'Intérêts'}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>
        </div>

        <CalculatorFAQ items={faqItems} />
      </div>
    </CalculatorLayout>
  );
};

export default InteretsComposes;
