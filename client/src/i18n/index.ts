
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import HttpBackend from 'i18next-http-backend';
import { supabase } from '../services/supabaseClient';

// Custom backend to load translations from Supabase
const SupabaseBackend = {
  type: 'backend',
  init: function() {},
  read: async function(language: string, namespace: string, callback: Function) {
    try {
      const { data, error } = await supabase
        .from('translations')
        .select('*')
        .eq('language', language)
        .eq('namespace', namespace);

      if (error) throw error;

      const translations = data?.reduce((acc: any, item: any) => {
        acc[item.key] = item.value;
        return acc;
      }, {}) || {};

      callback(null, translations);
    } catch (error) {
      console.error('Failed to load translations from Supabase:', error);
      callback(error, {});
    }
  },
  create: async function(languages: string[], namespace: string, key: string, fallbackValue: string) {
    try {
      const promises = languages.map(language => 
        supabase
          .from('translations')
          .upsert({ 
            language, 
            namespace, 
            key, 
            value: fallbackValue,
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString()
          })
      );
      
      await Promise.all(promises);
    } catch (error) {
      console.error('Failed to create translations in Supabase:', error);
    }
  }
};

i18n
  .use(HttpBackend)
  .use(SupabaseBackend as any)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: 'en',
    debug: process.env.NODE_ENV === 'development',
    
    interpolation: {
      escapeValue: false,
    },
    
    detection: {
      order: ['localStorage', 'navigator', 'htmlTag'],
      caches: ['localStorage'],
    },
    
    backend: {
      loadPath: '/locales/{{lng}}/{{ns}}.json',
      allowMultiLoading: false,
    },
    
    react: {
      useSuspense: false,
    },
    
    resources: {
      en: {
        common: {
          loading: 'Loading...',
          save: 'Save',
          cancel: 'Cancel',
          delete: 'Delete',
          edit: 'Edit',
          close: 'Close',
          confirm: 'Confirm',
          error: 'An error occurred',
          success: 'Success',
          warning: 'Warning',
          info: 'Information',
        },
        navigation: {
          dashboard: 'Dashboard',
          calendar: 'Calendar',
          ideation: 'Ideation',
          strategy: 'Strategy',
          library: 'Library',
          analytics: 'Analytics',
          collaboration: 'Collaboration',
          social: 'Social Media',
        },
        social: {
          postCreator: 'Create Post',
          schedulePost: 'Schedule Post',
          connectedAccounts: 'Connected Accounts',
          analytics: 'Analytics',
          trends: 'Trends',
          inbox: 'Inbox',
        }
      },
      es: {
        common: {
          loading: 'Cargando...',
          save: 'Guardar',
          cancel: 'Cancelar',
          delete: 'Eliminar',
          edit: 'Editar',
          close: 'Cerrar',
          confirm: 'Confirmar',
          error: 'Ocurrió un error',
          success: 'Éxito',
          warning: 'Advertencia',
          info: 'Información',
        },
        navigation: {
          dashboard: 'Panel',
          calendar: 'Calendario',
          ideation: 'Ideación',
          strategy: 'Estrategia',
          library: 'Biblioteca',
          analytics: 'Analíticas',
          collaboration: 'Colaboración',
          social: 'Redes Sociales',
        },
        social: {
          postCreator: 'Crear Publicación',
          schedulePost: 'Programar Publicación',
          connectedAccounts: 'Cuentas Conectadas',
          analytics: 'Analíticas',
          trends: 'Tendencias',
          inbox: 'Bandeja de Entrada',
        }
      },
      fr: {
        common: {
          loading: 'Chargement...',
          save: 'Enregistrer',
          cancel: 'Annuler',
          delete: 'Supprimer',
          edit: 'Modifier',
          close: 'Fermer',
          confirm: 'Confirmer',
          error: 'Une erreur est survenue',
          success: 'Succès',
          warning: 'Avertissement',
          info: 'Information',
        },
        navigation: {
          dashboard: 'Tableau de Bord',
          calendar: 'Calendrier',
          ideation: 'Idéation',
          strategy: 'Stratégie',
          library: 'Bibliothèque',
          analytics: 'Analytiques',
          collaboration: 'Collaboration',
          social: 'Médias Sociaux',
        },
        social: {
          postCreator: 'Créer une Publication',
          schedulePost: 'Programmer une Publication',
          connectedAccounts: 'Comptes Connectés',
          analytics: 'Analytiques',
          trends: 'Tendances',
          inbox: 'Boîte de Réception',
        }
      }
    }
  });

export default i18n;
