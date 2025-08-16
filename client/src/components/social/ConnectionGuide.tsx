
import React, { useState } from 'react';
import { ExternalLink, Info, CheckCircle, AlertCircle, ArrowRight } from 'lucide-react';

const ConnectionGuide: React.FC = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  const platforms = [
    {
      name: 'X/Twitter',
      requirements: ['Twitter account with API access', 'Grant all requested permissions'],
      tips: ['Switch to correct account in browser before linking', 'Allow pop-ups in your browser'],
      difficulty: 'Easy'
    },
    {
      name: 'LinkedIn',
      requirements: ['Personal or Company LinkedIn account', 'Admin access for company pages'],
      tips: ['Choose correct page if you have multiple', 'Grant posting permissions'],
      difficulty: 'Easy'
    },
    {
      name: 'Instagram',
      requirements: ['Instagram Business account', 'Connected to Facebook Page'],
      tips: ['Must be Business account, not Personal', 'Ensure Facebook Page connection is active'],
      difficulty: 'Medium'
    },
    {
      name: 'Facebook',
      requirements: ['Facebook Page (not personal profile)', 'Page admin permissions'],
      tips: ['Select correct page if you manage multiple', 'Grant all publishing permissions'],
      difficulty: 'Easy'
    },
    {
      name: 'YouTube',
      requirements: ['YouTube channel', 'Google account access'],
      tips: ['Ensure you have upload permissions', 'Channel must be verified for longer videos'],
      difficulty: 'Medium'
    },
    {
      name: 'TikTok',
      requirements: ['TikTok Business account', 'Verified email address'],
      tips: ['Business account required for API access', 'Follow TikTok\'s content guidelines'],
      difficulty: 'Hard'
    }
  ];

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Easy': return 'text-emerald-600 bg-emerald-50';
      case 'Medium': return 'text-amber-600 bg-amber-50';
      case 'Hard': return 'text-red-600 bg-red-50';
      default: return 'text-neutral-600 bg-neutral-50';
    }
  };

  return (
    <div className="bg-white rounded-2xl p-6 shadow-soft border border-neutral-100">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-blue-500/10 rounded-xl flex items-center justify-center">
            <Info className="w-5 h-5 text-blue-500" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-neutral-900">Connection Guide</h3>
            <p className="text-sm text-neutral-600">How to connect your social media accounts</p>
          </div>
        </div>
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="text-sage hover:text-sage/80 transition-colors duration-200"
        >
          {isExpanded ? 'Hide' : 'Show'} Details
        </button>
      </div>

      {/* Quick Steps */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="flex items-start space-x-3 p-4 bg-blue-50 rounded-xl">
          <div className="w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-bold">1</div>
          <div>
            <h4 className="font-medium text-neutral-900">Configure API</h4>
            <p className="text-sm text-neutral-600">Add your Ayrshare API key</p>
          </div>
        </div>
        <div className="flex items-start space-x-3 p-4 bg-sage/5 rounded-xl">
          <div className="w-6 h-6 bg-sage text-white rounded-full flex items-center justify-center text-sm font-bold">2</div>
          <div>
            <h4 className="font-medium text-neutral-900">Connect Accounts</h4>
            <p className="text-sm text-neutral-600">Link via Ayrshare dashboard</p>
          </div>
        </div>
        <div className="flex items-start space-x-3 p-4 bg-emerald-50 rounded-xl">
          <div className="w-6 h-6 bg-emerald-500 text-white rounded-full flex items-center justify-center text-sm font-bold">3</div>
          <div>
            <h4 className="font-medium text-neutral-900">Start Posting</h4>
            <p className="text-sm text-neutral-600">Manage all accounts here</p>
          </div>
        </div>
      </div>

      {isExpanded && (
        <div className="space-y-4">
          <div className="flex items-center space-x-2 p-3 bg-amber-50 rounded-lg">
            <AlertCircle className="w-5 h-5 text-amber-600" />
            <p className="text-sm text-amber-700">
              <strong>Important:</strong> Grant all permissions during authorization to avoid issues.
            </p>
          </div>

          <div className="grid gap-4">
            {platforms.map((platform) => (
              <div key={platform.name} className="border border-neutral-200 rounded-xl p-4">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="font-medium text-neutral-900">{platform.name}</h4>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(platform.difficulty)}`}>
                    {platform.difficulty}
                  </span>
                </div>

                <div className="grid md:grid-cols-2 gap-4 text-sm">
                  <div>
                    <h5 className="font-medium text-neutral-700 mb-2">Requirements:</h5>
                    <ul className="space-y-1">
                      {platform.requirements.map((req, index) => (
                        <li key={index} className="flex items-start space-x-2">
                          <CheckCircle className="w-3 h-3 text-emerald-500 mt-0.5 flex-shrink-0" />
                          <span className="text-neutral-600">{req}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h5 className="font-medium text-neutral-700 mb-2">Tips:</h5>
                    <ul className="space-y-1">
                      {platform.tips.map((tip, index) => (
                        <li key={index} className="flex items-start space-x-2">
                          <ArrowRight className="w-3 h-3 text-blue-500 mt-0.5 flex-shrink-0" />
                          <span className="text-neutral-600">{tip}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="flex items-center justify-center p-4 bg-neutral-50 rounded-xl">
            <a
              href="https://app.ayrshare.com/dashboard/social-accounts"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-2 text-sage hover:text-sage/80 font-medium transition-colors duration-200"
            >
              <span>Open Ayrshare Dashboard</span>
              <ExternalLink className="w-4 h-4" />
            </a>
          </div>
        </div>
      )}
    </div>
  );
};

export default ConnectionGuide;
