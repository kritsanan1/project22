
-- Create translations table
CREATE TABLE IF NOT EXISTS public.translations (
    id BIGSERIAL PRIMARY KEY,
    language VARCHAR(10) NOT NULL,
    namespace VARCHAR(100) NOT NULL DEFAULT 'common',
    key VARCHAR(255) NOT NULL,
    value TEXT NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create unique constraint to prevent duplicate translations
ALTER TABLE public.translations 
ADD CONSTRAINT unique_translation 
UNIQUE (language, namespace, key);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_translations_language ON public.translations(language);
CREATE INDEX IF NOT EXISTS idx_translations_namespace ON public.translations(namespace);
CREATE INDEX IF NOT EXISTS idx_translations_key ON public.translations(key);
CREATE INDEX IF NOT EXISTS idx_translations_language_namespace ON public.translations(language, namespace);

-- Enable RLS (Row Level Security)
ALTER TABLE public.translations ENABLE ROW LEVEL SECURITY;

-- Create policies for translations
CREATE POLICY "Translations are viewable by everyone" 
ON public.translations FOR SELECT 
USING (true);

CREATE POLICY "Authenticated users can insert translations" 
ON public.translations FOR INSERT 
WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can update translations" 
ON public.translations FOR UPDATE 
USING (auth.role() = 'authenticated');

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create trigger for updated_at
CREATE TRIGGER handle_translations_updated_at
    BEFORE UPDATE ON public.translations
    FOR EACH ROW
    EXECUTE PROCEDURE public.handle_updated_at();
