import React, { useState, useEffect } from 'react';
import { 
  Plus, 
  CheckCircle, 
  AlertCircle, 
  RefreshCw,
  Twitter,
  Linkedin,
  Instagram,
  Facebook,
  Settings
} from 'lucide-react';
import { useSocialMedia } from '../../contexts/SocialMediaContext';
import { SocialAccount } from '../../types/social';
import { ConfigurationStatus } from './ConfigurationStatus';

const ConnectedAccounts: React.FC = () => {
  const { state, fetchAccounts } = useSocialMedia();
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
  }, []);

  const handleConnect = (platform: string) => {
    console.log('Connecting to platform:', platform);
    // This would typically redirect to OAuth flow
    alert(`Redirecting to ${platform} authentication...`);
  };

  const handleDisconnect = (accountId: string) => {
    console.log('Disconnecting account:', accountId);
    // Implement disconnect logic
    alert('Account disconnected successfully!');
    fetchAccounts();
  };

  return (
    <div className="bg-white rounded-2xl p-6 shadow-soft border border-neutral-100">
      <ConfigurationStatus 
        isConfigured={isConfigured} 
        service="Ayrshare" 
        className="mb-4"
      />
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-sage/10 rounded-xl flex items-center justify-center">
            <Settings className="w-5 h-5 text-sage" />
          </div>
          <div>
            <h2 className="text-xl font-semibold text-neutral-900">Connected Accounts</h2>
            <p className="text-sm text-neutral-600">Manage your social media connections</p>
          </div>
        </div>

        <button
          onClick={fetchAccounts}
          disabled={state.isLoading}
          className="p-2 border border-neutral-200 rounded-lg hover:bg-neutral-50 transition-colors duration-200 disabled:opacity-50"
        >
          <RefreshCw className={`w-4 h-4 ${state.isLoading ? 'animate-spin' : ''}`} />
        </button>
      </div>

      <div className="space-y-4">
        {state.accounts.map((account) => {
          const Icon = platformIcons[account.platform as keyof typeof platformIcons];
          const colorClass = platformColors[account.platform as keyof typeof platformColors];

          return (
            <div
              key={account.id}
              className="flex items-center justify-between p-4 border border-neutral-200 rounded-xl hover:border-neutral-300 transition-all duration-200"
            >
              <div className="flex items-center space-x-4">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${colorClass}`}>
                  <Icon className="w-6 h-6" />
                </div>

                <div>
                  <div className="flex items-center space-x-2">
                    <h3 className="font-medium text-neutral-900 capitalize">
                      {account.platform}
                    </h3>
                    {account.isConnected ? (
                      <CheckCircle className="w-4 h-4 text-emerald-500" />
                    ) : (
                      <AlertCircle className="w-4 h-4 text-amber-500" />
                    )}
                  </div>
                  <div className="flex items-center space-x-2 text-sm text-neutral-600">
                    <span>{account.username}</span>
                    {account.lastSync && (
                      <>
                        <span>•</span>
                        <span>Last sync: {new Date(account.lastSync).toLocaleDateString()}</span>
                      </>
                    )}
                  </div>
                </div>
              </div>

              <div className="flex items-center space-x-2">
                {account.isConnected ? (
                  <button
                    onClick={() => handleDisconnect(account.id)}
                    className="px-4 py-2 text-sm border border-red-200 text-red-600 rounded-lg hover:bg-red-50 transition-colors duration-200"
                  >
                    Disconnect
                  </button>
                ) : (
                  <button
                    onClick={() => handleConnect(account.platform)}
                    className="px-4 py-2 text-sm bg-sage text-white rounded-lg hover:bg-sage/90 transition-colors duration-200 flex items-center space-x-2"
                  >
                    <Plus className="w-3 h-3" />
                    <span>Connect</span>
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Add New Platform */}
      <div className="mt-6 p-4 border-2 border-dashed border-neutral-200 rounded-xl text-center">
        <Plus className="w-8 h-8 text-neutral-400 mx-auto mb-2" />
        <p className="text-neutral-600 mb-3">Connect more social media platforms</p>
        <button className="text-sage hover:text-sage/80 font-medium transition-colors duration-200">
          Browse Available Platforms
        </button>
      </div>
    </div>
  );
};

export default ConnectedAccounts;