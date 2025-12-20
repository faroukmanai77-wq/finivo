import { CreditCard } from '@/types/creditCard';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ArrowUpDown } from 'lucide-react';

interface SortSelectProps {
  value: string;
  onChange: (value: 'rating' | 'annualFee' | 'rewardsRate' | 'interestRate') => void;
  totalCards: number;
}

export const SortSelect = ({ value, onChange, totalCards }: SortSelectProps) => {
  return (
    <div className="flex items-center justify-between mb-6">
      <p className="text-muted-foreground">
        <span className="font-semibold text-foreground">{totalCards}</span> cartes trouvées
      </p>
      <div className="flex items-center gap-2">
        <ArrowUpDown className="w-4 h-4 text-muted-foreground" />
        <Select value={value} onValueChange={onChange}>
          <SelectTrigger className="w-48">
            <SelectValue placeholder="Trier par" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="rating">Meilleure note</SelectItem>
            <SelectItem value="annualFee">Frais annuels (croissant)</SelectItem>
            <SelectItem value="rewardsRate">Taux de remise (décroissant)</SelectItem>
            <SelectItem value="interestRate">Taux d'intérêt (croissant)</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};
