export interface BrokeragePlatform {
  id: string;
  slug: string;
  name: string;
  logo: string;
  type: 'courtier' | 'robo-advisor';
  transactionFeeStocks: string;
  transactionFeeETF: string;
  monthlyFee: string;
  accounts: string[];
  marketsAccess: string[];
  hasOptions: boolean;
  hasCrypto: boolean;
  hasMobileApp: boolean;
  hasFrench: boolean;
  regulation: string[];
  level: 'debutant' | 'intermediaire' | 'avance';
  products: string[];
  strengths: string[];
  weaknesses: string[];
  affiliateLink: string;
  rating: number;
  idealFor: string;
}

export type BrokerageCategory =
  | 'zero-commission'
  | 'debutant'
  | 'avance'
  | 'comptes-enregistres'
  | 'actions-etf'
  | 'options'
  | 'crypto'
  | 'quebec-friendly';

export interface BrokerageFilterState {
  categories: BrokerageCategory[];
  hasNoFees: boolean;
  hasFrench: boolean;
  hasCrypto: boolean;
  hasOptions: boolean;
  sortBy: 'rating' | 'fees' | 'name';
}

export const brokerageCategoryLabels: Record<BrokerageCategory, string> = {
  'zero-commission': 'Zéro commission',
  'debutant': 'Débutant',
  'avance': 'Investisseur avancé',
  'comptes-enregistres': 'CELI / REER',
  'actions-etf': 'Actions & ETF',
  'options': 'Options',
  'crypto': 'Crypto',
  'quebec-friendly': 'Québec friendly',
};
