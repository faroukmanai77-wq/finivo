-- Add slug column to credit_cards table
ALTER TABLE public.credit_cards ADD COLUMN slug text;

-- Create unique index on slug
CREATE UNIQUE INDEX idx_credit_cards_slug ON public.credit_cards(slug);

-- Update existing cards with slugs based on their names
UPDATE public.credit_cards SET slug = 
  LOWER(
    REGEXP_REPLACE(
      REGEXP_REPLACE(
        REGEXP_REPLACE(
          REGEXP_REPLACE(name, '[éèêë]', 'e', 'g'),
          '[àâä]', 'a', 'g'
        ),
        '[ùûü]', 'u', 'g'
      ),
      '[^a-zA-Z0-9]+', '-', 'g'
    )
  );

-- Remove trailing hyphens
UPDATE public.credit_cards SET slug = TRIM(BOTH '-' FROM slug);

-- Make slug NOT NULL after populating
ALTER TABLE public.credit_cards ALTER COLUMN slug SET NOT NULL;