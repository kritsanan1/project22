
import React, { useState } from 'react';
import { 
  Bold, 
  Italic, 
  Underline, 
  Link, 
  Image, 
  List, 
  ListOrdered,
  Eye,
  EyeOff,
  Hash,
  AtSign
} from 'lucide-react';

interface ContentEditorProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  maxLength?: number;
  showPreview?: boolean;
  className?: string;
}

const ContentEditor: React.FC<ContentEditorProps> = ({
  value,
  onChange,
  placeholder = "What's on your mind?",
  maxLength = 2200,
  showPreview = true,
  className = ''
}) => {
  const [isPreviewMode, setIsPreviewMode] = useState(false);
  const [selectedRange, setSelectedRange] = useState<{ start: number; end: number } | null>(null);

  const formatText = (format: string) => {
    // This is a simplified implementation - in a real app you'd use a library like Draft.js or Quill
    const textarea = document.querySelector('textarea') as HTMLTextAreaElement;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selectedText = value.substring(start, end);
    
    let formattedText = '';
    switch (format) {
      case 'bold':
        formattedText = `**${selectedText}**`;
        break;
      case 'italic':
        formattedText = `*${selectedText}*`;
        break;
      case 'link':
        formattedText = `[${selectedText || 'link text'}](url)`;
        break;
      case 'hashtag':
        formattedText = `#${selectedText}`;
        break;
      case 'mention':
        formattedText = `@${selectedText}`;
        break;
      default:
        formattedText = selectedText;
    }

    const newValue = value.substring(0, start) + formattedText + value.substring(end);
    onChange(newValue);
  };

  const toolbarButtons = [
    { icon: Bold, action: () => formatText('bold'), tooltip: 'Bold' },
    { icon: Italic, action: () => formatText('italic'), tooltip: 'Italic' },
    { icon: Link, action: () => formatText('link'), tooltip: 'Add Link' },
    { icon: Hash, action: () => formatText('hashtag'), tooltip: 'Add Hashtag' },
    { icon: AtSign, action: () => formatText('mention'), tooltip: 'Mention' },
  ];

  const renderPreview = (text: string) => {
    // Simple markdown-like rendering
    return text
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/\*(.*?)\*/g, '<em>$1</em>')
      .replace(/\[(.*?)\]\((.*?)\)/g, '<a href="$2" class="text-sage hover:underline">$1</a>')
      .replace(/#(\w+)/g, '<span class="text-warm-blue font-medium">#$1</span>')
      .replace(/@(\w+)/g, '<span class="text-dusty-purple font-medium">@$1</span>');
  };

  return (
    <div className={`bg-white rounded-xl border border-neutral-200 shadow-soft ${className}`}>
      {/* Toolbar */}
      <div className="flex items-center justify-between p-4 border-b border-neutral-100">
        <div className="flex items-center space-x-1">
          {toolbarButtons.map(({ icon: Icon, action, tooltip }, index) => (
            <button
              key={index}
              onClick={action}
              className="p-2 rounded-lg text-neutral-600 hover:text-sage hover:bg-sage/10 transition-all duration-200"
              title={tooltip}
            >
              <Icon className="w-4 h-4" />
            </button>
          ))}
        </div>
        
        {showPreview && (
          <button
            onClick={() => setIsPreviewMode(!isPreviewMode)}
            className="flex items-center space-x-2 px-3 py-2 rounded-lg text-sm font-medium text-neutral-600 hover:text-sage hover:bg-sage/10 transition-all duration-200"
          >
            {isPreviewMode ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            <span>{isPreviewMode ? 'Edit' : 'Preview'}</span>
          </button>
        )}
      </div>

      {/* Content Area */}
      <div className="relative">
        {isPreviewMode ? (
          <div 
            className="p-4 min-h-[200px] prose prose-sm max-w-none"
            dangerouslySetInnerHTML={{ __html: renderPreview(value) }}
          />
        ) : (
          <textarea
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder={placeholder}
            maxLength={maxLength}
            className="w-full h-48 p-4 border-0 resize-none focus:outline-none text-neutral-800 placeholder-neutral-400"
            style={{ fontFamily: 'inherit' }}
          />
        )}
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between p-4 border-t border-neutral-100 text-sm text-neutral-500">
        <div className="flex items-center space-x-4">
          <span>Plain text and basic formatting supported</span>
        </div>
        <div className={`font-medium ${value.length > maxLength * 0.9 ? 'text-warm-amber' : ''} ${value.length >= maxLength ? 'text-red-500' : ''}`}>
          {value.length}/{maxLength}
        </div>
      </div>
    </div>
  );
};

export default ContentEditor;
