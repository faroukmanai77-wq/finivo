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
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';

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

// Montant personnel de base fédéral 2025
const MONTANT_PERSONNEL_FEDERAL = 16129;

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
  SK: [
    { min: 0, max: 53463, taux: 0.105 },
    { min: 53463, max: 152750, taux: 0.125 },
    { min: 152750, max: Infinity, taux: 0.145 },
  ],
  MB: [
    { min: 0, max: 47564, taux: 0.108 },
    { min: 47564, max: 101200, taux: 0.1275 },
    { min: 101200, max: Infinity, taux: 0.174 },
  ],
  NB: [
    { min: 0, max: 49958, taux: 0.094 },
    { min: 49958, max: 99916, taux: 0.14 },
    { min: 99916, max: 185064, taux: 0.16 },
    { min: 185064, max: Infinity, taux: 0.195 },
  ],
  NS: [
    { min: 0, max: 29590, taux: 0.0879 },
    { min: 29590, max: 59180, taux: 0.1495 },
    { min: 59180, max: 93000, taux: 0.1667 },
    { min: 93000, max: 150000, taux: 0.175 },
    { min: 150000, max: Infinity, taux: 0.21 },
  ],
  PE: [
    { min: 0, max: 32656, taux: 0.098 },
    { min: 32656, max: 64313, taux: 0.138 },
    { min: 64313, max: 105000, taux: 0.167 },
    { min: 105000, max: 140000, taux: 0.1837 },
    { min: 140000, max: Infinity, taux: 0.1887 },
  ],
  NL: [
    { min: 0, max: 44192, taux: 0.087 },
    { min: 44192, max: 88382, taux: 0.145 },
    { min: 88382, max: 157792, taux: 0.158 },
    { min: 157792, max: 220910, taux: 0.178 },
    { min: 220910, max: 282214, taux: 0.198 },
    { min: 282214, max: 564429, taux: 0.208 },
    { min: 564429, max: 1129858, taux: 0.213 },
    { min: 1129858, max: Infinity, taux: 0.218 },
  ],
  YT: [
    { min: 0, max: 57375, taux: 0.064 },
    { min: 57375, max: 114750, taux: 0.09 },
    { min: 114750, max: 177882, taux: 0.109 },
    { min: 177882, max: 500000, taux: 0.128 },
    { min: 500000, max: Infinity, taux: 0.15 },
  ],
  NT: [
    { min: 0, max: 50597, taux: 0.059 },
    { min: 50597, max: 101198, taux: 0.086 },
    { min: 101198, max: 164525, taux: 0.122 },
    { min: 164525, max: Infinity, taux: 0.1405 },
  ],
  NU: [
    { min: 0, max: 53268, taux: 0.04 },
    { min: 53268, max: 106537, taux: 0.07 },
    { min: 106537, max: 173205, taux: 0.09 },
    { min: 173205, max: Infinity, taux: 0.115 },
  ],
};

// Montants personnels de base provinciaux 2025
const MONTANT_PERSONNEL_PROVINCIAL: Record<string, number> = {
  QC: 18571,
  ON: 12399,
  BC: 12932,
  AB: 22323,
  SK: 18491,
  MB: 15780,
  NB: 13396,
  NS: 8744,
  PE: 14250,
  NL: 10818,
  YT: 16129,
  NT: 17842,
  NU: 18767,
};

const PROVINCES = [
  { code: 'QC', nom: 'Québec' },
  { code: 'ON', nom: 'Ontario' },
  { code: 'BC', nom: 'Colombie-Britannique' },
  { code: 'AB', nom: 'Alberta' },
  { code: 'SK', nom: 'Saskatchewan' },
  { code: 'MB', nom: 'Manitoba' },
  { code: 'NB', nom: 'Nouveau-Brunswick' },
  { code: 'NS', nom: 'Nouvelle-Écosse' },
  { code: 'PE', nom: 'Île-du-Prince-Édouard' },
  { code: 'NL', nom: 'Terre-Neuve-et-Labrador' },
  { code: 'YT', nom: 'Yukon' },
  { code: 'NT', nom: 'Territoires du Nord-Ouest' },
  { code: 'NU', nom: 'Nunavut' },
];

