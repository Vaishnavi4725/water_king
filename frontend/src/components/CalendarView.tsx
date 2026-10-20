import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight, Calendar as CalendarIcon } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import type { JournalEntry } from '../backend';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface CalendarViewProps {
  entries: JournalEntry[];
  onDateSelect: (date: Date) => void;
  selectedDate: Date | null;
  viewMode?: 'monthly' | 'weekly';
  onViewModeChange?: (mode: 'monthly' | 'weekly') => void;
}

export function CalendarView({
  entries,
  onDateSelect,
  selectedDate,
  viewMode = 'monthly',
  onViewModeChange,
}: CalendarViewProps) {
  const [currentDate, setCurrentDate] = useState(new Date());

  const goToPreviousMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
  };

  const goToNextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
  };

  const goToPreviousWeek = () => {
    const newDate = new Date(currentDate);
    newDate.setDate(currentDate.getDate() - 7);
    setCurrentDate(newDate);
  };

  const goToNextWeek = () => {
    const newDate = new Date(currentDate);
    newDate.setDate(currentDate.getDate() + 7);
    setCurrentDate(newDate);
  };

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();

    const days: (Date | null)[] = [];
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null);
    }
    for (let i = 1; i <= daysInMonth; i++) {
      days.push(new Date(year, month, i));
    }

    return days;
  };

  const getWeekDays = (date: Date) => {
    const startOfWeek = new Date(date);
    startOfWeek.setDate(date.getDate() - date.getDay());

    const days: Date[] = [];
    for (let i = 0; i < 7; i++) {
      const day = new Date(startOfWeek);
      day.setDate(startOfWeek.getDate() + i);
      days.push(day);
    }

    return days;
  };

  const days = viewMode === 'monthly' ? getDaysInMonth(currentDate) : getWeekDays(currentDate);
  const monthName = currentDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <CalendarIcon className="w-5 h-5" />
            {viewMode === 'monthly' ? monthName : 'Week View'}
          </CardTitle>
          <div className="flex items-center gap-2">
            {onViewModeChange && (
              <Tabs value={viewMode} onValueChange={(v) => onViewModeChange(v as 'monthly' | 'weekly')}>
                <TabsList>
                  <TabsTrigger value="monthly">Month</TabsTrigger>
                  <TabsTrigger value="weekly">Week</TabsTrigger>
                </TabsList>
              </Tabs>
            )}
            <Button
              variant="outline"
              size="icon"
              onClick={viewMode === 'monthly' ? goToPreviousMonth : goToPreviousWeek}
            >
              <ChevronLeft className="w-4 h-4" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={viewMode === 'monthly' ? goToNextMonth : goToNextWeek}
            >
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className={`grid ${viewMode === 'monthly' ? 'grid-cols-7' : 'grid-cols-7'} gap-2`}>
          {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
            <div key={day} className="text-center text-sm font-medium text-muted-foreground p-2">
              {day}
            </div>
          ))}
          {days.map((day, index) => {
            if (!day) {
              return <div key={`empty-${index}`} className="p-2" />;
            }

            const isSelected =
              selectedDate &&
              day.getDate() === selectedDate.getDate() &&
              day.getMonth() === selectedDate.getMonth() &&
              day.getFullYear() === selectedDate.getFullYear();

            const isToday =
              day.getDate() === new Date().getDate() &&
              day.getMonth() === new Date().getMonth() &&
              day.getFullYear() === new Date().getFullYear();

            return (
              <button
                key={index}
                onClick={() => onDateSelect(day)}
                className={`
                  p-2 rounded-lg text-center transition-colors
                  ${isSelected ? 'bg-primary text-primary-foreground' : 'hover:bg-muted'}
                  ${isToday ? 'ring-2 ring-primary' : ''}
                `}
              >
                <div className="text-sm">{day.getDate()}</div>
              </button>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
