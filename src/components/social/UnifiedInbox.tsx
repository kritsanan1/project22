import React, { useState, useEffect } from 'react';
import { 
  MessageCircle, 
  AtSign, 
  Mail, 
  Reply, 
  MoreHorizontal,
  Filter,
  CheckCircle,
  Circle,
  Twitter,
  Linkedin,
  Instagram
} from 'lucide-react';
import { useSocialMedia } from '../../contexts/SocialMediaContext';
import { SocialInteraction } from '../../types/social';

const UnifiedInbox: React.FC = () => {
  const { state, fetchInteractions, markInteractionAsRead } = useSocialMedia();
  const [selectedFilter, setSelectedFilter] = useState<string>('all');
  const [selectedType, setSelectedType] = useState<string>('all');
  const [replyingTo, setReplyingTo] = useState<string | null>(null);
  const [replyContent, setReplyContent] = useState('');

  const filters = [
    { value: 'all', label: 'All Platforms' },
    { value: 'twitter', label: 'Twitter' },
    { value: 'instagram', label: 'Instagram' },
    { value: 'linkedin', label: 'LinkedIn' },
  ];

  const types = [
    { value: 'all', label: 'All Types' },
    { value: 'comment', label: 'Comments' },
    { value: 'mention', label: 'Mentions' },
    { value: 'dm', label: 'Direct Messages' },
    { value: 'reply', label: 'Replies' },
  ];


  useEffect(() => {
    fetchInteractions();
  }, []);

  const filteredInteractions = state.interactions.filter(interaction => {
    const platformMatch = selectedFilter === 'all' || interaction.platform === selectedFilter;
    const typeMatch = selectedType === 'all' || interaction.type === selectedType;
    return platformMatch && typeMatch;
  });

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'comment':
        return <MessageCircle className="w-4 h-4" />;
      case 'mention':
        return <AtSign className="w-4 h-4" />;
      case 'dm':
        return <Mail className="w-4 h-4" />;
      case 'reply':
        return <Reply className="w-4 h-4" />;
      default:
        return <MessageCircle className="w-4 h-4" />;
    }
  };

  const getPlatformIcon = (platform: string) => {
    switch (platform) {
      case 'twitter':
        return <Twitter className="w-4 h-4 text-blue-500" />;
      case 'instagram':
        return <Instagram className="w-4 h-4 text-pink-500" />;
      case 'linkedin':
        return <Linkedin className="w-4 h-4 text-blue-700" />;
      default:
        return <MessageCircle className="w-4 h-4" />;
    }
  };


  const handleReply = async (interactionId: string) => {
    if (!replyContent.trim()) return;

    try {
      // This would integrate with the actual social media APIs to send replies
      console.log('Sending reply:', { interactionId, content: replyContent });
      
      // For now, just close the reply interface
      setReplyingTo(null);
      setReplyContent('');
      alert('Reply sent successfully!');
    } catch (error) {
      console.error('Failed to send reply:', error);
      alert('Failed to send reply. Please try again.');
    }
  };

  const unreadCount = state.interactions.filter(i => !i.isRead).length;

  return (
    <div className="bg-white rounded-2xl p-6 shadow-soft border border-neutral-100">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-warm-blue/10 rounded-xl flex items-center justify-center">
            <MessageCircle className="w-5 h-5 text-warm-blue" />
          </div>
          <div>
            <h2 className="text-xl font-semibold text-neutral-900">Unified Inbox</h2>
            <p className="text-sm text-neutral-600">
              {unreadCount} unread {unreadCount === 1 ? 'interaction' : 'interactions'}
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-3">
          <select
            value={selectedFilter}
            onChange={(e) => setSelectedFilter(e.target.value)}
            className="px-3 py-2 border border-neutral-200 rounded-lg text-sm focus:ring-2 focus:ring-sage/20 focus:border-sage"
          >
            {filters.map((filter) => (
              <option key={filter.value} value={filter.value}>
                {filter.label}
              </option>
            ))}
          </select>

          <select
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value)}
            className="px-3 py-2 border border-neutral-200 rounded-lg text-sm focus:ring-2 focus:ring-sage/20 focus:border-sage"
          >
            {types.map((type) => (
              <option key={type.value} value={type.value}>
                {type.label}
              </option>
            ))}
          </select>

          <button className="p-2 border border-neutral-200 rounded-lg hover:bg-neutral-50 transition-colors duration-200">
            <Filter className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Interactions List */}
      <div className="space-y-4">
        {filteredInteractions.length === 0 ? (
          <div className="text-center py-8">
            <MessageCircle className="w-12 h-12 text-neutral-300 mx-auto mb-3" />
            <p className="text-neutral-500">No interactions found</p>
          </div>
        ) : (
          filteredInteractions.map((interaction) => (
            <div
              key={interaction.id}
              className={`p-4 border rounded-xl transition-all duration-200 hover:shadow-soft ${
                interaction.isRead ? 'border-neutral-200' : 'border-sage/30 bg-sage/5'
              }`}
            >
              <div className="flex items-start space-x-3">
                <img
                  src={interaction.author.profileImage || 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=100'}
                  alt={interaction.author.username}
                  className="w-10 h-10 rounded-full object-cover"
                />

                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center space-x-2">
                      <span className="font-medium text-neutral-900">
                        @{interaction.author.username}
                      </span>
                      <div className="flex items-center space-x-1">
                        {getPlatformIcon(interaction.platform)}
                        {getTypeIcon(interaction.type)}
                      </div>
                      <span className="text-xs text-neutral-500 capitalize">
                        {interaction.type}
                      </span>
                    </div>

                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => markInteractionAsRead(interaction.id)}
                        className="p-1 hover:bg-neutral-100 rounded transition-colors duration-200"
                      >
                        {interaction.isRead ? (
                          <CheckCircle className="w-4 h-4 text-sage" />
                        ) : (
                          <Circle className="w-4 h-4 text-neutral-400" />
                        )}
                      </button>
                      <button className="p-1 hover:bg-neutral-100 rounded transition-colors duration-200">
                        <MoreHorizontal className="w-4 h-4 text-neutral-400" />
                      </button>
                    </div>
                  </div>

                  <p className="text-neutral-700 mb-3">{interaction.content}</p>

                  <div className="flex items-center justify-between">
                    <span className="text-xs text-neutral-500">
                      {new Date(interaction.createdAt).toLocaleString()}
                    </span>

                    <button
                      onClick={() => setReplyingTo(interaction.id)}
                      className="text-sage hover:text-sage/80 text-sm font-medium transition-colors duration-200 flex items-center space-x-1"
                    >
                      <Reply className="w-3 h-3" />
                      <span>Reply</span>
                    </button>
                  </div>

                  {/* Reply Interface */}
                  {replyingTo === interaction.id && (
                    <div className="mt-4 p-3 bg-neutral-50 rounded-lg">
                      <textarea
                        value={replyContent}
                        onChange={(e) => setReplyContent(e.target.value)}
                        placeholder="Type your reply..."
                        rows={3}
                        className="w-full px-3 py-2 border border-neutral-200 rounded-lg focus:ring-2 focus:ring-sage/20 focus:border-sage transition-all duration-200 resize-none"
                      />
                      <div className="flex items-center justify-end space-x-2 mt-2">
                        <button
                          onClick={() => {
                            setReplyingTo(null);
                            setReplyContent('');
                          }}
                          className="px-3 py-1 text-sm text-neutral-600 hover:text-neutral-800 transition-colors duration-200"
                        >
                          Cancel
                        </button>
                        <button
                          onClick={() => handleReply(interaction.id)}
                          disabled={!replyContent.trim()}
                          className="px-4 py-1 bg-sage text-white text-sm rounded-lg hover:bg-sage/90 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          Send Reply
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Quick Actions */}
      {unreadCount > 0 && (
        <div className="mt-6 p-4 bg-neutral-50 rounded-xl">
          <div className="flex items-center justify-between">
            <span className="text-sm text-neutral-600">
              {unreadCount} unread interactions
            </span>
            <button
              onClick={() => {
                state.interactions.forEach(interaction => {
                  if (!interaction.isRead) {
                    markInteractionAsRead(interaction.id);
                  }
                });
              }}
              className="text-sage hover:text-sage/80 text-sm font-medium transition-colors duration-200"
            >
              Mark all as read
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default UnifiedInbox;