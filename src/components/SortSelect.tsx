import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ArrowUpDown } from 'lucide-react';
import { useTranslation } from 'react-i18next';

interface SortSelectProps {
  value: string;
  onChange: (value: 'rating' | 'annualFee' | 'rewardsRate' | 'interestRate') => void;
  totalCards: number;
}

export const SortSelect = ({ value, onChange, totalCards }: SortSelectProps) => {
  const { t } = useTranslation();
  
  return (
    <div className="flex items-center justify-between mb-6">
      <p className="text-muted-foreground">
        <span className="font-semibold text-foreground">{totalCards}</span> {t('creditCards.cardsFound', { count: totalCards })}
      </p>
      <div className="flex items-center gap-2">
        <ArrowUpDown className="w-4 h-4 text-muted-foreground" />
        <Select value={value} onValueChange={onChange}>
          <SelectTrigger className="w-48">
            <SelectValue placeholder={t('creditCards.sort.placeholder')} />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="rating">{t('creditCards.sort.bestRating')}</SelectItem>
            <SelectItem value="annualFee">{t('creditCards.sort.annualFeeAsc')}</SelectItem>
            <SelectItem value="rewardsRate">{t('creditCards.sort.rewardsRateDesc')}</SelectItem>
            <SelectItem value="interestRate">{t('creditCards.sort.interestRateAsc')}</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};
