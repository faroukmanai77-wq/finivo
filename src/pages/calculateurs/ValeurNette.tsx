import { useState, useMemo } from 'react';
import { Wallet, Plus, Trash2 } from 'lucide-react';
import { CalculatorLayout } from '@/components/calculators/CalculatorLayout';
import { CalculatorFAQ } from '@/components/calculators/CalculatorFAQ';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';

const faqItems = [
  {
    question: "Qu'est-ce que la valeur nette?",
    answer: "La valeur nette est la différence entre ce que vous possédez (actifs) et ce que vous devez (passifs). C'est un indicateur clé de votre santé financière qui montre votre richesse réelle à un moment donné."
  },
  {
    question: "Quelle devrait être ma valeur nette selon mon âge?",
    answer: "Une règle générale suggère que votre valeur nette devrait être égale à votre âge multiplié par votre revenu annuel brut, divisé par 10. Par exemple, à 40 ans avec un revenu de 80 000 $, visez 320 000 $. Ceci est une approximation et varie selon votre situation."
  },
  {
    question: "Devrais-je inclure ma résidence principale dans mes actifs?",
    answer: "Oui, votre résidence principale est un actif important. Utilisez sa valeur marchande estimée, pas le prix d'achat. N'oubliez pas de soustraire le solde de votre hypothèque dans vos passifs pour refléter votre avoir propre réel."
  },
  {
    question: "Comment puis-je augmenter ma valeur nette?",
    answer: "Augmentez vos actifs (épargne, investissements, remboursement du capital hypothécaire) et réduisez vos passifs (remboursement des dettes, éviter de nouvelles dettes). L'investissement régulier et la réduction des dettes à taux élevé sont les stratégies les plus efficaces."
  },
  {
    question: "À quelle fréquence devrais-je calculer ma valeur nette?",
    answer: "Calculez votre valeur nette au moins une fois par an, idéalement au même moment chaque année pour faciliter la comparaison. Un suivi trimestriel peut vous aider à rester motivé et à ajuster votre stratégie financière."
  }
];

interface LigneFinanciere {
  id: string;
  nom: string;
  montant: number;
}

