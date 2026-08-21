import { useState, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { CreditCard, Plus, Trash2 } from 'lucide-react';
import { CalculatorLayout } from '@/components/calculators/CalculatorLayout';
import { CalculatorFAQ } from '@/components/calculators/CalculatorFAQ';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend, PieChart, Pie, Cell } from 'recharts';
import { useLanguage } from '@/hooks/useLanguage';

interface Dette {
  id: string;
  nom: string;
  montant: number;
  tauxInteret: number;
  paiementMensuel: number;
}

const ConsolidationDettes = () => {
  const { t } = useTranslation();
  const { currentLanguage } = useLanguage();
  
  const [dettes, setDettes] = useState<Dette[]>([{
    id: '1',
    nom: currentLanguage === 'en' ? 'Credit card 1' : 'Carte de crédit 1',
    montant: 5000,
    tauxInteret: 19.99,
    paiementMensuel: 150
  }]);
  const [activeTab, setActiveTab] = useState('1');

  const ajouterDette = () => {
    const newId = (dettes.length + 1).toString();
    setDettes([...dettes, {
      id: newId,
      nom: `${currentLanguage === 'en' ? 'Credit card' : 'Carte de crédit'} ${newId}`,
      montant: 0,
      tauxInteret: 19.99,
      paiementMensuel: 50
    }]);
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
    setDettes(dettes.map(d => d.id === id ? { ...d, [field]: value } : d));
  };

  const resultats = useMemo(() => {
    let totalDette = 0;
    let totalPaiementMensuel = 0;
    let totalInterets = 0;
    let moisMax = 0;
    const detailsDettes: Array<{
      nom: string;
      montant: number;
      interets: number;
      mois: number;
    }> = [];

    dettes.forEach(dette => {
      if (dette.montant <= 0 || dette.paiementMensuel <= 0) return;
      totalDette += dette.montant;
      totalPaiementMensuel += dette.paiementMensuel;

      const tauxMensuel = dette.tauxInteret / 100 / 12;
      let solde = dette.montant;
      let mois = 0;
      let interetsPaies = 0;
      while (solde > 0 && mois < 600) {
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
        mois: mois === Infinity ? -1 : mois
      });
    });

    const donneesPie = dettes.filter(d => d.montant > 0).map((dette) => ({
      name: dette.nom,
      value: dette.montant
    }));
    const donneesBar = detailsDettes.filter(d => d.mois > 0).map(d => ({
      nom: d.nom.length > 15 ? d.nom.substring(0, 12) + '...' : d.nom,
      principal: d.montant,
      interets: d.interets
    }));

    return {
      totalDette,
      totalPaiementMensuel,
      totalInterets: Math.round(totalInterets),
      moisRemboursement: moisMax === Infinity ? -1 : moisMax,
      detailsDettes,
      donneesPie,
      donneesBar
    };
  }, [dettes]);

  const formatMontant = (montant: number) => {
    return new Intl.NumberFormat(currentLanguage === 'en' ? 'en-CA' : 'fr-CA', {
      style: 'currency',
      currency: 'CAD',
      maximumFractionDigits: 0
    }).format(montant);
  };

  const COLORS = ['hsl(var(--primary))', 'hsl(var(--chart-2))', 'hsl(var(--chart-3))', 'hsl(var(--chart-4))', 'hsl(var(--chart-5))'];

  const faqItems = [
    { question: t('calculators.debtConsolidation.faq.q1'), answer: t('calculators.debtConsolidation.faq.a1') },
    { question: t('calculators.debtConsolidation.faq.q2'), answer: t('calculators.debtConsolidation.faq.a2') },
    { question: t('calculators.debtConsolidation.faq.q3'), answer: t('calculators.debtConsolidation.faq.a3') },
    { question: t('calculators.debtConsolidation.faq.q4'), answer: t('calculators.debtConsolidation.faq.a4') },
    { question: t('calculators.debtConsolidation.faq.q5'), answer: t('calculators.debtConsolidation.faq.a5') },
  ];

  return (
    <CalculatorLayout 
      title={t('calculators.debtConsolidation.title')} 
      description={t('calculators.debtConsolidation.description')} 
      icon={<CreditCard className="w-8 h-8 text-primary" />} 
      seoTitle={t('calculators.debtConsolidation.seo.title')} 
      seoDescription={t('calculators.debtConsolidation.seo.description')} 
      seoKeywords={t('calculators.debtConsolidation.seo.keywords')} 
      url={`https://finivo.ca/${currentLanguage}/calculateurs/consolidation-dettes`}
      relatedCategory="dettes" 
      featuredCardType="transfer"
    >
      <div className="space-y-8">
        {/* Formulaire dettes */}
        <Card>
          <CardHeader>
            <CardTitle>{t('calculators.debtConsolidation.step1')}</CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <div className="flex items-center gap-2 mb-6">
                <TabsList>
                  {dettes.map(dette => (
                    <TabsTrigger key={dette.id} value={dette.id}>
                      {t('calculators.debtConsolidation.debt')} {dette.id}
                    </TabsTrigger>
                  ))}
                </TabsList>
                <Button variant="outline" size="sm" onClick={ajouterDette}>
                  <Plus className="w-4 h-4 mr-1" />
                  {t('calculators.debtConsolidation.addDebt')}
                </Button>
              </div>

              {dettes.map(dette => (
                <TabsContent key={dette.id} value={dette.id} className="space-y-6">
                  <div className="flex justify-between items-start">
                    <div className="space-y-3 flex-1">
                      <Label>{t('calculators.debtConsolidation.debtName')}</Label>
                      <Input 
                        value={dette.nom} 
                        onChange={e => updateDette(dette.id, 'nom', e.target.value)} 
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
                    <Label>{t('calculators.debtConsolidation.amountOwed')}</Label>
                    <div className="flex items-center gap-3">
                      <Input 
                        type="number" 
                        value={dette.montant} 
                        onChange={e => updateDette(dette.id, 'montant', Number(e.target.value))} 
                        className="w-32" 
                      />
                      <span className="text-muted-foreground">$</span>
                    </div>
                    <Slider 
                      value={[dette.montant]} 
                      onValueChange={v => updateDette(dette.id, 'montant', v[0])} 
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
                    <Label>{t('calculators.debtConsolidation.interestRate')}</Label>
                    <div className="flex items-center gap-3">
                      <Input 
                        type="number" 
                        step="0.01" 
                        value={dette.tauxInteret} 
                        onChange={e => updateDette(dette.id, 'tauxInteret', Number(e.target.value))} 
                        className="w-24" 
                      />
                      <span className="text-muted-foreground">%</span>
                    </div>
                    <Slider 
                      value={[dette.tauxInteret]} 
                      onValueChange={v => updateDette(dette.id, 'tauxInteret', v[0])} 
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
                    <Label>{t('calculators.debtConsolidation.monthlyPayment')}</Label>
                    <div className="flex items-center gap-3">
                      <Input 
                        type="number" 
                        value={dette.paiementMensuel} 
                        onChange={e => updateDette(dette.id, 'paiementMensuel', Number(e.target.value))} 
                        className="w-32" 
                      />
                      <span className="text-muted-foreground">$</span>
                    </div>
                    <Slider 
                      value={[dette.paiementMensuel]} 
                      onValueChange={v => updateDette(dette.id, 'paiementMensuel', v[0])} 
                      min={1} 
                      max={5000} 
                      step={10} 
                    />
                    <p className="text-xs text-muted-foreground">{currentLanguage === 'en' ? 'Enter a minimum of $1' : 'Entrez un minimum de 1 $'}</p>
                  </div>
                </TabsContent>
              ))}
            </Tabs>
          </CardContent>
        </Card>

        {/* Résumé */}
        <Card className="bg-primary text-primary-foreground">
          <CardContent className="pt-6">
            <p className="opacity-80 mb-6 text-center max-w-2xl mx-auto text-sm">
              {t('calculators.debtConsolidation.summaryText', {
                totalDebt: formatMontant(resultats.totalDette),
                months: resultats.moisRemboursement === -1 ? '∞' : resultats.moisRemboursement,
                monthlyPayment: formatMontant(resultats.totalPaiementMensuel)
              })}
            </p>

            <div className="text-center mb-6">
              <p className="text-sm opacity-80">{t('calculators.debtConsolidation.totalDebt')}</p>
              <p className="text-4xl md:text-5xl font-bold mt-2">{formatMontant(resultats.totalDette)}</p>
            </div>
            <div className="grid grid-cols-2 gap-4 text-center max-w-md mx-auto">
              <div>
                <p className="text-sm opacity-80">{t('calculators.debtConsolidation.totalMonthlyPayment')}</p>
                <p className="text-xl md:text-2xl font-semibold mt-1">{formatMontant(resultats.totalPaiementMensuel)}</p>
              </div>
              <div>
                <p className="text-sm opacity-80">{t('calculators.debtConsolidation.debtFreeIn')}</p>
                <p className="text-xl md:text-2xl font-semibold mt-1">
                  {resultats.moisRemboursement === -1 ? '∞' : resultats.moisRemboursement} {t('calculators.common.months')}
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
                <CardTitle>{t('calculators.debtConsolidation.distribution')}</CardTitle>
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
                      <Tooltip
                        formatter={(value: number) => formatMontant(value)}
                        contentStyle={{
                          backgroundColor: 'hsl(var(--card))',
                          border: '1px solid hsl(var(--border))',
                          borderRadius: '8px'
                        }}
                      />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>{t('calculators.debtConsolidation.principalVsInterest')}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={resultats.donneesBar}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="nom" />
                      <YAxis tickFormatter={v => `${(v / 1000).toFixed(0)}k`} />
                      <Tooltip
                        formatter={(value: number) => formatMontant(value)}
                        contentStyle={{
                          backgroundColor: 'hsl(var(--card))',
                          border: '1px solid hsl(var(--border))',
                          borderRadius: '8px'
                        }}
                      />
                      <Legend />
                      <Bar dataKey="principal" name={t('calculators.debtConsolidation.principal')} fill="hsl(var(--primary))" />
                      <Bar dataKey="interets" name={t('calculators.debtConsolidation.interest')} fill="hsl(var(--destructive))" />
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
              <p className="text-muted-foreground">{t('calculators.debtConsolidation.totalInterest')}</p>
              <p className="text-4xl md:text-5xl font-bold text-destructive">{formatMontant(resultats.totalInterets)}</p>
              <p className="text-sm text-muted-foreground mt-2">
                {t('calculators.debtConsolidation.considerTransfer')}
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Section explicative */}
        <Card className="bg-muted/50">
          <CardContent className="pt-6">
            <h2 className="text-lg font-semibold mb-3">{t('calculators.debtConsolidation.understanding')}</h2>
            <div className="space-y-3 text-sm text-muted-foreground">
              <p>{t('calculators.debtConsolidation.consolidationExplanation')}</p>
              <div className="grid md:grid-cols-2 gap-4 mt-4">
                <div>
                  <h3 className="font-medium text-foreground mb-2">{t('calculators.debtConsolidation.advantages')}</h3>
                  <ul className="list-disc list-inside space-y-1">
                    <li>{currentLanguage === 'en' ? 'A single monthly payment to manage' : 'Un seul paiement mensuel à gérer'}</li>
                    <li>{currentLanguage === 'en' ? 'Potentially lower interest rate' : 'Taux d\'intérêt potentiellement plus bas'}</li>
                    <li>{currentLanguage === 'en' ? 'Savings on total interest' : 'Économies sur les intérêts totaux'}</li>
                    <li>{currentLanguage === 'en' ? 'Better visibility on repayment' : 'Meilleure visibilité sur le remboursement'}</li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-medium text-foreground mb-2">{t('calculators.debtConsolidation.watchPoints')}</h3>
                  <ul className="list-disc list-inside space-y-1">
                    <li>{currentLanguage === 'en' ? 'Avoid accumulating new debts' : 'Évitez d\'accumuler de nouvelles dettes'}</li>
                    <li>{currentLanguage === 'en' ? 'Compare application fees' : 'Comparez les frais de dossier'}</li>
                    <li>{currentLanguage === 'en' ? 'Check prepayment penalties' : 'Vérifiez les pénalités de remboursement anticipé'}</li>
                    <li>{currentLanguage === 'en' ? 'Ensure the new payment is affordable' : 'Assurez-vous que le nouveau paiement est abordable'}</li>
                  </ul>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <CalculatorFAQ items={faqItems} />
      </div>
    </CalculatorLayout>
  );
};

export default ConsolidationDettes;
