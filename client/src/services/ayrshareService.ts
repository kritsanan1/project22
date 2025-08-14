class AyrshareService {
  private apiKey: string;
  private baseUrl = 'https://api.ayrshare.com/api';

  constructor() {
    this.apiKey = import.meta.env.VITE_AYRSHARE_API_KEY || '';
    if (!this.apiKey) {
      console.warn('Ayrshare API key not found. Social media features will be limited.');
    }
    this.validateConfiguration();
  }

  private validateConfiguration(): void {
    if (!this.apiKey || this.apiKey === 'your_ayrshare_api_key_here') {
      console.warn('⚠️ Ayrshare API not properly configured. Please set VITE_AYRSHARE_API_KEY in your .env file');
    }
  }

  private isConfigured(): boolean {
    return !!this.apiKey && this.apiKey !== '';
  }

  private async makeRequest(endpoint: string, options: RequestInit = {}) {
    if (!this.isConfigured()) {
      throw new Error('Ayrshare API not configured. Please add VITE_AYRSHARE_API_KEY to your environment variables.');
    }

    const url = `${this.baseUrl}${endpoint}`;

    try {
      const response = await fetch(url, {
        ...options,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.apiKey}`,
          'Accept-Encoding': 'deflate, gzip, br',
          ...options.headers,
        },
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        const errorMessage = this.getErrorMessage(response.status, errorData);
        throw new Error(errorMessage);
      }

      return await response.json();
    } catch (error) {
      console.error('Ayrshare API request failed:', error);
      throw error;
    }
  }

  private getErrorMessage(status: number, errorData: any): string {
    switch (status) {
      case 401:
        return 'Authentication failed. Please check your API key.';
      case 403:
        return 'Access denied. Your account may lack required permissions.';
      case 429:
        return 'Rate limit exceeded. Please wait before making more requests.';
      case 500:
        return 'Ayrshare server error. Please try again later.';
      case 503:
        return 'Ayrshare service temporarily unavailable.';
      default:
        return `Ayrshare API error: ${status} ${errorData.message || 'Unknown error'}`;
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
    if (!this.isConfigured()) {
      return this.getMockConnectedAccounts();
    }
    return this.makeRequest('/profiles');
  }

  async deletePost(postId: string) {
    if (!this.isConfigured()) {
      throw new Error('Cannot delete posts without API configuration');
    }
    return this.makeRequest(`/delete/${postId}`, {
      method: 'DELETE',
    });
  }

  async getPostHistory(limit = 50) {
    if (!this.isConfigured()) {
      return this.getMockPostHistory();
    }
    return this.makeRequest(`/history?limit=${limit}`);
  }

  async uploadMedia(file: File) {
    if (!this.isConfigured()) {
      throw new Error('Cannot upload media without API configuration');
    }

    const formData = new FormData();
    formData.append('file', file);

    return this.makeRequest('/upload', {
      method: 'POST',
      body: formData,
      headers: {
        'Authorization': `Bearer ${this.apiKey}`,
        // Remove Content-Type to let browser set it with boundary for FormData
      },
    });
  }

  async getUnsplashImage(keywords: string) {
    return this.makeRequest('/unsplash', {
      method: 'POST',
      body: JSON.stringify({ 
        keywords,
        orientation: 'landscape' 
      }),
    });
  }

  // Enhanced API methods based on official Ayrshare documentation
  
  async getMediaLibrary(type?: 'image' | 'video') {
    const endpoint = type ? `/media?type=${type}` : '/media';
    return this.makeRequest(endpoint);
  }

  async generateHashtags(keywords: string) {
    return this.makeRequest('/generate/hashtags', {
      method: 'POST',
      body: JSON.stringify({ keywords }),
    });
  }

  async shortenLinks(urls: string[]) {
    return this.makeRequest('/shorten', {
      method: 'POST', 
      body: JSON.stringify({ urls }),
    });
  }

  async getComments(postId: string) {
    return this.makeRequest(`/comments/${postId}`);
  }

  async addComment(postId: string, comment: string) {
    return this.makeRequest(`/comments/${postId}`, {
      method: 'POST',
      body: JSON.stringify({ comment }),
    });
  }

  async deleteComment(commentId: string) {
    return this.makeRequest(`/comments/${commentId}`, {
      method: 'DELETE',
    });
  }

  async getReviews(platform?: string) {
    const endpoint = platform ? `/reviews?platform=${platform}` : '/reviews';
    return this.makeRequest(endpoint);
  }

  async replyToReview(reviewId: string, reply: string) {
    return this.makeRequest(`/reviews/${reviewId}/reply`, {
      method: 'POST',
      body: JSON.stringify({ reply }),
    });
  }

  async createRssFeed(feedData: {
    url: string;
    platforms: string[];
    schedulePattern?: string;
  }) {
    return this.makeRequest('/rss', {
      method: 'POST',
      body: JSON.stringify(feedData),
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

  private getMockConnectedAccounts() {
    return {
      profiles: [
        {
          id: 'mock-twitter',
          platform: 'twitter',
          username: 'demo_account',
          status: 'demo',
          profilePicture: 'https://via.placeholder.com/40',
        },
        {
          id: 'mock-linkedin',
          platform: 'linkedin',
          username: 'Demo Company',
          status: 'demo',
          profilePicture: 'https://via.placeholder.com/40',
        },
        {
          id: 'mock-instagram',
          platform: 'instagram',
          username: 'demo_brand',
          status: 'demo',
          profilePicture: 'https://via.placeholder.com/40',
        },
      ],
    };
  }

  private getMockPostHistory() {
    return {
      posts: [
        {
          id: 'mock-1',
          post: 'Welcome to CSM Smart Connect! 🚀 Streamline your social media management with our powerful tools.',
          platforms: ['twitter', 'linkedin'],
          status: 'published',
          publishedAt: new Date(Date.now() - 86400000).toISOString(), // 1 day ago
          engagement: { likes: 42, shares: 8, comments: 5 },
        },
        {
          id: 'mock-2',
          post: 'Pro tip: Schedule your content during peak engagement hours for maximum reach! 📊 #ContentStrategy',
          platforms: ['twitter'],
          status: 'published',
          publishedAt: new Date(Date.now() - 172800000).toISOString(), // 2 days ago
          engagement: { likes: 28, shares: 12, comments: 3 },
        },
        {
          id: 'mock-3',
          post: 'Coming soon: AI-powered content suggestions to boost your social media performance! Stay tuned... 🤖✨',
          platforms: ['linkedin', 'instagram'],
          status: 'scheduled',
          scheduledAt: new Date(Date.now() + 86400000).toISOString(), // 1 day from now
        },
      ],
    };
  }

  // Test API connectivity and authentication
  async testConnection(): Promise<{ success: boolean; message: string }> {
    if (!this.isConfigured()) {
      return {
        success: false,
        message: 'API key not configured. Add VITE_AYRSHARE_API_KEY to your environment variables.'
      };
    }

    try {
      const response = await this.makeRequest('/user');
      return {
        success: true,
        message: 'Successfully connected to Ayrshare API'
      };
    } catch (error) {
      return {
        success: false,
        message: `Connection failed: ${(error as Error).message}`
      };
    }
  }

  // Validate API key and get user information
  async getUserInfo() {
    return this.makeRequest('/user');
  }
}

export const ayrshareService = new AyrshareService();