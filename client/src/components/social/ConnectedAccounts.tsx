import React, { useState, useEffect } from 'react';
import {
  CheckCircle,
  XCircle,
  Settings,
  RefreshCw,
  AlertCircle,
  ExternalLink,
  Zap,
  Users,
  BarChart3,
  Wifi,
  WifiOff,
  Shield,
  Activity,
  Twitter,
  Linkedin,
  Instagram,
  Facebook,
  Plus
} from 'lucide-react';
import { useSocialMedia } from '../../contexts/SocialMediaContext';
import { SocialAccount } from '../../types/social';
import { ConfigurationStatus } from './ConfigurationStatus';
import { ayrshareService } from '../../services/ayrshareService';

const ConnectedAccounts: React.FC = () => {
  const { state, fetchAccounts } = useSocialMedia();
  const [isLoading, setIsLoading] = useState(false);
  const [connectionTest, setConnectionTest] = useState<{ success: boolean; message: string } | null>(null);
  const [userInfo, setUserInfo] = useState<any>(null);

  const isConfigured = !!import.meta.env.VITE_AYRSHARE_API_KEY;

  const platformIcons = {
    twitter: Twitter,
    linkedin: Linkedin,
    instagram: Instagram,
    facebook: Facebook,
  };

  const platformColors = {
    twitter: 'text-blue-500 bg-blue-50',
    linkedin: 'text-blue-700 bg-blue-50',
    instagram: 'text-pink-500 bg-pink-50',
    facebook: 'text-blue-600 bg-blue-50',
  };


  useEffect(() => {
    fetchAccounts();
    testAyrshareConnection();
  }, [fetchAccounts]);

  const testAyrshareConnection = async () => {
    try {
      const result = await ayrshareService.testConnection();
      setConnectionTest(result);

      if (result.success) {
        const info = await ayrshareService.getUserInfo();
        setUserInfo(info);
      }
    } catch (error) {
      setConnectionTest({
        success: false,
        message: 'Failed to test connection'
      });
    }
  };

  const handleRefresh = async () => {
    setIsLoading(true);
    try {
      await fetchAccounts();
      await testAyrshareConnection();
    } catch (error) {
      console.error('Failed to refresh accounts:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleLinkAccount = (account: SocialAccount) => {
    // Open Ayrshare dashboard for account linking
    const ayrshareUrl = 'https://app.ayrshare.com/dashboard/social-accounts';
    window.open(ayrshareUrl, '_blank', 'width=600,height=700');

    // Show instructions
    alert(`To link your ${account.platform} account:

1. Sign in to your Ayrshare dashboard
2. Navigate to Social Accounts
3. Click the ${account.platform} button
4. Authorize the connection
5. Return here and refresh the page`);
  };

  const handleUnlinkAccount = (account: SocialAccount) => {
    if (confirm(`Are you sure you want to unlink your ${account.platform} account?`)) {
      // In a real implementation, this would call the Ayrshare API to unlink
      console.log('Unlinking account:', account.platform);
      alert('To unlink this account, please visit your Ayrshare dashboard and remove the connection.');
    }
  };

  const handleViewAnalytics = (account: SocialAccount) => {
    // Navigate to analytics view for this specific platform
    console.log('Viewing analytics for:', account.platform);
    alert('Analytics view coming soon! This will show detailed metrics for your ' + account.platform + ' account.');
  };

  const handleConnect = (platform: string) => {
    // Open Ayrshare dashboard for account linking
    const ayrshareUrl = 'https://app.ayrshare.com/dashboard/social-accounts';
    window.open(ayrshareUrl, '_blank', 'width=600,height=700');
    
    alert(`To connect your ${platform} account:

1. Sign in to your Ayrshare dashboard
2. Navigate to Social Accounts
3. Click the ${platform} button
4. Authorize the connection
5. Return here and refresh the page`);
  };

  return (
    <div className="space-y-6">
      {/* API Connection Status */}
      {connectionTest && (
        <div className={`bg-white rounded-2xl p-6 shadow-soft border ${
          connectionTest.success ? 'border-emerald-200' : 'border-red-200'
        }`}>
          <div className="flex items-center space-x-3">
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
              connectionTest.success ? 'bg-emerald-50' : 'bg-red-50'
            }`}>
              {connectionTest.success ? (
                <Wifi className="w-5 h-5 text-emerald-600" />
              ) : (
                <WifiOff className="w-5 h-5 text-red-600" />
              )}
            </div>
            <div className="flex-1">
              <div className="flex items-center space-x-2">
                <h3 className="text-lg font-semibold text-neutral-900">Ayrshare API Status</h3>
                <div className={`px-2 py-1 rounded-full text-xs font-medium ${
                  connectionTest.success
                    ? 'bg-emerald-100 text-emerald-700'
                    : 'bg-red-100 text-red-700'
                }`}>
                  {connectionTest.success ? 'Connected' : 'Disconnected'}
                </div>
              </div>
              <p className="text-sm text-neutral-600 mt-1">{connectionTest.message}</p>
              {userInfo && (
                <div className="mt-3 grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                  <div>
                    <span className="text-neutral-500">Plan:</span>
                    <span className="ml-1 font-medium">{userInfo.plan || 'Free'}</span>
                  </div>
                  <div>
                    <span className="text-neutral-500">Requests:</span>
                    <span className="ml-1 font-medium">{userInfo.requestsUsed || 0}/{userInfo.requestsAllowed || 100}</span>
                  </div>
                  <div>
                    <span className="text-neutral-500">Platforms:</span>
                    <span className="ml-1 font-medium">{userInfo.platformsLinked || 0}</span>
                  </div>
                  <div>
                    <span className="text-neutral-500">Status:</span>
                    <span className="ml-1 font-medium capitalize">{userInfo.status || 'Active'}</span>
                  </div>
                </div>
              )}
            </div>
            <button
              onClick={testAyrshareConnection}
              className="p-2 text-neutral-500 hover:text-neutral-700 hover:bg-neutral-100 rounded-lg transition-colors duration-200"
            >
              <RefreshCw className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* Header */}
      <div className="bg-white rounded-2xl p-6 shadow-soft border border-neutral-100">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-sage/10 rounded-xl flex items-center justify-center">
              <Settings className="w-5 h-5 text-sage" />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-neutral-900">Connected Accounts</h2>
              <p className="text-sm text-neutral-600">Manage your social media connections via Ayrshare</p>
            </div>
          </div>

          <button
            onClick={handleRefresh}
            disabled={isLoading}
            className="flex items-center space-x-2 px-4 py-2 bg-sage text-white rounded-xl hover:bg-sage/90 transition-colors duration-200 disabled:opacity-50"
          >
            <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
            <span>Refresh</span>
          </button>
        </div>

        <div className="space-y-4">
          {state.accounts.map((account) => {
            const Icon = platformIcons[account.platform as keyof typeof platformIcons];
            const colorClass = platformColors[account.platform as keyof typeof platformColors];

            return (
              <div
                key={account.id}
                className="flex flex-col items-start p-4 border border-neutral-200 rounded-xl hover:border-neutral-300 transition-all duration-200"
              >
                <div className="flex w-full items-center justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <img
                      src={account.profilePicture || 'https://via.placeholder.com/40'}
                      alt={account.username}
                      className="w-10 h-10 rounded-full"
                    />
                    <div>
                      <h3 className="font-medium text-neutral-900">{account.username}</h3>
                      <div className="flex items-center space-x-2">
                        <span className="text-sm text-neutral-500 capitalize">{account.platform}</span>
                        {account.isConnected ? (
                          <CheckCircle className="w-4 h-4 text-emerald-500" />
                        ) : (
                          <XCircle className="w-4 h-4 text-red-500" />
                        )}
                        {account.status === 'demo' && (
                          <div className="px-2 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-medium">
                            Demo
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center space-x-2">
                    {account.isConnected ? (
                      <div className="px-3 py-1 bg-emerald-100 text-emerald-700 rounded-full text-sm font-medium flex items-center space-x-1">
                        <Shield className="w-3 h-3" />
                        <span>Linked</span>
                      </div>
                    ) : (
                      <div className="px-3 py-1 bg-red-100 text-red-700 rounded-full text-sm font-medium">
                        Not Linked
                      </div>
                    )}
                  </div>
                </div>

                {/* Platform Capabilities */}
                <div className="mb-4">
                  <h4 className="text-sm font-medium text-neutral-700 mb-2">Supported Features</h4>
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <div className="flex items-center space-x-1">
                      <CheckCircle className="w-3 h-3 text-emerald-500" />
                      <span>Text Posts</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <CheckCircle className="w-3 h-3 text-emerald-500" />
                      <span>Image Posts</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <CheckCircle className="w-3 h-3 text-emerald-500" />
                      <span>Video Posts</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <CheckCircle className="w-3 h-3 text-emerald-500" />
                      <span>Scheduling</span>
                    </div>
                    {['instagram', 'facebook'].includes(account.platform) && (
                      <>
                        <div className="flex items-center space-x-1">
                          <CheckCircle className="w-3 h-3 text-emerald-500" />
                          <span>Stories</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <CheckCircle className="w-3 h-3 text-emerald-500" />
                          <span>Reels</span>
                        </div>
                      </>
                    )}
                    {account.platform === 'twitter' && (
                      <div className="flex items-center space-x-1">
                        <CheckCircle className="w-3 h-3 text-emerald-500" />
                        <span>Threads</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Account Stats */}
                {account.stats && (
                  <div className="grid grid-cols-3 gap-4 mb-4">
                    <div className="text-center">
                      <div className="text-lg font-semibold text-neutral-900">
                        {account.stats.followers?.toLocaleString() || '0'}
                      </div>
                      <div className="text-xs text-neutral-500">Followers</div>
                    </div>
                    <div className="text-center">
                      <div className="text-lg font-semibold text-neutral-900">
                        {account.stats.posts || '0'}
                      </div>
                      <div className="text-xs text-neutral-500">Posts</div>
                    </div>
                    <div className="text-center">
                      <div className="text-lg font-semibold text-neutral-900">
                        {account.stats.engagement || '0'}%
                      </div>
                      <div className="text-xs text-neutral-500">Engagement</div>
                    </div>
                  </div>
                )}

                {/* Actions */}
                <div className="flex space-x-2 w-full">
                  {account.isConnected ? (
                    <>
                      <button
                        onClick={() => handleViewAnalytics(account)}
                        className="flex-1 px-3 py-2 border border-neutral-200 rounded-lg text-sm font-medium text-neutral-700 hover:bg-neutral-50 transition-colors duration-200"
                      >
                        <BarChart3 className="w-4 h-4 inline mr-1" />
                        Analytics
                      </button>
                      <button
                        onClick={() => handleUnlinkAccount(account)}
                        className="flex-1 px-3 py-2 border border-red-200 rounded-lg text-sm font-medium text-red-700 hover:bg-red-50 transition-colors duration-200"
                      >
                        <XCircle className="w-4 h-4 inline mr-1" />
                        Unlink
                      </button>
                    </>
                  ) : (
                    <button
                      onClick={() => handleLinkAccount(account)}
                      className="flex-1 px-3 py-2 bg-sage text-white rounded-lg text-sm font-medium hover:bg-sage/90 transition-colors duration-200"
                    >
                      <ExternalLink className="w-4 h-4 inline mr-1" />
                      Link via Ayrshare
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Add New Platform */}
      <div className="mt-6 p-6 border-2 border-dashed border-neutral-200 rounded-xl">
        <div className="text-center mb-4">
          <Plus className="w-8 h-8 text-neutral-400 mx-auto mb-2" />
          <p className="text-neutral-600 mb-3">Connect more social media platforms</p>
        </div>

        {/* Available Platforms Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {['facebook', 'youtube', 'tiktok', 'pinterest'].map((platform) => {
            const Icon = platformIcons[platform as keyof typeof platformIcons] || Settings;
            const colorClass = platformColors[platform as keyof typeof platformColors] || 'text-neutral-500 bg-neutral-50';

            return (
              <button
                key={platform}
                onClick={() => handleConnect(platform)}
                className="flex flex-col items-center p-3 border border-neutral-200 rounded-lg hover:border-sage/30 hover:bg-sage/5 transition-all duration-200 group"
              >
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center mb-2 ${colorClass} group-hover:scale-110 transition-transform duration-200`}>
                  <Icon className="w-4 h-4" />
                </div>
                <span className="text-xs font-medium text-neutral-700 capitalize">{platform}</span>
              </button>
            );
          })}
        </div>

        <div className="mt-4 text-center">
          <p className="text-xs text-neutral-500">
            Supported: X/Twitter, LinkedIn, Instagram, Facebook, YouTube, TikTok, Pinterest, and more
          </p>
        </div>
      </div>
    </div>
  );
};

export default ConnectedAccounts;