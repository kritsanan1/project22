import React from 'react';
import { Calendar, Lightbulb, Target, TrendingUp, Clock, Users } from 'lucide-react';
import QuickActions from '../components/dashboard/QuickActions';
import RecentActivity from '../components/dashboard/RecentActivity';
import ContentPillars from '../components/dashboard/ContentPillars';
import UpcomingDeadlines from '../components/dashboard/UpcomingDeadlines';

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

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-8" data-testid="dashboard-container">
      <div className="mb-8" data-testid="dashboard-header">
        <h1 className="text-2xl sm:text-3xl font-bold text-neutral-900 mb-2" data-testid="dashboard-title">Good morning, Sarah</h1>
        <p className="text-sm sm:text-base text-neutral-600" data-testid="dashboard-subtitle">Let's make today's content planning productive and strategic.</p>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-8" data-testid="stats-overview">
        {statsData.map((stat, index) => (
          <StatsCard key={index} {...stat} />
        ))}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8" data-testid="main-content-grid">
        <div className="lg:col-span-2 space-y-8" data-testid="primary-content">
          <QuickActions />
          <ContentPillars />
        </div>
        
        <div className="space-y-6 lg:space-y-8" data-testid="sidebar-content">
          <UpcomingDeadlines />
          <RecentActivity />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;