// Constantes pour les cotisations sociales 2025
const COTISATIONS_2025 = {
  // RRQ/QPP 2025
  RRQ_MAX_PENSIONABLE: 71300,
  RRQ_EXEMPTION: 3500,
  RRQ_TAUX_EMPLOYE: 0.0640, // 6.40%
  RRQ_TAUX_AUTONOME: 0.1280, // 12.80% (employé + employeur)
  
  // RRQ2 (bonification) 2025
  RRQ2_MAX: 81200,
  RRQ2_TAUX_EMPLOYE: 0.04, // 4%
  RRQ2_TAUX_AUTONOME: 0.08, // 8%
  
  // CPP (hors Québec)
  CPP_MAX_PENSIONABLE: 71300,
  CPP_EXEMPTION: 3500,
  CPP_TAUX_EMPLOYE: 0.0595, // 5.95%
  CPP_TAUX_AUTONOME: 0.1190, // 11.90%
  
  // CPP2 2025
  CPP2_MAX: 81200,
  CPP2_TAUX_EMPLOYE: 0.04,
  CPP2_TAUX_AUTONOME: 0.08,
  
  // RQAP (Québec seulement) 2025
  RQAP_MAX: 98000,
  RQAP_TAUX_EMPLOYE: 0.00494,
  RQAP_TAUX_AUTONOME: 0.00878,
  
  // AE 2025
  AE_MAX: 65700,
  AE_TAUX_EMPLOYE: 0.0132, // 1.32%
  AE_TAUX_EMPLOYE_QC: 0.0104, // 1.04% pour Québec (réduction)
  AE_TAUX_AUTONOME: 0, // Les travailleurs autonomes ne paient pas l'AE obligatoirement
};

