import { useState, useEffect } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { ActivityType } from '../backend';
import type { ContextualDataSimulated } from '@/lib/contextualData';
import { MapPin, Clock, Activity, Smartphone } from 'lucide-react';

interface ContextEditorProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  contextualData: ContextualDataSimulated | null;
  onSave: (updatedContext: ContextualDataSimulated) => void;
}

const timeOfDayOptions = [
  'Early morning',
  'Morning',
  'Midday',
  'Afternoon',
  'Late afternoon',
  'Evening',
  'Late evening',
  'Night',
];

const screenUsageOptions = [
  'Minimal',
  'Low (checking messages)',
  'Low (winding down)',
  'Moderate (casual browsing)',
  'Moderate (lunch break browsing)',
  'Moderate (social media, entertainment)',
  'High (work-related tasks)',
];

const activityTypeLabels: Record<ActivityType, string> = {
  [ActivityType.walking]: 'Walking',
  [ActivityType.resting]: 'Resting',
  [ActivityType.traveling]: 'Traveling',
  [ActivityType.working]: 'Working',
  [ActivityType.socializing]: 'Socializing',
  [ActivityType.exercising]: 'Exercising',
  [ActivityType.eating]: 'Eating',
  [ActivityType.studying]: 'Studying',
  [ActivityType.teaching]: 'Teaching',
  [ActivityType.creatingArt]: 'Creating Art',
  [ActivityType.crafting]: 'Crafting',
  [ActivityType.householdWork]: 'Household Work',
  [ActivityType.workingProfessional]: 'Working (Professional)',
  [ActivityType.reading]: 'Reading',
  [ActivityType.cooking]: 'Cooking',
  [ActivityType.shopping]: 'Shopping',
  [ActivityType.gardening]: 'Gardening',
};

export function ContextEditor({ open, onOpenChange, contextualData, onSave }: ContextEditorProps) {
  const [location, setLocation] = useState('');
  const [timeOfDay, setTimeOfDay] = useState('');
  const [activity, setActivity] = useState<ActivityType>(ActivityType.resting);
  const [screenUsage, setScreenUsage] = useState('');
  const [customActivity, setCustomActivity] = useState('');

  useEffect(() => {
    if (contextualData) {
      setLocation(contextualData.location);
      setTimeOfDay(contextualData.timeOfDay);
      setActivity(contextualData.activity);
      setScreenUsage(contextualData.screenUsage);
      setCustomActivity('');
    }
  }, [contextualData]);

  const handleSave = () => {
    if (!location.trim() || !timeOfDay || !screenUsage) {
      return;
    }

    onSave({
      location: location.trim(),
      timeOfDay,
      activity,
      screenUsage,
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Edit Contextual Data</DialogTitle>
          <DialogDescription>
            Modify the contextual information for this entry. The AI will regenerate the diary text based on your changes.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="location" className="flex items-center gap-2">
              <MapPin className="w-4 h-4" />
              Location
            </Label>
            <Input
              id="location"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="e.g., Home, Café, Office, Park"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="timeOfDay" className="flex items-center gap-2">
              <Clock className="w-4 h-4" />
              Time of Day
            </Label>
            <Select value={timeOfDay} onValueChange={setTimeOfDay}>
              <SelectTrigger id="timeOfDay">
                <SelectValue placeholder="Select time of day" />
              </SelectTrigger>
              <SelectContent>
                {timeOfDayOptions.map((option) => (
                  <SelectItem key={option} value={option}>
                    {option}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="activity" className="flex items-center gap-2">
              <Activity className="w-4 h-4" />
              Activity Type
            </Label>
            <Select value={activity} onValueChange={(value) => setActivity(value as ActivityType)}>
              <SelectTrigger id="activity">
                <SelectValue placeholder="Select activity" />
              </SelectTrigger>
              <SelectContent className="max-h-[300px]">
                {Object.entries(activityTypeLabels).map(([key, label]) => (
                  <SelectItem key={key} value={key}>
                    {label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <p className="text-xs text-muted-foreground">
              Can't find your activity? Select the closest match above.
            </p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="screenUsage" className="flex items-center gap-2">
              <Smartphone className="w-4 h-4" />
              Screen Usage
            </Label>
            <Select value={screenUsage} onValueChange={setScreenUsage}>
              <SelectTrigger id="screenUsage">
                <SelectValue placeholder="Select screen usage" />
              </SelectTrigger>
              <SelectContent>
                {screenUsageOptions.map((option) => (
                  <SelectItem key={option} value={option}>
                    {option}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={handleSave} disabled={!location.trim() || !timeOfDay || !screenUsage}>
            Save & Regenerate
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
