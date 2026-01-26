import { useState, useMemo } from 'react';
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

const faqItems = [
  {
    question: "Quelle est la limite de cotisation annuelle au CELIAPP?",
    answer: "La limite de cotisation annuelle au CELIAPP est de 8 000 $. Contrairement au REER, vous ne pouvez pas reporter les droits de cotisation inutilisés à l'année suivante, sauf à partir de 2024 où vous pouvez reporter jusqu'à 8 000 $ de droits inutilisés."
  },
  {
    question: "Puis-je avoir un CELIAPP si j'ai été propriétaire il y a 5 ans?",
    answer: "Oui! Vous êtes admissible si vous n'avez pas été propriétaire d'une habitation au cours de l'année d'ouverture du compte ni au cours des quatre années civiles précédentes. Si vous étiez propriétaire il y a 5 ans ou plus, vous êtes admissible."
  },
  {
    question: "Que se passe-t-il si je n'achète pas de maison?",
    answer: "Vous avez 15 ans après l'ouverture du compte pour utiliser les fonds. Après ce délai, ou si vous décidez de ne pas acheter, vous pouvez transférer les fonds dans votre REER sans affecter vos droits de cotisation, ou retirer les fonds de façon imposable."
  },
  {
    question: "Puis-je combiner le CELIAPP avec le RAP?",
    answer: "Oui! Vous pouvez utiliser à la fois le CELIAPP et le Régime d'accession à la propriété (RAP) pour votre mise de fonds. Cela vous donne accès à jusqu'à 100 000 $ (40 000 $ CELIAPP + 60 000 $ RAP) pour votre première propriété."
  },
  {
    question: "Le CELIAPP est-il mieux que le REER pour acheter une maison?",
    answer: "Pour l'achat d'une première propriété, le CELIAPP est généralement plus avantageux car les retraits sont non imposables, contrairement au RAP où vous devez rembourser votre REER sur 15 ans. Les cotisations CELIAPP sont aussi déductibles d'impôt."
  }
];
const EpargneCELIAPP = () => {
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
      'septembre': 8, 'octobre': 9, 'novembre': 10, 'décembre': 11
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
    
    for (let mois = 0; mois <= moisTotal; mois++) {
      if (mois > 0) {
        solde = solde * (1 + tauxMensuel) + cotisationEffective;
        totalCotisations += cotisationEffective;
      }
      
      // Ajouter un point de données chaque année
      if (mois % 12 === 0) {
        donnees.push({
          annee: Math.floor(mois / 12),
          solde: Math.round(solde),
          cotisations: Math.round(totalCotisations),
        });
      }
    }

    // S'assurer d'avoir le dernier point
    if (moisTotal % 12 !== 0) {
      donnees.push({
        annee: Math.ceil(moisTotal / 12),
        solde: Math.round(solde),
        cotisations: Math.round(totalCotisations),
      });
    }

    // Estimation économies d'impôt (environ 30% en moyenne)
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
    return new Intl.NumberFormat('fr-CA', { style: 'currency', currency: 'CAD', maximumFractionDigits: 0 }).format(montant);
  };

  const mois = ['janvier', 'février', 'mars', 'avril', 'mai', 'juin', 'juillet', 'août', 'septembre', 'octobre', 'novembre', 'décembre'];
  const annees = Array.from({ length: 20 }, (_, i) => 2023 + i);

  return (
    <CalculatorLayout
      title="Calculatrice d'épargne CELIAPP"
      description="Calculez vos économies potentielles avec le Compte d'épargne libre d'impôt pour l'achat d'une première propriété (CELIAPP)."
      icon={<Home className="w-8 h-8 text-primary" />}
      seoTitle="Calculatrice CELIAPP 2026 - Épargne première propriété | Finivo"
      seoDescription="Calculez combien vous pouvez économiser avec le CELIAPP en 2026 pour l'achat de votre première maison. Vérifiez votre admissibilité et planifiez votre épargne jusqu'à 40 000$."
      seoKeywords="CELIAPP 2026, première maison québec, épargne libre impôt, achat propriété, calculatrice CELIAPP, mise de fonds"
      url="https://finivo.ca/calculateurs/epargne-celiapp"
      relatedCategory="epargne"
      featuredCardType="cashback"
      illustration={InvestmentPathIllustration}
    >
      <div className="space-y-8">
        {/* Section explicative */}
        <Card className="bg-muted/50">
          <CardContent className="pt-6">
            <h2 className="text-lg font-semibold mb-3">Qu'est-ce que le CELIAPP?</h2>
            <div className="space-y-3 text-sm text-muted-foreground">
              <p>
                Le <strong>Compte d'épargne libre d'impôt pour l'achat d'une première propriété (CELIAPP)</strong> est un nouveau régime enregistré qui combine les avantages du REER et du CELI. Il vous permet d'économiser jusqu'à 40 000 $ à l'abri de l'impôt pour l'achat de votre première maison.
              </p>
              <div className="grid md:grid-cols-2 gap-4 mt-4">
                <div>
                  <h3 className="font-medium text-foreground mb-2">Avantages du CELIAPP</h3>
                  <ul className="list-disc list-inside space-y-1">
                    <li>Cotisations déductibles d'impôt (comme le REER)</li>
                    <li>Retraits non imposables pour achat (comme le CELI)</li>
                    <li>Maximum de 8 000 $ par année</li>
                    <li>Plafond à vie de 40 000 $</li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-medium text-foreground mb-2">Conditions d'admissibilité</h3>
                  <ul className="list-disc list-inside space-y-1">
                    <li>Être âgé de 18 à 71 ans</li>
                    <li>Être résident canadien</li>
                    <li>Ne pas avoir été propriétaire dans les 4 dernières années</li>
                    <li>Utiliser les fonds dans les 15 ans</li>
                  </ul>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Vérification admissibilité */}
        <Card>
          <CardHeader>
            <CardTitle>Vérifiez votre admissibilité</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <p className="text-sm text-muted-foreground">
              Vérifiez votre admissibilité à ouvrir un compte d'épargne libre d'impôt pour l'achat d'une première propriété (CELIAPP).
            </p>

            <div className="space-y-4">
              <div className="space-y-3">
                <Label>1. Quel âge avez-vous?</Label>
                <Input
                  type="number"
                  value={age}
                  onChange={(e) => setAge(Number(e.target.value))}
                  className="w-24"
                />
              </div>

              <div className="space-y-3">
                <Label>2. Êtes-vous un résident au Canada?</Label>
                <RadioGroup 
                  value={estResident ? 'oui' : 'non'} 
                  onValueChange={(v) => setEstResident(v === 'oui')}
                  className="flex gap-4"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="oui" id="resident-oui" />
                    <Label htmlFor="resident-oui">Oui</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="non" id="resident-non" />
                    <Label htmlFor="resident-non">Non</Label>
                  </div>
                </RadioGroup>
              </div>

              <div className="space-y-3">
                <Label>3. Êtes-vous propriétaire pour la première fois?</Label>
                <RadioGroup 
                  value={premierAchat ? 'oui' : 'non'} 
                  onValueChange={(v) => setPremierAchat(v === 'oui')}
                  className="flex gap-4"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="oui" id="premier-oui" />
                    <Label htmlFor="premier-oui">Oui</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="non" id="premier-non" />
                    <Label htmlFor="premier-non">Non</Label>
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
                {estAdmissible 
                  ? "Il semble que vous puissiez être admissible au CELIAPP."
                  : "Selon vos réponses, vous ne semblez pas admissible au CELIAPP."}
              </AlertDescription>
            </Alert>
          </CardContent>
        </Card>

        {/* Calculateur */}
        {estAdmissible && (
          <>
            <Card>
              <CardHeader>
                <CardTitle>Calculez vos économies CELIAPP</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <p className="text-sm text-muted-foreground">
                  Parlez-nous de la façon dont vous économisez et nous vous aiderons à calculer vos économies potentielles.
                </p>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-3">
                    <Label>Année d'ouverture de votre CELIAPP</Label>
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
                    <Label>Quand allez-vous commencer à cotiser?</Label>
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
                    <Label>Quand prévoyez-vous acheter votre maison?</Label>
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
                    <Label>Combien allez-vous cotiser?</Label>
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
                          <Label htmlFor="freq-annuel">Année</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="mensuel" id="freq-mensuel" />
                          <Label htmlFor="freq-mensuel">Mois</Label>
                        </div>
                      </RadioGroup>
                    </div>
                    <p className="text-xs text-muted-foreground">Maximum: 8 000 $ par année</p>
                  </div>

                  <div className="space-y-3">
                    <Label>Taux de rendement annuel</Label>
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
                    <p className="text-sm opacity-80">Montant disponible pour votre mise de fonds</p>
                    <p className="text-3xl font-bold mt-1">{formatMontant(resultats.montantFinal)}</p>
                  </div>
                  <div>
                    <p className="text-sm opacity-80">Total des cotisations</p>
                    <p className="text-3xl font-bold mt-1">{formatMontant(resultats.totalCotisations)}</p>
                  </div>
                  <div>
                    <p className="text-sm opacity-80">Rendement généré</p>
                    <p className="text-3xl font-bold mt-1">{formatMontant(resultats.interetsGagnes)}</p>
                  </div>
                  <div>
                    <p className="text-sm opacity-80">Économies d'impôt estimées</p>
                    <p className="text-3xl font-bold mt-1">{formatMontant(resultats.economiesImpot)}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Graphique */}
            {resultats.donnees.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle>Croissance de votre CELIAPP</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-72">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={resultats.donnees}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="annee" tickFormatter={(v) => `Année ${v}`} />
                        <YAxis tickFormatter={(v) => `${(v / 1000).toFixed(0)}k`} />
                        <Tooltip 
                          formatter={(value: number) => formatMontant(value)}
                          labelFormatter={(label) => `Année ${label}`}
                        />
                        <Legend />
                        <Area 
                          type="monotone" 
                          dataKey="cotisations" 
                          stackId="1"
                          stroke="hsl(var(--muted-foreground))" 
                          fill="hsl(var(--muted))" 
                          name="Cotisations"
                        />
                        <Area 
                          type="monotone" 
                          dataKey="solde" 
                          stroke="hsl(var(--primary))" 
                          fill="hsl(var(--primary))" 
                          fillOpacity={0.6}
                          name="Solde total"
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
