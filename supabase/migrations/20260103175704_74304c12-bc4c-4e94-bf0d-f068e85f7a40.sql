-- Create brokerage_platforms table
CREATE TABLE public.brokerage_platforms (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  slug TEXT NOT NULL UNIQUE,
  name TEXT NOT NULL,
  logo TEXT,
  type TEXT NOT NULL DEFAULT 'courtier',
  transaction_fee_stocks TEXT NOT NULL,
  transaction_fee_etf TEXT NOT NULL,
  monthly_fee TEXT NOT NULL,
  accounts TEXT[] NOT NULL DEFAULT '{}',
  markets_access TEXT[] NOT NULL DEFAULT '{}',
  has_options BOOLEAN NOT NULL DEFAULT false,
  has_crypto BOOLEAN NOT NULL DEFAULT false,
  has_mobile_app BOOLEAN NOT NULL DEFAULT true,
  has_french BOOLEAN NOT NULL DEFAULT true,
  regulation TEXT[] NOT NULL DEFAULT '{}',
  level TEXT NOT NULL DEFAULT 'intermediaire',
  products TEXT[] NOT NULL DEFAULT '{}',
  strengths TEXT[] NOT NULL DEFAULT '{}',
  weaknesses TEXT[] NOT NULL DEFAULT '{}',
  affiliate_link TEXT NOT NULL DEFAULT '#',
  rating NUMERIC NOT NULL DEFAULT 0,
  ideal_for TEXT NOT NULL,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.brokerage_platforms ENABLE ROW LEVEL SECURITY;

-- Create policy for public read access (active platforms only)
CREATE POLICY "Brokerage platforms are publicly readable"
ON public.brokerage_platforms
FOR SELECT
USING (is_active = true);

-- Create trigger for automatic timestamp updates
CREATE TRIGGER update_brokerage_platforms_updated_at
BEFORE UPDATE ON public.brokerage_platforms
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Add comment for documentation
COMMENT ON TABLE public.brokerage_platforms IS 'Stores brokerage platform data for the comparator';