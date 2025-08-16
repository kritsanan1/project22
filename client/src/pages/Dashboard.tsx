import React from 'react';
import { Calendar, Lightbulb, Target, TrendingUp, Clock, Users, BarChart3 } from 'lucide-react';
import QuickActions from '../components/dashboard/QuickActions';
import RecentActivity from '../components/dashboard/RecentActivity';
import ContentPillars from '../components/dashboard/ContentPillars';
import UpcomingDeadlines from '../components/dashboard/UpcomingDeadlines';
import ActivityFeed from '../components/ui/ActivityFeed';
import MetricsCard from '../components/ui/MetricsCard';

interface StatsCardProps {
  icon: React.ComponentType<{ className?: string }>;
  value: string | number;
  label: string;
  description: string;
  color: string;
  testId: string;
}

const StatsCard: React.FC<StatsCardProps> = ({ icon: Icon, value, label, description, color, testId }) => {
  const getIconColor = (color: string) => {
    if (color.includes('sage')) return 'text-sage';
    if (color.includes('warm-blue')) return 'text-warm-blue';
    if (color.includes('warm-amber')) return 'text-warm-amber';
    if (color.includes('soft-emerald')) return 'text-soft-emerald';
    return 'text-sage';
  };

  return (
    <div className="bg-white rounded-2xl p-6 shadow-soft border border-neutral-100 hover:shadow-medium transition-shadow duration-250" data-testid={testId}>
      <div className="flex items-center justify-between mb-3">
        <div className={`w-10 h-10 ${color} rounded-xl flex items-center justify-center`}>
          <Icon className={`w-5 h-5 ${getIconColor(color)}`} />
        </div>
        <span className="text-2xl font-bold text-neutral-900" data-testid={`${testId}-value`}>{value}</span>
      </div>
      <h3 className="text-xs sm:text-sm font-medium text-neutral-600" data-testid={`${testId}-label`}>{label}</h3>
      <p className="text-xs text-neutral-500 mt-1 hidden sm:block" data-testid={`${testId}-description`}>{description}</p>
    </div>
  );
};

const Dashboard = () => {
  const statsData: StatsCardProps[] = [
    {
      icon: Calendar,
      value: 23,
      label: "Content Planned",
      description: "This month",
      color: "bg-sage/10",
      testId: "stats-content-planned"
    },
    {
      icon: Lightbulb,
      value: 47,
      label: "Ideas Captured",
      description: "Ready to develop",
      color: "bg-warm-blue/10",
      testId: "stats-ideas-captured"
    },
    {
      icon: Target,
      value: "89%",
      label: "Goal Progress",
      description: "Content strategy",
      color: "bg-warm-amber/10",
      testId: "stats-goal-progress"
    },
    {
      icon: TrendingUp,
      value: "+12%",
      label: "Engagement",
      description: "vs last month",
      color: "bg-soft-emerald/10",
      testId: "stats-engagement"
    }
  ];

  // Sample data for metrics and activity feed
  const metricsData = [
    {
      title: 'Total Engagement',
      value: '24.5K',
      change: { value: 12.5, type: 'increase' as const, period: 'last month' },
      icon: TrendingUp
    },
    {
      title: 'Content Published',
      value: 156,
      change: { value: 8.3, type: 'increase' as const, period: 'last week' },
      icon: Calendar
    },
    {
      title: 'Team Members',
      value: 12,
      change: { value: 0, type: 'neutral' as const },
      icon: Users
    },
    {
      title: 'Analytics Score',
      value: '94%',
      change: { value: 2.1, type: 'increase' as const, period: 'yesterday' },
      icon: BarChart3
    }
  ];

  let activityData = [
    {
      id: '1',
      type: 'post' as const,
      user: { name: 'Sarah Chen', initials: 'SC' },
      action: 'published a new post',
      content: 'Excited to share our latest product update! 🚀',
      timestamp: '2 minutes ago',
      platform: 'LinkedIn'
    },
    {
      id: '2',
      type: 'collaboration' as const,
      user: { name: 'Mike Johnson', initials: 'MJ' },
      action: 'assigned you to review',
      content: 'Q4 Marketing Campaign Draft',
      timestamp: '15 minutes ago'
    },
    {
      id: '3',
      type: 'like' as const,
      user: { name: 'Emma Wilson', initials: 'EW' },
      action: 'liked your post',
      timestamp: '1 hour ago',
      platform: 'Twitter'
    },
    {
      id: '4',
      type: 'comment' as const,
      user: { name: 'David Park', initials: 'DP' },
      action: 'commented on',
      content: 'Great insights on content strategy!',
      timestamp: '2 hours ago',
      platform: 'Instagram'
    }
  ];


  return (
    <div className="min-h-screen bg-cream">
      <div className="p-4 sm:p-6 max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-neutral-900 mb-2" data-testid="dashboard-title">Good morning, Sarah</h1>
          <p className="text-sm sm:text-base text-neutral-600" data-testid="dashboard-subtitle">Let's make today's content planning productive and strategic.</p>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-8" data-testid="stats-overview">
          {statsData.map((stat, index) => (
            <StatsCard key={index} {...stat} />
          ))}
        </div>

        {/* Quick Actions Row */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <div className="lg:col-span-2">
            <QuickActions />
          </div>
          <div>
            <UpcomingDeadlines />
          </div>
        </div>

        {/* Main Content Row */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
          <div className="xl:col-span-2 space-y-6">
            <RecentActivity />
            <ContentPillars />
          </div>
          <div className="xl:col-span-1">
            <ActivityFeed 
              activities={activityData}
              maxHeight="max-h-[600px]"
              className="sticky top-24 custom-scrollbar"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;