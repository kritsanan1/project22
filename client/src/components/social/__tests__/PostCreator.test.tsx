
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { screen, fireEvent, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { render } from '../../../test/utils/test-utils'
import PostCreator from '../PostCreator'
import * as ayrshareService from '../../../services/ayrshareService'

// Mock the ayrshare service
vi.mock('../../../services/ayrshareService', () => ({
  createPost: vi.fn(),
  schedulePost: vi.fn(),
  generateHashtags: vi.fn(),
}))

const mockAyrshareService = ayrshareService as any

describe('PostCreator', () => {
  const user = userEvent.setup()

  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('renders all essential elements', () => {
    render(<PostCreator />)
    
    expect(screen.getByPlaceholderText(/what's on your mind/i)).toBeInTheDocument()
    expect(screen.getByText(/select platforms/i)).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /post now/i })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /schedule/i })).toBeInTheDocument()
  })

  it('updates content when user types', async () => {
    render(<PostCreator />)
    
    const textArea = screen.getByPlaceholderText(/what's on your mind/i)
    await user.type(textArea, 'This is a test post')
    
    expect(textArea).toHaveValue('This is a test post')
  })

  it('shows character count for different platforms', async () => {
    render(<PostCreator />)
    
    const textArea = screen.getByPlaceholderText(/what's on your mind/i)
    await user.type(textArea, 'A'.repeat(100))
    
    // Should show character counts for selected platforms
    expect(screen.getByText(/100/)).toBeInTheDocument()
  })

  it('calls createPost when posting immediately', async () => {
    mockAyrshareService.createPost.mockResolvedValue({
      success: true,
      id: 'test-post-id'
    })

    render(<PostCreator />)
    
    const textArea = screen.getByPlaceholderText(/what's on your mind/i)
    await user.type(textArea, 'Test post content')
    
    const postButton = screen.getByRole('button', { name: /post now/i })
    await user.click(postButton)
    
    await waitFor(() => {
      expect(mockAyrshareService.createPost).toHaveBeenCalledWith({
        post: 'Test post content',
        platforms: expect.any(Array),
      })
    })
  })

  it('enables schedule button when date is selected', async () => {
    render(<PostCreator />)
    
    const scheduleButton = screen.getByRole('button', { name: /schedule/i })
    expect(scheduleButton).toBeDisabled()
    
    // Add content
    const textArea = screen.getByPlaceholderText(/what's on your mind/i)
    await user.type(textArea, 'Scheduled post')
    
    // Mock date selection (this would depend on your date picker implementation)
    fireEvent.change(screen.getByDisplayValue(''), {
      target: { value: '2024-12-31T10:00' }
    })
    
    await waitFor(() => {
      expect(scheduleButton).toBeEnabled()
    })
  })

  it('generates hashtags when requested', async () => {
    mockAyrshareService.generateHashtags.mockResolvedValue([
      '#socialmedia', '#marketing', '#content'
    ])

    render(<PostCreator />)
    
    const textArea = screen.getByPlaceholderText(/what's on your mind/i)
    await user.type(textArea, 'Great social media marketing tips')
    
    const hashtagButton = screen.getByRole('button', { name: /generate hashtags/i })
    await user.click(hashtagButton)
    
    await waitFor(() => {
      expect(mockAyrshareService.generateHashtags).toHaveBeenCalledWith(
        'Great social media marketing tips'
      )
    })
  })

  it('validates content length for Twitter', async () => {
    render(<PostCreator />)
    
    const textArea = screen.getByPlaceholderText(/what's on your mind/i)
    await user.type(textArea, 'A'.repeat(300)) // Exceeds Twitter limit
    
    expect(screen.getByText(/exceeds twitter limit/i)).toBeInTheDocument()
  })

  it('handles API errors gracefully', async () => {
    mockAyrshareService.createPost.mockRejectedValue(
      new Error('API Error')
    )

    render(<PostCreator />)
    
    const textArea = screen.getByPlaceholderText(/what's on your mind/i)
    await user.type(textArea, 'Test post')
    
    const postButton = screen.getByRole('button', { name: /post now/i })
    await user.click(postButton)
    
    await waitFor(() => {
      expect(screen.getByText(/failed to create post/i)).toBeInTheDocument()
    })
  })
})
