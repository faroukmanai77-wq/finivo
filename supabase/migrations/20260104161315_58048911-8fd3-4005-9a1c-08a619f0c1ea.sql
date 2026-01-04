-- Create books table for the library
CREATE TABLE public.books (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  slug TEXT NOT NULL UNIQUE,
  title TEXT NOT NULL,
  author TEXT NOT NULL,
  cover_image_url TEXT,
  category TEXT NOT NULL,
  sub_categories TEXT[] NOT NULL DEFAULT '{}',
  level TEXT NOT NULL DEFAULT 'beginner',
  language TEXT NOT NULL DEFAULT 'FR',
  short_description TEXT NOT NULL,
  full_description TEXT,
  why_read_this_book TEXT,
  reader_profile TEXT,
  themes TEXT[] NOT NULL DEFAULT '{}',
  quote TEXT,
  affiliate_link TEXT NOT NULL DEFAULT '#',
  affiliate_platform TEXT DEFAULT 'amazon',
  rating NUMERIC,
  is_featured BOOLEAN NOT NULL DEFAULT false,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.books ENABLE ROW LEVEL SECURITY;

-- Create policy for public read access (active books only)
CREATE POLICY "Books are publicly readable"
ON public.books
FOR SELECT
USING (is_active = true);

-- Create trigger for automatic timestamp updates
CREATE TRIGGER update_books_updated_at
BEFORE UPDATE ON public.books
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Add comment for documentation
COMMENT ON TABLE public.books IS 'Stores book data for the library page';