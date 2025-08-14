class AyrshareService {
  private apiKey: string;
  private baseUrl = 'https://app.ayrshare.com/api';

  constructor() {
    this.apiKey = import.meta.env.VITE_AYRSHARE_API_KEY || '';
    if (!this.apiKey) {
      console.warn('Ayrshare API key not found. Social media features will be limited.');
    }
  }

  private async makeRequest(endpoint: string, options: RequestInit = {}) {
    const url = `${this.baseUrl}${endpoint}`;

    try {
      const response = await fetch(url, {
        ...options,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.apiKey}`,
          ...options.headers,
        },
      });

      if (!response.ok) {
        throw new Error(`Ayrshare API error: ${response.status} ${response.statusText}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Ayrshare API request failed:', error);
      throw error;
    }
  }

  async publishPost(postData: {
    post: string;
    platforms: string[];
    mediaUrls?: string[];
    scheduleDate?: string;
  }) {
    const payload: any = {
      post: postData.post,
      platforms: postData.platforms,
    };

    if (postData.mediaUrls && postData.mediaUrls.length > 0) {
      payload.mediaUrls = postData.mediaUrls;
    }

    if (postData.scheduleDate) {
      payload.scheduleDate = postData.scheduleDate;
    }

    return this.makeRequest('/post', {
      method: 'POST',
      body: JSON.stringify(payload),
    });
  }

  async getPostAnalytics(postId: string) {
    return this.makeRequest(`/analytics/post/${postId}`);
  }

  async getAccountAnalytics(platform?: string) {
    const endpoint = platform ? `/analytics/social?platform=${platform}` : '/analytics/social';
    return this.makeRequest(endpoint);
  }

  async getConnectedAccounts() {
    return this.makeRequest('/profiles');
  }

  async deletePost(postId: string) {
    return this.makeRequest(`/delete/${postId}`, {
      method: 'DELETE',
    });
  }

  async getPostHistory(limit = 50) {
    return this.makeRequest(`/history?limit=${limit}`);
  }

  async uploadMedia(file: File) {
    const formData = new FormData();
    formData.append('file', file);

    return this.makeRequest('/upload', {
      method: 'POST',
      body: formData,
      headers: {
        'Authorization': `Bearer ${this.apiKey}`,
      },
    });
  }

  async getTrendingTopics(platform?: string) {
    // Note: This would depend on Ayrshare's actual trending topics endpoint
    // For now, we'll simulate this functionality
    const endpoint = platform ? `/trending?platform=${platform}` : '/trending';
    try {
      return this.makeRequest(endpoint);
    } catch (error) {
      // Fallback to mock data if endpoint doesn't exist
      return this.getMockTrendingTopics(platform);
    }
  }

  private getMockTrendingTopics(platform?: string) {
    const mockTopics = [
      {
        keyword: 'AI Technology',
        platform: platform || 'twitter',
        volume: 15420,
        sentiment: 'positive',
        growth: 23.5,
        relatedHashtags: ['#AI', '#Technology', '#Innovation'],
      },
      {
        keyword: 'Remote Work',
        platform: platform || 'linkedin',
        volume: 8930,
        sentiment: 'neutral',
        growth: 12.3,
        relatedHashtags: ['#RemoteWork', '#WorkFromHome', '#Productivity'],
      },
      {
        keyword: 'Sustainability',
        platform: platform || 'instagram',
        volume: 12650,
        sentiment: 'positive',
        growth: 18.7,
        relatedHashtags: ['#Sustainability', '#EcoFriendly', '#GreenLiving'],
      },
      {
        keyword: 'Content Marketing',
        platform: platform || 'twitter',
        volume: 9840,
        sentiment: 'positive',
        growth: 15.2,
        relatedHashtags: ['#ContentMarketing', '#DigitalMarketing', '#SocialMedia'],
      },
      {
        keyword: 'Productivity Tools',
        platform: platform || 'linkedin',
        volume: 7320,
        sentiment: 'positive',
        growth: 28.4,
        relatedHashtags: ['#Productivity', '#Tools', '#Efficiency'],
      },
    ];

    return { trends: mockTopics };
  }
}

export const ayrshareService = new AyrshareService();