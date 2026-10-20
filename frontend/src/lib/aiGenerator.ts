import { collectContextualData, getActivityDescription, getContextualActivityPhrase } from './contextualData';
import type { ContextualDataSimulated } from './contextualData';

export function generateStarterText(): string {
  const now = new Date();
  const hour = now.getHours();
  const dayOfWeek = now.toLocaleDateString('en-US', { weekday: 'long' });
  const date = now.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });

  const timeOfDay =
    hour < 12 ? 'morning' : hour < 17 ? 'afternoon' : hour < 21 ? 'evening' : 'night';

  const starters = [
    `Good ${timeOfDay}! It's ${dayOfWeek}, ${date}. Today feels like a day to...`,
    `${dayOfWeek} ${timeOfDay} thoughts: Right now, I'm feeling...`,
    `Dear Diary, this ${timeOfDay} on ${date}, I want to remember...`,
    `Reflecting on this ${dayOfWeek} ${timeOfDay}... What stands out to me is...`,
    `${date} - ${timeOfDay} entry: Today has been...`,
    `It's ${timeOfDay} and I'm taking a moment to write about...`,
    `This ${dayOfWeek} ${timeOfDay}, I'm grateful for...`,
    `${date}: As this ${timeOfDay} unfolds, I notice...`,
    `Dear future me, on this ${dayOfWeek} ${timeOfDay}, I want you to know...`,
    `${timeOfDay} reflections for ${date}: Something on my mind is...`,
    `Here I am on ${dayOfWeek}, ${date}. This ${timeOfDay} brings...`,
    `Checking in with myself this ${timeOfDay}. Today I've been thinking about...`,
    `${dayOfWeek} vibes: This ${timeOfDay} has me contemplating...`,
    `Quick note to self, ${date}: Right now I'm...`,
    `Pausing to capture this ${dayOfWeek} ${timeOfDay}. What matters most is...`,
    `${date} - A ${timeOfDay} moment worth recording:`,
    `On this ${dayOfWeek}, I find myself...`,
    `${timeOfDay} musings: Today's been interesting because...`,
    `Taking stock this ${dayOfWeek} ${timeOfDay}. I realize...`,
    `${date}: Sitting with my thoughts this ${timeOfDay}, I feel...`,
  ];

  const randomIndex = Math.floor(Math.random() * starters.length);
  return starters[randomIndex];
}

