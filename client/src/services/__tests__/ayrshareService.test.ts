
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { ayrshareService } from '../ayrshareService'

// Mock fetch globally
global.fetch = vi.fn()

const mockFetch = fetch as any

describe('ayrshareService', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    vi.stubEnv('VITE_AYRSHARE_API_KEY', 'test-api-key')
  })

  describe('testConnection', () => {
    it('returns success when API responds correctly', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => ({
          userId: 'test-user',
          validUser: true
        })
      })

      const result = await ayrshareService.testConnection()
      
      expect(result.success).toBe(true)
      expect(result.message).toContain('Connected successfully')
      expect(mockFetch).toHaveBeenCalledWith(
        'https://app.ayrshare.com/api/user',
        expect.objectContaining({
          headers: expect.objectContaining({
            'Authorization': 'Bearer test-api-key'
          })
        })
      )
    })

    it('handles API key missing', async () => {
      vi.stubEnv('VITE_AYRSHARE_API_KEY', '')
      
      const result = await ayrshareService.testConnection()
      
      expect(result.success).toBe(false)
      expect(result.message).toContain('API key not found')
    })

    it('handles 401 authentication error', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: false,
        status: 401,
        json: async () => ({ error: 'Unauthorized' })
      })

      const result = await ayrshareService.testConnection()
      
      expect(result.success).toBe(false)
      expect(result.message).toContain('Authentication failed')
    })

    it('handles network errors', async () => {
      mockFetch.mockRejectedValueOnce(new Error('Network error'))

      const result = await ayrshareService.testConnection()
      
      expect(result.success).toBe(false)
      expect(result.message).toContain('Connection failed')
    })
  })

  describe('createPost', () => {
    it('creates a post successfully', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => ({
          id: 'post123',
          status: 'success',
          postIds: {
            twitter: 'tw123',
            linkedin: 'li456'
          }
        })
      })

      const postData = {
        post: 'Test post content',
        platforms: ['twitter', 'linkedin']
      }

      const result = await ayrshareService.createPost(postData)
      
      expect(result.id).toBe('post123')
      expect(result.postIds).toEqual({
        twitter: 'tw123',
        linkedin: 'li456'
      })
      expect(mockFetch).toHaveBeenCalledWith(
        'https://app.ayrshare.com/api/post',
        expect.objectContaining({
          method: 'POST',
          body: JSON.stringify(postData)
        })
      )
    })

    it('throws error for failed post creation', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: false,
        status: 400,
        json: async () => ({ error: 'Invalid post data' })
      })

      const postData = {
        post: '',
        platforms: []
      }

      await expect(ayrshareService.createPost(postData)).rejects.toThrow('Invalid post data')
    })
  })

  describe('generateHashtags', () => {
    it('generates hashtags for given content', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => ({
          hashtags: ['#socialmedia', '#marketing', '#content']
        })
      })

      const result = await ayrshareService.generateHashtags('social media marketing tips')
      
      expect(result).toEqual(['#socialmedia', '#marketing', '#content'])
      expect(mockFetch).toHaveBeenCalledWith(
        'https://app.ayrshare.com/api/auto-hashtags',
        expect.objectContaining({
          method: 'POST',
          body: JSON.stringify({
            text: 'social media marketing tips'
          })
        })
      )
    })

    it('returns empty array when hashtag generation fails', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: false,
        status: 500
      })

      const result = await ayrshareService.generateHashtags('test content')
      
      expect(result).toEqual([])
    })
  })

  describe('getPostAnalytics', () => {
    it('retrieves post analytics successfully', async () => {
      const mockAnalytics = {
        postId: 'post123',
        views: 1000,
        likes: 50,
        shares: 10,
        comments: 5
      }

      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => mockAnalytics
      })

      const result = await ayrshareService.getPostAnalytics('post123')
      
      expect(result).toEqual(mockAnalytics)
      expect(mockFetch).toHaveBeenCalledWith(
        'https://app.ayrshare.com/api/analytics/post/post123',
        expect.objectContaining({
          headers: expect.objectContaining({
            'Authorization': 'Bearer test-api-key'
          })
        })
      )
    })
  })
})
