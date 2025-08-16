
import React from 'react';
import { Clock, User, MessageCircle, Heart, Share } from 'lucide-react';

interface ActivityItem {
  id: string;
  type: 'post' | 'comment' | 'like' | 'share' | 'collaboration';
  user: {
    name: string;
    avatar?: string;
    initials: string;
  };
  action: string;
  content?: string;
  timestamp: string;
  platform?: string;
}

interface ActivityFeedProps {
  activities: ActivityItem[];
  className?: string;
  maxHeight?: string;
}

const ActivityFeed: React.FC<ActivityFeedProps> = ({ 
  activities, 
  className = '',
  maxHeight = 'max-h-96'
}) => {
  const getActivityIcon = (type: ActivityItem['type']) => {
    const iconClass = "w-4 h-4";
    switch (type) {
      case 'post': return <MessageCircle className={iconClass} />;
      case 'comment': return <MessageCircle className={iconClass} />;
      case 'like': return <Heart className={iconClass} />;
      case 'share': return <Share className={iconClass} />;
      case 'collaboration': return <User className={iconClass} />;
      default: return <Clock className={iconClass} />;
    }
  };

  const getActivityColor = (type: ActivityItem['type']) => {
    switch (type) {
      case 'post': return 'bg-warm-blue/10 text-warm-blue border-warm-blue/20';
      case 'comment': return 'bg-sage/10 text-sage border-sage/20';
      case 'like': return 'bg-red-50 text-red-600 border-red-200';
      case 'share': return 'bg-warm-amber/10 text-warm-amber border-warm-amber/20';
      case 'collaboration': return 'bg-dusty-purple/10 text-dusty-purple border-dusty-purple/20';
      default: return 'bg-neutral-50 text-neutral-600 border-neutral-200';
    }
  };

  return (
    <div className={`bg-white rounded-xl border border-neutral-200 shadow-soft ${className}`}>
      <div className="p-6 border-b border-neutral-100">
        <h3 className="text-lg font-semibold text-neutral-800">Recent Activity</h3>
        <p className="text-sm text-neutral-500 mt-1">Latest updates from your team</p>
      </div>
      
      <div className={`${maxHeight} overflow-y-auto`}>
        {activities.length > 0 ? (
          <div className="p-2">
            {activities.map((activity, index) => (
              <div
                key={activity.id}
                className="flex items-start space-x-3 p-4 rounded-lg hover:bg-neutral-50/50 transition-all duration-250 group"
              >
                {/* User Avatar */}
                <div className="flex-shrink-0">
                  {activity.user.avatar ? (
                    <img
                      src={activity.user.avatar}
                      alt={activity.user.name}
                      className="w-10 h-10 rounded-full object-cover"
                    />
                  ) : (
                    <div className="w-10 h-10 bg-sage rounded-full flex items-center justify-center text-white font-medium text-sm">
                      {activity.user.initials}
                    </div>
                  )}
                </div>
                
                {/* Activity Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <p className="text-sm text-neutral-800">
                        <span className="font-medium">{activity.user.name}</span>
                        <span className="text-neutral-600 ml-1">{activity.action}</span>
                        {activity.platform && (
                          <span className="text-sage font-medium ml-1">on {activity.platform}</span>
                        )}
                      </p>
                      
                      {activity.content && (
                        <p className="text-sm text-neutral-600 mt-1 line-clamp-2">
                          "{activity.content}"
                        </p>
                      )}
                      
                      <div className="flex items-center space-x-2 mt-2">
                        <span className="text-xs text-neutral-500 flex items-center space-x-1">
                          <Clock className="w-3 h-3" />
                          <span>{activity.timestamp}</span>
                        </span>
                      </div>
                    </div>
                    
                    {/* Activity Type Icon */}
                    <div className={`p-2 rounded-lg border ${getActivityColor(activity.type)} group-hover:scale-105 transition-transform duration-200`}>
                      {getActivityIcon(activity.type)}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="p-8 text-center">
            <Clock className="w-12 h-12 text-neutral-300 mx-auto mb-3" />
            <p className="text-neutral-500 text-sm">No recent activity</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ActivityFeed;
