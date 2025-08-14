import React, { useState, useEffect } from 'react';
import { TrendingUp, TrendingDown, Hash, BarChart3, RefreshCw } from 'lucide-react';
import { useSocialMedia } from '../../contexts/SocialMediaContext';
import { TrendingTopic } from '../../types/social';
import { ConfigurationStatus } from './ConfigurationStatus';

const TrendAnalytics: React.FC = () => {
  const { state, fetchTrends } = useSocialMedia();
  const [selectedPlatform, setSelectedPlatform] = useState<string>('all');

  const platforms = [
    { value: 'all', label: 'All Platforms' },
    { value: 'twitter', label: 'Twitter' },
    { value: 'instagram', label: 'Instagram' },
    { value: 'linkedin', label: 'LinkedIn' },
  ];


  useEffect(() => {
    const platform = selectedPlatform === 'all' ? undefined : selectedPlatform;
    fetchTrends(platform);
  }, [selectedPlatform]);

  const getSentimentColor = (sentiment: string) => {
    switch (sentiment) {
      case 'positive':
        return 'text-emerald-600 bg-emerald-50';
      case 'negative':
        return 'text-red-600 bg-red-50';
      default:
        return 'text-neutral-600 bg-neutral-50';
    }
  };

  const getPlatformColor = (platform: string) => {
    switch (platform) {
      case 'twitter':
        return 'bg-blue-500';
      case 'instagram':
        return 'bg-pink-500';
      case 'linkedin':
        return 'bg-blue-700';
      default:
        return 'bg-neutral-500';
    }
  };

  const isConfigured = !!import.meta.env.VITE_AYRSHARE_API_KEY;


  return (
    <div className="bg-white rounded-2xl p-6 shadow-soft border border-neutral-100">
      <ConfigurationStatus 
        isConfigured={isConfigured} 
        service="Ayrshare" 
        className="mb-4"
      />
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-warm-blue/10 rounded-xl flex items-center justify-center">
            <TrendingUp className="w-5 h-5 text-warm-blue" />
          </div>
          <div>
            <h2 className="text-xl font-semibold text-neutral-900">Trend Analysis</h2>
            <p className="text-sm text-neutral-600">Monitor trending topics and hashtags</p>
          </div>
        </div>

        <div className="flex items-center space-x-3">
          <select
            value={selectedPlatform}
            onChange={(e) => setSelectedPlatform(e.target.value)}
            className="px-3 py-2 border border-neutral-200 rounded-lg text-sm focus:ring-2 focus:ring-sage/20 focus:border-sage"
          >
            {platforms.map((platform) => (
              <option key={platform.value} value={platform.value}>
                {platform.label}
              </option>
            ))}
          </select>

          <button
            onClick={() => fetchTrends(selectedPlatform === 'all' ? undefined : selectedPlatform)}
            disabled={state.isLoading}
            className="p-2 border border-neutral-200 rounded-lg hover:bg-neutral-50 transition-colors duration-200 disabled:opacity-50"
          >
            <RefreshCw className={`w-4 h-4 ${state.isLoading ? 'animate-spin' : ''}`} />
          </button>
        </div>
      </div>

      {/* Trending Topics */}
      <div className="space-y-4">
        {state.trends.length === 0 ? (
          <div className="text-center py-8">
            <BarChart3 className="w-12 h-12 text-neutral-300 mx-auto mb-3" />
            <p className="text-neutral-500">No trending topics available</p>
          </div>
        ) : (
          state.trends.map((trend) => (
            <div
              key={trend.id}
              className="p-4 border border-neutral-200 rounded-xl hover:border-neutral-300 transition-all duration-200"
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center space-x-3">
                  <div className={`w-3 h-3 rounded-full ${getPlatformColor(trend.platform)}`} />
                  <div>
                    <h3 className="font-semibold text-neutral-900 flex items-center space-x-2">
                      <Hash className="w-4 h-4" />
                      <span>{trend.keyword}</span>
                    </h3>
                    <p className="text-sm text-neutral-600 capitalize">{trend.platform}</p>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <span className={`px-2 py-1 rounded-lg text-xs font-medium ${getSentimentColor(trend.sentiment)}`}>
                    {trend.sentiment}
                  </span>
                  <div className={`flex items-center space-x-1 text-sm ${
                    trend.growth > 0 ? 'text-emerald-600' : 'text-red-600'
                  }`}>
                    {trend.growth > 0 ? (
                      <TrendingUp className="w-4 h-4" />
                    ) : (
                      <TrendingDown className="w-4 h-4" />
                    )}
                    <span>{Math.abs(trend.growth)}%</span>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-3">
                <div>
                  <span className="text-xs text-neutral-500">Volume</span>
                  <div className="text-lg font-semibold text-neutral-900">
                    {trend.volume.toLocaleString()}
                  </div>
                </div>
                <div>
                  <span className="text-xs text-neutral-500">Growth</span>
                  <div className={`text-lg font-semibold ${
                    trend.growth > 0 ? 'text-emerald-600' : 'text-red-600'
                  }`}>
                    {trend.growth > 0 ? '+' : ''}{trend.growth}%
                  </div>
                </div>
              </div>

              {/* Related Hashtags */}
              {trend.relatedHashtags && trend.relatedHashtags.length > 0 && (
                <div>
                  <span className="text-xs text-neutral-500 mb-2 block">Related Hashtags</span>
                  <div className="flex flex-wrap gap-2">
                    {trend.relatedHashtags.map((hashtag, index) => (
                      <span
                        key={index}
                        className="px-2 py-1 bg-neutral-100 text-neutral-600 rounded-lg text-xs"
                      >
                        {hashtag}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))
        )}
      </div>

      {/* Trend Insights */}
      {state.trends.length > 0 && (
        <div className="mt-6 p-4 bg-sage/5 rounded-xl border border-sage/20">
          <h3 className="font-medium text-sage mb-2">💡 Trend Insights</h3>
          <ul className="text-sm text-neutral-700 space-y-1">
            <li>• {state.trends.filter(t => t.growth > 0).length} topics are trending upward</li>
            <li>• {state.trends.filter(t => t.sentiment === 'positive').length} topics have positive sentiment</li>
            <li>• Best performing platform: {
              state.trends.reduce((prev, current) => 
                prev.volume > current.volume ? prev : current
              ).platform
            }</li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default TrendAnalytics;