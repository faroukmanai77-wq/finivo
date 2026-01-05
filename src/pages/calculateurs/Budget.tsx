import { useState, useRef, useMemo, useCallback } from 'react';
import { CalculatorLayout } from '@/components/calculators/CalculatorLayout';
import { CalculatorFAQ } from '@/components/calculators/CalculatorFAQ';
import { BudgetInputSection } from '@/components/calculators/BudgetInputSection';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Wallet, Printer, FileSpreadsheet, TrendingUp, TrendingDown, DollarSign, AlertTriangle, CheckCircle, PieChart } from 'lucide-react';
import { PieChart as RechartsPieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';
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

  const handleRevenusChange = useCallback((id: string, value: number) => {
    setRevenus(prev => prev.map(item => item.id === id ? { ...item, value } : item));
  }, []);

  const handleDepensesFixesChange = useCallback((id: string, value: number) => {
    setDepensesFixes(prev => prev.map(item => item.id === id ? { ...item, value } : item));
  }, []);

  const handleDepensesVariablesChange = useCallback((id: string, value: number) => {
    setDepensesVariables(prev => prev.map(item => item.id === id ? { ...item, value } : item));
  }, []);

  const totalRevenus = revenus.reduce((sum, item) => sum + item.value, 0);
  const totalDepensesFixes = depensesFixes.reduce((sum, item) => sum + item.value, 0);
  const totalDepensesVariables = depensesVariables.reduce((sum, item) => sum + item.value, 0);
  const totalDepenses = totalDepensesFixes + totalDepensesVariables;
  const solde = totalRevenus - totalDepenses;

  // Données pour le graphique circulaire
  const CHART_COLORS = [
    'hsl(var(--primary))',
    'hsl(var(--accent))',
    'hsl(var(--warning))',
    'hsl(var(--success))',
    'hsl(var(--destructive))',
    'hsl(var(--chart-1))',
    'hsl(var(--chart-2))',
    'hsl(var(--chart-3))',
    'hsl(var(--chart-4))',
    'hsl(var(--chart-5))',
  ];

  const pieChartData = useMemo(() => {
    const categories = [
      { name: 'Logement', value: (depensesFixes.find(d => d.id === 'loyer')?.value || 0) },
      { name: 'Transport', value: 
        (depensesFixes.find(d => d.id === 'emprunt_auto')?.value || 0) +
        (depensesFixes.find(d => d.id === 'assurance_auto')?.value || 0) +
        (depensesVariables.find(d => d.id === 'essence')?.value || 0) +
        (depensesVariables.find(d => d.id === 'transport')?.value || 0)
      },
      { name: 'Alimentation', value: 
        (depensesVariables.find(d => d.id === 'alimentation_epicerie')?.value || 0) +
        (depensesVariables.find(d => d.id === 'alimentation_depanneur')?.value || 0) +
        (depensesVariables.find(d => d.id === 'alimentation_restaurant')?.value || 0) +
        (depensesVariables.find(d => d.id === 'alimentation_travail')?.value || 0)
      },
      { name: 'Assurances', value: 
        (depensesFixes.find(d => d.id === 'assurance_vie')?.value || 0) +
        (depensesFixes.find(d => d.id === 'assurance_habitation')?.value || 0)
      },
      { name: 'Services', value: 
        (depensesFixes.find(d => d.id === 'electricite')?.value || 0) +
        (depensesFixes.find(d => d.id === 'cable')?.value || 0) +
        (depensesFixes.find(d => d.id === 'telephone')?.value || 0)
      },
      { name: 'Dettes', value: 
        (depensesFixes.find(d => d.id === 'emprunt_carte')?.value || 0) +
        (depensesFixes.find(d => d.id === 'emprunt_marge')?.value || 0) +
        (depensesFixes.find(d => d.id === 'emprunts_autres')?.value || 0)
      },
      { name: 'Épargne', value: (depensesFixes.find(d => d.id === 'epargne')?.value || 0) },
      { name: 'Loisirs', value: 
        (depensesVariables.find(d => d.id === 'loisirs')?.value || 0) +
        (depensesVariables.find(d => d.id === 'sports')?.value || 0) +
        (depensesVariables.find(d => d.id === 'abonnements')?.value || 0) +
        (depensesVariables.find(d => d.id === 'vacances')?.value || 0)
      },
      { name: 'Autres', value: 
        totalDepenses - 
        (depensesFixes.find(d => d.id === 'loyer')?.value || 0) -
        ((depensesFixes.find(d => d.id === 'emprunt_auto')?.value || 0) +
        (depensesFixes.find(d => d.id === 'assurance_auto')?.value || 0) +
        (depensesVariables.find(d => d.id === 'essence')?.value || 0) +
        (depensesVariables.find(d => d.id === 'transport')?.value || 0)) -
        ((depensesVariables.find(d => d.id === 'alimentation_epicerie')?.value || 0) +
        (depensesVariables.find(d => d.id === 'alimentation_depanneur')?.value || 0) +
        (depensesVariables.find(d => d.id === 'alimentation_restaurant')?.value || 0) +
        (depensesVariables.find(d => d.id === 'alimentation_travail')?.value || 0)) -
        ((depensesFixes.find(d => d.id === 'assurance_vie')?.value || 0) +
        (depensesFixes.find(d => d.id === 'assurance_habitation')?.value || 0)) -
        ((depensesFixes.find(d => d.id === 'electricite')?.value || 0) +
        (depensesFixes.find(d => d.id === 'cable')?.value || 0) +
        (depensesFixes.find(d => d.id === 'telephone')?.value || 0)) -
        ((depensesFixes.find(d => d.id === 'emprunt_carte')?.value || 0) +
        (depensesFixes.find(d => d.id === 'emprunt_marge')?.value || 0) +
        (depensesFixes.find(d => d.id === 'emprunts_autres')?.value || 0)) -
        (depensesFixes.find(d => d.id === 'epargne')?.value || 0) -
        ((depensesVariables.find(d => d.id === 'loisirs')?.value || 0) +
        (depensesVariables.find(d => d.id === 'sports')?.value || 0) +
        (depensesVariables.find(d => d.id === 'abonnements')?.value || 0) +
        (depensesVariables.find(d => d.id === 'vacances')?.value || 0))
      },
    ];
    return categories.filter(cat => cat.value > 0);
  }, [depensesFixes, depensesVariables, totalDepenses]);

  const handlePrint = () => {
    const printContent = `
      <!DOCTYPE html>
      <html>
      <head>
        <title>Budget Mensuel - Finivo</title>
        <style>
          body { font-family: Arial, sans-serif; padding: 20px; color: #333; }
          h1 { color: #1a1a2e; border-bottom: 2px solid #4f46e5; padding-bottom: 10px; }
          h2 { color: #4f46e5; margin-top: 20px; font-size: 16px; }
          table { width: 100%; border-collapse: collapse; margin: 10px 0; }
          th, td { padding: 8px 12px; text-align: left; border-bottom: 1px solid #eee; }
          th { background: #f8f9fa; font-weight: 600; }
          .amount { text-align: right; font-family: monospace; }
          .total-row { background: #f0f0f0; font-weight: bold; }
          .summary { margin-top: 30px; padding: 20px; border: 2px solid ${solde >= 0 ? '#22c55e' : '#ef4444'}; border-radius: 8px; }
          .summary h2 { color: ${solde >= 0 ? '#22c55e' : '#ef4444'}; margin-top: 0; }
          .positive { color: #22c55e; }
          .negative { color: #ef4444; }
          .footer { margin-top: 30px; text-align: center; color: #888; font-size: 12px; }
        </style>
      </head>
      <body>
        <h1>Budget Mensuel - Finivo</h1>
        <p>Date: ${new Date().toLocaleDateString('fr-CA')}</p>
        
        <h2>💰 Revenus mensuels</h2>
        <table>
          <tr><th>Description</th><th class="amount">Montant</th></tr>
          ${revenus.filter(r => r.value > 0).map(r => `<tr><td>${r.label}</td><td class="amount">${r.value.toLocaleString('fr-CA', { style: 'currency', currency: 'CAD' })}</td></tr>`).join('')}
          <tr class="total-row"><td>Total des revenus</td><td class="amount positive">${totalRevenus.toLocaleString('fr-CA', { style: 'currency', currency: 'CAD' })}</td></tr>
        </table>

        <h2>🏠 Dépenses fixes mensuelles</h2>
        <table>
          <tr><th>Description</th><th class="amount">Montant</th></tr>
          ${depensesFixes.filter(d => d.value > 0).map(d => `<tr><td>${d.label}</td><td class="amount">${d.value.toLocaleString('fr-CA', { style: 'currency', currency: 'CAD' })}</td></tr>`).join('')}
          <tr class="total-row"><td>Total des dépenses fixes</td><td class="amount">${totalDepensesFixes.toLocaleString('fr-CA', { style: 'currency', currency: 'CAD' })}</td></tr>
        </table>

        <h2>🛒 Dépenses variables mensuelles</h2>
        <table>
          <tr><th>Description</th><th class="amount">Montant</th></tr>
          ${depensesVariables.filter(d => d.value > 0).map(d => `<tr><td>${d.label}</td><td class="amount">${d.value.toLocaleString('fr-CA', { style: 'currency', currency: 'CAD' })}</td></tr>`).join('')}
          <tr class="total-row"><td>Total des dépenses variables</td><td class="amount">${totalDepensesVariables.toLocaleString('fr-CA', { style: 'currency', currency: 'CAD' })}</td></tr>
        </table>

        <div class="summary">
          <h2>${solde >= 0 ? '✅' : '⚠️'} Résumé du budget</h2>
          <table>
            <tr><td>Total des revenus</td><td class="amount positive">${totalRevenus.toLocaleString('fr-CA', { style: 'currency', currency: 'CAD' })}</td></tr>
            <tr><td>Total des dépenses</td><td class="amount negative">${totalDepenses.toLocaleString('fr-CA', { style: 'currency', currency: 'CAD' })}</td></tr>
            <tr class="total-row"><td>Solde mensuel</td><td class="amount ${solde >= 0 ? 'positive' : 'negative'}">${solde.toLocaleString('fr-CA', { style: 'currency', currency: 'CAD' })}</td></tr>
          </table>
          ${solde >= 0 
            ? '<p style="color: #22c55e;">Félicitations! Votre budget est équilibré.</p>' 
            : '<p style="color: #ef4444;">Attention: Vos dépenses dépassent vos revenus.</p>'}
        </div>

        <div class="footer">
          <p>Généré par Finivo.ca - ${new Date().toLocaleDateString('fr-CA')}</p>
        </div>
      </body>
      </html>
    `;
    
    const printWindow = window.open('', '_blank');
    if (printWindow) {
      printWindow.document.write(printContent);
      printWindow.document.close();
      printWindow.focus();
      setTimeout(() => {
        printWindow.print();
        printWindow.close();
      }, 250);
    }
  };

  const handleExportExcel = () => {
    // Feuille Résumé
    const summaryData: any[][] = [
      ['BUDGET MENSUEL - FINIVO'],
      [''],
      ['Date de création:', new Date().toLocaleDateString('fr-CA')],
      [''],
      ['RÉSUMÉ FINANCIER'],
      ['', 'Montant', '% du revenu'],
      ['Total des revenus', totalRevenus, '100%'],
      ['Dépenses fixes', totalDepensesFixes, totalRevenus > 0 ? `${((totalDepensesFixes / totalRevenus) * 100).toFixed(1)}%` : '0%'],
      ['Dépenses variables', totalDepensesVariables, totalRevenus > 0 ? `${((totalDepensesVariables / totalRevenus) * 100).toFixed(1)}%` : '0%'],
      ['Total des dépenses', totalDepenses, totalRevenus > 0 ? `${((totalDepenses / totalRevenus) * 100).toFixed(1)}%` : '0%'],
      [''],
      ['SOLDE MENSUEL', solde, totalRevenus > 0 ? `${((solde / totalRevenus) * 100).toFixed(1)}%` : '0%'],
      [''],
      ['Statut:', solde >= 0 ? 'Budget équilibré ✓' : 'Déficit budgétaire ⚠'],
    ];

    // Feuille Détails
    const detailsData: any[][] = [
      ['DÉTAILS DU BUDGET MENSUEL'],
      [''],
      ['REVENUS MENSUELS'],
      ['Catégorie', 'Montant'],
    ];
    revenus.forEach(item => {
      detailsData.push([item.label, item.value]);
    });
    detailsData.push(['TOTAL REVENUS', totalRevenus]);
    detailsData.push(['']);
    
    detailsData.push(['DÉPENSES FIXES MENSUELLES']);
    detailsData.push(['Catégorie', 'Montant']);
    depensesFixes.forEach(item => {
      detailsData.push([item.label, item.value]);
    });
    detailsData.push(['TOTAL DÉPENSES FIXES', totalDepensesFixes]);
    detailsData.push(['']);
    
    detailsData.push(['DÉPENSES VARIABLES MENSUELLES']);
    detailsData.push(['Catégorie', 'Montant']);
    depensesVariables.forEach(item => {
      detailsData.push([item.label, item.value]);
    });
    detailsData.push(['TOTAL DÉPENSES VARIABLES', totalDepensesVariables]);

    // Feuille Répartition
    const repartitionData: any[][] = [
      ['RÉPARTITION DES DÉPENSES PAR CATÉGORIE'],
      [''],
      ['Catégorie', 'Montant', '% des dépenses', '% du revenu'],
    ];
    pieChartData.forEach(cat => {
      repartitionData.push([
        cat.name,
        cat.value,
        totalDepenses > 0 ? `${((cat.value / totalDepenses) * 100).toFixed(1)}%` : '0%',
        totalRevenus > 0 ? `${((cat.value / totalRevenus) * 100).toFixed(1)}%` : '0%'
      ]);
    });
    repartitionData.push(['']);
    repartitionData.push(['TOTAL', totalDepenses, '100%', totalRevenus > 0 ? `${((totalDepenses / totalRevenus) * 100).toFixed(1)}%` : '0%']);

    const wb = XLSX.utils.book_new();
    
    // Créer les feuilles avec styles
    const wsSummary = XLSX.utils.aoa_to_sheet(summaryData);
    const wsDetails = XLSX.utils.aoa_to_sheet(detailsData);
    const wsRepartition = XLSX.utils.aoa_to_sheet(repartitionData);
    
    // Définir les largeurs de colonnes
    wsSummary['!cols'] = [{ wch: 25 }, { wch: 15 }, { wch: 15 }];
    wsDetails['!cols'] = [{ wch: 45 }, { wch: 15 }];
    wsRepartition['!cols'] = [{ wch: 20 }, { wch: 15 }, { wch: 15 }, { wch: 15 }];
    
    XLSX.utils.book_append_sheet(wb, wsSummary, 'Résumé');
    XLSX.utils.book_append_sheet(wb, wsDetails, 'Détails');
    XLSX.utils.book_append_sheet(wb, wsRepartition, 'Répartition');
    
    XLSX.writeFile(wb, `budget-mensuel-finivo-${new Date().toISOString().split('T')[0]}.xlsx`);
  };

  const handleReset = () => {
    setRevenus(revenus.map(item => ({ ...item, value: 0 })));
    setDepensesFixes(depensesFixes.map(item => ({ ...item, value: 0 })));
    setDepensesVariables(depensesVariables.map(item => ({ ...item, value: 0 })));
  };


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
          onItemChange={handleRevenusChange}
          icon={<TrendingUp className="w-5 h-5 text-success" />}
        />

        {/* Dépenses fixes */}
        <BudgetInputSection
          title="Dépenses fixes mensuelles"
          items={depensesFixes}
          onItemChange={handleDepensesFixesChange}
          icon={<DollarSign className="w-5 h-5 text-warning" />}
        />

        {/* Dépenses variables */}
        <BudgetInputSection
          title="Dépenses variables mensuelles"
          items={depensesVariables}
          onItemChange={handleDepensesVariablesChange}
          icon={<TrendingDown className="w-5 h-5 text-destructive" />}
        />

        {/* Graphique de répartition */}
        {pieChartData.length > 0 && (
          <Card className="print:shadow-none print:border">
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center gap-3 text-lg">
                <PieChart className="w-5 h-5 text-primary" />
                Répartition des dépenses
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[350px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <RechartsPieChart>
                    <Pie
                      data={pieChartData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percent }) => `${name} (${(percent * 100).toFixed(0)}%)`}
                      outerRadius={120}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {pieChartData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={CHART_COLORS[index % CHART_COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip 
                      formatter={(value: number) => value.toLocaleString('fr-CA', { style: 'currency', currency: 'CAD' })}
                      contentStyle={{ 
                        backgroundColor: 'hsl(var(--card))', 
                        border: '1px solid hsl(var(--border))',
                        borderRadius: '8px'
                      }}
                    />
                    <Legend />
                  </RechartsPieChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        )}

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
