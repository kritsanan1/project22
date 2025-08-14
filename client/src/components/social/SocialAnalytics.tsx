import React, { useState, useEffect } from 'react';
import { 
  BarChart3, 
  TrendingUp, 
  Eye, 
  Heart, 
  MessageCircle, 
  Share,
  Calendar,
  Download
} from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { useSocialMedia } from '../../contexts/SocialMediaContext';
import { AnalyticsData } from '../../types/social';

const SocialAnalytics: React.FC = () => {
  const { state } = useSocialMedia();
  const [timeRange, setTimeRange] = useState('7d');
  const [selectedPlatform, setSelectedPlatform] = useState('all');
  const [analyticsData, setAnalyticsData] = useState<AnalyticsData | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const timeRanges = [
    { value: '7d', label: 'Last 7 days' },
    { value: '30d', label: 'Last 30 days' },
    { value: '90d', label: 'Last 3 months' },
  ];

  const platforms = [
    { value: 'all', label: 'All Platforms' },
    { value: 'twitter', label: 'Twitter' },
    { value: 'instagram', label: 'Instagram' },
    { value: 'linkedin', label: 'LinkedIn' },
  ];

  // Mock analytics data
  const mockAnalyticsData: AnalyticsData = {
    overview: {
      totalViews: 24800,
      totalLikes: 1240,
      totalComments: 320,
      totalShares: 180,
      engagementRate: 4.2,
      viewsChange: 12.5,
      likesChange: 8.3,
      commentsChange: -2.1,
      sharesChange: 15.7,
    },
    chartData: [
      { date: '2024-01-01', views: 1200, likes: 45, comments: 12, shares: 8 },
      { date: '2024-01-02', views: 1350, likes: 52, comments: 15, shares: 10 },
      { date: '2024-01-03', views: 1100, likes: 38, comments: 9, shares: 6 },
      { date: '2024-01-04', views: 1450, likes: 61, comments: 18, shares: 12 },
      { date: '2024-01-05', views: 1600, likes: 72, comments: 22, shares: 15 },
      { date: '2024-01-06', views: 1300, likes: 48, comments: 14, shares: 9 },
      { date: '2024-01-07', views: 1750, likes: 85, comments: 28, shares: 18 },
    ],
    topPosts: [
      {
        id: '1',
        content: 'The future of AI in content creation is here! 🚀',
        platform: 'twitter',
        views: 5200,
        likes: 240,
        comments: 45,
        shares: 32,
        publishedAt: '2024-01-05',
      },
      {
        id: '2',
        content: 'Behind the scenes of our latest product launch',
        platform: 'instagram',
        views: 3800,
        likes: 180,
        comments: 28,
        shares: 15,
        publishedAt: '2024-01-03',
      },
      {
        id: '3',
        content: 'Industry insights: What we learned from 2023',
        platform: 'linkedin',
        views: 4100,
        likes: 95,
        comments: 22,
        shares: 38,
        publishedAt: '2024-01-02',
      },
    ],
  };

  const fetchAnalytics = async () => {
    setIsLoading(true);
    try {
      // In a real implementation, this would fetch from the API
      // const data = await socialMediaService.getAccountAnalytics(selectedPlatform === 'all' ? undefined : selectedPlatform);
      setAnalyticsData(mockAnalyticsData);
    } catch (error) {
      console.error('Failed to fetch analytics:', error);
      setAnalyticsData(mockAnalyticsData); // Fallback to mock data
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchAnalytics();
  }, [timeRange, selectedPlatform]);

  const metrics = [
    {
      label: 'Total Views',
      value: analyticsData?.overview.totalViews || 0,
      change: analyticsData?.overview.viewsChange || 0,
      icon: Eye,
      color: 'text-blue-600',
    },
    {
      label: 'Total Likes',
      value: analyticsData?.overview.totalLikes || 0,
      change: analyticsData?.overview.likesChange || 0,
      icon: Heart,
      color: 'text-red-500',
    },
    {
      label: 'Total Comments',
      value: analyticsData?.overview.totalComments || 0,
      change: analyticsData?.overview.commentsChange || 0,
      icon: MessageCircle,
      color: 'text-green-600',
    },
    {
      label: 'Total Shares',
      value: analyticsData?.overview.totalShares || 0,
      change: analyticsData?.overview.sharesChange || 0,
      icon: Share,
      color: 'text-purple-600',
    },
  ];

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

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-2xl p-6 shadow-soft border border-neutral-100">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-sage/10 rounded-xl flex items-center justify-center">
              <BarChart3 className="w-5 h-5 text-sage" />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-neutral-900">Social Media Analytics</h2>
              <p className="text-sm text-neutral-600">Track your social media performance</p>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <select
              value={timeRange}
              onChange={(e) => setTimeRange(e.target.value)}
              className="px-3 py-2 border border-neutral-200 rounded-lg text-sm focus:ring-2 focus:ring-sage/20 focus:border-sage"
            >
              {timeRanges.map((range) => (
                <option key={range.value} value={range.value}>
                  {range.label}
                </option>
              ))}
            </select>

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

            <button className="p-2 border border-neutral-200 rounded-lg hover:bg-neutral-50 transition-colors duration-200">
              <Download className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Metrics Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {metrics.map((metric, index) => (
            <div key={index} className="p-4 border border-neutral-200 rounded-xl">
              <div className="flex items-center justify-between mb-2">
                <metric.icon className={`w-5 h-5 ${metric.color}`} />
                <div className={`flex items-center space-x-1 text-sm ${
                  metric.change > 0 ? 'text-emerald-600' : 'text-red-600'
                }`}>
                  <TrendingUp className={`w-3 h-3 ${metric.change < 0 ? 'rotate-180' : ''}`} />
                  <span>{Math.abs(metric.change)}%</span>
                </div>
              </div>
              <div className="text-2xl font-bold text-neutral-900 mb-1">
                {metric.value.toLocaleString()}
              </div>
              <div className="text-sm text-neutral-600">{metric.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Engagement Over Time */}
        <div className="bg-white rounded-2xl p-6 shadow-soft border border-neutral-100">
          <h3 className="text-lg font-semibold text-neutral-900 mb-4">Engagement Over Time</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={analyticsData?.chartData || []}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="views" stroke="#497552" strokeWidth={2} />
              <Line type="monotone" dataKey="likes" stroke="#ef4444" strokeWidth={2} />
              <Line type="monotone" dataKey="comments" stroke="#10b981" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Platform Performance */}
        <div className="bg-white rounded-2xl p-6 shadow-soft border border-neutral-100">
          <h3 className="text-lg font-semibold text-neutral-900 mb-4">Platform Performance</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={analyticsData?.chartData || []}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="views" fill="#497552" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Top Performing Posts */}
      <div className="bg-white rounded-2xl p-6 shadow-soft border border-neutral-100">
        <h3 className="text-lg font-semibold text-neutral-900 mb-4">Top Performing Posts</h3>
        <div className="space-y-4">
          {analyticsData?.topPosts.map((post: any, index: number) => (
            <div key={post.id} className="p-4 border border-neutral-200 rounded-xl">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center space-x-3">
                  <div className={`w-3 h-3 rounded-full ${getPlatformColor(post.platform)}`} />
                  <div>
                    <p className="font-medium text-neutral-900">{post.content}</p>
                    <div className="flex items-center space-x-2 text-sm text-neutral-500 mt-1">
                      <Calendar className="w-3 h-3" />
                      <span>{post.publishedAt}</span>
                      <span>•</span>
                      <span className="capitalize">{post.platform}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-4 gap-4">
                <div className="text-center">
                  <div className="text-lg font-semibold text-neutral-900">{post.views.toLocaleString()}</div>
                  <div className="text-xs text-neutral-500">Views</div>
                </div>
                <div className="text-center">
                  <div className="text-lg font-semibold text-neutral-900">{post.likes}</div>
                  <div className="text-xs text-neutral-500">Likes</div>
                </div>
                <div className="text-center">
                  <div className="text-lg font-semibold text-neutral-900">{post.comments}</div>
                  <div className="text-xs text-neutral-500">Comments</div>
                </div>
                <div className="text-center">
                  <div className="text-lg font-semibold text-neutral-900">{post.shares}</div>
                  <div className="text-xs text-neutral-500">Shares</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SocialAnalytics;