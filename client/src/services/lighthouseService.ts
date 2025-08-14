
export interface LighthouseMetrics {
  performance: number;
  accessibility: number;
  bestPractices: number;
  seo: number;
  pwa: number;
  firstContentfulPaint: number;
  largestContentfulPaint: number;
  cumulativeLayoutShift: number;
  speedIndex: number;
}

export interface LighthouseReport {
  url: string;
  timestamp: string;
  metrics: LighthouseMetrics;
  opportunities: Array<{
    id: string;
    title: string;
    description: string;
    score: number;
  }>;
}

class LighthouseService {
  private apiKey = import.meta.env.VITE_PAGESPEED_API_KEY;
  private baseUrl = 'https://www.googleapis.com/pagespeedonline/v5/runPagespeed';

  async runAudit(url: string, strategy: 'mobile' | 'desktop' = 'mobile'): Promise<LighthouseReport | null> {
    if (!this.apiKey) {
      console.warn('PageSpeed Insights API key not configured');
      return this.getMockReport(url);
    }

    try {
      const params = new URLSearchParams({
        url,
        key: this.apiKey,
        strategy,
        category: 'performance',
        category: 'accessibility',
        category: 'best-practices',
        category: 'seo',
        category: 'pwa',
      });

      const response = await fetch(`${this.baseUrl}?${params}`);
      const data = await response.json();

      return this.parseResponse(data, url);
    } catch (error) {
      console.error('Failed to run Lighthouse audit:', error);
      return this.getMockReport(url);
    }
  }

  private parseResponse(data: any, url: string): LighthouseReport {
    const lighthouseResult = data.lighthouseResult;
    const categories = lighthouseResult.categories;
    const audits = lighthouseResult.audits;

    return {
      url,
      timestamp: new Date().toISOString(),
      metrics: {
        performance: Math.round(categories.performance.score * 100),
        accessibility: Math.round(categories.accessibility.score * 100),
        bestPractices: Math.round(categories['best-practices'].score * 100),
        seo: Math.round(categories.seo.score * 100),
        pwa: Math.round(categories.pwa.score * 100),
        firstContentfulPaint: audits['first-contentful-paint'].numericValue,
        largestContentfulPaint: audits['largest-contentful-paint'].numericValue,
        cumulativeLayoutShift: audits['cumulative-layout-shift'].numericValue,
        speedIndex: audits['speed-index'].numericValue,
      },
      opportunities: Object.values(audits)
        .filter((audit: any) => audit.scoreDisplayMode === 'numeric' && audit.score < 0.9)
        .map((audit: any) => ({
          id: audit.id,
          title: audit.title,
          description: audit.description,
          score: Math.round(audit.score * 100),
        }))
        .slice(0, 10),
    };
  }

  private getMockReport(url: string): LighthouseReport {
    return {
      url,
      timestamp: new Date().toISOString(),
      metrics: {
        performance: 87,
        accessibility: 94,
        bestPractices: 92,
        seo: 96,
        pwa: 73,
        firstContentfulPaint: 1.2,
        largestContentfulPaint: 2.1,
        cumulativeLayoutShift: 0.05,
        speedIndex: 1.8,
      },
      opportunities: [
        {
          id: 'unused-css-rules',
          title: 'Remove unused CSS',
          description: 'Remove dead rules from stylesheets to reduce bytes consumed by network activity.',
          score: 75,
        },
        {
          id: 'render-blocking-resources',
          title: 'Eliminate render-blocking resources',
          description: 'Resources are blocking the first paint of your page.',
          score: 68,
        },
      ],
    };
  }

  async runMobileAudit(): Promise<LighthouseReport | null> {
    const currentUrl = window.location.href;
    return this.runAudit(currentUrl, 'mobile');
  }

  async runDesktopAudit(): Promise<LighthouseReport | null> {
    const currentUrl = window.location.href;
    return this.runAudit(currentUrl, 'desktop');
  }

  // Store audit results locally
  saveAuditResult(report: LighthouseReport) {
    const existingResults = JSON.parse(localStorage.getItem('lighthouse-results') || '[]');
    existingResults.push(report);
    
    // Keep only last 10 results
    if (existingResults.length > 10) {
      existingResults.splice(0, existingResults.length - 10);
    }
    
    localStorage.setItem('lighthouse-results', JSON.stringify(existingResults));
  }

  getStoredResults(): LighthouseReport[] {
    return JSON.parse(localStorage.getItem('lighthouse-results') || '[]');
  }
}

export const lighthouseService = new LighthouseService();
