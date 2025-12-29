export interface CreditCard {
  id: string;
  slug?: string;
  name: string;
  issuer: string;
  image: string;
  annualFee: number;
  firstYearFreeAnnualFee?: boolean;
  interestRate: number;
  cashAdvanceRate: number;
  rewardsRate: number;
  rewardsType: 'cashback' | 'points' | 'miles';
  welcomeBonus?: string;
  welcomeBonusValue?: number;
  minIncome?: number;
  features: string[];
  categories: CardCategory[];
  affiliateLink: string;
  rating: number;
  lastUpdated: string;
}

export type CardCategory = 
  | 'cashback'
  | 'travel'
  | 'rewards'
  | 'no-fee'
  | 'low-interest'
  | 'student'
  | 'business'
  | 'premium';

export interface FilterState {
  categories: CardCategory[];
  maxAnnualFee: number | null;
  minCashback: number | null;
  noAnnualFee: boolean;
  hasWelcomeBonus: boolean;
  sortBy: 'rating' | 'annualFee' | 'rewardsRate' | 'interestRate';
}