export function generateContextualEntry(customContext?: ContextualDataSimulated): { text: string; contextualData: ContextualDataSimulated } {
  const contextualData = customContext || collectContextualData();
  const now = new Date();
  const dayOfWeek = now.toLocaleDateString('en-US', { weekday: 'long' });
  const date = now.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
  const time = now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });

  const activityPhrase = getContextualActivityPhrase(contextualData.activity, contextualData.location);
  const timeOfDayLower = contextualData.timeOfDay.toLowerCase();
  
  // Decide randomly whether to include all context or be more selective
  const includeLocation = Math.random() > 0.2;
  const includeActivity = Math.random() > 0.15;
  const includeScreenUsage = Math.random() > 0.4;
  const includeTime = Math.random() > 0.3;
  
  // More sophisticated and natural-sounding templates with varied structure
  const templates: string[] = [];
  
  // Full context templates
  if (includeLocation && includeActivity && includeScreenUsage) {
    templates.push(
      `${dayOfWeek}, ${date}\n${includeTime ? time + '\n\n' : '\n'}This ${timeOfDayLower}, I find myself at ${contextualData.location}, ${activityPhrase}. There's something about this moment that feels worth capturing. ${includeScreenUsage ? `My phone tells me I've been ${contextualData.screenUsage.toLowerCase()} today, which says something about how I've been spending my time.\n\n` : '\n\n'}`,
      `${contextualData.timeOfDay} - ${date}\n\nI'm writing this from ${contextualData.location}, where I've been ${activityPhrase}. ${includeTime ? `It's ${time} on a ${dayOfWeek}, and ` : ''}I wanted to pause and reflect. ${includeScreenUsage ? `Looking at my screen time (${contextualData.screenUsage.toLowerCase()}), I realize...\n\n` : '\n\n'}`,
      `Dear Diary,\n\n${dayOfWeek} ${timeOfDayLower} at ${contextualData.location}. I'm ${activityPhrase} right now, and it feels like the right moment to write. ${includeScreenUsage ? `My digital habits today (${contextualData.screenUsage.toLowerCase()}) have been interesting to observe.\n\n` : '\n\n'}`
    );
  }
  
  // Partial context templates (location + activity, no screen)
  if (includeLocation && includeActivity && !includeScreenUsage) {
    templates.push(
      `${date}${includeTime ? `, ${time}` : ''}\n\nCurrently ${activityPhrase} at ${contextualData.location}. This ${timeOfDayLower} has a particular quality to it that I want to remember.\n\n`,
      `${dayOfWeek} ${timeOfDayLower}\n\nI'm at ${contextualData.location} right now, ${activityPhrase}. ${includeTime ? `The time is ${time}, and ` : ''}I wanted to capture this moment before it slips away.\n\n`,
      `Sitting here at ${contextualData.location}, ${activityPhrase}, I realize it's already ${includeTime ? time : `${timeOfDayLower} on ${dayOfWeek}`}. Something about this moment feels significant.\n\n`
    );
  }
  
  // Activity-focused templates (minimal location)
  if (includeActivity && Math.random() > 0.5) {
    templates.push(
      `${contextualData.timeOfDay} thoughts\n\nI've been ${activityPhrase} this ${dayOfWeek}, and it's given me time to think about...\n\n`,
      `${date}\n\nSpent part of this ${timeOfDayLower} ${activityPhrase}. ${includeTime ? `Now at ${time}, ` : ''}I'm reflecting on...\n\n`,
      `Quick note: ${dayOfWeek} ${timeOfDayLower}\n\nBeen ${activityPhrase} and wanted to jot down some thoughts while they're fresh.\n\n`
    );
  }
  
  // Minimal context templates (just time/mood)
  templates.push(
    `${dayOfWeek}, ${date}\n\nThis ${timeOfDayLower} I'm thinking about...\n\n`,
    `${date}\n\nA moment to pause and reflect on...\n\n`,
    `${contextualData.timeOfDay} - ${dayOfWeek}\n\nSomething's been on my mind:\n\n`,
    `Taking a moment this ${timeOfDayLower} to write about...\n\n`
  );
  
  // Location-focused templates
  if (includeLocation && Math.random() > 0.6) {
    templates.push(
      `Writing from ${contextualData.location} this ${dayOfWeek} ${timeOfDayLower}. The setting has me thinking about...\n\n`,
      `${contextualData.location} - ${date}\n\nThere's something about being here that makes me want to capture...\n\n`
    );
  }

  const randomIndex = Math.floor(Math.random() * templates.length);
  const baseText = templates[randomIndex];
  
  const continuations = [
    'I\'ve been thinking about how...',
    'What strikes me most is...',
    'I want to remember that...',
    'Something I\'ve noticed today is...',
    'I\'m feeling...',
    'It occurs to me that...',
    'Looking back on today, I realize...',
    'There\'s a thought that keeps returning:',
    'I\'m grateful for...',
    'One thing that stood out today was...',
    'Lately I\'ve been wondering...',
    'A realization hit me:',
    'I need to acknowledge that...',
    'Today taught me...',
    'I\'m processing...',
    'Something shifted when...',
    'I can\'t stop thinking about...',
    'What I\'m learning is...',
    'The truth is...',
    'Right now I\'m grappling with...',
  ];
  
  const continuation = continuations[Math.floor(Math.random() * continuations.length)];
  
  return {
    text: baseText + continuation,
    contextualData,
  };
}

