import { CreditCard } from '@/types/creditCard';

export const creditCards: CreditCard[] = [
  {
    id: '1',
    name: 'Carte Visa Infinite TD Aéroplan',
    issuer: 'TD',
    image: '/cards/td-aeroplan.png',
    annualFee: 139,
    interestRate: 20.99,
    cashAdvanceRate: 22.99,
    rewardsRate: 1.5,
    rewardsType: 'miles',
    welcomeBonus: 'Jusqu\'à 30 000 points Aéroplan',
    welcomeBonusValue: 600,
    minIncome: 60000,
    features: [
      'Assurance voyage complète',
      'Accès aux salons Maple Leaf',
      'Aucun frais de conversion',
      'Protection achats'
    ],
    categories: ['travel', 'premium', 'rewards'],
    affiliateLink: 'https://example.com/td-aeroplan',
    rating: 4.8,
    lastUpdated: '2025-12-20'
  },
  {
    id: '2',
    name: 'Carte Mastercard World Elite BMO',
    issuer: 'BMO',
    image: '/cards/bmo-world-elite.png',
    annualFee: 150,
    interestRate: 20.99,
    cashAdvanceRate: 22.99,
    rewardsRate: 3,
    rewardsType: 'cashback',
    welcomeBonus: '5% remise les 3 premiers mois',
    welcomeBonusValue: 500,
    minIncome: 80000,
    features: [
      '3% sur épicerie',
      '3% sur transport',
      'Assurance voyage',
      'Protection location auto'
    ],
    categories: ['cashback', 'premium', 'rewards'],
    affiliateLink: 'https://example.com/bmo-world-elite',
    rating: 4.7,
    lastUpdated: '2025-12-20'
  },
  {
    id: '3',
    name: 'Carte Visa Remises Desjardins',
    issuer: 'Desjardins',
    image: '/cards/desjardins-remises.png',
    annualFee: 0,
    firstYearFreeAnnualFee: true,
    interestRate: 19.99,
    cashAdvanceRate: 21.99,
    rewardsRate: 1.5,
    rewardsType: 'cashback',
    welcomeBonus: '20$ en remises Bonidollars',
    welcomeBonusValue: 20,
    features: [
      '1.5% remise sur tous les achats',
      'Aucun frais annuel',
      'Protection achats',
      'Gestion mobile'
    ],
    categories: ['cashback', 'no-fee'],
    affiliateLink: 'https://example.com/desjardins-remises',
    rating: 4.5,
    lastUpdated: '2025-12-20'
  },
  {
    id: '4',
    name: 'Carte CIBC Dividendes',
    issuer: 'CIBC',
    image: '/cards/cibc-dividendes.png',
    annualFee: 0,
    interestRate: 19.99,
    cashAdvanceRate: 21.99,
    rewardsRate: 2,
    rewardsType: 'cashback',
    welcomeBonus: '10% remise sur les premiers 2000$',
    welcomeBonusValue: 200,
    features: [
      '2% sur épicerie',
      '0.5% sur autres achats',
      'Aucun frais annuel',
      'Apple Pay compatible'
    ],
    categories: ['cashback', 'no-fee'],
    affiliateLink: 'https://example.com/cibc-dividendes',
    rating: 4.3,
    lastUpdated: '2025-12-20'
  },
  {
    id: '5',
    name: 'Carte RBC Avion Visa Infinite',
    issuer: 'RBC',
    image: '/cards/rbc-avion.png',
    annualFee: 120,
    firstYearFreeAnnualFee: true,
    interestRate: 20.99,
    cashAdvanceRate: 22.99,
    rewardsRate: 1,
    rewardsType: 'points',
    welcomeBonus: '35 000 points Avion RBC',
    welcomeBonusValue: 350,
    minIncome: 60000,
    features: [
      'Transfert vers partenaires aériens',
      'Assurance voyage annulation',
      'Protection location auto',
      'Conciergerie voyage'
    ],
    categories: ['travel', 'rewards', 'premium'],
    affiliateLink: 'https://example.com/rbc-avion',
    rating: 4.6,
    lastUpdated: '2025-12-20'
  },
  {
    id: '6',
    name: 'Carte Tangerine Remises',
    issuer: 'Tangerine',
    image: '/cards/tangerine-remises.png',
    annualFee: 0,
    interestRate: 19.95,
    cashAdvanceRate: 19.95,
    rewardsRate: 2,
    rewardsType: 'cashback',
    features: [
      '2% dans 2 catégories au choix',
      '0.5% sur autres achats',
      'Aucun frais annuel',
      'Pas de revenu minimum'
    ],
    categories: ['cashback', 'no-fee', 'student'],
    affiliateLink: 'https://example.com/tangerine',
    rating: 4.4,
    lastUpdated: '2025-12-20'
  },
  {
    id: '7',
    name: 'Carte Scotiabank Momentum Visa Infinite',
    issuer: 'Scotiabank',
    image: '/cards/scotiabank-momentum.png',
    annualFee: 120,
    interestRate: 20.99,
    cashAdvanceRate: 22.99,
    rewardsRate: 4,
    rewardsType: 'cashback',
    welcomeBonus: '10% remise sur premiers achats',
    welcomeBonusValue: 400,
    minIncome: 60000,
    features: [
      '4% sur épicerie et essence',
      '2% sur transport en commun',
      '1% sur achats récurrents',
      'Assurance mobile'
    ],
    categories: ['cashback', 'premium', 'rewards'],
    affiliateLink: 'https://example.com/scotiabank-momentum',
    rating: 4.7,
    lastUpdated: '2025-12-20'
  },
  {
    id: '8',
    name: 'Carte Étudiant CIBC',
    issuer: 'CIBC',
    image: '/cards/cibc-student.png',
    annualFee: 0,
    interestRate: 19.99,
    cashAdvanceRate: 21.99,
    rewardsRate: 0.5,
    rewardsType: 'cashback',
    features: [
      'Aucun frais annuel',
      'Limite de crédit adaptée',
      'Gestion en ligne facile',
      'Sans revenu minimum'
    ],
    categories: ['student', 'no-fee'],
    affiliateLink: 'https://example.com/cibc-student',
    rating: 4.0,
    lastUpdated: '2025-12-20'
  },
  {
    id: '9',
    name: 'Carte CobaltMD American Express',
    issuer: 'American Express',
    image: '/cards/amex-cobalt.png',
    annualFee: 155.88, // 12.99$ par mois
    interestRate: 20.99,
    cashAdvanceRate: 21.99,
    rewardsRate: 5,
    rewardsType: 'points',
    welcomeBonus: 'Jusqu\'à 30 000 points privilèges',
    welcomeBonusValue: 300,
    features: [
      '5 points par 1$ (Épicerie et Resto)',
      '2 points par 1$ (Voyages et Transport)',
      '1 point par 1$ (Tout le reste)',
      'Assurance voyage incluse'
    ],
    categories: ['travel', 'rewards', 'premium'],
    affiliateLink: 'https://example.com/amex-cobalt',
    rating: 4.9,
    lastUpdated: '2025-12-28'
  },
  {
    id: '10',
    name: 'Carte World Elite Mastercard BNC',
    issuer: 'Banque Nationale',
    image: '/cards/bnc-world-elite.png',
    annualFee: 150,
    firstYearFreeAnnualFee: true,
    interestRate: 20.99,
    cashAdvanceRate: 22.99,
    rewardsRate: 2,
    rewardsType: 'points',
    welcomeBonus: 'Jusqu\'à 35 000 points',
    welcomeBonusValue: 350,
    minIncome: 80000,
    features: [
      'Accès gratuit Salon Banque Nationale',
      'Jusqu\'à 150$ de remboursement voyage',
      'Assurance médicale hors province',
      'Assurance annulation de voyage'
    ],
    categories: ['travel', 'premium', 'rewards'],
    affiliateLink: 'https://example.com/bnc-world-elite',
    rating: 4.7,
    lastUpdated: '2025-12-28'
  },
  {
    id: '11',
    name: 'Mastercard Simplii Financial',
    issuer: 'Simplii',
    image: '/cards/simplii-cashback.png',
    annualFee: 0,
    interestRate: 19.99,
    cashAdvanceRate: 22.99,
    rewardsRate: 4,
    rewardsType: 'cashback',
    welcomeBonus: '10% de remise les 4 premiers mois',
    welcomeBonusValue: 200,
    features: [
      '4% de remise dans les restaurants',
      '1.5% sur l\'essence et l\'épicerie',
      'Aucun frais annuel',
      'Simple et sans paperasse'
    ],
    categories: ['cashback', 'no-fee'],
    affiliateLink: 'https://example.com/simplii',
    rating: 4.5,
    lastUpdated: '2025-12-28'
  }
];

export const categoryLabels: Record<string, string> = {
  'cashback': 'Remise en argent',
  'travel': 'Voyage',
  'rewards': 'Récompenses',
  'no-fee': 'Sans frais',
  'low-interest': 'Faible taux',
  'student': 'Étudiant',
  'business': 'Entreprise',
  'premium': 'Premium'
};
