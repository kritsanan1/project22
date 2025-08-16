import React, { useState } from 'react';
import { useDrop } from 'react-dnd';
import { format, addDays, startOfWeek, endOfWeek, eachDayOfInterval } from 'date-fns';
import { Plus, ChevronLeft, ChevronRight } from 'lucide-react';

interface CalendarGridProps {
  view: 'month' | 'week' | 'day';
  currentDate: Date;
  onDateClick?: (date: Date) => void;
}

const CalendarGrid: React.FC<CalendarGridProps> = ({ view, currentDate, onDateClick }) => {
  const [draggedContent, setDraggedContent] = useState<any>(null);

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const startDate = new Date(firstDay);
    startDate.setDate(startDate.getDate() - firstDay.getDay());
    
    const days = [];
    for (let i = 0; i < 42; i++) {
      const day = new Date(startDate);
      day.setDate(startDate.getDate() + i);
      days.push(day);
    }
    return days;
  };

  const getWeekDays = (date: Date) => {
    const start = startOfWeek(date);
    const end = endOfWeek(date);
    return eachDayOfInterval({ start, end });
  };

  const days = getDaysInMonth(currentDate);
  const weekDays = getWeekDays(currentDate);
  const weekdays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  if (view === 'month') {
    return (
      <div className="bg-white rounded-xl border border-neutral-200 shadow-soft">
        {/* Calendar Header */}
        <div className="flex items-center justify-between p-6 border-b border-neutral-100">
          <h2 className="text-xl font-semibold text-neutral-800">
            {format(currentDate, 'MMMM yyyy')}
          </h2>
          <div className="flex items-center space-x-2">
            <button className="p-2 rounded-lg text-neutral-600 hover:text-sage hover:bg-sage/10 transition-all duration-200">
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button className="p-2 rounded-lg text-neutral-600 hover:text-sage hover:bg-sage/10 transition-all duration-200">
              <ChevronRight className="w-5 h-5" />
            </button>
            <button className="ml-2 px-4 py-2 bg-sage text-white rounded-lg hover:bg-sage/90 transition-all duration-200 flex items-center space-x-2">
              <Plus className="w-4 h-4" />
              <span className="hidden sm:inline">Add Event</span>
            </button>
          </div>
        </div>

        <div className="p-3 sm:p-6">
          {/* Weekday Headers */}
          <div className="grid grid-cols-7 mb-4">
            {weekdays.map((day) => (
              <div key={day} className="p-2 sm:p-3 text-center text-xs sm:text-sm font-semibold text-neutral-700 uppercase tracking-wide">
                {day}
              </div>
            ))}
          </div>

          {/* Calendar Days */}
          <div className="grid grid-cols-7 gap-1 sm:gap-2">
            {days.map((day, index) => {
              const isCurrentMonth = day.getMonth() === currentDate.getMonth();
              const isToday = day.toDateString() === new Date().toDateString();

              return (
                <CalendarDay
                  key={index}
                  date={day}
                  isCurrentMonth={isCurrentMonth}
                  isToday={isToday}
                  onDateClick={onDateClick}
                  onContentDrop={(content) => {
                    console.log('Content dropped on', format(day, 'yyyy-MM-dd'), content);
                  }}
                />
              );
            })}
          </div>
        </div>
      </div>
    );
  }

  if (view === 'week') {
    return (
      <div className="p-3 sm:p-6 overflow-x-auto">
        <div className="grid grid-cols-8 gap-1">
          <div className="p-3"></div>
          {weekDays.map((day) => (
            <div key={day.toISOString()} className="p-3 text-center">
              <div className="text-sm font-medium text-neutral-900">
                {format(day, 'EEE')}
              </div>
              <div className={`text-lg font-semibold mt-1 ${
                day.toDateString() === new Date().toDateString() 
                  ? 'text-sage' 
                  : 'text-neutral-700'
              }`}>
                {format(day, 'd')}
              </div>
            </div>
          ))}
          
          {Array.from({ length: 24 }, (_, hour) => (
            <React.Fragment key={hour}>
              <div className="p-2 text-xs text-neutral-500 text-right border-r border-neutral-100">
                {format(new Date().setHours(hour, 0, 0, 0), 'ha')}
              </div>
              {weekDays.map((day) => (
                <div
                  key={`${day.toISOString()}-${hour}`}
                  className="min-h-[60px] border border-neutral-100 hover:bg-neutral-50 transition-colors duration-200"
                />
              ))}
            </React.Fragment>
          ))}
        </div>
      </div>
    );
  }

  if (view === 'day') {
    return (
      <div className="p-3 sm:p-6">
        <div className="text-center mb-6">
          <h3 className="text-xl sm:text-2xl font-bold text-neutral-900">
            {format(currentDate, 'EEEE, MMMM d, yyyy')}
          </h3>
        </div>
        
        <div className="grid grid-cols-2 gap-1">
          <div className="space-y-1">
            {Array.from({ length: 24 }, (_, hour) => (
              <div key={hour} className="flex items-center">
                <div className="w-12 sm:w-16 text-xs text-neutral-500 text-right pr-2 sm:pr-4">
                  {format(new Date().setHours(hour, 0, 0, 0), 'ha')}
                </div>
                <div className="flex-1 min-h-[40px] sm:min-h-[60px] border border-neutral-100 hover:bg-neutral-50 transition-colors duration-200 rounded-lg" />
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-3 sm:p-6">
      <div className="text-center text-neutral-500">
        View not implemented
      </div>
    </div>
  );
};

interface CalendarDayProps {
  date: Date;
  isCurrentMonth: boolean;
  isToday: boolean;
  onDateClick?: (date: Date) => void;
  onContentDrop?: (content: any) => void;
}

const CalendarDay: React.FC<CalendarDayProps> = ({ date, isCurrentMonth, isToday, onDateClick, onContentDrop }) => {
  const [{ isOver }, drop] = useDrop({
    accept: 'content',
    drop: (item) => {
      if (onContentDrop) {
        onContentDrop(item);
      }
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  });

  const sampleContent = date.getDate() % 7 === 0 && isCurrentMonth ? {
    title: 'Blog Post',
    type: 'blog',
    time: '2:00 PM',
  } : null;

  return (
    <div
      ref={drop}
      onClick={() => onDateClick && onDateClick(date)}
      className={`group min-h-[80px] sm:min-h-[120px] p-2 sm:p-3 border transition-all duration-300 rounded-lg ${
        isCurrentMonth ? 'bg-white border-neutral-200/60' : 'bg-neutral-50/50 border-neutral-200/40'
      } ${
        isOver ? 'bg-sage/5 border-sage/30 shadow-sm' : ''
      } hover:bg-white hover:shadow-medium hover:border-sage/20 cursor-pointer hover:scale-[1.02] relative overflow-hidden`}
    >
      {/* Hover overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-sage/0 to-sage/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
      
      <div className="relative z-10">
        <div className={`text-sm font-semibold mb-2 transition-all duration-200 ${
          isToday 
            ? 'w-6 h-6 sm:w-7 sm:h-7 bg-sage text-white rounded-full flex items-center justify-center text-xs shadow-soft'
            : isCurrentMonth 
              ? 'text-neutral-900 group-hover:text-sage' 
              : 'text-neutral-400'
        }`}>
          {date.getDate()}
        </div>

        {sampleContent && (
          <div className="bg-gradient-to-r from-sage/10 to-sage/5 text-sage p-2 rounded-lg text-xs mb-2 border border-sage/20 cursor-pointer hover:from-sage/20 hover:to-sage/10 hover:shadow-soft transition-all duration-200 group">
            <div className="font-semibold truncate">{sampleContent.title}</div>
            <div className="text-sage/70 hidden sm:block text-[10px] mt-0.5">{sampleContent.time}</div>
          </div>
        )}

        {/* Add content button - appears on hover */}
        <button className="absolute bottom-2 right-2 w-5 h-5 bg-sage text-white rounded-full opacity-0 group-hover:opacity-100 transition-all duration-200 hover:scale-110 flex items-center justify-center">
          <Plus className="w-3 h-3" />
        </button>
      </div>
    </div>
  );
};

export default CalendarGrid;