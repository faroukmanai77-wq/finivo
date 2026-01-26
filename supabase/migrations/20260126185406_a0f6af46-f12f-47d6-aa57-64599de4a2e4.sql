-- Add English translation columns to blog_posts
ALTER TABLE public.blog_posts 
ADD COLUMN IF NOT EXISTS title_en TEXT,
ADD COLUMN IF NOT EXISTS excerpt_en TEXT,
ADD COLUMN IF NOT EXISTS content_en TEXT,
ADD COLUMN IF NOT EXISTS category_en TEXT,
ADD COLUMN IF NOT EXISTS tags_en TEXT[] DEFAULT '{}'::text[];

-- Add English translation columns to credit_cards
ALTER TABLE public.credit_cards 
ADD COLUMN IF NOT EXISTS name_en TEXT,
ADD COLUMN IF NOT EXISTS features_en TEXT[] DEFAULT '{}'::text[],
ADD COLUMN IF NOT EXISTS welcome_bonus_en TEXT,
ADD COLUMN IF NOT EXISTS rewards_type_en TEXT;

-- Add English translation columns to books
ALTER TABLE public.books 
ADD COLUMN IF NOT EXISTS title_en TEXT,
ADD COLUMN IF NOT EXISTS short_description_en TEXT,
ADD COLUMN IF NOT EXISTS full_description_en TEXT,
ADD COLUMN IF NOT EXISTS why_read_this_book_en TEXT,
ADD COLUMN IF NOT EXISTS reader_profile_en TEXT,
ADD COLUMN IF NOT EXISTS quote_en TEXT,
ADD COLUMN IF NOT EXISTS category_en TEXT,
ADD COLUMN IF NOT EXISTS sub_categories_en TEXT[] DEFAULT '{}'::text[],
ADD COLUMN IF NOT EXISTS themes_en TEXT[] DEFAULT '{}'::text[];

-- Add English translation columns to brokerage_platforms
ALTER TABLE public.brokerage_platforms 
ADD COLUMN IF NOT EXISTS ideal_for_en TEXT,
ADD COLUMN IF NOT EXISTS strengths_en TEXT[] DEFAULT '{}'::text[],
ADD COLUMN IF NOT EXISTS weaknesses_en TEXT[] DEFAULT '{}'::text[],
ADD COLUMN IF NOT EXISTS type_en TEXT,
ADD COLUMN IF NOT EXISTS level_en TEXT;