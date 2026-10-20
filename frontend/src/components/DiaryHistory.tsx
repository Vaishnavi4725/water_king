import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Calendar, Filter, Image as ImageIcon } from 'lucide-react';
import { CalendarView } from './CalendarView';
import type { Mood } from '@/lib/moodAnalyzer';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Alert, AlertDescription } from '@/components/ui/alert';

export function DiaryHistory() {
  const [moodFilter, setMoodFilter] = useState<Mood | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [activeTab, setActiveTab] = useState<'entries' | 'calendar' | 'summaries' | 'photos'>('entries');
  const [calendarViewMode, setCalendarViewMode] = useState<'monthly' | 'weekly'>('monthly');

  const handleDateSelect = (date: Date) => {
    setSelectedDate(date);
    setActiveTab('entries');
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <Card className="border-2">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="w-5 h-5" />
            History & Memories
          </CardTitle>
          <CardDescription>
            Browse your past entries, summaries, and photos
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as any)}>
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="entries">Entries</TabsTrigger>
              <TabsTrigger value="calendar">Calendar</TabsTrigger>
              <TabsTrigger value="summaries">Summaries</TabsTrigger>
              <TabsTrigger value="photos">Photos</TabsTrigger>
            </TabsList>

            <TabsContent value="entries" className="space-y-4 mt-6">
              <div className="flex flex-col sm:flex-row gap-3">
                <div className="flex-1">
                  <Input
                    placeholder="Search entries..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full"
                  />
                </div>
                <Select value={moodFilter} onValueChange={(v) => setMoodFilter(v as Mood | 'all')}>
                  <SelectTrigger className="w-full sm:w-[180px]">
                    <Filter className="w-4 h-4 mr-2" />
                    <SelectValue placeholder="Filter by mood" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Moods</SelectItem>
                    <SelectItem value="positive">Positive</SelectItem>
                    <SelectItem value="neutral">Neutral</SelectItem>
                    <SelectItem value="negative">Negative</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <Alert>
                <AlertDescription>
                  No entries yet. Start writing in the Write tab to see your entries here.
                </AlertDescription>
              </Alert>
            </TabsContent>

            <TabsContent value="calendar" className="mt-6">
              <CalendarView
                entries={[]}
                onDateSelect={handleDateSelect}
                selectedDate={selectedDate}
                viewMode={calendarViewMode}
                onViewModeChange={setCalendarViewMode}
              />
            </TabsContent>

            <TabsContent value="summaries" className="space-y-4 mt-6">
              <Alert>
                <AlertDescription>
                  No daily summaries available. Summaries are generated automatically from your entries.
                </AlertDescription>
              </Alert>
            </TabsContent>

            <TabsContent value="photos" className="space-y-4 mt-6">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold flex items-center gap-2">
                  <ImageIcon className="w-5 h-5" />
                  Photo Gallery
                </h3>
              </div>

              <Alert>
                <AlertDescription>
                  No photos yet. Add photos to your entries to see them here.
                </AlertDescription>
              </Alert>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}
