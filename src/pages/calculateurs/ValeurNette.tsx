import { useState, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { Wallet, Plus, Trash2 } from 'lucide-react';
import { CalculatorLayout } from '@/components/calculators/CalculatorLayout';
import { CalculatorFAQ } from '@/components/calculators/CalculatorFAQ';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import { useLanguage } from '@/hooks/useLanguage';

interface LigneFinanciere {
  id: string;
  nom: string;
  montant: number;
}

const ValeurNette = () => {
  const { t } = useTranslation();
  const { currentLanguage } = useLanguage();
  
  // Actifs liquides
  const [compteCheques, setCompteCheques] = useState(5000);
  const [compteEpargne, setCompteEpargne] = useState(15000);
  
  // Placements enregistrés
  const [reer, setReer] = useState(50000);
  const [celi, setCeli] = useState(25000);
  const [celiapp, setCeliapp] = useState(8000);
  
  // Placements non enregistrés
  const [placementsNonEnregistres, setPlacementsNonEnregistres] = useState<LigneFinanciere[]>([
    { id: '1', nom: currentLanguage === 'en' ? 'Stocks' : 'Actions', montant: 10000 },
  ]);
  
  // Biens personnels
  const [residencePrincipale, setResidencePrincipale] = useState(0);
  const [vehicules, setVehicules] = useState<LigneFinanciere[]>([
    { id: '1', nom: currentLanguage === 'en' ? 'Car' : 'Voiture', montant: 15000 },
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
      { name: currentLanguage === 'en' ? 'Cash' : 'Liquidités', value: totalLiquide },
      { name: currentLanguage === 'en' ? 'RRSP/TFSA/FHSA' : 'REER/CELI/CELIAPP', value: totalEnregistres },
      { name: currentLanguage === 'en' ? 'Non-registered investments' : 'Placements non enregistrés', value: totalNonEnregistres },
      { name: currentLanguage === 'en' ? 'Personal property' : 'Biens personnels', value: totalBiens },
    ].filter(d => d.value > 0);

    const donneesPassifs = [
      { name: t('calculators.netWorth.mortgage'), value: hypotheque },
      { name: t('calculators.netWorth.autoLoan'), value: pretAuto },
      { name: t('calculators.netWorth.studentLoan'), value: pretEtudiant },
      { name: t('calculators.netWorth.creditCards'), value: cartesCredit },
      { name: t('calculators.netWorth.otherDebts'), value: totalAutresDettes },
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
  }, [compteCheques, compteEpargne, reer, celi, celiapp, placementsNonEnregistres, residencePrincipale, vehicules, autresBiens, hypotheque, pretAuto, pretEtudiant, cartesCredit, autresDettes, currentLanguage, t]);

  const formatMontant = (montant: number) => {
    return new Intl.NumberFormat(currentLanguage === 'en' ? 'en-CA' : 'fr-CA', { style: 'currency', currency: 'CAD', maximumFractionDigits: 0 }).format(montant);
  };

  const COLORS_ACTIFS = ['hsl(var(--primary))', 'hsl(var(--chart-2))', 'hsl(var(--chart-3))', 'hsl(var(--chart-4))'];
  const COLORS_PASSIFS = ['hsl(var(--destructive))', 'hsl(var(--chart-5))', 'hsl(var(--muted-foreground))', 'hsl(var(--chart-2))', 'hsl(var(--chart-3))'];

  const faqItems = [
    { question: t('calculators.netWorth.faq.q1'), answer: t('calculators.netWorth.faq.a1') },
    { question: t('calculators.netWorth.faq.q2'), answer: t('calculators.netWorth.faq.a2') },
    { question: t('calculators.netWorth.faq.q3'), answer: t('calculators.netWorth.faq.a3') },
    { question: t('calculators.netWorth.faq.q4'), answer: t('calculators.netWorth.faq.a4') },
    { question: t('calculators.netWorth.faq.q5'), answer: t('calculators.netWorth.faq.a5') },
  ];

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
        {t('calculators.common.add')}
      </Button>
    </div>
  );

  return (
    <CalculatorLayout
      title={t('calculators.netWorth.title')}
      description={t('calculators.netWorth.description')}
      icon={<Wallet className="w-8 h-8 text-primary" />}
      seoTitle={t('calculators.netWorth.seo.title')}
      seoDescription={t('calculators.netWorth.seo.description')}
      seoKeywords={t('calculators.netWorth.seo.keywords')}
      url={`https://finivo.ca/${currentLanguage}/calculateurs/valeur-nette`}
      relatedCategory="investissement"
      featuredCardType="cashback"
    >
      <div className="space-y-8">
        {/* Section explicative */}
        <Card className="bg-muted/50">
          <CardContent className="pt-6">
            <h2 className="text-lg font-semibold mb-3">{t('calculators.netWorth.understanding')}</h2>
            <div className="space-y-3 text-sm text-muted-foreground">
              <p>{t('calculators.netWorth.explanation')}</p>
              <div className="grid md:grid-cols-2 gap-4 mt-4">
                <div>
                  <h3 className="font-medium text-foreground mb-2">{t('calculators.netWorth.assetsInclude')}</h3>
                  <ul className="list-disc list-inside space-y-1">
                    <li>{currentLanguage === 'en' ? 'Bank accounts and savings' : 'Comptes bancaires et épargne'}</li>
                    <li>{currentLanguage === 'en' ? 'Investments (RRSP, TFSA, stocks)' : 'Placements (REER, CELI, actions)'}</li>
                    <li>{currentLanguage === 'en' ? 'Real estate (market value)' : 'Immobilier (valeur marchande)'}</li>
                    <li>{currentLanguage === 'en' ? 'Vehicles and personal property' : 'Véhicules et biens personnels'}</li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-medium text-foreground mb-2">{t('calculators.netWorth.liabilitiesInclude')}</h3>
                  <ul className="list-disc list-inside space-y-1">
                    <li>{currentLanguage === 'en' ? 'Mortgage (remaining balance)' : 'Hypothèque (solde restant)'}</li>
                    <li>{currentLanguage === 'en' ? 'Auto and personal loans' : 'Prêts auto et personnels'}</li>
                    <li>{currentLanguage === 'en' ? 'Credit card balances' : 'Soldes de cartes de crédit'}</li>
                    <li>{currentLanguage === 'en' ? 'Student loans' : 'Prêts étudiants'}</li>
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
              <p className="text-sm opacity-80">{t('calculators.netWorth.yourNetWorth')}</p>
              <p className="text-5xl font-bold mt-2">{formatMontant(resultats.valeurNette)}</p>
              <div className="grid grid-cols-2 gap-8 mt-6 max-w-md mx-auto">
                <div>
                  <p className="text-sm opacity-80">{t('calculators.netWorth.totalAssets')}</p>
                  <p className="text-2xl font-semibold">{formatMontant(resultats.totalActifs)}</p>
                </div>
                <div>
                  <p className="text-sm opacity-80">{t('calculators.netWorth.totalLiabilities')}</p>
                  <p className="text-2xl font-semibold">{formatMontant(resultats.totalPassifs)}</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* ACTIFS */}
          <div className="space-y-6">
            <h2 className="text-xl font-bold text-foreground">{t('calculators.netWorth.yourAssets')}</h2>
            
            {/* Argent comptant */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">{t('calculators.netWorth.cashEquivalents')}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>{t('calculators.netWorth.checkingAccounts')}</Label>
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
                  <Label>{t('calculators.netWorth.savingsAccounts')}</Label>
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
                  <p className="text-sm text-muted-foreground">{t('calculators.common.total')} : <span className="font-semibold text-foreground">{formatMontant(resultats.totalLiquide)}</span></p>
                </div>
              </CardContent>
            </Card>

            {/* Placements enregistrés */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">{t('calculators.netWorth.registeredInvestments')}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>{currentLanguage === 'en' ? 'RRSP' : 'REER'}</Label>
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
                  <Label>{currentLanguage === 'en' ? 'TFSA' : 'CELI'}</Label>
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
                  <Label>{currentLanguage === 'en' ? 'FHSA' : 'CELIAPP'}</Label>
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
                  <p className="text-sm text-muted-foreground">{t('calculators.common.total')} : <span className="font-semibold text-foreground">{formatMontant(resultats.totalEnregistres)}</span></p>
                </div>
              </CardContent>
            </Card>

            {/* Placements non enregistrés */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">{t('calculators.netWorth.nonRegisteredInvestments')}</CardTitle>
              </CardHeader>
              <CardContent>
                <LigneInput 
                  items={placementsNonEnregistres} 
                  setItems={setPlacementsNonEnregistres} 
                  placeholder={currentLanguage === 'en' ? 'Investment name' : 'Nom du placement'}
                />
                <div className="pt-4 border-t mt-4">
                  <p className="text-sm text-muted-foreground">{t('calculators.common.total')} : <span className="font-semibold text-foreground">{formatMontant(resultats.totalNonEnregistres)}</span></p>
                </div>
              </CardContent>
            </Card>

            {/* Biens personnels */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">{t('calculators.netWorth.personalProperty')}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>{t('calculators.netWorth.primaryResidence')}</Label>
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
                  <Label>{t('calculators.netWorth.vehicles')}</Label>
                  <LigneInput 
                    items={vehicules} 
                    setItems={setVehicules} 
                    placeholder={currentLanguage === 'en' ? 'Description' : 'Description'}
                  />
                </div>
                <div className="space-y-2">
                  <Label>{t('calculators.netWorth.otherAssets')}</Label>
                  <LigneInput 
                    items={autresBiens} 
                    setItems={setAutresBiens} 
                    placeholder={currentLanguage === 'en' ? 'Description' : 'Description'}
                  />
                </div>
                <div className="pt-2 border-t">
                  <p className="text-sm text-muted-foreground">{t('calculators.common.total')} : <span className="font-semibold text-foreground">{formatMontant(resultats.totalBiens)}</span></p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* PASSIFS */}
          <div className="space-y-6">
            <h2 className="text-xl font-bold text-foreground">{t('calculators.netWorth.yourLiabilities')}</h2>
            
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">{t('calculators.netWorth.debts')}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>{t('calculators.netWorth.mortgage')}</Label>
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
                  <Label>{t('calculators.netWorth.autoLoan')}</Label>
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
                  <Label>{t('calculators.netWorth.studentLoan')}</Label>
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
                  <Label>{t('calculators.netWorth.creditCards')}</Label>
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
                  <Label>{t('calculators.netWorth.otherDebts')}</Label>
                  <LigneInput 
                    items={autresDettes} 
                    setItems={setAutresDettes} 
                    placeholder={currentLanguage === 'en' ? 'Description' : 'Description'}
                  />
                </div>
                <div className="pt-2 border-t">
                  <p className="text-sm text-muted-foreground">{t('calculators.common.total')} : <span className="font-semibold text-foreground">{formatMontant(resultats.totalPassifs)}</span></p>
                </div>
              </CardContent>
            </Card>

            {/* Graphiques */}
            {resultats.donneesActifs.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">{t('calculators.netWorth.assetDistribution')}</CardTitle>
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
                  <CardTitle className="text-lg">{t('calculators.netWorth.liabilityDistribution')}</CardTitle>
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
