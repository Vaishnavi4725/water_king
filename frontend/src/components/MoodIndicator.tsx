import { Smile, Meh, Frown } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import type { Mood } from '@/lib/moodAnalyzer';

interface MoodIndicatorProps {
  mood: Mood;
  size?: 'sm' | 'md' | 'lg';
  showLabel?: boolean;
}

export function MoodIndicator({ mood, size = 'md', showLabel = true }: MoodIndicatorProps) {
  const iconSize = size === 'sm' ? 'w-3 h-3' : size === 'md' ? 'w-4 h-4' : 'w-5 h-5';
  const badgeSize = size === 'sm' ? 'text-xs' : size === 'md' ? 'text-sm' : 'text-base';

  const moodConfig = {
    positive: {
      icon: Smile,
      label: 'Positive',
      variant: 'default' as const,
      className: 'bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border-emerald-500/20',
    },
    neutral: {
      icon: Meh,
      label: 'Neutral',
      variant: 'secondary' as const,
      className: 'bg-slate-500/10 text-slate-700 dark:text-slate-400 border-slate-500/20',
    },
    negative: {
      icon: Frown,
      label: 'Negative',
      variant: 'destructive' as const,
      className: 'bg-rose-500/10 text-rose-700 dark:text-rose-400 border-rose-500/20',
    },
  };

  const config = moodConfig[mood];
  const Icon = config.icon;

  return (
    <Badge variant={config.variant} className={`gap-1 ${config.className} ${badgeSize}`}>
      <Icon className={iconSize} />
      {showLabel && config.label}
    </Badge>
  );
}
