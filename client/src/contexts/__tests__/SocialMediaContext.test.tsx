
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { renderHook, act, waitFor } from '@testing-library/react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import React from 'react'
import { SocialMediaProvider, useSocialMedia } from '../SocialMediaContext'
import * as ayrshareService from '../../services/ayrshareService'

vi.mock('../../services/ayrshareService')
const mockAyrshareService = ayrshareService as any

const createWrapper = ({ children }: { children: React.ReactNode }) => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: { retry: false },
    },
  })
  
  return (
    <QueryClientProvider client={queryClient}>
      <SocialMediaProvider>
        {children}
      </SocialMediaProvider>
    </QueryClientProvider>
  )
}

describe('SocialMediaContext', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('provides initial state', () => {
    const { result } = renderHook(() => useSocialMedia(), {
      wrapper: createWrapper,
    })

    expect(result.current.state).toEqual({
      accounts: [],
      posts: [],
      analytics: {},
      isLoading: false,
      error: null,
    })
  })

  it('fetches accounts successfully', async () => {
    const mockAccounts = [
      { id: '1', platform: 'twitter', username: 'testuser' },
      { id: '2', platform: 'linkedin', username: 'testcompany' }
    ]

    mockAyrshareService.getProfiles.mockResolvedValue(mockAccounts)

    const { result } = renderHook(() => useSocialMedia(), {
      wrapper: createWrapper,
    })

    await act(async () => {
      await result.current.fetchAccounts()
    })

    await waitFor(() => {
      expect(result.current.state.accounts).toEqual(mockAccounts)
      expect(result.current.state.isLoading).toBe(false)
    })
  })

  it('handles fetch accounts error', async () => {
    const errorMessage = 'Failed to fetch accounts'
    mockAyrshareService.getProfiles.mockRejectedValue(new Error(errorMessage))

    const { result } = renderHook(() => useSocialMedia(), {
      wrapper: createWrapper,
    })

    await act(async () => {
      await result.current.fetchAccounts()
    })

    await waitFor(() => {
      expect(result.current.state.error).toBe(errorMessage)
      expect(result.current.state.isLoading).toBe(false)
    })
  })

  it('creates post successfully', async () => {
    const postData = {
      post: 'Test post',
      platforms: ['twitter']
    }

    const mockResponse = {
      id: 'post123',
      status: 'success'
    }

    mockAyrshareService.createPost.mockResolvedValue(mockResponse)

    const { result } = renderHook(() => useSocialMedia(), {
      wrapper: createWrapper,
    })

    let createdPost: any
    await act(async () => {
      createdPost = await result.current.createPost(postData)
    })

    expect(createdPost).toEqual(mockResponse)
    expect(mockAyrshareService.createPost).toHaveBeenCalledWith(postData)
  })

  it('sets loading state during async operations', async () => {
    let resolvePromise: (value: any) => void
    const slowPromise = new Promise(resolve => {
      resolvePromise = resolve
    })

    mockAyrshareService.getProfiles.mockReturnValue(slowPromise)

    const { result } = renderHook(() => useSocialMedia(), {
      wrapper: createWrapper,
    })

    act(() => {
      result.current.fetchAccounts()
    })

    expect(result.current.state.isLoading).toBe(true)

    await act(async () => {
      resolvePromise!([])
      await slowPromise
    })

    expect(result.current.state.isLoading).toBe(false)
  })
})
