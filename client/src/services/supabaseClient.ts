import { createClient } from '@supabase/supabase-js'
import type { LighthouseReport } from './lighthouseService';
import type { SEOMetrics } from './seoService';
import type { InsertMobileAnalytics } from '@shared/schema';

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
        .select('path, title')
        .gte('timestamp', new Date(Date.now() - days * 24 * 60 * 60 * 1000).toISOString())
        .order('timestamp', { ascending: false })
        .limit(10);

      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Failed to get popular pages:', error);
      return [];
    }
  },

  // Mobile Analytics Tracking
  async trackMobileMetrics(metrics: Omit<InsertMobileAnalytics, 'id' | 'timestamp'>) {
    try {
      await supabase
        .from('mobile_analytics')
        .insert({
          ...metrics,
          timestamp: new Date().toISOString(),
        });
    } catch (error) {
      console.error('Failed to track mobile metrics:', error);
    }
  },

  // Enhanced Lighthouse tracking with strategy support
  async storeLighthouseAudit(report: LighthouseReport, strategy: 'mobile' | 'desktop' = 'mobile') {
    try {
      await supabase
        .from('lighthouse_audits')
        .insert({
          url: report.url,
          strategy,
          timestamp: report.timestamp,
          performanceScore: report.metrics.performance,
          accessibilityScore: report.metrics.accessibility,
          bestPracticesScore: report.metrics.bestPractices,
          seoScore: report.metrics.seo,
          pwaScore: report.metrics.pwa,
          firstContentfulPaint: report.metrics.firstContentfulPaint,
          largestContentfulPaint: report.metrics.largestContentfulPaint,
          cumulativeLayoutShift: report.metrics.cumulativeLayoutShift,
          speedIndex: report.metrics.speedIndex,
          opportunities: JSON.stringify(report.opportunities),
          diagnostics: JSON.stringify([]),
        });
    } catch (error) {
      console.error('Failed to store Lighthouse audit:', error);
    }
  },

  // Enhanced page view tracking with device detection
  async trackPageViewEnhanced(path: string, title: string, userId?: string) {
    try {
      const deviceType = this.detectDeviceType();
      const screenResolution = `${window.screen.width}x${window.screen.height}`;
      const sessionId = this.getOrCreateSessionId();
      
      await supabase
        .from('page_views')
        .insert({
          path,
          title,
          userId,
          timestamp: new Date().toISOString(),
          userAgent: navigator.userAgent,
          referrer: document.referrer,
          deviceType,
          screenResolution,
          sessionId,
        });
    } catch (error) {
      console.error('Failed to track enhanced page view:', error);
    }
  },

  // Get mobile performance trends
  async getMobilePerformanceTrends(days = 30) {
    try {
      const { data, error } = await supabase
        .from('lighthouse_audits')
        .select('*')
        .eq('strategy', 'mobile')
        .gte('timestamp', new Date(Date.now() - days * 24 * 60 * 60 * 1000).toISOString())
        .order('timestamp', { ascending: true });

      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Failed to get mobile performance trends:', error);
      return [];
    }
  },

  // Get device type distribution
  async getDeviceTypeDistribution(days = 30) {
    try {
      const { data, error } = await supabase
        .from('page_views')
        .select('deviceType')
        .gte('timestamp', new Date(Date.now() - days * 24 * 60 * 60 * 1000).toISOString());

      if (error) throw error;
      
      const distribution = data.reduce((acc: Record<string, number>, view) => {
        const device = view.deviceType || 'unknown';
        acc[device] = (acc[device] || 0) + 1;
        return acc;
      }, {});
      
      return distribution;
    } catch (error) {
      console.error('Failed to get device type distribution:', error);
      return {};
    }
  },

  // Helper methods
  detectDeviceType(): string {
    const userAgent = navigator.userAgent;
    if (/Mobile|Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(userAgent)) {
      if (/iPad/i.test(userAgent)) return 'tablet';
      return 'mobile';
    }
    return 'desktop';
  },

  getOrCreateSessionId(): string {
    let sessionId = sessionStorage.getItem('session_id');
    if (!sessionId) {
      sessionId = crypto.randomUUID();
      sessionStorage.setItem('session_id', sessionId);
    }
    return sessionId;
  },

  // Get connection type if available
  getConnectionType(): string {
    const connection = (navigator as any).connection || (navigator as any).mozConnection || (navigator as any).webkitConnection;
    return connection ? connection.effectiveType || 'unknown' : 'unknown';
  },
};

export default supabase;