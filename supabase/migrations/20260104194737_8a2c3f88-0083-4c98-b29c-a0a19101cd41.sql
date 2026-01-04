-- Create storage bucket for blog images
INSERT INTO storage.buckets (id, name, public)
VALUES ('blog-images', 'blog-images', true);

-- Allow public read access
CREATE POLICY "Blog images are publicly accessible"
ON storage.objects
FOR SELECT
USING (bucket_id = 'blog-images');

-- Allow authenticated users to upload (for future admin)
CREATE POLICY "Authenticated users can upload blog images"
ON storage.objects
FOR INSERT
WITH CHECK (bucket_id = 'blog-images');