const ImpotCanada = () => {
  const [province, setProvince] = useState('QC');
  const [revenuEmploi, setRevenuEmploi] = useState(75000);
  const [revenuAutonome, setRevenuAutonome] = useState(0);
  const [revenuPlacement, setRevenuPlacement] = useState(0);
  const [cotisationReer, setCotisationReer] = useState(0);
  const [cotisationCeliapp, setCotisationCeliapp] = useState(0);
  const [donsCharite, setDonsCharite] = useState(0);
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
    const isQuebec = province === 'QC';
    const revenuBrut = revenuEmploi + revenuAutonome + revenuPlacement;
    
    // Déductions
    const totalDeductions = cotisationReer + cotisationCeliapp;
    const revenuImposable = Math.max(0, revenuBrut - totalDeductions);
    
    // Calcul impôt fédéral brut
    const impotFederalBrut = calculerImpot(revenuImposable, TRANCHES_FEDERALES);
    
    // Crédit personnel de base fédéral
    const creditPersonnelFederal = MONTANT_PERSONNEL_FEDERAL * 0.15;
    
    // Crédits d'impôt fédéraux
    const creditDons = donsCharite > 0 ? (Math.min(donsCharite, 200) * 0.15 + Math.max(0, donsCharite - 200) * 0.29) : 0;
    const creditInteretsPret = interetsPretEtudiant * 0.15;
    const totalCreditsFederal = creditPersonnelFederal + creditDons + creditInteretsPret;
    
    let impotFederal = Math.max(0, impotFederalBrut - totalCreditsFederal);
    
    // Abattement du Québec (16.5% de réduction sur l'impôt fédéral)
    if (isQuebec) {
      impotFederal = impotFederal * (1 - 0.165);
    }
    
    // Calcul impôt provincial
    const tranchesProvince = TRANCHES_PROVINCIALES[province] || TRANCHES_PROVINCIALES.QC;
    const impotProvincialBrut = calculerImpot(revenuImposable, tranchesProvince);
    
    // Crédit personnel provincial
    const montantPersonnelProv = MONTANT_PERSONNEL_PROVINCIAL[province] || 12000;
    const tauxBaseProvincial = tranchesProvince[0].taux;
    const creditPersonnelProvincial = montantPersonnelProv * tauxBaseProvincial;
    
    const impotProvincial = Math.max(0, impotProvincialBrut - creditPersonnelProvincial);
    
    // Cotisations sociales
    let cotisationRRQ_RPC = 0;
    let cotisationRRQ2_RPC2 = 0;
    let cotisationRQAP = 0;
    let cotisationAE = 0;
    
    // Revenus d'emploi
    if (revenuEmploi > 0) {
      if (isQuebec) {
        // RRQ (base)
        const revenuRRQ = Math.min(Math.max(revenuEmploi - COTISATIONS_2025.RRQ_EXEMPTION, 0), COTISATIONS_2025.RRQ_MAX_PENSIONABLE - COTISATIONS_2025.RRQ_EXEMPTION);
        cotisationRRQ_RPC = revenuRRQ * COTISATIONS_2025.RRQ_TAUX_EMPLOYE;
        
        // RRQ2 (bonification)
        if (revenuEmploi > COTISATIONS_2025.RRQ_MAX_PENSIONABLE) {
          const revenuRRQ2 = Math.min(revenuEmploi, COTISATIONS_2025.RRQ2_MAX) - COTISATIONS_2025.RRQ_MAX_PENSIONABLE;
          cotisationRRQ2_RPC2 = revenuRRQ2 * COTISATIONS_2025.RRQ2_TAUX_EMPLOYE;
        }
        
        // RQAP
        cotisationRQAP = Math.min(revenuEmploi, COTISATIONS_2025.RQAP_MAX) * COTISATIONS_2025.RQAP_TAUX_EMPLOYE;
        
        // AE (taux réduit pour Québec)
        cotisationAE = Math.min(revenuEmploi, COTISATIONS_2025.AE_MAX) * COTISATIONS_2025.AE_TAUX_EMPLOYE_QC;
      } else {
        // CPP
        const revenuCPP = Math.min(Math.max(revenuEmploi - COTISATIONS_2025.CPP_EXEMPTION, 0), COTISATIONS_2025.CPP_MAX_PENSIONABLE - COTISATIONS_2025.CPP_EXEMPTION);
        cotisationRRQ_RPC = revenuCPP * COTISATIONS_2025.CPP_TAUX_EMPLOYE;
        
        // CPP2
        if (revenuEmploi > COTISATIONS_2025.CPP_MAX_PENSIONABLE) {
          const revenuCPP2 = Math.min(revenuEmploi, COTISATIONS_2025.CPP2_MAX) - COTISATIONS_2025.CPP_MAX_PENSIONABLE;
          cotisationRRQ2_RPC2 = revenuCPP2 * COTISATIONS_2025.CPP2_TAUX_EMPLOYE;
        }
        
        // AE
        cotisationAE = Math.min(revenuEmploi, COTISATIONS_2025.AE_MAX) * COTISATIONS_2025.AE_TAUX_EMPLOYE;
      }
    }
    
    // Revenus de travail autonome (double cotisation RRQ/CPP)
    if (revenuAutonome > 0) {
      if (isQuebec) {
        // RRQ (autonome paie les deux parts)
        const revenuRRQ = Math.min(Math.max(revenuAutonome - COTISATIONS_2025.RRQ_EXEMPTION, 0), COTISATIONS_2025.RRQ_MAX_PENSIONABLE - COTISATIONS_2025.RRQ_EXEMPTION);
        cotisationRRQ_RPC += revenuRRQ * COTISATIONS_2025.RRQ_TAUX_AUTONOME;
        
        // RRQ2 autonome
        if (revenuAutonome > COTISATIONS_2025.RRQ_MAX_PENSIONABLE) {
          const revenuRRQ2 = Math.min(revenuAutonome, COTISATIONS_2025.RRQ2_MAX) - COTISATIONS_2025.RRQ_MAX_PENSIONABLE;
          cotisationRRQ2_RPC2 += revenuRRQ2 * COTISATIONS_2025.RRQ2_TAUX_AUTONOME;
        }
        
        // RQAP autonome
        cotisationRQAP += Math.min(revenuAutonome, COTISATIONS_2025.RQAP_MAX) * COTISATIONS_2025.RQAP_TAUX_AUTONOME;
      } else {
        // CPP autonome
        const revenuCPP = Math.min(Math.max(revenuAutonome - COTISATIONS_2025.CPP_EXEMPTION, 0), COTISATIONS_2025.CPP_MAX_PENSIONABLE - COTISATIONS_2025.CPP_EXEMPTION);
        cotisationRRQ_RPC += revenuCPP * COTISATIONS_2025.CPP_TAUX_AUTONOME;
        
        // CPP2 autonome
        if (revenuAutonome > COTISATIONS_2025.CPP_MAX_PENSIONABLE) {
          const revenuCPP2 = Math.min(revenuAutonome, COTISATIONS_2025.CPP2_MAX) - COTISATIONS_2025.CPP_MAX_PENSIONABLE;
          cotisationRRQ2_RPC2 += revenuCPP2 * COTISATIONS_2025.CPP2_TAUX_AUTONOME;
        }
      }
    }
    
    const totalCotisations = cotisationRRQ_RPC + cotisationRRQ2_RPC2 + cotisationRQAP + cotisationAE;
    
    const impotTotal = impotFederal + impotProvincial;
    const totalRetenues = impotTotal + totalCotisations;
    const revenuNet = revenuBrut - totalRetenues;
    
    const tauxEffectif = revenuBrut > 0 ? (impotTotal / revenuBrut) * 100 : 0;
    
    // Trouver le taux marginal
    let tauxMarginalFederal = 0.15;
    for (const tranche of TRANCHES_FEDERALES) {
      if (revenuImposable > tranche.min) {
        tauxMarginalFederal = tranche.taux;
      }
    }
    // Appliquer l'abattement du Québec au taux marginal fédéral
    if (isQuebec) {
      tauxMarginalFederal = tauxMarginalFederal * (1 - 0.165);
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
      cotisationRRQ_RPC: Math.round(cotisationRRQ_RPC + cotisationRRQ2_RPC2),
      cotisationRQAP: Math.round(cotisationRQAP),
      cotisationAE: Math.round(cotisationAE),
      totalCotisations: Math.round(totalCotisations),
      totalRetenues: Math.round(totalRetenues),
      revenuNet: Math.round(revenuNet),
      tauxEffectif: tauxEffectif.toFixed(2),
      tauxMarginal: tauxMarginal.toFixed(2),
      donneesRepartition,
      isQuebec,
    };
  }, [province, revenuEmploi, revenuAutonome, revenuPlacement, cotisationReer, cotisationCeliapp, donsCharite, interetsPretEtudiant]);

  const formatMontant = (montant: number) => {
    return new Intl.NumberFormat('fr-CA', { style: 'currency', currency: 'CAD', maximumFractionDigits: 0 }).format(montant);
  };

  const COLORS = ['hsl(var(--primary))', 'hsl(var(--chart-2))', 'hsl(var(--chart-3))', 'hsl(var(--chart-4))'];

  return (
    <CalculatorLayout
      title="Calculatrice d'impôt sur le revenu du Canada 2026"
      description="Obtenez une estimation rapide de votre revenu après impôt, avec votre remboursement ou votre solde d'impôt à payer."
      icon={<Receipt className="w-8 h-8 text-primary" />}
      seoTitle="Calculatrice d'impôt Canada 2026 - Toutes les provinces | Finivo"
      seoDescription="Calculez votre impôt fédéral et provincial pour toutes les provinces canadiennes en 2026. Estimez votre revenu net, votre taux d'imposition effectif et marginal. Inclut les nouvelles règles fiscales 2026."
      seoKeywords="impôt 2026, calculatrice impôt Canada, Québec, Ontario, Alberta, taux d'imposition, revenu net, déclaration 2026, gain capital"
      url="https://finivo.ca/calculateurs/impot"
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
                <p className="text-xs text-muted-foreground">
                  Les travailleurs autonomes paient les cotisations RRQ/RPC de l'employé et de l'employeur.
                </p>
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
                <Label>Cotisations REER et CELIAPP</Label>
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
                <p className="text-sm opacity-80">Total des retenues</p>
                <p className="text-xl font-semibold">{formatMontant(resultats.totalRetenues)}</p>
              </div>
              <div className="text-center">
                <p className="text-sm opacity-80">Taux d'imposition moyen</p>
                <p className="text-xl font-semibold">{resultats.tauxEffectif} %</p>
              </div>
              <div className="text-center">
                <p className="text-sm opacity-80">Taux d'imposition marginal</p>
                <p className="text-xl font-semibold">{resultats.tauxMarginal} %</p>
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
                  <TableCell>Revenu total</TableCell>
                  <TableCell className="text-right">{formatMontant(resultats.revenuBrut)}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Revenu imposable</TableCell>
                  <TableCell className="text-right">{formatMontant(resultats.revenuImposable)}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>
                    Impôt fédéral
                    {resultats.isQuebec && <span className="text-xs text-muted-foreground ml-1">(après abattement 16,5%)</span>}
                  </TableCell>
                  <TableCell className="text-right">{formatMontant(resultats.impotFederal)}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Impôt provincial ({PROVINCES.find(p => p.code === province)?.nom})</TableCell>
                  <TableCell className="text-right">{formatMontant(resultats.impotProvincial)}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Cotisations {resultats.isQuebec ? 'RRQ' : 'RPC/CPP'}</TableCell>
                  <TableCell className="text-right">{formatMontant(resultats.cotisationRRQ_RPC)}</TableCell>
                </TableRow>
                {resultats.isQuebec && (
                  <TableRow>
                    <TableCell>Cotisations RQAP</TableCell>
                    <TableCell className="text-right">{formatMontant(resultats.cotisationRQAP)}</TableCell>
                  </TableRow>
                )}
                <TableRow>
                  <TableCell>Cotisations AE</TableCell>
                  <TableCell className="text-right">{formatMontant(resultats.cotisationAE)}</TableCell>
                </TableRow>
                <TableRow className="font-bold border-t-2">
                  <TableCell>Total des retenues</TableCell>
                  <TableCell className="text-right">{formatMontant(resultats.totalRetenues)}</TableCell>
                </TableRow>
                <TableRow className="font-bold text-primary">
                  <TableCell>Revenu après impôt</TableCell>
                  <TableCell className="text-right">{formatMontant(resultats.revenuNet)}</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Graphique de répartition */}
        <Card>
          <CardHeader>
            <CardTitle>Répartition de votre revenu</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={resultats.donneesRepartition}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={100}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, value, percent }) => `${name}: ${formatMontant(value)} (${(percent * 100).toFixed(0)}%)`}
                  >
                    {resultats.donneesRepartition.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value: number) => formatMontant(value)} />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <CalculatorFAQ items={faqItems} />
      </div>
    </CalculatorLayout>
  );
};

export default ImpotCanada;
