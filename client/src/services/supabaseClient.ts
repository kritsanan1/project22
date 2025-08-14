import { createClient } from '@supabase/supabase-js'
import type { LighthouseReport } from './lighthouseService';
import type { SEOMetrics } from './seoService';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseKey) {
  console.warn('Supabase credentials not found. Database features will be limited.');
}

export const supabase = createClient(
  supabaseUrl || 'https://placeholder.supabase.co',
  supabaseKey || 'placeholder-key'
);

// SEO Tracking Functions
export const seoTracking = {
  // Track page views
  async trackPageView(path: string, title: string, userId?: string) {
    try {
      await supabase
        .from('page_views')
        .insert({
          path,
          title,
          user_id: userId,
          timestamp: new Date().toISOString(),
          user_agent: navigator.userAgent,
          referrer: document.referrer,
        });
    } catch (error) {
      console.error('Failed to track page view:', error);
    }
  },

  // Store Lighthouse audit results
  async storeLighthouseResult(report: LighthouseReport) {
    try {
      await supabase
        .from('lighthouse_audits')
        .insert({
          url: report.url,
          timestamp: report.timestamp,
          performance_score: report.metrics.performance,
          accessibility_score: report.metrics.accessibility,
          best_practices_score: report.metrics.bestPractices,
          seo_score: report.metrics.seo,
          pwa_score: report.metrics.pwa,
          first_contentful_paint: report.metrics.firstContentfulPaint,
          largest_contentful_paint: report.metrics.largestContentfulPaint,
          cumulative_layout_shift: report.metrics.cumulativeLayoutShift,
          speed_index: report.metrics.speedIndex,
          opportunities: JSON.stringify(report.opportunities),
        });
    } catch (error) {
      console.error('Failed to store Lighthouse result:', error);
    }
  },

  // Store SEO metrics from Google Search Console
  async storeSEOMetrics(metrics: SEOMetrics) {
    try {
      await supabase
        .from('seo_metrics')
        .insert({
          total_clicks: metrics.totalClicks,
          total_impressions: metrics.totalImpressions,
          average_ctr: metrics.averageCTR,
          average_position: metrics.averagePosition,
          top_queries: JSON.stringify(metrics.topQueries),
          top_pages: JSON.stringify(metrics.topPages),
          timestamp: new Date().toISOString(),
        });
    } catch (error) {
      console.error('Failed to store SEO metrics:', error);
    }
  },

  // Get performance trends
  async getPerformanceTrends(days = 30) {
    try {
      const { data, error } = await supabase
        .from('lighthouse_audits')
        .select('*')
        .gte('timestamp', new Date(Date.now() - days * 24 * 60 * 60 * 1000).toISOString())
        .order('timestamp', { ascending: true });

      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Failed to get performance trends:', error);
      return [];
    }
  },

  // Get popular pages
  async getPopularPages(days = 30) {
    try {
      const { data, error } = await supabase
        .from('page_views')
        .select('path, title, count(*)')
        .gte('timestamp', new Date(Date.now() - days * 24 * 60 * 60 * 1000).toISOString())
        .group('path, title')
        .order('count', { ascending: false })
        .limit(10);

      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Failed to get popular pages:', error);
      return [];
    }
  },
};

export default supabase;