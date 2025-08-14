import { ayrshareService } from './ayrshareService';
import { SocialPost, SocialAccount, TrendingTopic, SocialInteraction } from '../types/social';

class SocialMediaService {
  async publishPost(postData: {
    content: string;
    platforms: string[];
    mediaUrls?: string[];
    scheduledAt?: string;
  }): Promise<any> {
    try {
      const result = await ayrshareService.publishPost({
        post: postData.content,
        platforms: postData.platforms,
        mediaUrls: postData.mediaUrls,
        scheduleDate: postData.scheduledAt,
      });

      // Store post in local database (Supabase)
      await this.savePostToDatabase({
        ...postData,
        status: postData.scheduledAt ? 'scheduled' : 'published',
        ayrshareId: result.id,
      });

      return result;
    } catch (error) {
      console.error('Failed to publish post:', error);
      throw error;
    }
  }

  async getConnectedAccounts(): Promise<SocialAccount[]> {
    try {
      const accounts = await ayrshareService.getConnectedAccounts();
      return accounts.map((account: any) => ({
        id: account.id,
        platform: account.platform,
        username: account.username,
        profileImage: account.profileImage,
        isConnected: true,
        lastSync: new Date().toISOString(),
      }));
    } catch (error) {
      console.error('Failed to fetch connected accounts:', error);
      // Return mock data for demo
      return [
        {
          id: '1',
          platform: 'twitter',
          username: '@yourcompany',
          profileImage: 'https://images.pexels.com/photos/267350/pexels-photo-267350.jpeg?auto=compress&cs=tinysrgb&w=100',
          isConnected: true,
          lastSync: new Date().toISOString(),
        },
        {
          id: '2',
          platform: 'linkedin',
          username: 'Your Company',
          profileImage: 'https://images.pexels.com/photos/267350/pexels-photo-267350.jpeg?auto=compress&cs=tinysrgb&w=100',
          isConnected: true,
          lastSync: new Date().toISOString(),
        },
        {
          id: '3',
          platform: 'instagram',
          username: '@yourcompany',
          profileImage: 'https://images.pexels.com/photos/267350/pexels-photo-267350.jpeg?auto=compress&cs=tinysrgb&w=100',
          isConnected: false,
          lastSync: undefined,
        },
      ];
    }
  }

  async getPostAnalytics(postId: string) {
    try {
      return await ayrshareService.getPostAnalytics(postId);
    } catch (error) {
      console.error('Failed to fetch post analytics:', error);
      return null;
    }
  }

  async getTrendingTopics(platform?: string): Promise<TrendingTopic[]> {
    try {
      const response = await ayrshareService.getTrendingTopics(platform);
      return response.trends.map((trend: any, index: number) => ({
        id: `trend-${index}`,
        keyword: trend.keyword,
        platform: trend.platform,
        volume: trend.volume,
        sentiment: trend.sentiment,
        growth: trend.growth,
        relatedHashtags: trend.relatedHashtags,
        updatedAt: new Date().toISOString(),
      }));
    } catch (error) {
      console.error('Failed to fetch trending topics:', error);
      return [];
    }
  }

  async uploadMedia(file: File): Promise<string> {
    try {
      const result = await ayrshareService.uploadMedia(file);
      return result.url;
    } catch (error) {
      console.error('Failed to upload media:', error);
      throw error;
    }
  }

  async getPostHistory(): Promise<SocialPost[]> {
    try {
      const history = await ayrshareService.getPostHistory();
      return history.map((post: any) => ({
        id: post.id,
        content: post.post,
        platforms: post.platforms,
        publishedAt: post.publishedAt,
        status: post.status,
        analytics: post.analytics,
        createdAt: post.createdAt,
        updatedAt: post.updatedAt,
      }));
    } catch (error) {
      console.error('Failed to fetch post history:', error);
      return [];
    }
  }

  private async savePostToDatabase(postData: any) {
    // This would integrate with Supabase to save post data
    // For now, we'll just log it
    console.log('Saving post to database:', postData);
  }

  // Mock method for social interactions - would integrate with actual APIs
  async getSocialInteractions(): Promise<SocialInteraction[]> {
    // This would fetch real interactions from connected platforms
    return [
      {
        id: '1',
        platform: 'twitter',
        type: 'comment',
        content: 'Great post! Really insightful.',
        author: {
          username: 'john_doe',
          profileImage: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=100',
        },
        postId: 'post-123',
        isRead: false,
        createdAt: new Date().toISOString(),
      },
      {
        id: '2',
        platform: 'linkedin',
        type: 'mention',
        content: 'Thanks for mentioning our company in your latest article!',
        author: {
          username: 'company_account',
          profileImage: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=100',
        },
        isRead: false,
        createdAt: new Date().toISOString(),
      },
      {
        id: '3',
        platform: 'instagram',
        type: 'dm',
        content: 'Hi! I love your content. Can we collaborate?',
        author: {
          username: 'influencer_jane',
          profileImage: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=100',
        },
        isRead: false,
        createdAt: new Date(Date.now() - 3600000).toISOString(),
      },
      {
        id: '4',
        platform: 'twitter',
        type: 'reply',
        content: 'This is exactly what I needed to hear today. Thank you!',
        author: {
          username: 'grateful_user',
          profileImage: 'https://images.pexels.com/photos/91227/pexels-photo-91227.jpeg?auto=compress&cs=tinysrgb&w=100',
        },
        postId: 'post-456',
        isRead: true,
        createdAt: new Date(Date.now() - 7200000).toISOString(),
      },
    ];
  }


}

export const socialMediaService = new SocialMediaService();