
import React from 'react';
import { TrendingUp, TrendingDown, BarChart3, PieChart, LineChart } from 'lucide-react';

interface ChartData {
  label: string;
  value: number;
  percentage?: number;
  trend?: 'up' | 'down' | 'neutral';
  color?: string;
}

interface AnalyticsChartProps {
  title: string;
  subtitle?: string;
  data: ChartData[];
  type: 'bar' | 'line' | 'pie' | 'area';
  showTrend?: boolean;
  height?: string;
  className?: string;
}

const AnalyticsChart: React.FC<AnalyticsChartProps> = ({
  title,
  subtitle,
  data,
  type,
  showTrend = false,
  height = 'h-64',
  className = ''
}) => {
  const getChartIcon = () => {
    switch (type) {
      case 'bar': return <BarChart3 className="w-5 h-5" />;
      case 'pie': return <PieChart className="w-5 h-5" />;
      case 'line': return <LineChart className="w-5 h-5" />;
      case 'area': return <LineChart className="w-5 h-5" />;
      default: return <BarChart3 className="w-5 h-5" />;
    }
  };

  const maxValue = Math.max(...data.map(item => item.value));

  const renderBarChart = () => (
    <div className="flex items-end justify-between space-x-2 px-4 pb-4">
      {data.map((item, index) => (
        <div key={index} className="flex flex-col items-center space-y-2 flex-1">
          <div className="relative w-full group">
            <div
              className={`w-full bg-gradient-to-t ${
                item.color || 'from-sage/20 to-sage'
              } rounded-t-lg transition-all duration-500 hover:scale-105 cursor-pointer`}
              style={{ height: `${(item.value / maxValue) * 150}px` }}
            >
              <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-neutral-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap">
                {item.value.toLocaleString()}
              </div>
            </div>
          </div>
          <div className="text-xs text-neutral-600 text-center font-medium">
            {item.label}
          </div>
        </div>
      ))}
    </div>
  );

  const renderLineChart = () => (
    <div className="relative px-4 pb-4">
      <svg className="w-full h-40" viewBox="0 0 400 160">
        <defs>
          <linearGradient id="lineGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="rgb(139, 155, 125)" stopOpacity="0.3" />
            <stop offset="100%" stopColor="rgb(139, 155, 125)" stopOpacity="0" />
          </linearGradient>
        </defs>
        
        {/* Grid lines */}
        {[0, 1, 2, 3, 4].map(i => (
          <line
            key={i}
            x1="0"
            y1={i * 40}
            x2="400"
            y2={i * 40}
            stroke="#e5e7eb"
            strokeWidth="1"
          />
        ))}
        
        {/* Data line */}
        <polyline
          fill="none"
          stroke="rgb(139, 155, 125)"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
          points={data.map((item, index) => 
            `${(index / (data.length - 1)) * 400},${160 - (item.value / maxValue) * 140}`
          ).join(' ')}
        />
        
        {/* Area fill */}
        <polygon
          fill="url(#lineGradient)"
          points={`${data.map((item, index) => 
            `${(index / (data.length - 1)) * 400},${160 - (item.value / maxValue) * 140}`
          ).join(' ')} 400,160 0,160`}
        />
        
        {/* Data points */}
        {data.map((item, index) => (
          <circle
            key={index}
            cx={(index / (data.length - 1)) * 400}
            cy={160 - (item.value / maxValue) * 140}
            r="4"
            fill="rgb(139, 155, 125)"
            className="hover:r-6 transition-all duration-200 cursor-pointer"
          />
        ))}
      </svg>
      
      {/* X-axis labels */}
      <div className="flex justify-between mt-2 px-2">
        {data.map((item, index) => (
          <span key={index} className="text-xs text-neutral-600 font-medium">
            {item.label}
          </span>
        ))}
      </div>
    </div>
  );

  const renderPieChart = () => {
    const total = data.reduce((sum, item) => sum + item.value, 0);
    let cumulativePercentage = 0;

    return (
      <div className="flex items-center justify-center space-x-8 px-4 pb-4">
        <div className="relative">
          <svg className="w-32 h-32 transform -rotate-90">
            {data.map((item, index) => {
              const percentage = (item.value / total) * 100;
              const strokeDasharray = `${percentage} ${100 - percentage}`;
              const strokeDashoffset = -cumulativePercentage;
              const color = item.color || `hsl(${120 + index * 60}, 45%, 55%)`;
              
              cumulativePercentage += percentage;
              
              return (
                <circle
                  key={index}
                  cx="64"
                  cy="64"
                  r="30"
                  fill="transparent"
                  stroke={color}
                  strokeWidth="8"
                  strokeDasharray={strokeDasharray}
                  strokeDashoffset={strokeDashoffset}
                  className="transition-all duration-500 hover:stroke-[12]"
                  style={{ 
                    transformOrigin: '64px 64px',
                    strokeLinecap: 'round'
                  }}
                />
              );
            })}
          </svg>
        </div>
        
        <div className="space-y-2">
          {data.map((item, index) => {
            const percentage = ((item.value / total) * 100).toFixed(1);
            const color = item.color || `hsl(${120 + index * 60}, 45%, 55%)`;
            
            return (
              <div key={index} className="flex items-center space-x-3">
                <div 
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: color }}
                />
                <div className="flex-1">
                  <div className="text-sm font-medium text-neutral-800">
                    {item.label}
                  </div>
                  <div className="text-xs text-neutral-600">
                    {item.value.toLocaleString()} ({percentage}%)
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  const renderChart = () => {
    switch (type) {
      case 'bar': return renderBarChart();
      case 'line': return renderLineChart();
      case 'area': return renderLineChart();
      case 'pie': return renderPieChart();
      default: return renderBarChart();
    }
  };

  return (
    <div className={`bg-white rounded-xl border border-neutral-200 shadow-soft hover:shadow-medium transition-all duration-300 ${className}`}>
      {/* Header */}
      <div className="flex items-center justify-between p-6 border-b border-neutral-100">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-sage/10 rounded-xl flex items-center justify-center text-sage">
            {getChartIcon()}
          </div>
          <div>
            <h3 className="text-lg font-semibold text-neutral-800">{title}</h3>
            {subtitle && (
              <p className="text-sm text-neutral-500 mt-0.5">{subtitle}</p>
            )}
          </div>
        </div>
        
        {showTrend && data.length > 0 && (
          <div className="flex items-center space-x-2">
            {data[data.length - 1].trend === 'up' && (
              <div className="flex items-center space-x-1 text-emerald-600">
                <TrendingUp className="w-4 h-4" />
                <span className="text-sm font-medium">Trending Up</span>
              </div>
            )}
            {data[data.length - 1].trend === 'down' && (
              <div className="flex items-center space-x-1 text-red-500">
                <TrendingDown className="w-4 h-4" />
                <span className="text-sm font-medium">Trending Down</span>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Chart Content */}
      <div className={`${height} flex items-end justify-center pt-6`}>
        {renderChart()}
      </div>
    </div>
  );
};

export default AnalyticsChart;
