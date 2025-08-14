import React from 'react';
import { Plus, Calendar, Lightbulb, FileText, BarChart3, Share2 } from 'lucide-react';
import { useLocation } from 'wouter';

interface QuickAction {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  description: string;
  onClick: () => void;
  color: string;
}

const QuickActions = () => {
  const [, setLocation] = useLocation();

  const actions: QuickAction[] = [
    {
      icon: Plus,
      label: 'New Content Idea',
      description: 'Capture inspiration',
      onClick: () => setLocation('/ideation'),
      color: 'bg-sage',
    },
    {
      icon: Calendar,
      label: 'Schedule Content',
      description: 'Plan publication',
      onClick: () => setLocation('/calendar'),
      color: 'bg-warm-blue',
    },
    {
      icon: FileText,
      label: 'Create Brief',
      description: 'Start new project',
      onClick: () => setLocation('/strategy'),
      color: 'bg-dusty-purple',
    },
    {
      icon: BarChart3,
      label: 'View Analytics',
      description: 'Check performance',
      onClick: () => setLocation('/analytics'),
      color: 'bg-warm-amber',
    },
    {
      icon: Share2,
      label: 'Create Social Post',
      description: 'Share on social media',
      onClick: () => setLocation('/social'),
      color: 'bg-soft-emerald',
    },
  ];

  const handleActionClick = (action: QuickAction) => {
    console.log('Quick action clicked:', action.label);
    action.onClick();
  };
  return (
    <div className="bg-white rounded-2xl p-6 shadow-soft border border-neutral-100" data-testid="quick-actions-section">
      <h2 className="text-base sm:text-lg font-semibold text-neutral-900 mb-4 sm:mb-6" data-testid="quick-actions-title">Quick Actions</h2>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
        {actions.slice(0, 4).map((action, index) => (
          <button
            key={index}
            onClick={() => handleActionClick(action)}
            className="group p-3 sm:p-4 rounded-xl border border-neutral-200 hover:border-neutral-300 transition-all duration-250 text-left hover:shadow-soft"
            data-testid={`quick-action-${action.label.toLowerCase().replace(/\s+/g, '-')}`}
          >
            <div className={`w-8 h-8 sm:w-10 sm:h-10 ${action.color} rounded-xl flex items-center justify-center mb-2 sm:mb-3 group-hover:scale-105 transition-transform duration-250`}>
              <action.icon className="w-5 h-5 text-white" />
            </div>
            <h3 className="text-sm sm:text-base font-medium text-neutral-900 mb-1">{action.label}</h3>
            <p className="text-xs sm:text-sm text-neutral-500">{action.description}</p>
          </button>
        ))}
        
        {/* Additional action for social media */}
        <div className="sm:col-span-2">
          <button
            onClick={() => handleActionClick(actions[4])}
            className="group w-full p-3 sm:p-4 rounded-xl border border-neutral-200 hover:border-neutral-300 transition-all duration-250 text-left hover:shadow-soft"
            data-testid={`quick-action-${actions[4].label.toLowerCase().replace(/\s+/g, '-')}`}
          >
            <div className="flex items-center space-x-3">
              <div className={`w-8 h-8 sm:w-10 sm:h-10 ${actions[4].color} rounded-xl flex items-center justify-center group-hover:scale-105 transition-transform duration-250`}>
                {React.createElement(actions[4].icon, { className: "w-5 h-5 text-white" })}
              </div>
              <div>
                <h3 className="text-sm sm:text-base font-medium text-neutral-900 mb-1">{actions[4].label}</h3>
                <p className="text-xs sm:text-sm text-neutral-500">{actions[4].description}</p>
              </div>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default QuickActions;