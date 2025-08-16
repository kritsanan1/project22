
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { render } from '../../../test/utils/test-utils'
import ConnectedAccounts from '../ConnectedAccounts'
import * as ayrshareService from '../../../services/ayrshareService'

vi.mock('../../../services/ayrshareService', () => ({
  testConnection: vi.fn(),
  getUserInfo: vi.fn(),
  getProfiles: vi.fn(),
}))

const mockAyrshareService = ayrshareService as any

describe('ConnectedAccounts', () => {
  const user = userEvent.setup()

  beforeEach(() => {
    vi.clearAllMocks()
    // Mock environment variable
    vi.stubEnv('VITE_AYRSHARE_API_KEY', 'test-api-key')
  })

  it('shows API configuration status', async () => {
    mockAyrshareService.testConnection.mockResolvedValue({
      success: true,
      message: 'Connection successful'
    })

    render(<ConnectedAccounts />)
    
    await waitFor(() => {
      expect(screen.getByText(/connection successful/i)).toBeInTheDocument()
    })
  })

  it('displays connected accounts when API is configured', async () => {
    mockAyrshareService.testConnection.mockResolvedValue({
      success: true,
      message: 'Connected'
    })
    mockAyrshareService.getUserInfo.mockResolvedValue({
      userId: 'test-user',
      tier: 'premium'
    })
    mockAyrshareService.getProfiles.mockResolvedValue([
      {
        profileKey: 'prof1',
        title: 'Twitter Account',
        platform: 'twitter'
      },
      {
        profileKey: 'prof2', 
        title: 'LinkedIn Account',
        platform: 'linkedin'
      }
    ])

    render(<ConnectedAccounts />)
    
    await waitFor(() => {
      expect(screen.getByText(/twitter account/i)).toBeInTheDocument()
      expect(screen.getByText(/linkedin account/i)).toBeInTheDocument()
    })
  })

  it('shows configuration prompt when API key is missing', () => {
    vi.stubEnv('VITE_AYRSHARE_API_KEY', '')
    
    render(<ConnectedAccounts />)
    
    expect(screen.getByText(/api key not configured/i)).toBeInTheDocument()
  })

  it('handles connection test failure', async () => {
    mockAyrshareService.testConnection.mockRejectedValue(
      new Error('Connection failed')
    )

    render(<ConnectedAccounts />)
    
    await waitFor(() => {
      expect(screen.getByText(/failed to test connection/i)).toBeInTheDocument()
    })
  })

  it('refreshes accounts when refresh button is clicked', async () => {
    mockAyrshareService.testConnection.mockResolvedValue({
      success: true,
      message: 'Connected'
    })
    mockAyrshareService.getProfiles.mockResolvedValue([])

    render(<ConnectedAccounts />)
    
    const refreshButton = screen.getByRole('button', { name: /refresh/i })
    await user.click(refreshButton)
    
    await waitFor(() => {
      expect(mockAyrshareService.testConnection).toHaveBeenCalledTimes(2) // Initial + refresh
      expect(mockAyrshareService.getProfiles).toHaveBeenCalledTimes(2)
    })
  })

  it('displays loading state during refresh', async () => {
    mockAyrshareService.testConnection.mockImplementation(
      () => new Promise(resolve => setTimeout(() => resolve({ success: true, message: 'Connected' }), 100))
    )

    render(<ConnectedAccounts />)
    
    const refreshButton = screen.getByRole('button', { name: /refresh/i })
    await user.click(refreshButton)
    
    expect(refreshButton).toBeDisabled()
    
    await waitFor(() => {
      expect(refreshButton).toBeEnabled()
    })
  })
})
