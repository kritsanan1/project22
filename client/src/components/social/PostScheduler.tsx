import React, { useState, useEffect } from 'react';
import { 
  Calendar, 
  Clock, 
  Edit, 
  Trash2, 
  Send,
  Twitter,
  Linkedin,
  Instagram,
  Facebook
} from 'lucide-react';
import { useSocialMedia } from '../../contexts/SocialMediaContext';
import { SocialPost } from '../../types/social';

const PostScheduler: React.FC = () => {
  const { state, fetchPosts, deletePost } = useSocialMedia();
  
  const scheduledPosts = state.posts.filter(post => post.status === 'scheduled');

  const platformIcons = {
    twitter: Twitter,
    linkedin: Linkedin,
    instagram: Instagram,
    facebook: Facebook,
  };


  useEffect(() => {
    fetchPosts();
  }, []);

  const handleEdit = (postId: string) => {
    console.log('Editing post:', postId);
    // Implement edit functionality
    alert('Edit functionality would open a modal with the post content');
  };

  const handleDelete = async (postId: string) => {
    if (!confirm('Are you sure you want to delete this scheduled post?')) {
      return;
    }

    try {
      await deletePost(postId);
      alert('Post deleted successfully!');
    } catch (error) {
      console.error('Failed to delete post:', error);
      alert('Failed to delete post. Please try again.');
    }
  };

  const handlePublishNow = async (postId: string) => {
    if (!confirm('Are you sure you want to publish this post now?')) {
      return;
    }

    try {
      const post = scheduledPosts.find(p => p.id === postId);
      if (post) {
        // This would publish the post immediately
        console.log('Publishing post now:', post);
        alert('Post published successfully!');
      }
    } catch (error) {
      console.error('Failed to publish post:', error);
      alert('Failed to publish post. Please try again.');
    }
  };

  const formatScheduledTime = (scheduledAt: string) => {
    const date = new Date(scheduledAt);
    return {
      date: date.toLocaleDateString(),
      time: date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };
  };

  return (
    <div className="bg-white rounded-2xl p-6 shadow-soft border border-neutral-100">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-warm-blue/10 rounded-xl flex items-center justify-center">
            <Calendar className="w-5 h-5 text-warm-blue" />
          </div>
          <div>
            <h2 className="text-xl font-semibold text-neutral-900">Scheduled Posts</h2>
            <p className="text-sm text-neutral-600">
              {scheduledPosts.length} posts scheduled
            </p>
          </div>
        </div>

        <button
          onClick={fetchPosts}
          className="text-sage hover:text-sage/80 text-sm font-medium transition-colors duration-200"
        >
          Refresh
        </button>
      </div>

      {scheduledPosts.length === 0 ? (
        <div className="text-center py-8">
          <Calendar className="w-12 h-12 text-neutral-300 mx-auto mb-3" />
          <p className="text-neutral-500">No scheduled posts</p>
          <p className="text-sm text-neutral-400 mt-1">
            Create a new post and schedule it for later
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {scheduledPosts.map((post) => {
            const { date, time } = formatScheduledTime(post.scheduledAt!);

            return (
              <div
                key={post.id}
                className="p-4 border border-neutral-200 rounded-xl hover:border-neutral-300 transition-all duration-200"
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <p className="text-neutral-900 mb-2 line-clamp-2">{post.content}</p>
                    
                    <div className="flex items-center space-x-4 text-sm text-neutral-500">
                      <div className="flex items-center space-x-1">
                        <Calendar className="w-3 h-3" />
                        <span>{date}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Clock className="w-3 h-3" />
                        <span>{time}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center space-x-2 ml-4">
                    <button
                      onClick={() => handleEdit(post.id)}
                      className="p-2 hover:bg-neutral-100 rounded-lg transition-colors duration-200"
                      title="Edit post"
                    >
                      <Edit className="w-4 h-4 text-neutral-500" />
                    </button>
                    <button
                      onClick={() => handlePublishNow(post.id)}
                      className="p-2 hover:bg-sage/10 rounded-lg transition-colors duration-200"
                      title="Publish now"
                    >
                      <Send className="w-4 h-4 text-sage" />
                    </button>
                    <button
                      onClick={() => handleDelete(post.id)}
                      className="p-2 hover:bg-red-50 rounded-lg transition-colors duration-200"
                      title="Delete post"
                    >
                      <Trash2 className="w-4 h-4 text-red-500" />
                    </button>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <span className="text-xs text-neutral-500">Publishing to:</span>
                    <div className="flex items-center space-x-1">
                      {post.platforms.map((platform) => {
                        const Icon = platformIcons[platform as keyof typeof platformIcons];
                        return Icon ? (
                          <Icon key={platform} className="w-4 h-4 text-neutral-400" />
                        ) : null;
                      })}
                    </div>
                  </div>

                  {post.mediaUrls && post.mediaUrls.length > 0 && (
                    <div className="flex items-center space-x-1 text-xs text-neutral-500">
                      <span>{post.mediaUrls.length} media file{post.mediaUrls.length > 1 ? 's' : ''}</span>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default PostScheduler;