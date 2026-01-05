import { useState, useRef } from 'react';
import { CalculatorLayout } from '@/components/calculators/CalculatorLayout';
import { CalculatorFAQ } from '@/components/calculators/CalculatorFAQ';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Wallet, Printer, FileSpreadsheet, TrendingUp, TrendingDown, DollarSign, AlertTriangle, CheckCircle } from 'lucide-react';
import * as XLSX from 'xlsx';

interface BudgetItem {
  id: string;
  label: string;
  value: number;
}

interface BudgetSection {
  title: string;
  items: BudgetItem[];
}

const Budget = () => {
  const printRef = useRef<HTMLDivElement>(null);

  // Revenus mensuels
  const [revenus, setRevenus] = useState<BudgetItem[]>([
    { id: 'salaire_net', label: 'Salaire net', value: 0 },
    { id: 'placements', label: 'Placements (intérêts, dividendes)', value: 0 },
    { id: 'pension_alimentaire', label: 'Pension alimentaire reçue', value: 0 },
    { id: 'prestations', label: 'Prestations gouvernementales', value: 0 },
    { id: 'rentes', label: 'Rentes', value: 0 },
    { id: 'autres_revenus', label: 'Autres revenus (locatif, pourboires, etc.)', value: 0 },
  ]);

  // Dépenses fixes mensuelles
  const [depensesFixes, setDepensesFixes] = useState<BudgetItem[]>([
    { id: 'loyer', label: 'Loyer / Hypothèque', value: 0 },
    { id: 'electricite', label: 'Électricité / Chauffage', value: 0 },
    { id: 'cable', label: 'Câble / Canaux spécialisés', value: 0 },
    { id: 'telephone', label: 'Téléphone / Internet / Cellulaire', value: 0 },
    { id: 'taxes', label: 'Taxes municipales, scolaires, etc.', value: 0 },
    { id: 'assurance_vie', label: 'Assurance vie / Invalidité', value: 0 },
    { id: 'assurance_habitation', label: 'Assurance habitation', value: 0 },
    { id: 'assurance_auto', label: 'Assurance automobile / Immatriculation / Permis', value: 0 },
    { id: 'emprunt_auto', label: 'Emprunt automobile', value: 0 },
    { id: 'emprunt_carte', label: 'Emprunt (cartes de crédit)', value: 0 },
    { id: 'emprunt_marge', label: 'Emprunt (marge de crédit)', value: 0 },
    { id: 'emprunts_autres', label: 'Emprunts autres', value: 0 },
    { id: 'garderie', label: 'Garderie', value: 0 },
    { id: 'frais_bancaires', label: 'Frais de services bancaires', value: 0 },
    { id: 'epargne', label: 'Épargne (REER, CELI, CELIAPP, etc.)', value: 0 },
    { id: 'autres_fixes', label: 'Autres (pension versée, etc.)', value: 0 },
  ]);

  // Dépenses variables mensuelles
  const [depensesVariables, setDepensesVariables] = useState<BudgetItem[]>([
    { id: 'alimentation_epicerie', label: 'Alimentation (épicerie)', value: 0 },
    { id: 'alimentation_depanneur', label: 'Alimentation (dépanneur)', value: 0 },
    { id: 'alimentation_restaurant', label: 'Alimentation (restaurant / livraison)', value: 0 },
    { id: 'alimentation_travail', label: 'Alimentation (repas école / travail)', value: 0 },
    { id: 'tabac', label: 'Tabac / Alcool / Cannabis', value: 0 },
    { id: 'vetements', label: 'Vêtements, accessoires et chaussures', value: 0 },
    { id: 'transport', label: 'Transport en commun / Taxi / Covoiturage', value: 0 },
    { id: 'essence', label: 'Essence et entretien auto', value: 0 },
    { id: 'sante', label: 'Santé / Beauté / Hygiène', value: 0 },
    { id: 'loisirs', label: 'Loisirs et sorties', value: 0 },
    { id: 'animaux', label: 'Achat et soins des animaux', value: 0 },
    { id: 'maison', label: 'Maison (entretien / articles divers)', value: 0 },
    { id: 'abonnements', label: 'Abonnements (streaming, magazines, etc.)', value: 0 },
    { id: 'sports', label: 'Sports / Gym / Clubs', value: 0 },
    { id: 'argent_poche', label: 'Argent de poche / Loterie', value: 0 },
    { id: 'cadeaux', label: 'Cadeaux / Dons', value: 0 },
    { id: 'vacances', label: 'Vacances / Voyages', value: 0 },
    { id: 'autres_variables', label: 'Autres dépenses', value: 0 },
  ]);

  const updateItem = (
    items: BudgetItem[],
    setItems: React.Dispatch<React.SetStateAction<BudgetItem[]>>,
    id: string,
    value: number
  ) => {
    setItems(items.map(item => item.id === id ? { ...item, value } : item));
  };

  const totalRevenus = revenus.reduce((sum, item) => sum + item.value, 0);
  const totalDepensesFixes = depensesFixes.reduce((sum, item) => sum + item.value, 0);
  const totalDepensesVariables = depensesVariables.reduce((sum, item) => sum + item.value, 0);
  const totalDepenses = totalDepensesFixes + totalDepensesVariables;
  const solde = totalRevenus - totalDepenses;

  const handlePrint = () => {
    window.print();
  };

  const handleExportExcel = () => {
    const data: any[] = [];
    
    // En-tête
    data.push(['CALCULATEUR DE BUDGET MENSUEL - FINIVO']);
    data.push(['Date:', new Date().toLocaleDateString('fr-CA')]);
    data.push([]);

    // Revenus
    data.push(['REVENUS MENSUELS']);
    revenus.forEach(item => {
      if (item.value > 0) {
        data.push([item.label, item.value]);
      }
    });
    data.push(['Total des revenus', totalRevenus]);
    data.push([]);

    // Dépenses fixes
    data.push(['DÉPENSES FIXES MENSUELLES']);
    depensesFixes.forEach(item => {
      if (item.value > 0) {
        data.push([item.label, item.value]);
      }
    });
    data.push(['Total des dépenses fixes', totalDepensesFixes]);
    data.push([]);

    // Dépenses variables
    data.push(['DÉPENSES VARIABLES MENSUELLES']);
    depensesVariables.forEach(item => {
      if (item.value > 0) {
        data.push([item.label, item.value]);
      }
    });
    data.push(['Total des dépenses variables', totalDepensesVariables]);
    data.push([]);

    // Résumé
    data.push(['RÉSUMÉ']);
    data.push(['Total des revenus', totalRevenus]);
    data.push(['Total des dépenses', totalDepenses]);
    data.push(['Solde mensuel', solde]);

    const ws = XLSX.utils.aoa_to_sheet(data);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Budget');
    XLSX.writeFile(wb, `budget-mensuel-finivo-${new Date().toISOString().split('T')[0]}.xlsx`);
  };

  const handleReset = () => {
    setRevenus(revenus.map(item => ({ ...item, value: 0 })));
    setDepensesFixes(depensesFixes.map(item => ({ ...item, value: 0 })));
    setDepensesVariables(depensesVariables.map(item => ({ ...item, value: 0 })));
  };

  const BudgetInputSection = ({ 
    title, 
    items, 
    setItems, 
    icon 
  }: { 
    title: string; 
    items: BudgetItem[]; 
    setItems: React.Dispatch<React.SetStateAction<BudgetItem[]>>;
    icon: React.ReactNode;
  }) => (
    <Card className="print:shadow-none print:border">
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center gap-3 text-lg">
          {icon}
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {items.map(item => (
          <div key={item.id} className="flex items-center gap-3">
            <label htmlFor={item.id} className="flex-1 text-sm text-muted-foreground">
              {item.label}
            </label>
            <div className="relative w-32">
              <Input
                id={item.id}
                type="number"
                min="0"
                step="0.01"
                value={item.value || ''}
                onChange={(e) => updateItem(items, setItems, item.id, parseFloat(e.target.value) || 0)}
                className="pr-8 text-right"
                placeholder="0"
              />
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground text-sm">$</span>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );

  const faqItems = [
    {
      question: "Comment utiliser ce calculateur de budget?",
      answer: "Entrez vos revenus mensuels nets dans la première section, puis vos dépenses fixes (loyer, assurances, etc.) et variables (épicerie, loisirs, etc.). Le calculateur affichera automatiquement votre solde mensuel."
    },
    {
      question: "Quelle est la différence entre dépenses fixes et variables?",
      answer: "Les dépenses fixes sont des montants récurrents qui ne changent pas d'un mois à l'autre (loyer, assurances, abonnements). Les dépenses variables fluctuent selon vos habitudes (épicerie, essence, sorties)."
    },
    {
      question: "Comment exporter mon budget en Excel?",
      answer: "Cliquez sur le bouton 'Exporter Excel' pour télécharger votre budget au format .xlsx. Ce fichier peut être ouvert avec Microsoft Excel, Google Sheets ou LibreOffice Calc."
    },
    {
      question: "Comment améliorer mon solde mensuel?",
      answer: "Analysez vos dépenses variables pour identifier les postes où vous pouvez réduire. Établissez des objectifs d'épargne et automatisez vos virements. Considérez aussi d'augmenter vos revenus avec un travail d'appoint."
    },
    {
      question: "Dois-je inclure mes économies comme dépense?",
      answer: "Oui! L'épargne (REER, CELI, CELIAPP) devrait être traitée comme une dépense fixe pour vous assurer de la prioriser. Le principe 'payez-vous en premier' est une excellente habitude financière."
    }
  ];

  return (
    <CalculatorLayout
      title="Calculateur de budget mensuel"
      description="Planifiez votre budget mensuel en détaillant vos revenus et dépenses. Imprimez ou exportez en Excel pour suivre votre situation financière."
      icon={<Wallet className="w-8 h-8 text-primary" />}
      seoTitle="Calculateur de Budget Mensuel Gratuit | Planifier ses finances | Finivo"
      seoDescription="Calculez votre budget mensuel gratuitement. Entrez vos revenus et dépenses, visualisez votre solde, imprimez ou exportez en Excel. Outil complet pour gérer vos finances personnelles au Québec."
      seoKeywords="calculateur budget, budget mensuel, planification financière, gestion budget, finances personnelles, budget quebec, calculateur dépenses"
      url="https://finivo.ca/calculateurs/budget"
      relatedCategory="epargne"
      featuredCardType="cashback"
    >
      <div ref={printRef} className="space-y-6">
        {/* Action Buttons */}
        <div className="flex flex-wrap gap-3 justify-end print:hidden">
          <Button variant="outline" onClick={handleReset}>
            Réinitialiser
          </Button>
          <Button variant="outline" onClick={handlePrint} className="gap-2">
            <Printer className="w-4 h-4" />
            Imprimer
          </Button>
          <Button onClick={handleExportExcel} className="gap-2">
            <FileSpreadsheet className="w-4 h-4" />
            Exporter Excel
          </Button>
        </div>

        {/* Revenus */}
        <BudgetInputSection
          title="Revenus mensuels"
          items={revenus}
          setItems={setRevenus}
          icon={<TrendingUp className="w-5 h-5 text-success" />}
        />

        {/* Dépenses fixes */}
        <BudgetInputSection
          title="Dépenses fixes mensuelles"
          items={depensesFixes}
          setItems={setDepensesFixes}
          icon={<DollarSign className="w-5 h-5 text-warning" />}
        />

        {/* Dépenses variables */}
        <BudgetInputSection
          title="Dépenses variables mensuelles"
          items={depensesVariables}
          setItems={setDepensesVariables}
          icon={<TrendingDown className="w-5 h-5 text-destructive" />}
        />

        {/* Résumé */}
        <Card className={`border-2 ${solde >= 0 ? 'border-success/50 bg-success/5' : 'border-destructive/50 bg-destructive/5'} print:border print:bg-transparent`}>
          <CardHeader className="pb-4">
            <CardTitle className="flex items-center gap-3 text-xl">
              {solde >= 0 ? (
                <CheckCircle className="w-6 h-6 text-success" />
              ) : (
                <AlertTriangle className="w-6 h-6 text-destructive" />
              )}
              Résumé du budget
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-3">
                <div className="flex justify-between items-center py-2 border-b">
                  <span className="text-muted-foreground">Total des revenus</span>
                  <span className="font-semibold text-success">{totalRevenus.toLocaleString('fr-CA', { style: 'currency', currency: 'CAD' })}</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b">
                  <span className="text-muted-foreground">Dépenses fixes</span>
                  <span className="font-medium text-foreground">{totalDepensesFixes.toLocaleString('fr-CA', { style: 'currency', currency: 'CAD' })}</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b">
                  <span className="text-muted-foreground">Dépenses variables</span>
                  <span className="font-medium text-foreground">{totalDepensesVariables.toLocaleString('fr-CA', { style: 'currency', currency: 'CAD' })}</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b">
                  <span className="text-muted-foreground">Total des dépenses</span>
                  <span className="font-semibold text-destructive">{totalDepenses.toLocaleString('fr-CA', { style: 'currency', currency: 'CAD' })}</span>
                </div>
              </div>
              <div className="flex flex-col items-center justify-center p-6 rounded-xl bg-background">
                <span className="text-sm text-muted-foreground mb-2">Solde mensuel</span>
                <span className={`text-3xl font-bold ${solde >= 0 ? 'text-success' : 'text-destructive'}`}>
                  {solde.toLocaleString('fr-CA', { style: 'currency', currency: 'CAD' })}
                </span>
                <span className="text-xs text-muted-foreground mt-2">
                  {solde >= 0 ? 'Félicitations! Votre budget est équilibré.' : 'Attention! Vos dépenses dépassent vos revenus.'}
                </span>
              </div>
            </div>

            {/* Conseils */}
            <div className="mt-6 p-4 rounded-lg bg-muted/50 print:bg-transparent print:border">
              <h4 className="font-semibold mb-2">💡 Conseils</h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Visez à épargner au moins 10-20% de vos revenus</li>
                <li>• Les dépenses de logement ne devraient pas dépasser 30% de vos revenus</li>
                <li>• Constituez un fonds d'urgence de 3 à 6 mois de dépenses</li>
                <li>• Révisez votre budget chaque mois pour l'ajuster</li>
              </ul>
            </div>
          </CardContent>
        </Card>

        {/* Print Footer */}
        <div className="hidden print:block text-center text-sm text-muted-foreground mt-8 pt-4 border-t">
          <p>Généré par Finivo.ca - {new Date().toLocaleDateString('fr-CA')}</p>
        </div>
      </div>

      {/* FAQ */}
      <div className="mt-12">
        <CalculatorFAQ items={faqItems} />
      </div>

      {/* Print Styles */}
      <style>{`
        @media print {
          body * {
            visibility: hidden;
          }
          #print-content, #print-content * {
            visibility: visible;
          }
          .print\\:hidden {
            display: none !important;
          }
          .print\\:shadow-none {
            box-shadow: none !important;
          }
        }
      `}</style>
    </CalculatorLayout>
  );
};

export default Budget;
