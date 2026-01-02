import { useState, useMemo } from 'react';
import { TrendingUp } from 'lucide-react';
import { CalculatorLayout } from '@/components/calculators/CalculatorLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

const InteretsComposes = () => {
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
    return new Intl.NumberFormat('fr-CA', { style: 'currency', currency: 'CAD', maximumFractionDigits: 0 }).format(montant);
  };

  return (
    <CalculatorLayout
      title="Calculatrice d'intérêts composés"
      description="Calculez combien un placement peut vous rapporter au fil du temps grâce aux intérêts composés."
      icon={<TrendingUp className="w-8 h-8 text-primary" />}
      seoTitle="Calculatrice d'intérêts composés | Finivo"
      seoDescription="Calculez la croissance de vos placements avec notre calculatrice d'intérêts composés. Visualisez l'impact du temps et des versements réguliers."
      seoKeywords="intérêts composés, calculatrice, placement, investissement, épargne, rendement"
      url="https://finivo.ca/calculateurs/interets-composes"
      relatedCategory="investissement"
      featuredCardType="cashback"
    >
      <div className="grid lg:grid-cols-2 gap-8">
        {/* Formulaire */}
        <Card>
          <CardHeader>
            <CardTitle>Paramètres de calcul</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Capital initial */}
            <div className="space-y-3">
              <Label htmlFor="capital">Placement initial</Label>
              <div className="flex items-center gap-3">
                <Input
                  id="capital"
                  type="number"
                  value={capitalInitial}
                  onChange={(e) => setCapitalInitial(Number(e.target.value))}
                  className="w-32"
                />
                <span className="text-muted-foreground">$</span>
              </div>
              <Slider
                value={[capitalInitial]}
                onValueChange={(v) => setCapitalInitial(v[0])}
                min={0}
                max={500000}
                step={1000}
              />
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>0 $</span>
                <span>500 000 $</span>
              </div>
            </div>

            {/* Versements réguliers */}
            <div className="space-y-3">
              <Label htmlFor="versement">Versements réguliers</Label>
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
                    <SelectItem value="mensuel">Par mois</SelectItem>
                    <SelectItem value="annuel">Par année</SelectItem>
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
            </div>

            {/* Taux d'intérêt */}
            <div className="space-y-3">
              <Label htmlFor="taux">Taux de rendement annuel</Label>
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
              <Label>Calcul des intérêts</Label>
              <Select value={frequenceComposition} onValueChange={(v: 'mensuel' | 'annuel') => setFrequenceComposition(v)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="mensuel">Une fois par mois</SelectItem>
                  <SelectItem value="annuel">Une fois par année</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Durée */}
            <div className="space-y-3">
              <Label htmlFor="duree">Horizon de placement</Label>
              <div className="flex items-center gap-3">
                <Input
                  id="duree"
                  type="number"
                  value={duree}
                  onChange={(e) => setDuree(Number(e.target.value))}
                  className="w-24"
                />
                <span className="text-muted-foreground">années</span>
              </div>
              <Slider
                value={[duree]}
                onValueChange={(v) => setDuree(v[0])}
                min={1}
                max={50}
                step={1}
              />
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>1 an</span>
                <span>50 ans</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Résultats */}
        <div className="space-y-6">
          <Card className="bg-primary text-primary-foreground">
            <CardContent className="pt-6">
              <div className="text-center">
                <p className="text-sm opacity-80">Valeur finale de votre placement</p>
                <p className="text-4xl font-bold mt-2">{formatMontant(resultats.montantFinal)}</p>
              </div>
              <div className="grid grid-cols-2 gap-4 mt-6">
                <div className="text-center">
                  <p className="text-sm opacity-80">Total des contributions</p>
                  <p className="text-xl font-semibold">{formatMontant(resultats.totalContributions)}</p>
                </div>
                <div className="text-center">
                  <p className="text-sm opacity-80">Intérêts gagnés</p>
                  <p className="text-xl font-semibold">{formatMontant(resultats.totalInterets)}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Graphique */}
          <Card>
            <CardHeader>
              <CardTitle>Croissance de votre placement</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-72">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={resultats.donnees}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="annee" tickFormatter={(v) => `${v} ans`} />
                    <YAxis tickFormatter={(v) => `${(v / 1000).toFixed(0)}k`} />
                    <Tooltip 
                      formatter={(value: number) => formatMontant(value)}
                      labelFormatter={(label) => `Année ${label}`}
                    />
                    <Legend />
                    <Area 
                      type="monotone" 
                      dataKey="contributions" 
                      stackId="1"
                      stroke="hsl(var(--muted-foreground))" 
                      fill="hsl(var(--muted))" 
                      name="Contributions"
                    />
                    <Area 
                      type="monotone" 
                      dataKey="interets" 
                      stackId="1"
                      stroke="hsl(var(--primary))" 
                      fill="hsl(var(--primary))" 
                      name="Intérêts"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </CalculatorLayout>
  );
};

export default InteretsComposes;
