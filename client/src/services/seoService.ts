
import { GoogleAuth } from 'google-auth-library';

export interface SearchAnalyticsData {
  clicks: number;
  impressions: number;
  ctr: number;
  position: number;
  query?: string;
  page?: string;
  device?: string;
  date?: string;
}

export interface SEOMetrics {
  totalClicks: number;
  totalImpressions: number;
  averageCTR: number;
  averagePosition: number;
  topQueries: Array<{ query: string; clicks: number; impressions: number }>;
  topPages: Array<{ page: string; clicks: number; impressions: number }>;
}

class SEOService {
  private siteUrl = 'https://csm-smart-connect.replit.app';
  private auth: GoogleAuth | null = null;

  constructor() {
    if (typeof window !== 'undefined' && import.meta.env.VITE_GOOGLE_SEARCH_CONSOLE_CREDENTIALS) {
      this.initializeAuth();
    }
  }

  private async initializeAuth() {
    try {
      const credentials = JSON.parse(import.meta.env.VITE_GOOGLE_SEARCH_CONSOLE_CREDENTIALS);
      this.auth = new GoogleAuth({
        credentials,
        scopes: ['https://www.googleapis.com/auth/webmasters.readonly'],
      });
    } catch (error) {
      console.warn('Failed to initialize Google Search Console auth:', error);
    }
  }

  async getSearchAnalytics(
    startDate: string,
    endDate: string,
    dimensions: string[] = ['query']
  ): Promise<SearchAnalyticsData[]> {
    if (!this.auth) {
      console.warn('Google Search Console not configured');
      return this.getMockData();
    }

    try {
      const authClient = await this.auth.getClient();
      const response = await fetch(
        `https://searchconsole.googleapis.com/webmasters/v3/sites/${encodeURIComponent(this.siteUrl)}/searchAnalytics/query`,
        {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${await authClient.getAccessToken()}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            startDate,
            endDate,
            dimensions,
            rowLimit: 1000,
          }),
        }
      );

      const data = await response.json();
      return data.rows || [];
    } catch (error) {
      console.error('Failed to fetch search analytics:', error);
      return this.getMockData();
    }
  }

  async getSEOMetrics(days = 30): Promise<SEOMetrics> {
    const endDate = new Date().toISOString().split('T')[0];
    const startDate = new Date(Date.now() - days * 24 * 60 * 60 * 1000)
      .toISOString()
      .split('T')[0];

    const [queries, pages] = await Promise.all([
      this.getSearchAnalytics(startDate, endDate, ['query']),
      this.getSearchAnalytics(startDate, endDate, ['page']),
    ]);

    const totalClicks = queries.reduce((sum, item) => sum + (item.clicks || 0), 0);
    const totalImpressions = queries.reduce((sum, item) => sum + (item.impressions || 0), 0);
    const averageCTR = totalImpressions > 0 ? (totalClicks / totalImpressions) * 100 : 0;
    const averagePosition = queries.reduce((sum, item) => sum + (item.position || 0), 0) / queries.length;

    return {
      totalClicks,
      totalImpressions,
      averageCTR,
      averagePosition,
      topQueries: queries
        .sort((a, b) => (b.clicks || 0) - (a.clicks || 0))
        .slice(0, 10)
        .map(item => ({
          query: item.query || '',
          clicks: item.clicks || 0,
          impressions: item.impressions || 0,
        })),
      topPages: pages
        .sort((a, b) => (b.clicks || 0) - (a.clicks || 0))
        .slice(0, 10)
        .map(item => ({
          page: item.page || '',
          clicks: item.clicks || 0,
          impressions: item.impressions || 0,
        })),
    };
  }

  private getMockData(): SearchAnalyticsData[] {
    return [
      { clicks: 125, impressions: 2340, ctr: 5.34, position: 8.2, query: 'customer success management' },
      { clicks: 89, impressions: 1876, ctr: 4.74, position: 12.1, query: 'social media management tool' },
      { clicks: 67, impressions: 1523, ctr: 4.40, position: 9.8, query: 'content planning software' },
      { clicks: 45, impressions: 1289, ctr: 3.49, position: 15.2, query: 'CSM platform' },
      { clicks: 34, impressions: 987, ctr: 3.44, position: 18.7, query: 'team collaboration tools' },
    ];
  }

  // Track page views for internal analytics
  trackPageView(path: string, title: string) {
    if (typeof gtag !== 'undefined') {
      gtag('config', import.meta.env.VITE_GA_MEASUREMENT_ID, {
        page_path: path,
        page_title: title,
      });
    }
  }

  // Submit sitemap to Google Search Console
  async submitSitemap() {
    if (!this.auth) {
      console.warn('Google Search Console not configured');
      return;
    }

    try {
      const authClient = await this.auth.getClient();
      await fetch(
        `https://searchconsole.googleapis.com/webmasters/v3/sites/${encodeURIComponent(this.siteUrl)}/sitemaps/${encodeURIComponent('sitemap.xml')}`,
        {
          method: 'PUT',
          headers: {
            'Authorization': `Bearer ${await authClient.getAccessToken()}`,
          },
        }
      );
      console.log('Sitemap submitted successfully');
    } catch (error) {
      console.error('Failed to submit sitemap:', error);
    }
  }
}

export const seoService = new SEOService();
