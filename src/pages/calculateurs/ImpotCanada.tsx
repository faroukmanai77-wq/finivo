import { useState, useMemo } from 'react';
import { Receipt } from 'lucide-react';
import { CalculatorLayout } from '@/components/calculators/CalculatorLayout';
import { CalculatorFAQ } from '@/components/calculators/CalculatorFAQ';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend, PieChart, Pie, Cell } from 'recharts';

const faqItems = [
  {
    question: "Quelle est la différence entre le taux marginal et le taux effectif?",
    answer: "Le taux marginal est le pourcentage d'impôt que vous payez sur votre prochain dollar gagné. Le taux effectif (ou moyen) est le pourcentage total d'impôt que vous payez sur l'ensemble de vos revenus. Votre taux effectif est toujours inférieur à votre taux marginal."
  },
  {
    question: "Comment puis-je réduire mon impôt à payer?",
    answer: "Les principales stratégies incluent : cotiser à votre REER ou CELIAPP (déductions), maximiser vos crédits d'impôt (frais médicaux, dons), fractionner le revenu avec votre conjoint, et planifier le moment de vos revenus et déductions."
  },
  {
    question: "Quand dois-je produire ma déclaration d'impôt?",
    answer: "La date limite est généralement le 30 avril pour les particuliers et le 15 juin pour les travailleurs autonomes (mais les impôts dus doivent être payés avant le 30 avril). Un retard peut entraîner des pénalités et des intérêts."
  },
  {
    question: "Dois-je payer de l'impôt provincial et fédéral?",
    answer: "Oui, au Canada, vous payez à la fois l'impôt fédéral et l'impôt provincial. Le Québec perçoit son propre impôt provincial (vous devez produire deux déclarations), tandis que les autres provinces ont un système intégré avec le fédéral."
  },
  {
    question: "Qu'est-ce que l'abattement du Québec?",
    answer: "Les résidents du Québec reçoivent un abattement de 16,5% sur leur impôt fédéral parce que le Québec administre ses propres programmes sociaux. Cet abattement réduit l'impôt fédéral, mais le Québec a ses propres taux d'imposition provinciaux."
  }
];

// Tranches d'imposition fédérales 2025
const TRANCHES_FEDERALES = [
  { min: 0, max: 57375, taux: 0.15 },
  { min: 57375, max: 114750, taux: 0.205 },
  { min: 114750, max: 177882, taux: 0.26 },
  { min: 177882, max: 253414, taux: 0.29 },
  { min: 253414, max: Infinity, taux: 0.33 },
];

// Tranches d'imposition provinciales 2025
const TRANCHES_PROVINCIALES: Record<string, Array<{min: number; max: number; taux: number}>> = {
  QC: [
    { min: 0, max: 53255, taux: 0.14 },
    { min: 53255, max: 106495, taux: 0.19 },
    { min: 106495, max: 129590, taux: 0.24 },
    { min: 129590, max: Infinity, taux: 0.2575 },
  ],
  ON: [
    { min: 0, max: 52886, taux: 0.0505 },
    { min: 52886, max: 105775, taux: 0.0915 },
    { min: 105775, max: 150000, taux: 0.1116 },
    { min: 150000, max: 220000, taux: 0.1216 },
    { min: 220000, max: Infinity, taux: 0.1316 },
  ],
  BC: [
    { min: 0, max: 47937, taux: 0.0506 },
    { min: 47937, max: 95875, taux: 0.077 },
    { min: 95875, max: 110076, taux: 0.105 },
    { min: 110076, max: 133664, taux: 0.1229 },
    { min: 133664, max: 181232, taux: 0.147 },
    { min: 181232, max: 252752, taux: 0.168 },
    { min: 252752, max: Infinity, taux: 0.205 },
  ],
  AB: [
    { min: 0, max: 148269, taux: 0.10 },
    { min: 148269, max: 177922, taux: 0.12 },
    { min: 177922, max: 237230, taux: 0.13 },
    { min: 237230, max: 355845, taux: 0.14 },
    { min: 355845, max: Infinity, taux: 0.15 },
  ],
};

const PROVINCES = [
  { code: 'QC', nom: 'Québec' },
  { code: 'ON', nom: 'Ontario' },
  { code: 'BC', nom: 'Colombie-Britannique' },
  { code: 'AB', nom: 'Alberta' },
];

