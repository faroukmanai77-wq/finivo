import { useState, useMemo } from 'react';
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

const faqItems = [
  {
    question: "Quelle est la limite de cotisation REER pour 2026?",
    answer: "Pour 2026, la limite de cotisation REER est de 18% de votre revenu gagné de l'année précédente, jusqu'à un maximum de 32 490 $. Vos droits de cotisation inutilisés des années précédentes s'accumulent et sont reportés."
  },
  {
    question: "Quand dois-je cotiser à mon REER?",
    answer: "Vous pouvez cotiser à votre REER tout au long de l'année et jusqu'au 60e jour de l'année suivante pour que la cotisation soit déductible de vos revenus de l'année précédente. Par exemple, pour l'année d'imposition 2024, vous avez jusqu'au 1er mars 2025."
  },
  {
    question: "REER ou CELI : lequel choisir?",
    answer: "Le REER est généralement préférable si votre taux d'imposition actuel est plus élevé qu'à la retraite, car il offre une déduction immédiate. Le CELI est avantageux si vous prévoyez un taux d'imposition similaire ou plus élevé à la retraite, ou si vous voulez plus de flexibilité pour les retraits."
  },
  {
    question: "Puis-je retirer de mon REER avant la retraite?",
    answer: "Oui, mais les retraits sont imposables comme revenu ordinaire. Deux exceptions : le Régime d'accession à la propriété (RAP) permet de retirer jusqu'à 60 000 $ pour une première maison, et le Régime d'encouragement à l'éducation permanente (REEP) permet de retirer jusqu'à 20 000 $ pour les études."
  },
  {
    question: "Que se passe-t-il avec mon REER à 71 ans?",
    answer: "À la fin de l'année où vous atteignez 71 ans, vous devez convertir votre REER en FERR (Fonds enregistré de revenu de retraite), acheter une rente, ou retirer le solde. Le FERR vous oblige à effectuer des retraits minimums annuels."
  }
];
const EpargneREER = () => {
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
    return new Intl.NumberFormat('fr-CA', { style: 'currency', currency: 'CAD', maximumFractionDigits: 0 }).format(montant);
  };

  return (
    <CalculatorLayout
      title="Calculatrice d'épargne REER"
      description="Déterminez quelle sera la valeur de votre régime enregistré d'épargne-retraite (REER) quand vous prendrez votre retraite, et le revenu annuel que vous en tirerez."
      icon={<PiggyBank className="w-8 h-8 text-primary" />}
      seoTitle="Calculatrice REER 2026 - Épargne-retraite Québec | Finivo"
      seoDescription="Calculez la valeur future de votre REER en 2026 et estimez votre revenu de retraite. Planifiez votre épargne-retraite avec notre calculatrice REER gratuite. Plafond 2026 : 32 490$."
      seoKeywords="REER 2026, épargne-retraite québec, calculatrice REER gratuit, retraite investissement, plafond cotisation REER, RAP 60000"
      url="https://finivo.ca/calculateurs/epargne-reer"
      relatedCategory="epargne"
      featuredCardType="cashback"
      illustration={InvestmentPathIllustration}
    >
      <div className="space-y-8">
        {/* Section explicative */}
        <Card className="bg-muted/50">
          <CardContent className="pt-6">
            <h2 className="text-lg font-semibold mb-3">Qu'est-ce qu'un REER?</h2>
            <div className="space-y-3 text-sm text-muted-foreground">
              <p>
                Le <strong>Régime enregistré d'épargne-retraite (REER)</strong> est un compte d'épargne à l'abri de l'impôt conçu pour vous aider à épargner pour la retraite. Les cotisations que vous faites à votre REER sont déductibles de votre revenu imposable, ce qui réduit l'impôt que vous payez cette année-là.
              </p>
              <div className="grid md:grid-cols-2 gap-4 mt-4">
                <div>
                  <h3 className="font-medium text-foreground mb-2">Avantages du REER</h3>
                  <ul className="list-disc list-inside space-y-1">
                    <li>Cotisations déductibles d'impôt</li>
                    <li>Croissance à l'abri de l'impôt</li>
                    <li>Report d'impôt jusqu'au retrait</li>
                    <li>Peut réduire votre taux d'imposition</li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-medium text-foreground mb-2">Règles importantes</h3>
                  <ul className="list-disc list-inside space-y-1">
                    <li>Limite de cotisation : 18% du revenu (max ~31 560 $ en 2024)</li>
                    <li>Les droits inutilisés sont reportés</li>
                    <li>Retraits imposables à votre taux marginal</li>
                    <li>À convertir en FERR avant 71 ans</li>
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
              <CardTitle>Lorsque vous travaillez</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <p className="text-sm text-muted-foreground">
                Lorsque vous travaillez encore, vous pouvez prendre plus de risques quand vous investissez 
                parce que votre salaire peut compenser vos pertes.
              </p>

              <div className="space-y-3">
                <Label htmlFor="solde">Valeur actuelle de votre REER</Label>
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
                <Label htmlFor="taux-travail">Taux de rendement annuel pendant que vous travaillez</Label>
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
                <Label>Montant et fréquence de vos cotisations</Label>
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
                      <SelectItem value="mensuel">Par mois</SelectItem>
                      <SelectItem value="annuel">Par année</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-3">
                <Label>Âge actuel</Label>
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
                <Label>Nombre d'années avant votre retraite</Label>
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
              <CardTitle>Lorsque vous êtes à la retraite</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <p className="text-sm text-muted-foreground">
                Une fois à la retraite, vous pouvez prendre moins de risques quand vous investissez 
                parce que votre salaire ne peut plus compenser vos pertes.
              </p>

              <div className="space-y-3">
                <Label>Estimation du nombre d'années de votre retraite</Label>
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
                <Label htmlFor="taux-retraite">Taux de rendement annuel à la retraite</Label>
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
            <div className="grid md:grid-cols-4 gap-6 text-center">
              <div>
                <p className="text-sm opacity-80">Valeur du REER à la retraite</p>
                <p className="text-3xl font-bold mt-1">{formatMontant(resultats.soldeRetraite)}</p>
              </div>
              <div>
                <p className="text-sm opacity-80">Revenu annuel estimé</p>
                <p className="text-3xl font-bold mt-1">{formatMontant(resultats.retraitAnnuel)}</p>
              </div>
              <div>
                <p className="text-sm opacity-80">Revenu mensuel estimé</p>
                <p className="text-3xl font-bold mt-1">{formatMontant(resultats.retraitMensuel)}</p>
              </div>
              <div>
                <p className="text-sm opacity-80">Intérêts gagnés</p>
                <p className="text-3xl font-bold mt-1">{formatMontant(resultats.interetsGagnes)}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Graphique */}
        <Card>
          <CardHeader>
            <CardTitle>Évolution de votre REER</CardTitle>
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
                    labelFormatter={(label) => label <= anneesAvantRetraite ? `Année ${label}` : `Retraite +${label - anneesAvantRetraite} ans`}
                  />
                  <Legend />
                  <Area 
                    type="monotone" 
                    dataKey="solde" 
                    stroke="hsl(var(--primary))" 
                    fill="hsl(var(--primary))" 
                    fillOpacity={0.6}
                    name="Solde REER"
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
