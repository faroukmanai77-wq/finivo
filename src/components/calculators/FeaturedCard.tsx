import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { Star, ArrowRight, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface FeaturedCardProps {
  type: 'transfer' | 'cashback' | 'savings';
}

export const FeaturedCard = ({ type }: FeaturedCardProps) => {
  const [card, setCard] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchFeaturedCard = async () => {
      try {
        // Map type to category
        const categoryMap: Record<string, string[]> = {
          transfer: ['low-interest'],
          cashback: ['cashback'],
          savings: ['no-fee', 'cashback']
        };

        const categories = categoryMap[type] || ['cashback'];
        
        const { data, error } = await supabase
          .from('credit_cards')
          .select('*')
          .eq('is_active', true)
          .overlaps('categories', categories)
          .order('rating', { ascending: false })
          .limit(1);

        if (error) throw error;
        if (data && data.length > 0) {
          setCard(data[0]);
        }
      } catch (error) {
        console.error('Error fetching featured card:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchFeaturedCard();
  }, [type]);

  if (isLoading || !card) return null;

  const getTitle = () => {
    switch (type) {
      case 'transfer': return 'Consolidez vos dettes';
      case 'cashback': return 'Maximisez vos remises';
      case 'savings': return 'Épargnez sur vos achats';
      default: return 'Produit vedette';
    }
  };

  const getSubtitle = () => {
    switch (type) {
      case 'transfer': return 'Carte recommandée pour le transfert de solde';
      case 'cashback': return 'Carte avec les meilleures remises en argent';
      case 'savings': return 'Carte sans frais avec remises';
      default: return 'Carte recommandée';
    }
  };

  return (
    <div className="bg-gradient-to-r from-primary/5 via-primary/10 to-accent/5 rounded-2xl p-6 border border-primary/20">
      <div className="flex items-center gap-2 mb-4">
        <Sparkles className="w-5 h-5 text-primary" />
        <span className="text-sm font-semibold text-primary">{getTitle()}</span>
      </div>
      
      <div className="flex flex-col md:flex-row gap-6 items-center">
        {/* Card Image */}
        <div className="w-32 h-20 bg-card rounded-lg overflow-hidden flex-shrink-0 shadow-md">
          {card.image_url ? (
            <img 
              src={card.image_url} 
              alt={card.name}
              className="w-full h-full object-contain p-2"
            />
          ) : (
            <div className="w-full h-full bg-muted flex items-center justify-center text-muted-foreground text-xs">
              {card.issuer}
            </div>
          )}
        </div>

        {/* Card Info */}
        <div className="flex-1 text-center md:text-left">
          <p className="text-xs text-muted-foreground mb-1">{getSubtitle()}</p>
          <h3 className="text-lg font-bold text-foreground mb-1">{card.name}</h3>
          <div className="flex items-center justify-center md:justify-start gap-3 text-sm text-muted-foreground">
            <span className="flex items-center gap-1">
              <Star className="w-4 h-4 text-warning fill-warning" />
              {Number(card.rating).toFixed(1)}
            </span>
            <span>•</span>
            <span>{Number(card.annual_fee) === 0 ? 'Sans frais' : `${card.annual_fee}$/an`}</span>
            {card.rewards_rate > 0 && (
              <>
                <span>•</span>
                <span>{card.rewards_rate}% remises</span>
              </>
            )}
          </div>
        </div>

        {/* CTA */}
        <div className="flex flex-col gap-2">
          <Button asChild className="btn-gradient font-semibold gap-2">
            <a href={card.affiliate_link} target="_blank" rel="noopener noreferrer">
              Voir l'offre
              <ArrowRight className="w-4 h-4" />
            </a>
          </Button>
          <Link 
            to={`/carte/${card.slug || card.id}`}
            className="text-sm text-center text-muted-foreground hover:text-primary transition-colors"
          >
            Voir les détails
          </Link>
        </div>
      </div>
    </div>
  );
};
