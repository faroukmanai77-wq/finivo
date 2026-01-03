import { BrokeragePlatform } from '@/types/brokerage';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Check, X } from 'lucide-react';

interface BrokerageComparisonTableProps {
  platforms: BrokeragePlatform[];
}

export const BrokerageComparisonTable = ({ platforms }: BrokerageComparisonTableProps) => {
  return (
    <div className="w-full overflow-x-auto rounded-xl border border-border bg-card">
      <Table>
        <TableHeader>
          <TableRow className="bg-muted/50">
            <TableHead className="font-bold text-foreground min-w-[160px]">Plateforme</TableHead>
            <TableHead className="font-bold text-foreground text-center">Frais actions</TableHead>
            <TableHead className="font-bold text-foreground text-center">ETF gratuits</TableHead>
            <TableHead className="font-bold text-foreground text-center">CELI / REER</TableHead>
            <TableHead className="font-bold text-foreground text-center">Options</TableHead>
            <TableHead className="font-bold text-foreground text-center">Crypto</TableHead>
            <TableHead className="font-bold text-foreground min-w-[120px]">Idéal pour</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {platforms.map((platform) => (
            <TableRow key={platform.id} className="hover:bg-muted/30 transition-colors">
              <TableCell className="font-semibold text-foreground">
                {platform.name}
              </TableCell>
              <TableCell className="text-center">
                <span className={platform.transactionFeeStocks === '0 $' ? 'text-accent font-semibold' : 'text-muted-foreground'}>
                  {platform.transactionFeeStocks}
                </span>
              </TableCell>
              <TableCell className="text-center">
                {platform.transactionFeeETF.includes('0 $') || platform.transactionFeeETF === '0 $' ? (
                  <Badge className="bg-accent/10 text-accent border-0">
                    <Check className="w-3 h-3 mr-1" />
                    Oui
                  </Badge>
                ) : (
                  <Badge variant="secondary" className="bg-muted text-muted-foreground border-0">
                    Payant
                  </Badge>
                )}
              </TableCell>
              <TableCell className="text-center">
                {platform.accounts.includes('CELI') && platform.accounts.includes('REER') ? (
                  <Check className="w-5 h-5 text-accent mx-auto" />
                ) : (
                  <X className="w-5 h-5 text-muted-foreground mx-auto" />
                )}
              </TableCell>
              <TableCell className="text-center">
                {platform.hasOptions ? (
                  <Check className="w-5 h-5 text-accent mx-auto" />
                ) : (
                  <X className="w-5 h-5 text-muted-foreground mx-auto" />
                )}
              </TableCell>
              <TableCell className="text-center">
                {platform.hasCrypto ? (
                  <Check className="w-5 h-5 text-accent mx-auto" />
                ) : (
                  <X className="w-5 h-5 text-muted-foreground mx-auto" />
                )}
              </TableCell>
              <TableCell>
                <Badge variant="outline" className="text-xs font-medium">
                  {platform.idealFor}
                </Badge>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};
