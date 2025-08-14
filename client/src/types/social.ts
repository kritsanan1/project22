export interface SocialAccount {
  id: string;
  platform: 'twitter' | 'instagram' | 'linkedin' | 'facebook';
  username: string;
  profileImage?: string;
  isConnected: boolean;
  lastSync?: string;
}

export interface SocialPost {
  id: string;
  content: string;
  mediaUrls?: string[];
  platforms: string[];
  scheduledAt?: string;
  publishedAt?: string;
  status: 'draft' | 'scheduled' | 'published' | 'failed';
  analytics?: PostAnalytics;
  createdAt: string;
  updatedAt: string;
}

export interface PostAnalytics {
  views: number;
  likes: number;
  comments: number;
  shares: number;
  engagement: number;
  reach: number;
}

export interface TrendingTopic {
  id: string;
  keyword: string;
  platform: string;
  volume: number;
  sentiment: 'positive' | 'negative' | 'neutral';
  growth: number;
  relatedHashtags: string[];
  updatedAt: string;
}

export interface SocialInteraction {
  id: string;
  platform: string;
  type: 'comment' | 'mention' | 'dm' | 'reply';
  content: string;
  author: {
    username: string;
    profileImage?: string;
  };
  postId?: string;
  isRead: boolean;
  createdAt: string;
}

export interface ContentSuggestion {
  id: string;
  title: string;
  content: string;
  platform: string;
  category: string;
  score: number;
  reasoning: string;
  createdAt: string;
}

export interface AnalyticsData {
  overview: {
    totalViews: number;
    totalLikes: number;
    totalComments: number;
    totalShares: number;
    engagementRate: number;
    viewsChange: number;
    likesChange: number;
    commentsChange: number;
    sharesChange: number;
  };
  chartData: Array<{
    date: string;
    views: number;
    likes: number;
    comments: number;
    shares: number;
  }>;
  topPosts: Array<{
    id: string;
    content: string;
    platform: string;
    views: number;
    likes: number;
    comments: number;
    shares: number;
    publishedAt: string;
  }>;
}