import { useState, useMemo } from 'react';
import { CreditCard, Plus, Trash2 } from 'lucide-react';
import { CalculatorLayout } from '@/components/calculators/CalculatorLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend, PieChart, Pie, Cell } from 'recharts';

interface Dette {
  id: string;
  nom: string;
  montant: number;
  tauxInteret: number;
  paiementMensuel: number;
}

const ConsolidationDettes = () => {
  const [dettes, setDettes] = useState<Dette[]>([
    { id: '1', nom: 'Carte de crédit 1', montant: 5000, tauxInteret: 19.99, paiementMensuel: 150 },
  ]);
  const [activeTab, setActiveTab] = useState('1');

  const ajouterDette = () => {
    const newId = (dettes.length + 1).toString();
    setDettes([
      ...dettes,
      { id: newId, nom: `Carte de crédit ${newId}`, montant: 0, tauxInteret: 19.99, paiementMensuel: 50 }
    ]);
    setActiveTab(newId);
  };

  const supprimerDette = (id: string) => {
    if (dettes.length > 1) {
      const newDettes = dettes.filter(d => d.id !== id);
      setDettes(newDettes);
      if (activeTab === id) {
        setActiveTab(newDettes[0].id);
      }
    }
  };

  const updateDette = (id: string, field: keyof Dette, value: string | number) => {
    setDettes(dettes.map(d => 
      d.id === id ? { ...d, [field]: value } : d
    ));
  };

  const resultats = useMemo(() => {
    let totalDette = 0;
    let totalPaiementMensuel = 0;
    let totalInterets = 0;
    let moisMax = 0;
    const detailsDettes: Array<{nom: string; montant: number; interets: number; mois: number}> = [];

    dettes.forEach(dette => {
      if (dette.montant <= 0 || dette.paiementMensuel <= 0) return;
      
      totalDette += dette.montant;
      totalPaiementMensuel += dette.paiementMensuel;
      
      // Calcul du temps de remboursement et intérêts
      const tauxMensuel = dette.tauxInteret / 100 / 12;
      let solde = dette.montant;
      let mois = 0;
      let interetsPaies = 0;
      
      while (solde > 0 && mois < 600) { // Max 50 ans
        const interetMois = solde * tauxMensuel;
        interetsPaies += interetMois;
        solde = solde + interetMois - dette.paiementMensuel;
        mois++;
        
        if (dette.paiementMensuel <= interetMois) {
          mois = Infinity;
          break;
        }
      }
      
      totalInterets += interetsPaies;
      if (mois > moisMax && mois !== Infinity) moisMax = mois;
      
      detailsDettes.push({
        nom: dette.nom,
        montant: dette.montant,
        interets: Math.round(interetsPaies),
        mois: mois === Infinity ? -1 : mois,
      });
    });

    // Données pour le graphique
    const donneesPie = dettes.filter(d => d.montant > 0).map((dette, index) => ({
      name: dette.nom,
      value: dette.montant,
    }));

    const donneesBar = detailsDettes.filter(d => d.mois > 0).map(d => ({
      nom: d.nom.length > 15 ? d.nom.substring(0, 12) + '...' : d.nom,
      principal: d.montant,
      interets: d.interets,
    }));

    return {
      totalDette,
      totalPaiementMensuel,
      totalInterets: Math.round(totalInterets),
      moisRemboursement: moisMax === Infinity ? -1 : moisMax,
      detailsDettes,
      donneesPie,
      donneesBar,
    };
  }, [dettes]);

  const formatMontant = (montant: number) => {
    return new Intl.NumberFormat('fr-CA', { style: 'currency', currency: 'CAD', maximumFractionDigits: 0 }).format(montant);
  };

  const COLORS = ['hsl(var(--primary))', 'hsl(var(--chart-2))', 'hsl(var(--chart-3))', 'hsl(var(--chart-4))', 'hsl(var(--chart-5))'];

  return (
    <CalculatorLayout
      title="Calculatrice de consolidation de dettes"
      description="La consolidation de dettes consiste à combiner plusieurs dettes en une seule. Utilisez cette calculatrice pour calculer le montant de vos nouvelles mensualités et le délai de remboursement."
      icon={<CreditCard className="w-8 h-8 text-primary" />}
      seoTitle="Calculatrice de consolidation de dettes | Finivo"
      seoDescription="Calculez combien vous pouvez économiser en consolidant vos dettes. Comparez vos paiements actuels avec un prêt de consolidation."
      seoKeywords="consolidation dettes, remboursement, carte de crédit, prêt, calculatrice, intérêts"
      url="https://finivo.ca/calculateurs/consolidation-dettes"
      relatedCategory="dettes"
      featuredCardType="transfer"
    >
      <div className="space-y-8">
        {/* Formulaire dettes */}
        <Card>
          <CardHeader>
            <CardTitle>Étape 1 : Renseignements concernant vos dettes</CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <div className="flex items-center gap-2 mb-6">
                <TabsList>
                  {dettes.map((dette) => (
                    <TabsTrigger key={dette.id} value={dette.id}>
                      Dette {dette.id}
                    </TabsTrigger>
                  ))}
                </TabsList>
                <Button variant="outline" size="sm" onClick={ajouterDette}>
                  <Plus className="w-4 h-4 mr-1" />
                  Ajouter
                </Button>
              </div>

              {dettes.map((dette) => (
                <TabsContent key={dette.id} value={dette.id} className="space-y-6">
                  <div className="flex justify-between items-start">
                    <div className="space-y-3 flex-1">
                      <Label>Nom de la dette</Label>
                      <Input
                        value={dette.nom}
                        onChange={(e) => updateDette(dette.id, 'nom', e.target.value)}
                        className="max-w-xs"
                      />
                    </div>
                    {dettes.length > 1 && (
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        onClick={() => supprimerDette(dette.id)}
                        className="text-destructive hover:text-destructive"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    )}
                  </div>

                  <div className="space-y-3">
                    <Label>Montant que vous devez</Label>
                    <div className="flex items-center gap-3">
                      <Input
                        type="number"
                        value={dette.montant}
                        onChange={(e) => updateDette(dette.id, 'montant', Number(e.target.value))}
                        className="w-32"
                      />
                      <span className="text-muted-foreground">$</span>
                    </div>
                    <Slider
                      value={[dette.montant]}
                      onValueChange={(v) => updateDette(dette.id, 'montant', v[0])}
                      min={0}
                      max={100000}
                      step={100}
                    />
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>0 $</span>
                      <span>100 000 $</span>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <Label>Taux d'intérêt annuel</Label>
                    <div className="flex items-center gap-3">
                      <Input
                        type="number"
                        step="0.01"
                        value={dette.tauxInteret}
                        onChange={(e) => updateDette(dette.id, 'tauxInteret', Number(e.target.value))}
                        className="w-24"
                      />
                      <span className="text-muted-foreground">%</span>
                    </div>
                    <Slider
                      value={[dette.tauxInteret]}
                      onValueChange={(v) => updateDette(dette.id, 'tauxInteret', v[0])}
                      min={0}
                      max={30}
                      step={0.1}
                    />
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>0%</span>
                      <span>30%</span>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <Label>Paiement mensuel</Label>
                    <div className="flex items-center gap-3">
                      <Input
                        type="number"
                        value={dette.paiementMensuel}
                        onChange={(e) => updateDette(dette.id, 'paiementMensuel', Number(e.target.value))}
                        className="w-32"
                      />
                      <span className="text-muted-foreground">$</span>
                    </div>
                    <Slider
                      value={[dette.paiementMensuel]}
                      onValueChange={(v) => updateDette(dette.id, 'paiementMensuel', v[0])}
                      min={1}
                      max={5000}
                      step={10}
                    />
                    <p className="text-xs text-muted-foreground">Entrez un minimum de 1 $</p>
                  </div>
                </TabsContent>
              ))}
            </Tabs>
          </CardContent>
        </Card>

        {/* Résumé */}
        <Card>
          <CardHeader>
            <CardTitle>Résumé de vos dettes actuelles</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-6">
              Selon votre plan actuel, votre dette cumulée est de {formatMontant(resultats.totalDette)} et vous serez 
              quitte de dettes dans {resultats.moisRemboursement === -1 ? '∞' : resultats.moisRemboursement} mois 
              lorsque votre paiement mensuel sera de {formatMontant(resultats.totalPaiementMensuel)}.
            </p>

            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-secondary rounded-lg p-4">
                <p className="text-sm text-muted-foreground">Total de la dette en cours :</p>
                <p className="text-3xl font-bold text-primary">{formatMontant(resultats.totalDette)}</p>
              </div>
              <div className="bg-secondary rounded-lg p-4">
                <p className="text-sm text-muted-foreground">Paiement mensuel</p>
                <p className="text-3xl font-bold text-primary">{formatMontant(resultats.totalPaiementMensuel)}</p>
              </div>
              <div className="bg-secondary rounded-lg p-4">
                <p className="text-sm text-muted-foreground">Vous serez quitte de dettes dans :</p>
                <p className="text-3xl font-bold text-primary">
                  {resultats.moisRemboursement === -1 ? '∞' : resultats.moisRemboursement} mois
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Graphiques */}
        {resultats.donneesBar.length > 0 && (
          <div className="grid lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Répartition de vos dettes</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={resultats.donneesPie}
                        dataKey="value"
                        nameKey="name"
                        cx="50%"
                        cy="50%"
                        outerRadius={80}
                        label={({ name, percent }) => `${name} (${(percent * 100).toFixed(0)}%)`}
                      >
                        {resultats.donneesPie.map((_, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip formatter={(value: number) => formatMontant(value)} />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Principal vs Intérêts</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={resultats.donneesBar}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="nom" />
                      <YAxis tickFormatter={(v) => `${(v / 1000).toFixed(0)}k`} />
                      <Tooltip formatter={(value: number) => formatMontant(value)} />
                      <Legend />
                      <Bar dataKey="principal" name="Principal" fill="hsl(var(--primary))" />
                      <Bar dataKey="interets" name="Intérêts" fill="hsl(var(--destructive))" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Intérêts totaux */}
        <Card className="bg-destructive/10 border-destructive">
          <CardContent className="pt-6">
            <div className="text-center">
              <p className="text-muted-foreground">Total des intérêts que vous paierez</p>
              <p className="text-4xl font-bold text-destructive">{formatMontant(resultats.totalInterets)}</p>
              <p className="text-sm text-muted-foreground mt-2">
                Considérez une carte de transfert de solde pour économiser sur les intérêts
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </CalculatorLayout>
  );
};

export default ConsolidationDettes;
