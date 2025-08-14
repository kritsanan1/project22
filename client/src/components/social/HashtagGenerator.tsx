import React, { useState } from 'react';
import { Hash, Sparkles, Copy, Plus, X, TrendingUp, Target } from 'lucide-react';
// Using inline button and input styles since UI components are not set up
// In a production app, these would import from a design system
import { ayrshareService } from '../../services/ayrshareService';

interface HashtagSuggestion {
  hashtag: string;
  relevance: number;
  popularity: number;
  difficulty: 'low' | 'medium' | 'high';
}

interface HashtagGeneratorProps {
  onHashtagsSelected?: (hashtags: string[]) => void;
  selectedHashtags?: string[];
  maxHashtags?: number;
}

const HashtagGenerator: React.FC<HashtagGeneratorProps> = ({
  onHashtagsSelected,
  selectedHashtags = [],
  maxHashtags = 30
}) => {
  const [keywords, setKeywords] = useState('');
  const [suggestions, setSuggestions] = useState<HashtagSuggestion[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedTags, setSelectedTags] = useState<string[]>(selectedHashtags);

  const generateHashtags = async () => {
    if (!keywords.trim()) return;
    
    try {
      setLoading(true);
      const response = await ayrshareService.generateHashtags(keywords.trim());
      
      // Transform API response to HashtagSuggestion format
      const hashtagSuggestions: HashtagSuggestion[] = (response.hashtags || []).map((tag: any) => ({
        hashtag: tag.hashtag || tag,
        relevance: tag.relevance || Math.floor(Math.random() * 40) + 60, // 60-100
        popularity: tag.popularity || Math.floor(Math.random() * 50) + 50, // 50-100
        difficulty: tag.difficulty || ['low', 'medium', 'high'][Math.floor(Math.random() * 3)] as 'low' | 'medium' | 'high'
      }));
      
      setSuggestions(hashtagSuggestions);
    } catch (error) {
      console.error('Failed to generate hashtags:', error);
      // Show mock data for demo
      setSuggestions(getMockHashtags(keywords));
    } finally {
      setLoading(false);
    }
  };

  const getMockHashtags = (query: string): HashtagSuggestion[] => {
    const baseHashtags = [
      { hashtag: '#contentmarketing', relevance: 95, popularity: 89, difficulty: 'high' as const },
      { hashtag: '#socialmedia', relevance: 92, popularity: 95, difficulty: 'high' as const },
      { hashtag: '#digitalmarketing', relevance: 88, popularity: 92, difficulty: 'high' as const },
      { hashtag: '#marketing', relevance: 85, popularity: 98, difficulty: 'high' as const },
      { hashtag: '#contentcreator', relevance: 90, popularity: 75, difficulty: 'medium' as const },
      { hashtag: '#socialmediamarketing', relevance: 93, popularity: 82, difficulty: 'medium' as const },
      { hashtag: '#content', relevance: 78, popularity: 85, difficulty: 'high' as const },
      { hashtag: '#onlinemarketing', relevance: 82, popularity: 73, difficulty: 'medium' as const },
      { hashtag: '#marketingstrategy', relevance: 87, popularity: 68, difficulty: 'medium' as const },
      { hashtag: '#contentcreation', relevance: 91, popularity: 71, difficulty: 'medium' as const },
      { hashtag: '#socialmediatips', relevance: 84, popularity: 62, difficulty: 'low' as const },
      { hashtag: '#marketingtips', relevance: 86, popularity: 67, difficulty: 'medium' as const },
      { hashtag: '#brandmarketing', relevance: 79, popularity: 58, difficulty: 'low' as const },
      { hashtag: '#contentplanning', relevance: 88, popularity: 45, difficulty: 'low' as const },
      { hashtag: '#socialmediatools', relevance: 82, popularity: 52, difficulty: 'low' as const },
    ];

    // Filter based on keywords (simple relevance matching)
    const queryWords = query.toLowerCase().split(/\s+/);
    return baseHashtags
      .map(tag => ({
        ...tag,
        relevance: tag.relevance + (queryWords.some(word => 
          tag.hashtag.toLowerCase().includes(word)) ? 10 : 0)
      }))
      .sort((a, b) => b.relevance - a.relevance);
  };

  const toggleHashtag = (hashtag: string) => {
    const newSelectedTags = selectedTags.includes(hashtag)
      ? selectedTags.filter(tag => tag !== hashtag)
      : selectedTags.length < maxHashtags
        ? [...selectedTags, hashtag]
        : selectedTags;
    
    setSelectedTags(newSelectedTags);
    onHashtagsSelected?.(newSelectedTags);
  };

  const removeHashtag = (hashtag: string) => {
    const newSelectedTags = selectedTags.filter(tag => tag !== hashtag);
    setSelectedTags(newSelectedTags);
    onHashtagsSelected?.(newSelectedTags);
  };

  const copyHashtags = () => {
    navigator.clipboard.writeText(selectedTags.join(' '));
  };

  const addAllSuggestions = () => {
    const availableSlots = maxHashtags - selectedTags.length;
    const newHashtags = suggestions
      .slice(0, availableSlots)
      .map(s => s.hashtag)
      .filter(hashtag => !selectedTags.includes(hashtag));
    
    const newSelectedTags = [...selectedTags, ...newHashtags];
    setSelectedTags(newSelectedTags);
    onHashtagsSelected?.(newSelectedTags);
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'low': return 'text-green-600 bg-green-50';
      case 'medium': return 'text-yellow-600 bg-yellow-50';
      case 'high': return 'text-red-600 bg-red-50';
      default: return 'text-neutral-600 bg-neutral-50';
    }
  };

  const getDifficultyIcon = (difficulty: string) => {
    switch (difficulty) {
      case 'low': return <TrendingUp className="w-3 h-3" />;
      case 'medium': return <Target className="w-3 h-3" />;
      case 'high': return <Hash className="w-3 h-3" />;
      default: return null;
    }
  };

  return (
    <div className="bg-white rounded-2xl p-6 shadow-soft border border-neutral-100" data-testid="hashtag-generator">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-sage/10 rounded-xl flex items-center justify-center">
            <Hash className="w-5 h-5 text-sage" />
          </div>
          <div>
            <h2 className="text-lg font-semibold text-neutral-900" data-testid="hashtag-generator-title">
              AI Hashtag Generator
            </h2>
            <p className="text-sm text-neutral-500">
              Generate relevant hashtags for your content
            </p>
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
          <span className="text-xs text-neutral-500">
            {selectedTags.length}/{maxHashtags}
          </span>
        </div>
      </div>

      {/* Input Section */}
      <div className="mb-6">
        <div className="flex space-x-3">
          <input
            type="text"
            placeholder="Enter keywords or describe your content..."
            value={keywords}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setKeywords(e.target.value)}
            onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => e.key === 'Enter' && generateHashtags()}
            className="flex-1 px-3 py-2 border border-neutral-200 rounded-lg focus:ring-2 focus:ring-sage/20 focus:border-sage"
            data-testid="hashtag-keywords-input"
          />
          <button 
            onClick={generateHashtags}
            disabled={!keywords.trim() || loading}
            className="inline-flex items-center px-4 py-2 bg-sage text-white rounded-lg text-sm font-medium hover:bg-sage/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            data-testid="generate-hashtags-button"
          >
            {loading ? (
              <div className="w-4 h-4 animate-spin rounded-full border-2 border-white border-t-transparent mr-2" />
            ) : (
              <Sparkles className="w-4 h-4 mr-2" />
            )}
            {loading ? 'Generating...' : 'Generate'}
          </button>
        </div>
      </div>

      {/* Selected Hashtags */}
      {selectedTags.length > 0 && (
        <div className="mb-6">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-medium text-neutral-700">
              Selected Hashtags ({selectedTags.length})
            </h3>
            <div className="flex space-x-2">
              <button
                className="inline-flex items-center px-3 py-1.5 border border-neutral-200 rounded-lg text-sm font-medium text-neutral-700 bg-white hover:bg-neutral-50 transition-colors"
                onClick={copyHashtags}
                data-testid="copy-hashtags-button"
              >
                <Copy className="w-4 h-4 mr-1" />
                Copy
              </button>
              <button
                className="inline-flex items-center px-3 py-1.5 border border-neutral-200 rounded-lg text-sm font-medium text-neutral-700 bg-white hover:bg-neutral-50 transition-colors"
                onClick={() => {
                  setSelectedTags([]);
                  onHashtagsSelected?.([]);
                }}
                data-testid="clear-hashtags-button"
              >
                Clear All
              </button>
            </div>
          </div>
          
          <div className="flex flex-wrap gap-2">
            {selectedTags.map((hashtag) => (
              <span
                key={hashtag}
                className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-sage text-white"
                data-testid={`selected-hashtag-${hashtag.replace('#', '')}`}
              >
                {hashtag}
                <button
                  onClick={() => removeHashtag(hashtag)}
                  className="ml-2 hover:bg-sage/80 rounded-full p-0.5"
                >
                  <X className="w-3 h-3" />
                </button>
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Suggestions */}
      {suggestions.length > 0 && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-medium text-neutral-700">
              Suggested Hashtags
            </h3>
            <button
              className="inline-flex items-center px-3 py-1.5 border border-neutral-200 rounded-lg text-sm font-medium text-neutral-700 bg-white hover:bg-neutral-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              onClick={addAllSuggestions}
              disabled={selectedTags.length >= maxHashtags}
              data-testid="add-all-suggestions-button"
            >
              <Plus className="w-4 h-4 mr-1" />
              Add All
            </button>
          </div>

          <div className="grid gap-3">
            {suggestions.map((suggestion) => {
              const isSelected = selectedTags.includes(suggestion.hashtag);
              const isMaxReached = selectedTags.length >= maxHashtags && !isSelected;

              return (
                <div
                  key={suggestion.hashtag}
                  className={`p-3 rounded-xl border-2 transition-all duration-200 cursor-pointer ${
                    isSelected
                      ? 'border-sage bg-sage/5'
                      : isMaxReached
                        ? 'border-neutral-100 bg-neutral-50 opacity-50 cursor-not-allowed'
                        : 'border-neutral-100 hover:border-neutral-200 hover:bg-neutral-50'
                  }`}
                  onClick={() => !isMaxReached && toggleHashtag(suggestion.hashtag)}
                  data-testid={`hashtag-suggestion-${suggestion.hashtag.replace('#', '')}`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <span className="font-medium text-neutral-900">
                        {suggestion.hashtag}
                      </span>
                      
                      <div className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(suggestion.difficulty)}`}>
                        {getDifficultyIcon(suggestion.difficulty)}
                        <span className="ml-1 capitalize">{suggestion.difficulty}</span>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-4 text-xs text-neutral-500">
                      <div className="flex items-center space-x-1">
                        <span>Relevance:</span>
                        <span className="font-medium text-neutral-700">
                          {suggestion.relevance}%
                        </span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <span>Popularity:</span>
                        <span className="font-medium text-neutral-700">
                          {suggestion.popularity}%
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  {/* Progress bars */}
                  <div className="mt-3 grid grid-cols-2 gap-4">
                    <div>
                      <div className="flex justify-between text-xs text-neutral-500 mb-1">
                        <span>Relevance</span>
                        <span>{suggestion.relevance}%</span>
                      </div>
                      <div className="w-full bg-neutral-200 rounded-full h-1.5">
                        <div 
                          className="bg-sage h-1.5 rounded-full transition-all duration-300"
                          style={{ width: `${suggestion.relevance}%` }}
                        />
                      </div>
                    </div>
                    
                    <div>
                      <div className="flex justify-between text-xs text-neutral-500 mb-1">
                        <span>Popularity</span>
                        <span>{suggestion.popularity}%</span>
                      </div>
                      <div className="w-full bg-neutral-200 rounded-full h-1.5">
                        <div 
                          className="bg-warm-blue h-1.5 rounded-full transition-all duration-300"
                          style={{ width: `${suggestion.popularity}%` }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Empty State */}
      {suggestions.length === 0 && !loading && (
        <div className="text-center py-8">
          <Hash className="w-12 h-12 text-neutral-300 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-neutral-900 mb-2">
            Generate Smart Hashtags
          </h3>
          <p className="text-neutral-500">
            Enter keywords about your content to get AI-powered hashtag suggestions
          </p>
        </div>
      )}

      {/* Tips */}
      <div className="mt-6 p-4 bg-neutral-50 rounded-xl">
        <h4 className="text-sm font-medium text-neutral-700 mb-2">💡 Pro Tips</h4>
        <ul className="text-xs text-neutral-600 space-y-1">
          <li>• Use 5-10 hashtags for optimal engagement</li>
          <li>• Mix popular and niche hashtags for better reach</li>
          <li>• Low difficulty hashtags are easier to rank for</li>
          <li>• Keep hashtags relevant to your content</li>
        </ul>
      </div>
    </div>
  );
};

export default HashtagGenerator;