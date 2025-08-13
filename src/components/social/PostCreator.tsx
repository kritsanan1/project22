import React, { useState } from 'react';
import { 
  Send, 
  Calendar, 
  Image, 
  X, 
  Twitter, 
  Linkedin, 
  Instagram,
  Facebook,
  Loader2
} from 'lucide-react';
import { useSocialMedia } from '../../contexts/SocialMediaContext';

interface PostCreatorProps {
  onPostCreated?: (post: any) => void;
}

const PostCreator: React.FC<PostCreatorProps> = ({ onPostCreated }) => {
  const { publishPost, state } = useSocialMedia();
  const [isLoading, setIsLoading] = useState(false);
  const [content, setContent] = useState('');
  const [platforms, setPlatforms] = useState<string[]>([]);
  const [scheduledAt, setScheduledAt] = useState('');
  const [mediaFiles, setMediaFiles] = useState<File[]>([]);
  const [mediaUrls, setMediaUrls] = useState<string[]>([]);
  const [errors, setErrors] = useState<any>({});

  const platformIcons = {
    twitter: Twitter,
    linkedin: Linkedin,
    instagram: Instagram,
    facebook: Facebook,
  };

  const platformColors = {
    twitter: 'text-blue-500 border-blue-500',
    linkedin: 'text-blue-700 border-blue-700',
    instagram: 'text-pink-500 border-pink-500',
    facebook: 'text-blue-600 border-blue-600',
  };

  const handlePlatformToggle = (platform: string) => {
    const currentPlatforms = platforms || [];
    const newPlatforms = currentPlatforms.includes(platform)
      ? currentPlatforms.filter((p) => p !== platform)
      : [...currentPlatforms, platform];
    setPlatforms(newPlatforms);
  };

  const handleMediaUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    if (files.length === 0) return;

    setIsLoading(true);
    try {
      // For demo purposes, create mock URLs
      const urls = files.map(file => URL.createObjectURL(file));
      setMediaFiles(prev => [...prev, ...files]);
      setMediaUrls(prev => [...prev, ...urls]);
    } catch (error) {
      console.error('Failed to upload media:', error);
      alert('Failed to upload media. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const removeMedia = (index: number) => {
    setMediaFiles(prev => prev.filter((_, i) => i !== index));
    setMediaUrls(prev => prev.filter((_, i) => i !== index));
  };

  const validateForm = () => {
    const newErrors: any = {};
    
    if (!content.trim()) {
      newErrors.content = 'Content is required';
    } else if (content.length > 2200) {
      newErrors.content = 'Content too long';
    }
    
    if (platforms.length === 0) {
      newErrors.platforms = 'Select at least one platform';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsLoading(true);
    try {
      const postData = {
        content,
        platforms,
        mediaUrls: mediaUrls.length > 0 ? mediaUrls : undefined,
        scheduledAt: scheduledAt || undefined,
      };

      await publishPost(postData);
      
      if (onPostCreated) {
        onPostCreated(postData);
      }

      // Reset form
      setContent('');
      setPlatforms([]);
      setScheduledAt('');
      setMediaFiles([]);
      setMediaUrls([]);
      setErrors({});
      
      alert(scheduledAt ? 'Post scheduled successfully!' : 'Post published successfully!');
    } catch (error) {
      console.error('Failed to create post:', error);
      alert('Failed to create post. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const getCharacterCount = () => {
    const currentContent = content || '';
    const currentPlatforms = platforms || [];
    
    if (currentPlatforms.includes('twitter')) {
      return `${currentContent.length}/280`;
    }
    return `${currentContent.length}/2200`;
  };

  return (
    <div className="bg-white rounded-2xl p-6 shadow-soft border border-neutral-100">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-neutral-900">Create Post</h2>
        <div className="text-sm text-neutral-500">{getCharacterCount()}</div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Content Input */}
        <div>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="What's on your mind?"
            rows={4}
            className="w-full px-4 py-3 border border-neutral-200 rounded-xl focus:ring-2 focus:ring-sage/20 focus:border-sage transition-all duration-200 resize-none"
          />
          {errors.content && (
            <p className="text-red-500 text-sm mt-1">{errors.content.message}</p>
          )}
        </div>

        {/* Platform Selection */}
        <div>
          <label className="block text-sm font-medium text-neutral-700 mb-3">
            Select Platforms
          </label>
          <div className="flex flex-wrap gap-3">
            {Object.entries(platformIcons).map(([platform, Icon]) => (
              <button
                key={platform}
                type="button"
                onClick={() => handlePlatformToggle(platform)}
                className={`flex items-center space-x-2 px-4 py-2 border-2 rounded-xl transition-all duration-200 ${
                  platforms?.includes(platform)
                    ? `${platformColors[platform as keyof typeof platformColors]} bg-opacity-10`
                    : 'border-neutral-200 text-neutral-600 hover:border-neutral-300'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span className="capitalize">{platform}</span>
              </button>
            ))}
          </div>
          {errors.platforms && (
            <p className="text-red-500 text-sm mt-1">{errors.platforms.message}</p>
          )}
        </div>

        {/* Media Upload */}
        <div>
          <label className="block text-sm font-medium text-neutral-700 mb-3">
            Media (Optional)
          </label>
          <div className="space-y-3">
            <input
              type="file"
              multiple
              accept="image/*,video/*"
              onChange={handleMediaUpload}
              className="hidden"
              id="media-upload"
            />
            <label
              htmlFor="media-upload"
              className="flex items-center justify-center w-full px-4 py-3 border-2 border-dashed border-neutral-300 rounded-xl hover:border-sage transition-colors duration-200 cursor-pointer"
            >
              <Image className="w-5 h-5 text-neutral-500 mr-2" />
              <span className="text-neutral-600">Upload Images or Videos</span>
            </label>

            {/* Media Preview */}
            {mediaFiles.length > 0 && (
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {mediaFiles.map((file, index) => (
                  <div key={index} className="relative">
                    <div className="aspect-square bg-neutral-100 rounded-lg overflow-hidden">
                      {file.type.startsWith('image/') ? (
                        <img
                          src={URL.createObjectURL(file)}
                          alt="Preview"
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <span className="text-neutral-500 text-sm">Video</span>
                        </div>
                      )}
                    </div>
                    <button
                      type="button"
                      onClick={() => removeMedia(index)}
                      className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center hover:bg-red-600 transition-colors duration-200"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Schedule */}
        <div>
          <label className="block text-sm font-medium text-neutral-700 mb-3">
            Schedule (Optional)
          </label>
          <input
            value={scheduledAt}
            onChange={(e) => setScheduledAt(e.target.value)}
            type="datetime-local"
            className="px-4 py-3 border border-neutral-200 rounded-xl focus:ring-2 focus:ring-sage/20 focus:border-sage transition-all duration-200"
          />
        </div>

        {/* Submit Button */}
        <div className="flex items-center justify-end space-x-3">
          <button
            type="button"
            onClick={() => {
              setContent('');
              setPlatforms([]);
              setScheduledAt('');
              setMediaFiles([]);
              setMediaUrls([]);
              setErrors({});
            }}
            className="px-6 py-3 border border-neutral-200 rounded-xl font-medium text-neutral-700 hover:bg-neutral-50 transition-colors duration-200"
          >
            Clear
          </button>
          <button
            type="submit"
            disabled={isLoading || state.isLoading}
            className="bg-sage text-white px-6 py-3 rounded-xl font-medium hover:bg-sage/90 transition-colors duration-200 flex items-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {(isLoading || state.isLoading) ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : scheduledAt && new Date(scheduledAt).getTime() > Date.now() ? (
              <Calendar className="w-4 h-4" />
            ) : (
              <Send className="w-4 h-4" />
            )}
            <span>
              {(isLoading || state.isLoading) ? 'Processing...' : 
               scheduledAt && new Date(scheduledAt).getTime() > Date.now() ? 'Schedule' : 'Publish'}
            </span>
          </button>
        </div>
      </form>
    </div>
  );
};

export default PostCreator;