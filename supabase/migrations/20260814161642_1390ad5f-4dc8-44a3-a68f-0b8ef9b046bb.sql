-- 1. Storage: blog-images hardening
DROP POLICY IF EXISTS "Authenticated users can upload blog images" ON storage.objects;

CREATE POLICY "Authenticated users can upload blog images"
ON storage.objects FOR INSERT TO authenticated
WITH CHECK (bucket_id = 'blog-images' AND owner = auth.uid());

CREATE POLICY "Owners can update their blog images"
ON storage.objects FOR UPDATE TO authenticated
USING (bucket_id = 'blog-images' AND owner = auth.uid())
WITH CHECK (bucket_id = 'blog-images' AND owner = auth.uid());

CREATE POLICY "Owners can delete their blog images"
ON storage.objects FOR DELETE TO authenticated
USING (bucket_id = 'blog-images' AND owner = auth.uid());

-- 2. Disable the unused GraphQL API surface (REST/PostgREST access is unaffected)
REVOKE USAGE ON SCHEMA graphql_public FROM anon, authenticated;
REVOKE ALL ON ALL FUNCTIONS IN SCHEMA graphql_public FROM anon, authenticated;
REVOKE USAGE ON SCHEMA graphql FROM anon, authenticated;
REVOKE ALL ON ALL FUNCTIONS IN SCHEMA graphql FROM anon, authenticated;