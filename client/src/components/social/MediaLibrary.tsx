import React, { useState, useEffect } from 'react';
import { Upload, Image, Video, Search, Filter, Trash2, Download, Eye, Plus } from 'lucide-react';
// Using inline button and input styles since UI components are not set up
// In a production app, these would import from a design system
import { ayrshareService } from '../../services/ayrshareService';

interface MediaItem {
  id: string;
  type: 'image' | 'video';
  url: string;
  thumbnail?: string;
  name: string;
  size: number;
  uploadedAt: string;
  dimensions?: {
    width: number;
    height: number;
  };
}

interface MediaLibraryProps {
  onSelectMedia?: (media: MediaItem[]) => void;
  multiSelect?: boolean;
  filterType?: 'image' | 'video' | 'all';
}

const MediaLibrary: React.FC<MediaLibraryProps> = ({ 
  onSelectMedia, 
  multiSelect = false, 
  filterType = 'all' 
}) => {
  const [media, setMedia] = useState<MediaItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [typeFilter, setTypeFilter] = useState<'all' | 'image' | 'video'>(filterType);
  const [uploadProgress, setUploadProgress] = useState<{ [key: string]: number }>({});

  useEffect(() => {
    loadMediaLibrary();
  }, [typeFilter]);

  const loadMediaLibrary = async () => {
    try {
      setLoading(true);
      const response = await ayrshareService.getMediaLibrary(
        typeFilter === 'all' ? undefined : typeFilter
      );
      
      // Transform API response to MediaItem format
      const mediaItems: MediaItem[] = (response.media || []).map((item: any) => ({
        id: item.id,
        type: item.type,
        url: item.url,
        thumbnail: item.thumbnail || item.url,
        name: item.name || `${item.type}-${item.id}`,
        size: item.size || 0,
        uploadedAt: item.createdAt || new Date().toISOString(),
        dimensions: item.dimensions,
      }));
      
      setMedia(mediaItems);
    } catch (error) {
      console.error('Failed to load media library:', error);
      // Show mock data for demo
      setMedia(getMockMediaItems());
    } finally {
      setLoading(false);
    }
  };

  const getMockMediaItems = (): MediaItem[] => [
    {
      id: '1',
      type: 'image',
      url: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=500',
      thumbnail: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=200',
      name: 'business-analytics.jpg',
      size: 245760,
      uploadedAt: new Date(Date.now() - 86400000).toISOString(),
      dimensions: { width: 1920, height: 1080 }
    },
    {
      id: '2',
      type: 'image',
      url: 'https://images.unsplash.com/photo-1553877522-43269d4ea984?w=500',
      thumbnail: 'https://images.unsplash.com/photo-1553877522-43269d4ea984?w=200',
      name: 'team-meeting.jpg',
      size: 189440,
      uploadedAt: new Date(Date.now() - 172800000).toISOString(),
      dimensions: { width: 1600, height: 900 }
    },
    {
      id: '3',
      type: 'video',
      url: 'https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4',
      thumbnail: 'https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?w=200',
      name: 'product-demo.mp4',
      size: 1048576,
      uploadedAt: new Date(Date.now() - 259200000).toISOString(),
      dimensions: { width: 1280, height: 720 }
    }
  ];

  const handleFileUpload = async (files: FileList) => {
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const uploadId = `${file.name}-${Date.now()}`;
      
      try {
        setUploadProgress(prev => ({ ...prev, [uploadId]: 0 }));
        
        // Simulate upload progress
        const progressInterval = setInterval(() => {
          setUploadProgress(prev => {
            const current = prev[uploadId] || 0;
            if (current < 90) {
              return { ...prev, [uploadId]: current + 10 };
            }
            return prev;
          });
        }, 200);

        const response = await ayrshareService.uploadMedia(file);
        
        clearInterval(progressInterval);
        setUploadProgress(prev => ({ ...prev, [uploadId]: 100 }));
        
        // Add uploaded media to library
        const newMediaItem: MediaItem = {
          id: response.id || uploadId,
          type: file.type.startsWith('image/') ? 'image' : 'video',
          url: response.url || URL.createObjectURL(file),
          thumbnail: response.thumbnail || (file.type.startsWith('image/') ? URL.createObjectURL(file) : undefined),
          name: file.name,
          size: file.size,
          uploadedAt: new Date().toISOString(),
          dimensions: response.dimensions,
        };
        
        setMedia(prev => [newMediaItem, ...prev]);
        
        // Clean up progress after a delay
        setTimeout(() => {
          setUploadProgress(prev => {
            const { [uploadId]: removed, ...rest } = prev;
            return rest;
          });
        }, 2000);
        
      } catch (error) {
        console.error('Upload failed:', error);
        setUploadProgress(prev => {
          const { [uploadId]: removed, ...rest } = prev;
          return rest;
        });
      }
    }
  };

  const toggleSelection = (itemId: string) => {
    if (multiSelect) {
      setSelectedItems(prev => 
        prev.includes(itemId) 
          ? prev.filter(id => id !== itemId)
          : [...prev, itemId]
      );
    } else {
      setSelectedItems([itemId]);
    }
  };

  const getSelectedMedia = () => {
    return media.filter(item => selectedItems.includes(item.id));
  };

  const handleConfirmSelection = () => {
    if (onSelectMedia) {
      onSelectMedia(getSelectedMedia());
    }
  };

  const filteredMedia = media.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = typeFilter === 'all' || item.type === typeFilter;
    return matchesSearch && matchesType;
  });

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <div className="bg-white rounded-2xl p-6 shadow-soft border border-neutral-100" data-testid="media-library">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-semibold text-neutral-900" data-testid="media-library-title">
          Media Library
        </h2>
        
        <div className="flex items-center space-x-3">
          {/* Upload Button */}
          <label htmlFor="media-upload" className="cursor-pointer">
            <button 
              className="inline-flex items-center px-3 py-2 border border-neutral-200 rounded-lg text-sm font-medium text-neutral-700 bg-white hover:bg-neutral-50 transition-colors"
              data-testid="upload-media-button"
            >
              <Upload className="w-4 h-4 mr-2" />
              Upload
            </button>
          </label>
          <input
            id="media-upload"
            type="file"
            multiple
            accept="image/*,video/*"
            onChange={(e) => e.target.files && handleFileUpload(e.target.files)}
            className="hidden"
            data-testid="media-upload-input"
          />
          
          {/* Unsplash Integration */}
          <button 
            className="inline-flex items-center px-3 py-2 border border-neutral-200 rounded-lg text-sm font-medium text-neutral-700 bg-white hover:bg-neutral-50 transition-colors"
            onClick={() => {/* TODO: Open Unsplash search modal */}}
            data-testid="unsplash-search-button"
          >
            <Plus className="w-4 h-4 mr-2" />
            Unsplash
          </button>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="flex items-center space-x-4 mb-6">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-400 w-4 h-4" />
          <input
            type="text"
            placeholder="Search media..."
            value={searchQuery}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchQuery(e.target.value)}
            className="flex-1 pl-10 pr-3 py-2 border border-neutral-200 rounded-lg focus:ring-2 focus:ring-sage/20 focus:border-sage"
            data-testid="media-search-input"
          />
        </div>
        
        <div className="flex items-center space-x-2">
          <Filter className="w-4 h-4 text-neutral-500" />
          <select
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value as 'all' | 'image' | 'video')}
            className="px-3 py-2 border border-neutral-200 rounded-lg text-sm focus:ring-2 focus:ring-sage/20 focus:border-sage"
            data-testid="media-type-filter"
          >
            <option value="all">All Types</option>
            <option value="image">Images</option>
            <option value="video">Videos</option>
          </select>
        </div>
      </div>

      {/* Upload Progress */}
      {Object.keys(uploadProgress).length > 0 && (
        <div className="mb-4 space-y-2">
          {Object.entries(uploadProgress).map(([id, progress]) => (
            <div key={id} className="bg-neutral-50 rounded-lg p-3">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-neutral-700">
                  {id.split('-')[0]}
                </span>
                <span className="text-sm text-neutral-500">{progress}%</span>
              </div>
              <div className="w-full bg-neutral-200 rounded-full h-2">
                <div 
                  className="bg-sage h-2 rounded-full transition-all duration-300"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Media Grid */}
      {loading ? (
        <div className="text-center py-12">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-sage"></div>
          <p className="text-neutral-500 mt-2">Loading media...</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4" data-testid="media-grid">
          {filteredMedia.map((item) => (
            <div
              key={item.id}
              className={`relative group cursor-pointer rounded-xl overflow-hidden border-2 transition-all duration-200 ${
                selectedItems.includes(item.id)
                  ? 'border-sage shadow-md'
                  : 'border-transparent hover:border-neutral-200'
              }`}
              onClick={() => toggleSelection(item.id)}
              data-testid={`media-item-${item.id}`}
            >
              {/* Media Preview */}
              <div className="aspect-square bg-neutral-100 relative">
                {item.type === 'image' ? (
                  <img
                    src={item.thumbnail || item.url}
                    alt={item.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-neutral-900">
                    <Video className="w-8 h-8 text-white" />
                    {item.thumbnail && (
                      <img
                        src={item.thumbnail}
                        alt={item.name}
                        className="absolute inset-0 w-full h-full object-cover opacity-80"
                      />
                    )}
                  </div>
                )}
                
                {/* Type Badge */}
                <div className="absolute top-2 left-2">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium text-white ${
                    item.type === 'image' ? 'bg-blue-500' : 'bg-purple-500'
                  }`}>
                    {item.type === 'image' ? <Image className="w-3 h-3" /> : <Video className="w-3 h-3" />}
                  </span>
                </div>
                
                {/* Selection Indicator */}
                {selectedItems.includes(item.id) && (
                  <div className="absolute top-2 right-2 w-6 h-6 bg-sage rounded-full flex items-center justify-center">
                    <div className="w-3 h-3 bg-white rounded-full"></div>
                  </div>
                )}
                
                {/* Hover Actions */}
                <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center">
                  <div className="flex space-x-2">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        window.open(item.url, '_blank');
                      }}
                      className="p-2 bg-white rounded-full hover:bg-neutral-100 transition-colors"
                      title="View full size"
                    >
                      <Eye className="w-4 h-4 text-neutral-700" />
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        // TODO: Implement download
                      }}
                      className="p-2 bg-white rounded-full hover:bg-neutral-100 transition-colors"
                      title="Download"
                    >
                      <Download className="w-4 h-4 text-neutral-700" />
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        // TODO: Implement delete with confirmation
                      }}
                      className="p-2 bg-red-500 rounded-full hover:bg-red-600 transition-colors"
                      title="Delete"
                    >
                      <Trash2 className="w-4 h-4 text-white" />
                    </button>
                  </div>
                </div>
              </div>
              
              {/* Media Info */}
              <div className="p-3">
                <h4 className="text-sm font-medium text-neutral-900 truncate" title={item.name}>
                  {item.name}
                </h4>
                <div className="flex items-center justify-between mt-1">
                  <span className="text-xs text-neutral-500">
                    {formatFileSize(item.size)}
                  </span>
                  {item.dimensions && (
                    <span className="text-xs text-neutral-500">
                      {item.dimensions.width}×{item.dimensions.height}
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
      
      {filteredMedia.length === 0 && !loading && (
        <div className="text-center py-12">
          <Image className="w-12 h-12 text-neutral-300 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-neutral-900 mb-2">No media found</h3>
          <p className="text-neutral-500 mb-4">
            {searchQuery ? 'Try adjusting your search terms' : 'Upload your first image or video to get started'}
          </p>
          <button 
            className="inline-flex items-center px-3 py-2 border border-neutral-200 rounded-lg text-sm font-medium text-neutral-700 bg-white hover:bg-neutral-50 transition-colors"
            onClick={() => document.getElementById('media-upload')?.click()}
          >
            <Upload className="w-4 h-4 mr-2" />
            Upload Media
          </button>
        </div>
      )}

      {/* Selection Actions */}
      {onSelectMedia && selectedItems.length > 0 && (
        <div className="mt-6 flex items-center justify-between p-4 bg-sage/5 rounded-xl">
          <span className="text-sm font-medium text-neutral-700">
            {selectedItems.length} item{selectedItems.length !== 1 ? 's' : ''} selected
          </span>
          <div className="flex space-x-2">
            <button 
              className="inline-flex items-center px-3 py-1.5 border border-neutral-200 rounded-lg text-sm font-medium text-neutral-700 bg-white hover:bg-neutral-50 transition-colors"
              onClick={() => setSelectedItems([])}
              data-testid="clear-selection-button"
            >
              Clear
            </button>
            <button 
              className="inline-flex items-center px-3 py-1.5 bg-sage text-white rounded-lg text-sm font-medium hover:bg-sage/90 transition-colors"
              onClick={handleConfirmSelection}
              data-testid="confirm-selection-button"
            >
              Use Selected
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default MediaLibrary;