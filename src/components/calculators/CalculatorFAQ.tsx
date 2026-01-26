import { useTranslation } from 'react-i18next';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export interface FAQItem {
  question: string;
  answer: string;
}

interface CalculatorFAQProps {
  title?: string;
  items: FAQItem[];
}

export const CalculatorFAQ = ({ title, items }: CalculatorFAQProps) => {
  const { t } = useTranslation();
  const faqTitle = title || t('calculators.common.faq');

  return (
    <Card>
      <CardHeader>
        <CardTitle>{faqTitle}</CardTitle>
      </CardHeader>
      <CardContent>
        <Accordion type="single" collapsible className="w-full">
          {items.map((item, index) => (
            <AccordionItem key={index} value={`item-${index}`}>
              <AccordionTrigger className="text-left">{item.question}</AccordionTrigger>
              <AccordionContent className="text-muted-foreground">
                {item.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </CardContent>
    </Card>
  );
};
