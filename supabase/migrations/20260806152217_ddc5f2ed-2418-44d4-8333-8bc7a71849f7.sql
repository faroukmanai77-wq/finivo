CREATE POLICY "Prevent public inserts on credit_cards"
ON public.credit_cards FOR INSERT TO anon, authenticated WITH CHECK (false);

CREATE POLICY "Prevent public updates on credit_cards"
ON public.credit_cards FOR UPDATE TO anon, authenticated USING (false) WITH CHECK (false);

CREATE POLICY "Prevent public deletes on credit_cards"
ON public.credit_cards FOR DELETE TO anon, authenticated USING (false);