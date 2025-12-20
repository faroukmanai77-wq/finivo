-- Create credit cards table
CREATE TABLE public.credit_cards (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  issuer TEXT NOT NULL,
  image_url TEXT,
  annual_fee DECIMAL(10,2) NOT NULL DEFAULT 0,
  first_year_free BOOLEAN DEFAULT false,
  interest_rate DECIMAL(5,2) NOT NULL,
  cash_advance_rate DECIMAL(5,2) NOT NULL,
  rewards_rate DECIMAL(5,2) NOT NULL DEFAULT 0,
  rewards_type TEXT NOT NULL CHECK (rewards_type IN ('cashback', 'points', 'miles')),
  welcome_bonus TEXT,
  welcome_bonus_value DECIMAL(10,2),
  min_income DECIMAL(12,2),
  features TEXT[] DEFAULT '{}',
  categories TEXT[] NOT NULL DEFAULT '{}',
  affiliate_link TEXT NOT NULL,
  rating DECIMAL(2,1) NOT NULL DEFAULT 0 CHECK (rating >= 0 AND rating <= 5),
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.credit_cards ENABLE ROW LEVEL SECURITY;

-- Create policy for public read access (anyone can view cards)
CREATE POLICY "Credit cards are publicly readable" 
ON public.credit_cards 
FOR SELECT 
USING (is_active = true);

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

-- Create trigger for automatic timestamp updates
CREATE TRIGGER update_credit_cards_updated_at
BEFORE UPDATE ON public.credit_cards
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Enable realtime for the credit_cards table
ALTER PUBLICATION supabase_realtime ADD TABLE public.credit_cards;

-- Insert initial data
INSERT INTO public.credit_cards (name, issuer, annual_fee, first_year_free, interest_rate, cash_advance_rate, rewards_rate, rewards_type, welcome_bonus, welcome_bonus_value, min_income, features, categories, affiliate_link, rating) VALUES
('Carte Visa Infinite TD Aéroplan', 'TD', 139, false, 20.99, 22.99, 1.5, 'miles', 'Jusqu''à 30 000 points Aéroplan', 600, 60000, ARRAY['Assurance voyage complète', 'Accès aux salons Maple Leaf', 'Aucun frais de conversion', 'Protection achats'], ARRAY['travel', 'premium', 'rewards'], 'https://example.com/td-aeroplan', 4.8),
('Carte Mastercard World Elite BMO', 'BMO', 150, false, 20.99, 22.99, 3, 'cashback', '5% remise les 3 premiers mois', 500, 80000, ARRAY['3% sur épicerie', '3% sur transport', 'Assurance voyage', 'Protection location auto'], ARRAY['cashback', 'premium', 'rewards'], 'https://example.com/bmo-world-elite', 4.7),
('Carte Visa Remises Desjardins', 'Desjardins', 0, true, 19.99, 21.99, 1.5, 'cashback', '20$ en remises Bonidollars', 20, NULL, ARRAY['1.5% remise sur tous les achats', 'Aucun frais annuel', 'Protection achats', 'Gestion mobile'], ARRAY['cashback', 'no-fee'], 'https://example.com/desjardins-remises', 4.5),
('Carte CIBC Dividendes', 'CIBC', 0, false, 19.99, 21.99, 2, 'cashback', '10% remise sur les premiers 2000$', 200, NULL, ARRAY['2% sur épicerie', '0.5% sur autres achats', 'Aucun frais annuel', 'Apple Pay compatible'], ARRAY['cashback', 'no-fee'], 'https://example.com/cibc-dividendes', 4.3),
('Carte RBC Avion Visa Infinite', 'RBC', 120, true, 20.99, 22.99, 1, 'points', '35 000 points Avion RBC', 350, 60000, ARRAY['Transfert vers partenaires aériens', 'Assurance voyage annulation', 'Protection location auto', 'Conciergerie voyage'], ARRAY['travel', 'rewards', 'premium'], 'https://example.com/rbc-avion', 4.6),
('Carte Tangerine Remises', 'Tangerine', 0, false, 19.95, 19.95, 2, 'cashback', NULL, NULL, NULL, ARRAY['2% dans 2 catégories au choix', '0.5% sur autres achats', 'Aucun frais annuel', 'Pas de revenu minimum'], ARRAY['cashback', 'no-fee', 'student'], 'https://example.com/tangerine', 4.4),
('Carte Scotiabank Momentum Visa Infinite', 'Scotiabank', 120, false, 20.99, 22.99, 4, 'cashback', '10% remise sur premiers achats', 400, 60000, ARRAY['4% sur épicerie et essence', '2% sur transport en commun', '1% sur achats récurrents', 'Assurance mobile'], ARRAY['cashback', 'premium', 'rewards'], 'https://example.com/scotiabank-momentum', 4.7),
('Carte Étudiant CIBC', 'CIBC', 0, false, 19.99, 21.99, 0.5, 'cashback', NULL, NULL, NULL, ARRAY['Aucun frais annuel', 'Limite de crédit adaptée', 'Gestion en ligne facile', 'Sans revenu minimum'], ARRAY['student', 'no-fee'], 'https://example.com/cibc-student', 4.0);