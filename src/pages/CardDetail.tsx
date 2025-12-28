import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { supabase } from '@/integrations/supabase/client';
import { 
  ArrowLeft, 
  Star, 
  ExternalLink, 
  DollarSign, 
  Percent, 
  Gift, 
  CreditCard as CreditCardIcon,
  Check,
  Shield,
  Plane,
  ShoppingCart,
  Building2,
  GraduationCap,
  Sparkles,
  TrendingUp,
  Info
} from 'lucide-react';

interface CardDetail {
  id: string;
  name: string;
  issuer: string;
  image_url: string | null;
  annual_fee: number;
  first_year_free: boolean;
  interest_rate: number;
  cash_advance_rate: number;
  rewards_rate: number;
  rewards_type: string;
  welcome_bonus: string | null;
  welcome_bonus_value: number | null;
  min_income: number | null;
  features: string[] | null;
  categories: string[];
  affiliate_link: string;
  rating: number;
}

const categoryConfig: Record<string, { label: string; icon: React.ElementType; color: string }> = {
  travel: { label: 'Voyage', icon: Plane, color: 'bg-blue-500/10 text-blue-500' },
  cashback: { label: 'Remises', icon: DollarSign, color: 'bg-green-500/10 text-green-500' },
  rewards: { label: 'Récompenses', icon: Gift, color: 'bg-purple-500/10 text-purple-500' },
  'no-fee': { label: 'Sans frais', icon: CreditCardIcon, color: 'bg-slate-500/10 text-slate-500' },
  student: { label: 'Étudiant', icon: GraduationCap, color: 'bg-orange-500/10 text-orange-500' },
  premium: { label: 'Premium', icon: Sparkles, color: 'bg-amber-500/10 text-amber-500' },
  business: { label: 'Affaires', icon: Building2, color: 'bg-indigo-500/10 text-indigo-500' },
  grocery: { label: 'Épicerie', icon: ShoppingCart, color: 'bg-emerald-500/10 text-emerald-500' },
};

const issuerGradients: Record<string, string> = {
  TD: 'from-green-600 to-green-400',
  BMO: 'from-blue-700 to-blue-500',
  RBC: 'from-blue-600 to-blue-400',
  CIBC: 'from-red-600 to-red-400',
  Scotiabank: 'from-red-700 to-red-500',
  Desjardins: 'from-green-700 to-teal-500',
  Tangerine: 'from-orange-500 to-orange-400',
  default: 'from-primary to-blue-400'
};

const CardDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [card, setCard] = useState<CardDetail | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCard = async () => {
      if (!id) return;
      
      try {
        const { data, error } = await supabase
          .from('credit_cards')
          .select('*')
          .eq('id', id)
          .eq('is_active', true)
          .maybeSingle();

        if (error) throw error;
        
        if (!data) {
          setError('Carte non trouvée');
        } else {
          setCard(data);
        }
      } catch (err) {
        console.error('Error fetching card:', err);
        setError('Erreur lors du chargement de la carte');
      } finally {
        setIsLoading(false);
      }
    };

    fetchCard();
  }, [id]);

  const gradient = card ? (issuerGradients[card.issuer] || issuerGradients.default) : issuerGradients.default;

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container mx-auto px-4 py-12">
          <Skeleton className="h-8 w-32 mb-8" />
          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-6">
              <Skeleton className="h-64 rounded-2xl" />
              <Skeleton className="h-48 rounded-2xl" />
            </div>
            <div>
              <Skeleton className="h-96 rounded-2xl" />
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (error || !card) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container mx-auto px-4 py-20">
          <div className="text-center">
            <div className="w-20 h-20 rounded-2xl bg-muted/50 flex items-center justify-center mx-auto mb-6">
              <CreditCardIcon className="w-10 h-10 text-muted-foreground" />
            </div>
            <h1 className="text-2xl font-bold text-foreground mb-4">{error || 'Carte non trouvée'}</h1>
            <p className="text-muted-foreground mb-8">
              La carte que vous recherchez n'existe pas ou n'est plus disponible.
            </p>
            <Link to="/">
              <Button className="gap-2">
                <ArrowLeft className="w-4 h-4" />
                Retour à l'accueil
              </Button>
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero section */}
      <section className="relative overflow-hidden py-12 lg:py-20" style={{ background: 'var(--gradient-hero)' }}>
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-[100px]" />
          <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-accent/15 rounded-full blur-[80px]" />
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <Link 
            to="/#comparer" 
            className="inline-flex items-center gap-2 text-secondary-foreground/70 hover:text-secondary-foreground transition-colors mb-8"
          >
            <ArrowLeft className="w-4 h-4" />
            Retour aux cartes
          </Link>
          
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Card info */}
            <div>
              <div className="flex flex-wrap gap-2 mb-4">
                {card.categories.map((cat) => {
                  const config = categoryConfig[cat];
                  if (!config) return null;
                  const Icon = config.icon;
                  return (
                    <Badge key={cat} variant="secondary" className="bg-secondary-foreground/10 text-secondary-foreground border-secondary-foreground/20">
                      <Icon className="w-3 h-3 mr-1" />
                      {config.label}
                    </Badge>
                  );
                })}
              </div>
              
              <h1 className="text-3xl lg:text-4xl xl:text-5xl font-extrabold text-secondary-foreground mb-3">
                {card.name}
              </h1>
              
              <p className="text-xl text-secondary-foreground/70 mb-6">
                Par {card.issuer}
              </p>
              
              <div className="flex items-center gap-4 mb-8">
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star 
                      key={i} 
                      className={`w-5 h-5 ${i < Math.floor(card.rating) ? 'text-warning fill-warning' : 'text-secondary-foreground/30'}`}
                    />
                  ))}
                </div>
                <span className="text-lg font-semibold text-secondary-foreground">{card.rating.toFixed(1)}</span>
              </div>
              
              {card.welcome_bonus && (
                <div className="inline-flex items-center gap-3 bg-accent/20 backdrop-blur-sm px-5 py-3 rounded-xl border border-accent/30">
                  <Gift className="w-5 h-5 text-accent" />
                  <div>
                    <p className="text-sm text-secondary-foreground/70">Bonus de bienvenue</p>
                    <p className="font-semibold text-secondary-foreground">{card.welcome_bonus}</p>
                  </div>
                </div>
              )}
            </div>
            
            {/* Card visual */}
            <div className="flex justify-center lg:justify-end">
              <div className="relative">
                <div className="absolute inset-0 bg-primary/30 rounded-3xl blur-[40px] scale-90" />
                {card.image_url ? (
                  <img 
                    src={card.image_url} 
                    alt={card.name}
                    className="relative w-80 h-auto max-h-64 object-contain rounded-2xl shadow-2xl transform hover:scale-105 transition-transform duration-500"
                  />
                ) : (
                  <div 
                    className={`relative w-80 h-48 rounded-2xl bg-gradient-to-br ${gradient} shadow-2xl p-6 transform hover:scale-105 transition-transform duration-500`}
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-50" />
                    
                    <div className="relative h-full flex flex-col justify-between">
                      <div className="flex justify-between items-start">
                        <div className="w-12 h-9 rounded-md bg-gradient-to-br from-yellow-300 to-yellow-500 shadow-lg" />
                        <CreditCardIcon className="w-8 h-8 text-primary-foreground/80" />
                      </div>
                      
                      <div>
                        <p className="text-primary-foreground font-bold text-lg">{card.issuer}</p>
                        <p className="text-primary-foreground/80 text-sm">{card.name}</p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-12 lg:py-20">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Main content */}
            <div className="lg:col-span-2 space-y-8">
              {/* Key stats */}
              <div className="card-elevated rounded-2xl p-6">
                <h2 className="text-xl font-bold text-foreground mb-6 flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-primary" />
                  Informations clés
                </h2>
                
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="text-center p-4 rounded-xl bg-muted/30">
                    <DollarSign className="w-6 h-6 text-primary mx-auto mb-2" />
                    <p className="text-xs text-muted-foreground mb-1">Frais annuels</p>
                    <p className="text-xl font-bold text-foreground">
                      {card.annual_fee === 0 ? 'Gratuit' : `${card.annual_fee}$`}
                    </p>
                    {card.first_year_free && card.annual_fee > 0 && (
                      <p className="text-xs text-accent font-medium mt-1">1ère année gratuite</p>
                    )}
                  </div>
                  
                  <div className="text-center p-4 rounded-xl bg-muted/30">
                    <Percent className="w-6 h-6 text-accent mx-auto mb-2" />
                    <p className="text-xs text-muted-foreground mb-1">Remise max</p>
                    <p className="text-xl font-bold text-foreground">{card.rewards_rate}%</p>
                    <p className="text-xs text-muted-foreground mt-1">{card.rewards_type}</p>
                  </div>
                  
                  <div className="text-center p-4 rounded-xl bg-muted/30">
                    <CreditCardIcon className="w-6 h-6 text-warning mx-auto mb-2" />
                    <p className="text-xs text-muted-foreground mb-1">Taux d'intérêt</p>
                    <p className="text-xl font-bold text-foreground">{card.interest_rate}%</p>
                  </div>
                  
                  <div className="text-center p-4 rounded-xl bg-muted/30">
                    <Info className="w-6 h-6 text-muted-foreground mx-auto mb-2" />
                    <p className="text-xs text-muted-foreground mb-1">Avance de fonds</p>
                    <p className="text-xl font-bold text-foreground">{card.cash_advance_rate}%</p>
                  </div>
                </div>
              </div>
              
              {/* Features */}
              {card.features && card.features.length > 0 && (
                <div className="card-elevated rounded-2xl p-6">
                  <h2 className="text-xl font-bold text-foreground mb-6 flex items-center gap-2">
                    <Shield className="w-5 h-5 text-primary" />
                    Avantages et caractéristiques
                  </h2>
                  
                  <div className="grid md:grid-cols-2 gap-4">
                    {card.features.map((feature, index) => (
                      <div key={index} className="flex items-start gap-3 p-4 rounded-xl bg-muted/20 hover:bg-muted/30 transition-colors">
                        <div className="w-6 h-6 rounded-full bg-accent/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                          <Check className="w-4 h-4 text-accent" />
                        </div>
                        <p className="text-foreground">{feature}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              
              {/* Requirements */}
              {card.min_income && (
                <div className="card-elevated rounded-2xl p-6">
                  <h2 className="text-xl font-bold text-foreground mb-6 flex items-center gap-2">
                    <Info className="w-5 h-5 text-primary" />
                    Conditions d'admissibilité
                  </h2>
                  
                  <div className="flex items-center gap-4 p-4 rounded-xl bg-muted/20">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                      <DollarSign className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Revenu annuel minimum</p>
                      <p className="text-xl font-bold text-foreground">{card.min_income.toLocaleString('fr-CA')} $</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
            
            {/* Sidebar - CTA */}
            <div className="lg:col-span-1">
              <div className="card-elevated rounded-2xl p-6 sticky top-24">
                <div className="text-center mb-6">
                  <p className="text-sm text-muted-foreground mb-1">Frais annuels</p>
                  <p className="text-4xl font-extrabold text-foreground">
                    {card.annual_fee === 0 ? 'Gratuit' : `${card.annual_fee}$`}
                  </p>
                  {card.first_year_free && card.annual_fee > 0 && (
                    <Badge className="mt-2 bg-accent/10 text-accent border-accent/30">
                      1ère année gratuite
                    </Badge>
                  )}
                </div>
                
                {card.welcome_bonus_value && (
                  <div className="bg-accent/10 rounded-xl p-4 mb-6 text-center">
                    <Gift className="w-8 h-8 text-accent mx-auto mb-2" />
                    <p className="text-sm text-muted-foreground">Valeur du bonus</p>
                    <p className="text-2xl font-bold text-accent">{card.welcome_bonus_value}$</p>
                  </div>
                )}
                
                <a 
                  href={card.affiliate_link} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="block"
                >
                  <Button className="w-full btn-gradient h-14 text-lg font-semibold gap-2">
                    Faire une demande
                    <ExternalLink className="w-5 h-5" />
                  </Button>
                </a>
                
                <p className="text-xs text-muted-foreground text-center mt-4">
                  Vous serez redirigé vers le site officiel de {card.issuer}
                </p>
                
                <div className="border-t border-border mt-6 pt-6">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Shield className="w-4 h-4" />
                    <span>Demande sécurisée</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default CardDetail;
