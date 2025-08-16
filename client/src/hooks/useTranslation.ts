
import { useTranslation as useI18nTranslation, UseTranslationResponse } from 'react-i18next';
import { supabase } from '../services/supabaseClient';
import { useCallback } from 'react';

interface ExtendedTranslationResponse extends UseTranslationResponse<string> {
  syncTranslation: (key: string, value: string, language?: string) => Promise<void>;
  getTranslations: (language?: string) => Promise<Record<string, string>>;
}

export const useTranslation = (namespace?: string): ExtendedTranslationResponse => {
  const translation = useI18nTranslation(namespace);
  
  const syncTranslation = useCallback(async (key: string, value: string, language?: string) => {
    const lang = language || translation.i18n.language;
    const ns = namespace || 'common';
    
    try {
      await supabase
        .from('translations')
        .upsert({
          language: lang,
          namespace: ns,
          key,
          value,
          updated_at: new Date().toISOString()
        });
      
      // Update local i18n resources
      translation.i18n.addResource(lang, ns, key, value);
    } catch (error) {
      console.error('Failed to sync translation:', error);
    }
  }, [translation.i18n, namespace]);

  const getTranslations = useCallback(async (language?: string) => {
    const lang = language || translation.i18n.language;
    const ns = namespace || 'common';
    
    try {
      const { data, error } = await supabase
        .from('translations')
        .select('key, value')
        .eq('language', lang)
        .eq('namespace', ns);

      if (error) throw error;

      return data?.reduce((acc: Record<string, string>, item) => {
        acc[item.key] = item.value;
        return acc;
      }, {}) || {};
    } catch (error) {
      console.error('Failed to get translations:', error);
      return {};
    }
  }, [translation.i18n.language, namespace]);

  return {
    ...translation,
    syncTranslation,
    getTranslations,
  };
};
