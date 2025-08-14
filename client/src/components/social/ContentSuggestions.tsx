import React, { useState, useEffect } from 'react';
import { 
  Lightbulb, 
  TrendingUp, 
  Hash, 
  RefreshCw,
  Copy,
  Edit,
  Send
} from 'lucide-react';
import { ContentSuggestion } from '../../types/social';

const ContentSuggestions: React.FC = () => {
  const [suggestions, setSuggestions] = useState<ContentSuggestion[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = [
    { value: 'all', label: 'All Categories' },
    { value: 'trending', label: 'Trending Topics' },
    { value: 'educational', label: 'Educational' },
    { value: 'promotional', label: 'Promotional' },
    { value: 'engagement', label: 'Engagement' },
  ];

  const mockSuggestions: ContentSuggestion[] = [
    {
      id: '1',
      title: 'AI Productivity Tips',
      content: '5 ways AI is revolutionizing workplace productivity:\n\n1. Automated task scheduling\n2. Smart email management\n3. Intelligent document analysis\n4. Predictive project planning\n5. Real-time collaboration insights\n\nWhich AI tool has transformed your workflow the most? 🤖 #AI #Productivity',
      platform: 'linkedin',
      category: 'trending',
      score: 92,
      reasoning: 'AI content is trending with 45% higher engagement. Your audience shows strong interest in productivity topics.',
      createdAt: new Date().toISOString(),
    },
    {
      id: '2',
      title: 'Remote Work Best Practices',
      content: 'Working from home? Here are 3 game-changing tips:\n\n✅ Create a dedicated workspace\n✅ Set clear boundaries with family\n✅ Use the Pomodoro technique\n\nWhat\'s your #1 remote work hack? Share below! 👇 #RemoteWork #WorkFromHome',
      platform: 'twitter',
      category: 'educational',
      score: 87,
      reasoning: 'Remote work content performs well on Twitter. Short, actionable tips get high engagement.',
      createdAt: new Date().toISOString(),
    },
    {
      id: '3',
      title: 'Behind the Scenes',
      content: 'Ever wondered how we design our features? 🎨\n\nTake a peek behind the curtain at our design process:\n\n1. User research & interviews\n2. Wireframing & prototyping\n3. User testing & feedback\n4. Iteration & refinement\n\nSwipe to see the evolution of our latest feature! ➡️',
      platform: 'instagram',
      category: 'engagement',
      score: 84,
      reasoning: 'Behind-the-scenes content drives 30% more engagement on Instagram. Visual storytelling resonates with your audience.',
      createdAt: new Date().toISOString(),
    },
    {
      id: '4',
      title: 'Product Update Announcement',
      content: '🚀 Exciting news! We just launched 3 new features that will supercharge your workflow:\n\n• Advanced analytics dashboard\n• Team collaboration tools\n• Mobile app improvements\n\nReady to boost your productivity? Try them out today! Link in bio 👆 #ProductUpdate #NewFeatures',
      platform: 'linkedin',
      category: 'promotional',
      score: 79,
      reasoning: 'Product announcements on LinkedIn generate quality leads. Professional tone matches platform expectations.',
      createdAt: new Date().toISOString(),
    },
  ];

  const fetchSuggestions = async () => {
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      setSuggestions(mockSuggestions);
    } catch (error) {
      console.error('Failed to fetch content suggestions:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchSuggestions();
  }, [selectedCategory]);

  const filteredSuggestions = selectedCategory === 'all' 
    ? suggestions 
    : suggestions.filter(s => s.category === selectedCategory);

  const handleCopy = (content: string) => {
    navigator.clipboard.writeText(content);
    alert('Content copied to clipboard!');
  };

  const handleEdit = (suggestion: ContentSuggestion) => {
    console.log('Editing suggestion:', suggestion.id);
    // This would open the post creator with pre-filled content
    alert('This would open the post creator with the suggested content');
  };

  const handleUse = (suggestion: ContentSuggestion) => {
    console.log('Using suggestion:', suggestion.id);
    // This would create a new post with the suggested content
    alert('This would create a new post with the suggested content');
  };

  const getScoreColor = (score: number) => {
    if (score >= 90) return 'text-emerald-600 bg-emerald-50';
    if (score >= 80) return 'text-blue-600 bg-blue-50';
    if (score >= 70) return 'text-amber-600 bg-amber-50';
    return 'text-neutral-600 bg-neutral-50';
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'trending':
        return 'bg-red-50 text-red-600';
      case 'educational':
        return 'bg-blue-50 text-blue-600';
      case 'promotional':
        return 'bg-purple-50 text-purple-600';
      case 'engagement':
        return 'bg-emerald-50 text-emerald-600';
      default:
        return 'bg-neutral-50 text-neutral-600';
    }
  };

  return (
    <div className="bg-white rounded-2xl p-6 shadow-soft border border-neutral-100">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-warm-amber/10 rounded-xl flex items-center justify-center">
            <Lightbulb className="w-5 h-5 text-warm-amber" />
          </div>
          <div>
            <h2 className="text-xl font-semibold text-neutral-900">Content Suggestions</h2>
            <p className="text-sm text-neutral-600">AI-powered content ideas based on trends</p>
          </div>
        </div>

        <div className="flex items-center space-x-3">
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="px-3 py-2 border border-neutral-200 rounded-lg text-sm focus:ring-2 focus:ring-sage/20 focus:border-sage"
          >
            {categories.map((category) => (
              <option key={category.value} value={category.value}>
                {category.label}
              </option>
            ))}
          </select>

          <button
            onClick={fetchSuggestions}
            disabled={isLoading}
            className="p-2 border border-neutral-200 rounded-lg hover:bg-neutral-50 transition-colors duration-200 disabled:opacity-50"
          >
            <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
          </button>
        </div>
      </div>

      {filteredSuggestions.length === 0 ? (
        <div className="text-center py-8">
          <Lightbulb className="w-12 h-12 text-neutral-300 mx-auto mb-3" />
          <p className="text-neutral-500">No suggestions available</p>
          <p className="text-sm text-neutral-400 mt-1">
            Try refreshing or selecting a different category
          </p>
        </div>
      ) : (
        <div className="space-y-6">
          {filteredSuggestions.map((suggestion) => (
            <div
              key={suggestion.id}
              className="p-5 border border-neutral-200 rounded-xl hover:border-neutral-300 transition-all duration-200"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <h3 className="font-semibold text-neutral-900">{suggestion.title}</h3>
                    <span className={`px-2 py-1 rounded-lg text-xs font-medium ${getCategoryColor(suggestion.category)}`}>
                      {suggestion.category}
                    </span>
                    <span className={`px-2 py-1 rounded-lg text-xs font-medium ${getScoreColor(suggestion.score)}`}>
                      {suggestion.score}% match
                    </span>
                  </div>
                  
                  <div className="flex items-center space-x-2 text-sm text-neutral-500 mb-3">
                    <Hash className="w-3 h-3" />
                    <span className="capitalize">{suggestion.platform}</span>
                    <TrendingUp className="w-3 h-3" />
                    <span>High engagement potential</span>
                  </div>
                </div>
              </div>

              <div className="bg-neutral-50 rounded-lg p-4 mb-4">
                <pre className="text-sm text-neutral-700 whitespace-pre-wrap font-sans">
                  {suggestion.content}
                </pre>
              </div>

              <div className="bg-sage/5 rounded-lg p-3 mb-4">
                <div className="flex items-start space-x-2">
                  <Lightbulb className="w-4 h-4 text-sage mt-0.5 flex-shrink-0" />
                  <p className="text-sm text-neutral-700">{suggestion.reasoning}</p>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="text-xs text-neutral-500">
                  Generated {new Date(suggestion.createdAt).toLocaleDateString()}
                </div>

                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => handleCopy(suggestion.content)}
                    className="px-3 py-1 text-sm border border-neutral-200 rounded-lg hover:bg-neutral-50 transition-colors duration-200 flex items-center space-x-1"
                  >
                    <Copy className="w-3 h-3" />
                    <span>Copy</span>
                  </button>
                  <button
                    onClick={() => handleEdit(suggestion)}
                    className="px-3 py-1 text-sm border border-sage/20 text-sage rounded-lg hover:bg-sage/5 transition-colors duration-200 flex items-center space-x-1"
                  >
                    <Edit className="w-3 h-3" />
                    <span>Edit</span>
                  </button>
                  <button
                    onClick={() => handleUse(suggestion)}
                    className="px-3 py-1 text-sm bg-sage text-white rounded-lg hover:bg-sage/90 transition-colors duration-200 flex items-center space-x-1"
                  >
                    <Send className="w-3 h-3" />
                    <span>Use</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ContentSuggestions;