import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { CreditCard, CardCategory } from '@/types/creditCard';
import { useTranslatedContent } from './useTranslatedContent';

interface CreditCardRow {
  id: string;
  slug: string;
  name: string;
  name_en: string | null;
  issuer: string;
  image_url: string | null;
  annual_fee: number;
  first_year_free: boolean | null;
  interest_rate: number;
  cash_advance_rate: number;
  rewards_rate: number;
  rewards_type: string;
  rewards_type_en: string | null;
  welcome_bonus: string | null;
  welcome_bonus_en: string | null;
  welcome_bonus_value: number | null;
  min_income: number | null;
  features: string[] | null;
  features_en: string[] | null;
  categories: string[];
  affiliate_link: string;
  rating: number;
  is_active: boolean | null;
  created_at: string;
  updated_at: string;
}

export const useCreditCards = () => {
  const { t, tArray, currentLanguage } = useTranslatedContent();

  return useQuery({
    queryKey: ['credit-cards', currentLanguage],
    queryFn: async (): Promise<CreditCard[]> => {
      const { data, error } = await supabase
        .from('credit_cards')
        .select('*')
        .eq('is_active', true)
        .order('rating', { ascending: false });

      if (error) {
        console.error('Error fetching credit cards:', error);
        throw error;
      }

      return (data as CreditCardRow[]).map((card) => ({
        id: card.id,
        slug: card.slug || card.id,
        name: t(card.name, card.name_en),
        issuer: card.issuer,
        image: card.image_url || '',
        annualFee: Number(card.annual_fee),
        firstYearFreeAnnualFee: card.first_year_free || false,
        interestRate: Number(card.interest_rate),
        cashAdvanceRate: Number(card.cash_advance_rate),
        rewardsRate: Number(card.rewards_rate),
        rewardsType: t(card.rewards_type, card.rewards_type_en) as 'cashback' | 'points' | 'miles',
        welcomeBonus: card.welcome_bonus ? t(card.welcome_bonus, card.welcome_bonus_en) : undefined,
        welcomeBonusValue: card.welcome_bonus_value ? Number(card.welcome_bonus_value) : undefined,
        minIncome: card.min_income ? Number(card.min_income) : undefined,
        features: tArray(card.features || [], card.features_en),
        categories: (card.categories || []) as CardCategory[],
        affiliateLink: card.affiliate_link,
        rating: Number(card.rating),
        lastUpdated: card.updated_at,
      }));
    },
  });
};

export const useCreditCard = (slug: string) => {
  const { t, tArray, currentLanguage } = useTranslatedContent();

  return useQuery({
    queryKey: ['credit-card', slug, currentLanguage],
    queryFn: async (): Promise<CreditCard | null> => {
      const { data, error } = await supabase
        .from('credit_cards')
        .select('*')
        .eq('slug', slug)
        .eq('is_active', true)
        .maybeSingle();

      if (error) {
        console.error('Error fetching credit card:', error);
        throw error;
      }

      if (!data) return null;

      const card = data as CreditCardRow;
      return {
        id: card.id,
        slug: card.slug || card.id,
        name: t(card.name, card.name_en),
        issuer: card.issuer,
        image: card.image_url || '',
        annualFee: Number(card.annual_fee),
        firstYearFreeAnnualFee: card.first_year_free || false,
        interestRate: Number(card.interest_rate),
        cashAdvanceRate: Number(card.cash_advance_rate),
        rewardsRate: Number(card.rewards_rate),
        rewardsType: t(card.rewards_type, card.rewards_type_en) as 'cashback' | 'points' | 'miles',
        welcomeBonus: card.welcome_bonus ? t(card.welcome_bonus, card.welcome_bonus_en) : undefined,
        welcomeBonusValue: card.welcome_bonus_value ? Number(card.welcome_bonus_value) : undefined,
        minIncome: card.min_income ? Number(card.min_income) : undefined,
        features: tArray(card.features || [], card.features_en),
        categories: (card.categories || []) as CardCategory[],
        affiliateLink: card.affiliate_link,
        rating: Number(card.rating),
        lastUpdated: card.updated_at,
      };
    },
    enabled: !!slug,
  });
};