const ValeurNette = () => {
  // Actifs liquides
  const [compteCheques, setCompteCheques] = useState(5000);
  const [compteEpargne, setCompteEpargne] = useState(15000);
  
  // Placements enregistrés
  const [reer, setReer] = useState(50000);
  const [celi, setCeli] = useState(25000);
  const [celiapp, setCeliapp] = useState(8000);
  
  // Placements non enregistrés
  const [placementsNonEnregistres, setPlacementsNonEnregistres] = useState<LigneFinanciere[]>([
    { id: '1', nom: 'Actions', montant: 10000 },
  ]);
  
  // Biens personnels
  const [residencePrincipale, setResidencePrincipale] = useState(0);
  const [vehicules, setVehicules] = useState<LigneFinanciere[]>([
    { id: '1', nom: 'Voiture', montant: 15000 },
  ]);
  const [autresBiens, setAutresBiens] = useState<LigneFinanciere[]>([]);
  
  // Passifs
  const [hypotheque, setHypotheque] = useState(0);
  const [pretAuto, setPretAuto] = useState(8000);
  const [pretEtudiant, setPretEtudiant] = useState(12000);
  const [cartesCredit, setCartesCredit] = useState(3000);
  const [autresDettes, setAutresDettes] = useState<LigneFinanciere[]>([]);

  const ajouterLigne = (setter: React.Dispatch<React.SetStateAction<LigneFinanciere[]>>, liste: LigneFinanciere[]) => {
    setter([...liste, { id: Date.now().toString(), nom: '', montant: 0 }]);
  };

  const supprimerLigne = (setter: React.Dispatch<React.SetStateAction<LigneFinanciere[]>>, liste: LigneFinanciere[], id: string) => {
    setter(liste.filter(item => item.id !== id));
  };

  const updateLigne = (setter: React.Dispatch<React.SetStateAction<LigneFinanciere[]>>, liste: LigneFinanciere[], id: string, field: 'nom' | 'montant', value: string | number) => {
    setter(liste.map(item => item.id === id ? { ...item, [field]: value } : item));
  };

  const resultats = useMemo(() => {
    const totalLiquide = compteCheques + compteEpargne;
    const totalEnregistres = reer + celi + celiapp;
    const totalNonEnregistres = placementsNonEnregistres.reduce((acc, p) => acc + p.montant, 0);
    const totalVehicules = vehicules.reduce((acc, v) => acc + v.montant, 0);
    const totalAutresBiens = autresBiens.reduce((acc, b) => acc + b.montant, 0);
    const totalBiens = residencePrincipale + totalVehicules + totalAutresBiens;
    
    const totalActifs = totalLiquide + totalEnregistres + totalNonEnregistres + totalBiens;
    
    const totalAutresDettes = autresDettes.reduce((acc, d) => acc + d.montant, 0);
    const totalPassifs = hypotheque + pretAuto + pretEtudiant + cartesCredit + totalAutresDettes;
    
    const valeurNette = totalActifs - totalPassifs;

    const donneesActifs = [
      { name: 'Liquidités', value: totalLiquide },
      { name: 'REER/CELI/CELIAPP', value: totalEnregistres },
      { name: 'Placements non enregistrés', value: totalNonEnregistres },
      { name: 'Biens personnels', value: totalBiens },
    ].filter(d => d.value > 0);

    const donneesPassifs = [
      { name: 'Hypothèque', value: hypotheque },
      { name: 'Prêt auto', value: pretAuto },
      { name: 'Prêt étudiant', value: pretEtudiant },
      { name: 'Cartes de crédit', value: cartesCredit },
      { name: 'Autres dettes', value: totalAutresDettes },
    ].filter(d => d.value > 0);

    return {
      totalLiquide,
      totalEnregistres,
      totalNonEnregistres,
      totalBiens,
      totalActifs,
      totalPassifs,
      valeurNette,
      donneesActifs,
      donneesPassifs,
    };
  }, [compteCheques, compteEpargne, reer, celi, celiapp, placementsNonEnregistres, residencePrincipale, vehicules, autresBiens, hypotheque, pretAuto, pretEtudiant, cartesCredit, autresDettes]);

  const formatMontant = (montant: number) => {
    return new Intl.NumberFormat('fr-CA', { style: 'currency', currency: 'CAD', maximumFractionDigits: 0 }).format(montant);
  };

  const COLORS_ACTIFS = ['hsl(var(--primary))', 'hsl(var(--chart-2))', 'hsl(var(--chart-3))', 'hsl(var(--chart-4))'];
  const COLORS_PASSIFS = ['hsl(var(--destructive))', 'hsl(var(--chart-5))', 'hsl(var(--muted-foreground))', 'hsl(var(--chart-2))', 'hsl(var(--chart-3))'];

  const LigneInput = ({ 
    items, 
    setItems, 
    placeholder 
  }: { 
    items: LigneFinanciere[]; 
    setItems: React.Dispatch<React.SetStateAction<LigneFinanciere[]>>; 
    placeholder: string;
  }) => (
    <div className="space-y-2">
      {items.map((item) => (
        <div key={item.id} className="flex items-center gap-2">
          <Input
            placeholder={placeholder}
            value={item.nom}
            onChange={(e) => updateLigne(setItems, items, item.id, 'nom', e.target.value)}
            className="flex-1"
          />
          <Input
            type="number"
            value={item.montant}
            onChange={(e) => updateLigne(setItems, items, item.id, 'montant', Number(e.target.value))}
            className="w-32"
          />
          <span className="text-muted-foreground">$</span>
          <Button 
            variant="ghost" 
            size="icon"
            onClick={() => supprimerLigne(setItems, items, item.id)}
            className="text-destructive hover:text-destructive"
          >
            <Trash2 className="w-4 h-4" />
          </Button>
        </div>
      ))}
      <Button 
        variant="outline" 
        size="sm" 
        onClick={() => ajouterLigne(setItems, items)}
        className="mt-2"
      >
        <Plus className="w-4 h-4 mr-1" />
        Ajouter
      </Button>
    </div>
  );

  return (
    <CalculatorLayout
      title="Calculatrice de valeur nette"
      description="Calculez votre valeur nette - c'est-à-dire la différence entre ce que vous possédez et ce que vous devez – et comparez vos résultats à ceux d'autres ménages canadiens."
      icon={<Wallet className="w-8 h-8 text-primary" />}
      seoTitle="Calculatrice de valeur nette | Finivo"
      seoDescription="Calculez votre valeur nette en comparant vos actifs et vos passifs. Suivez votre progression financière avec notre calculatrice gratuite."
      seoKeywords="valeur nette, actifs, passifs, patrimoine, calculatrice, finances personnelles"
      url="https://finivo.ca/calculateurs/valeur-nette"
      relatedCategory="investissement"
      featuredCardType="cashback"
    >
      <div className="space-y-8">
        {/* Section explicative */}
        <Card className="bg-muted/50">
          <CardContent className="pt-6">
            <h2 className="text-lg font-semibold mb-3">Comprendre votre valeur nette</h2>
            <div className="space-y-3 text-sm text-muted-foreground">
              <p>
                Votre <strong>valeur nette</strong> représente votre richesse réelle : la différence entre tout ce que vous possédez (actifs) et tout ce que vous devez (passifs). C'est le meilleur indicateur de votre santé financière globale.
              </p>
              <div className="grid md:grid-cols-2 gap-4 mt-4">
                <div>
                  <h3 className="font-medium text-foreground mb-2">Vos actifs incluent</h3>
                  <ul className="list-disc list-inside space-y-1">
                    <li>Comptes bancaires et épargne</li>
                    <li>Placements (REER, CELI, actions)</li>
                    <li>Immobilier (valeur marchande)</li>
                    <li>Véhicules et biens personnels</li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-medium text-foreground mb-2">Vos passifs incluent</h3>
                  <ul className="list-disc list-inside space-y-1">
                    <li>Hypothèque (solde restant)</li>
                    <li>Prêts auto et personnels</li>
                    <li>Soldes de cartes de crédit</li>
                    <li>Prêts étudiants</li>
                  </ul>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Résultat principal */}
        <Card className={`${resultats.valeurNette >= 0 ? 'bg-primary' : 'bg-destructive'} text-primary-foreground`}>
          <CardContent className="pt-6">
            <div className="text-center">
              <p className="text-sm opacity-80">Votre valeur nette</p>
              <p className="text-5xl font-bold mt-2">{formatMontant(resultats.valeurNette)}</p>
              <div className="grid grid-cols-2 gap-8 mt-6 max-w-md mx-auto">
                <div>
                  <p className="text-sm opacity-80">Total des actifs</p>
                  <p className="text-2xl font-semibold">{formatMontant(resultats.totalActifs)}</p>
                </div>
                <div>
                  <p className="text-sm opacity-80">Total des passifs</p>
                  <p className="text-2xl font-semibold">{formatMontant(resultats.totalPassifs)}</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* ACTIFS */}
          <div className="space-y-6">
            <h2 className="text-xl font-bold text-foreground">Vos actifs</h2>
            
            {/* Argent comptant */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Argent comptant et équivalents</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>Compte(s) de chèques</Label>
                  <div className="flex items-center gap-2">
                    <Input
                      type="number"
                      value={compteCheques}
                      onChange={(e) => setCompteCheques(Number(e.target.value))}
                      className="w-32"
                    />
                    <span className="text-muted-foreground">$</span>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Compte(s) d'épargne</Label>
                  <div className="flex items-center gap-2">
                    <Input
                      type="number"
                      value={compteEpargne}
                      onChange={(e) => setCompteEpargne(Number(e.target.value))}
                      className="w-32"
                    />
                    <span className="text-muted-foreground">$</span>
                  </div>
                </div>
                <div className="pt-2 border-t">
                  <p className="text-sm text-muted-foreground">Total : <span className="font-semibold text-foreground">{formatMontant(resultats.totalLiquide)}</span></p>
                </div>
              </CardContent>
            </Card>

            {/* Placements enregistrés */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Placements enregistrés</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>REER</Label>
                  <div className="flex items-center gap-2">
                    <Input
                      type="number"
                      value={reer}
                      onChange={(e) => setReer(Number(e.target.value))}
                      className="w-32"
                    />
                    <span className="text-muted-foreground">$</span>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>CELI</Label>
                  <div className="flex items-center gap-2">
                    <Input
                      type="number"
                      value={celi}
                      onChange={(e) => setCeli(Number(e.target.value))}
                      className="w-32"
                    />
                    <span className="text-muted-foreground">$</span>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>CELIAPP</Label>
                  <div className="flex items-center gap-2">
                    <Input
                      type="number"
                      value={celiapp}
                      onChange={(e) => setCeliapp(Number(e.target.value))}
                      className="w-32"
                    />
                    <span className="text-muted-foreground">$</span>
                  </div>
                </div>
                <div className="pt-2 border-t">
                  <p className="text-sm text-muted-foreground">Total : <span className="font-semibold text-foreground">{formatMontant(resultats.totalEnregistres)}</span></p>
                </div>
              </CardContent>
            </Card>

            {/* Placements non enregistrés */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Placements non enregistrés</CardTitle>
              </CardHeader>
              <CardContent>
                <LigneInput 
                  items={placementsNonEnregistres} 
                  setItems={setPlacementsNonEnregistres} 
                  placeholder="Nom du placement"
                />
                <div className="pt-4 border-t mt-4">
                  <p className="text-sm text-muted-foreground">Total : <span className="font-semibold text-foreground">{formatMontant(resultats.totalNonEnregistres)}</span></p>
                </div>
              </CardContent>
            </Card>

            {/* Biens personnels */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Biens personnels</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>Résidence principale</Label>
                  <div className="flex items-center gap-2">
                    <Input
                      type="number"
                      value={residencePrincipale}
                      onChange={(e) => setResidencePrincipale(Number(e.target.value))}
                      className="w-32"
                    />
                    <span className="text-muted-foreground">$</span>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Véhicule(s)</Label>
                  <LigneInput 
                    items={vehicules} 
                    setItems={setVehicules} 
                    placeholder="Description"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Autres biens</Label>
                  <LigneInput 
                    items={autresBiens} 
                    setItems={setAutresBiens} 
                    placeholder="Description"
                  />
                </div>
                <div className="pt-2 border-t">
                  <p className="text-sm text-muted-foreground">Total : <span className="font-semibold text-foreground">{formatMontant(resultats.totalBiens)}</span></p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* PASSIFS */}
          <div className="space-y-6">
            <h2 className="text-xl font-bold text-foreground">Vos passifs</h2>
            
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Dettes</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>Hypothèque</Label>
                  <div className="flex items-center gap-2">
                    <Input
                      type="number"
                      value={hypotheque}
                      onChange={(e) => setHypotheque(Number(e.target.value))}
                      className="w-32"
                    />
                    <span className="text-muted-foreground">$</span>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Prêt automobile</Label>
                  <div className="flex items-center gap-2">
                    <Input
                      type="number"
                      value={pretAuto}
                      onChange={(e) => setPretAuto(Number(e.target.value))}
                      className="w-32"
                    />
                    <span className="text-muted-foreground">$</span>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Prêt étudiant</Label>
                  <div className="flex items-center gap-2">
                    <Input
                      type="number"
                      value={pretEtudiant}
                      onChange={(e) => setPretEtudiant(Number(e.target.value))}
                      className="w-32"
                    />
                    <span className="text-muted-foreground">$</span>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Cartes de crédit</Label>
                  <div className="flex items-center gap-2">
                    <Input
                      type="number"
                      value={cartesCredit}
                      onChange={(e) => setCartesCredit(Number(e.target.value))}
                      className="w-32"
                    />
                    <span className="text-muted-foreground">$</span>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Autres dettes</Label>
                  <LigneInput 
                    items={autresDettes} 
                    setItems={setAutresDettes} 
                    placeholder="Description"
                  />
                </div>
                <div className="pt-2 border-t">
                  <p className="text-sm text-muted-foreground">Total : <span className="font-semibold text-foreground">{formatMontant(resultats.totalPassifs)}</span></p>
                </div>
              </CardContent>
            </Card>

            {/* Graphiques */}
            {resultats.donneesActifs.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Répartition des actifs</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={resultats.donneesActifs}
                          dataKey="value"
                          nameKey="name"
                          cx="50%"
                          cy="50%"
                          outerRadius={80}
                          label={({ percent }) => `${(percent * 100).toFixed(0)}%`}
                        >
                          {resultats.donneesActifs.map((_, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS_ACTIFS[index % COLORS_ACTIFS.length]} />
                          ))}
                        </Pie>
                        <Tooltip formatter={(value: number) => formatMontant(value)} />
                        <Legend />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            )}

            {resultats.donneesPassifs.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Répartition des passifs</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={resultats.donneesPassifs}
                          dataKey="value"
                          nameKey="name"
                          cx="50%"
                          cy="50%"
                          outerRadius={80}
                          label={({ percent }) => `${(percent * 100).toFixed(0)}%`}
                        >
                          {resultats.donneesPassifs.map((_, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS_PASSIFS[index % COLORS_PASSIFS.length]} />
                          ))}
                        </Pie>
                        <Tooltip formatter={(value: number) => formatMontant(value)} />
                        <Legend />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>

        <CalculatorFAQ items={faqItems} />
      </div>
    </CalculatorLayout>
  );
};

export default ValeurNette;
