import React, { useState, useEffect } from 'react';
import { Smartphone, Gauge, Zap, Shield, Search, Chrome, RefreshCw, TrendingUp, AlertCircle } from 'lucide-react';
import { lighthouseService, type LighthouseReport } from '../../services/lighthouseService';
import { seoTracking } from '../../services/supabaseClient';

interface MobileMetrics {
  deviceType: string;
  screenWidth: number;
  screenHeight: number;
  connectionType: string;
  isOnline: boolean;
}

const MobilePerformanceTracker = () => {
  const [lighthouseReport, setLighthouseReport] = useState<LighthouseReport | null>(null);
  const [isRunningAudit, setIsRunningAudit] = useState(false);
  const [mobileMetrics, setMobileMetrics] = useState<MobileMetrics | null>(null);
  const [auditHistory, setAuditHistory] = useState<LighthouseReport[]>([]);

  useEffect(() => {
    // Initialize mobile metrics
    const detectMobileMetrics = () => {
      const metrics: MobileMetrics = {
        deviceType: detectDeviceType(),
        screenWidth: window.screen.width,
        screenHeight: window.screen.height,
        connectionType: getConnectionType(),
        isOnline: navigator.onLine,
      };
      setMobileMetrics(metrics);
      
      // Track page view with mobile metrics
      seoTracking.trackPageViewEnhanced(
        window.location.pathname,
        document.title
      );
    };

    detectMobileMetrics();
    
    // Load stored audit results
    const storedResults = lighthouseService.getStoredResults();
    setAuditHistory(storedResults);
    
    if (storedResults.length > 0) {
      setLighthouseReport(storedResults[storedResults.length - 1]);
    }

    // Listen for network changes
    const handleOnlineStatusChange = () => {
      setMobileMetrics(prev => prev ? { ...prev, isOnline: navigator.onLine } : null);
    };

    window.addEventListener('online', handleOnlineStatusChange);
    window.addEventListener('offline', handleOnlineStatusChange);

    return () => {
      window.removeEventListener('online', handleOnlineStatusChange);
      window.removeEventListener('offline', handleOnlineStatusChange);
    };
  }, []);

  const detectDeviceType = (): string => {
    const userAgent = navigator.userAgent;
    if (/Mobile|Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(userAgent)) {
      if (/iPad/i.test(userAgent)) return 'tablet';
      return 'mobile';
    }
    return 'desktop';
  };

  const getConnectionType = (): string => {
    const connection = (navigator as any).connection || (navigator as any).mozConnection || (navigator as any).webkitConnection;
    return connection ? connection.effectiveType || 'unknown' : 'unknown';
  };

  const runMobileAudit = async () => {
    setIsRunningAudit(true);
    try {
      const report = await lighthouseService.runMobileAudit();
      if (report) {
        setLighthouseReport(report);
        lighthouseService.saveAuditResult(report);
        
        // Store in Supabase
        await seoTracking.storeLighthouseAudit(report, 'mobile');
        
        // Track mobile analytics
        if (mobileMetrics) {
          await seoTracking.trackMobileMetrics({
            url: report.url,
            deviceType: mobileMetrics.deviceType,
            screenWidth: mobileMetrics.screenWidth,
            screenHeight: mobileMetrics.screenHeight,
            userAgent: navigator.userAgent,
            connectionType: mobileMetrics.connectionType,
            performanceScore: report.metrics.performance,
            accessibilityScore: report.metrics.accessibility,
            bestPracticesScore: report.metrics.bestPractices,
            seoScore: report.metrics.seo,
            pwaScore: report.metrics.pwa,
            firstContentfulPaint: report.metrics.firstContentfulPaint.toString(),
            largestContentfulPaint: report.metrics.largestContentfulPaint.toString(),
            cumulativeLayoutShift: report.metrics.cumulativeLayoutShift.toString(),
            speedIndex: report.metrics.speedIndex.toString(),
            opportunities: JSON.stringify(report.opportunities),
          });
        }
        
        setAuditHistory(prev => [...prev, report]);
      }
    } catch (error) {
      console.error('Failed to run mobile audit:', error);
    } finally {
      setIsRunningAudit(false);
    }
  };

  const getScoreColor = (score: number): string => {
    if (score >= 90) return 'text-emerald-600';
    if (score >= 70) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getScoreBgColor = (score: number): string => {
    if (score >= 90) return 'bg-emerald-100';
    if (score >= 70) return 'bg-yellow-100';
    return 'bg-red-100';
  };

  return (
    <div className="bg-white rounded-xl border border-neutral-200 shadow-soft p-6" data-testid="mobile-performance-tracker">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center">
            <Smartphone className="w-5 h-5 text-blue-600" />
          </div>
          <div>
            <h2 className="text-xl font-semibold text-neutral-900">Mobile Performance</h2>
            <p className="text-sm text-neutral-600">Lighthouse API integration for mobile optimization</p>
          </div>
        </div>
        
        <button
          onClick={runMobileAudit}
          disabled={isRunningAudit}
          className="px-4 py-2 bg-blue-600 text-white rounded-xl font-medium hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 flex items-center space-x-2 touch-target"
          data-testid="run-mobile-audit-button"
        >
          <RefreshCw className={`w-4 h-4 ${isRunningAudit ? 'animate-spin' : ''}`} />
          <span>{isRunningAudit ? 'Running...' : 'Run Mobile Audit'}</span>
        </button>
      </div>

      {/* Mobile Device Info */}
      {mobileMetrics && (
        <div className="mb-6 p-4 bg-neutral-50 rounded-xl">
          <h3 className="font-medium text-neutral-900 mb-3">Current Device Information</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
            <div>
              <span className="text-neutral-600">Device Type:</span>
              <span className="ml-2 font-medium text-neutral-900 capitalize">{mobileMetrics.deviceType}</span>
            </div>
            <div>
              <span className="text-neutral-600">Screen:</span>
              <span className="ml-2 font-medium text-neutral-900">{mobileMetrics.screenWidth}x{mobileMetrics.screenHeight}</span>
            </div>
            <div>
              <span className="text-neutral-600">Connection:</span>
              <span className="ml-2 font-medium text-neutral-900 uppercase">{mobileMetrics.connectionType}</span>
            </div>
            <div className="flex items-center">
              <span className="text-neutral-600">Status:</span>
              <div className={`ml-2 flex items-center space-x-1 ${mobileMetrics.isOnline ? 'text-emerald-600' : 'text-red-600'}`}>
                <div className={`w-2 h-2 rounded-full ${mobileMetrics.isOnline ? 'bg-emerald-500' : 'bg-red-500'}`} />
                <span className="font-medium">{mobileMetrics.isOnline ? 'Online' : 'Offline'}</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Lighthouse Scores */}
      {lighthouseReport && (
        <div className="mb-6">
          <h3 className="font-medium text-neutral-900 mb-4">Lighthouse Scores</h3>
          <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
            <div className={`p-4 rounded-xl ${getScoreBgColor(lighthouseReport.metrics.performance)}`}>
              <div className="flex items-center space-x-2 mb-2">
                <Gauge className={`w-4 h-4 ${getScoreColor(lighthouseReport.metrics.performance)}`} />
                <span className="text-sm font-medium text-neutral-700">Performance</span>
              </div>
              <div className={`text-2xl font-bold ${getScoreColor(lighthouseReport.metrics.performance)}`}>
                {lighthouseReport.metrics.performance}
              </div>
            </div>
            
            <div className={`p-4 rounded-xl ${getScoreBgColor(lighthouseReport.metrics.accessibility)}`}>
              <div className="flex items-center space-x-2 mb-2">
                <Shield className={`w-4 h-4 ${getScoreColor(lighthouseReport.metrics.accessibility)}`} />
                <span className="text-sm font-medium text-neutral-700">Accessibility</span>
              </div>
              <div className={`text-2xl font-bold ${getScoreColor(lighthouseReport.metrics.accessibility)}`}>
                {lighthouseReport.metrics.accessibility}
              </div>
            </div>
            
            <div className={`p-4 rounded-xl ${getScoreBgColor(lighthouseReport.metrics.bestPractices)}`}>
              <div className="flex items-center space-x-2 mb-2">
                <Chrome className={`w-4 h-4 ${getScoreColor(lighthouseReport.metrics.bestPractices)}`} />
                <span className="text-sm font-medium text-neutral-700">Best Practices</span>
              </div>
              <div className={`text-2xl font-bold ${getScoreColor(lighthouseReport.metrics.bestPractices)}`}>
                {lighthouseReport.metrics.bestPractices}
              </div>
            </div>
            
            <div className={`p-4 rounded-xl ${getScoreBgColor(lighthouseReport.metrics.seo)}`}>
              <div className="flex items-center space-x-2 mb-2">
                <Search className={`w-4 h-4 ${getScoreColor(lighthouseReport.metrics.seo)}`} />
                <span className="text-sm font-medium text-neutral-700">SEO</span>
              </div>
              <div className={`text-2xl font-bold ${getScoreColor(lighthouseReport.metrics.seo)}`}>
                {lighthouseReport.metrics.seo}
              </div>
            </div>
            
            <div className={`p-4 rounded-xl ${getScoreBgColor(lighthouseReport.metrics.pwa)}`}>
              <div className="flex items-center space-x-2 mb-2">
                <Zap className={`w-4 h-4 ${getScoreColor(lighthouseReport.metrics.pwa)}`} />
                <span className="text-sm font-medium text-neutral-700">PWA</span>
              </div>
              <div className={`text-2xl font-bold ${getScoreColor(lighthouseReport.metrics.pwa)}`}>
                {lighthouseReport.metrics.pwa}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Core Web Vitals */}
      {lighthouseReport && (
        <div className="mb-6">
          <h3 className="font-medium text-neutral-900 mb-4">Core Web Vitals</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="p-4 bg-neutral-50 rounded-xl">
              <div className="text-sm text-neutral-600 mb-1">First Contentful Paint</div>
              <div className="text-lg font-semibold text-neutral-900">
                {(lighthouseReport.metrics.firstContentfulPaint / 1000).toFixed(2)}s
              </div>
            </div>
            
            <div className="p-4 bg-neutral-50 rounded-xl">
              <div className="text-sm text-neutral-600 mb-1">Largest Contentful Paint</div>
              <div className="text-lg font-semibold text-neutral-900">
                {(lighthouseReport.metrics.largestContentfulPaint / 1000).toFixed(2)}s
              </div>
            </div>
            
            <div className="p-4 bg-neutral-50 rounded-xl">
              <div className="text-sm text-neutral-600 mb-1">Cumulative Layout Shift</div>
              <div className="text-lg font-semibold text-neutral-900">
                {lighthouseReport.metrics.cumulativeLayoutShift.toFixed(3)}
              </div>
            </div>
            
            <div className="p-4 bg-neutral-50 rounded-xl">
              <div className="text-sm text-neutral-600 mb-1">Speed Index</div>
              <div className="text-lg font-semibold text-neutral-900">
                {(lighthouseReport.metrics.speedIndex / 1000).toFixed(2)}s
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Optimization Opportunities */}
      {lighthouseReport && lighthouseReport.opportunities.length > 0 && (
        <div className="mb-6">
          <h3 className="font-medium text-neutral-900 mb-4 flex items-center space-x-2">
            <TrendingUp className="w-4 h-4" />
            <span>Optimization Opportunities</span>
          </h3>
          <div className="space-y-3">
            {lighthouseReport.opportunities.slice(0, 5).map((opportunity, index) => (
              <div key={index} className="p-4 bg-amber-50 rounded-xl border border-amber-200">
                <div className="flex items-start space-x-3">
                  <AlertCircle className="w-5 h-5 text-amber-600 mt-0.5 flex-shrink-0" />
                  <div className="flex-1">
                    <h4 className="font-medium text-amber-900 mb-1">{opportunity.title}</h4>
                    <p className="text-sm text-amber-700 leading-relaxed">{opportunity.description}</p>
                    <div className="mt-2 text-xs text-amber-600">
                      Score: {opportunity.score}/100
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Audit History */}
      {auditHistory.length > 1 && (
        <div>
          <h3 className="font-medium text-neutral-900 mb-4">Recent Audits</h3>
          <div className="space-y-2">
            {auditHistory.slice(-5).reverse().map((audit, index) => (
              <div key={index} className="p-3 bg-neutral-50 rounded-lg flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="text-sm text-neutral-600">
                    {new Date(audit.timestamp).toLocaleDateString()} at {new Date(audit.timestamp).toLocaleTimeString()}
                  </div>
                </div>
                <div className="flex items-center space-x-2 text-sm">
                  <span className={`font-medium ${getScoreColor(audit.metrics.performance)}`}>
                    {audit.metrics.performance}
                  </span>
                  <span className="text-neutral-400">•</span>
                  <span className={`font-medium ${getScoreColor(audit.metrics.accessibility)}`}>
                    {audit.metrics.accessibility}
                  </span>
                  <span className="text-neutral-400">•</span>
                  <span className={`font-medium ${getScoreColor(audit.metrics.seo)}`}>
                    {audit.metrics.seo}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {!lighthouseReport && !isRunningAudit && (
        <div className="text-center py-8">
          <Smartphone className="w-12 h-12 text-neutral-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-neutral-600 mb-2">No Mobile Audit Data</h3>
          <p className="text-neutral-500 mb-4">Run your first mobile performance audit to see detailed insights</p>
          <button
            onClick={runMobileAudit}
            className="px-6 py-2 bg-blue-600 text-white rounded-xl font-medium hover:bg-blue-700 transition-colors duration-200 touch-target"
            data-testid="initial-mobile-audit-button"
          >
            Run Mobile Audit
          </button>
        </div>
      )}
    </div>
  );
};

export default MobilePerformanceTracker;