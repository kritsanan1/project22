
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { seoService, type SEOMetrics } from '@/services/seoService';
import { lighthouseService, type LighthouseReport } from '@/services/lighthouseService';
import { seoTracking } from '@/services/supabaseClient';
import {
  Search,
  TrendingUp,
  Smartphone,
  Monitor,
  Zap,
  Eye,
  MousePointer,
  BarChart3,
} from 'lucide-react';

export const SEOPerformance: React.FC = () => {
  const [seoMetrics, setSeoMetrics] = useState<SEOMetrics | null>(null);
  const [lighthouseReport, setLighthouseReport] = useState<LighthouseReport | null>(null);
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');

  useEffect(() => {
    loadSEOData();
  }, []);

  const loadSEOData = async () => {
    setLoading(true);
    try {
      const [metrics, mobileLighthouse] = await Promise.all([
        seoService.getSEOMetrics(30),
        lighthouseService.runMobileAudit(),
      ]);
      
      setSeoMetrics(metrics);
      setLighthouseReport(mobileLighthouse);
      
      // Store results in Supabase
      if (metrics) await seoTracking.storeSEOMetrics(metrics);
      if (mobileLighthouse) await seoTracking.storeLighthouseResult(mobileLighthouse);
    } catch (error) {
      console.error('Failed to load SEO data:', error);
    } finally {
      setLoading(false);
    }
  };

  const runLighthouseAudit = async (strategy: 'mobile' | 'desktop') => {
    setLoading(true);
    try {
      const report = strategy === 'mobile' 
        ? await lighthouseService.runMobileAudit()
        : await lighthouseService.runDesktopAudit();
      
      if (report) {
        setLighthouseReport(report);
        await seoTracking.storeLighthouseResult(report);
        lighthouseService.saveAuditResult(report);
      }
    } catch (error) {
      console.error('Failed to run Lighthouse audit:', error);
    } finally {
      setLoading(false);
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 90) return 'bg-green-500';
    if (score >= 70) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  const getScoreBadgeVariant = (score: number): "default" | "secondary" | "destructive" | "outline" => {
    if (score >= 90) return 'default';
    if (score >= 70) return 'secondary';
    return 'destructive';
  };

  return (
    <div className="space-y-6" data-testid="seo-performance">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold">SEO Performance</h2>
          <p className="text-muted-foreground">Monitor your search engine optimization metrics</p>
        </div>
        <Button onClick={loadSEOData} disabled={loading} data-testid="refresh-seo-data">
          <TrendingUp className="w-4 h-4 mr-2" />
          {loading ? 'Updating...' : 'Refresh Data'}
        </Button>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="performance">Performance</TabsTrigger>
          <TabsTrigger value="search-console">Search Console</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          {lighthouseReport && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center space-x-2">
                    <Zap className="w-4 h-4 text-orange-500" />
                    <span className="text-sm font-medium">Performance</span>
                  </div>
                  <div className="mt-2">
                    <div className="text-2xl font-bold">{lighthouseReport.metrics.performance}</div>
                    <Progress 
                      value={lighthouseReport.metrics.performance} 
                      className="mt-2"
                    />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center space-x-2">
                    <Eye className="w-4 h-4 text-blue-500" />
                    <span className="text-sm font-medium">Accessibility</span>
                  </div>
                  <div className="mt-2">
                    <div className="text-2xl font-bold">{lighthouseReport.metrics.accessibility}</div>
                    <Progress 
                      value={lighthouseReport.metrics.accessibility} 
                      className="mt-2"
                    />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center space-x-2">
                    <BarChart3 className="w-4 h-4 text-green-500" />
                    <span className="text-sm font-medium">Best Practices</span>
                  </div>
                  <div className="mt-2">
                    <div className="text-2xl font-bold">{lighthouseReport.metrics.bestPractices}</div>
                    <Progress 
                      value={lighthouseReport.metrics.bestPractices} 
                      className="mt-2"
                    />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center space-x-2">
                    <Search className="w-4 h-4 text-purple-500" />
                    <span className="text-sm font-medium">SEO</span>
                  </div>
                  <div className="mt-2">
                    <div className="text-2xl font-bold">{lighthouseReport.metrics.seo}</div>
                    <Progress 
                      value={lighthouseReport.metrics.seo} 
                      className="mt-2"
                    />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center space-x-2">
                    <Smartphone className="w-4 h-4 text-indigo-500" />
                    <span className="text-sm font-medium">PWA</span>
                  </div>
                  <div className="mt-2">
                    <div className="text-2xl font-bold">{lighthouseReport.metrics.pwa}</div>
                    <Progress 
                      value={lighthouseReport.metrics.pwa} 
                      className="mt-2"
                    />
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </TabsContent>

        <TabsContent value="performance" className="space-y-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <Button
              onClick={() => runLighthouseAudit('mobile')}
              disabled={loading}
              variant="outline"
              data-testid="run-mobile-audit"
            >
              <Smartphone className="w-4 h-4 mr-2" />
              Run Mobile Audit
            </Button>
            <Button
              onClick={() => runLighthouseAudit('desktop')}
              disabled={loading}
              variant="outline"
              data-testid="run-desktop-audit"
            >
              <Monitor className="w-4 h-4 mr-2" />
              Run Desktop Audit
            </Button>
          </div>

          {lighthouseReport && (
            <>
              <Card>
                <CardHeader>
                  <CardTitle>Core Web Vitals</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    <div className="text-center">
                      <div className="text-sm text-muted-foreground">First Contentful Paint</div>
                      <div className="text-2xl font-bold">
                        {lighthouseReport.metrics.firstContentfulPaint.toFixed(1)}s
                      </div>
                    </div>
                    <div className="text-center">
                      <div className="text-sm text-muted-foreground">Largest Contentful Paint</div>
                      <div className="text-2xl font-bold">
                        {lighthouseReport.metrics.largestContentfulPaint.toFixed(1)}s
                      </div>
                    </div>
                    <div className="text-center">
                      <div className="text-sm text-muted-foreground">Cumulative Layout Shift</div>
                      <div className="text-2xl font-bold">
                        {lighthouseReport.metrics.cumulativeLayoutShift.toFixed(3)}
                      </div>
                    </div>
                    <div className="text-center">
                      <div className="text-sm text-muted-foreground">Speed Index</div>
                      <div className="text-2xl font-bold">
                        {lighthouseReport.metrics.speedIndex.toFixed(1)}s
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Optimization Opportunities</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {lighthouseReport.opportunities.map((opportunity) => (
                      <div key={opportunity.id} className="flex items-center justify-between">
                        <div className="flex-1">
                          <div className="font-medium">{opportunity.title}</div>
                          <div className="text-sm text-muted-foreground">{opportunity.description}</div>
                        </div>
                        <Badge variant={getScoreBadgeVariant(opportunity.score)}>
                          {opportunity.score}%
                        </Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </>
          )}
        </TabsContent>

        <TabsContent value="search-console" className="space-y-4">
          {seoMetrics && (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center space-x-2">
                      <MousePointer className="w-4 h-4 text-blue-500" />
                      <span className="text-sm font-medium">Total Clicks</span>
                    </div>
                    <div className="text-2xl font-bold">{seoMetrics.totalClicks.toLocaleString()}</div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center space-x-2">
                      <Eye className="w-4 h-4 text-green-500" />
                      <span className="text-sm font-medium">Total Impressions</span>
                    </div>
                    <div className="text-2xl font-bold">{seoMetrics.totalImpressions.toLocaleString()}</div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center space-x-2">
                      <TrendingUp className="w-4 h-4 text-orange-500" />
                      <span className="text-sm font-medium">Average CTR</span>
                    </div>
                    <div className="text-2xl font-bold">{seoMetrics.averageCTR.toFixed(2)}%</div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center space-x-2">
                      <BarChart3 className="w-4 h-4 text-purple-500" />
                      <span className="text-sm font-medium">Average Position</span>
                    </div>
                    <div className="text-2xl font-bold">{seoMetrics.averagePosition.toFixed(1)}</div>
                  </CardContent>
                </Card>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Top Queries</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {seoMetrics.topQueries.map((query, index) => (
                        <div key={index} className="flex items-center justify-between">
                          <div className="flex-1 truncate pr-4">
                            <div className="font-medium">{query.query}</div>
                            <div className="text-sm text-muted-foreground">
                              {query.impressions.toLocaleString()} impressions
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="font-bold">{query.clicks}</div>
                            <div className="text-xs text-muted-foreground">clicks</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Top Pages</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {seoMetrics.topPages.map((page, index) => (
                        <div key={index} className="flex items-center justify-between">
                          <div className="flex-1 truncate pr-4">
                            <div className="font-medium">{page.page}</div>
                            <div className="text-sm text-muted-foreground">
                              {page.impressions.toLocaleString()} impressions
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="font-bold">{page.clicks}</div>
                            <div className="text-xs text-muted-foreground">clicks</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SEOPerformance;
