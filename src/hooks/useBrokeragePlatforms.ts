import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { BrokeragePlatform } from '@/types/brokerage';

interface BrokeragePlatformRow {
  id: string;
  slug: string;
  name: string;
  logo: string | null;
  type: string;
  transaction_fee_stocks: string;
  transaction_fee_etf: string;
  monthly_fee: string;
  accounts: string[];
  markets_access: string[];
  has_options: boolean;
  has_crypto: boolean;
  has_mobile_app: boolean;
  has_french: boolean;
  regulation: string[];
  level: string;
  products: string[];
  strengths: string[];
  weaknesses: string[];
  affiliate_link: string;
  rating: number;
  ideal_for: string;
}

const mapRowToPlatform = (row: BrokeragePlatformRow): BrokeragePlatform => ({
  id: row.id,
  slug: row.slug,
  name: row.name,
  logo: row.logo || '/brokerages/default.png',
  type: row.type as 'courtier' | 'robo-advisor',
  transactionFeeStocks: row.transaction_fee_stocks,
  transactionFeeETF: row.transaction_fee_etf,
  monthlyFee: row.monthly_fee,
  accounts: row.accounts,
  marketsAccess: row.markets_access,
  hasOptions: row.has_options,
  hasCrypto: row.has_crypto,
  hasMobileApp: row.has_mobile_app,
  hasFrench: row.has_french,
  regulation: row.regulation,
  level: row.level as 'debutant' | 'intermediaire' | 'avance',
  products: row.products,
  strengths: row.strengths,
  weaknesses: row.weaknesses,
  affiliateLink: row.affiliate_link,
  rating: Number(row.rating),
  idealFor: row.ideal_for,
});

export const useBrokeragePlatforms = () => {
  return useQuery({
    queryKey: ['brokerage-platforms'],
    queryFn: async (): Promise<BrokeragePlatform[]> => {
      const { data, error } = await supabase
        .from('brokerage_platforms')
        .select('*')
        .order('rating', { ascending: false });

      if (error) {
        console.error('Error fetching brokerage platforms:', error);
        throw error;
      }

      return (data as BrokeragePlatformRow[]).map(mapRowToPlatform);
    },
  });
};
