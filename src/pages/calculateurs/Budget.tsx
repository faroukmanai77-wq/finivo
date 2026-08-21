import { useState, useRef, useMemo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { CalculatorLayout } from '@/components/calculators/CalculatorLayout';
import { CalculatorFAQ } from '@/components/calculators/CalculatorFAQ';
import { BudgetInputSection } from '@/components/calculators/BudgetInputSection';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Wallet, Printer, FileSpreadsheet, TrendingUp, TrendingDown, DollarSign, AlertTriangle, CheckCircle, PieChart } from 'lucide-react';
import { PieChart as RechartsPieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import ExcelJS from 'exceljs';
import SmartBudgetingIllustration from '@/assets/illustrations/smart-budgeting.svg';
import { useLanguage } from '@/hooks/useLanguage';

interface BudgetItem {
  id: string;
  label: string;
  value: number;
}

const Budget = () => {
  const { t, i18n } = useTranslation();
  const { currentLanguage } = useLanguage();
  const printRef = useRef<HTMLDivElement>(null);

  // Revenus mensuels
  const [revenus, setRevenus] = useState<BudgetItem[]>([
    { id: 'salaire_net', label: t('calculators.budget.incomeItems.netSalary'), value: 0 },
    { id: 'placements', label: t('calculators.budget.incomeItems.investments'), value: 0 },
    { id: 'pension_alimentaire', label: t('calculators.budget.incomeItems.alimonyReceived'), value: 0 },
    { id: 'prestations', label: t('calculators.budget.incomeItems.benefits'), value: 0 },
    { id: 'rentes', label: t('calculators.budget.incomeItems.pensions'), value: 0 },
    { id: 'autres_revenus', label: t('calculators.budget.incomeItems.otherIncome'), value: 0 },
  ]);

  // Dépenses fixes mensuelles
  const [depensesFixes, setDepensesFixes] = useState<BudgetItem[]>([
    { id: 'loyer', label: t('calculators.budget.fixedExpenseItems.rentMortgage'), value: 0 },
    { id: 'electricite', label: t('calculators.budget.fixedExpenseItems.electricity'), value: 0 },
    { id: 'cable', label: t('calculators.budget.fixedExpenseItems.cable'), value: 0 },
    { id: 'telephone', label: t('calculators.budget.fixedExpenseItems.phone'), value: 0 },
    { id: 'taxes', label: t('calculators.budget.fixedExpenseItems.taxes'), value: 0 },
    { id: 'assurance_vie', label: t('calculators.budget.fixedExpenseItems.lifeInsurance'), value: 0 },
    { id: 'assurance_habitation', label: t('calculators.budget.fixedExpenseItems.homeInsurance'), value: 0 },
    { id: 'assurance_auto', label: t('calculators.budget.fixedExpenseItems.autoInsurance'), value: 0 },
    { id: 'emprunt_auto', label: t('calculators.budget.fixedExpenseItems.autoLoan'), value: 0 },
    { id: 'emprunt_carte', label: t('calculators.budget.fixedExpenseItems.creditCardDebt'), value: 0 },
    { id: 'emprunt_marge', label: t('calculators.budget.fixedExpenseItems.lineOfCredit'), value: 0 },
    { id: 'emprunts_autres', label: t('calculators.budget.fixedExpenseItems.otherLoans'), value: 0 },
    { id: 'garderie', label: t('calculators.budget.fixedExpenseItems.daycare'), value: 0 },
    { id: 'frais_bancaires', label: t('calculators.budget.fixedExpenseItems.bankFees'), value: 0 },
    { id: 'epargne', label: t('calculators.budget.fixedExpenseItems.savings'), value: 0 },
    { id: 'autres_fixes', label: t('calculators.budget.fixedExpenseItems.otherFixed'), value: 0 },
  ]);

  // Dépenses variables mensuelles
  const [depensesVariables, setDepensesVariables] = useState<BudgetItem[]>([
    { id: 'alimentation_epicerie', label: t('calculators.budget.variableExpenseItems.groceries'), value: 0 },
    { id: 'alimentation_depanneur', label: t('calculators.budget.variableExpenseItems.convenience'), value: 0 },
    { id: 'alimentation_restaurant', label: t('calculators.budget.variableExpenseItems.restaurant'), value: 0 },
    { id: 'alimentation_travail', label: t('calculators.budget.variableExpenseItems.workMeals'), value: 0 },
    { id: 'tabac', label: t('calculators.budget.variableExpenseItems.tobacco'), value: 0 },
    { id: 'vetements', label: t('calculators.budget.variableExpenseItems.clothing'), value: 0 },
    { id: 'transport', label: t('calculators.budget.variableExpenseItems.transit'), value: 0 },
    { id: 'essence', label: t('calculators.budget.variableExpenseItems.gas'), value: 0 },
    { id: 'sante', label: t('calculators.budget.variableExpenseItems.health'), value: 0 },
    { id: 'loisirs', label: t('calculators.budget.variableExpenseItems.leisure'), value: 0 },
    { id: 'animaux', label: t('calculators.budget.variableExpenseItems.pets'), value: 0 },
    { id: 'maison', label: t('calculators.budget.variableExpenseItems.home'), value: 0 },
    { id: 'abonnements', label: t('calculators.budget.variableExpenseItems.subscriptions'), value: 0 },
    { id: 'sports', label: t('calculators.budget.variableExpenseItems.sports'), value: 0 },
    { id: 'argent_poche', label: t('calculators.budget.variableExpenseItems.pocketMoney'), value: 0 },
    { id: 'cadeaux', label: t('calculators.budget.variableExpenseItems.gifts'), value: 0 },
    { id: 'vacances', label: t('calculators.budget.variableExpenseItems.vacation'), value: 0 },
    { id: 'autres_variables', label: t('calculators.budget.variableExpenseItems.otherVariable'), value: 0 },
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
  // Note: --chart-1/2/3 share the same HSL values as --primary/--accent/--warning
  // by design, so we list each distinct hue only once to avoid repeated colors
  // across categories before the palette actually needs to cycle.
  const CHART_COLORS = [
    'hsl(var(--chart-1))',
    'hsl(var(--chart-2))',
    'hsl(var(--chart-3))',
    'hsl(var(--chart-4))',
    'hsl(var(--chart-5))',
    'hsl(var(--destructive))',
  ];

  const pieChartData = useMemo(() => {
    const categories = [
      { name: t('calculators.budget.chartCategories.housing'), value: (depensesFixes.find(d => d.id === 'loyer')?.value || 0) },
      { name: t('calculators.budget.chartCategories.transport'), value: 
        (depensesFixes.find(d => d.id === 'emprunt_auto')?.value || 0) +
        (depensesFixes.find(d => d.id === 'assurance_auto')?.value || 0) +
        (depensesVariables.find(d => d.id === 'essence')?.value || 0) +
        (depensesVariables.find(d => d.id === 'transport')?.value || 0)
      },
      { name: t('calculators.budget.chartCategories.food'), value: 
        (depensesVariables.find(d => d.id === 'alimentation_epicerie')?.value || 0) +
        (depensesVariables.find(d => d.id === 'alimentation_depanneur')?.value || 0) +
        (depensesVariables.find(d => d.id === 'alimentation_restaurant')?.value || 0) +
        (depensesVariables.find(d => d.id === 'alimentation_travail')?.value || 0)
      },
      { name: t('calculators.budget.chartCategories.insurance'), value: 
        (depensesFixes.find(d => d.id === 'assurance_vie')?.value || 0) +
        (depensesFixes.find(d => d.id === 'assurance_habitation')?.value || 0)
      },
      { name: t('calculators.budget.chartCategories.services'), value: 
        (depensesFixes.find(d => d.id === 'electricite')?.value || 0) +
        (depensesFixes.find(d => d.id === 'cable')?.value || 0) +
        (depensesFixes.find(d => d.id === 'telephone')?.value || 0)
      },
      { name: t('calculators.budget.chartCategories.debt'), value: 
        (depensesFixes.find(d => d.id === 'emprunt_carte')?.value || 0) +
        (depensesFixes.find(d => d.id === 'emprunt_marge')?.value || 0) +
        (depensesFixes.find(d => d.id === 'emprunts_autres')?.value || 0)
      },
      { name: t('calculators.budget.chartCategories.savings'), value: (depensesFixes.find(d => d.id === 'epargne')?.value || 0) },
      { name: t('calculators.budget.chartCategories.leisure'), value: 
        (depensesVariables.find(d => d.id === 'loisirs')?.value || 0) +
        (depensesVariables.find(d => d.id === 'sports')?.value || 0) +
        (depensesVariables.find(d => d.id === 'abonnements')?.value || 0) +
        (depensesVariables.find(d => d.id === 'vacances')?.value || 0)
      },
      { name: t('calculators.budget.chartCategories.other'), value: 
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
  }, [depensesFixes, depensesVariables, totalDepenses, t]);

  const formatCurrency = (value: number) => {
    return value.toLocaleString(currentLanguage === 'en' ? 'en-CA' : 'fr-CA', { style: 'currency', currency: 'CAD' });
  };

  const handlePrint = () => {
    const printContent = `
      <!DOCTYPE html>
      <html>
      <head>
        <title>${t('calculators.budget.title')} - Finivo</title>
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
        <h1>${t('calculators.budget.title')} - Finivo</h1>
        <p>Date: ${new Date().toLocaleDateString(currentLanguage === 'en' ? 'en-CA' : 'fr-CA')}</p>
        
        <h2>💰 ${t('calculators.budget.sections.income')}</h2>
        <table>
          <tr><th>Description</th><th class="amount">${t('calculators.common.total')}</th></tr>
          ${revenus.filter(r => r.value > 0).map(r => `<tr><td>${r.label}</td><td class="amount">${formatCurrency(r.value)}</td></tr>`).join('')}
          <tr class="total-row"><td>${t('calculators.budget.summary.totalIncome')}</td><td class="amount positive">${formatCurrency(totalRevenus)}</td></tr>
        </table>

        <h2>🏠 ${t('calculators.budget.sections.fixedExpenses')}</h2>
        <table>
          <tr><th>Description</th><th class="amount">${t('calculators.common.total')}</th></tr>
          ${depensesFixes.filter(d => d.value > 0).map(d => `<tr><td>${d.label}</td><td class="amount">${formatCurrency(d.value)}</td></tr>`).join('')}
          <tr class="total-row"><td>${t('calculators.budget.summary.totalFixedExpenses')}</td><td class="amount">${formatCurrency(totalDepensesFixes)}</td></tr>
        </table>

        <h2>🛒 ${t('calculators.budget.sections.variableExpenses')}</h2>
        <table>
          <tr><th>Description</th><th class="amount">${t('calculators.common.total')}</th></tr>
          ${depensesVariables.filter(d => d.value > 0).map(d => `<tr><td>${d.label}</td><td class="amount">${formatCurrency(d.value)}</td></tr>`).join('')}
          <tr class="total-row"><td>${t('calculators.budget.summary.totalVariableExpenses')}</td><td class="amount">${formatCurrency(totalDepensesVariables)}</td></tr>
        </table>

        <div class="summary">
          <h2>${solde >= 0 ? '✅' : '⚠️'} ${t('calculators.budget.summary.title')}</h2>
          <table>
            <tr><td>${t('calculators.budget.summary.totalIncome')}</td><td class="amount positive">${formatCurrency(totalRevenus)}</td></tr>
            <tr><td>${t('calculators.budget.summary.totalExpenses')}</td><td class="amount negative">${formatCurrency(totalDepenses)}</td></tr>
            <tr class="total-row"><td>${t('calculators.budget.summary.monthlyBalance')}</td><td class="amount ${solde >= 0 ? 'positive' : 'negative'}">${formatCurrency(solde)}</td></tr>
          </table>
          ${solde >= 0 
            ? `<p style="color: #22c55e;">${t('calculators.budget.summary.balanced')}</p>` 
            : `<p style="color: #ef4444;">${t('calculators.budget.summary.deficit')}</p>`}
        </div>

        <div class="footer">
          <p>Finivo.ca - ${new Date().toLocaleDateString(currentLanguage === 'en' ? 'en-CA' : 'fr-CA')}</p>
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

  const handleExportExcel = async () => {
    const summaryData: any[][] = [
      [t('calculators.budget.title').toUpperCase() + ' - FINIVO'],
      [''],
      ['Date:', new Date().toLocaleDateString(currentLanguage === 'en' ? 'en-CA' : 'fr-CA')],
      [''],
      [t('calculators.budget.summary.title').toUpperCase()],
      ['', t('calculators.common.total'), '% '],
      [t('calculators.budget.summary.totalIncome'), totalRevenus, '100%'],
      [t('calculators.budget.sections.fixedExpenses'), totalDepensesFixes, totalRevenus > 0 ? `${((totalDepensesFixes / totalRevenus) * 100).toFixed(1)}%` : '0%'],
      [t('calculators.budget.sections.variableExpenses'), totalDepensesVariables, totalRevenus > 0 ? `${((totalDepensesVariables / totalRevenus) * 100).toFixed(1)}%` : '0%'],
      [t('calculators.budget.summary.totalExpenses'), totalDepenses, totalRevenus > 0 ? `${((totalDepenses / totalRevenus) * 100).toFixed(1)}%` : '0%'],
      [''],
      [t('calculators.budget.summary.monthlyBalance').toUpperCase(), solde, totalRevenus > 0 ? `${((solde / totalRevenus) * 100).toFixed(1)}%` : '0%'],
      [''],
      ['Status:', solde >= 0 ? t('calculators.budget.summary.balanced') : t('calculators.budget.summary.deficit')],
    ];

    const detailsData: any[][] = [
      [t('calculators.budget.title').toUpperCase()],
      [''],
      [t('calculators.budget.sections.income').toUpperCase()],
      ['Description', t('calculators.common.total')],
    ];
    revenus.forEach(item => {
      detailsData.push([item.label, item.value]);
    });
    detailsData.push([t('calculators.budget.summary.totalIncome').toUpperCase(), totalRevenus]);
    detailsData.push(['']);
    
    detailsData.push([t('calculators.budget.sections.fixedExpenses').toUpperCase()]);
    detailsData.push(['Description', t('calculators.common.total')]);
    depensesFixes.forEach(item => {
      detailsData.push([item.label, item.value]);
    });
    detailsData.push([t('calculators.budget.summary.totalFixedExpenses').toUpperCase(), totalDepensesFixes]);
    detailsData.push(['']);
    
    detailsData.push([t('calculators.budget.sections.variableExpenses').toUpperCase()]);
    detailsData.push(['Description', t('calculators.common.total')]);
    depensesVariables.forEach(item => {
      detailsData.push([item.label, item.value]);
    });
    detailsData.push([t('calculators.budget.summary.totalVariableExpenses').toUpperCase(), totalDepensesVariables]);

    const repartitionData: any[][] = [
      [t('calculators.budget.summary.chartTitle').toUpperCase()],
      [''],
      ['Category', t('calculators.common.total'), '% Expenses', '% Income'],
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
    repartitionData.push([t('calculators.common.total').toUpperCase(), totalDepenses, '100%', totalRevenus > 0 ? `${((totalDepenses / totalRevenus) * 100).toFixed(1)}%` : '0%']);

    const wb = new ExcelJS.Workbook();

    const addSheet = (name: string, rows: any[][], widths: number[]) => {
      // Excel sheet names cannot exceed 31 chars or contain : \ / ? * [ ]
      const safeName = name.replace(/[:\\/?*[\]]/g, '-').slice(0, 31) || 'Sheet';
      const ws = wb.addWorksheet(safeName);
      ws.columns = widths.map(width => ({ width }));
      rows.forEach(row => ws.addRow(row));
      return ws;
    };

    addSheet(t('calculators.budget.summary.title'), summaryData, [25, 15, 15]);
    addSheet('Details', detailsData, [45, 15]);
    addSheet('Distribution', repartitionData, [20, 15, 15, 15]);

    const buffer = await wb.xlsx.writeBuffer();
    const blob = new Blob([buffer], {
      type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `budget-${new Date().toISOString().split('T')[0]}.xlsx`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const handleReset = () => {
    setRevenus(revenus.map(item => ({ ...item, value: 0 })));
    setDepensesFixes(depensesFixes.map(item => ({ ...item, value: 0 })));
    setDepensesVariables(depensesVariables.map(item => ({ ...item, value: 0 })));
  };

  const faqItems = [
    {
      question: t('calculators.budget.faq.q1'),
      answer: t('calculators.budget.faq.a1')
    },
    {
      question: t('calculators.budget.faq.q2'),
      answer: t('calculators.budget.faq.a2')
    },
    {
      question: t('calculators.budget.faq.q3'),
      answer: t('calculators.budget.faq.a3')
    }
  ];

  return (
    <CalculatorLayout
      title={t('calculators.budget.title')}
      description={t('calculators.budget.description')}
      icon={<Wallet className="w-8 h-8 text-primary" />}
      seoTitle={t('calculators.budget.seo.title')}
      seoDescription={t('calculators.budget.seo.description')}
      seoKeywords={t('calculators.budget.seo.keywords')}
      url="https://finivo.ca/calculateurs/budget"
      relatedCategory="epargne"
      featuredCardType="cashback"
      illustration={SmartBudgetingIllustration}
    >
      <div ref={printRef} className="space-y-6">
        {/* Action Buttons */}
        <div className="flex flex-wrap gap-3 justify-end print:hidden">
          <Button variant="outline" onClick={handleReset}>
            {t('calculators.common.reset')}
          </Button>
          <Button variant="outline" onClick={handlePrint} className="gap-2">
            <Printer className="w-4 h-4" />
            {t('calculators.common.print')}
          </Button>
          <Button onClick={handleExportExcel} className="gap-2">
            <FileSpreadsheet className="w-4 h-4" />
            {t('calculators.common.export')}
          </Button>
        </div>

        {/* Revenus */}
        <BudgetInputSection
          title={t('calculators.budget.sections.income')}
          items={revenus}
          onItemChange={handleRevenusChange}
          icon={<TrendingUp className="w-5 h-5 text-success" />}
        />

        {/* Dépenses fixes */}
        <BudgetInputSection
          title={t('calculators.budget.sections.fixedExpenses')}
          items={depensesFixes}
          onItemChange={handleDepensesFixesChange}
          icon={<DollarSign className="w-5 h-5 text-warning" />}
        />

        {/* Dépenses variables */}
        <BudgetInputSection
          title={t('calculators.budget.sections.variableExpenses')}
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
                {t('calculators.budget.summary.chartTitle')}
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
                      fill="hsl(var(--primary))"
                      dataKey="value"
                    >
                      {pieChartData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={CHART_COLORS[index % CHART_COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip 
                      formatter={(value: number) => formatCurrency(value)}
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
              {t('calculators.budget.summary.title')}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-3">
                <div className="flex justify-between items-center py-2 border-b">
                  <span className="text-muted-foreground">{t('calculators.budget.summary.totalIncome')}</span>
                  <span className="font-semibold text-success">{formatCurrency(totalRevenus)}</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b">
                  <span className="text-muted-foreground">{t('calculators.budget.sections.fixedExpenses')}</span>
                  <span className="font-medium text-foreground">{formatCurrency(totalDepensesFixes)}</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b">
                  <span className="text-muted-foreground">{t('calculators.budget.sections.variableExpenses')}</span>
                  <span className="font-medium text-foreground">{formatCurrency(totalDepensesVariables)}</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b">
                  <span className="text-muted-foreground">{t('calculators.budget.summary.totalExpenses')}</span>
                  <span className="font-semibold text-destructive">{formatCurrency(totalDepenses)}</span>
                </div>
              </div>
              <div className="flex flex-col items-center justify-center p-6 rounded-xl bg-background">
                <span className="text-sm text-muted-foreground mb-2">{t('calculators.budget.summary.monthlyBalance')}</span>
                <span className={`text-4xl md:text-5xl font-bold ${solde >= 0 ? 'text-success' : 'text-destructive'}`}>
                  {formatCurrency(solde)}
                </span>
                <span className="text-xs text-muted-foreground mt-2">
                  {solde >= 0 ? t('calculators.budget.summary.balanced') : t('calculators.budget.summary.deficit')}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Print Footer */}
        <div className="hidden print:block text-center text-sm text-muted-foreground mt-8 pt-4 border-t">
          <p>Finivo.ca - {new Date().toLocaleDateString(currentLanguage === 'en' ? 'en-CA' : 'fr-CA')}</p>
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