const ImpotCanada = () => {
  const [province, setProvince] = useState('QC');
  const [revenuEmploi, setRevenuEmploi] = useState(75000);
  const [revenuAutonome, setRevenuAutonome] = useState(0);
  const [revenuPlacement, setRevenuPlacement] = useState(0);
  const [cotisationReer, setCotisationReer] = useState(0);
  const [cotisationCeliapp, setCotisationCeliapp] = useState(0);
  const [donsCharite, setDonsCharite] = useState(0);
  const [fraisMedicaux, setFraisMedicaux] = useState(0);
  const [fraisGardeEnfants, setFraisGardeEnfants] = useState(0);
  const [interetsPretEtudiant, setInteretsPretEtudiant] = useState(0);

  const calculerImpot = (revenuImposable: number, tranches: Array<{min: number; max: number; taux: number}>) => {
    let impot = 0;
    for (const tranche of tranches) {
      if (revenuImposable > tranche.min) {
        const montantDansTranche = Math.min(revenuImposable, tranche.max) - tranche.min;
        impot += montantDansTranche * tranche.taux;
      }
    }
    return impot;
  };

  const resultats = useMemo(() => {
    const revenuBrut = revenuEmploi + revenuAutonome + revenuPlacement;
    
    // Déductions
    const totalDeductions = cotisationReer + cotisationCeliapp;
    const revenuImposable = Math.max(0, revenuBrut - totalDeductions);
    
    // Calcul impôt fédéral
    const impotFederalBrut = calculerImpot(revenuImposable, TRANCHES_FEDERALES);
    
    // Calcul impôt provincial
    const tranchesProvince = TRANCHES_PROVINCIALES[province] || TRANCHES_PROVINCIALES.QC;
    const impotProvincialBrut = calculerImpot(revenuImposable, tranchesProvince);
    
    // Crédits d'impôt (simplifiés)
    const creditPersonnelFederal = 15705 * 0.15; // Montant personnel de base fédéral
    const creditDons = donsCharite * 0.15; // Simplifié
    const creditInteretsPret = interetsPretEtudiant * 0.15;
    const totalCreditsFederal = creditPersonnelFederal + creditDons + creditInteretsPret;
    
    const impotFederal = Math.max(0, impotFederalBrut - totalCreditsFederal);
    
    // Crédit provincial simplifié
    let creditPersonnelProvincial = 0;
    if (province === 'QC') {
      creditPersonnelProvincial = 18056 * 0.14;
    } else {
      creditPersonnelProvincial = 12000 * 0.05; // Approximation
    }
    
    const impotProvincial = Math.max(0, impotProvincialBrut - creditPersonnelProvincial);
    
    // Cotisations sociales (Québec)
    const cotisationRQAP = province === 'QC' ? Math.min(revenuEmploi, 98000) * 0.00494 : 0;
    const cotisationAE = Math.min(revenuEmploi, 65700) * 0.0132;
    const cotisationRRQ = Math.min(Math.max(revenuEmploi - 3500, 0), 71300) * 0.0640;
    
    const totalCotisations = cotisationRQAP + cotisationAE + cotisationRRQ;
    
    const impotTotal = impotFederal + impotProvincial;
    const revenuNet = revenuBrut - impotTotal - totalCotisations;
    
    const tauxEffectif = revenuBrut > 0 ? (impotTotal / revenuBrut) * 100 : 0;
    
    // Trouver le taux marginal
    let tauxMarginalFederal = 0.15;
    for (const tranche of TRANCHES_FEDERALES) {
      if (revenuImposable > tranche.min) {
        tauxMarginalFederal = tranche.taux;
      }
    }
    
    let tauxMarginalProvincial = tranchesProvince[0].taux;
    for (const tranche of tranchesProvince) {
      if (revenuImposable > tranche.min) {
        tauxMarginalProvincial = tranche.taux;
      }
    }
    
    const tauxMarginal = (tauxMarginalFederal + tauxMarginalProvincial) * 100;

    const donneesRepartition = [
      { name: 'Impôt fédéral', value: Math.round(impotFederal) },
      { name: 'Impôt provincial', value: Math.round(impotProvincial) },
      { name: 'Cotisations sociales', value: Math.round(totalCotisations) },
      { name: 'Revenu net', value: Math.round(revenuNet) },
    ];

    return {
      revenuBrut,
      revenuImposable,
      impotFederal: Math.round(impotFederal),
      impotProvincial: Math.round(impotProvincial),
      impotTotal: Math.round(impotTotal),
      totalCotisations: Math.round(totalCotisations),
      revenuNet: Math.round(revenuNet),
      tauxEffectif: tauxEffectif.toFixed(1),
      tauxMarginal: tauxMarginal.toFixed(1),
      donneesRepartition,
    };
  }, [province, revenuEmploi, revenuAutonome, revenuPlacement, cotisationReer, cotisationCeliapp, donsCharite, fraisMedicaux, fraisGardeEnfants, interetsPretEtudiant]);

  const formatMontant = (montant: number) => {
    return new Intl.NumberFormat('fr-CA', { style: 'currency', currency: 'CAD', maximumFractionDigits: 0 }).format(montant);
  };

  const COLORS = ['hsl(var(--primary))', 'hsl(var(--chart-2))', 'hsl(var(--chart-3))', 'hsl(var(--chart-4))'];

  const tranchesAffichage = province === 'QC' 
    ? TRANCHES_FEDERALES.map((tf, i) => ({
        federal: tf,
        provincial: TRANCHES_PROVINCIALES.QC[i] || { min: 0, max: 0, taux: 0 }
      }))
    : TRANCHES_FEDERALES.map((tf) => ({ federal: tf, provincial: null }));

  return (
    <CalculatorLayout
      title="Calculatrice d'impôt sur le revenu"
      description="Obtenez une estimation rapide de votre revenu après impôt, avec votre remboursement ou votre solde d'impôt à payer pour 2025."
      icon={<Receipt className="w-8 h-8 text-primary" />}
      seoTitle="Calculatrice d'impôt Canada & Québec 2025 | Finivo"
      seoDescription="Calculez votre impôt fédéral et provincial au Canada. Estimez votre revenu net, votre taux d'imposition effectif et marginal pour 2025."
      seoKeywords="impôt, calculatrice, Canada, Québec, taux d'imposition, revenu net, déclaration"
      url="https://finivo.ca/calculateurs/impot-canada"
      relatedCategory="impot"
      featuredCardType="cashback"
    >
      <div className="space-y-8">
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Formulaire */}
          <Card>
            <CardHeader>
              <CardTitle>Vos revenus</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-3">
                <Label>Province</Label>
                <Select value={province} onValueChange={setProvince}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {PROVINCES.map((p) => (
                      <SelectItem key={p.code} value={p.code}>{p.nom}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-3">
                <Label>Revenu d'emploi</Label>
                <div className="flex items-center gap-3">
                  <Input
                    type="number"
                    value={revenuEmploi}
                    onChange={(e) => setRevenuEmploi(Number(e.target.value))}
                    className="w-32"
                  />
                  <span className="text-muted-foreground">$</span>
                </div>
                <Slider
                  value={[revenuEmploi]}
                  onValueChange={(v) => setRevenuEmploi(v[0])}
                  min={0}
                  max={500000}
                  step={1000}
                />
              </div>

              <div className="space-y-3">
                <Label>Revenu de travail autonome</Label>
                <div className="flex items-center gap-3">
                  <Input
                    type="number"
                    value={revenuAutonome}
                    onChange={(e) => setRevenuAutonome(Number(e.target.value))}
                    className="w-32"
                  />
                  <span className="text-muted-foreground">$</span>
                </div>
              </div>

              <div className="space-y-3">
                <Label>Revenus de placements</Label>
                <div className="flex items-center gap-3">
                  <Input
                    type="number"
                    value={revenuPlacement}
                    onChange={(e) => setRevenuPlacement(Number(e.target.value))}
                    className="w-32"
                  />
                  <span className="text-muted-foreground">$</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Déductions et crédits</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-3">
                <Label>Cotisations REER</Label>
                <div className="flex items-center gap-3">
                  <Input
                    type="number"
                    value={cotisationReer}
                    onChange={(e) => setCotisationReer(Number(e.target.value))}
                    className="w-32"
                  />
                  <span className="text-muted-foreground">$</span>
                </div>
              </div>

              <div className="space-y-3">
                <Label>Cotisations CELIAPP</Label>
                <div className="flex items-center gap-3">
                  <Input
                    type="number"
                    value={cotisationCeliapp}
                    onChange={(e) => setCotisationCeliapp(Number(e.target.value))}
                    className="w-32"
                  />
                  <span className="text-muted-foreground">$</span>
                </div>
              </div>

              <div className="space-y-3">
                <Label>Dons de charité</Label>
                <div className="flex items-center gap-3">
                  <Input
                    type="number"
                    value={donsCharite}
                    onChange={(e) => setDonsCharite(Number(e.target.value))}
                    className="w-32"
                  />
                  <span className="text-muted-foreground">$</span>
                </div>
              </div>

              <div className="space-y-3">
                <Label>Intérêts sur prêt étudiant</Label>
                <div className="flex items-center gap-3">
                  <Input
                    type="number"
                    value={interetsPretEtudiant}
                    onChange={(e) => setInteretsPretEtudiant(Number(e.target.value))}
                    className="w-32"
                  />
                  <span className="text-muted-foreground">$</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Résultats */}
        <Card className="bg-primary text-primary-foreground">
          <CardContent className="pt-6">
            <div className="text-center mb-6">
              <p className="text-sm opacity-80">Revenu net estimé</p>
              <p className="text-5xl font-bold mt-2">{formatMontant(resultats.revenuNet)}</p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center">
                <p className="text-sm opacity-80">Revenu brut</p>
                <p className="text-xl font-semibold">{formatMontant(resultats.revenuBrut)}</p>
              </div>
              <div className="text-center">
                <p className="text-sm opacity-80">Impôts totaux</p>
                <p className="text-xl font-semibold">{formatMontant(resultats.impotTotal)}</p>
              </div>
              <div className="text-center">
                <p className="text-sm opacity-80">Taux d'imposition moyen</p>
                <p className="text-xl font-semibold">{resultats.tauxEffectif}%</p>
              </div>
              <div className="text-center">
                <p className="text-sm opacity-80">Taux d'imposition marginal</p>
                <p className="text-xl font-semibold">{resultats.tauxMarginal}%</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Détail des impôts */}
        <Card>
          <CardHeader>
            <CardTitle>Détail de vos impôts</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Description</TableHead>
                  <TableHead className="text-right">Montant</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell>Revenu brut</TableCell>
                  <TableCell className="text-right">{formatMontant(resultats.revenuBrut)}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Revenu imposable</TableCell>
                  <TableCell className="text-right">{formatMontant(resultats.revenuImposable)}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Impôt fédéral</TableCell>
                  <TableCell className="text-right">{formatMontant(resultats.impotFederal)}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Impôt provincial ({PROVINCES.find(p => p.code === province)?.nom})</TableCell>
                  <TableCell className="text-right">{formatMontant(resultats.impotProvincial)}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Cotisations sociales (RRQ, AE, RQAP)</TableCell>
                  <TableCell className="text-right">{formatMontant(resultats.totalCotisations)}</TableCell>
                </TableRow>
                <TableRow className="font-bold">
                  <TableCell>Total des retenues</TableCell>
                  <TableCell className="text-right">{formatMontant(resultats.impotTotal + resultats.totalCotisations)}</TableCell>
                </TableRow>
                <TableRow className="font-bold text-primary">
                  <TableCell>Revenu net</TableCell>
                  <TableCell className="text-right">{formatMontant(resultats.revenuNet)}</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Graphique */}
        <Card>
          <CardHeader>
            <CardTitle>Répartition de votre revenu</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={resultats.donneesRepartition}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    outerRadius={100}
                    label={({ name, percent }) => `${name} (${(percent * 100).toFixed(0)}%)`}
                  >
                    {resultats.donneesRepartition.map((_, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value: number) => formatMontant(value)} />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Tranches d'imposition */}
        <Card>
          <CardHeader>
            <CardTitle>Tranches d'imposition du Canada 2025</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Tranche d'imposition fédérale</TableHead>
                  <TableHead className="text-right">Taux d'imposition fédéraux</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {TRANCHES_FEDERALES.map((tranche, index) => (
                  <TableRow key={index}>
                    <TableCell>
                      {tranche.max === Infinity 
                        ? `Plus de ${formatMontant(tranche.min)}`
                        : `${formatMontant(tranche.min)} à ${formatMontant(tranche.max)}`
                      }
                    </TableCell>
                    <TableCell className="text-right">{(tranche.taux * 100).toFixed(1)}%</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        <CalculatorFAQ items={faqItems} />
      </div>
    </CalculatorLayout>
  );
};

export default ImpotCanada;
