import { useState, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { Home, CheckCircle2, XCircle } from 'lucide-react';
import { CalculatorLayout } from '@/components/calculators/CalculatorLayout';
import { CalculatorFAQ } from '@/components/calculators/CalculatorFAQ';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import InvestmentPathIllustration from '@/assets/illustrations/investment-path.svg';
import { useLanguage } from '@/hooks/useLanguage';

const EpargneCELIAPP = () => {
  const { t } = useTranslation();
  const { currentLanguage } = useLanguage();
  const [age, setAge] = useState(28);
  const [estResident, setEstResident] = useState(true);
  const [premierAchat, setPremierAchat] = useState(true);
  const [anneeOuverture, setAnneeOuverture] = useState(2024);
  const [moisDebut, setMoisDebut] = useState('janvier');
  const [anneeDebut, setAnneeDebut] = useState(2026);
  const [moisAchat, setMoisAchat] = useState('janvier');
  const [anneeAchat, setAnneeAchat] = useState(2028);
  const [cotisationAnnuelle, setCotisationAnnuelle] = useState(8000);
  const [frequenceCotisation, setFrequenceCotisation] = useState<'annuel' | 'mensuel'>('annuel');
  const [tauxRendement, setTauxRendement] = useState(4);

  const estAdmissible = age >= 18 && age <= 71 && estResident && premierAchat;

  const moisFr = ['janvier', 'février', 'mars', 'avril', 'mai', 'juin', 'juillet', 'août', 'septembre', 'octobre', 'novembre', 'décembre'];
  const moisEn = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  const mois = currentLanguage === 'en' ? moisEn : moisFr;

  const resultats = useMemo(() => {
    if (!estAdmissible) {
      return {
        donnees: [],
        montantFinal: 0,
        totalCotisations: 0,
        interetsGagnes: 0,
        economiesImpot: 0,
      };
    }

    const moisIndex: Record<string, number> = {
      'janvier': 0, 'février': 1, 'mars': 2, 'avril': 3,
      'mai': 4, 'juin': 5, 'juillet': 6, 'août': 7,
      'septembre': 8, 'octobre': 9, 'novembre': 10, 'décembre': 11,
      'January': 0, 'February': 1, 'March': 2, 'April': 3,
      'May': 4, 'June': 5, 'July': 6, 'August': 7,
      'September': 8, 'October': 9, 'November': 10, 'December': 11
    };

    const dateDebut = new Date(anneeDebut, moisIndex[moisDebut]);
    const dateAchat = new Date(anneeAchat, moisIndex[moisAchat]);
    
    const moisTotal = (dateAchat.getFullYear() - dateDebut.getFullYear()) * 12 + 
                      (dateAchat.getMonth() - dateDebut.getMonth());
    
    if (moisTotal <= 0) {
      return {
        donnees: [],
        montantFinal: 0,
        totalCotisations: 0,
        interetsGagnes: 0,
        economiesImpot: 0,
      };
    }

    const cotisationMensuelle = frequenceCotisation === 'mensuel' 
      ? cotisationAnnuelle 
      : cotisationAnnuelle / 12;
    
    const maxCotisationAnnuelle = 8000;
    const maxCotisationMensuelle = maxCotisationAnnuelle / 12;
    const cotisationEffective = Math.min(cotisationMensuelle, maxCotisationMensuelle);
    
    const tauxMensuel = tauxRendement / 100 / 12;
    
    let solde = 0;
    let totalCotisations = 0;
    const donnees = [];
    
    for (let moisNum = 0; moisNum <= moisTotal; moisNum++) {
      if (moisNum > 0) {
        solde = solde * (1 + tauxMensuel) + cotisationEffective;
        totalCotisations += cotisationEffective;
      }
      
      if (moisNum % 12 === 0) {
        donnees.push({
          annee: Math.floor(moisNum / 12),
          solde: Math.round(solde),
          cotisations: Math.round(totalCotisations),
        });
      }
    }

    if (moisTotal % 12 !== 0) {
      donnees.push({
        annee: Math.ceil(moisTotal / 12),
        solde: Math.round(solde),
        cotisations: Math.round(totalCotisations),
      });
    }

    const economiesImpot = Math.round(totalCotisations * 0.30);

    return {
      donnees,
      montantFinal: Math.round(solde),
      totalCotisations: Math.round(totalCotisations),
      interetsGagnes: Math.round(solde - totalCotisations),
      economiesImpot,
    };
  }, [estAdmissible, anneeDebut, moisDebut, anneeAchat, moisAchat, cotisationAnnuelle, frequenceCotisation, tauxRendement]);

  const formatMontant = (montant: number) => {
    return new Intl.NumberFormat(currentLanguage === 'en' ? 'en-CA' : 'fr-CA', { style: 'currency', currency: 'CAD', maximumFractionDigits: 0 }).format(montant);
  };

  const annees = Array.from({ length: 20 }, (_, i) => 2023 + i);

  const faqItems = [
    { question: t('calculators.fhsa.faq.q1'), answer: t('calculators.fhsa.faq.a1') },
    { question: t('calculators.fhsa.faq.q2'), answer: t('calculators.fhsa.faq.a2') },
    { question: t('calculators.fhsa.faq.q3'), answer: t('calculators.fhsa.faq.a3') },
    { question: t('calculators.fhsa.faq.q4'), answer: t('calculators.fhsa.faq.a4') },
    { question: t('calculators.fhsa.faq.q5'), answer: t('calculators.fhsa.faq.a5') },
  ];

  return (
    <CalculatorLayout
      title={t('calculators.fhsa.title')}
      description={t('calculators.fhsa.description')}
      icon={<Home className="w-8 h-8 text-primary" />}
      seoTitle={t('calculators.fhsa.seo.title')}
      seoDescription={t('calculators.fhsa.seo.description')}
      seoKeywords={t('calculators.fhsa.seo.keywords')}
      url={`https://finivo.ca/${currentLanguage}/calculateurs/epargne-celiapp`}
      relatedCategory="epargne"
      featuredCardType="cashback"
      illustration={InvestmentPathIllustration}
    >
      <div className="space-y-8">
        {/* Section explicative */}
        <Card className="bg-muted/50">
          <CardContent className="pt-6">
            <h2 className="text-lg font-semibold mb-3">{t('calculators.fhsa.whatIs')}</h2>
            <div className="space-y-3 text-sm text-muted-foreground">
              <p>{t('calculators.fhsa.explanation')}</p>
              <div className="grid md:grid-cols-2 gap-4 mt-4">
                <div>
                  <h3 className="font-medium text-foreground mb-2">{t('calculators.fhsa.advantages')}</h3>
                  <ul className="list-disc list-inside space-y-1">
                    <li>{currentLanguage === 'en' ? 'Tax-deductible contributions (like RRSP)' : 'Cotisations déductibles d\'impôt (comme le REER)'}</li>
                    <li>{currentLanguage === 'en' ? 'Tax-free withdrawals for purchase (like TFSA)' : 'Retraits non imposables pour achat (comme le CELI)'}</li>
                    <li>{currentLanguage === 'en' ? 'Maximum $8,000 per year' : 'Maximum de 8 000 $ par année'}</li>
                    <li>{currentLanguage === 'en' ? 'Lifetime limit of $40,000' : 'Plafond à vie de 40 000 $'}</li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-medium text-foreground mb-2">{t('calculators.fhsa.eligibilityConditions')}</h3>
                  <ul className="list-disc list-inside space-y-1">
                    <li>{currentLanguage === 'en' ? 'Be aged 18 to 71' : 'Être âgé de 18 à 71 ans'}</li>
                    <li>{currentLanguage === 'en' ? 'Be a Canadian resident' : 'Être résident canadien'}</li>
                    <li>{currentLanguage === 'en' ? 'Not have been a homeowner in the last 4 years' : 'Ne pas avoir été propriétaire dans les 4 dernières années'}</li>
                    <li>{currentLanguage === 'en' ? 'Use funds within 15 years' : 'Utiliser les fonds dans les 15 ans'}</li>
                  </ul>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Vérification admissibilité */}
        <Card>
          <CardHeader>
            <CardTitle>{t('calculators.fhsa.checkEligibility')}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <p className="text-sm text-muted-foreground">{t('calculators.fhsa.eligibilityIntro')}</p>

            <div className="space-y-4">
              <div className="space-y-3">
                <Label>1. {t('calculators.fhsa.ageQuestion')}</Label>
                <Input
                  type="number"
                  value={age}
                  onChange={(e) => setAge(Number(e.target.value))}
                  className="w-24"
                />
              </div>

              <div className="space-y-3">
                <Label>2. {t('calculators.fhsa.residentQuestion')}</Label>
                <RadioGroup 
                  value={estResident ? 'oui' : 'non'} 
                  onValueChange={(v) => setEstResident(v === 'oui')}
                  className="flex gap-4"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="oui" id="resident-oui" />
                    <Label htmlFor="resident-oui">{t('common.yes')}</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="non" id="resident-non" />
                    <Label htmlFor="resident-non">{t('common.no')}</Label>
                  </div>
                </RadioGroup>
              </div>

              <div className="space-y-3">
                <Label>3. {t('calculators.fhsa.firstTimeQuestion')}</Label>
                <RadioGroup 
                  value={premierAchat ? 'oui' : 'non'} 
                  onValueChange={(v) => setPremierAchat(v === 'oui')}
                  className="flex gap-4"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="oui" id="premier-oui" />
                    <Label htmlFor="premier-oui">{t('common.yes')}</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="non" id="premier-non" />
                    <Label htmlFor="premier-non">{t('common.no')}</Label>
                  </div>
                </RadioGroup>
              </div>
            </div>

            <Alert className={estAdmissible ? 'border-green-500 bg-green-50' : 'border-destructive bg-destructive/10'}>
              {estAdmissible ? (
                <CheckCircle2 className="h-4 w-4 text-green-600" />
              ) : (
                <XCircle className="h-4 w-4 text-destructive" />
              )}
              <AlertDescription className={estAdmissible ? 'text-green-800' : 'text-destructive'}>
                {estAdmissible ? t('calculators.fhsa.eligible') : t('calculators.fhsa.notEligible')}
              </AlertDescription>
            </Alert>
          </CardContent>
        </Card>

        {/* Calculateur */}
        {estAdmissible && (
          <>
            <Card>
              <CardHeader>
                <CardTitle>{t('calculators.fhsa.calculateSavings')}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <p className="text-sm text-muted-foreground">{t('calculators.fhsa.savingsIntro')}</p>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-3">
                    <Label>{t('calculators.fhsa.openingYear')}</Label>
                    <Select value={anneeOuverture.toString()} onValueChange={(v) => setAnneeOuverture(Number(v))}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {annees.slice(0, 5).map((a) => (
                          <SelectItem key={a} value={a.toString()}>{a}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-3">
                    <Label>{t('calculators.fhsa.startContributing')}</Label>
                    <div className="flex gap-2">
                      <Select value={moisDebut} onValueChange={setMoisDebut}>
                        <SelectTrigger className="flex-1">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {mois.map((m) => (
                            <SelectItem key={m} value={m}>{m.charAt(0).toUpperCase() + m.slice(1)}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <Select value={anneeDebut.toString()} onValueChange={(v) => setAnneeDebut(Number(v))}>
                        <SelectTrigger className="w-24">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {annees.map((a) => (
                            <SelectItem key={a} value={a.toString()}>{a}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <Label>{t('calculators.fhsa.purchaseDate')}</Label>
                    <div className="flex gap-2">
                      <Select value={moisAchat} onValueChange={setMoisAchat}>
                        <SelectTrigger className="flex-1">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {mois.map((m) => (
                            <SelectItem key={m} value={m}>{m.charAt(0).toUpperCase() + m.slice(1)}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <Select value={anneeAchat.toString()} onValueChange={(v) => setAnneeAchat(Number(v))}>
                        <SelectTrigger className="w-24">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {annees.map((a) => (
                            <SelectItem key={a} value={a.toString()}>{a}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <Label>{t('calculators.fhsa.contributionAmount')}</Label>
                    <div className="flex items-center gap-2">
                      <Input
                        type="number"
                        value={cotisationAnnuelle}
                        onChange={(e) => setCotisationAnnuelle(Number(e.target.value))}
                        className="w-32"
                      />
                      <span className="text-muted-foreground">$</span>
                      <RadioGroup 
                        value={frequenceCotisation} 
                        onValueChange={(v: 'annuel' | 'mensuel') => setFrequenceCotisation(v)}
                        className="flex gap-4"
                      >
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="annuel" id="freq-annuel" />
                          <Label htmlFor="freq-annuel">{currentLanguage === 'en' ? 'Year' : 'Année'}</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="mensuel" id="freq-mensuel" />
                          <Label htmlFor="freq-mensuel">{currentLanguage === 'en' ? 'Month' : 'Mois'}</Label>
                        </div>
                      </RadioGroup>
                    </div>
                    <p className="text-xs text-muted-foreground">{t('calculators.fhsa.maxAnnual')}</p>
                  </div>

                  <div className="space-y-3">
                    <Label>{t('calculators.fhsa.annualReturn')}</Label>
                    <div className="flex items-center gap-3">
                      <Input
                        type="number"
                        step="0.1"
                        value={tauxRendement}
                        onChange={(e) => setTauxRendement(Number(e.target.value))}
                        className="w-24"
                      />
                      <span className="text-muted-foreground">%</span>
                    </div>
                    <Slider
                      value={[tauxRendement]}
                      onValueChange={(v) => setTauxRendement(v[0])}
                      min={0}
                      max={10}
                      step={0.1}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Résultats */}
            <Card className="bg-primary text-primary-foreground">
              <CardContent className="pt-6">
                <div className="grid md:grid-cols-4 gap-6 text-center">
                  <div>
                    <p className="text-sm opacity-80">{t('calculators.fhsa.results.totalSavings')}</p>
                    <p className="text-3xl font-bold mt-1">{formatMontant(resultats.montantFinal)}</p>
                  </div>
                  <div>
                    <p className="text-sm opacity-80">{t('calculators.fhsa.results.contributions')}</p>
                    <p className="text-3xl font-bold mt-1">{formatMontant(resultats.totalCotisations)}</p>
                  </div>
                  <div>
                    <p className="text-sm opacity-80">{t('calculators.fhsa.results.growth')}</p>
                    <p className="text-3xl font-bold mt-1">{formatMontant(resultats.interetsGagnes)}</p>
                  </div>
                  <div>
                    <p className="text-sm opacity-80">{t('calculators.fhsa.results.taxSavings')}</p>
                    <p className="text-3xl font-bold mt-1">{formatMontant(resultats.economiesImpot)}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Graphique */}
            {resultats.donnees.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle>{t('calculators.fhsa.results.chartTitle')}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-72">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={resultats.donnees}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="annee" tickFormatter={(v) => `${currentLanguage === 'en' ? 'Year' : 'Année'} ${v}`} />
                        <YAxis tickFormatter={(v) => `${(v / 1000).toFixed(0)}k`} />
                        <Tooltip 
                          formatter={(value: number) => formatMontant(value)}
                          labelFormatter={(label) => `${currentLanguage === 'en' ? 'Year' : 'Année'} ${label}`}
                        />
                        <Legend />
                        <Area 
                          type="monotone" 
                          dataKey="cotisations" 
                          stackId="1"
                          stroke="hsl(var(--muted-foreground))" 
                          fill="hsl(var(--muted))" 
                          name={currentLanguage === 'en' ? 'Contributions' : 'Cotisations'}
                        />
                        <Area 
                          type="monotone" 
                          dataKey="solde" 
                          stroke="hsl(var(--primary))" 
                          fill="hsl(var(--primary))" 
                          fillOpacity={0.6}
                          name={currentLanguage === 'en' ? 'Total balance' : 'Solde total'}
                        />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            )}
          </>
        )}

        <CalculatorFAQ items={faqItems} />
      </div>
    </CalculatorLayout>
  );
};

export default EpargneCELIAPP;