export function generateDailySummary(entries: Array<{ content: string; mood: string; contextualData?: any }>): string {
  if (entries.length === 0) {
    return 'No entries recorded today.';
  }

  // Analyze activities with more detail
  const activities = new Set<string>();
  const locations = new Set<string>();
  const timeOfDaySet = new Set<string>();
  
  entries.forEach(entry => {
    if (entry.contextualData) {
      const activityPhrase = getContextualActivityPhrase(
        entry.contextualData.activity,
        entry.contextualData.location
      );
      activities.add(activityPhrase);
      locations.add(entry.contextualData.location);
      timeOfDaySet.add(entry.contextualData.timeOfDay);
    }
  });

  // Analyze mood distribution
  const moodCounts = {
    positive: entries.filter(e => e.mood === 'positive').length,
    neutral: entries.filter(e => e.mood === 'neutral').length,
    negative: entries.filter(e => e.mood === 'negative').length,
  };

  const dominantMood = 
    moodCounts.positive > moodCounts.negative && moodCounts.positive > moodCounts.neutral
      ? 'positive'
      : moodCounts.negative > moodCounts.positive && moodCounts.negative > moodCounts.neutral
      ? 'challenging'
      : 'balanced';

  const moodDescriptions = {
    positive: ['uplifting', 'joyful', 'energetic', 'optimistic', 'bright', 'fulfilling', 'inspiring', 'wonderful', 'delightful', 'rewarding'],
    challenging: ['reflective', 'contemplative', 'introspective', 'thoughtful', 'complex', 'demanding', 'intense', 'difficult', 'testing', 'sobering'],
    balanced: ['steady', 'calm', 'peaceful', 'even', 'measured', 'composed', 'tranquil', 'stable', 'grounded', 'consistent'],
  };

  const moodDesc = moodDescriptions[dominantMood][Math.floor(Math.random() * moodDescriptions[dominantMood].length)];

  // Generate rich summary with variation
  const activityList = Array.from(activities).slice(0, 3).join(', ');
  const locationList = Array.from(locations).slice(0, 3).join(', ');
  const timeSpan = Array.from(timeOfDaySet).length > 1 
    ? `spanning ${Array.from(timeOfDaySet).slice(0, 2).join(' to ')}`
    : `during the ${Array.from(timeOfDaySet)[0]?.toLowerCase() || 'day'}`;

  const summaryVariants: string[] = [];
  
  if (activities.size > 0 && locations.size > 0) {
    summaryVariants.push(
      `${moodDesc.charAt(0).toUpperCase() + moodDesc.slice(1)} day ${timeSpan}, with time spent ${activityList} at ${locationList}. ${entries.length} ${entries.length === 1 ? 'entry' : 'entries'} captured.`,
      `A ${moodDesc} ${timeSpan}, featuring ${activityList} across ${locationList}. Recorded ${entries.length} ${entries.length === 1 ? 'moment' : 'moments'}.`,
      `${entries.length} ${entries.length === 1 ? 'entry' : 'entries'} from a ${moodDesc} day ${timeSpan}. Activities included ${activityList} at ${locationList}.`
    );
  } else if (activities.size > 0) {
    summaryVariants.push(
      `${moodDesc.charAt(0).toUpperCase() + moodDesc.slice(1)} day ${timeSpan}, focused on ${activityList}. ${entries.length} ${entries.length === 1 ? 'entry' : 'entries'} recorded.`,
      `A ${moodDesc} ${timeSpan} centered around ${activityList}. ${entries.length} ${entries.length === 1 ? 'reflection' : 'reflections'} captured.`
    );
  } else {
    summaryVariants.push(
      `${moodDesc.charAt(0).toUpperCase() + moodDesc.slice(1)} day with ${entries.length} ${entries.length === 1 ? 'entry' : 'entries'} recorded.`,
      `${entries.length} ${entries.length === 1 ? 'moment' : 'moments'} captured on a ${moodDesc} day.`
    );
  }

  return summaryVariants[Math.floor(Math.random() * summaryVariants.length)];
}

export function generateDailyQuote(mood: string, activityPattern: string): string {
  const positiveQuotes = [
    'A day full of smiles and sunshine',
    'Moments worth cherishing forever',
    'Joy found in the simple things',
    'Gratitude fills every corner of the heart',
    'Living life with intention and purpose',
    'Blessed with good vibes and great energy',
    'Happiness is a choice made today',
    'Finding beauty in every moment',
    'Today was a gift worth unwrapping',
    'Collecting memories, not things',
    'Light and laughter filled the hours',
    'Small joys made a big difference',
    'Embracing the good in every situation',
    'Radiating positivity and warmth',
    'A day painted in bright colors',
  ];

  const negativeQuotes = [
    'Even tough days teach valuable lessons',
    'Growth happens in the challenges',
    'Tomorrow brings new hope and possibilities',
    'Strength is found in the struggle',
    'Every storm passes, leaving wisdom behind',
    'Resilience builds character and depth',
    'This too shall pass, as all things do',
    'Learning through adversity and reflection',
    'Difficult days make us appreciate the good ones',
    'Sometimes we need the rain to grow',
    'Finding courage in the face of difficulty',
    'Challenges reveal our true strength',
    'Processing pain with patience and grace',
    'Dark moments teach us about light',
    'Weathering the storm, one breath at a time',
  ];

  const neutralQuotes = [
    'A steady rhythm carries the day forward',
    'Finding peace in the everyday routine',
    'Balance exists in the ordinary moments',
    'Quiet moments matter more than we think',
    'Consistency is its own kind of reward',
    'Simple days bring their own kind of joy',
    'Life flows at its own perfect pace',
    'Contentment lives in the ordinary',
    'Not every day needs to be extraordinary',
    'There\'s wisdom in the mundane',
    'Embracing the calm between the storms',
    'Steady progress, one day at a time',
    'Finding comfort in familiar patterns',
    'The beauty of an unremarkable day',
    'Peaceful moments of simple existence',
  ];

  let quotes: string[];
  if (mood === 'positive') {
    quotes = positiveQuotes;
  } else if (mood === 'negative') {
    quotes = negativeQuotes;
  } else {
    quotes = neutralQuotes;
  }

  const randomIndex = Math.floor(Math.random() * quotes.length);
  return quotes[randomIndex];
}
