import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';

interface BudgetItem {
  id: string;
  label: string;
  value: number;
}

interface BudgetInputSectionProps {
  title: string;
  items: BudgetItem[];
  onItemChange: (id: string, value: number) => void;
  icon: React.ReactNode;
}

export const BudgetInputSection = ({ 
  title, 
  items, 
  onItemChange, 
  icon 
}: BudgetInputSectionProps) => (
  <Card className="print:shadow-none print:border">
    <CardHeader className="pb-4">
      <CardTitle className="flex items-center gap-3 text-lg">
        {icon}
        {title}
      </CardTitle>
    </CardHeader>
    <CardContent className="space-y-3">
      {items.map(item => (
        <div key={item.id} className="flex items-center gap-3">
          <label htmlFor={item.id} className="flex-1 text-sm text-muted-foreground">
            {item.label}
          </label>
          <div className="relative w-32">
            <Input
              id={item.id}
              type="text"
              inputMode="decimal"
              value={item.value || ''}
              onChange={(e) => {
                const value = e.target.value.replace(/[^0-9.,]/g, '').replace(',', '.');
                onItemChange(item.id, parseFloat(value) || 0);
              }}
              className="pr-8 text-right [appearance:textfield]"
              placeholder="0"
            />
            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground text-sm">$</span>
          </div>
        </div>
      ))}
    </CardContent>
  </Card>
);
