
import { setupServer } from 'msw/node'
import { http, HttpResponse } from 'msw'

export const handlers = [
  // Mock Ayrshare API calls
  http.get('https://app.ayrshare.com/api/user', () => {
    return HttpResponse.json({
      userId: 'test-user',
      tier: 'premium',
      validUser: true,
    })
  }),

  http.post('https://app.ayrshare.com/api/post', () => {
    return HttpResponse.json({
      id: 'test-post-id',
      status: 'success',
      postIds: {
        twitter: 'tw123',
        linkedin: 'li456',
      }
    })
  }),

  http.get('https://app.ayrshare.com/api/profiles', () => {
    return HttpResponse.json([
      {
        profileKey: 'prof123',
        title: 'Test Profile',
        refId: 'ref123',
      }
    ])
  }),

  // Mock local API calls
  http.get('/api/posts', () => {
    return HttpResponse.json([
      {
        id: 1,
        content: 'Test post',
        platforms: ['twitter', 'linkedin'],
        scheduledAt: new Date().toISOString(),
      }
    ])
  }),

  http.post('/api/posts', () => {
    return HttpResponse.json({
      id: 2,
      content: 'New test post',
      platforms: ['twitter'],
      status: 'scheduled',
    })
  }),
]

export const server = setupServer(...handlers)
