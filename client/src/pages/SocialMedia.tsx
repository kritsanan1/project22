import React, { useState } from 'react';
import { Share2, TrendingUp, MessageCircle, BarChart3, Settings, Calendar } from 'lucide-react';
import { useSocialMedia } from '../contexts/SocialMediaContext';
import PostCreator from '../components/social/PostCreator';
import TrendAnalytics from '../components/social/TrendAnalytics';
import UnifiedInbox from '../components/social/UnifiedInbox';
import SocialAnalytics from '../components/social/SocialAnalytics';
import ConnectedAccounts from '../components/social/ConnectedAccounts';
import PostScheduler from '../components/social/PostScheduler';
import ContentSuggestions from '../components/social/ContentSuggestions';
import { ConfigurationStatus } from '../components/social/ConfigurationStatus';
import { ApiConfigurationDashboard } from '../components/social/ApiConfigurationDashboard';
import ConnectionGuide from '../components/social/ConnectionGuide';

const SocialMedia = () => {
  const { state } = useSocialMedia();
  const [activeTab, setActiveTab] = useState('create');

  const tabs = [
    { id: 'create', label: 'Create Post', icon: Share2 },
    { id: 'scheduled', label: 'Scheduled', icon: Calendar },
    { id: 'suggestions', label: 'Suggestions', icon: TrendingUp },
    { id: 'trends', label: 'Trends', icon: TrendingUp },
    { id: 'inbox', label: 'Inbox', icon: MessageCircle },
    { id: 'analytics', label: 'Analytics', icon: BarChart3 },
    { id: 'accounts', label: 'Accounts', icon: Settings },
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case 'create':
        return <PostCreator onPostCreated={(post) => console.log('Post created:', post)} />;
      case 'scheduled':
        return <PostScheduler />;
      case 'suggestions':
        return <ContentSuggestions />;
      case 'trends':
        return <TrendAnalytics />;
      case 'inbox':
        return <UnifiedInbox />;
      case 'analytics':
        return <SocialAnalytics />;
      case 'accounts':
        return (
          <div className="space-y-6">
            <ConnectionGuide />
            <ConnectedAccounts />
          </div>
        );
      default:
        return <PostCreator onPostCreated={(post) => console.log('Post created:', post)} />;
    }
  };

  // Check if Ayrshare API is configured
  const isConfigured = import.meta.env.VITE_AYRSHARE_API_KEY ? true : false;


  return (
    <div className="max-w-7xl mx-auto px-6 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-neutral-900 mb-2">Social Media Management</h1>
        <p className="text-neutral-600">
          Manage your social media presence across Twitter, Instagram, and LinkedIn
        </p>
      </div>

      {/* Tab Navigation */}
      <div className="bg-white rounded-2xl p-2 shadow-soft border border-neutral-100 mb-8 overflow-x-auto">
        <div className="flex space-x-1 min-w-max">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center space-x-2 px-4 lg:px-6 py-3 rounded-xl font-medium transition-all duration-200 whitespace-nowrap ${
                activeTab === tab.id
                  ? 'bg-sage text-white shadow-soft'
                  : 'text-neutral-600 hover:text-sage hover:bg-sage/5'
              }`}
            >
              <tab.icon className="w-4 h-4" />
              <span className="hidden sm:inline lg:inline">{tab.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Tab Content */}
      <div className="min-h-[600px]">
        {!isConfigured && (
        <ConfigurationStatus
          isConfigured={isConfigured}
          service="Ayrshare"
          className="mb-6"
        />
      )}

      <ApiConfigurationDashboard />
        {renderTabContent()}
      </div>

      {/* Quick Stats */}
      <div className="mt-8 grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl p-6 shadow-soft border border-neutral-100 text-center">
          <div className="w-12 h-12 bg-blue-500/10 rounded-xl flex items-center justify-center mx-auto mb-3">
            <Share2 className="w-6 h-6 text-blue-500" />
          </div>
          <div className="text-2xl font-bold text-neutral-900 mb-1">{state.posts.length}</div>
          <div className="text-sm text-neutral-600">Posts This Month</div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-soft border border-neutral-100 text-center">
          <div className="w-12 h-12 bg-emerald-500/10 rounded-xl flex items-center justify-center mx-auto mb-3">
            <TrendingUp className="w-6 h-6 text-emerald-500" />
          </div>
          <div className="text-2xl font-bold text-neutral-900 mb-1">4.2%</div>
          <div className="text-sm text-neutral-600">Avg Engagement Rate</div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-soft border border-neutral-100 text-center">
          <div className="w-12 h-12 bg-purple-500/10 rounded-xl flex items-center justify-center mx-auto mb-3">
            <MessageCircle className="w-6 h-6 text-purple-500" />
          </div>
          <div className="text-2xl font-bold text-neutral-900 mb-1">{state.interactions.filter(i => !i.isRead).length}</div>
          <div className="text-sm text-neutral-600">Unread Messages</div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-soft border border-neutral-100 text-center">
          <div className="w-12 h-12 bg-orange-500/10 rounded-xl flex items-center justify-center mx-auto mb-3">
            <BarChart3 className="w-6 h-6 text-orange-500" />
          </div>
          <div className="text-2xl font-bold text-neutral-900 mb-1">24.8K</div>
          <div className="text-sm text-neutral-600">Total Reach</div>
        </div>
      </div>
    </div>
  );
};

export default SocialMedia;