
import React from 'react';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';

interface MetricsCardProps {
  title: string;
  value: string | number;
  change?: {
    value: number;
    type: 'increase' | 'decrease' | 'neutral';
    period?: string;
  };
  icon?: React.ComponentType<{ className?: string }>;
  className?: string;
  valueColor?: string;
}

const MetricsCard: React.FC<MetricsCardProps> = ({
  title,
  value,
  change,
  icon: Icon,
  className = '',
  valueColor = 'text-neutral-800'
}) => {
  const getTrendIcon = (type: 'increase' | 'decrease' | 'neutral') => {
    const iconClass = "w-4 h-4";
    switch (type) {
      case 'increase': return <TrendingUp className={iconClass} />;
      case 'decrease': return <TrendingDown className={iconClass} />;
      case 'neutral': return <Minus className={iconClass} />;
    }
  };

  const getTrendColor = (type: 'increase' | 'decrease' | 'neutral') => {
    switch (type) {
      case 'increase': return 'text-soft-emerald bg-soft-emerald/10';
      case 'decrease': return 'text-red-600 bg-red-50';
      case 'neutral': return 'text-neutral-500 bg-neutral-100';
    }
  };

  return (
    <div className={`bg-white rounded-xl border border-neutral-200 p-6 hover:shadow-medium transition-all duration-300 ${className}`}>
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-sm font-medium text-neutral-600 mb-1">{title}</p>
          <p className={`text-3xl font-bold ${valueColor} mb-3`}>
            {typeof value === 'number' ? value.toLocaleString() : value}
          </p>
          
          {change && (
            <div className={`inline-flex items-center space-x-1 px-2 py-1 rounded-lg text-xs font-medium ${getTrendColor(change.type)}`}>
              {getTrendIcon(change.type)}
              <span>{Math.abs(change.value)}%</span>
              {change.period && <span>vs {change.period}</span>}
            </div>
          )}
        </div>
        
        {Icon && (
          <div className="p-3 bg-sage/10 rounded-xl">
            <Icon className="w-6 h-6 text-sage" />
          </div>
        )}
      </div>
    </div>
  );
};

export default MetricsCard;
