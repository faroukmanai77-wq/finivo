import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { BrokeragePlatform } from '@/types/brokerage';
import { useTranslatedContent } from './useTranslatedContent';

interface BrokeragePlatformRow {
  id: string;
  slug: string;
  name: string;
  logo: string | null;
  type: string;
  type_en: string | null;
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
  level_en: string | null;
  products: string[];
  strengths: string[];
  strengths_en: string[] | null;
  weaknesses: string[];
  weaknesses_en: string[] | null;
  affiliate_link: string;
  rating: number;
  ideal_for: string;
  ideal_for_en: string | null;
}

export const useBrokeragePlatforms = () => {
  const { t, tArray, currentLanguage } = useTranslatedContent();

  const mapRowToPlatform = (row: BrokeragePlatformRow): BrokeragePlatform => ({
    id: row.id,
    slug: row.slug,
    name: row.name,
    logo: row.logo || '/brokerages/default.png',
    type: t(row.type, row.type_en) as 'courtier' | 'robo-advisor',
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
    level: t(row.level, row.level_en) as 'debutant' | 'intermediaire' | 'avance',
    products: row.products,
    strengths: tArray(row.strengths, row.strengths_en),
    weaknesses: tArray(row.weaknesses, row.weaknesses_en),
    affiliateLink: row.affiliate_link,
    rating: Number(row.rating),
    idealFor: t(row.ideal_for, row.ideal_for_en),
  });

  return useQuery({
    queryKey: ['brokerage-platforms', currentLanguage],
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
